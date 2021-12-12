# Demoting the news

## Summary
In the Site Pages library, there is a Promoted State column. Depending on the value stored in this column, you can identify whether it is a site page or a news page. The correspondence between the value and page type is as follows.

Promoted State |Page Type
---------------|---------------------------
0              |Site page
1              |News page not yet published
2              |News page

Once a page is created as news page, it cannot be demoted to a site page under normal circumstances.

This sample demonstrates how to use the setValue action to update the value of the Promoted State column to 0 and demote the news page to a site page.

![screenshot of the sample](./assets/screen_capture.gif)

After demoting it, please republish it. Otherwise, view-only users will not reflect the change and the page will remain displayed as a news page.

![screenshot of how to republish](./assets/republish.png)

## Prerequisites
The Promoted State column needs to be displayed in the view. The following is how to display it.

1. Click any column.
2. Hover **Column Settings**
3. Click **Show/hide Columns**
4. Check **Promoted State**
5. Click **Apply**

![screenshot to show the promoted state](./assets/display_promotedstate.png)

## View requirements
This format can be applied to a Promoted State column.

## Sample

Solution                       |Author(s)
-------------------------------|---------------------------
promotedstate-demote-news.json |[Tetsuya Kawahara](https://twitter.com/techan_k)

## Version history

Version |Date              |Comments
--------|------------------|--------
1.0     |December 11, 2021 |Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/column-samples/promotedstate-demote-news" />