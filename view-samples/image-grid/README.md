# Image Grid

## Summary

Displays images in a grid layout with customisable height and width. The sample was inspired by the [chevron-shape-format](https://github.com/pnp/List-Formatting/tree/master/view-samples/chevron-shape-format) by [André Lage](https://twitter.com/aaclage).
On click of each post, the link specified by the URL is opened. On hover on each image the description of the image is shown. Optionally an icon is displayed on the top right of the image.

![screenshot of the sample](./assets/screenshot.png)

![Animated GIF of the Styled SharePoint List View In Action](./assets/screenshot-animated.gif)

## View requirements

- The format expect the following fields:

|Type|Internal Name|Required|Notes|
|---|---|:---:|---|
|Multiple line of text|Description|Yes| |
|Single line of text|Icon|No|Set the icon name for [Fluent UI Icons](https://developer.microsoft.com/fluentui#/styles/web/icons).|
|Hyperlink|URL|Yes| |
|Yes/No|NewTab|No|This field is used to open the link the same tab or new tab.|
|Number|Width|No|If not set, the default width is set to 100px.|
|Number|Height|No|If not set, the default height is set to 100px.|
|Image|Image|Yes||

### Technologies Used

* **SharePoint**
* **List** (used to store the image data)
* **View Formatting** (JSON used to style the list into the familiar Instagram output)

### Prerequisites

* You must have a valid SharePoint Online license and permission to create lists.
* You must have a modern SharePoint site where you can store the data for the app.

* Format the view and copy and paste the JSON provided.

## Sample

Solution|Author(s)
--------|---------
image-grid.json | [Reshmee Auckloo](https://github.com/Reshmee011) ([@reshmeeauckloo](https://twitter.com/reshmeeauckloo))

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 20, 2023|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/image-grid" />
