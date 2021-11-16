
[CmdletBinding()]
param(
    $tenantName,
    $siteName,
    [Parameter(Mandatory = $True, ParameterSetName = "Certificate")]
    $appId,
    [Parameter(Mandatory = $True, ParameterSetName = "Certificate")]
    $secureFilePath,
    [Parameter(Mandatory = $True, ParameterSetName = "Certificate")]
    [Security.SecureString] $pfxPassword,
    [Parameter(Mandatory = $True, ParameterSetName = "Certificate")]
    $tenantId,
    [Parameter(Mandatory = $True, ParameterSetName = "User")]
    $userName,
    [Parameter(Mandatory = $True, ParameterSetName = "User")]
    [Security.SecureString] $userPassword,
    $folderPath
)

function Set-ListFormatting {
    [CmdletBinding()]
    param (
        [Parameter()]
        [string]
        $listName,
        [string]
        $folderPath
    )
    if (Test-Path -Path $folderPath){

        Write-Host "LIST $listName "
        $clientContext = Get-PnPContext
        $list = Get-PnPList $listName

        #Get Content Type
        $contentType = Get-PnPContentType -List $listName | Where-Object { $_.Name -eq "Item" -or $_.Name -eq "Element" }
        $clientContext.Load($contentType)
        $clientContext.Load($contentType.FieldLinks)
        $clientContext.ExecuteQuery()

        # 1. Set form customizers
        if ($t=Test-Path -Path "$folderPath\ListFormatting.Form.$listName.json" -PathType leaf){
            Write-Host "Setting form customizers from $folderPath\ListFormatting.Form.$listName.json"
            $contentType.ClientFormCustomFormatter = (Get-Content -Raw -Path "$folderPath\ListFormatting.Form.$listName.json").ToString()
        }
        # 2.a Set fieldLinks order
        if ($t=Test-Path -Path "$folderPath\ListFormatting.ColumnOrder.$listName.csv" -PathType leaf) {
            Write-Host "Setting fields order from $folderPath\ListFormatting.ColumnOrder.$listName.csv"

            $ColumnOrder = (Import-Csv "$folderPath\ListFormatting.ColumnOrder.$listName.csv").Name
            $contentType.FieldLinks.Reorder($ColumnOrder)
        }
        # 2.b Set fieldLinks.Hidden 
        if ($t = Test-Path -Path "$folderPath\ListFormatting.ColumnOrder.$listName.csv" -PathType leaf) {
            Write-Host "Setting hidden fields from $folderPath\ListFormatting.ColumnOrder.$listName.csv"
            
            Import-Csv "$folderPath\ListFormatting.ColumnOrder.$listName.csv" | ForEach-Object{
                $contentType.FieldLinks.GetById($_.Id).Hidden = [System.Convert]::ToBoolean($_.Hidden)
            }
        }
        $contentType.Update(0)
        $clientContext.ExecuteQuery()

        # 3. Set list views
        if ($t = Test-Path -Path  "$folderPath\List.Views.$listName.csv" -PathType leaf) {
            Write-Host "Setting views"
            
            #Get All List Views 
            $clientContext.Load($list.Views)
            $clientContext.ExecuteQuery()
            $listUrl=$list.RootFolder.ServerRelativeUrl+"/"
            $views = $list.Views | Select-Object Title, @{name = "Url"; expression = { $_.ServerRelativeUrl.Replace($listUrl, "").Replace(".aspx", "")}}

            Import-Csv "$folderPath\List.Views.$listName.csv" | ForEach-Object {

                $xml = [xml]( Get-Content "$folderPath\List.View.$listName.$($_.Id).xml" -Raw)
                $isDefault = [boolean]$xml.View.DefaultView
                $fields =  $xml.View.ViewFields.FieldRef.Name 
                $query = $xml.View.Query.InnerXml
                $aggregations = $xml.View.Aggregations.InnerXml
                $viewType2 = $xml.View.ViewType2

                $url = $_.Url
                $viewTitle = ($views | Where-Object { $_.Url -eq $url } ).Title

                if($null -ne $viewTitle){
                    Write-Host "Updating view $viewTitle to $($_.Title)"
                    $v = Set-PnPView -List $listName -Identity $viewTitle -Fields $fields -Values @{Title = $_.Title; ViewQuery = $query; ViewType2 = $viewType2 } -Aggregations $aggregations
                }
                else{
                    Write-Host "Creating view $($_.Title)"
                    #cannot set view url when creating the list. the following workaroud required
                    $v = Add-PnPView -List $listName -Title $_.Url  -SetAsDefault:$isDefault -Fields $fields -Query $query -Aggregations $aggregations
                    $v = Set-PnPView -List $listName -Identity $_.Url -Values @{Title = $_.Title ; ViewType2 = $viewType2} 
                }
            }
        }

        #Set list views formatting
        if ($t=Test-Path -Path "$folderPath\ListFormatting.Views.$listName.csv" -PathType leaf){
            Write-Host "Setting  list views formatting"

            #Get All List Views 
            $clientContext.Load($list.Views)
            $clientContext.ExecuteQuery()
            $views = $list.Views.Title

            #Get exported Views Info (Title & Id)
            Import-Csv "$folderPath\ListFormatting.Views.$listName.csv" | ForEach-Object{
                #If target list contains the view and the file exists
                if ($views.Contains($_.Title) ) {
                    # Update the List View Formatting Definition
                    $listViewFormattingJSON = Get-Content -Raw -Path "$folderPath\ListFormatting.View.$listName.$($_.Id).json";
                    $listViewColumnDefinition = Get-PnPView -List $listName -Identity $_.Title  
                    $listViewColumnDefinition | Set-PnPView -Values  @{CustomFormatter = $listViewFormattingJSON.ToString() }
                }
            }
        }
        #Set columns formatting
        if ($t=Test-Path -Path "$folderPath\ListFormatting.Columns.$listName.csv" -PathType leaf) {
            Write-Host "Setting columns formatting"

            #Get All List Columns
            $clientContext.Load($list.Fields)
            $clientContext.ExecuteQuery()
            $columns = $list.Fields.InternalName

            Import-Csv "$folderPath\ListFormatting.Columns.$listName.csv"  | ForEach-Object { #$columns.Contains($_.InternalName)
                if ($columns.Contains($_.InternalName)){
                    Write-Host "Setting formatter for $($_.InternalName)"
                    $ColumnFormattingJSON = Get-Content -Raw -Path "$folderPath\ListFormatting.Column.$listName.$($_.InternalName).json";
                    $listColumnDefinition = Get-PnPField -List $listName -Identity $_.InternalName
                    $listColumnDefinition | Set-PnPField -Values @{CustomFormatter = $ColumnFormattingJSON.ToString() }
                }
            }
        }
        
    }
}

$siteUrl = "https://$tenantName.sharepoint.com/sites/$siteName"
Install-Module PnP.PowerShell -Scope "CurrentUser" -Verbose -AllowClobber -Force

switch ($PSCmdlet.ParameterSetName) {
    "Certificate" {  
        Connect-PnPOnline -ClientId $appId -CertificatePath $secureFilePath -CertificatePassword $pfxPassword -Url $siteUrl -Tenant $tenantId
        Write-Host "Signed in to $siteUrl"
    }
    "User" {  
        [System.Management.Automation.PSCredential]$PSCredentials = New-Object System.Management.Automation.PSCredential($userName, $userPassword)
        Connect-PnPOnline -Credentials $PSCredentials -Url $siteUrl 
        Write-Host "Signed in to $siteUrl"
    }
}

# Example use
Set-ListFormatting -folderPath $folderPath -listName "List1"
Set-ListFormatting -folderPath $folderPath -listName "List2"
