# Display social media profile pics using social media handles

## Summary

Using the social media handles supported by https://avatars.io, social media profile pictures are displayed in a circle and clicking them will open the user's social media page in a new window. The handle is also displayed as a tooltip when hovering over the profile image.

![screenshot of the sample](./screenshot.png)
> Note: https://avatars.io currently supports Twitter, Facebook, Instagram and Gravatar


### Image Size

[avatars.io](https://avatars.io) come in 3 standard sizes:

|Name|Size|
|---|:---:|
|small|48x48|
|medium|128x128|
|large|256x256|

To change the size, adjust the portion of the `src` url to use the keyword from the table above and then adjust the `width` and `height` style attributes for the containing `div`.

### Column Types
This format will work with Choice and Text columns without any changes. To use Lookup columns, you'll need to change the 2 occurences of `@currentField` to `@currentField.lookupValue`.

The field values are case insensitve and should be just the user's twitter handle with no @.

## Sample

Solution|Author(s)
--------|---------
generic-socialpic.json | [David Warner II](https://twitter.com/davidwarnerii) / [Warner.Digital](http://warner.digital)

## Version history

Version|Date|Comments
-------|----|--------
1.0|July 21, 2018|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes

A similar wizard is also included in the [Column Formatter](https://github.com/SharePoint/sp-dev-solutions/blob/master/solutions/ColumnFormatter/README.md) webpart that allows full customization.

- [Use column formatting to customize SharePoint](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/column-formatting)

<img src="https://telemetry.sharepointpnp.com/sp-dev-column-formatting/samples/generic-socialmedia" />