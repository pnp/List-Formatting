# Display a Person's Profile Picture in a Circle

## Summary
This sample applies styles to a parent `div` element and a child `img` element to show a person's profile picture in a circle.

The size can be easily adjusted by changing the default value of `32px` for both the `width` and `height` style attributes on the parent div.

You can also adjust the `border-radius` value of the parent div to change it from a full circle (_50%_) to a rounded rectangle (_< 50%_). To get larger profile pictures you can change the `size=S` portion of the URL to use either `size=M` or `size=L`. See the table below for details on image size.

For best results, images should be square (S & M user profile pictures always are).

![screenshot of the sample](./assets/screenshot.png)

### User Profile Picture sizes

|Key|Size|
|:---:|:---:|
|S|48x48|
|M|72x72|
|L|300x?*|

The L size profile pictures maintain the ratio of the original photo which means they are not guaranteed to be square. Neither are they guaranteed to be 300px wide. The maximum width will be 300px but if the original image was smaller than that, then it will be the original size. Even the placeholder image for the L size is only 250x150.

Overall, however, the L size shouldn't be used inside columns not only because the ratio is not guaranteed, but because the default column width won't allow you to take up that much space.

> Note: `@currentField.picture` can be used to retrieve a profile picture directly from a person column. However, size options are not available using that approach.

## View requirements
- This format can be applied to a Person column

## Sample

Solution|Author(s)
--------|---------
person-roundimage-format.json | [Chris Kent](https://github.com/thechriskent) ([@thechriskent](https://twitter.com/thechriskent))

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 21, 2018|Initial release
1.1|August 20, 2018|Switched to Excel-style expression

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
This template is included in the [Column Formatter](https://github.com/SharePoint/sp-dev-solutions/blob/master/solutions/ColumnFormatter/README.md) webpart.

- [Use column formatting to customize SharePoint](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/column-formatting)

> An additional version using Abstract Tree Syntax (AST) is also provided for environments where the Excel-style expressions are not supported.

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/column-samples/person-roundimage-format" />