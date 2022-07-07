# Column Graph format

## Summary

This sample shows how to format a list to show the data as a column graph. In this instance we are showing number of views per blog.

![screenshot of the sample](./assets/screenshot.png)

The sample features the following:
- Conditionally showing a crown icon if the item is marked as MostRead
- Conditionally showing elements (chart labels) based on `@rowIndex`
- Conditionally showing a trending icon if the item has more than 700 views
- Conditionally changing the colour of the bar if the item has more than 700 views
- Use of theme color classes to ensure the format displays as intended regardless of theme (light, dark, custom, etc.)

### Item Hover view
![Column Graph with Title Screenshot](./assets/columngraph_with_title.png)

## View requirements

|Type|Internal Name|Required|
|---|---|:---:|
|Single line of text|Title|Yes|
|Number|Views||
|Yes/No|MostRead||

### Setup

The sample needs the following setup:
- Only one item needs to have `MostRead` as yes

The idea is that this data gets populated via some code so that it can represented as a graph.

In the sample, the height of the parent div is set to 800px and the child div calculates heights. The heights are calcuated considering 1000 as the max number of views. If this number needs changed, please update the formulas in lines 89 and 112 accordingly.

## Sample

Solution|Author(s)
--------|---------
column-graph.json | [Anoop Tatti](https://github.com/anoopt) ([@anooptells](https://twitter.com/anooptells))

## Version history

Version|Date|Comments
-------|----|--------
1.0|August 15, 2019 |Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/column-graph" />
