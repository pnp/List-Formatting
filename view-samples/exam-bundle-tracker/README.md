# Exam Bundle Tracker

## Summary

Often in certain schools, a system of _corporate marking_ exists where multiple teachers teaching a particular cohort (e.g. Mathematics Extension 1) will mark a section of each student's paper to ensure consistency.

When this occurs, often bundles of papers are divided by class, and each teacher takes a bundle out of a cupboard, but it can be hard to track:
- Who has possession of a particular bundle
- Whether I have marked a particular bundle or not (without having to hunt down and check through every bundle!)

This sample transforms your list into an Exam Bundle Tracker which answers the two questions above.

![screenshot of the sample](./assets/screenshot.gif)

## View requirements
The view format expect the following fields.

Internal Name |Type | Choices | Allow Fill in Choice | Other notes
--------|---------|--------|---------|---------
Title | Single line of text | | 
YearOfTask | Choice | `2023`, `2024`, `2025` etc | Yes |  | 
CourseYear | Choice	| `07`, `08`, ..., `11 - Adv`, `11 - Ext 1`, `12 - Adv`, `12 - Ext 1`, `12 - Ext 2` etc | No |  
BundleNumber | Choice | `1`, `2`, ..., `7` | No | 
TotalBundles | Number | | | Min: `0`
TaskNumber | Choice	| `1`, `2`, `3`, `4 (Yearly/Trial)` | 
InPossession | Person | | 
NotMarked | Multi Person | | 
Marked | Multi Person | | 
UpdateLog | Multiple lines of text, append to previous | | 
InCirculation | Yes/No | | 

### Views to make it work
The following views are needed, with the JSON code applied to the following views:

View name | Type | Sorting | Filtering | Group | Other notes | JSON code to paste
--------|---------|--------|---------|---------|---------|---------
Overview | List | None | `InCirculation` equal to `Yes` | `CourseYear` asc | | exam-bundle-tracker-overview.json
Overview - include out of circulation  | List | `YearOfTask` desc, `BundleNumber` asc |  | `CourseYear` asc | | exam-bundle-tracker-overview.json

All grouping is initially expanded.

## Sample

Solution| Author
--------|---------
exam-bundle-tracker-overview.json | [Hubert Lam](https://github.com/z3019494) ([Hubert Lam](https://twitter.com/z3019494))

## Version history

Version|Date|Comments
-------|----|--------
1.0|14 July 2023|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
Use the default **All Items** and **Edit in Grid** view to bulk enter new exam bundles.

## Acknowledgements
The Exam Bundle Tracker was inspired by multiple other samples found here in the PnP community, and the author greatly acknowledges their contributions.
- [Giuliano Del Luca's Video Library view](https://github.com/giuleon/ListViewFormattingVideoLibrary)
- [Tetsuya Kawahara's Assign to Me column formatting](https://github.com/pnp/List-Formatting/tree/master/column-samples/person-assign-to-me)
- [Michel Mendes' Group Header Status Icon and Color group formatting](https://github.com/pnp/list-formatting/tree/master/view-samples/group-header-status-icon-color)

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/exam-bundle-tracker" />