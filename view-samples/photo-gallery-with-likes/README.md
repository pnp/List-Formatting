# Photo Gallery with Likes

## Summary

This sample demonstrates formatting a document library gallery view into a photo gallery showing title and likes.

![screenshot of the sample](./assets/screenshot.gif)

There is also a version that has no title and shows only likes.

![screenshot of the sample](./assets/screenshot-no-title.png)

## View requirements

The view must be set to gallery.  
This format expects the following columns to be part of the view:

|Type|Internal Name|Required|
|---|---|:---:|
|Single line of text|Title|No
|Number|LikesTotal|No
|Multi-Person|LikedBy|No

## Sample

Solution|Author(s)
--------|---------
photo-gallery-with-likes.json | [Lou-i3](https://github.com/Lou-i3)
photo-gallery-no-title.json | [Lou-i3](https://github.com/Lou-i3)

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 21, 2022|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes

The file name can also be displayed by setting the `txtContent` property as follows.

```
"txtContent": "=substring('[$FileLeafRef]',0,lastIndexOf([$FileLeafRef],'.'))"
```

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/photo-gallery-with-likes" />