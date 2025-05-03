# Connect to your SharePoint site
Connect-PnPOnline -Url "<Site Url>" -UseWebLogin

# Create the custom list
$listTitle = "Meal Plans"
$list = New-PnPList -Title $listTitle -Template GenericList -OnQuickLaunch

# Set the description for the list
Set-PnPList -Identity $listTitle -Description "A list to capture dietary meal or plan details."

# Add fields
Add-PnPField -List $listTitle -DisplayName "BannerImageUrl" -InternalName "BannerImageUrl" -Type "Text"
Add-PnPField -List $listTitle -DisplayName "Benefits" -InternalName "Benefits" -Type "Note"
Add-PnPField -List $listTitle -DisplayName "DietType" -InternalName "DietType" -Type "Choice" -AddToDefaultView `
    -Choices @("Keto", "Vegan", "Paleo", "Low Carb", "High Protein")
Add-PnPField -List $listTitle -DisplayName "Duration" -InternalName "Duration" -Type "Number"
Add-PnPField -List $listTitle -DisplayName "Calories" -InternalName "Calories" -Type "Number"
Add-PnPField -List $listTitle -DisplayName "PlanLink" -InternalName "PlanLink" -Type "URL"
Add-PnPField -List $listTitle -DisplayName "BackgroundColor" -InternalName "BackgroundColor" -Type "Text"
Add-PnPField -List $listTitle -DisplayName "ButtonBackgroundColor" -InternalName "ButtonBackgroundColor" -Type "Text"
Add-PnPField -List $listTitle -DisplayName "ForegroundColor" -InternalName "ForegroundColor" -Type "Text"
