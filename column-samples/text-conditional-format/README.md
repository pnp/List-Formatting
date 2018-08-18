# Conditional formatting based on the value in a text or choice field

## Summary
You can apply conditional formatting to text or choice fields that might contain a fixed set of values. The following example applies different classes depending on whether the value of the field is Done, In Review, Blocked, or another value. This example applies a CSS class (`sp-field-severity--low, sp-field-severity--good, sp-field-severity--warning, sp-field-severity--blocked`) to the  `<div />` based on the field's value. Then, it outputs a `<span />` element with an `IconName` attribute. This attribute applies another CSS class to that `<span />` that shows an [Office UI Fabric](https://dev.office.com/fabric#/) icon inside that element. Finally, another `<span />` element is outputted that contains the value inside the field.

This pattern is useful when you want different values to map to different levels of urgency or severity. You can start from this example and edit it to specify your own field values and the styles and icons that should map to those values.

![screenshot of the sample](./screenshot.png)

## View requirements
- This format can be applied to a text/choice column and expects the values Done, In progress, In review, or Blocked

## Sample

Solution|Author(s)
--------|---------
text-conditional-format.json | SharePoint Team

## Version history

Version|Date|Comments
-------|----|--------
1.0|November 2, 2017|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
This sample is also covered in the main documentation around the Column Formatting

- [Use column formatting to customize SharePoint](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/column-formatting)

<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/column-samples/text-conditional-format" />