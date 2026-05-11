# Custom Hover Card (Column)

## Summary
A custom card is shown on hover of an item. The hover card shows additional details about an item's status.

![screenshot of the sample](./assets/screenshot.png)

## View requirements
- This format can be applied to any column type though the example is based on - 

Internal Name       |Type           |Notes
--------------------|---------------|------------
Status              | Choice        |
StatusCode          | Number        |This field is assumed to be set to a value of 0, 1, 2, 3, or 4
PackedDate          | Date and Time |
ShippedDate         | Date and Time |
InTransitStartDate  | Date and Time |
DeliveredDate       | Date and Time |

## Sample

Solution|Author(s)
--------|---------
custom-hover-card.json | [Niket Jain](https://github.com/NiketJain)

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 08, 2020|Initial release
1.1|November 15, 2023|Fixed view requirements in README.md and added `)` that was missing in JSON


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
This sample uses icons from the Office UI Fabric

- [Office UI Fabric](https://developer.microsoft.com/en-us/fabric)


<img src="https://pnptelemetry.azurewebsites.net/list-formatting/column-samples/custom-hover-card" />
