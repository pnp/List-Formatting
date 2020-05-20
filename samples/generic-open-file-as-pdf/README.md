# Open file as pdf

## Summary
This JSON can be applied to a calculated column to render a link that will open an Office Document as a pdf. It relies on the SharePoint 2.0 rest api

[picture of the format in action]

## View requirements
The --driveurl-- placeholder in the JSON needs to be replaced with the correct driveurl for the document library where the JSON Is being used. To get the driveurl navigate to https://tenant.sharepoint.com/sites/sitename/_api/v2.0/drives

Find the entry where the "name" attribute is the Title of the library where you want to use this JSON. Select the coresponding "@odata.id" attribute and paste it into the JSON template replacing the --driveurl-- paceholder.
## Sample

Solution|Author(s)
--------|---------
open-file-as-pdf.json | Russell Gove

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 20, 2021|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
This sample only works with Office documents.

<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/column-samples/generic-open-file-as-pdf" />
