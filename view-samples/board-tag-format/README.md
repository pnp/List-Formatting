# Board tag format

## Summary
This sample display formatted card in board that allow tag definition, date of card and menu option to define card position in category, share link and include Flag for focus color on card, associate assigned user, minimize/expand Card and order by top. 

![Board tag format](./assets/Board-Card-Tag-formating.gif)

### Task Cards
![Board tag format](./assets/Card-tasks.PNG)

## View requirements
- The format expect the following fields, create fields in View:

Field |Type
--------|---------
Title | Single line of text.
Assigned | Person - Assigned user associated to task, allow multiple selections of users.
Tag | Choice - include tag names and define format for each choice and allow multiple selections.
Category | Choice - include following values **("Started","Pending","Completed ✔️","Cancel")**.
Progress | Choice - include following values **("Not Started","In progress","Completed")**.
Priority | Choice - include following values **("Urgent","Important","Medium","Low")**.
Start Date | Date and time - Start date of task.
End Date | Date and time - Due Date of task.
Description | Multiple lines of text.
Flag | True/False - include flag and change backgound color of card (Default value **False**).
Expand | True/False - Minimize or expand Card (Default value **False**).
Order | Single line of text - Allow to order Cards to top.
Modified | Date - Include field in View
Modified by | Person - Include field in View

### Create Board View

- Access to View dropdown and select "**Create new view**".
- Add new Name and select option "**Board**" and include referenced fields in View.

### Edit List View requirements

- Access to List Settings > access to "**Views**" area and select created view.
- Edit View where format will be included:
   - Access to "**Sort**" Area and select column "**Order**" and check as **descending order**, this option order the cards based on changed.

## Sample

Solution|Author(s)
--------|---------
board-tag-format.json | [André Lage](https://twitter.com/aaclage)
board-tag-box-format.json | [André Lage](https://twitter.com/aaclage)
card-format.json | [André Lage](https://twitter.com/aaclage)

## Version history

Version|Date|Comments
-------|----|--------
2.0|April 14, 2022|New features
1.0|March 1, 2022|Initial release


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/board-tag-format" />
