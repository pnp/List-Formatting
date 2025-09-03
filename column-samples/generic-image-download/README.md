# Download Image from SharePoint Image column

## Summary

This sample demonstrates adding a button within a SharePoint Online/Microsoft Lists view which downloads the image from image column.

![screenshot of the sample](./assets/screenshot.png)

## JSON note
For this JSON to work in your list, make sure to edit the JSON and replace the `**YOUR-LIST-NAME**` placeholder with your list's name, as it appears in the URL (including special characters)

## View requirements

This format can be applied to any column type (its value is ignored). However, it is expected that the following one column is part of the view.

|Type  |Internal Name |Required|
|------|--------------|:------:|
|Image |Image         |No      |

## Sample

Solution|Author(s)
--------|---------
generic-image-download.json | [Ganesh Sanap](https://github.com/ganesh-sanap)

## Version history

Version |Date          |Comments
--------|--------------|--------------------------------
1.0     |November 12, 2022 |Initial release
1.1     |January 16, 2024 |Fixed an issue where images could not be downloaded due to a change in image storage location

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/column-samples/generic-image-download" />
