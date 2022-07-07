# ISBN to Book Cover Image

## Summary
This example retrieves book cover images based on their ISBN numbers by utilizing the [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers). The API works by building a cover image URL with the ISBN.

This sample retrieves the small (S) image, but there are also medium (M) and large (L) sizes available. Simply swap out the `S` in `-S.jpg` portion of the `src` attribute in the `img` element to retrieve one of the other sizes. 

![screenshot of the sample](./assets/screenshot.png)

> The values are expected to be the ISBN numbers for the books. However, this sample could easily be switched to utilize the OCLC, LCCN, OLID, or ID values for a given book.

## View requirements
- This format can be applied to a text/choice column and expects the values to be ISBN numbers corresponding to books

## Sample

Solution|Author(s)
--------|---------
text-isbn-image.json | [Aaron Miao](https://github.com/aaronmi)

## Version history

Version|Date|Comments
-------|----|--------
1.0|November 27, 2017|Initial release
1.1|March 22, 2018|Added details about API
1.2|August 20, 2018|Switched to Excel-style expression

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
This sample can be applied to render, for example, product number to product icon/image.

> An additional version using Abstract Tree Syntax (AST) is also provided for environments where the Excel-style expressions are not supported.

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/column-samples/text-isbn-image" />
