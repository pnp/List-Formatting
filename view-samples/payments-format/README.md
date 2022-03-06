# Payment format 

## Summary
This sample provides a payment list format to register daily expenses, currency, status, rate option, comments and categorization of payment.
Solution has 3 formats Desktop, Mobile and Group by Category.

Format includes icon for type of payment, capability to choose currency, expand collapse to view details, payment status and payment date.

![Payment format ](./assets/PaymentsList.gif)

## View requirements
- The format expect the following fields:

Field |Type
--------|---------
Title | Single line of text 
Category | Choice - Include the following options **"PaymentCard,Bank,Savings,Money,AllCurrency,EatDrink,AirTickets,ShoppingCart,Shop"**
Payment | Number  - define number of decimal places to 2
OtherCosts | Number - this field will be used order the clipboards
Currency | Choice - Include the following options **"CHF(CHF),€(EUR)£(GBP),$(USD),¥(JPY)"**
PaymentDay | Date & Time
Paid | Yes/No - default value **"No"**
Expand | Yes/No - default value **"No"**
Categorize | Choice - "Red, Blue, Green, Orange, Purple, Yellow"
OtherCostDescription | Single line of text 
Rate | Choice - Values from 1 to 5

### Edit View requirements

- Edit View where format will be included:
   - Access to "**Sort**" Area and select column "**PaymentDay**" and check as **ascending order**, this option order the images based on changed.
   - Include in View the following additional fields "**Created**", "**Modified**" and "**Modified By**".

## Sample

Solution|Author(s)
--------|---------
payments-format.json | [André Lage](https://twitter.com/aaclage)
payments-mobile-format.json | [André Lage](https://twitter.com/aaclage)
payments-groupby-format.json | [André Lage](https://twitter.com/aaclage)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 10, 2022|Initial release


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/payments-format" />
