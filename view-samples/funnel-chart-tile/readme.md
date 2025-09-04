# Funnel Chart – SharePoint List Tile JSON Formatter

This sample demonstrates how to render a **Funnel Chart** inside a **Tile card style view** in SharePoint.

The funnel chart is useful for visualizing pipeline stages such as **Leads → Qualified → Proposal → Closed**, with stage widths proportional to numeric values.

---

![screenshot of the sample](assets/screenshot.png)

## Prerequisites

Create a **Custom List** with the following columns:

| Column Name    | Type              | Example Value |
|----------------|-------------------|---------------|
| **Title**      | Single line text  | Sales Funnel |
| **Stage1**     | Number            | 100 |
| **Stage1Label**| Single line text  | Leads |
| **Stage1Color**| Single line text  | #0078d4 |
| **Stage2**     | Number            | 70 |
| **Stage2Label**| Single line text  | Qualified |
| **Stage2Color**| Single line text  | #00a300 |
| **Stage3**     | Number            | 40 |
| **Stage3Label**| Single line text  | Proposal |
| **Stage3Color**| Single line text  | #ff8c00 |
| **Stage4**     | Number            | 20 |
| **Stage4Label**| Single line text  | Closed |
| **Stage4Color**| Single line text  | #e81123 |

> You can add more stages if needed by extending the JSON.

---

## Installation

1. Navigate to your SharePoint list
2. Click on **Format current view** (or the view dropdown → **Format current view**)
3. Select **Tiles** layout if not already selected
4. Click **Format tiles**
5. Copy and paste the JSON code from the formatting file
6. Click **Preview** to see the result
7. Click **Save** to apply the formatting


### Sample

Solution|Author
--------|---------
funnel-chart-tile.json | [Sai Bandaru](https://github.com/saiiiiiii) ([LinkedIn](https://www.linkedin.com/in/sai-bandaru-97a946153/))

## Version history

Version|Date|Comments
-------|----|--------
1.0|Sep 04, 2025|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**