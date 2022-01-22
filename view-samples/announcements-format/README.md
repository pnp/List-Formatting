# Announcements style

## Summary

This sample formats your view to look like a Announcements card with a similiar style to Viva Connection Cards when on a SharePoint Page.
On Microsoft Lists will also show a image that you can connect with the Announcement

### Announcements on SharePoint page using Default List Web Part

![Announcements Sample 1](./assets/announcementsImg1.png)

### Announcements on Microsoft List

![Announcements Sample 2](./assets/announcementsImg2.png)

## View requirements

| Column Name         | Type                                   | Internal Column Name |
| ------------------- | -------------------------------------- | -------------------- |
| Title               | Single Line Text                       | Title                |
| Description         | Single Line Text                       | Description          |
| TypeAnn             | Choice (Error, Success, Info, Warning) | TypeAnn              |
| RemovedDate         | Date and Time                          | RemovedDate          |
| (optional) ImgHover | Picture                                | ImgHover             |

## Sample

| Solution           | Author(s)                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| announcements.json | David Ramalho ([sharepoint-tricks.com](http://sharepoint-tricks.com), [@davRamalho](https://twitter.com/davRamalho)) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | 1 December, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/List-Formatting/view-samples/announcements-format" />
