# title of the sample

## Summary
This example uses the `rowFormatter` element, which totally overrides the rendering of a list view row.  The `rowFormatter` in this example creates a bounding `<div />` box for every list view row.  Inside this bounding box, the `$Title` and `$Feedback` fields are displayed on separate lines.  Under those fields, a `button` element is displayed that, when clicked, does the same thing as clicking the list row in an uncustomized view, which is opening the property form for the item.  This `button` is displayed conditionally, when the value of the `$Assigned_x0020_To` field (assumed to be a person/group field) matches the current signed-in user.

![SharePoint list with multi-line view customization](../../../../../sp-dev-docs/blob/master/docs/images/listformatting-rowformatter.png)

## Sample

Solution|Author(s)
--------|---------
json-file-name | Lincoln DeMaris

## Version history

Version|Date|Comments
-------|----|--------
1.0|August 29, 2025|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---
