# Customise SharePoint Online Columns Using JSON - Column Formatting

### Open file as pdf

This Json can be applied to a column in a Document Library to render a link that will open an Office Document as a pdf. It relies on the SharePoint 2.0 rest api. The --driveurl-- placeholder in the json needs to be replaced with the correct driveurl for the docuement library where the JSON Is being used.

To Get the driveurl navigate to

https://--tenant--.sharepoint.com/sites/--sitename--/_api/v2.0/drives

replacing the --tenant-- and --sitename-- placeholders with approriate values.

Find the entry where the "name" attribute is the Title of the library where you want to use this JSON. Select the coresponding "@odata.id" attribute and paste it into the JSON template, replacing --driveurl-- 

The final value in the json should look something like
https://tenant.sharepoint.com/sites/sitename/_api/v2.0/drives/b!oqbo5Yz5ekialDrzcav5R3esotWm9VxCmi6bA63L7Wfuozp-JfhPTaVlFzxUdRwa/root:/

## Sample

Solution|Author(s)
--------|---------
generic-open-file-as-pdf.json | Russell Gove

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 28, 2020|Initial release


<p><strong>THIS CODE IS PROVIDED <em>AS IS</em> WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.</strong></p>

<img src="https://telemetry.sharepointpnp.com/sp-dev-column-formatting/samples/generic-project-management" />