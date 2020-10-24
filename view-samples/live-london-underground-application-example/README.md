# Live London Underground Line Status - SharePoint View Formatting & Power Automate

Display on the homepage of your SharePoint intranet a live feed of London Underground line statuses using the publicly available Transport for London (TFL) API. The results are retrieved by Power Automate, then written to a SharePoint list and using SharePoint view formatting the list view is styled so it looks like a familiar TFL tube status board with correct line colours. The status(es) of the lines can then be clicked and using a hovercard show if there is any further information i.e. delays/suspension/closure etc. 

![Image of SharePoint List view web part on an Intranet](./ListViewFormattedOnAnExampleIntranePage.png)

![Animated GIF of the Styled SharePoint List View In Action](./ListViewWebPartStyledShowingHoverCard-animated.gif)

### Technologies Used

* **SharePoint** 
  * **List** (used to store the latest TFL line status data)
    * **View Formatting** (JSON used to style the list into the familiar TFL Status board)
* **Power Automate** (used for creating the Tube Status SharePoint list using SharePoint REST API and then on a scheduled basis retrieve the latest TFL tube statuses)

### Prerequisites

* You must be licenced and able to create Power Automate flows
* You must have a valid SharePoint Online license and permission to create lists.
* You must have a modern SharePoint site where you can store the data for the app.
* Download the assets from this folder

## How To Install The Solution

I have attempted to simplify/automate the deployment of the solution as much as possible. I have combined this into two flow templates which with a few very minor changes do all the work for you to deploy and configure this solution!

It is very quick install and will take you approx 15 minutes or less.
```
No need to create the list manually, run any PowerShell to execute any commands apply a PnP Template or Site Design etc.
```
Follow my blog post for detailed installation instructions:
(https://www.leonarmston.com/2020/09/live-london-underground-line-status-sharepoint-view-formatting-power-automate/)

Please leave comments, questions or feedback on the blog post. I hope you find this helpful and it helps your organisation.

## Sample

Solution|Author(s)
--------|---------
DeploySPList-LondonTubes.zip | [Leon Armston @LeonArmston](https://twitter.com/LeonArmston)
LondonTubes-TFLTubeStatusAPI.zip  | [Leon Armston @LeonArmston](https://twitter.com/LeonArmston)
LondonTubes | [Leon Armston @LeonArmston](https://twitter.com/LeonArmston)

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 24, 2020|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/view-samples/live-london-underground-application-example" />

