# Show trending up/trending down icons 

## Summary
This example relies on two number fields, `Before` and `After`, for which the values can be compared. It shows the appropriate trending icon next to the value of the `After` field, depending on that field's value compared to the value in `Before`. The `sp-field-trending--up` class is used when `After`'s value is higher; the `sp-field-trending--down` class is used when `After`'s value is lower. No icon is shown when they are equal (padding is added to keep consistent alignment).

![screenshot of the sample](./screenshot.png)

|Condition|Class|Icon|Style|
|---|---|---|---|
|After **>** Before|sp-field-trending--up|SortUp|padding-left:0|
|After **<** Before|sp-field-trending--down|SortDown|padding-left:0|
|After **=** Before|||padding-left:12px|

## Sample

Solution|Author(s)
--------|---------
number-trending-icon.json | SharePoint Team

## Version history

Version|Date|Comments
-------|----|--------
1.0|November 2, 2017|Initial release
1.1|March 20, 2018|Added equal value styling

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
This sample is also covered in the main documentation around the Column Formatting.

A similar template is also included in the [Column Formatter](https://github.com/SharePoint/sp-dev-solutions/blob/master/solutions/ColumnFormatter/README.md) webpart.

- [Use column formatting to customize SharePoint](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/column-formatting)

<img src="https://telemetry.sharepointpnp.com/sp-dev-column-formatting/samples/number-trending-icon" />