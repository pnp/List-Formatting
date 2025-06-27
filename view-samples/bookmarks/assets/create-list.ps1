# Prompt user for site URL
$siteUrl = Read-Host -Prompt "Enter your site url (e.g https://CONTOSO.sharepoint.com/sites/SITE_NAME)"

# Connect to the site
Connect-PnPOnline $siteUrl -interactive -ClientId YOUR_CLIENT_ID

# Prompt user for list name
$newListName = Read-Host -Prompt "Enter new list name (e.g Bookmarks)"

# Create a new list
New-PnPList -Title $newListName -Template GenericList -OnQuickLaunch

# Add columns to the list
Add-PnPField -List $newListName -InternalName "Link"     -DisplayName "Link"     -Type "URL"    -AddToDefaultView
Add-PnPField -List $newListName -InternalName "Category" -DisplayName "Category" -Type "Choice" -AddToDefaultView `
    -Choices @("News", "OneDrive", "SharePoint", "Teams")

Disconnect-PnPOnline