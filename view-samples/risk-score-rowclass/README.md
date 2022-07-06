# Risk Score Indicator

## Summary
A number column is evaluated against tiers of values to provide colors corresponding to score ranges. 

![screenshot of the sample](./assets/screenshot.png)

A number column is evaluated against tiers of values to provide colors corresponding to score ranges. This format provides 4 ranges:

|Range|Color|
|---|---|
|value >= 16|Red|
|16 > value >= 12|OrangeLighter|
|12 > value >= 8|Yellow|
|value < 8|Green|

You can easily adjust the values/colors to provide your own ranges. You can also add or remove nested conditions to increase or decrease the number of ranges needed.

## View requirements
The format expects the following fields:

Field |Type
--------|---------
Score | Number

## Sample

Solution|Author(s)
--------|---------
risk-score-rowclass.json | [S Merchant](https://github.com/sohailmerchant) ([@sohailmerchant](https://twitter.com/sohailmerchant))

## Version history

Version|Date|Comments
-------|----|--------
1.0|Septmeber 9, 2018|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/risk-score-rowclass" />