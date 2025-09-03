# Menu Link Button

## Summary

This sample has been inspired by [menu-link-tiles](https://github.com/pnp/List-Formatting/tree/master/view-samples/menu-link-tiles) by [André Lage](https://github.com/aaclage). It includes a Button style menu similar to Quick Links Button style with additional features such as using **width** , **height**, **color** and **fontColor**, and also includes `customCardProps` to show a custom hover card with the **description** of a tile.

![screenshot of the sample](./assets/screenshot.png)

Also, this sample is responsive.

![Quick Links Button Style ](./assets/screenshot.gif)

## View requirements

- The format expect the following fields:

|Type|Internal Name|Required|Notes|
|---|---|:---:|---|
|Single line of text|Title|Yes| |
|Multiple line of text|Description|No| |
|Single line of text|BackgroundColor|No|Select one of this pre defined case-sensitive colors - (**empty/null, Green, Red, Cyan, CyanBlue, Gray, MagentaPink, BlueMagenta, Orange, OrangeYellow, RedOrange**). |
|Single line of text|FontColor|No|Set the HTML color code or color name (e.g. #CD5C5C, pink). If not set, the color is white.|
|Single line of text|Icon|No|Set the icon name for [Fluent UI Icons](https://developer.microsoft.com/fluentui#/styles/web/icons).|
|Hyperlink|URL|Yes| |
|Yes/No|NewTab|No|This field is used to open the link the same tab or new tab.|
|Number|Width|No|If not set, the default width is set to 100px.|
|Number|Height|No|If not set, the default width is set to 40px.|

### Edit View requirements

- Sort by the `Modified` column in descending order

## Sample

Solution|Author(s)
--------|---------
menu-link-button.json | [Reshmee Auckloo](https://github.com/reshmee011)

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 03, 2023|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/menu-link-button" />
