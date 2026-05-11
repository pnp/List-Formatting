# Connect to SharePoint
Connect-PnPOnline -Url "https://sudeepghatakdemos.sharepoint.com/sites/ashishghatak" -ClientId "8ea8bc4f-15fa-477f-8d17-27821e8be665" -Tenant "sudeepghatakdemos.onmicrosoft.com" -DeviceLogin

# Create the List
$listName = "BoardingPasses"
New-PnPList -Title $listName -Template GenericList -OnQuickLaunch

# Set list description
Set-PnPList -Identity $listName -Description "A list to store flight boarding pass details."

# Add Columns
Add-PnPField -List $listName -DisplayName "Airline" -InternalName "Airline" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Travel Class" -InternalName "TravelClass" -Type Choice -AddToDefaultView `
  -Choices @("Economy Class", "Business Class", "First Class")
Add-PnPField -List $listName -DisplayName "Flight Number" -InternalName "FlightNumber" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Departure Code" -InternalName "DepartureCode" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Departure City" -InternalName "DepartureCity" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Arrival Code" -InternalName "ArrivalCode" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Arrival City" -InternalName "ArrivalCity" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Flight Date" -InternalName "FlightDate" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Boarding Time" -InternalName "BoardingTime" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Seat" -InternalName "Seat" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Boarding Group" -InternalName "BoardingGroup" -Type Number -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Terminal" -InternalName "Terminal" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Gate" -InternalName "Gate" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Issued From" -InternalName "IssuedFrom" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Booking Reference" -InternalName "BookingRef" -Type Text -AddToDefaultView

Write-Host "List '$listName' created successfully with all columns!" -ForegroundColor Green
