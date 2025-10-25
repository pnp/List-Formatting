# Rating in Tiles

## Summary

This sample demonstrates how to create a clickable rating experience in the view Tile mode. It allows users to rate the item/document when in the tile mode. 

![screenshot of the sample](./assets/screenshot.gif)

## View requirements

### Create a list using the template Recipe Tracker
![screenshot of create list](./assets/create-list.png)

### Enabling the ratings feature (Only communication site)
The ratings feature is available by default in the team site, but not in the communication site. If you want to use the ratings feature in the list of communication sites, you need to enable the feature GUID `915c240e-a6cc-49b8-8b2c-0bff8b553ed3`. The following is an example of how to enable it using [PnP PowerShell](https://pnp.github.io/powershell).

``` powershell
$targetURL = "https://<tenent name>.sharepoint.com/sites/<site name>"
Connect-PnPOnline -Url $targetURL -Interactive
Enable-PnPFeature –identity 915c240e-a6cc-49b8-8b2c-0bff8b553ed3 -Scope site
Disconnect-PnPOnline
```

### Add a ratings feature to the list
1. Click **gear icon**
2. Click **List Settings**
3. Under **General Settings**, click **Rating Settings**.

   ![screenshot of how to add the ratings feature](./assets/set-listsettings-rating-1.png)

4. Under **Rating Settings**, click **Yes**.
5. Under **Which voting/rating experience you would like to enable for this list?**, click **Rating**.
6. Click **OK**.

   ![screenshot of how to add the ratings feature](./assets/set-listsettings-rating-2.png)

### Adding rating fields to the default view
The following is an example of how to add the rating related fields to the default view using [PnP PowerShell](https://pnp.github.io/powershell).

``` powershell
$targetURL = "https://<tenant name>.sharepoint.com/sites/<site name>"
$listName = "<list title>" # Recipe Tracker

Connect-PnPOnline -Url $targetURL -Interactive

$list = Get-PnPList -Identity $listName
$list.DefaultView.ViewFields.Add("RatingCount")
$list.DefaultView.ViewFields.Add("Ratings")
$list.DefaultView.ViewFields.Add("RatedBy")
$list.DefaultView.Update()
Invoke-PnPQuery
```
After this the default view should look like:
 ![screenshot list view columns](./assets/view-columns.png)


## Sample

Solution|Author(s)
--------|---------
rating-in-tiles.json | [Luís Ribeiro](https://github.com/luis-ribeiro)

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 22, 2023|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Additional notes
None

<img src="https://pnptelemetry.azurewebsites.net/list-formatting/view-samples/rating-in-tiles" />
