# Multi-line View

## Summary

This example uses the `rowFormatter` element, which totally overrides the rendering of a list view row. The `rowFormatter` in this example creates a bounding `<div />` box for every list view row.  Inside this bounding box, the `$Title` and `$Feedback` fields are displayed on separate lines.  Under those fields, a `button` element is displayed that, when clicked, does the same thing as clicking the list row in an uncustomized view, which is opening the property form for the item.  This `button` is displayed conditionally, when the value of the `$Assigned_x0020_To` field (assumed to be a person/group field) matches the current signed-in user.

![screenshot of the sample](./assets/screenshot.png)

## View requirements
- The format expects the `Title` field
- The format expects a text column with an internal name of `Feedback`
- The format expects a person column with an internal name of `Assigned_x0020_To`

## Sample

Solution|Author(s)
--------|---------
multi-line-view.json | [Lincoln DeMaris](https://github.com/ldemaris) ([@LincedLists](https://twitter.com/LincedLists))

## Version history

Version|Date|Comments
-------|----|--------
1.0|August 10, 2018|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
None

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/multi-line-view" />
