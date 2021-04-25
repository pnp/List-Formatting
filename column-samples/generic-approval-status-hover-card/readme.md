# Approval Status column of SharePoint with a Hover Card

## Summary
The following image shows a document library where Content Approval is enabled. In the Approval Status column the English value is used to show an icon with a colour and on hover - a hover card is shows 

![screenshot of the sample](./SharePoint_ColumnFormatting_ApprovalStatus.png)

## View requirements
- This format can be applied to any column in your view as long as the Approval Status column ([$_ModerationStatus]) and the Modified column ([$Modified]) are also visible in the same view:

Column Name         |Type
--------------------|--------------
Approval Status     | Default when Content Approval is enabled
Modified            | Default modified column

## Sample

Solution|Author(s)
--------|---------
approval-status-hover-card.json | Django Lohn

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 19, 2021|Initial release


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
This sample uses icons from the Office UI Fabric

- [Office UI Fabric](https://developer.microsoft.com/en-us/fabric)