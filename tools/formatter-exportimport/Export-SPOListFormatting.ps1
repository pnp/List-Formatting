
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
    $folderPath)


function Export-ListFormatting {
    [CmdletBinding()]
    param (
        [Parameter()]
        [string]
        $listName,
        [string]
        $folderPath
    )

    $clientContext = Get-PnPContext
    $list = Get-PnPList $listName -Includes SchemaXml

    $contentType = Get-PnPContentType -List $listName | Where-Object { $_.Name -eq "Item" -or $_.Name -eq "Element" }
    $clientContext.Load($list.Views)
    $clientContext.Load($contentType)
    $clientContext.Load($contentType.FieldLinks)
    $clientContext.ExecuteQuery()
    
    # 1. Get form customizer
    $ct.ClientFormCustomFormatter | Out-File "$folderPath\ListFormatting.Form.$listName.json"
    # 2.Get fieldLinks settings
    $ct.FieldLinks | Select-Object Name, Hidden, Id |  Export-Csv  "$folderPath\ListFormatting.ColumnOrder.$listName.csv" -NoTypeInformation

    # 3. Get list views 
    $listUrl=$list.RootFolder.ServerRelativeUrl+"/"
    $list.Views | Where-Object { $_.PersonalView -eq $false } | Select-Object Title, Id, @{name = "Url"; expression = { $_.ServerRelativeUrl.Replace($listUrl,"").Replace(".aspx","") } } | Export-Csv  "$folderPath\List.Views.$listName.csv" -NoTypeInformation
    $list.Views | ForEach-Object {
        $v = Get-PnPView -List $list -Identity $_.Id -Includes HtmlSchemaXml 
        $v.HtmlSchemaXml |  Out-File "$folderPath\List.View.$listName.$($_.Id).xml"
    }

    #get list views formatting
    $views = $list.Views | Where-Object { $null -ne $_.CustomFormatter } 
    if($null -ne $views){
        $views | Select-Object Title, Id | Export-Csv  "$folderPath\ListFormatting.Views.$listName.csv" -NoTypeInformation
        $views | ForEach-Object {
            $_.CustomFormatter | Out-File "$folderPath\ListFormatting.View.$listName.$($_.Id).json"
        }
    }

    #get columns formatting
    $columns= Get-PnPField -List $listName | Where-Object {$null -ne $_.CustomFormatter } 
    if($null -ne $columns){
        $columns | Select-Object InternalName | Export-Csv   "$folderPath\ListFormatting.Columns.$listName.csv" -NoTypeInformation
        $columns | ForEach-Object {
            $_.CustomFormatter | Out-File "$folderPath\ListFormatting.Column.$listName.$($_.InternalName).json"
        }
    }
}
    
$siteUrl = "https://$tenantName.sharepoint.com/sites/$siteName"
Write-Host $siteUrl
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
#Recreate target folder
if (Test-Path -Path $folderPath){
    Remove-Item -LiteralPath $folderPath -Recurse
}
New-Item -ItemType Directory -Force -Path $folderPath

# Example use
Export-ListFormatting -folderPath $folderPath -listName "List1"
Export-ListFormatting -folderPath $folderPath -listName "List2"

