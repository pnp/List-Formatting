#!/usr/bin/env bash

# Update siteURL
siteURL=https://SharePointTenantName.sharepoint.com

# Update List Name
listName='Task List' # NOTE: This should use the display name of the list, not the internal name

# Update List Column
listColumn='Task Status'

# Update File Reference to the JSON file you would like to deploy
jsonDefinitionFile="./JSON Definitions/ListFormatting.ColumnDefinition.ColumnName.json"

# get file contents and print as a single line
json=$(cat "$jsonDefinitionFile" | jq -c '.')
echo "Configuring column formatting..."
# update field. notice the special way of escaping the JSON string in CustomFormatter
o365 spo field set --webUrl "$siteURL" --listTitle "$listName" --name "$listColumn" --CustomFormatter '`'"$json"'`' --verbose