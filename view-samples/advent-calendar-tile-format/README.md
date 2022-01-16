# Advent Calendar Tile Format

## Summary
This sample demonstrates an advent calendar where you can click on the present box of the day to see the presents. The present box cannot be opened if the value in the `Date` column is later than today.

![screenshot of the sample](./assets/screenshot.gif)

## View requirements

|Type               |Internal Name|Required|
|-------------------|-------------|:------:|
|Single line of text|Title        |Yes     |
|Thumbnail          |Present      |Yes     |
|Date and Time      |Date         |Yes     |
|Yes/No             |Opened       |Yes     |
|Managed Metadata   |BoxColor     |Yes     |
|Managed Metadata   |RibbonColor  |Yes     |

- You need to use the Gallery View.
- `BoxColor` and `RibbonColor` should be set to the HTML color code or color name.

## Sample

Solution                         |Author(s)
---------------------------------|---------------------------
advent-calendar-tile-format.json |[Tetsuya Kawahara](https://twitter.com/techan_k)

## Version history

Version |Date              |Comments
--------|------------------|--------------------------------
1.0     |December 19, 2021 |Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-list-formatting/view-samples/advent-calendar-tile-format" />