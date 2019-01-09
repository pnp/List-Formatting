# Turn FileRef field into clickable thumbnail hyperlink

## Summary
This example uses a column to generate a hyperlink to the Item Thumbnail for a document library.
* Uses FileRef Variable
* Uses getpreview.ashx

### Before you use it
* Adjust the resolution=**3** (0-6) value to your NEEDS. _(3: 1024px, 4: 1600px)_

![screenshot of the sample](./screenshot.png)

## View requirements
- This format can be applied to any column type (the value is ignored)
- This format should be used in a Document Library

## Sample

Solution|Author(s)
--------|---------
generic-hyperlink-thumbnail.json | Josef Lahmer

## Version history

Version|Date|Comments
-------|----|--------
1.0|July 17, 2018 |Initial release
1.1|August 20, 2018|Switched to Excel-style expressions
1.2|January 9, 2019|Removed hardcoded url and replaced with @currentWeb token

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
- [Use column formatting to customize SharePoint](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/column-formatting)

> An additional version using Abstract Tree Syntax (AST) is also provided for environments where the Excel-style expressions are not supported.

<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/column-samples/generic-hyperlink-thumbnail" />