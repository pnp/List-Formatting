# Update the Docs

Documentation contributions, clearer instructions, and typo fixes are welcome.
The source articles remain in the repository's `docs` directory so they are
readable on GitHub and reusable by the new Astro gallery.

## Writing documentation

Edit an existing Markdown article or propose a focused new one. Use descriptive
headings, relative links, and images from `docs/img`. The gallery converts
relative links, tables, and existing indented admonitions when generating pages.

Keep sample-specific instructions in the sample's README and its
`assets/sample.json` metadata. The gallery derives sample lists and reference
groupings from those files; do not hand-edit old generated lists to add a sample.

Include requirements, internal column names, permissions, and where each JSON
definition belongs. Multi-file forms need separate Header, Body, and Footer
instructions. A screenshot is helpful, but it does not replace setup steps.

## Build and validate the gallery

The replacement site uses Astro and Node.js 22.19 or newer. From the repository:

```powershell
Set-Location site
npm ci
npm run dev -- --port 4337
```

Open `http://127.0.0.1:4337/List-Formatting/`. Before submitting site changes:

```powershell
npm run validate:samples
npm test
npm run check
npm run build
npm run test:e2e
```

The production build checks internal links and assets. Browser tests use their
own preview server; stop a manual server on port 4337 before running them.
See the [gallery development guide](../../GALLERY-DEVELOPMENT.md) for dependency requirements,
schema validation, cost controls, and deployment.

## Publishing

Local development and builds do not publish anything. The initial review
version is deployed only through a manual GitHub Actions workflow after approval.
The case-sensitive public base path is `/List-Formatting/`.

Astro is the only supported documentation build and publishing path. Use the
[deployment workflow](../../.github/workflows/deploy-gallery.yml), not an
independent local publisher. Existing public guide and grouping routes are
retained by Astro.

## Legacy HTML-to-Formatter tool

The deprecated tool's prebuilt static assets are preserved under their existing
URL. Normal gallery builds do not install or rebuild its legacy dependencies.
For modern conversion and editing, use Jsonify and SP Formatter.

## Contributing to tools

SP Formatter and Jsonify accept changes in their own repositories. Read the
[tool contribution guide](./tools.md) and [tools overview](../tools/index.md).

<img src="https://m365-visitor-stats.azurewebsites.net/list-formatting/docs/contributing/docs" />
