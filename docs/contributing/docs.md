# Update the Docs

This documentation site is also open source and contributions like typo fixes, new articles, etc. are always welcome! The documents live in the same repo as the samples in the `docs` directory.

> Docs in the groupings directory are auto generated using MDLooper (see Tool considerations below for details) and edits to these docs should not be made directly. Any samples you submit will be added to these when your Pull Request is accepted.

> Items in the tools/html-formatter-generator are part of the tool build and should not be edited directly. If you are interested in contributing to the HTML to Formatter Generator tool, please consult the [./tools.md](Tool contribution guide) for details.

## Writing docs

#### Updating existing docs
#### Creating new docs
#### Adding / referencing images
#### Advanced stuff

If you want to do more than just write or edit documentation, please ask first. This includes things like:

- Adding new MkDocs plugins
- Altering primary logos
- Changing theme values
- Adding functionality through configuration or scripting

To ask, just go to the repository and add an issue as a question. The goal isn't to stop awesome stuff, it's just to make sure there aren't conflicts or over complications.

### Building docs locally

Building the documentation locally can be helpful to see the changes you are making and to verify there are no issues being introduced. However, this is **not requred** for doc contributions. However, this will be done as part of reviewing any pull requests that contain changes or additions to the documentation.

The PnP List Formatting repository uses [MkDocs](https://www.mkdocs.org/) to build this documentation site. There is some initial setup required but you should only have to do it once.

#### Prerequisites

To [install MkDocs](https://www.mkdocs.org/#installation) you'll need [Python](https://docs.python.org/3/using/windows.html#windows-full) (3.7.1+) and pip (generally included with Python). You can use other package managers if you wish, but the instructions below assume the use of pip.

#### Installing MkDocs and related plugins

Using a command prompt / terminal execute the following commands:

- Install MkDocs
  - `pip install mkdocs`
- Install the Material theme
  - `pip install mkdocs-material`
- Install the Markdown Extra Data plugin
  - `pip install mkdocs-markdownextradata-plugin`

#### Serving the documentation locally

Using a command prompt / terminal execute the following command:

`mkdocs serve`

Navigate to http://127.0.0.1:8000 in a browser to see the documentation. As you save documents you should see the pages refresh with your changes.

## Tool considerations

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/docs/contributing/docs" />
