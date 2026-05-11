# Update the Docs

This documentation site is also open source and contributions like typo fixes, new articles, etc. are always welcome! The documents live in the same repo as the samples in the `docs` directory.

> Keep in mind that while these can be read directly in GitHub, the intent is to read them within the public site hosted at [https://aka.ms/list-formatting](https://aka.ms/list-formatting).

## Writing docs

#### Updating existing docs

From typoos to clearing things up more betterer we would love your help in making these docs as helpful as possible!

##### Auto-generated pages

Many of the pages on the site are auto-generated using [Farrier](https://github.com/pnp/Community-Tooling/tree/master/Solutions/Farrier/Farrier) and shouldn't be edited directly. This information comes from individual `sample.json` files located in each sample's `assets` folder. If something is incorrect in these, feel free to update the sample's `sample.json` itself. Alternatively, you can open an issue and tell us about it and we'll get it fixed. Thanks!

Here's the list of auto-generated pages:

- docs
    - [columnsamples.md](../columnsamples.md)
    - [formsamples.md](../formsamples.md)
    - [viewsamples.md](../viewsamples.md)
    - groupings
        - [action.md](../groupings/action.md)
        - [author.md](../groupings/author.md)
        - [category.md](../groupings/category.md)
        - [columntype.md](../groupings/columntype.md)
        - [feature.md](../groupings/feature.md)
        - [operator.md](../groupings/operator.md)
        - [SP2019.md](../groupings/SP2019.md)
        - [token.md](../groupings/token.md)
        - classes
            - [animation.md](../groupings/classes/animation.md)
            - [ms-bgColor.md](../groupings/classes/ms-bgColor.md)
            - [ms-borderColor.md](../groupings/classes/ms-borderColor.md)
            - [ms-font.md](../groupings/classes/ms-font.md)
            - [ms-fontColor.md](../groupings/classes/ms-fontColor.md)
            - [ms-fontSize.md](../groupings/classes/ms-fontSize.md)
            - [ms-fontWeight.md](../groupings/classes/ms-fontWeight.md)
            - [sp-List-color.md](../groupings/classes/sp-List-color.md)
            - [sp-card.md](../groupings/classes/sp-card.md)
            - [sp-css-backgroundColor.md](../groupings/classes/sp-css-backgroundColor.md)
            - [sp-css-border.md](../groupings/classes/sp-css-border.md)
            - [sp-css-borderColor.md](../groupings/classes/sp-css-borderColor.md)
            - [sp-css-color.md](../groupings/classes/sp-css-color.md)
            - [sp-field-border.md](../groupings/classes/sp-field-border.md)
            - [sp-field-fontSize.md](../groupings/classes/sp-field-fontSize.md)
            - [sp-field.md](../groupings/classes/sp-field.md)
            - [sp-row.md](../groupings/classes/sp-row.md)

##### HTML-Formatter-Generator

Items in the tools/html-formatter-generator are part of the tool build and should not be edited directly. If you are interested in contributing to the HTML to Formatter Generator tool, please consult the [Tool contribution guide](./tools.md) for details.

#### Creating new docs

Got an idea for something? Create a new markdown file and update the navigation in `mkdocs.yml` (or just tell us about it in the PR). If you're not sure if it's a fit, just open an issue and we can discuss - but if you find the info helpful, likely others do too.

#### Adding / referencing images

Put any new images in the `docs/img` directory. Then you can reference them like this:

```markdown
![alt text](../img/FormatMenu.png)
```

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

Navigate to [http://127.0.0.1:8000](http://127.0.0.1:8000) in a browser to see the documentation. That address will only be available on your machine. As you save documents you should see the pages refresh with your changes.

### Publishing the docs

We will publish the docs when updates are checked in. Only those with full permissions are able to do the publish to GitHub pages. We do this using the MkDocs `gh-deploy` command:

```bash
mkdocs gh-deploy
```

Be aware that running this command will publish everything in the current branch regardless if it is checked in or not.

More details can be found in the [official docs](https://www.mkdocs.org/user-guide/deploying-your-docs/).

## Tool considerations

The HTML-Formatter is a legacy tool hosted in this site. We are no longer accepting feature updates (though bug and documentation fixes are always welcome).

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/docs/contributing/docs" />
