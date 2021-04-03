# Title of the sample

## Summary
View formatters to buid a glossary page using connected list WebParts.

![Document Library Sample](filteregGlossary.gif)

## View requirements
List 1: Glossary Filter
----
This list will use only the default Title field. 
----
Field|Field Type|Details
-----|----------|--------
Title| Default title field|Used to store a character to be used as a filter
---
In this list we need to store all the alphabet letters from A to Z (or your country language variation of the alphabet if preferred) to be used later as filters.

List 2: Glossary Terms
----
This is the list used to store all terms and descriptions. This list will consist of 3 fields:
----
Field|Field Type|Details
-----|----------|--------
Title| Default title field|Used to store the glossary term
Description|Multiline text field, no rich text enabled|Used to store the term description)
FirstChar|Calculated| Used too show the first character of the term. This will be the key for the whole functionality). Set it to use an output of 'Single line of text' and use as the formula: =LEFT(Title,1).This will extract only the first character from the Title field and use it as the value. 

## Sample

Solution|Author(s)
--------|---------
glossary-filter.json | Michel Mendes
glossary-view.json | Michel Mendes

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 04, 2021|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
Any potential additional notes to get included in the readme around the sample with additional pictures etc.

- topic 1
- topic 2
- topic 3

<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/view-samples/readme-template" />
