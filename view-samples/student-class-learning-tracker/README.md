# Student & Class Learning Tracker

## Summary

This sample transforms your list into a learning tracker which enables teachers to 
- Mark items that have been taught in class, as _Complete_
- Place a URL to the Class Notebook
- Perform teaching reflection
  - Rate the content/time allowed/resources provided by the faculty
  - Type in any optional teaching experience reflection
- Execute other flows which may have been built for the faculty
  - **Early Intervention** flow
  - **Lodge Learning Adjustment** flow (not functional yet)
  - **Post Classwork/Homework to Student Team** flow
- View in calendar mode, so that the actual length of a topic can be reassessed for the upcoming year

![SCLT in action](./SCLT.gif)

[📺 Recording made in May 2023 (whilst the SCLT was trialled)](https://youtu.be/MJj9jWLtQQU)

## View requirements
The view format expect the following fields. All **Number** fields should have zero decimal places.

Field |Type | Choices | Allow Fill in Choice | Min/max values | Other notes
--------|---------|--------|---------|---------|---------
Title	| Single line of text	 | | 
Calendar Year | Choice | `2023`, `2024`, `2025` etc | Yes  |  | 
Year Group | Choice	| `Year 7`, `Year 8`, `Year 9` etc | No |  | 
Class	| Choice | _Class names_ , e.g. `8MAT.N`, `9MAT.B`, `11MAA.1`, `11MAX.1`, `12MAA.1`, `12MAX.1`, `12MXX.1` etc | No | N/A
Topic Number | Number	|| | `1` to `40`
Topic Name | Single line of text | | 
Topic Content Sequence | Number	| | | `0` to `100` ( `0` = Topic Content Header (yellow card), any other number = Topic Content (grey card)
Content Point Type | Choice	| `Syllabus`, `Teaching` | No | 
Senior Course | Choice | `Advanced`, `Extension 1`, `Extension 2` | No |  | Add `Standard 1` and `Standard 2` if needed
HPGE | Choice	| `Enrichment`, `Extension`, `Revision` | No | N/A
Content	| Single line of text	
Assigned To	| Person or Group	
Class Notebook URL | Multiple lines of text	
Marked Complete By | Person or Group	
Reflection |	Multiple lines of text	
Commencement Date	| Date and Time	| | | | Time not required
Completion Date | Date and Time	| | | | Time not required
Content Completed Update Log | Multiple lines of text	
Content Rating | Number	| | | `0` to `5` | 
Time Allowed Rating | Number	| | | `0` to `5` | 
Resources Rating | Number	| | | `0` to `5` | 
Approx Lessons | Number	| | | `0` to `50` | 
Weeks Expected | Number| | | `0` to `50` | 

The internal names of these fields are in the new format, e.g. they do not contain any `_x0020_` as spaces.


## Sample

Solution| Description | Author
--------|---------|---------
sclt-clendar.json | Calendar view | [Hubert Lam](https://github.com/z3019494) ([Hubert Lam](https://twitter.com/z3019494))
sclt-overview.json | Main view | [Hubert Lam](https://twitter.com/z3019494)

## Version history

Version|Date|Comments
-------|----|--------
1.0|14 July 2023|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
A Flow needs to be used in order for the program items to be entered correctly.

The Excel file(s) required, and the Flow sample will be uploaded shortly.

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/student-class-learning-tracker" />
