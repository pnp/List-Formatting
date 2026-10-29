# List Formatting gallery modernization plan

Status: first implementation available for local review; not deployed.

Last reconciled: October 29, 2026, after contributor avatars, documentation
build cleanup, separation of user-facing and gallery-development guidance,
and final pre-commit validation for the fork review branch.

Research baseline: October 29, 2026. The first implementation is in this
repository only. The existing public site and sibling repositories are unchanged.

### Tracking rules

- `[x]` means the stated implementation or check is complete; it does not imply
  production deployment or functional verification inside SharePoint.
- `[ ]` means work remains. Mixed tasks are split below so completed work is not
  hidden behind an unchecked release or manual-review requirement.
- **Partial** and **Deferred** explicitly identify incomplete enhancements or
  intentional scope choices. The detailed phase checklists are the work tracker,
  not just the snapshot.

## First-version review snapshot

- [x] Build a static Astro gallery with SharePoint branding, Lists-inspired
  details, community-first navigation, light/dark mode, and reference backgrounds.
- [x] Include all 382 samples and 551 definitions with complete variant-aware
  copying, byte-identical downloads, source links, and application guidance.
- [x] Preserve existing guide/grouping routes, refresh reference lists from
  current metadata, and keep the deprecated HTML converter operational.
- [x] Add contributors, the correct Community Contributor badge, What's new,
  community-call and YouTube promotion, and a form-formatting guide.
- [x] Repair confirmed JSON, image/link casing, stale references, tracker,
  and date defects; refresh the 360-entry aggregate to all 382 samples without
  unnecessarily reordering existing entries.
- [x] Add offline schema snapshots, strict JSON/relative-link validation,
  read-only PR checks, and a manual-only protected Pages deployment.
- [x] Pass Astro checks, 11 unit tests, production build/internal-link checks,
  and the final full browser suite: 15 passed, one explicitly skipped for the
  deprecated converter's desktop-only UI. This includes contributor avatars and
  representative-page accessibility in both themes on desktop/mobile.
- [x] Default to no visitor-image or session-replay requests. Tracking is
  opt-in; no database, paid search, accounts, or new Azure resources are needed.
- [x] Optimize gallery previews and recognition assets; show small, lazy-loaded
  GitHub contributor profile images, retaining initials only for contributors
  without a recorded GitHub account. The first 18 preview files total about 267 KiB.
- [x] Remove the retired documentation configuration, root publishing helpers,
  obsolete ignore entry, and references to the previous generator. Astro is the
  only supported source build/publishing path; public production is unchanged.
- [x] Expand the repository README with a real optimized gallery preview,
  adoption instructions, sample types, contribution/badge guidance, community
  resources, support boundaries, and sample-specific cost caveats.
- [x] Keep the repository README user-focused. Move website development,
  validation, hosting, deployment, and rollback guidance into the dedicated
  [gallery development guide](./GALLERY-DEVELOPMENT.md), linked from contributor
  documentation without duplicating instructions.
- [ ] Review the live local version's design and adoption flow before deployment.
- [ ] Triage recorded historical quality findings: 382 PnP metadata-schema
  findings (the first missing required field is `version`), 106 formatting-schema
  findings, and two README requirements-review items. These are review findings,
  not proof that all affected formats fail in SharePoint. Source-hash-bound
  exceptions cannot silently cover later modifications.
- [ ] Functionally test changed/representative formats in real SharePoint
  lists and forms; static gallery validation is not tenant compatibility proof.
- [ ] Approve production cutover, GitHub Pages settings, branch protection,
  and any further performance/accessibility release budgets.
- [ ] Follow up on the three sibling sites' Community navigation and community
  destination consistency in separate changes.

### Latest validation evidence

| Check | Result |
| --- | --- |
| `npm run check` | Passed; zero Astro errors, warnings, or hints |
| `npm run validate:samples` | Final pre-commit check passed for 382 samples and 551 definitions; 490 known review findings remain recorded |
| `npm test` | Final pre-commit run: 11 passed |
| `npm run build` | Passed; 431 generated pages |
| `npm run validate:links` | Passed; 1,377 internal targets across 432 HTML pages, including the preserved tool |
| `npm run test:e2e` | Final full suite: 15 passed, one documented mobile legacy-tool skip |
| `npm run test:e2e -- --grep 'contributors show\|representative pages'` | Latest avatar update: four passed on desktop/mobile, including both-theme accessibility checks |
| `npm run deployment:verify` against the local production preview | Passed for 382 samples and 1,321 routes/assets; public production verification has not run |
| Historical reference-heading audit | Passed for existing grouping-page H2 anchors; a complete audit of every guide/fragment is still open |
| Documentation cleanup/reference search | Passed; no remaining project-source references or matching files for the retired generator/publishing helpers |
| README and related documentation links/assets | Passed; local links, real gallery preview, and correct contributor badge exist |

The detailed phases below are reconciled with this evidence. Production and
manual SharePoint release gates remain open.

## 1. Outcome and design direction

Build an Astro-powered GitHub Pages gallery that makes SharePoint and Microsoft
Lists formatting easy to discover, understand, copy, and contribute.

Implemented first-review identity: **SharePoint List Formatting**, with the gallery message
**"From JSON to better lists."**

- Use the SharePoint logo for the header, favicon, and site identity.
- Combine SharePoint Skills' teal branding, useful detail pages, and filter
  sidebar with Copilot Prompts' compact top navigation, typography, subtle grid,
  and decorative side backgrounds.
- Make this gallery distinct through list-row/grid motifs, column/view/form
  icons, and restrained Lists-inspired accent colors. Do not modify the
  SharePoint logo or make the site look like a Copilot-only product.
- Make real sample screenshots and the JSON adoption experience the focus,
  rather than a large marketing section that pushes the gallery down the page.
- Deliver both light and dark themes, responsive layouts, and accessible
  keyboard and screen-reader experiences.
- Preserve the current site's useful guidance, reference material, tools,
  attribution, and public links.

### References analyzed

Live pages, local source, branding assets, workflows, and test coverage were
reviewed. Local references are implementation examples, not runtime dependencies.

| Reference | Adopt | Local implementation pointers |
| --- | --- | --- |
| [Copilot Prompts](https://pnp.github.io/copilot-prompts/) | Top navigation, compact introduction, community ribbon, subtle page grid, side artwork, shareable filters, page-specific tracking | [Layout](../copilot-prompts/site/src/layouts/Layout.astro), [gallery](../copilot-prompts/site/src/pages/index.astro), [styles](../copilot-prompts/site/src/styles/global.css), [asset provenance](../copilot-prompts/site/public/images/ASSET-PROVENANCE.md) |
| [SharePoint Skills](https://pnp.github.io/sharepoint-skills/) | SharePoint logo and teal palette, filter sidebar, progressive results, rich detail pages, contributors and contribution encouragement | [Layout](../sharepoint-skills/site/src/layouts/BaseLayout.astro), [gallery](../sharepoint-skills/site/src/pages/index.astro), [detail page](../sharepoint-skills/site/src/pages/skills/[slug].astro), [styles](../sharepoint-skills/site/src/styles/global.css) |
| [SPFx Copilot Components: What's new](https://pnp.github.io/spfx-copilot-components/whats-new/) | Metadata-driven Added/Updated timeline with dates, summaries, and direct sample links | [What's new](../spfx-copilot-components-vesa/site/src/pages/whats-new.astro), [catalog model](../spfx-copilot-components-vesa/site/scripts/gallery-model.mjs) |
| Reference quality pipelines | Metadata/model validation, Astro checks, production build, Playwright, axe, artifact diagnostics, deployment identity verification | [Prompts validation](../copilot-prompts/.github/workflows/validate-site.yml), [Skills validation](../sharepoint-skills/.github/workflows/validate-skill-pr.yml), [Components validation](../spfx-copilot-components-vesa/.github/workflows/validate-gallery.yml), [Components deployment](../spfx-copilot-components-vesa/.github/workflows/deploy-gallery.yml) |
| [Existing List Formatting site](https://pnp.github.io/List-Formatting/) | Existing learning material, all sample groupings, class reference information, tools, and contribution guidance | [Astro navigation](./site/src/layouts/Layout.astro), [home content](./docs/index.md), [getting started](./docs/gettingstarted/), [groupings](./docs/groupings/), [tools](./docs/tools/index.md), [contribution guidance](./docs/contributing/) |

Important adaptations, rather than blind copying:

- The reference sites' community-call CTAs sometimes point to Community Home.
  Here, call and video CTAs must use their specific destinations.
- Keep formatting definitions directly copyable; a source link or a generic
  repository ZIP is not sufficient.
- Formatting samples have multiple definitions and different schemas. Do not
  import a single-file skill/component content model unchanged.
- Reuse existing patterns locally; do not introduce a shared cross-repository
  framework or design-system package for this migration.

## 2. Repository audit baseline and current state

### Inventory

| Sample family | Sample folders | Root-level JSON definitions |
| --- | ---: | ---: |
| [Column samples](./column-samples/) | 188 | 306 |
| [View samples](./view-samples/) | 178 | 223 |
| [Form samples](./form-samples/) | 16 | 22 |
| **Total** | **382** | **551** |

- All 382 sample folders have a README and parseable metadata in
  `assets/sample.json`. Current metadata identifies 88 contributors: 87 recorded
  GitHub accounts and one named contributor without a GitHub account.
- Sample assets total approximately 241 MiB. A gallery must not eagerly
  download every original image or animated GIF.
- Public production remains the earlier documentation site. Astro is now the
  only supported source build/publisher and generates catalog/grouping content
  directly from sample metadata; Farrier-compatible source metadata is retained.
  See the [developer guide](./GALLERY-DEVELOPMENT.md).
- The [aggregate catalog](./samples.json) originally contained 360 entries and
  a folder-case mismatch. It now contains all 382 samples, is regenerated from
  source metadata, and is checked for drift.
- The upstream default and configured production deployment target are `master`.

The original inventory was read-only. Implementation now includes strict JSON,
offline schema, relative-target, and built-link checks. Recorded schema findings
and actual SharePoint runtime behavior still require separate review.

### Original findings and their resolution

- [x] **Published URL casing:** `https://pnp.github.io/List-Formatting/` returns
  HTTP 200; the lowercase `/list-formatting/` returns HTTP 404. Earlier settings
  declared the lowercase URL; the
  [Astro configuration](./site/astro.config.mjs) uses the correct case-sensitive base.
  [aka.ms/list-formatting](https://aka.ms/list-formatting) resolves to the
  uppercase public site.
- [x] **PR coverage:** corrected the
  [sample-validation workflow](./.github/workflows/validate-sample.yml) from
  `main` to `master`; added read-only gallery build/browser validation.
- [x] **Invalid copyable JSON:** removed the inline `//` comment from
  [Certificate Card](./view-samples/certificate-card/certificate-card.json).
  Its logo instructions remain in its README; the source itself must parse.
- [x] **Thumbnail metadata:** repaired seven references that did not match exact tracked
  filenames: six missing paths/extensions and one capitalization mismatch.
  Affected samples are
  [Start Flow Conditionally](./column-samples/generic-start-flow-conditionally/assets/sample.json),
  [Course Registration](./column-samples/text-course-registration/assets/sample.json),
  [Flashcards](./view-samples/flashcards/assets/sample.json),
  [Glossary](./view-samples/glossary-dynamicfilter-view/assets/sample.json)
  (two references),
  [Issue Tracker Planner Cards](./view-samples/issue-tracker-planner-cards/assets/sample.json),
  and [Team Poll](./view-samples/team-poll/assets/sample.json).
  Exact-case validation now prevents Windows from hiding these Linux failures.
- [x] **Tracking mismatch:** corrected the
  [Photo Gallery Description Link Like README](./view-samples/photo-gallery-description-link-like/README.md)
  that previously used another sample's tracking suffix.
- [x] **Valid structural variations:** the content model supports four folders without a folder-named JSON file,
  including [Custom Charts](./view-samples/custom-charts/) and
  [Status Header and Footer](./form-samples/status-header-footer/). These are
  legitimate multi-definition samples, not missing samples.
  [Bar Chart Diagram](./view-samples/bar-chart-diagram/assets/sample.json) also
  has a valid preview with a nonstandard filename. Definitions are discovered
  and thumbnail metadata is honored without destructive renames.
- [x] **Identity collisions:** `custom-hover-card` and `multi-choice-links` each
  exist in both column and view families, including duplicated metadata names.
  The site uses family-qualified identities; historical catalog IDs are unchanged.
- [x] **Schema diversity:** the validator supports column, row, view, tile, and board
  schemas, including older versions. Twenty-one parseable definitions have no
  `$schema`; form header/footer/body formats are validated according to context.
- [x] **Metadata template drift:** aligned the
  [metadata template](./sample-template.json) and guidance with the established
  nine-key vocabulary, keeping external catalog compatibility.
- [ ] **Documentation review candidates:** [Generic Status Badges](./column-samples/generic-status-badges/README.md)
  and [Course Training Tiles](./view-samples/course-training-tiles/README.md)
  have no recognized requirements heading in the initial scan. Review content
  manually before treating this as a defect.
- [x] **Badge mismatch:** the local Copilot Prompts
  [badge image](../copilot-prompts/images/contributor-badge.png) says
  **Prompt Pro**, not Community Contributor. The site uses the correct artwork from the requested
  [Community Contributor badge](https://www.credly.com/org/m365pnp/badge/community-contributor-microsoft-365-power-platform-).
  Credly currently identifies this as the 2026 badge and provides
  [official artwork](https://images.credly.com/images/76dbe4bd-e45c-4c7a-a079-f5b6e7a893bd/blob).
- [x] **Existing analytics:** the legacy site includes
  [Clarity](./docs/js/clarity.js). It is not included in Astro, and visitor
  images are disabled by default to avoid additional metered-service requests.
- [ ] **Historical schema debt:** triage the 490 recorded findings rather than
  interpreting accepted source-hash-bound exceptions as clean schema results.

## 3. Information architecture and content migration

### Primary navigation

Use this exact order on desktop and mobile:

1. **Community** -> <https://aka.ms/community/home> (external).
2. **Gallery** -> site root.
3. **Getting started** -> `/getting-started/`.
4. **Contributors** -> `/contributors/`.
5. **Contributing** -> `/contributing/`.
6. **What's new** -> `/whats-new/`.

Keep GitHub and the theme toggle as utility controls. Tools and reference
material remain easy to find through Getting started, gallery advanced filters,
contextual sample links, and the footer without overcrowding the primary menu.

All site-relative routes below live under `/List-Formatting/`.

| Existing content | Implemented home / remaining work | Preservation requirement |
| --- | --- | --- |
| Home and separate column/form/view listings | `/` with Column, View, and Form quick filters | Keep entry-point aliases for the old listings |
| Using samples; applying column/view formatting | `/getting-started/` and focused column/view guides | Preserve illustrations, deep links, and practical steps |
| Form formatting guidance | New focused form guide under Getting started | Explain Header, Body, and Footer separately, including conditional field visibility |
| Group by column type/category/operator/token/action/feature | Gallery sidebar and advanced filters; reference landing page | Keep existing grouping routes and meaningful anchors |
| CSS class groupings | `/reference/` links to retained `/groupings/classes/<family>/` pages | Explanations, warnings, swatches, live sample associations, and historical grouping H2 anchors retained |
| Group by author | `/contributors/` and author-filtered gallery links | Preserve the old author grouping entry point |
| SharePoint 2019 grouping | Compatibility filter and retained `/groupings/SP2019/`; dedicated compatibility guide still pending | Keep legacy platform support visible and distinct from SharePoint Online |
| Contributing: issues, changes, samples, docs, tools | `/contributing/` with focused subpages | Preserve CLA, Code of Conduct, sample-type templates, and tool-contribution links |
| SP Formatter and Jsonify | `/tools/`, linked from Getting started and sample pages | Promote these as recommended editing/conversion tools |
| VS Code deployment scripts | Tools -> Advanced deployment guide | Preserve [PowerShell and M365 CLI material](./tools/general-dynamic-deployment-with-vscode/); audit dated setup instructions before calling them current |
| HTML-to-Formatter generator | Existing `/tools/html-formatter-generator/index.html` and deprecated entry in Tools; grouped tool cards still pending | Keep the working asset bundle and URL; clearly label deprecated and recommend Jsonify |
| vscode-pets | Existing Tools entry preserved; separate "Community extras" section still optional/pending | Keep it separate from essential formatting guidance |
| Official documentation and List Formatting YouTube playlist | Official links preserved; explicit specialist-playlist promotion still pending | Retain specialist links alongside the broader community channel |
| Individual sample README and definitions | `/samples/column/<slug>/`, `/samples/view/<slug>/`, `/samples/form/<slug>/` | Preserve all definitions, assets, authors, documentation, and source links |
| Aggregate metadata and external sample-browser integration | Deterministically generated public catalog plus compatible legacy output where required | Verify consumers and Farrier handoff before changing published shapes |

GitHub Pages does not supply arbitrary server redirects. Generate static
compatibility pages/aliases with canonical URLs and usable no-JavaScript links.
For paths needing redirects, preserve query strings and fragments. Inventory
actual published paths and test old heading anchors before production cutover.

## 4. Implementation and release tracking

The first implementation was authorized with reasonable defaults. Dependencies
below show the work sequence; final review and production approval are separate
open gates, not prerequisites that prevent acknowledging completed code.

| Phase | Current status |
| --- | --- |
| 0 - Contract | Review defaults implemented; final approval and consumer audit open |
| 1 - Content model | Implemented and validated; additional focused tests open |
| 2 - Astro/design foundation | Implemented; final visual approval open |
| 3 - Gallery/adoption | Core implemented; remaining UX enhancements listed below |
| 4 - Guides/reference/tools | Migrated; content polish and template review open |
| 5 - Community/activity/tracking | Core implemented; supplemental links and opt-in tracking tests open |
| 6 - Quality gates | Local automation passes; historical debt, manual checks, and GitHub enforcement open |
| 7 - Deployment/cutover | Workflow implemented and locally verified; not deployed |
| 8 - Sibling sites | Not started; separate follow-up scope |

### Phase 0 - Review and lock the migration contract

- [x] Implement the agreed first-review scope using recommended branding,
  navigation, route map, and light-by-default theme assumptions.
- [ ] Obtain final design and production-launch approval after review.
- [x] Confirm canonical upstream deployment versus fork previews, keeping
  production source links on `pnp/List-Formatting` and branch `master`.
- [x] Inventory and preserve the source documentation routes, static tool
  assets, and historical grouping H2 anchors.
- [ ] Complete the external catalog-consumer and remaining guide-anchor audit.
- [x] Keep sample metadata as the source of truth and regenerate the legacy
  aggregate without independently editing a second catalog.
- [ ] Confirm the external Farrier/sample-browser handoff before retiring any
  existing process.
- [x] Confirm correct Community Contributor artwork, attribution, and badge
  eligibility wording.
- [x] Omit Clarity from Astro and disable visitor-image tracking by default.

Remaining gate: final review approval and external-consumer confirmation.

### Phase 1 - Establish sample integrity and the content model

First-review defaults from Phase 0 are implemented.

- [x] Add a reproducible repository audit with file/line or JSON-pointer diagnostics and a
  machine-readable result plus readable CI summary.
- [x] Correct the confirmed JSON, thumbnail, tracker, and catalog-case defects
  identified above; regenerate missing aggregate entries through the agreed
  source-of-truth process.
- [x] Discover all sample folders from the three families, reading their
  `assets/sample.json`, README, definitions, and linked supporting assets.
- [x] Normalize the existing metadata keys: `LIST-SAMPLE-TYPE`,
  `SHAREPOINT-COMPATIBILITY`, `SAMPLE-CATEGORIES`, `LIST-COLUMN-TYPE`,
  `FORMATTING-TOKENS`, `FORMATTING-OPERATORS`, `FORMATTING-ACTIONS`,
  `FORMATTING-FEATURES`, and `CLASSES`.
- [x] Use family-qualified IDs and URLs; detect true duplicate routes without
  changing historical metadata names just to suit the website.
- [x] Discover all definition variants, including header/footer pairs, chart
  collections, and body-layout JSON; distinguish formatting from supporting
  data/configuration files.
- [x] Preserve authored creation/update dates and deterministic sorting. Never
  make every sample "new" because the site was rebuilt or migrated.
- [x] Sanitize rendered Markdown/HTML, resolve relative links and images,
  preserve tables/anchors/downloads, and convert existing indented admonitions and
  icon syntax where needed.
- [x] Select previews from ordered thumbnail metadata, generate local optimized
  derivatives, and retain access to full-size images and original GIFs.
- [x] Fail explicitly for missing/invalid required content rather than skipping
  samples, silently repairing source, or publishing misleading placeholders.
- [x] Add model tests covering multi-file destinations, shared slugs, exact-case
  assets, schemas, strict JSON, sanitization, trackers, README link rewriting,
  and every generated download's byte fidelity.
- [ ] Add dedicated metadata-normalization and date edge-case unit tests.

Verified: all 382 current samples and 551 definitions are accounted for, with any
new additions discovered automatically and no unexplained exclusions.

### Phase 2 - Build the Astro foundation and visual identity

Implemented using Phase 0 review defaults and the Phase 1 content model.

- [x] Create a self-contained `site` project with TypeScript, a lockfile,
  documented Node requirements, static output, and reproducible npm commands.
- [x] Configure production `site`, exact `/List-Formatting/` base, trailing
  slashes, base-aware links/assets, sitemap, robots, canonical/social metadata,
  and a helpful 404 page.
- [x] Implement the shared layout, exact primary navigation order, active
  states, mobile menu, skip link, footer, and GitHub utility link.
- [x] Reuse the SharePoint Skills
  [SharePoint logo](../sharepoint-skills/site/public/images/SharePoint_512.png)
  without alteration; record provenance and applicable asset/font notices.
- [x] Adopt Parker/community typography where permitted, SharePoint teal
  surfaces, Lists-like row/card accents, and the Copilot Prompts grid plus
  decorative side-background model across page types.
- [x] Tune artwork placement/opacity for dark mode and small screens; avoid
  placing busy artwork behind body text or code.
- [x] Implement light/dark theme initialization before paint, a clearly labeled
  keyboard-operable toggle, persisted preference, safe behavior when storage is
  unavailable, and reduced-motion support.
- [x] Keep navigation and readable content useful without JavaScript; enhance
  filtering and copying rather than requiring a client-side app framework.

- [ ] Obtain final desktop/mobile visual approval and finish the full requested
  viewport/manual accessibility matrix.

Verified: responsive desktop/mobile checks and base-path behavior pass; final
visual approval is still open.

### Phase 3 - Deliver gallery and sample adoption pages

Depends on Phases 1 and 2.

- [x] Build an introduction with total and per-family counts and a
  prominent "From JSON to better lists" adoption message and direct gallery
  and getting-started links.
- [x] Add screenshot-first cards with title, concise description, family,
  contributor attribution, definition count, and meaningful updated date.
- [ ] **Partial:** add compatibility badges to the gallery cards; compatibility
  already appears in filters and detail pages.
- [x] Provide search plus primary family/category/column-type/compatibility
  filters. Put operators, tokens, actions, features, CSS classes, and contributor
  filters in a discoverable advanced section.
- [x] Support combined filters, visible active-filter chips, result counts,
  clear/reset, empty states, and sorting by recently updated/newest/title.
- [x] Preserve filter/sort/result-limit state in shareable URLs and browser
  back/forward navigation. Start with 18 results and progressively reveal more
  without eagerly loading original images or GIFs.
- [ ] Verify return-to-gallery scroll/result position after visiting a detail page.
- [x] Generate a detail page for every sample with primary preview, summary,
  README, requirements, authors, dates, compatibility, references, source, and
  contextual Report a problem/Suggest an improvement links.
- [ ] **Partial:** add an explicit multi-image screenshot gallery; additional
  screenshots currently remain accessible through the original README/assets.
- [x] Place a **Get this format** panel near the top: clear definition/variant
  selector, labeled destination (Column/View/Form Header/Body/Footer), Copy JSON,
  Download JSON, and View source.
- [x] Provide syntax-highlighted, selectable code with filename, accessible
  copy status, explicit clipboard errors, and a manual-selection path when the
  Clipboard API is unavailable. Never report success before a successful copy.
- [x] Copy the entire selected source definition, not an excerpt, metadata, or
  a prettified replacement; downloaded JSON must match repository bytes.
- [x] Expose every variant with stable deep links, including multi-file forms
  and charts, and label its Column/View/Form Header/Body/Footer destination.
- [x] Preserve original README requirements and add generic internal-name,
  tenant-URL, flow-ID, security, and application-guide notices.
- [ ] Review requirements/application order across samples and promote clear
  structured setup information where original documentation is incomplete.
- [x] Preserve supporting links such as the chart Excel workbooks. Do not lose
  them when converting relative README links.
- [x] Link to the correct application guide and relevant tools; offer related
  samples based on family/category without a recommendation service.
- [x] Treat screenshots as screenshots, not a purported executable SharePoint
  preview. Do not execute contributed formatting or actions in the gallery.

Verified: samples and definitions are discoverable/copyable without cloning.
Remaining work is the explicit UX and requirements-review backlog above.

### Phase 4 - Migrate learning, reference, and tools content

Depends on Phases 1 and 2; can proceed alongside Phase 3.

- [x] Migrate the current Getting started content and screenshots; add a
  complete form-formatting guide and a short "Which format do I need?" chooser.
- [x] Preserve original guidance and add explicit warnings that formatting is
  not a security control.
- [ ] Expand guidance on formats whose actions change data or execute flows.
- [ ] Add troubleshooting for internal versus display names, fields required in
  the view, supported field types, dates/locales, permissions, and platform
  differences.
- [x] Preserve class-family introductory guidance, warnings, swatches, and all existing
  grouping dimensions through the reference area and gallery deep links.
- [x] Preserve the Tools listing, recommended editors, deployment material,
  deprecated generator, and existing community extras.
- [ ] **Partial:** reorganize Tools into the proposed clear Recommended,
  Advanced deployment, Legacy, and Community extras sections.
- [ ] Audit dated deployment-script setup/authentication instructions before
  presenting them as current recommendations.
- [x] Carry forward the legacy generator's static bundle without making its old
  React/Webpack dependency installation part of the new site's normal build.
  Smoke-test the actual tool, not just the landing page.
- [x] Migrate contribution subpages and update
  [contribution guidance](./.github/CONTRIBUTING.md).
- [x] Update the
  [metadata template](./sample-template.json) and
  [documentation build guidance](./docs/contributing/docs.md).
- [ ] **Partial:** reconcile all sample-type README templates and placeholders:
  [README templates](./column-samples/README-template.md),
  [form template](./form-samples/README-template.md),
  and [view template](./view-samples/README-template.md).
- [x] Preserve disclaimers, license, CLA, and Code of Conduct links, verifying
  destinations rather than adding links to nonexistent policy files.
- [x] Generate legacy route aliases and check historical grouping H2 anchors.
- [ ] Audit remaining guide fragments and full published-route coverage before
  retiring the old publisher.

Verified: every former navigation area has a home and the legacy converter
actually transforms HTML in a browser test. Content polish remains open.

### Phase 5 - Community, recognition, activity, and tracking

Depends on Phases 1 and 2.

- [x] Add a concise community ribbon and footer promotion with distinct links:
  [Community](https://aka.ms/community/home),
  [Community calls](https://aka.ms/community/calls), and
  [YouTube](https://aka.ms/community/youtube).
- [x] Add the specialist List Formatting playlist, demo invitation, and community
  recognition guidance to the repository README.
- [ ] Keep the specialist List Formatting video playlist as an additional
  learning resource in Astro. It is now linked from the repository README, but
  still needs an explicit website learning-resource link.
- [x] Generate Contributors from normalized metadata authors, deduplicating
  handles case-insensitively and linking contribution counts to gallery filters.
  Avoid runtime GitHub API calls for page rendering.
- [x] Show small, lazy-loaded GitHub profile images for all 87 recorded GitHub
  accounts; retain an initial only for the contributor without a recorded
  account. Desktop/mobile avatar regression tests passed.
- [x] Show the correct Community Contributor badge on Contributors and a
  recognition CTA on Contributing, linked to the exact requested Credly page.
- [ ] Add an explicit [recognition guidance](https://aka.ms/community/recognition)
  link alongside the Credly CTA.
- [x] Explain that an approved contribution can qualify under the published
  criteria; do not promise an automatically or instantly awarded badge.
  Include documentation fixes, sample repairs, accessibility work, and demos
  as welcoming contribution paths where applicable.
- [x] Build What's new from creation/update metadata, using the SPFx reference's
  Added/Updated timeline, dates, summaries, and sample links. Add family filters
  and limit/paginate long history without inventing freshness.
- [x] Implement optional stable visitor-image identities unique to each sample:
  `https://m365-visitor-stats.azurewebsites.net/list-formatting/<family-folder>/<slug>`,
  matching the existing sample README identity.
- [x] Remove embedded README trackers and emit no tracking images by default.
  When explicitly enabled, emit a single layout/detail tracker, not trackers on
  cards, downloads, or hidden variants.
- [x] Use distinct identities for non-sample pages and document whether
  GitHub README and site views intentionally share the same sample counter.
- [x] Validate unique/correct tracker URLs, final-line README placement, and
  removal of README trackers from rendered content.
- [ ] Add opt-in browser tests for exactly one tracker per page and for
  continued reading/copying when that external image request fails.
- [x] Document the external visitor-image request and the agreed analytics
  policy; keep functional browser tests independent of tracker availability.

Verified: core community, recognition, activity, avatars, and free defaults are
implemented. Supplemental links and opt-in tracking tests remain open.

### Phase 6 - Add PR quality gates and complete sample-quality review

Validator/model work begins in Phase 1; full site gates depend on Phases 2-5.

- [x] Add fork-compatible `pull_request` checks targeting the real base branch,
  covering all three sample trees, documentation, site code, schemas,
  templates, tooling integration, and workflow changes.
- [x] Retain the existing PnP validator and correct its target branch to `master`.
- [ ] Inspect that existing action's behavior before changing its privileged
  event model; the new gallery build uses a separate read-only PR workflow.
- [x] Run new gallery PR builds with read-only permissions and no secrets. Do not
  execute PR code in a privileged `pull_request_target` context.
- [x] Pin reusable actions, use lockfile installs and dependency caching, set
  timeouts/concurrency, and upload useful diagnostics on failure.
- [x] Validate metadata against the pinned PnP contract plus repository invariants:
  required files, family consistency, stable identity, valid dates, authors,
  thumbnails, paths, and established metadata keys.
- [x] Validate strict JSON syntax, duplicate properties, and applicable pinned
  Microsoft schemas. Treat form body/header/footer formats and historical
  schema versions explicitly; document schema limitations and any narrowly
  justified exceptions.
- [x] Check that README-referenced definitions/assets exist with exact casing,
  each exposed download is intentional, and tracker suffixes match folders.
- [ ] Check requirements, screenshots/alt text, working links, current setup
  guidance, and update-history expectations. Review content, not merely the
  presence of headings.
- [x] Separate objective errors from advisory maintenance/accessibility
  findings. Establish a visible, finite remediation backlog for historical
  schema/content debt; do not use a blanket ignore to make CI green.
- [x] Pass strict-JSON, required local-target, generated-route, definition, and
  download-fidelity checks for the current catalog. New/changed quality findings
  require source fixes or an explicit source-hash-bound baseline review.
- [ ] Remediate or individually confirm the historical schema findings and
  agree final stricter authoring expectations before launch.
- [x] Add 11 unit tests for identity/definition destinations, schemas, strict
  JSON, sanitization, link resolution, trackers, exact casing, and all downloads.
- [x] Add browser coverage for core navigation, family/search filtering, URL
  restoration, form variants, column/form copy/download, clipboard failure,
  What's new listing, contributors/avatars, themes, and the actual legacy tool.
- [ ] Expand browser coverage for sorting, metadata-filter combinations,
  view-definition selection, all variant deep links, What's new controls, and
  unknown/404 routes.
- [x] Run axe on representative page types in both themes on desktop/mobile;
  the latest avatar update's targeted accessibility checks passed.
- [ ] Complete manual keyboard, zoom, focus, contrast, and screen-reader checks.
- [x] Validate built links/assets and known legacy routes; the build checks
  1,377 internal targets and the reference-heading audit preserves old H2 anchors.
- [ ] Audit additional external links separately from blocking PR checks.
  **Deferred:** no scheduled crawler is enabled by default, to avoid unnecessary
  runs and third-party-outage failures.
- [ ] Review sample behavior in SharePoint: check every sample's documentation
  and assets; functionally test all repaired samples and a matrix spanning
  columns, rows, tiles, boards, grouped views, forms, multi-file variants,
  actions, and claimed legacy compatibility.
- [x] Display as-is/compatibility caveats and per-definition schema-review notes
  without adding an unearned functional-verification badge.
- [ ] Record actual SharePoint platform/date and outcomes after runtime testing.
- [x] Implement CI summaries and actionable diagnostics; preserve existing CLA
  guidance/checks rather than substituting website checks for them.
- [ ] Exercise the workflows on real upstream/fork PRs and configure required
  status checks in GitHub branch protection.

Implemented local/CI command contract: `npm ci`, `npm run validate:samples`, `npm test`,
`npm run check`, `npm run build`, `npm run validate:links`, and
`npm run test:e2e`, run from the [site project](./site/).

Verified: local automation passes and the same commands are wired into workflows.
Actual GitHub runs, merge enforcement, full manual review, and historical
schema remediation are not complete.

### Phase 7 - Deploy, verify, and cut over

Depends on Phases 3-6 and the legacy migration acceptance checks.

- [x] Implement a GitHub Pages workflow using build/upload/deploy
  artifacts, with write permissions restricted to the deploy job.
- [x] Guard publishing to upstream `pnp/List-Formatting` on `master`, and require
  a manual dispatch. Local/fork checks do not publish over production.
- [x] Wire the same required validation before deployment, including content
  changes that do not touch website code.
- [x] Embed commit identity, catalog count/hash, and definition count in a
  deployment manifest, and implement verification of pages/previews/downloads.
- [x] Verify the local production preview: 382 samples, 1,321 routes/assets,
  catalog hash, and commit-marker checks passed. Legacy routes and converter
  behavior also passed local checks.
- [ ] Configure/confirm the actual GitHub Pages source, protected environment,
  and required repository status checks with maintainers.
- [ ] Approve and perform the first production deployment.
- [ ] Run the manifest, catalog, route, asset, and legacy-link checks against the
  public production URL after deployment, not just HTTP status checks.
- [ ] Check mobile and desktop production views in both themes, metadata/share
  images, community destinations, badge, tracking requests, and browser errors.
- [x] Remove obsolete root publishing scripts/configuration and their references;
  document Astro and the validated Pages workflow as the only publishing path.
- [x] Document rollback using reviewed source changes and retained validated
  Pages artifacts, not a second local documentation publisher.
- [ ] Record the actual previous working production deployment before cutover.
- [x] Update the [repository README](./README.md) with the new gallery,
  contributor invitation, community resources, and sample-adoption guidance.
- [x] Separate website-maintainer instructions into
  [GALLERY-DEVELOPMENT.md](./GALLERY-DEVELOPMENT.md) and update contributor/documentation links.
- [x] Add the actual gallery preview and Community Contributor badge image,
  explain eligibility and contribution steps, and retain CLA, Code of Conduct,
  support, licensing, and sample-specific cost caveats.

Not complete: production is unchanged. Deployment implementation and local
verification must not be confused with a published, production-verified release.

### Phase 8 - Follow through across the reference repositories

Not started. These are separate follow-up changes; sibling repositories have
only been read as references.

- [ ] Add **Community** as the first primary navigation item on Copilot Prompts,
  SharePoint Skills, and SPFx Copilot Components, on desktop and mobile.
- [ ] Normalize community-call links to
  <https://aka.ms/community/calls> and add the channel destination
  <https://aka.ms/community/youtube> where appropriate.
- [ ] Preserve each site's identity and existing navigation; update browser
  expectations and validate each repository independently.

## 5. Launch acceptance criteria

- [x] Every current sample is present: baseline 382 samples, 551 definitions,
  with counts derived from source and adjusted for later repository changes.
- [x] Every definition variant has a reachable source, full code view, correct
  Copy JSON action, and byte-identical download. Clipboard newline normalization
  is the only permitted platform-specific difference in copied text.
- [x] Shared slugs are family-qualified; the aggregate array/original metadata
  IDs are retained and generation is deterministic.
- [ ] Confirm compatibility with all external catalog consumers before cutover.
- [x] Primary navigation order is exact on desktop/mobile, including Community
  first, and all three community destinations are correct.
- [x] The actual SharePoint logo, requested Community Contributor badge, and
  Copilot Prompts-style backgrounds are present with appropriate provenance.
- [x] Light/dark choices persist and initialize before paint; automated
  desktop/mobile theme and accessibility checks pass.
- [ ] Finish manual theme/focus/contrast review rather than treating automated
  coverage as proof of every accessibility requirement.
- [ ] No horizontal page overflow at 320, 375, 768, 1024, or 1440 CSS pixels;
  long code/tables scroll within their containers.
- [x] No serious/critical accessibility violations detected in the tested
  representative pages in either theme on desktop/mobile.
- [ ] Complete WCAG 2.2 AA manual checks for keyboard, zoom, focus, contrast,
  and screen-reader behavior.
- [x] Production build validation reports zero broken required internal
  link/asset targets; all 551 downloads match source bytes.
- [x] Known legacy routes and historical grouping H2 anchors are retained.
- [ ] Finish the wider published-guide/fragment audit.
- [x] Tracking is off by default; optional sample identities are stable and
  embedded README trackers are stripped.
- [ ] Verify exactly one tracker per page and failure tolerance in an explicitly
  opted-in build.
- [x] Gallery starts with at most 18 cards and no eager original GIFs.
  Measured initial previews are about 267 KiB and inline gallery JS about
  1.6 KiB gzip, below the proposed payload budgets.
- [ ] Measure median mobile Lighthouse Performance >= 90 across three
  documented production-preview runs and approve the release budget.
- [ ] Public production verification checks commit identity and catalog content,
  not just status codes.
- [x] No claim that all samples were functionally verified unless the recorded
  test coverage actually supports it.

## 6. Suggested enhancements and decisions for review

### Recommended, low-complexity additions

- [ ] Add three starter recipes: **Format a status column**, **Turn a view into
  cards**, and **Polish a form header**. Each links to an existing reviewed
  sample and the exact application guide.
- [ ] Add curated entry points such as **Make data readable**, **Show progress**,
  **Make lists actionable**, and **Build visual galleries**, backed by existing
  categories rather than a new taxonomy service.
- [ ] Surface action prerequisites and destructive-action warnings clearly,
  especially for delete, setValue, and executeFlow examples.
- [ ] Offer an optional compact list/results view for users prioritizing
  technical discovery over screenshots.
- [ ] Add an RSS/Atom feed for What's new after the metadata timeline is stable.
- [ ] Consider local-only favorites later; avoid accounts or a backend.

### Implemented first-review decisions

1. **Brand wording:** header "SharePoint List Formatting", page title "List
   Formatting Gallery", and Microsoft Lists explicitly included in the intro.
2. **Initial theme:** light by default with an accessible persisted toggle.
   Theme behavior is covered by browser tests.
3. **Tracking/costs:** disabled by default; optional tracking reuses each
   README's sample identity. No new Azure resource or paid analytics is needed.
4. **Legacy tool:** preserve its working prebuilt bundle and recommend Jsonify,
   without installing/rebuilding the old dependency tree.
5. **Existing Clarity:** not ported into Astro.
6. **Catalog ownership:** per-sample metadata is authoritative; both the public
   catalog and legacy aggregate are generated from it. External Farrier/consumer
   sign-off is still pending.
7. **Scope boundary:** static Pages and client-side search; no paid backend,
   accounts, favorites service, executable sample preview, or shared cross-site
   package. Optional features remain deferred.
8. **Contributor recognition:** use small, lazy-loaded GitHub profile images;
   initials are only a fallback where no GitHub account is recorded.

## 7. Review checkpoint

- [x] Implement the authorized first-review slice using reasonable defaults:
  sample-integrity fixes, content model, Astro shell, full catalog, community
  pages, and local quality automation.
- [x] Validate the full generated catalog, every download, representative
  column/form copying, multi-definition forms, multi-variant view layout,
  legacy converter, and latest contributor avatars.
- [ ] Review the current design and adoption flow with the user.
- [ ] Address the explicitly open partial UX/content/test items before deciding
  the production launch scope.
- [ ] Complete the required manual SharePoint and accessibility verification.
- [ ] Approve GitHub settings and production cutover; then perform public
  deployment verification.
- [ ] Follow through on the three sibling sites separately.
