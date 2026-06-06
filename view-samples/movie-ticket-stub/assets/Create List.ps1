# Connect to SharePoint
Connect-PnPOnline -Url "Your site" -ClientId "Client Id in App registration" -Tenant "Tenant name" -DeviceLogin

# Create the List
$listName = "MovieTickets"
New-PnPList -Title $listName -Template GenericList -OnQuickLaunch

# Set list description
Set-PnPList -Identity $listName -Description "A list to store movie ticket stub details."

# Add Columns
Add-PnPField -List $listName -DisplayName "Cinema" -InternalName "Cinema" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Auditorium" -InternalName "Auditorium" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Format" -InternalName "Format" -Type Choice -AddToDefaultView `
  -Choices @("Standard", "IMAX", "3D", "Dolby Atmos", "Recliner", "4DX")
Add-PnPField -List $listName -DisplayName "Rating" -InternalName "Rating" -Type Choice -AddToDefaultView `
  -Choices @("G", "PG", "M", "R13", "R16", "R18")
Add-PnPField -List $listName -DisplayName "Runtime" -InternalName "Runtime" -Type Number -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Show Date" -InternalName "ShowDate" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Show Time" -InternalName "ShowTime" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Row" -InternalName "Row" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Seat" -InternalName "Seat" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Booking Ref" -InternalName "BookingRef" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Ticket Number" -InternalName "TicketNumber" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Price" -InternalName "Price" -Type Number -AddToDefaultView

Write-Host "List '$listName' created successfully with all columns!" -ForegroundColor Green

# Seed the list with sample tickets
# Re-declared here so this block can be run on its own (e.g. selection-run in VS Code)
# without d