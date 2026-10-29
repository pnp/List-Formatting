# Gallery development and operations

This guide is for contributors maintaining the gallery website. None of these
tools or build steps are required to browse the gallery or copy a sample.
For sample adoption, use the [repository README](./README.md#find-and-apply-a-format).

The gallery source lives in [site](./site/) and is an Astro static site served from the case-sensitive
`https://pnp.github.io/List-Formatting/` project path.

Commands below start from the repository root. After `Set-Location site`,
run subsequent npm commands from that project directory.

## Local review

Requires Node.js 22.19 or newer.

```powershell
Set-Location site
npm ci
npm run dev -- --port 4337
```

Open `http://127.0.0.1:4337/List-Formatting/`. To test the production output:

```powershell
npm run check
npm run build
npm run preview -- --port 4337
```

## Validation

```powershell
npm run validate:samples
npm test
npm run check
npm run build
npm run test:e2e
```

The build includes internal-link/asset validation. Browser tests start their own
production preview server on port 4337; stop any manual Astro preview for this
project first (Astro permits one preview process per project).
If Playwright reports that Chromium is missing, run `npx playwright install chromium`.

The generator reads every sample's metadata and discovers every root-level JSON
definition, including multi-file forms and chart variants. It validates strict
JSON (including duplicate keys), exact-case thumbnail paths, metadata invariants,
and unique final-line README trackers. Downloads preserve original bytes.

Pinned Microsoft formatting schemas and the PnP metadata schema are checked
offline. Historical schema incompatibilities and documentation review items are
visible in `quality.json` and the checked-in quality baseline. New issues fail
validation; this is not a blanket schema-validation bypass. Fix source where
possible. Updating the baseline is an explicit maintainer operation:

```powershell
npm run quality:baseline
```

Review the changed baseline before accepting it. Schema validation is not proof
that a sample works in a SharePoint tenant. Test changed formats in their intended
list/form context, including long/empty values and required actions/permissions.

`npm run catalog:update` deterministically refreshes the repository's existing
[aggregate catalog](./samples.json) from sample metadata. Its array shape and
original metadata IDs are preserved for external consumers; Farrier can still
consume the original metadata. The Astro site does not depend on Farrier.
Existing committed entry order is retained, with new samples appended.
Validation rejects catalog drift and tells contributors to regenerate it.

## Free-by-default operation

- GitHub Pages serves static files; no database, functions, accounts, API keys,
  paid search, new Azure resource, or runtime GitHub API calls are required.
- Standard hosted Actions runners for this public repository and GitHub Pages
  for the public site are available without metered application infrastructure.
  Private forks and changed GitHub plans can have different billing rules.
- Pull-request validation cancels superseded runs and uses bounded concurrency.
  Browser diagnostics are retained only briefly. There are no scheduled crawlers.
- Publishing is manual for the initial review version. No deployment occurs
  merely by running development or build commands.
- Client search works offline after the static page and assets load. Original
  README images are lazy-loaded from GitHub; gallery previews are optimized local
  stills. The site does not ship a second 241 MiB copy of original sample assets.
- The legacy HTML-to-Formatter bundle is copied without rebuilding its old
  React/Webpack dependencies. Do not install those dependencies for a site build.

The existing visitor-image service is **disabled by default**, avoiding additional
requests to potentially metered community infrastructure. To opt in explicitly,
set `PUBLIC_ENABLE_VISITOR_STATS=true` during the build. Each sample then emits
one image using its original family-qualified README tracking identity; cards
and downloads do not track views. Rendered README trackers are always removed.
There is no Clarity/session-replay integration in the new site.

Contributors with recorded GitHub accounts show their public profile images,
requested directly from GitHub at a small size and lazy-loaded. This requires
no GitHub API calls, token, or additional hosting service. Contributors without
a recorded GitHub account retain an initial fallback.

## Production and rollback

Configure GitHub Pages to use GitHub Actions only after the review is approved.
Manually run **Deploy gallery** on upstream `master`. It validates the site,
uploads a Pages artifact, deploys it, and checks the published commit identity,
catalog hash, sample pages, previews, and definition downloads.

Astro and this workflow are the only supported documentation publishing path.
The obsolete documentation configuration and root deployment scripts have been
removed; no local helper should independently publish over the validated artifact.

To roll back after cutover, dispatch the deployment workflow on a reviewed revert
of the site changes. Keep the last known-good Pages deployment available in
GitHub's deployment history and retain a deployable artifact before the first
cutover. Record that production baseline before replacing it. Never publish an
unreviewed local branch.

## Assets and provenance

The site uses the existing repositories' MIT-licensed community layout patterns
and fonts, SharePoint brand artwork, and the official Community Contributor
Credly image. See [asset notices](./site/ASSET-NOTICES.md). Product logos and badges
retain their respective owners' rights; do not alter the mark or imply official
product support.

Generated files live in `.cache`, `public/generated`, copied documentation/tool
directories, and `dist`; they are not committed. All source links continue to
target `pnp/List-Formatting` on `master`, including when previewing a fork.
