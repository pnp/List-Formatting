# Connect to SharePoint
Connect-PnPOnline -Url "Your site" -ClientId "Client Id in App registration" -Tenant "Tenant name" -DeviceLogin

# Create the List
$listName = "MembershipCards"
New-PnPList -Title $listName -Template GenericList -OnQuickLaunch

# Set list description
Set-PnPList -Identity $listName -Description "A list to store credit / loyalty / membership card visuals (not real card data)."

# Add Columns
Add-PnPField -List $listName -DisplayName "Network" -InternalName "Network" -Type Choice -AddToDefaultView `
  -Choices @("Visa", "Mastercard", "Amex", "Bonvoy", "Les Mills", "Allpress", "Air NZ", "Membership")
Add-PnPField -List $listName -DisplayName "Tier" -InternalName "Tier" -Type Choice -AddToDefaultView `
  -Choices @("Standard", "Gold", "Platinum", "Black", "Premium")
Add-PnPField -List $listName -DisplayName "Card Number" -InternalName "CardNumber" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Card Holder" -InternalName "CardHolder" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Valid Thru" -InternalName "ValidThru" -Type Text -AddToDefaultView

Write-Host "List '$listName' created successfully with all columns!" -ForegroundColor Green

# Seed the list with sample cards
# Re-declared so this block can be run on its own (e.g. selection-run in VS Code).
$listName = "MembershipCards"

$sampleCards = @(
  @{
    Title       = "ANZ NEW ZEALAND"
    Network     = "Visa"
    Tier        = "Platinum"
    CardNumber  = "4242 8821 0496 7281"
    CardHolder  = "SUDEEP GHATAK"
    ValidThru   = "08/29"
  },
  @{
    Title       = "WORLD ELITE"
    Network     = "Mastercard"
    Tier        = "Black"
    CardNumber  = "5421 0044 2891 6072"
    CardHolder  = "A GHATAK"
    ValidThru   = "11/30"
  },
  @{
    Title       = "AMERICAN EXPRESS"
    Network     = "Amex"
    Tier        = "Premium"
    CardNumber  = "3782 822463 10005"
    CardHolder  = "S GHATAK"
    ValidThru   = "04/30"
  },
  @{
    Title       = "MARRIOTT BONVOY"
    Network     = "Bonvoy"
    Tier        = "Gold"
    CardNumber  = "MR 8821 0496 2014"
    CardHolder  = "SUDEEP GHATAK"
    ValidThru   = "02/27"
  },
  @{
    Title       = "LES MILLS AKL"
    Network     = "Les Mills"
    Tier        = "Standard"
    CardNumber  = "LM-04-882104-NZ"
    CardHolder  = "SUDEEP GHATAK"
    ValidThru   = "03/27"
  },
  @{
    Title       = "AIR NEW ZEALAND"
    Network     = "Air NZ"
    Tier        = "Gold"
    CardNumber  = "AP 4421 0996"
    CardHolder  = "SUDEEP GHATAK"
    ValidThru   = "10/28"
  },
  @{
    Title       = "ASB BANK"
    Network     = "Visa"
    Tier        = "Standard"
    CardNumber  = "4321 5588 7741 2010"
    CardHolder  = "ASHISH GHATAK"
    ValidThru   = "06/28"
  },
  @{
    Title       = "ALLPRESS REWARDS"
    Network     = "Allpress"
    Tier        = "Standard"
    CardNumber  = "AL 0042 8910"
    CardHolder  = "SUDEEP GHATAK"
    ValidThru   = "12/27"
  }
)

foreach ($c in $sampleCards) {
  Add-PnPListItem -List $listName -Values $c | Out-Null
  Write-Host "  Added: $($c.Title) - $($c.Tier) ($($c.Network))" -ForegroundColor Cyan
}

Write-Host "Seeded $($sampleCards.Count) sample cards into '$listName'." -ForegroundColor Green
