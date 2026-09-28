# Creating a Sample

The easiest way to submit a sample is to duplicate an existing sample folder of the sample type (column, form, or view) and then update it for your sample. Place the folder under `column-samples`, `form-samples`, or `view-samples`, as appropriate.

A sample will have at least the following files:

  - `[your-sample].json`
    - The primary JSON file must be named the same as the sample folder
    - Additional json files can use whatever name makes sense, but usually some variation of the main sample
  - `README.md`
    - Start with the README template for the sample type
    - This is the document people will read to understand what your sample does and how to use it
    - There are several required sections (see below), but we're also happy to help you fill in anything you're unsure about
    - Authors should link to their GitHub profile, all other social media and personal links should NOT be included directly in the sample. Instead, include these on your GitHub profile. This ensures your links are always up to date.
    - View requirements should always be included and should describe the details about the list/library required to make the sample work. If there are no requirements, simply state that it works with all column types
    - Every sample README must end with the tracking image `<img src="https://m365-visitor-stats.azurewebsites.net/{repository}/{sample-path}" />`. This tracking image helps us understand sample usage.
    - Use `list-formatting` for `{repository}`. The `{sample-path}` suffix must exactly match the sample folder's repository-relative path. For example, a sample in `view-samples/alternating-rows` must end with `<img src="https://m365-visitor-stats.azurewebsites.net/list-formatting/view-samples/alternating-rows" />`.
  - `assets` folder
    - `screenshot.png`
      - This is the primary screenshot of your sample. This file can be a .png, .jpg, or .gif but should be named `screenshot`
      - Additional screenshots can have whatever name makes sense
    - `sample.json`
      - This file contains all the metadata about your sample and will be used to add it to all the lists on this site as well as the Microsoft sample browser
      - Fill this out as best you can, but we'll validate it as part of your submission 

<img src="https://m365-visitor-stats.azurewebsites.net/list-formatting/docs/contributing/sample" />
