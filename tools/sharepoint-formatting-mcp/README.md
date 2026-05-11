# SharePoint List-Formatting MCP Server

An MCP (Model Context Protocol) server that grounds AI agents in this repository's SharePoint List Formatting reference docs and ~360 working samples. Plug it into Claude Code, Antigravity, Cursor, Claude Desktop, the Claude Agent SDK, or any other MCP-capable agent host, and the agent gains five tools for searching and retrieving formatter knowledge on demand — without stuffing everything into the system prompt.

## What it indexes

At startup the server scans the repo and builds an in-memory BM25 index over:

- **Reference docs** under `docs/gettingstarted/` (style-properties allow-list, `sp-card-*` classes playbook, applying column/view formats, etc.) — split into sections by markdown heading so the agent can pull just the right chunk.
- **Per-sample READMEs** under `column-samples/`, `view-samples/`, `form-samples/` (~360 samples) — so the agent can discover examples by keyword.
- **Sample JSON files** — indexed by path, fetched on demand with JSON-validity verification.

A live smoke-test on this repo indexes **49 doc sections** and **363 samples** in well under a second.

## Tools exposed

| Tool | What it does |
| --- | --- |
| `search_formatting_docs(query, max_results=5)` | BM25 ranked search across docs and sample READMEs. Returns a list of hits with kind (`section` or `sample`), excerpt, GitHub URL, and a stable `id` to feed back into `get_section` / `get_sample`. |
| `get_section(section_id)` | Fetch the full markdown of a doc section. Accepts the id from search results or the convenience form `<doc>:<heading>` (e.g. `spcardclasses:The canonical card scaffold`). |
| `list_samples(kind="", query="", max_results=25)` | List samples filtered by kind (`column` / `view` / `form`) and/or keyword. |
| `get_sample(name)` | Fetch a sample's README excerpt plus the raw JSON content of every formatter file in its folder, each with a `valid_json` flag and a raw.githubusercontent URL. |
| `stats()` | Sanity-check report — how many docs and samples the server has indexed. |

## Install

The server is pure Python (3.10+) with two dependencies (`mcp`, `rank-bm25`).

### Option A: `uv` (recommended)

[`uv`](https://docs.astral.sh/uv/) handles isolated installs and execution in one step:

```bash
# From this directory:
uv tool install .

# Or run without installing globally:
uv run --with . sharepoint-formatting-mcp
```

### Option B: `pipx` / `pip`

```bash
pipx install /path/to/List-Formatting/tools/sharepoint-formatting-mcp
# or
pip install /path/to/List-Formatting/tools/sharepoint-formatting-mcp
```

### Option C: Run in place (development)

```bash
cd tools/sharepoint-formatting-mcp
pip install -e .
sharepoint-formatting-mcp
```

## Configure your agent

The server speaks MCP over **stdio** (the default transport). Tell it where the repo lives via the `SHAREPOINT_FORMATTING_REPO` env var if you're running the server from outside the repo — otherwise it auto-detects from its own install location.

### Claude Code

Add to `~/.config/claude-code/mcp.json` (or your project's `.mcp.json`):

```json
{
  "mcpServers": {
    "sharepoint-formatting": {
      "command": "sharepoint-formatting-mcp",
      "env": {
        "SHAREPOINT_FORMATTING_REPO": "/absolute/path/to/List-Formatting"
      }
    }
  }
}
```

Or, without a global install, via `uvx`:

```json
{
  "mcpServers": {
    "sharepoint-formatting": {
      "command": "uvx",
      "args": ["--from", "/absolute/path/to/List-Formatting/tools/sharepoint-formatting-mcp", "sharepoint-formatting-mcp"],
      "env": { "SHAREPOINT_FORMATTING_REPO": "/absolute/path/to/List-Formatting" }
    }
  }
}
```

### Claude Desktop

Add the same block to `claude_desktop_config.json` (Settings → Developer → Edit Config).

### Antigravity / Cursor / Other

Any MCP-capable host accepts a stdio command + args. Use the same `command` and `env` as above. Refer to your host's MCP integration docs for the exact config file location.

### Claude Agent SDK

```python
from claude_agent_sdk import ClaudeSDKClient, ClaudeAgentOptions

options = ClaudeAgentOptions(
    mcp_servers={
        "sharepoint-formatting": {
            "command": "sharepoint-formatting-mcp",
            "env": {"SHAREPOINT_FORMATTING_REPO": "/path/to/List-Formatting"},
        }
    },
    allowed_tools=[
        "mcp__sharepoint-formatting__search_formatting_docs",
        "mcp__sharepoint-formatting__get_section",
        "mcp__sharepoint-formatting__list_samples",
        "mcp__sharepoint-formatting__get_sample",
    ],
)
```

## Verifying it works

After configuring your host, ask the agent:

> Search the SharePoint formatting docs for "responsive flex card" and show the top result.

A correctly wired server will hit `search_formatting_docs`, return a ranked list of section hits with GitHub URLs, and the agent will be able to follow up with `get_section` to pull the full content.

You can also run the server manually for a quick smoke test:

```bash
SHAREPOINT_FORMATTING_REPO=/path/to/List-Formatting python -c "
from sharepoint_formatting_mcp.indexer import FormattingIndex
from pathlib import Path
import os, json
idx = FormattingIndex(Path(os.environ['SHAREPOINT_FORMATTING_REPO']))
print(json.dumps(idx.stats(), indent=2))
print(json.dumps(idx.search('rating stars', 3), indent=2))
"
```

## How the search works

- **No embeddings, no network calls.** BM25 over a simple lowercased word tokenization runs entirely in-process. Index build + every query is <10 ms on this repo.
- **Markdown is split by heading** (h1–h4). Each heading becomes a separately retrievable section with a stable slug — search returns the *right chunk*, not the whole doc.
- **Sample names and READMEs are co-indexed** so a search for "rating stars" surfaces both the Star Rating Template section in the playbook *and* the `rating-in-tiles` sample.
- **Sample JSON is path-indexed, content-fetched on demand.** Keeps the index small while letting the agent pull raw formatter JSON whenever it needs to crib from a working example.

## Adding more docs

To index additional reference docs, edit the `REFERENCE_DOCS` list in `src/sharepoint_formatting_mcp/indexer.py`. To index additional sample roots, edit `SAMPLE_ROOTS`. Restart the server to pick up changes.

## Recommended system-prompt nudge

If your host lets you add a per-server hint, this one works well:

> When generating SharePoint List Formatting JSON, ground your work in the `sharepoint-formatting` MCP server. Use `search_formatting_docs` to find the right section or sample, `get_section` for full doc text, and `get_sample` to crib from working examples. Prefer `sp-card-*` classes (see the spcardclasses playbook) before reaching for inline `style`; only use CSS properties listed in the styleproperties allow-list.

## License

MIT, same as the parent repo.
