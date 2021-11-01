# Multi choice link row format

## Summary

Rendering multiple links with a list view format cannot be achieved by using a rich text column. This sample solves that problem (rendering multiple links) using a multi choice column.

This sample is derived from the [birthday row format](../birthday-format). This sample shows how to format a list to show sessions associated with a speaker. It features the following:
- Responsive layout through flexbox.
- Shows links to multiple sessions associated with a speaker (The sessions are stored as choices in a multi choice column).
- Use of theme color classes to ensure the format displays as intended regardless of theme (light, dark, custom, etc.)

![Multi choice link row format](./assets/screenshot.png)

## View requirements

|Type|Internal Name|Required|
|---|---|:---:|
|Single line of text|Title|Yes|
|Single line of text|JobTitle||
|Choice (allow multiple selections)|Sessions||
|Picture|Picture||

### Important requirement
The sample expects the choices in the `Sessions` column to be in the format `<Link Title>|<The actual link>|`.

For Example - if the link we want to display has the title `Learn about list formatting` and the actual link is `https://pnp.github.io/sp-dev-list-formatting` then the choice for that in the `Sessions` column should have a value of `Learn about list formatting|https://pnp.github.io/sp-dev-list-formatting|`.

Session column's choice values used in the example screenshot above:

![Example choice values](./assets/example-choice-values.png)

## Details of the sample

To display the links, we loop through the values present in the `Sessions` column of the current item and extract the `<Link title>` using this formula:
```JSON
"=substring([$sessionIterator], 0, indexOf([$sessionIterator], '|'))"
```

We then extract `<the actual link>` using this formula:
```JSON
"=substring([$sessionIterator], indexOf([$sessionIterator], '|') + 1,  lastIndexOf([$sessionIterator], '|'))"
```

## Sample

Solution|Author(s)
--------|---------
multi-choice-link-format | [Anoop Tatti](https://twitter.com/anooptells)

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 14, 2021 |Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/view-samples/multi-choice-link-format" />