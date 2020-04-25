# Customise SharePoint Online Columns Using JSON - Column Formatting

### Open file as pdf
This Json can be applied to a calculated column to render a link that will open an Office Document as a pdf. It relies on the sharepoint 2.0 rest api. The --driveurl-- placeholder in the json needs to be replaced with the correct driveurl for the docuement library where the JSON Is being used.
To Get the driveurl navigate to
  https://tenant.sharepoint.com/sites/sitename/_api/v2.0/drives

Find the entry where the "name" attribute is the Title of the library where you want to use this JSON. 
Select the coresponding "@odata.id" attribute and paste it into the JSON template replacing the --driveurl-- paceholder.

<strong>Large files may not be successfully converted to PDFs. It is unclear to me if this is a supported API</strong>

<table>
<thead>
<tr>
<th>Solution</th>
<th>Author(s)</th>
</tr>
</thead>
<tbody>
<tr>
<td>open-file-as-pdf.json</td>
<td>Russell Gove</td>
</tr>
  </tbody></table>
<table>
<thead>
<tr>
<th>Version</th>
<th>Date</th>
<th>Comments</th>
</tr>
</thead>
<tbody>
<tr>
<td>1.0</td>
<td>25 April 2020</td>
<td>Initial release</td>
</tr></tbody></table>

<p><strong>THIS CODE IS PROVIDED <em>AS IS</em> WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.</strong></p>

<img src="https://telemetry.sharepointpnp.com/sp-dev-column-formatting/samples/generic-project-management" />