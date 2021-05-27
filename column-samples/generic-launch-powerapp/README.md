# Launch Power App Button

## Summary
Providing a direct link to an item within Power Apps is easy to do using this sample. To use it follow the instructions below to get the link to your Power App (and replace that portion of the format).

![screenshot of the sample](./screenshot.png)


#### To obtain the link to your Power App

1. Login to [Power Apps](https://make.powerapps.com)
2. In your list of Apps, using the 3 dot context menu choose Details
3. Right-click on the Web link and choose Copy 
![Copy Link in Power Apps](./CopyPALink.png)
4. Replace the first part of the `href` value in the format (up to the `&hidenavbar` portion)

### Handling the itemId in your Power App

Deep linking in Power Apps is beyond the scope of this sample, but here's an example of how it might be handled in the `OnStart` event of the App:

```
If(!IsBlank(Param("itemId")) && IsNumeric(Param("itemId")),
    Set(BattleItem, LookUp(Battles,ID=Value(Param("itemId"))));
    Navigate(scrSpoilz,ScreenTransition.None)
)
```

## View requirements
- This format can be applied to any column type (its value is ignored)

> Tip - You can apply these formats to a Calculated Column with a formula of `=""`. This prevents the fields from being part of your edit/new forms.

## Sample

Solution|Author(s)
--------|---------
generic-launch-powerapp.json | [Chris Kent](https://twitter.com/thechriskent)

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 27, 2021|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes

None


<img src="https://telemetry.sharepointpnp.com/sp-dev-list-formatting/column-samples/generic-launch-powerapp" />
