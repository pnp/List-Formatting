# Shopping Cart

## Summary

The JSON template is designed for an online shopping cart. It displays items within the cart, including product details, pricing, shipping information, and user interactions like adding or removing items.

Clicking on 'Add to Cart' updates the 'AddedToCart' field to true and changes the display text to 'Remove from Cart'

![screenshot of the sample](./assets/screenshot.png)

## View requirements

Column Name               | Type
--------------------------|----------------------------------------
Title                     | Single line of text
Description               | Multiple lines of text
Price                     | Currency (Number of decimal places=2)
OldPrice                  | Currency
ImageUrl                  | Single line of text
Offer                     | Single line of text
CalculatedPrice           | Calculated (calculation based on other columns)(Formula = `=ROUND(Price,2)`) (Type = 'Single line of text')
PriceDifference           | Calculated (calculation based on other columns)(Formula = `=OldPrice-Price`) (Type = 'Single line of text')
Rating                    | Number
DollarValue               | Calculated (calculation based on other columns)(Formula = `=INT(Price)`) (Type = 'Single line of text')
CentsValue                | Calculated (calculation based on other columns)(Formula = `=TEXT(ROUND((Price-INT(Price))*100,0),"00")`)(Type = 'Single line of text')
QuantitySold              | Number
AddedToCart               | Yes/No
Shipping                  | Currency




## Sample

Solution|Author
--------|---------
shopping-cart.json | [Sudeep Ghatak](https://github.com/sudeepghatak) ([LinkedIn](https://www.linkedin.com/in/sudeepghatak/))

## Version history

Version|Date|Comments
-------|----|--------
1.0|August 20, 2024|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes

None


