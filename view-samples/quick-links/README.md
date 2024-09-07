# Quick Links

## Summary
This sample shows custom quick links for adding to a vertical section in a SharePoint page.

Images are stored in a central location, so updating an image automatically updates it everywhere it's used. This is especially useful for large companies with many divisions and departments.

Initially, multiple columns were used, but they weren't found to be useful over time.


![screenshot of the sample](./assets/sample.png)

![screenshot of the sample](./assets/all-items.png)

## View requirements

Image column type doesn't allow manual path input.

Text column type allows it but requires an additional view to display.

Hyperlink or Picture column types as the name suggested, it can be used for pictures only or hyperlinks. Picture in this case fitting the purpose of displaying images 

*Views

Icon view (gallery) is used for visitors.

AllItem view is used for site owners/admins to maintain the quick links.

Field Name | Required | Type
---------- | -------- | ----
URL (Title) | Yes | Single line of text
Icon | Yes | Hyperlink or Picture (Picture)


## Sample

Solution|Author(s)
--------|---------
[comfy.json (icon view)](./assets/comfy.json) | [Watana](https://github.com/Watana2)
[compact.json (icon view)](./assets/compact.json) | [Watana](https://github.com/Watana2)
[compact2.json (icon view)](./assets/compact2.json) | [Watana](https://github.com/Watana2)
[url-format.json (AllItems view)](./assets/url-format.json) | [Watana](https://github.com/Watana2)


## Version history

Version|Date|Comments
-------|----|--------
1.0|August 2024|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---
