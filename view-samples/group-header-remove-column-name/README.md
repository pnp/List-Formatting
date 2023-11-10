# Remove column name from group header

## Summary

This view formatting sample can be used to customize the group header to remove column name from group header.

![screenshot of the sample](./assets/screenshot.png)

This sample contains two JSON files, one in which the group header is clickable (`group-header-remove-column-name-clickable.json`) and one in which it is not (`group-header-remove-column-name.json`). If you apply `group-header-remove-column-name-clickable.json` and click on a group header, you will see the view filtered by the value of the group header you clicked on.

## View requirements

List view with Group by applied on any column in the view.

> **Note**
> If grouping by Person or Lookup column and applying this sample JSON, **[object Object]** will appear in the group header. If you grouped by Person or Lookup columns, refer to the following table to make the necessary changes in the JSON.
> 
> | Type of column to group | Part of the JSON to be changed | After the change |
> | --- | --- | --- |
> | Person | @group.fieldData.displayValue | @group.fieldData.title |
> | Lookup | @group.fieldData.displayValue | @group.fieldData.lookupValue |

## Sample

Solution|Author(s)
--------|---------
group-header-remove-column-name.json | [Ganesh Sanap](https://github.com/ganesh-sanap) ([@GaneshSanap20](https://twitter.com/GaneshSanap20))
group-header-remove-column-name-clickable.json | [Ganesh Sanap](https://github.com/ganesh-sanap) ([@GaneshSanap20](https://twitter.com/GaneshSanap20)) & [Tetsuya Kawahara](https://github.com/tecchan1107) ([@techan_k](https://twitter.com/techan_k))

## Version history

Version |Date          |Comments
--------|--------------|--------------------------------
1.0     |November 10, 2021 |Initial release
1.1     |October 17, 2023 |Added group-header-remove-column-name-clickable.json
1.2     |November 10, 2023 |Added note for grouping by Person and Lookup columns

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes

- [Group customization syntax reference](https://learn.microsoft.com/sharepoint/dev/declarative-customization/view-group-formatting)
- [Formatting syntax reference - Special string values](https://learn.microsoft.com/sharepoint/dev/declarative-customization/formatting-syntax-reference#special-string-values)

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/group-header-remove-column-name" />
