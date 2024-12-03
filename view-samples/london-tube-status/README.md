# London Underground Line Status

## Summary
Display on the homepage of your SharePoint intranet a continually updated feed of London Underground line statuses using the publicly available Transport for London (TFL) API. 

The results are retrieved using Power Automate, then written to a SharePoint list, and the list view is styled (using view formatting) so it looks like the familiar TFL tube status board with correct line colours. Any line not currently in Good service can be clicked and a hovercard will show with further information i.e. delays/suspension/closure etc. 

![screenshot of the sample](./assets/screenshot.png)

![Animated GIF of the Styled SharePoint List View In Action](./assets/screenshot-animated.gif)

## View requirements

### Technologies Used

* **SharePoint** 
  * **List** (used to store the latest TFL line status data)
    * **View Formatting** (JSON used to style the list into the familiar TFL Status board)
* **Power Automate** (used for both creating the Tube Status SharePoint list using the SharePoint REST API and then, on a scheduled basis, retrieving the latest TFL tube statuses)
* **Azure Logic Apps** (OPTIONAL - used for retrieving the latest TFL tube statuses using Azure Logic Apps instead of Power Automate.)

### Prerequisites

* You must be licenced and able to create Power Automate flows
* If Azure Logic Apps option is chosen you must be able to create or have a Logic app created for you.
* You must have a valid SharePoint Online license and permission to create lists.
* You must have a modern SharePoint site where you can store the data for the app.
* Download the assets from this folder

### How To Install The Solution

I have attempted to simplify/automate the deployment of the solution as much as possible. I have combined this into two flow templates which with a few very minor changes do all the work for you to deploy and configure this solution!

It is a very quick install and will take you approximately 15 minutes.

> No need to create the list manually, run any PowerShell to execute any commands, apply a PnP Template or Site Design, etc.

An overview is provided below, but detailed installation instructions can be found here:
[Live London Underground Line Status - SharePoint View Formatting & Power Automate](https://www.leonarmston.com/2020/09/live-london-underground-line-status-sharepoint-view-formatting-power-automate/)

There are 2 Power Automate flow templates included in the Assets folder in this solution. Download both of the zip files to your machine.

#### UPDATE v3.0
Updated View formatting JSON and deployment Flow to reflect London Overground lines and the Elizabeth line being included. So had to update colours, text etc.

#### UPDATE v2.0
I have now recreated the TFL Status Power Automate (Flow) to also run in Azure Logic Apps rather than Power Automate, so you can now choose where to run the scheduled TFL Tube Status update process to your SP list. You may prefer to run the solution in Azure Logic Apps for a whole host of reasons i.e. greater monitoring, Power Automate licensing etc.
Further instructions and new blog article [here](https://www.leonarmston.com/2021/01/live-london-underground-line-status-solution-summary-learnings-from-converting-to-azure-logic-apps/)

**Run sections 1 & 2 for the Power Automate option** or **sections 1 & 3 for the Logic Apps option.**

#### 1 Deployment flow (Always used to deploy the SP list even if Logic Apps option is chosen)

- In Power Automate, import the [DeploySPList-LondonTubes.zip](./flows/DeploySPList-LondonTubes.zip) template.
- Once imported, edit the flow to change the Target Site for Lists variable to point to the site where you would like the Tube Status list to be deployed.
- Run the flow
- You can now safely remove this flow as it was only needed once to create the list and install the view format

#### 2 TFL Tube Status flow (Power Automate Option)

- In Power Automate, import the [LondonTubes-TFLTubeStatusAPI.zip](./flows/LondonTubes-TFLTubeStatusAPI.zip) template.
- **You will receive an error** (_import failed for one or more package resources_)
- Click the **Save as a new flow** link within the error section
- Use the flow checker to find each action that needs to be updated (there are 3 total). Update the action to point to your site and choose the Tube Status list.
- Save the flow and run it

Head over to your list and you'll see the Tube Statuses being updated using the view format! By default, this list will receive updates every 15 minutes.

#### 3 TFL Tube Status flow (Azure Logic Apps Option)

- Create an Azure Logic App in your Azure subscription (can be named anything i.e TFL_API)
- Select to create a "Blank Logic App" from the list of Logic App templates.
- IMPORTANT STEP: In Logic Apps Designer add one trigger SharePoint - When an item is created. Connect to your site and choose the Tube Status list (you may need to authenticate to your M365 tenant. This is an important step as it will help you retrieve the sharepointonline connection details which are unique to your environment.
- Once authenticated using SharePoint go to Code View on the top Logic Apps Designer bar.
- Make a copy of the the current parameters block of JSON from Code View and paste it somewhere safe into a notepad. i.e. see example of below of a parameters block to copy (it will have your Azure subscription ID, resource group and azure location):
```json
"parameters": {
    "$connections": {
        "value": {
            "sharepointonline": {
                "connectionId": "/subscriptions/<Your Azure Subscription ID>/resourceGroups/<Resource Group Name>/providers/Microsoft.Web/connections/sharepointonline",
                "connectionName": "sharepointonline",
                "id": "/subscriptions/<Your Azure Subscription ID>/providers/Microsoft.Web/locations/<Azure DC Location>/managedApis/sharepointonline"
            }
        }
    }
}
```
- Now go to [LondonTubes-TFLStatusAPI.json](./logicapps/LondonTubes-TFLStatusAPI.json) and copy all of the JSON to your clipboard.
- Go back to the Logic App Code View - Select All of the JSON there already then Paste the JSON from previous step.
- Retrieve the parameters block from your notepad and overwrite the parameters block in Code View (this is adding your SharePoint connection details to the Logic App json).
- Now go to the Logic Apps Designer view and three SharePoint actions will need to be updated. Update the action to point to your site and choose the Tube Status list.
- Save the Logic App and run it.

Head over to your list and you'll see the Tube Statuses being updated using the view format! By default, this list will receive updates every 15 minutes.

## Sample

Solution|Author(s)
--------|---------
london-tube-status.json | [Leon Armston](https://github.com/LeonArmston) ([@LeonArmston](https://twitter.com/LeonArmston))

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 24, 2020|Initial release
2.0|January 31, 2021|Updated to include Logic App version and improved Flow.
3.0|November 28, 2024|Updated [london-tube-status.json](./london-tube-status.json) & [DeploySPList-LondonTubes.zip](./flows/DeploySPList-LondonTubes.zip) to include addition of London Overground & Elizabeth lines.

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/london-tube-status" />
