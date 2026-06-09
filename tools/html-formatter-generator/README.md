# HTML to Formatter Generator

A browser-based tool that converts HTML and CSS into Column Formatting JSON for SharePoint / Microsoft Lists.

## Features

- **Three-pane layout** — side-by-side Code (HTML + CSS), Generated CF JSON, and HTML Preview panels
- **Auto-convert** — JSON output updates automatically as you type (300 ms debounce)
- **Resizable panels** — drag the edges between any two panels to resize
- **Live HTML Preview** — rendered in an isolated iframe so app styles never leak in
- **Copy to clipboard** — one-click copy of the generated JSON
- **Built-in example** — launches with a sample card (HTML + CSS) so new users can see the tool in action immediately

## Supported HTML Elements

```
<div>  <span>  <a>  <p>  <img>  <button>  <svg>  <path>  <filepreview>
```

Inline `style` attributes, `<style>` tags, and CSS provided in the CSS pane are all resolved and merged into the JSON output. The HTML Preview pane renders the original HTML with full CSS (including hover, media queries, etc.), but note that the final SharePoint rendering may differ.

## Prerequisites

- Node v10 or above
- npm
- yarn

## Getting Started

If you just want to use the tool, it is hosted here: https://pnp.github.io/List-Formatting/tools/html-formatter-generator/

To run a local version from the project directory (`tools/html-formatter-generator`):

```bash
npm install
yarn start
```

Then open [http://localhost:8080](http://localhost:8080).

## Available Commands

All commands are run from `tools/html-formatter-generator`.

### `npm install`

Installs all required dependencies.

### `yarn build`

Builds the app for production to the `build` folder. This bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include hashes. The bundle files then get copied to the `docs/tools/html-formatter-generator` folder which integrates the build step with mkdocs. This allows them to be served directly from the list formatting GitHub site.

### `yarn start`

Starts a local webserver which live-reloads on any edits you make to the code within the solution's `src` directory.

Open [http://localhost:8080](http://localhost:8080) to view the app after compilation is successful.

If you want a faster dev-deployment experience, change `isProduction` to `false` and get faster live reloading.

### `yarn test`

Runs the test suite (31 tests) against the HTML-to-JSON conversion logic.
