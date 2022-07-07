<# .SYNOPSIS
    Create list for Course registration.
.DESCRIPTION
    You need to have the latest version of PnP PowerShell
    Create list for Course registration.
    
.PARAMETER SiteCollection
    Specifies the site collection Url of the SharePoint Online environment.
    
.PARAMETER ListName
    Specifies the name of the SharePoint Online list.

.EXAMPLE
    PS> .\create_courseregistration_spolist.ps1 -SiteCollection "https://contoso.sharepoint.com/sites/formatting" -ListName "Courses"
 
#>

param ([Parameter(Mandatory)]$SiteCollection,[Parameter(Mandatory)]$ListName)

Connect-PnPOnline -Url $SiteCollection -Interactive

New-PnPList -Title $ListName -Template GenericList
Add-PnPField -List $ListName -DisplayName "Registration End Date" -InternalName "RegistrationEndDate" -Type DateTime
Add-PnPField -List $ListName -DisplayName "Course Date" -InternalName "CourseDate" -Type DateTime
Add-PnPField -List $ListName -DisplayName "Register" -InternalName "Register" -Type Text
Add-PnPField -List $ListName -DisplayName "Number of Available Places" -InternalName "NumberofPlaces" -Type Number
Add-PnPFieldFromXml -List $ListName -FieldXml '<Field Type="UserMulti" DisplayName="People Who Registered" UserSelectionMode="PeopleOnly" StaticName="PeopleWhoRegistered" Name="PeopleWhoRegistered" Mult="TRUE" />'
Add-PnPView -List $ListName -Title "All Courses" -Fields "Title","RegistrationEndDate","CourseDate","Register","NumberofPlaces","PeopleWhoRegistered"

Disconnect-PnPOnline
