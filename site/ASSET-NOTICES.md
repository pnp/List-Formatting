# Asset notices

## Community gallery references

The layout was adapted for this repository from
[Copilot Prompts](https://github.com/pnp/copilot-prompts) and
[SharePoint Skills](https://github.com/pnp/sharepoint-skills).
The local source references used were their gallery layouts, styles, and
community font assets. Side artwork and Parker WOFF2 fonts were copied from
Copilot Prompts; the SharePoint PNG was copied from SharePoint Skills and
resized for display without changing the brand artwork.

Copilot Prompts: Copyright (c) 2024 Microsoft 365 & Power Platform Community.
SharePoint Skills: Copyright (c) 2021 Microsoft 365 Community.

MIT License:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Badge

The Community Contributor Microsoft 365 & Power Platform Community 2026 badge
is the official image linked by
[Credly](https://www.credly.com/org/m365pnp/badge/community-contributor-microsoft-365-power-platform-),
retrieved October 29, 2026 from
`https://images.credly.com/images/76dbe4bd-e45c-4c7a-a079-f5b6e7a893bd/blob`.
It was resized for display without changing its wording or visual identity.
Badge recognition remains subject to the issuer's published criteria.

## Schema snapshots

Microsoft SharePoint formatting schemas were retrieved October 29, 2026 from
`https://developer.microsoft.com/json-schemas/sp/` (legacy and `v2` variants).
The PnP metadata schema was retrieved from
`https://developer.microsoft.com/en-us/json-schemas/pnp/samples/v1.0/metadata-schema.json`.

The snapshots in [schemas](./schemas/) are checked into this repository so CI
does not download mutable schemas or require an external validator service.
Update and review them deliberately; schema changes may expose historical
sample incompatibilities.
The loader supports the snapshots' pre-Unicode regular expressions and
normalizes malformed `#definitions/` fragments to standard JSON Pointers.
The downloaded schema content is preserved; trailing whitespace is normalized.
