# Instagram Basic Display

## Summary
Display on the homepage of your SharePoint site a continually updated feed of Instagram media posts using the publicly available **Instagram Basic Display (IndependentPublisher)** connector. 

The results are retrieved using Power Automate, then written to a SharePoint list, and the list view is styled (using view formatting) so it looks like the familiar Instagram. On click of each post, the post opens up in a new tab within Instagram to allow user to view more details as well as engage within Instagram. On hover on each image the caption of the post is shown.

![screenshot of the sample](./assets/screenshot.png)

![Animated GIF of the Styled SharePoint List View In Action](./assets/screenshot-animated.gif)

## View requirements

### Technologies Used

* **SharePoint** 
  * **List** (used to store the latest Instagram data)
    * **View Formatting** (JSON used to style the list into the familiar Instagram)
* **Power Automate** (used on a scheduled basis, to retrieve the latest Instagram posts)

### Prerequisites

* You must be licenced and able to create Power Automate flows
* You must have a valid SharePoint Online license and permission to create lists.
* You must have a modern SharePoint site where you can store the data for the app.
* Download the assets from this folder

### How To Install The Solution

* Create a list with the following columns

| Column | Type            |
| --------- | ----------------- |
| caption     | Multiple lines of text  |
| permalink    | Single line of text    |
| timestamp    | Single line of text    |
| username    | Single line of text    |
| mediaUrl    | Multiple lines of text    |
| thumbnailUrl    | Multiple lines of text    |
| mediaId    | Single line of text    |
| mediaType    | Single line of text    |

* Import the Power Automate Flow 

Please follow instructions from [instagram-feed-to-SharePointList](https://github.com/reshmee011/powerautomate-samples/tree/main/samples/instagram-feed-to-SharePointList) to get the flow working.

* Amend the HTML Field Security settings to add scontent-lhr8-1.cdninstagram.com, scontent-lhr8-2.cdninstagram.com and scontent-lhr8-3.cdninstagram.com. Please refer to [img-src-security](https://learn.microsoft.com/en-gb/sharepoint/dev/declarative-customization/formatting-syntax-reference#img-src-security) for more details.

* Create a view with field caption, permalink, mediaUrl, thumbnailUrl and mediaType. Amend the item limit to the desired number, e.g. 9.

* Format the view and copy and paste the JSON provided.

## Sample

Solution|Author(s)
--------|---------
Instagram-basic-display.json | [Reshmee Auckloo](https://github.com/Reshmee011) ([@reshmeeauckloo](https://twitter.com/reshmeeauckloo))

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 30, 2023|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/instagram-basic-display" />
