"""Builds an in-memory search index over the List-Formatting repo content.

Indexed:
  - Reference docs (style props, sp-card playbook) split into sections by heading.
  - Per-sample README descriptions.
  - Sample JSON files (path-indexed; content fetched on demand).

Search uses BM25 over a simple lowercased word tokenization. No embeddings,
no network calls.
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from pathlib import Path

from rank_bm25 import BM25Okapi

GITHUB_BASE = "https://github.com/pnp/List-Formatting/tree/master"
GITHUB_RAW_BASE = "https://raw.githubusercontent.com/pnp/List-Formatting/master"

REFERENCE_DOCS = [
    "docs/gettingstarted/styleproperties.md",
    "docs/gettingstarted/spcardclasses.md",
    "docs/gettingstarted/columnformats.md",
    "docs/gettingstarted/viewformats.md",
    "docs/gettingstarted/index.md",
]

SAMPLE_ROOTS = ["column-samples", "view-samples", "form-samples"]

_WORD_RE = re.compile(r"[a-z0-9][a-z0-9-]+")
_HEADING_RE = re.compile(r"^(#{1,4})\s+(.+?)\s*$", re.MULTILINE)


def _tokenize(text: str) -> list[str]:
    return _WORD_RE.findall(text.lower())


def _slugify(heading: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", heading.lower()).strip("-")
    return slug or "section"


@dataclass
class Section:
    """A searchable chunk of a reference doc."""

    doc_id: str  # e.g. "styleproperties"
    doc_path: str  # repo-relative path
    heading: str
    heading_slug: str
    level: int  # heading depth 1..4
    content: str

    @property
    def github_url(self) -> str:
        return f"{GITHUB_BASE}/{self.doc_path}#{self.heading_slug}"


@dataclass
class Sample:
    """A formatter sample (its README description + path to the JSON)."""

    name: str  # folder name, e.g. "prompt-cards"
    kind: str  # "column" | "view" | "form"
    folder_path: str  # repo-relative
    readme_path: str | None
    readme_excerpt: str  # first ~600 chars of the README
    json_files: list[str] = field(default_factory=list)  # repo-relative paths

    @property
    def github_url(self) -> str:
        return f"{GITHUB_BASE}/{self.folder_path}"


@dataclass
class _Document:
    """Internal unified record used for BM25 indexing."""

    kind: str  # "section" | "sample"
    ref_id: str  # section id or sample name
    text: str  # full searchable text (heading + content, or name + readme)


class FormattingIndex:
    """In-memory search + retrieval over the repo's docs and samples."""

    def __init__(self, repo_root: Path) -> None:
        self.repo_root = repo_root.resolve()
        self.sections: dict[str, Section] = {}
        self.samples: dict[str, Sample] = {}
        self._docs: list[_Document] = []
        self._bm25: BM25Okapi | None = None
        self._load()

    # ---------- loading -----------------------------------------------------

    def _load(self) -> None:
        for rel in REFERENCE_DOCS:
            self._load_reference_doc(self.repo_root / rel)
        for root_name in SAMPLE_ROOTS:
            root = self.repo_root / root_name
            if not root.is_dir():
                continue
            kind = root_name.split("-")[0]
            for sample_dir in sorted(p for p in root.iterdir() if p.is_dir()):
                self._load_sample(sample_dir, kind)

        if not self._docs:
            self._bm25 = None
            return
        corpus = [_tokenize(d.text) for d in self._docs]
        self._bm25 = BM25Okapi(corpus)

    def _load_reference_doc(self, path: Path) -> None:
        if not path.is_file():
            return
        text = path.read_text(encoding="utf-8")
        doc_id = path.stem
        rel_path = str(path.relative_to(self.repo_root))

        matches = list(_HEADING_RE.finditer(text))
        if not matches:
            section = Section(
                doc_id=doc_id,
                doc_path=rel_path,
                heading=doc_id,
                heading_slug=_slugify(doc_id),
                level=1,
                content=text.strip(),
            )
            self._add_section(section)
            return

        for i, m in enumerate(matches):
            level = len(m.group(1))
            heading = m.group(2).strip()
            start = m.end()
            end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
            content = text[start:end].strip()
            if not content:
                continue
            section = Section(
                doc_id=doc_id,
                doc_path=rel_path,
                heading=heading,
                heading_slug=_slugify(heading),
                level=level,
                content=content,
            )
            self._add_section(section)

    def _add_section(self, section: Section) -> None:
        key = f"{section.doc_id}#{section.heading_slug}"
        # If duplicate slug, disambiguate.
        if key in self.sections:
            suffix = 2
            while f"{key}-{suffix}" in self.sections:
                suffix += 1
            section.heading_slug = f"{section.heading_slug}-{suffix}"
            key = f"{section.doc_id}#{section.heading_slug}"
        self.sections[key] = section
        self._docs.append(
            _Document(
                kind="section",
                ref_id=key,
                text=f"{section.heading}\n\n{section.content}",
            )
        )

    def _load_sample(self, sample_dir: Path, kind: str) -> None:
        name = sample_dir.name
        rel_folder = str(sample_dir.relative_to(self.repo_root))
        readme_path = None
        readme_excerpt = ""
        for candidate in ("README.md", "readme.md"):
            p = sample_dir / candidate
            if p.is_file():
                readme_path = str(p.relative_to(self.repo_root))
                readme_excerpt = p.read_text(encoding="utf-8", errors="replace")[:1500]
                break

        json_files = sorted(
            str(p.relative_to(self.repo_root))
            for p in sample_dir.rglob("*.json")
        )

        sample = Sample(
            name=name,
            kind=kind,
            folder_path=rel_folder,
            readme_path=readme_path,
            readme_excerpt=readme_excerpt,
            json_files=json_files,
        )
        self.samples[name] = sample
        self._docs.append(
            _Document(
                kind="sample",
                ref_id=name,
                text=f"{name} {kind}\n\n{readme_excerpt}",
            )
        )

    # ---------- queries -----------------------------------------------------

    def search(self, query: str, max_results: int = 5) -> list[dict]:
        if not self._bm25 or not query.strip():
            return []
        tokens = _tokenize(query)
        if not tokens:
            return []
        scores = self._bm25.get_scores(tokens)
        ranked = sorted(
            ((s, d) for s, d in zip(scores, self._docs) if s > 0),
            key=lambda x: x[0],
            reverse=True,
        )[:max_results]

        results: list[dict] = []
        for score, doc in ranked:
            if doc.kind == "section":
                sec = self.sections[doc.ref_id]
                results.append(
                    {
                        "kind": "section",
                        "id": doc.ref_id,
                        "doc": sec.doc_id,
                        "heading": sec.heading,
                        "url": sec.github_url,
                        "score": round(float(score), 3),
                        "excerpt": _excerpt(sec.content, 350),
                    }
                )
            else:
                sample = self.samples[doc.ref_id]
                results.append(
                    {
                        "kind": "sample",
                        "id": sample.name,
                        "sample_kind": sample.kind,
                        "url": sample.github_url,
                        "score": round(float(score), 3),
                        "excerpt": _excerpt(sample.readme_excerpt, 350),
                        "json_files": sample.json_files,
                    }
                )
        return results

    def get_section(self, section_id: str) -> Section | None:
        if section_id in self.sections:
            return self.sections[section_id]
        # Allow lookup by heading text inside a doc, e.g. "styleproperties:Flexbox"
        if ":" in section_id:
            doc_id, heading = section_id.split(":", 1)
            slug = _slugify(heading)
            return self.sections.get(f"{doc_id}#{slug}")
        return None

    def list_samples(
        self, kind: str | None = None, query: str | None = None
    ) -> list[Sample]:
        results = list(self.samples.values())
        if kind:
            results = [s for s in results if s.kind == kind]
        if query:
            q = query.lower()
            results = [
                s
                for s in results
                if q in s.name.lower() or q in s.readme_excerpt.lower()
            ]
        return sorted(results, key=lambda s: (s.kind, s.name))

    def get_sample(self, name: str) -> dict | None:
        sample = self.samples.get(name)
        if not sample:
            return None
        payload: dict = {
            "name": sample.name,
            "kind": sample.kind,
            "folder_path": sample.folder_path,
            "url": sample.github_url,
            "readme_excerpt": sample.readme_excerpt,
            "json_files": [],
        }
        for rel in sample.json_files:
            p = self.repo_root / rel
            if not p.is_file():
                continue
            try:
                content = p.read_text(encoding="utf-8")
            except OSError:
                continue
            # Validate it parses as JSON, but ship the raw text so the agent
            # sees comments / formatting as authored.
            try:
                json.loads(content)
                is_valid_json = True
            except json.JSONDecodeError:
                is_valid_json = False
            payload["json_files"].append(
                {
                    "path": rel,
                    "url": f"{GITHUB_RAW_BASE}/{rel}",
                    "valid_json": is_valid_json,
                    "content": content,
                }
            )
        return payload

    def stats(self) -> dict:
        return {
            "repo_root": str(self.repo_root),
            "sections_indexed": len(self.sections),
            "samples_indexed": len(self.samples),
            "samples_by_kind": {
                k: sum(1 for s in self.samples.values() if s.kind == k)
                for k in {s.kind for s in self.samples.values()}
            },
        }


def _excerpt(text: str, max_len: int) -> str:
    text = text.strip()
    if len(text) <= max_len:
        return text
    return text[: max_len - 1].rstrip() + "…"
