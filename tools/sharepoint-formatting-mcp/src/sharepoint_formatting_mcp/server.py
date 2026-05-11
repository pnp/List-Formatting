"""FastMCP server exposing the SharePoint List-Formatting docs and samples.

Tools:
  - search_formatting_docs(query, max_results)
  - get_section(section_id)
  - list_samples(kind, query)
  - get_sample(name)
  - stats()
"""

from __future__ import annotations

import json
import os
from pathlib import Path

from mcp.server.fastmcp import FastMCP

from .indexer import FormattingIndex


def _resolve_repo_root() -> Path:
    """Find the List-Formatting repo root.

    Priority:
      1. $SHAREPOINT_FORMATTING_REPO env var (absolute path).
      2. The repo this server lives in (../../.. relative to this file).
    """
    env = os.environ.get("SHAREPOINT_FORMATTING_REPO")
    if env:
        return Path(env).expanduser().resolve()
    # this file: tools/sharepoint-formatting-mcp/src/sharepoint_formatting_mcp/server.py
    return Path(__file__).resolve().parents[4]


REPO_ROOT = _resolve_repo_root()
INDEX = FormattingIndex(REPO_ROOT)

mcp = FastMCP(
    "sharepoint-formatting",
    instructions=(
        "Authoritative grounding for SharePoint List Formatting JSON authoring. "
        "Use search_formatting_docs to discover the right doc section or sample, "
        "get_section to pull the full text of a specific section, list_samples to "
        "discover working examples by kind/keyword, and get_sample to fetch the "
        "raw formatter JSON of any sample. Prefer sp-card-* classes (see the "
        "spcardclasses playbook) before reaching for inline style; only use CSS "
        "properties listed in the styleproperties allow-list."
    ),
)


@mcp.tool()
def search_formatting_docs(query: str, max_results: int = 5) -> str:
    """Search the SharePoint List-Formatting docs and sample READMEs.

    Args:
        query: Free-text query (e.g. "responsive flex card", "sp-card-label",
            "rating stars", "row formatter board view").
        max_results: Max number of hits to return (1-20, default 5).

    Returns:
        JSON-encoded list of hits. Each hit includes kind ("section" or
        "sample"), an excerpt, a GitHub URL, and a stable `id` you can pass
        to `get_section` or `get_sample` for the full content.
    """
    max_results = max(1, min(int(max_results), 20))
    hits = INDEX.search(query, max_results=max_results)
    return json.dumps(hits, indent=2)


@mcp.tool()
def get_section(section_id: str) -> str:
    """Fetch the full markdown text of a documentation section.

    Args:
        section_id: Either the `id` returned by `search_formatting_docs`
            (e.g. "styleproperties#flexbox-the-responsive-workhorse"), or
            the convenience form "<doc>:<heading>" (e.g.
            "spcardclasses:The canonical card scaffold").

    Returns:
        JSON with `doc`, `heading`, `url`, and the full markdown `content`.
        Returns an `error` field when the section is not found.
    """
    section = INDEX.get_section(section_id)
    if not section:
        return json.dumps(
            {
                "error": f"Section '{section_id}' not found.",
                "hint": "Call search_formatting_docs first to get a valid id.",
            }
        )
    return json.dumps(
        {
            "doc": section.doc_id,
            "doc_path": section.doc_path,
            "heading": section.heading,
            "level": section.level,
            "url": section.github_url,
            "content": section.content,
        },
        indent=2,
    )


@mcp.tool()
def list_samples(kind: str = "", query: str = "", max_results: int = 25) -> str:
    """List available formatter samples.

    Args:
        kind: Optional filter: "column", "view", or "form". Empty = all kinds.
        query: Optional substring match against sample name or README.
        max_results: Cap on the list size (1-100, default 25).

    Returns:
        JSON list of samples. Each entry has name, kind, url, and a short
        readme excerpt. Use `get_sample` to fetch the full JSON.
    """
    max_results = max(1, min(int(max_results), 100))
    kind_filter = kind.strip().lower() or None
    if kind_filter and kind_filter not in {"column", "view", "form"}:
        return json.dumps(
            {
                "error": f"Unknown kind '{kind}'.",
                "valid": ["column", "view", "form"],
            }
        )
    samples = INDEX.list_samples(kind=kind_filter, query=query.strip() or None)
    samples = samples[:max_results]
    out = [
        {
            "name": s.name,
            "kind": s.kind,
            "url": s.github_url,
            "json_files": s.json_files,
            "readme_excerpt": _short(s.readme_excerpt, 280),
        }
        for s in samples
    ]
    return json.dumps(out, indent=2)


@mcp.tool()
def get_sample(name: str) -> str:
    """Fetch a formatter sample's full README excerpt and JSON file contents.

    Args:
        name: The sample folder name as listed by `list_samples`
            (e.g. "prompt-cards", "rating-in-tiles", "elf-progress-board").

    Returns:
        JSON with `name`, `kind`, `url`, `readme_excerpt`, and a `json_files`
        array. Each json_files entry has `path`, `url`, `valid_json` (bool),
        and the raw `content`. Returns an `error` field when not found.
    """
    payload = INDEX.get_sample(name)
    if not payload:
        return json.dumps(
            {
                "error": f"Sample '{name}' not found.",
                "hint": "Call list_samples to discover available names.",
            }
        )
    return json.dumps(payload, indent=2)


@mcp.tool()
def stats() -> str:
    """Report what the server has indexed (useful for sanity-checking config)."""
    return json.dumps(INDEX.stats(), indent=2)


def _short(text: str, max_len: int) -> str:
    text = (text or "").strip()
    if len(text) <= max_len:
        return text
    return text[: max_len - 1].rstrip() + "…"


def run() -> None:
    """Run the server over stdio (the default MCP transport)."""
    mcp.run()
