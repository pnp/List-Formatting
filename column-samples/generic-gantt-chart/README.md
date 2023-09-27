# Gantt Chart

## Summary
This sample demonstrates the use of the Calculated column to generate a string for displaying a Gantt chart, and then parses the string to display the Gantt chart. The start and end dates for the entire Gantt chart can be changed to any value by changing the formula in the Calculated Value column.

![screenshot of the sample](./assets/screenshot.png)

## View requirements

|Type                             |Internal Name|Required|
|---------------------------------|-------------|:------:|
|Date and time                    |Start        |Yes     |
|Date and time                    |End          |Yes     |
|Calculated (Single line of text) |GanttChart   |Yes     |

- Set one of the following formulas for the `GanttChart` column
    ```
    [Formula1]
    =TEXT([Start],"MM-dd-yyyy")&"^"&TEXT([End],"MM-dd-yyyy")&"(【Overall start date of the Gantt chart (in MM-dd-yyyy format)】_【Overall end date of the Gantt chart (in MM-dd-yyyy format)】)"

    [Formula1 Sample]
    =TEXT([Start],"MM-dd-yyyy")&"^"&TEXT([End],"MM-dd-yyyy")&"(08-01-2023_01-31-2024)"
    ```

    ```
    [Formula2]
    =TEXT([Start],"yyyy-MM-dd")&"^"&TEXT([End],"yyyy-MM-dd")&"(【Overall start date of the Gantt chart (in yyyy-MM-dd format)】_【Overall end date of the Gantt chart (in yyyy-MM-dd format)】)"

    [Formula2 Sample]
    =TEXT([Start],"yyyy-MM-dd")&"^"&TEXT([End],"yyyy-MM-dd")&"(2023-08-01_2024-01-31)"
    ```

    ![screenshot of the calculated column setting screen](./assets/formula.png)

## Sample

Solution|Author(s)
--------|---------
generic-gantt-chart.json | [Tetsuya Kawahara](https://github.com/tecchan1107) ([@techan_k](https://twitter.com/techan_k))

## Version history

Version |Date              |Comments
--------|------------------|--------------------------------
1.0     |September 27, 2023|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes

- Calculated columns can be added from [See all column types] on the Create Column screen.

    ![screenshot of the create column screen](./assets/create-column-screen.png)

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/column-samples/generic-gantt-chart" />
