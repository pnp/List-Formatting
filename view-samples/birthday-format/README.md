# Birthday Row Format

## Summary
This is a sample derived from the contact card row format.  It shows how to format a list to show upcomming employee birthdays.  It features the following:
- Responsive layout through flexbox
- Conditionally showing a birthday cake icon if the persons birthday is the current date
- Conditionally changing the text which shows based on if the persons birthday is the current date
- Row Actions
  - Emailing the person with a pre-filled Happy Birthday Subject
- Use of theme color classes to ensure the format displays as intended regardless of theme (light, dark, custom, etc.)

![Light and Dark Themes](./birthdayScreenshot.png)


## View requirements

|Type|Internal Name|Required|
|---|---|:---:|
|Single line of text|Title|Yes|
|Single line of text|JobTitle||
|Single line of text|Email||
|Date Time|Birthday|Yes|
|Calculated Column|BirthMonthDay||
|Picture|Picture||

You need the BirthMonthDay Calculated Column so that it only shows the current month name spelled out and date, not the year.  The formula for this calculated column is below:

=CONCATENATE(TEXT(Birthday,"MMMM")," ",TEXT(Birthday,"DD"))

This sample relies on having a View set up which filters to only show items where the Birthday is greater than or equal to the current date.  Make sure to apply the necessary filters in your view for this to work.  

To make this a truly automated process, you can use Microsoft Flow to pull Birthday information from your Office 365 User Profiles and populate the SharePoint list with those values.  This is a good blog post which shows how to do that: https://techcommunity.microsoft.com/t5/SharePoint/Celebrating-milestones-with-SharePoint-Flow-and-Delve/td-p/175433

## Sample

Solution|Author(s)
--------|---------
birthday-format | [April Dunnam](https://twitter.com/aprildunnam)

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 20, 2019 |Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---
