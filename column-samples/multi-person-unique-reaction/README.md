# Like / Dislike - Unique reaction

## Summary
This sample demonstrates the usage of the `setValue` action and array manipulation using `removeFrom` and `appendTo` on multiple fields at the same time, by creating buttons to like/dislike an item and updating two multi person fields, one used to save the likes (people who liked), the other one to save the dislikes (people who disliked).

A user can only either like or dislike an item, if an item is liked by the current and is disliked, the like is undone and vice-versa (similar to what happens in YouTube).

![screenshot of the sample](./assets/screenshot.gif)

## View requirements

|Type|Internal Name|Required|Additional Information
|---|---|:---:|---|
|Person or Group (Multi)|Like|Yes| Apply the template [multi-person-unique-reaction.json](./multi-person-unique-reaction.json) on this field
|Person or Group (Multi)|Dislike|Yes| Apply the template [multi-person-unique-reaction-dislike.json](./multi-person-unique-reaction-dislike.json) on this field

## Sample

Solution|Author(s)
--------|---------
multi-person-unique-reaction.json | [Michel Mendes](https://github.com/michelcarlo) [(@michelcarlo)](https://twitter.com/michelcarlo)
multi-person-unique-reaction-dislike.json | [Michel Mendes](https://github.com/michelcarlo) [(@michelcarlo)](https://twitter.com/michelcarlo)

## Version history

Version |Date          |Comments
--------|--------------|--------------------------------
1.0     |November 27, 2021 |Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
##

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/column-samples/multi-person-unique-reaction" />