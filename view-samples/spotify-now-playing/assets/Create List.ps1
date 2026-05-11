# Connect to SharePoint
#Connect-PnPOnline -Url "Your site" -ClientId "Client Id in App registration" -Tenant "Tenant name" -DeviceLogin

# Create the List
$listName = "NowPlaying"
New-PnPList -Title $listName -Template GenericList -OnQuickLaunch

# Set list description
Set-PnPList -Identity $listName -Description "Spotify-style now-playing tracks rendered with the spotify-now-playing view formatter."

# Add Columns
Add-PnPField -List $listName -DisplayName "Artist" -InternalName "Artist" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Album" -InternalName "Album" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Status" -InternalName "Status" -Type Choice -AddToDefaultView `
  -Choices @("Now Playing", "Paused", "Liked Song", "Podcast", "Recently Played", "Workout")
Add-PnPField -List $listName -DisplayName "Background Color" -InternalName "BackgroundColor" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Accent Color" -InternalName "AccentColor" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Elapsed Time" -InternalName "ElapsedTime" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Duration Time" -InternalName "DurationTime" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Progress Percent" -InternalName "ProgressPercent" -Type Number -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Play Icon" -InternalName "PlayIcon" -Type Text -AddToDefaultView
Add-PnPField -List $listName -DisplayName "Like Icon" -InternalName "LikeIcon" -Type Text -AddToDefaultView

Write-Host "List '$listName' created successfully with all columns!" -ForegroundColor Green

# Seed the list with sample tracks
# Re-declared so this block can be run on its own (e.g. selection-run in VS Code).
$listName = "NowPlaying"

$sampleTracks = @(
  @{
    Title           = "Blue in Green"
    Artist          = "Miles Davis"
    Album           = "Kind of Blue - 1959"
    Status          = "Now Playing"
    BackgroundColor = "#0e3a73"
    AccentColor     = "#1ed760"
    ElapsedTime     = "2:14"
    DurationTime    = "5:27"
    ProgressPercent = 42
    PlayIcon        = "Pause"
    LikeIcon        = "Heart"
  },
  @{
    Title           = "Bohemian Rhapsody"
    Artist          = "Queen"
    Album           = "A Night at the Opera - 1975"
    Status          = "Paused"
    BackgroundColor = "#2a2a35"
    AccentColor     = "#b8b8b8"
    ElapsedTime     = "3:45"
    DurationTime    = "5:55"
    ProgressPercent = 64
    PlayIcon        = "Play"
    LikeIcon        = "Heart"
  },
  @{
    Title           = "Blinding Lights"
    Artist          = "The Weeknd"
    Album           = "After Hours - 2020"
    Status          = "Liked Song"
    BackgroundColor = "#6b1ebf"
    AccentColor     = "#ff2db5"
    ElapsedTime     = "0:54"
    DurationTime    = "3:20"
    ProgressPercent = 27
    PlayIcon        = "Pause"
    LikeIcon        = "HeartFill"
  },
  @{
    Title           = "The future of Power Platform"
    Artist          = "Microsoft Mechanics"
    Album           = "Podcast - Episode 412 - 42 min"
    Status          = "Podcast"
    BackgroundColor = "#3a2418"
    AccentColor     = "#ffa500"
    ElapsedTime     = "18:42"
    DurationTime    = "42:18"
    ProgressPercent = 44
    PlayIcon        = "Pause"
    LikeIcon        = "Heart"
  },
  @{
    Title           = "Stairway to Heaven"
    Artist          = "Led Zeppelin"
    Album           = "Led Zeppelin IV - 1971"
    Status          = "Recently Played"
    BackgroundColor = "#1a1a2e"
    AccentColor     = "#4a90e2"
    ElapsedTime     = "8:02"
    DurationTime    = "8:02"
    ProgressPercent = 100
    PlayIcon        = "Play"
    LikeIcon        = "Heart"
  },
  @{
    Title           = "Eye of the Tiger"
    Artist          = "Survivor"
    Album           = "152 BPM - Pop Rock - 1982"
    Status          = "Workout"
    BackgroundColor = "#c0392b"
    AccentColor     = "#ff5e3a"
    ElapsedTime     = "1:12"
    DurationTime    = "4:04"
    ProgressPercent = 30
    PlayIcon        = "Pause"
    LikeIcon        = "HeartFill"
  }
)

foreach ($t in $sampleTracks) {
  Add-PnPListItem -List $listName -Values $t | Out-Null
  Write-Host "  Added: $($t.Title) - $($t.Artist) [$($t.Status)]" -ForegroundColor Cyan
}

Write-Host "Seeded $($sampleTracks.Count) sample tracks into '$listName'." -ForegroundColor Green
