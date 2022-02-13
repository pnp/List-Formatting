# tic tac toe format

## Summary

This sample recreate the tic tac toe game using SharePoint List formatting and new feature "**setValue**" to allow Power users provide additional flexibility to their custom solutions.
There are 2 types of samples: 
- **tictactoe-click-format** allow to click directly in the position and add associated color.
- **tictactoe-board-format** provides a board where you can move position based on arrows provided by board.


![tic tac toe format](./assets/TicTacToeformat.gif)

## View requirements
- The format expect the following fields:

Field |Type
--------|---------
Title | Single line of text 
Count | Number  - default value 0
Yellow |Choice - check allow multiple selections and check "Allow 'Fill-in' choices" to yes
Red | Choice - check allow multiple selections and check "Allow 'Fill-in' choices" to yes


## Sample

Solution|Author(s)
--------|---------
tictactoe-click-format.json | [André Lage](https://twitter.com/aaclage)
tictactoe-board-format.json | [André Lage](https://twitter.com/aaclage)

## Version history

Version|Date|Comments
-------|----|--------
1.0|December 16, 2021|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
None

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/tictactoe-format" />
