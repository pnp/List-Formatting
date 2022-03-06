# Update a Status (Choice) and a Person field using Buttons and the setValue action

## Summary
This is a sample of creating buttons to approve/reject an item by updating an Approval Status field created using a choice field, and also set the value of a person field to the user who took the action by using the setValue action as below:

![Sample in action](./assets/quickApprovals.gif)

Key points:

- For the buttons, the CSS display property will be set to 'none' when the status is not empty and is different than 'Pending'. And the custom JSON will display a text message stating that the item was already approved or rejected in this case.
- When the item is not approved or rejected yet, the buttons are displayed so the user can take an action (Approve or Reject).

## View requirements

|Type|Internal Name|Required|Additional Information
|---|---|:---:|---|
|Calculated|Approval|Yes| Apply the template to this column
|Choice|ApprovalStatus|No| Choice values needed: Pending / Approved / Rejected
|Person or Group|ApprovalActionBy|No|Single selection


## Sample

Solution                                   |Author(s)
-------------------------------------------|---------------------------
approval-buttons-setValue-status-user.json |[Michel Mendes](https://twitter.com/michelcarlo) [(@michelcarlo)](https://twitter.com/michelcarlo)

## Version history

Version |Date          |Comments
--------|--------------|--------------------------------
1.0     |November 19, 2021 |Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
##

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/column-samples/approval-buttons-setValue-status-user" />
