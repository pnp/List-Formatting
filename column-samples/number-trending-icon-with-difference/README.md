# Show trending up/trending down icons with value difference

## Summary
This example relies on two number fields, `Before` and `After`, for which the values can be compared. It shows the appropriate trending icon next to the value of the `After` field, depending on that field's value compared to the value in `Before`. The `sp-field-trending--up` class is used when `After`'s value is higher; the `sp-field-trending--down` class is used when `After`'s value is lower. No icon is shown when they are equal (padding is added to keep consistent alignment).

The example also displays the difference in value between the `Before` and `After` values. If the `After` value is larger then the `Before` value, the numeric value difference will be displayed with a `(+XX)`. If the `After` value is smaller then the `Before` value, the numeric value difference will be displayed with a `(-XX)`.

The difference values are in a `<span>`, separate from the `After` `<span>`, allowing for unique properties to be applied without altering the `After` value.

![screenshot of the sample](./screenshot.png)

## Styles
|Condition|Class|Icon|Style|
|---|---|---|---|
|After **>** Before|sp-field-trending--up|SortUp|padding-left:0|
|After **<** Before|sp-field-trending--down|SortDown|padding-left:0|
|After **=** Before|||padding-left:12px|

## Expressions
|Condition|Expression|
|---|---|
|After **>** Before|After - Before|
|After **<** Before|Before - After|
|After **=** Before|No Expression Performed|

## Sample

Solution|Author(s)
--------|---------
number-trending-icon-with-difference.json | [David Warner II](https://twitter.com/davidwarnerii)

## Version history

Version|Date|Comments
-------|----|--------
1.0|June 12, 2018|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
This sample is also covered in the main documentation around the Column Formatting.

A similar template is also included in the [Column Formatter](https://github.com/SharePoint/sp-dev-solutions/blob/master/solutions/ColumnFormatter/README.md) webpart.

- [Use column formatting to customize SharePoint](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/column-formatting)

<img src="https://telemetry.sharepointpnp.com/sp-dev-column-formatting/samples/number-trending-icon-with-differences" />