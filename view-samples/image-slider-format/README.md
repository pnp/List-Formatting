# Image Slider format

## Summary
This sample includes format to display images in Lists as slider moving to next clicking the icon on top left of image.

![Image Slider format](./assets/SliderImageList.gif)

## View requirements
- The format expect the following fields:

Field |Type
--------|---------
Title | Single line of text 
url | Single line of text  - url of image
UpdateState | Single line of text - this field will be used order the images

### Edit View requirements

- Edit View where format will be included:
   - Access to "**Sort**" Area and select column "**UpdateState**" and check as **ascending order**, this option order the images based on changed.
   - Access to "**Item Limit**" Area and in "**Number of items to display:**" add **1** and check option "**Limit the total number of items returned to the specified amount.**"

## Sample

Solution|Author(s)
--------|---------
image-slider-format.json | [André Lage](https://twitter.com/aaclage)

## Version history

Version|Date|Comments
-------|----|--------
1.0|December 08, 2021|Initial release


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/view-samples/image-slider-format" />