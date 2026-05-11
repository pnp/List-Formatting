# Workflow Progress Header

## Summary
This sample shows a checkmark for each date field that has a value to help convey when milestones have been hit.

![screenshot of the sample](./assets/screenshot.gif)

## Form requirements

|Type          |Internal Name |Required|
|--------------|--------------|:------:|
|Date and Time |Date1         |No      |
|Date and Time |Date2         |No      |
|Date and Time |Date3         |No      |

## Sample

Solution|Author(s)
--------|---------
workflow-progress-header.json | [Tetsuya Kawahara](https://github.com/tecchan1107)

## Version history

Version |Date             |Comments
--------|-----------------|--------
1.0     |February 1, 2021 |Initial release
1.1     |April 19, 2024 |Fixed to use `[$ColumnName.displayValue]` instead of `toLocaleDateString` operator to solve the problem that date is not displayed depending on the date format.


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/form-samples/workflow-progress-header" />
