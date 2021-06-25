# Mail To Button

## Summary
This sample demonstrates making a mailto link (opens email with prepopulated values) button that references a different field.

![screenshot of the sample](./assets/screenshot.png)


## View requirements
- This format can be applied to any column type (its value is ignored)
- To apply directly to a person column, just replace all the `[$Commander]` calls with `@currentField`

> Tip - You can apply these formats to a Calculated Column with a formula of `=""`. This prevents the fields from being part of your edit/new forms.

## Sample

Solution|Author(s)
--------|---------
generic-mailto-button.json | [Chris Kent](https://twitter.com/thechriskent)

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 27, 2021|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes

- The [person-mailto](../person-mailto/) demonstrates a similar technique but is applied directly to a person field


<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/column-samples/generic-mailto-button" />
