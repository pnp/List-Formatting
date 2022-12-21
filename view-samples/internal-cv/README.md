# Internal CV

## Summary
This tutorial will help you create a basic internal CV through JSON view formatting. Thanks to JSON formatting, it's possible to create a large custom card to be used as a form itself, by taking advantage of the inline editing feature.

<img src="./assets/Internal-CV-preview.png" width="70%">

## Important notes
This solution is not intended to encompass an entire management process, but should be considered as an additional tool to support a single task or process phase, where users periodically update their respective internal CV.
The final result, including its features, has been tested with the following screen sizes:

**1)** 27" - 2560 X 1440

**2)** 24" - 1920 x 1080

**3)** 17" - 1920 x 1080

**4)** 13" - 1280 x 800

Microsoft Lists mobile app doesn't support the usage of this custom view, whereas an OOTB view would let users to fill out the standard form.

## Solution breakdown

Here is a visual description of the user interface:

![breakdown](./assets/Breakdown.png)

## How to:

**1) LIST CREATION:** create a new list from scratch with the following columns, including their **exact names with capital letters**:


| **COLUMN NAME** | **COLUMN TYPE** |
|:-----------------|-----------------|
| **COVER**       | Image column. This will let users to customize their profile image header             |
| **BACKGROUND**           | Image column. This will let users to add a custom background                |
| **Author**     | This is a standard column, required to display a user name in the internal CV                |
| **YAMMER_PROFILE**            | Multiple lines of text. Rich text **disabled**. This column lets users write their Yammer profile link and make it available through the corresponding command bar icon                |
| **ABOUT_ME**        | Multiple lines of text. Rich text **disabled**. This column allows a user to provide a short description of their working profile and career.                |
| **PROJECTS**   | Multichoice column. This column allows a user to list both past and current projects. You can setup it to contain custom choices or not.                |
| **SKILLS_EXPERTISE**        | Multichoice column. This column allows a user to list skills and expertise considered as relevant. You can setup it to contain custom choices or not.                |
| **SCHOOLS_EDUCATION**        | Multichoice column. This column allows a user to list info about schools and education path. Custom choices are recommended.                |
| **BADGES_CERTIFICATIONS**          | Multichoice column. This column allows a user to list all the badges and certification acquired. You can setup it to contain custom choices or not.               |
| **MY_WORKS**        | Multiple lines of text. Rich text **disabled**. This column depends on the OOTB Attachments column and a speficic Power Automate flow to list and display clickable attachments in the internal CV.                 |
| **COWORKERS**   | Multi person column. Altough Microsoft 365 already provides info about most frequent coworkers and an org chart, a user could provide updated and consistent info about **actual** coworkers collaborating in one or more projects.                |

**NOTE:** the standard and well known Title column isn't used in this sample, therefore you can make it not mandatory through the advanced list settings and exclude it both from the view and the standard form normally available as a right pane.

**2) GALLERY VIEW CREATION:** create a new Gallery view and provide a custom name.

**3) JSON CODE:** copy the JSON code available [HERE](./internal-cv.json).

**4) GALLERY VIEW FORMATTING:** paste the JSON code into the view formatting box (Advanced formatting mode):

<img src="./assets/Format-Gallery-View.png" width="70%">

**5) ADVANCED PERMISSION SETTINGS:** an internal CV should only be edited by the user who created it. Therefore, to avoid unexpected and unwanted changes by other users, proper permission settings are highly recommended. Go to the list settings --> advanced settings and select "Create items and edit items that were created by the user".

![advanced permission settings](./assets/Permission.png)

**6) VIEW FILTERING FOR A BETTER USER EXPERIENCE:** even if a user could open this list with all the existing items (internal CVs created by others), setting up an already filtered view could be a better option. This behaviour is recommended to allow a user to open his/her internal CV later, without performing a search. To make this work, go to the list settings, scroll down and click on the gallery view you just created. Then, scroll down again to the Filter section, apply and save the following setup:

![view filtering](./assets/Created-by.png)
 
**7) YOUR LIST NAME REPLACEMENT:**  go to line number **1437** and **1460** of the JSON code and replace the dummy text with your real list name, as shown in the sample image below:

![list name replacement](./assets/Replace-List-Name.png)

⚠️ **Warning:** the real list name is the one you can find in your browser address bar! Therefore, if you have created a list named "Internal CV", then you have to copy the coded name in the address bar, that is "Internal%20CV".

**8) POWER AUTOMATE FLOW:** to correctly display the attachments as works portfolio, you should setup a specific Power Automate flow. This process is **mandatory**, given that it writes into the custom MY_WORKS column previously created and the custom JSON code translates it to clickable tiles. Furthermore, a service account used to run this flow should be included as **list owner** in order to override the permission settings illustrated in point n. 5 above.

**HOW IT WORKS**

A Power Automate flow uses a service account (or a personal account not meant for actual use of this solution) to check if one or more attachments are added to an item. This flow is triggered every time a new item is created or modified by other users.

If you are not familiar with Power Automate or your org has whatever limitation about performing operations like this, you can still take advantage of the works portfolio section! Since these attachments wouldn't be updated everyday, you should provide your users with a basic training to make them manually write the attachments names, separated by colon. For example:  **Hello world.docx:Presentation.pptx:Table.xlsx** would retrieve 3 clickable tiles in the works portfolio section.

Here is an overview of the Power Automate flow:

![power automate flow](./assets/Attachments-Flow-Desc.png)

**HOW TO AVOID INFINITE LOOPS**

If a Power Automate account updates an item with all its attachments labels, then the trigger will run again, given that the item has been modified. This behaviour would lead to an infinite loop, just because the service account is doing what we setup!

How to prevent this unwanted behaviour?

As explained in a tutorial made by [Reza Dorrani](https://www.youtube.com/watch?v=oKN4_5o2NUA), you have to setup a trigger condition. In this tutorial, the trigger condition checks if the item has been modified by a service account used to run the flow. If yes, the trigger condition will automatically stop the flow, then avoiding infinite loops.

![trigger condition](./assets/Trigger-Condition.png)

## More info and details
The image icons displayed on the upper right corner of the toolbar are hosted in this GitHub repository. You can download them and edit the JSON code (eg. row number 226) to display the icons, so that your corporate repository is used as internal source.


## Sample

Solution|Author(s)
--------|---------
internal-cv.json | [Federico Sapia](https://github.com/Fedes365) ([LinkedIn](https://www.linkedin.com/in/federicosapia/))



## Version history

Version |Date              |Comments
--------|------------------|--------------------------------
1.0     |December 21, 2022  |Initial release


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/internal-cv" />

