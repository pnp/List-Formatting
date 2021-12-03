# Menu Tiles Order 

## Summary
This sample is based on sample "[generic-tile-format](./../generic-tile-format/README.md)" and includes redesign of tiles with new functionalities such us configuration of tiles based on **size**, **color** and reorganize tiles as **favorites** using option `"setValue"` and also include `customCardProps` base on **description** of tile.
Include the capabilities from "[generic-tile-format](./../generic-tile-format/README.md)" such us Icons from the Microsoft UI Fabric, Url and NewTab fields.

![Menu Tile configuration](./assets/custom-tiles-menu.gif)

This format uses icon "**AddFavorite**" with option  `"action": "setValue",` to update item and reorganize Tiles in List View is order by "**Modified**". 

![Menu Tile configuration](./assets/custom-tiles-menu1.gif)

## View requirements
- The format expect the following fields:

Field |Type
--------|---------
Title | Single line of text 
Description | Multiple line of text 
Color | Single line of text - Select one of this pre defined case-sensitive colors - (**empty/null, Green, Red, CyanBlue, Gray, MagentaPink, Orange, OrangeYellow**).
icon | Single line of text
URL | Hyperlink 
NewTab | Yes/No - This field is used to open the link the same tab or new tab
Small | Yes/No - Used to define the size of Tile.
OrderDate | Date & Time - this field will be used to update item to order tile.

### Edit View requirements

- Edit View where format will be included, access to "**Sort**" Area and select column "**Modified**" and check as **descending order**, this option order the Menu Tiles based on last changed.


## Sample

Solution|Author(s)
--------|---------
menu-tiles-order.json | [André Lage](https://twitter.com/aaclage)

## Version history

Version|Date|Comments
-------|----|--------
1.0|December 03, 2021|Initial release


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/view-samples/menu-tiles-order" />
