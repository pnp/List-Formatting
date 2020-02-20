Connect-PnPOnline https://thechriskent.sharepoint.com/sites/WarriorHorses

$titles = @("Horse Mine","Lazer Shark","Submarine","Sea Horse","Murder Eel","Horsepedo",
            "Plankton of Doom","Fake Reef","Turtle Friend","Surfing Horse Hitman",
            "Horse Carrier","Battleship","Sea Stable","Hammerhead Horse","Death Dolphin",
            "Scuba Pony")

$count = 0
while($count -lt 300) {

    Add-PnPListItem -List "Aquatic Assets" -Values @{
        "Title" = ((Get-Random $titles) + " " + (Get-Random -Minimum 1 -Maximum 2500));
        "Deployed" = ((Get-Date).AddDays((Get-Random -Minimum -1000 -Maximum 0)));
        "Active" = (&{If((Get-Random -Maximum 2) -eq 0){$false}else{$true}})}

    $count++
}

Disconnect-PnPOnline