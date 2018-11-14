<######################################>
<# Section 1.0 - SharePoint Site Collection Connection using PnP - Begin #>
<######################################>

    #region ScriptVariables
    
    # Update siteURL, username & password with valid values
    $siteURL = 'https://SharePointTenantName.sharepoint.com'
    $username = 'Username Goes Here'
    $password = 'Password Goes Here'

    # Update Site Column
    $siteColumn = 'ColumnFormattingField01'
    
    # Update File Reference to the JSON file you would like to deploy
    $jsonDefinitionFile = '.\JSON Definitions\ListFormatting.ColumnDefinition.ColumnName.json'
    
    #endregion

    #region SP Connection
    $encpassword = convertto-securestring -String $password -AsPlainText -Force
    $cred = new-object -typename System.Management.Automation.PSCredential -argumentlist $username, $encpassword
    Connect-PnPOnline -Url $siteURL -Credentials $cred
    $context = Get-PnPContext
    #endregion SP Connection

<######################################>
<# Section 1.0 - SharePoint Site Collection Connection using PnP - End #>
<######################################>
<######################################>
<# Section 2.0 - Update Site Column Field Formatting Definition - Begin #>
<######################################>

# Get the raw content for the JSON Definition
$ColumnFormattingJSON = Get-Content -Raw -Path $jsonDefinitionFile;

# Update the Site Column
# NOTE: The '-UpdateExistingLists' flag is optional and will update all lists using this Site Column if included.
$siteColumnDefinition = Get-PnPField -Identity $siteColumn;
$siteColumnDefinition | Set-PnPField -UpdateExistingLists `
-Values @{CustomFormatter = $ColumnFormattingJSON.ToString()}

Write-Host 'The Site Column Formatting Definition has been updated' -ForegroundColor Green

<######################################>
<# Section 2.0 - Update Site Column Field Formatting Definition - End #>
<######################################>