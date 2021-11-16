# List formatting export/import 
The [Export-SPOListFormatting.ps1](tools/formatter-exportimport/Export-SPOListFormatting.ps1) and [Apply-SPOListFormatting.ps1](tools/formatter-exportimport/Apply-SPOListFormatting.ps1) scripts support automated process of exporting existing list customizations and applying them to SPO lists in downstream environments. 

The Export-SPOListFormatting.ps1 allows exporting of SPO list configuration: 
- form customizers
- list views
- list view formatting 
- columns formatting 

## Authentication
The [Export-SPOListFormatting.ps1](tools/formatter-exportimport/Export-SPOListFormatting.ps1) and [Apply-SPOListFormatting.ps1](tools/formatter-exportimport/Apply-SPOListFormatting.ps1) scripts are using `Connect-PnPOnline` to authenticate to SPO site. 

Both, app registration, and user account are supported. 

## Current limitations
The script currently only exports settings for Item content type. It can be easily updated to evaluate all existing content types in the list.


## List  customizers
Although the user interface for managing list, column and view formatting is fairly new, the SharePoint capabilities supporting it are not. 
 
Manual steps for **customizing forms** are described in [Show or hide columns in a list or library form](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/list-form-conditional-show-hide) and [Configure the list form](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/list-form-configuration) articles. 
The form customizations and column order and visibility are defined in `$contentType.ClientFormCustomFormatter` and  `$contentType.FieldLinks`, respectively.

**List view formatting**, described in [Use view formatting to customize SharePoint](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/view-formatting), is defined in `$view.CustomFormatter`. 

**Columns formatting**, described in [Use column formatting to customize SharePoint](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/column-formatting) is defined in... yes, correct ;), `$column.CustomFormatter`

## Azure Pipelines
To reuse the exported definitions in Azure Pipelines, they are saved in *.json or *.csv formats to the repo. 

### Example export pipeline
```
# vmImage: 'ubuntu-latest'

steps:
- checkout: self
    persistCredentials: true
- task: powershell@2
    name: exportListCustomizers
    inputs:
    filePath: $(Build.SourcesDirectory)/Pipelines/scripts/Export-SPOListFormatting.ps1
    arguments: '-tenantName ''$(Az_TenantName)'' -siteName ''$(SPO_SiteName)'' -userName ''$(SvcAcct-Name)'' -userPassword (ConvertTo-SecureString -AsPlainText $(SvcAcct-Pswd) -Force) -folderPath ''$(Build.SourcesDirectory)/Pipelines/scripts/templates'' '
    displayName: Export list customizers   
- script: |
    git config --global user.email $BUILD_REQUESTEDFOREMAIL
    git config --global user.name "$BUILD_REQUESTEDFOR"
    ECHO "CHECK GIT STATUS..."
    git status
    git add $(Build.SourcesDirectory)/Pipelines/scripts/templates
    git commit -m "List customizers exported from (Environment) environment  [skip ci]"
    git push  origin HEAD:$(Build.SourceBranch)
    displayName: Commit generated files to repo
```
### Example import pipeline
```
# vmImage: 'ubuntu-latest'
steps:
- checkout: none
- download: current
    artifact: drop
- task: powershell@2
    name: setSPOListsFormatting
    inputs:
    filePath: $(Pipeline.Workspace)/drop/scripts/Apply-SPOListFormatting.ps1
    arguments: '-tenantName ''$(Az_TenantName)'' -siteName ''$(SPO_SiteName)'' -userName ''$(SPO-SvcAcct-Name)'' -userPassword (ConvertTo-SecureString -AsPlainText $(SPO-SvcAcct-Pswd) -Force) -folderPath ''$(Pipeline.Workspace)/drop/scripts/templates'' '
    displayName:  Set List Formatting
```
