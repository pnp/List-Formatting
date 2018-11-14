#!/usr/bin/env bash

# Update siteURL
siteURL=https://SharePointTenantName.sharepoint.com

# Update List Name
listName='Student Grades' # NOTE: This should use the display name of the list, not the internal name

# Update View name
viewName='StudentGradesView_CLI' # NOTE: This should use the display name of the view, not the internal name

# Update File Reference to the JSON file you would like to deploy
jsonDefinitionFile="./JSON Definitions/ListFormatting.ViewDefinition.ViewName.json"
# get file contents and print as a single line
json=$(cat "$jsonDefinitionFile" | jq -c '.')
echo "Configuring view formatting..."
# update list view. notice the special way of escaping the JSON string in CustomFormatter
o365 spo list view set --webUrl "$siteURL" --listTitle "$listName" --viewTitle "$viewName" --CustomFormatter '`'"$json"'`' --verbose