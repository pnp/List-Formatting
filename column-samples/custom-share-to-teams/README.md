# Custom Share to Teams

## Summary
Sometimes you might need a more specialised "Share to Teams" option - this one allows for sharing a short synopsis & URL!

![picture of the format in action](./assets/custom-share-to-teams.gif)

## View requirements
- Sample is applied to a calculated column type (formula `=""`)

Column Name|Type|Notes
--------|---------|--------
ShareMessage|Text|Limit to 200 characters
URL|Multiple lines of text|Link will only parse 1 parameter, any more will be assumed to be part of the request to Teams

- Instead of the extra columns, you could hardcode the share url by replacing the `[$ShareMessage]` and `[$URL]` content in the attached format


## Sample

Solution|Author(s)
--------|---------
custom-share-to-teams.json | [Bianca W](https://github.com/bianca-w)


## Version history

Version|Date|Comments
-------|----|--------
1.0|October 15, 2023|Initial release

## Additional notes

This solution was originally designed to be part of a bigger view, and has been re-designed for sharing with the community.


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/List-Formattings/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=custom-share-to-teams&authors=@bianca-w&title=custom-share-to-teams%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/List-Formattings/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=custom-share-to-teams&authors=@bianca-w&title=custom-share-to-teams%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/List-Formattings/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=custom-share-to-teams&authors=@bianca-w&title=custom-share-to-teams%20-%20).

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/column-samples/custom-share-to-teams" />