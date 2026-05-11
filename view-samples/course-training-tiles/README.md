# SharePoint View Formatting – Course Training Tile Cards

## Summary
Modern tile card layout for displaying training courses with images, badges, and hover previews in SharePoint Gallery view.

![screenshot of the sample](./assets/screenshot.png)

## Fields Required

| Column | Type | Required |
|--------|------|----------|
| Title | Single line of text | Yes |
| Image | Image | No |
| Visual | Choice | No |
| Sponsor | Single line of text | No |
| Description | Multiple lines of text | No |
| Hours | Number | No |
| Flag | Choice | No |
| URL | Hyperlink or Picture | Yes |

> [!NOTE]
> If no image is provided in the `Image` column, this sample displays the image located in the “SiteAssets” library > “Images” folder > “tile-default.png” within the site (line 108).
> Update the image file or path as needed.

## Features

- **280×350px tile cards** with course thumbnails
- **Hover popup** showing title and description
- **Duration badge** (auto-converts to hours/minutes)
- **Flag badge** for highlighting courses
- **Responsive image** with fallback to default
- **Direct link** to course content

## Sample

| Solution | Author(s) |
|----------|-----------|
| course-training-tiles.json | [Sai Bandaru](https://github.com/saiiiiiii) |

## Version History

| Version | Date | Comments |
|---------|------|----------|
| 1.0 | February 13, 2026 | Initial release |

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/course-training-tiles" />