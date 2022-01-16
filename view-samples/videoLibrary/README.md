# Video library for SharePoint and the new Stream in SharePoint

## Summary
A gallery view of video stored in SharePoint with a card layout showing rich metadata such as title, description, people, tools topics covered, social sharing options like yammer, share and like.

![screenshot of the sample](./assets/VideoLibrary.jpeg)

## View requirements

Column Name   |Type
--------------|--------------
Title         | Single Line Text
Description   | Multi Line Text
Track         | Choice
Session       | Single Line Text
About         | Multi Line Text
Responsible   | Person or Group
Image         | Image
Learning      | Hyperlink
Yammer        | Hyperlink
User          | Person or Group
Age           | Calculated (=DATEDIF(Created,TODAY(),"d"))
Tool          | Choice

## Sample

Solution|Author(s)
--------|---------
videoLibrary.json | Anand Ragav https://twitter.com/anandVragav 

## Version history

Version|Date|Comments
-------|----|--------
1.0|November 23, 2021|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-list-formatting/view-samples/videolibary" />