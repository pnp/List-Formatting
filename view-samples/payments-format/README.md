# Payment format 

## Summary
This sample provides a payment list format to register daily expenses, currency, status, rate option, Locations, copy file link, comments and categorization of payment.
Solution has 4 formats Desktop, Mobile, Group by Category and Timeline.

Format includes icon for type of payment, capability to choose currency, expand collapse to view details, payment status and payment date.

![Payment format ](./assets/PaymentsList.gif)

## View requirements
- The format expect the following fields:

Field |Type
--------|---------
Title | Single line of text 
Description | Multiple Line of Text
Category | Choice - Include the following options **"PaymentCard,Bank,Savings,Money,AllCurrency,EatDrink,AirTickets,ShoppingCart,Shop,Home,Health"**
Payment | Number  - define number of decimal places to 2
OtherCosts | Number - this field will be used order the clipboards
Currency | Choice - Include the following options **"CHF(CHF),€(EUR)£(GBP),$(USD),¥(JPY)"**
PaymentDay | Date & Time
Paid | Yes/No - default value **"No"**
Expand | Yes/No - default value **"No"**
Categorize | Choice - "Red, Blue, Green, Orange, Purple, Yellow"
OtherCostDescription | Single line of text 
Rate | Choice - Values from 1 to 5
Location | Location - place where is made the payment
Invoice | Single line of text - Save copy link from file

- Replace `[replaceUrlPathtoLibrary]` with path to SharePoint Library, sample: '/SiteAssets/'

### Edit View requirements

- Edit View where format will be included:
   - Access to "**Sort**" Area and select column "**PaymentDay**" and check as **ascending order**, this option order the images based on changed.
   - Include in View the following additional fields "**Created**", "**Modified**" and "**Modified By**".

## Sample

Solution|Author(s)
--------|---------
payments-format.json | [André Lage](https://twitter.com/aaclage)
payments-mobile-format.json | [André Lage](https://twitter.com/aaclage)
payments-timeline-format.json | [André Lage](https://twitter.com/aaclage)
payments-groupby-format.json | [André Lage](https://twitter.com/aaclage)

## Version history

Version|Date|Comments
-------|----|--------
2.0|June 04, 2022|New features
1.0|January 10, 2022|Initial release


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/payments-format" />
