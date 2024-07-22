# Flightcard

## Summary

This example transforms list items into cards formatted with flight information layouts. To ensure the view functions correctly, make sure all specified columns are included. The icons are referenced from Office UI Fabric library (https://uifabricicons.azurewebsites.net/)

![screenshot of the sample](./assets/screenshot.png)

## View requirements

Column Name                 | Type
----------------------------|-----------------------------------------
Title                       | Single line of text
From                        | Single line of text
To                          | Single line of text
SourceTime                  | Date and Time
DestinationTime             | Date and Time
Source Airport              | Single line of text
Destination Airport         | Single line of text
SourceTerminal              | Single line of text
DestinationTerminal         | Single line of text
Airline                     | Single line of text
FlightNo                    | Single line of text
Carrier                     | Single line of text
Class                       | Choice (Economy,Business,Premium Economy)
Currency                    | Single line of text
Price                       | Single line of text
PriceLabel                  | Single line of text
SourceCode                  | Single line of text
DestinationCode             | Single line of text
SourceTimeOnly              | Calculated (`=TEXT([SourceTime],"HH:mm")`) (Single line of text)
DestinationTimeOnly         | Calculated (`=TEXT([DestinationTime],"dd mmm")`) (Single line of text)
FormattedSourceDate         | Calculated (`=TEXT([SourceTime],"HH:mm")`) (Single line of text)
FormattedDestinationDate    | Calculated (`=TEXT([DestinationTime],"dd mmm")`) (Single line of text)




## Sample

Solution|Author
--------|---------
flight1.json | [Sudeep Ghatak](https://www.linkedin.com/in/sudeepghatak/) 

## Version history

Version|Date|Comments
-------|----|--------
1.0|July 5, 2024|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---


