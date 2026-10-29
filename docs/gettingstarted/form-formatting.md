# Applying Form Formats

List forms can have a custom header, footer, and body layout. A sample may provide
separate JSON files for each part. Apply each file to its matching destination;
do not combine a header and footer into one JSON object.

## Before you start

- Read the sample's Form requirements and create the expected columns.
- Check internal column names, choice values, and any tenant-specific URLs.
- Use a modern SharePoint or Microsoft Lists form and an account permitted to
  configure its layout. Custom Power Apps forms use a different model.

## Configure the layout

1. Open a list item form.
2. Select **Edit form**, then **Configure layout**.
3. Choose **Header**, **Body**, or **Footer** in the layout selector.
4. Open the sample's matching definition, then select **Copy JSON**.
5. Paste the complete definition into that part's formatting panel.
6. Preview the result, then save. Repeat for other parts if the sample provides them.

Header and footer definitions use formatting elements. The body layout uses
`sections` with column display names to organize fields; it is not a column
formatting element tree. Follow the specific sample's instructions.

## Conditional fields

Showing or hiding form fields is configured separately through **Edit columns**
and conditional formulas. Formatting a field is not a security control: the
underlying value may remain accessible.

## Troubleshooting

- A missing field or wrong choice value can change an expression's result.
- Check which part is selected before pasting: Header, Body, and Footer are not interchangeable.
- Test editing and creating items, narrow layouts, and long or empty values.
- Keep a copy of the previous definition before replacing it.

## Learn more

- [Configure the list form](https://learn.microsoft.com/sharepoint/dev/declarative-customization/list-form-configuration)
- [Conditionally show or hide columns](https://learn.microsoft.com/sharepoint/dev/declarative-customization/list-form-conditional-show-hide)
- [Browse form samples](../../form-samples)

<img src="https://m365-visitor-stats.azurewebsites.net/list-formatting/docs/gettingstarted/form-formatting" />
