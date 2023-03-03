# World Time

## Summary
This sample demonstrates displaying the time in each country of the world for a date column value that includes the time of day.

![screenshot of the sample](./assets/screenshot.png)

## View requirements
This format can be applied to a Date column.

## Sample

Solution|Author(s)
--------|---------
date-world-time.json | [Tetsuya Kawahara](https://github.com/tecchan1107) ([@techan_k](https://twitter.com/techan_k))

## Version history

Version |Date          |Comments
--------|--------------|--------
1.0     |March 3, 2023 |Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes

- To increase or decrease the number of countries displayed, edit the first argument string of the split operator on line 45. The string setting has the following notes.
    - The string should be comma-separated as `[time difference from UTC]|[name of country or region]`.
    - If you want to use spaces for the country or region name, use - (half-width hyphen). The - - (half-width hyphen) will be replaced with a half-width space and displayed on the screen. Including spaces in the string will prevent the custom card from displaying.

- The following is an example of the settings for line 45.
    ```
    "forEach": "UTC in split('-8|Seattle,-5|New-York,0|Portugal,2|Finland,5.5|India,9|Japan',',')",
    ```

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/column-samples/date-world-time" />