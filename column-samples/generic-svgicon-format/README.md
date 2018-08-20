# SVG icons

## Summary
The [UI Fabric icons](https://developer.microsoft.com/en-us/fabric#/styles/icons) are easy to use in column formatting by simply specifying the name in the `iconName` attribute. However, the available selection of icons may not always meet your needs.

Fortunately, you can use inline SVG elements with custom paths. This means you can use icons from sources like Font Awesome that provide SVG versions of their icons!

This sample uses the value of the current field to show a custom icon and color. The icon is specified through the `d` attribute of the path element. The paths have been scaled and extracted from Font Awesome icons. This sample uses gender and provides a default display when neither Male nor Female is selected.

|Value|Icon|Color|
|---|---|---|
|Female|[venus](https://fontawesome.com/icons/venus?style=solid)|#e3008c|
|Male|[mars](https://fontawesome.com/icons/mars?style=solid)|#0078d7|
|DEFAULT|[genderless](https://fontawesome.com/icons/genderless?style=solid)|#333333|

The pattern of using nested conditional operators with equality operators is the column formatting equivalent of a switch statement. The same logic is used 3 times in this sample. First for the `svg`'s `fill` style attribute to determine the color of the icon. Next, it is used for the `d` attribute of the `svg` element's `path` element to change the icon. Finally, it is used for the `span`'s `color` style attribute to ensure the text color is also changed.

![screenshot of the sample](./screenshot.png)

> Currently, column formatting does not support the `viewbox` attribute which causes issues with SVGs that rely on it to properly scale (basically all of them). You'll need to adjust the page size to have the path coordinates drawing at a 1:1 scale instead of relying on viewbox translation. One approach is to use a tool like [Inkscape](https://inkscape.org/en/release/) using the approach described here [Use Font Awesome icons in Column Formatting](https://thechriskent.com/2018/03/25/use-font-awesome-icons-in-column-formatting/).

## View requirements
- This format can be applied to a text/choice column and uses the values Female, Male, or anything else

## Sample

Solution|Author(s)
--------|---------
generic-svgicon-format.json | [Chris Kent](https://twitter.com/thechriskent)

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 26, 2018|Initial release
1.1|August 20, 2018|Switched to Excel-style expressions

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes

The icons used were adapted from Font Awesome which is available under the [Creative Commons Attribution 4.0 International license](https://fontawesome.com/license).

- [Use column formatting to customize SharePoint](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/column-formatting#me)

> An additional version using Abstract Tree Syntax (AST) is also provided for environments where the Excel-style expressions are not supported.

<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/column-samples/generic-svgicon-format" />