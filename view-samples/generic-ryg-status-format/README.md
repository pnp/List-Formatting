# Project Indicator - RYG Status Format

## Summary - (ryg-status-viewformat.json)
Text or choice column where the value is used to determine the color. This allows for an easy visualization of status. To use a lookup column instead, replace all occurences of [$internalfieldname] with  [$internalfieldname.lookupValue].

This format uses the values Red, Yellow, Green, and Amber but you could easily extend this to fit your own color-coded system by adding or removing nested conditions.

![Color status field](./ryg-status.png)

## View requirements
The format expect the following fields:

Field |Type
--------|---------
Status | Single line of text / Choice

## Sample

Solution|Author(s)
--------|---------
title-view.json | [S Merchant](https://twitter.com/sohailmerchant)

## Version history

Version|Date|Comments
-------|----|--------
1.0|Septmeber 9, 2018|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/view-samples/generic-ryg-status-format" />