# reorder expand items board format

## Summary
This sample allow users to manage cards order in Board Views and also allow to expand and collapse images based on url option.
This sample has option "**Move to Top**" that allows to manage cards to top of board view as way to rearrange card positions.

![reorder expand items board format](./assets/BoardReorderExpand.gif)

## View requirements
- The format expect the following fields:

Field |Type
--------|---------
Title | Single line of text 
Category | Choice - Include the following options **"Started,Pending,Completed"**
Order | Single line of text   - Manage the order of cards
Image | Single line of text   - This field allow to include url to image.
Expand | Yes/No - default value **"No"**

### Create Board View

- Access to View dropdown and select "**Create new view**"
- Add new Name and select option "**Board**"

### Edit List View requirements

- Access to List Settings > access to "**Views**" area and select created view.
- Edit View where format will be included:
   - Access to "**Sort**" Area and select column "**Order**" and check as **descending order**, this option order the cards based on changed.


## Sample

Solution|Author(s)
--------|---------
reorder-expand-items-board-format.json | [André Lage](https://twitter.com/aaclage)

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 15, 2022|Initial release


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/view-samples/reorder-expand-items-board-format" />
