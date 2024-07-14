# Two Column Logo Header

## Summary

This sample displays an `Icon` and `Title` in a two column header with the Icon on the left and the `Title` on the right. An additional `Icon` and `RequestStatus` and added below the `Title`.

![screenshot of the sample](./assets/screenshot_two_column_Default_Diagram.png)

## Form requirements

|Type                   |Internal Name|Required|
|-----------------------|-------------|:------:|
|Single line of text    |Title        |Yes     |
|Choice |RequestStatus  |Yes      |

### RequestStatus Choices

|Value           |
|----------------|
|Approved|
|Pending|
|Rejected|
|Withdrawn|

Based on the value of `RequestStatus` value, the color of the column is changed along with the icon.

- RequestStatus: Default (not chosen)

    ![screenshot of the sample when RequestStatus is blank](./assets/screenshot_two_column_Default.png)

- RequestStatus: Approved

    ![screenshot of the sample when RequestStatus is Approved](./assets/screenshot_two_column_Approved.png)

- RequestStatus: Pending

    ![screenshot of the sample when RequestStatus is Pending](./assets/screenshot_two_column_Pending.png)

- RequestStatus: Rejected

    ![screenshot of the sample when RequestStatus is Rejected](./assets/screenshot_two_column_Rejected.png)

- RequestStatus: Withdrawn

    ![screenshot of the sample when RequestStatus is Withdrawn](./assets/screenshot_two_column_Withdrawn.png)

## Logo

This sample logo uses the `CRMCustomerInsightsApp` from [Fluent UI Icons](https://developer.microsoft.com/en-us/fluentui#/styles/web/icons).

## Sample

Solution|Author(s)
--------|---------
two-column-logo-header.json | [Andrew Burns ](https://github.com/GeorgiaGit) ([@SharePointRox](https://x.com/SharePointRox))

## Version history

Version |Date              |Comments
--------|------------------|--------
1.0     |July 14, 2024  |Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/form-samples/two-column-logo-header" />
