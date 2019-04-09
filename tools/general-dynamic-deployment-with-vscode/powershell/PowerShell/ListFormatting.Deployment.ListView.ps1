<######################################>
<# Section 1.0 - SharePoint Site Collection Connection using PnP - Begin #>
<######################################>

    #region Script Variables
    
    # Update siteURL, username & password with valid values
    $siteURL = 'https://SharePointTenantName.sharepoint.com'
    $username = 'Username Goes Here'
    $password = 'Password Goes Here'
    
    # Update List Name
    $listName = 'Task List' # NOTE: This should use the display name of the list, not the internal name
    
    # Update View name
    $viewName = 'StudentGradesView' # NOTE: This should use the display name of the view, not the internal name
    
    # Update File Reference to the JSON file you would like to deploy
    $jsonDefinitionFile = '.\JSON Definitions\ListFormatting.ViewDefinition.ViewName.json'
    
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
$listViewFormattingJSON = Get-Content -Raw -Path $jsonDefinitionFile;

# Update the List View Formatting Definition
$listViewColumnDefinition = Get-PnPView -List $listName -Identity $viewName
$listViewColumnDefinition | Set-PnPView `
-Values @{CustomFormatter = $listViewFormattingJSON.ToString()}

Write-Host 'The List View Formatting Definition has been updated' -ForegroundColor Green

<######################################>
<# Section 2.0 - Update List Column Field Formatting Definition - End #>
<######################################>