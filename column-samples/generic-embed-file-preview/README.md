# File Preview Callout with the `embed` Action

## Summary

This sample demonstrates how to display a file preview from a document library inside a callout using the [embed](https://learn.microsoft.com/sharepoint/dev/declarative-customization/formatting-syntax-reference#customrowaction) action. This allows users to view file contents without leaving the current page.

![screenshot of the sample](./assets/screenshot.png)

> [!WARNING]
> As of June 30, 2025, the `embed` action is not supported on site pages, so this sample cannot be used there. It also does not work in the Files tab of Microsoft Teams.

## Prerequisites

To embed content, the domain of the SharePoint site (e.g., `contoso.sharepoint.com`) must be allowed for embedding. For guidance on how to allow embedding, please refer to [Allow or restrict the ability to embed content on SharePoint Lists using custom formatters](https://go.microsoft.com/fwlink/p/?linkid=2258033).

![screenshot of HTML field security settings](./assets/html-field-security.png)

If you attempt to embed content from a domain that is not allowed, the following error screen will appear:

![screenshot of the error screen when target site is not allowed to embed](./assets/not-allowed-screen.png)

## View requirements

- This format is intended for document libraries.
- This format can be applied to any column type.

## Sample

Solution                            |Author(s)
------------------------------------|---------------------------
generic-embed-file-preview.json     |[Tetsuya Kawahara](https://github.com/tecchan1107)

## Version history

Version |Date         |Comments
--------|-------------|--------
1.0     |June 30, 2025|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes

- This sample was created with reference to the [generic-file-preview](../generic-file-preview/).
- Not all file extensions have been tested for preview, so some file types may not be supported for display.

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/column-samples/generic-embed-file-preview" />