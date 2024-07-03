# Dashed Line Header

## Summary
This sample displays an `Icon` and `Title` in a two column header with the Icon on the left (centered) and the `Title` on the right.  An additional `Icon` and `Request Status` and added below the `Title`. 

![screenshot of the sample](./assets/screenshot_two_column_Default_Diagram.png)


## Form requirements

|Type                   |Internal Name|Required|
|-----------------------|-------------|:------:|
|Single line of text    |Title        |Yes     |
|Choice Column |RequestStatus  |Yes      |

### RequestStatus Choices
|Value           |
|----------------|
|Approved|
|Pending|
|Rejected|
|Withdrawn|

Based on the value of RequestStatus value, the color of the column is changed along with the icon.

Default - Request Status not chosen
![screenshot of the sample](./assets/screenshot_two_column_Default.png)

Request Status Approved

![screenshot of the sample](./assets/screenshot_two_column_Approved.png)

Request Status Pending

![screenshot of the sample](./assets/screenshot_two_column_Pending.png)

Request Status Rejected

![screenshot of the sample](./assets/screenshot_two_column_Rejected.png)

Request Status Withdrawn

![screenshot of the sample](./assets/screenshot_two_column_Withdrawn.png)

## Logo
In this example, a Fluent UI Icon was used for the logo:

CRMCustomerInsightsApp

[Fluen UI Icon Library](https://developer.microsoft.com/en-us/fluentui#/styles/web/icons)

## Sample

Solution|Author(s)
--------|---------
sample.json | [Andrew Burns ](https://github.com/GeorgiaGit) ([@SharePointRox](https://x.com/SharePointRox))


## Version history

Version |Date              |Comments
--------|------------------|--------
1.0     |June 24, 2024  |Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/form-samples/two-column-logo-header" />
