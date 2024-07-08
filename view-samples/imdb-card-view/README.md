# Flashcards

## Summary

This example transforms list items into cards formatted with IMDB Movie listing layout. To ensure the view functions correctly, make sure all specified columns are included. The icons are referenced from Office UI Fabric library (https://uifabricicons.azurewebsites.net/)

The Director and Actor names are hyperlinks so that you can leverage them to filter other movies where they might have featured. You can achieve that by using query strings as described in [this blog](https://sudeepghatak.com/using-hyperlinks-in-list-view-json-to-apply-filters/)

![screenshot of the sample](./assets/screenshot.jpg)

## View requirements

Column Name                 | Type
----------------------------|-----------------------------------------
Title                       | Single line of text
Year                        | Single line of text
Duration                    | Single line of text
Rating                      | Choice
VoteCount                   | Single line of text
Metascore                   | Single line of text
Plot                        | Multiple lines of text
Director                    | Single line of text
Actor1                      | Single line of text
Actor2                      | Single line of text
Actor3                      | Single line of text
MovieImage                  | Hyperlink or Picture



## Sample

Solution|Author
--------|---------
property.json | [Sudeep Ghatak](https://www.linkedin.com/in/sudeepghatak/) 

## Version history

Version|Date|Comments
-------|----|--------
1.0|July 8, 2024|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---


