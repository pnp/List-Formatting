
param(
    [Parameter(Mandatory)]
    [String]$orgName,
	[Parameter(Mandatory)]
    [String]$adminUPN,
	[Parameter(Mandatory)]
    [String]$fileNameOfPnPTemplate
)

function Read-Choice(
   [Parameter(Mandatory)][string]$Message,
   [Parameter(Mandatory)][string[]]$Choices,
   [Parameter(Mandatory)][string]$DefaultChoice,
   [Parameter()][string]$Question='Where would you apply the PnP Template to?'
) {
    $defaultIndex = $Choices.IndexOf($DefaultChoice)
    if ($defaultIndex -lt 0) {
        throw "$DefaultChoice not found in choices"
    }

    $choiceObj = New-Object Collections.ObjectModel.Collection[Management.Automation.Host.ChoiceDescription]

    foreach($c in $Choices) {
        $choiceObj.Add((New-Object Management.Automation.Host.ChoiceDescription -ArgumentList $c))
    }

    $decision = $Host.UI.PromptForChoice($Message, $Question, $choiceObj, $defaultIndex)
    return $Choices[$decision]
}

#Connect to Tenant site
write-host "1. Connecting to "https://$orgName.sharepoint.com"..." -Foreground "Green"
$userCredential = Get-Credential -UserName $adminUPN -Message "Type the password."
Connect-PnPOnline -Url https://$orgName.sharepoint.com -Credentials $userCredential
write-host "   Complete!" -Foreground "Green"
write-host `r

$r = Read-Choice ' ' '&New site','&Existing site' '&New site'
$targetSiteUrl=''

if($r -eq '&New site'){
    #Read new site title
    $newSiteTitle = Read-Host -Prompt 'Input new site title'
	#Create new site
	write-host "2. Creating new site ["$newSiteTitle.Trim()" ]..." -Foreground "Green"
	$newSiteUrl=New-PnPSite -Type TeamSite -Title $newSiteTitle -Alias $newSiteTitle
	$targetSiteUrl = $newSiteUrl
	write-host "   Complete!" -Foreground "Green"
	write-host `r

	#Connect to new site
	write-host "3. Connecting to "$newSiteUrl"..." -Foreground "Green"
	Connect-PnPOnline -Url $newSiteUrl -Credentials $userCredential
	write-host "   Complete!" -Foreground "Green"
	write-host `r
}
else{
    #Read existing site url
    $existingSiteUrl = Read-Host -Prompt 'Input existing site url'
	$targetSiteUrl = $existingSiteUrl
	#Connect to existing site
	write-host "2. Connecting to "$existingSiteUrl"..." -Foreground "Green"
	Connect-PnPOnline -Url $existingSiteUrl -Credentials $userCredential
	write-host "   Complete!" -Foreground "Green"
	write-host `r
}

#Applying PnP Provisioning Template to target site
write-host "Finally, applying template to "$targetSiteUrl"..." -Foreground "Green"
Apply-PnPProvisioningTemplate -Path ("{0}\{1}.xml"-f $PSScriptRoot, $fileNameOfPnPTemplate)
write-host "   Complete!" -Foreground "Green"
write-host `r

write-host "All steps are done. Please use the URL below to open the [ Product Catalog ] page:" -Foreground "Green"
write-host $targetSiteUrl'/SitePages/product-catalog.aspx' -Foreground "Yellow"
write-host `r

Read-Host -Prompt "Press Enter to exit"

