# Connect to SharePoint
Connect-PnPOnline -Url "Your site" -ClientId "Client Id in App registration" -Tenant "Tenant name" -DeviceLogin

# Create the List
$listName = "VinylCollection"
New-PnPList -Title $listName -Template GenericList -OnQuickLaunch

# Set list description
Set-PnPList -Identity $listName -Description "A list to catalogue vinyl records / albums."

# Add Columns
Add-PnPField -List $listName -DisplayName "Artist" -InternalName "Artist" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Label" -InternalName "Label" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Year" -InternalName "Year" -Type Number -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Genre" -InternalName "Genre" -Type Choice -AddToDefaultView `
  -Choices @("Jazz", "Rock", "Pop", "Indie", "Folk", "Hip-Hop", "Electronic", "Classical", "Country", "R&B", "Compilation")
Add-PnPField -List $listName -DisplayName "Side" -InternalName "Side" -Type Choice -AddToDefaultView `
  -Choices @("Side A", "Side B")
Add-PnPField -List $listName -DisplayName "Tracks" -InternalName "Tracks" -Type Number -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Duration Minutes" -InternalName "DurationMinutes" -Type Number -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Rating" -InternalName "Rating" -Type Text -AddToDefaultView

Write-Host "List '$listName' created successfully with all columns!" -ForegroundColor Green

# Seed the list with sample albums
# Re-declared so this block can be run on its own (e.g. selection-run in VS Code).
$listName = "VinylCollection"

$sampleAlbums = @(
  @{
    Title           = "A Night in Tunisia"
    Artist          = "Art Blakey & The Jazz Messengers"
    Label           = "Blue Note"
    Year            = 1960
    Genre           = "Jazz"
    Side            = "Side A"
    Tracks          = 4
    DurationMinutes = 37
    Rating          = "★★★★★"
  },
  @{
    Title           = "Led Zeppelin IV"
    Artist          = "Led Zeppelin"
    Label           = "Atlantic"
    Year            = 1971
    Genre           = "Rock"
    Side            = "Side A"
    Tracks          = 8
    DurationMinutes = 42
    Rating          = "★★★★★"
  },
  @{
    Title           = "For Emma, Forever Ago"
    Artist          = "Bon Iver"
    Label           = "Sub Pop"
    Year            = 2007
    Genre           = "Indie"
    Side            = "Side A"
    Tracks          = 9
    DurationMinutes = 37
    Rating          = "★★★★☆"
  },
  @{
    Title           = "After Hours"
    Artist          = "The Weeknd"
    Label           = "Republic"
    Year            = 2020
    Genre           = "Pop"
    Side            = "Side A"
    Tracks          = 14
    DurationMinutes = 56
    Rating          = "★★★★★"
  },
  @{
    Title           = "Best of the 80s"
    Artist          = "Various Artists"
    Label           = "Various"
    Year            = 1989
    Genre           = "Compilation"
    Side            = "Side A"
    Tracks          = 24
    DurationMinutes = 98
    Rating          = "★★★★☆"
  },
  @{
    Title           = "Kind of Blue"
    Artist          = "Miles Davis"
    Label           = "Columbia"
    Year            = 1959
    Genre           = "Jazz"
    Side            = "Side A"
    Tracks          = 5
    DurationMinutes = 46
    Rating          = "★★★★★"
  },
  @{
    Title           = "Random Access Memories"
    Artist          = "Daft Punk"
    Label           = "Columbia"
    Year            = 2013
    Genre           = "Electronic"
    Side            = "Side A"
    Tracks          = 13
    DurationMinutes = 74
    Rating          = "★★★★★"
  },
  @{
    Title           = "Rumours"
    Artist          = "Fleetwood Mac"
    Label           = "Warner Bros"
    Year            = 1977
    Genre           = "Rock"
    Side            = "Side A"
    Tracks          = 11
    DurationMinutes = 40
    Rating          = "★★★★★"
  }
)

foreach ($a in $sampleAlbums) {
  Add-PnPListItem -List $listName -Values $a | Out-Null
  Write-Host "  Added: $($a.Title) - $($a.Artist) ($($a.Year))" -ForegroundColor Cyan
}

Write-Host "Seeded $($sampleAlbums.Count) sample albums into '$listName'." -ForegroundColor Green
