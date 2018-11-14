# Automated List Formatting Deployment Strategy using Visual Studio Code & PowerShell or Office365 CLI

## Summary
A collection of tools that allow you to dynamically deploy SharePoint List Formatting definitions directly from within VS Code.<BR>
Description of files for each solution is provided below. (PowerShell & Office365 CLI)<BR>
Video tutorial and a PnP Demo link is provided below.

## PowerShell Solution Folders & Files
### /.vscode
- Includes a 'tasks.json' which defines the custom VS Code tasks. These custom tasks can be executed using the Command Pallete and typing 'Run Task', then selecting the appropriate task for the List Formatting definition you are working on. (List Column Formatting, Site Column Formatting, View Formatting)

### /JSON Definitions
- Includes the List Formatting JSON definition files to be dynamically deployed to SharePoint using PowerShell and VS Code Custom Tasks.

### /PowerShell
- PowerShell templates for deploying a JSON definition to a List Column, Site Column or List View. PnP PowerShell Modules Required. (NOTE: Each PowerShell file must be updated to connect to the accurate SharePoint site, List Name, Column Name, View Name as well as the correct JSON definition file)

## Office365 CLI Solution & Files
### /.vscode
- Includes a 'tasks.json' which defines the custom VS Code tasks. These custom tasks can be executed using the Command Pallete and typing 'Run Task', then selecting the appropriate task for the List Formatting definition you are working on. (List Column Formatting, Site Column Formatting, View Formatting)

### /JSON Definitions
- Includes the List Formatting JSON definition files to be dynamically deployed to SharePoint using Office365 CLI and VS Code Custom Tasks

### /CLI
- CLI templates for deploying a JSON definition to a List Column, Site Column or List View. (NOTE: Each CLI file must be updated to connect to the accurate SharePoint site, List Name, Column Name, View Name as well as the correct JSON definition file)


## Sample

Solution|Author(s)
--------|---------
general-dynamic-deployment-with-vscode | David Warner II ([@DavidWarnerII](https://twitter.com/davidwarnerii) / [Warner Digital](http://warner.digital))

## Version history

Version|Date|Comments
-------|----|--------
1.0|November 13, 2018|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional Information:
- Video demonstration setting up, configuring VS Code and deploying List Formatting definitions:<BR>
http://warner.digital/list-formatting-automated-deployment-part1 

- PnP Community Call Demo:<BR>
URL COMING SOON - When Uploaded by Microsoft


<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/tools/general-dynamic-deployment-with-vscode" />

