# Formatter Generator for HTML

This tool is useful to quickly convert a html snippet (with acceptable tags) into json.
current acceptable html tags by the sharepoint custom formatter:
```
<div> , <span> , <a> , <img> , <button> , <svg> , <path>
```
style tags and inline style attributes within html are also processed along with the css provided in the css pane. The preview window should be able to handle basic scenarios, and have a decent expected output,
but the Sharepoint might have different output.

## Prerequisites:

 - Node v10 or above
 - npm

## Available Scripts

In the project directory, you can run:

### `npm install`

install all the required dependencies.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
The bundle files get copied to the `docs/html-formatter-generator/public` folder which integrates the build step with mkdocs.

### `yarn start`

starts a local webserver which live-reloads on any edits you make to the code under src directory.
Open [http://localhost:8080](http://localhost:8080) to view the app, after compilation is successful.

If you want a faster dev-deployment experience, change `isProduction` to `false` and get faster live reloading.

### `yarn test`

runs a test suite against the html to json converter implementation.