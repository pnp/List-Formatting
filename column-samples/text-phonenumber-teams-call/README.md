# Call phone number with Teams

## Summary
This sample demonstrates displaying a phone number stored in a single line of text column as a link to initiate a Microsoft Teams call.

![screenshot of the sample](./assets/screenshot.png)

## View requirements
- This format can be applied to a single line of text column

## Sample

Solution|Author(s)
--------|---------
text-phonenumber-teams-call.json | [Hagen Deike](https://github.com/samurai-ka) ([@samurai@sueden.social](https://sueden.social/@samurai))


## Version history

Version|Date|Comments
-------|----|--------
1.0|February 16, 2024|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
- Empty fields do not show a Teams icon.
- No syntax checking for phone numbers. What every you enter in the field will be used to initiate the Teams call.
- This sample uses [Microsoft Teams deep link](https://learn.microsoft.com/microsoftteams/platform/concepts/build-and-test/deep-link-workflow?tabs=teamsjs-v2#configure-deep-link-manually-to-start-audio-video-call-with-users) to display a link to initiate the Teams call.

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/column-samples/text-phonenumber-teams-call/readme" />