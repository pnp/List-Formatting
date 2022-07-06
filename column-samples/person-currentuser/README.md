# Highlight the Current User

## Summary
This sample uses the `@me` keyword to check if the person field is the current user and shows that person using a different color and weight. This is a dynamic check that will always highlight the user using the list (not the creater of the format). This template could easily be extended to apply different/additional styles or icons as desired by simply copying the same expression logic for other fields.

The [Office UI Fabric](https://developer.microsoft.com/en-us/fabric) theme color classes and a font weight class are used to ensure the format looks good across themes (including custom themes).

![screenshot of the sample](./assets/screenshot.png)

## View requirements
- This format can be applied to a Person column

## Sample

Solution|Author(s)
--------|---------
person-currentuser.json | [Chris Kent](https://github.com/thechriskent) ([@thechriskent](https://twitter.com/thechriskent))

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 20, 2018|Initial release
1.1|August 18, 2018|Using theme classes and switched to Excel-style expressions

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
This sample is also covered in the main documentation around Column Formatting.

A similar template is also included in the [Column Formatter](https://github.com/SharePoint/sp-dev-solutions/blob/master/solutions/ColumnFormatter/README.md) webpart.

- [Use column formatting to customize SharePoint](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/column-formatting#me)

> An additional version using Abstract Tree Syntax (AST) is also provided for environments where the Excel-style expressions are not supported.

A similar sample is available for use with multi-select person fields: [multi-person-currentuser](../multi-person-currentuser)

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/column-samples/person-currentuser" />