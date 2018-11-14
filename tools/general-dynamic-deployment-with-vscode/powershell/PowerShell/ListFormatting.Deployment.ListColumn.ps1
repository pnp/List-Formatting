<######################################>
<# Section 1.0 - SharePoint Site Collection Connection using PnP - Begin #>
<######################################>

    #region ScriptVariables

    # Update siteURL, username & password with valid values
    $siteURL = 'https://SharePointTenantName.sharepoint.com'
    $username = 'Username Goes Here'
    $password = 'Password Goes Here'

    # Update List Name
    $listName = 'Task List' # NOTE: This should use the display name of the list, not the internal name
    
    # Update List Column
    $listColumn = 'Task Status'
    
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
<# Section 2.0 - Update List Column Field Formatting Definition - Begin #>
<######################################>

# Get the raw content for the JSON Definition
$ColumnFormattingJSON = Get-Content -Raw -Path $jsonDefinitionFile;

# Update the List Column
$listColumnDefinition = Get-PnPField -List $listName -Identity $listColumn
$listColumnDefinition | Set-PnPField `
-Values @{CustomFormatter = $ColumnFormattingJSON.ToString()}

Write-Host 'The List Column Formatting Definition has been updated' -ForegroundColor Green

<######################################>
<# Section 2.0 - Update List Column Field Formatting Definition - End #>
<######################################>