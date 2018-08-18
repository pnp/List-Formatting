# Turn FileRef field into clickable thumbnail hyperlink

## Summary
This example uses a column to generate a hyperlink to the Item Thumbnail for a document library.
* Uses FileRef Variable
* Uses getpreview.ashx

## Before you use it
* Change the tenant and site to match your tenant and site URLs. "https://**tenant**.sharepoint.com/**sites/site**/_layouts/15/getpreview.ashx?resolution=3&path=https://**tenant**.sharepoint.com",
* Adjust the resolution=**3** (0-6) value to your NEEDS. _(3: 1024px, 4: 1600px)_

![screenshot of the sample](./screenshot.png)

## Sample

Solution|Author(s)
--------|---------
generic-hyperlink-thumbnail.json | Josef Lahmer

## Version history

Version|Date|Comments
-------|----|--------
1.0|17. July 2018 |Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
- [Use column formatting to customize SharePoint](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/column-formatting)

<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/column-samples/generic-hyperlink-thumbnail" />