# Formatter Generator for HTML

This tool allows you to quickly convert an HTML snippet (with acceptable tags) into JSON for list formatting!

Current HTML tags supported in list formatting:

```
<div> , <span> , <a> , <img> , <button> , <svg> , <path>
```

`style` tags and inline style attributes within HTML are also processed along with any CSS provided using the CSS pane. The preview window can handle most basic scenarios, but it's possible that SharePoint will have different output.

## Prerequisites to build/run from code:

 - Node v10 or above
 - npm
 - yarn

## Getting Started

If you just want to use the tool, it's available in the List Formatting Sample Repo site here: https://pnp.github.io/sp-dev-list-formatting/tools/html-formatter-generator/

To run a local version you can use these commands run from the project directory (tools/html-formatter-generator):

- `npm install`
- `yarn start`
- Navigate to [http://localhost:8080](http://localhost:8080)

More details about what these commands do and other options are can be found below.

## Available Commands

In the project directory (tools/html-formatter-generator), you can run:

### `npm install`

Installs all the required dependencies.

### `yarn build`

Builds the app for production to the `build` folder. This bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include hashes. The bundle files then get copied to the `docs/html-formatter-generator` folder which integrates the build step with mkdocs. This allows them to be served directly from the list formatting Github site.

### `yarn start`

Starts a local webserver which live-reloads on any edits you make to the code within the solution's src directory.

Open [http://localhost:8080](http://localhost:8080) to view the app, after compilation is successful.

If you want a faster dev-deployment experience, change `isProduction` to `false` and get faster live reloading.

### `yarn test`

Runs a test suite against the solution.