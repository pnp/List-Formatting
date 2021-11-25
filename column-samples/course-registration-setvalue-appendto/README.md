# Register for a course via a button using the setValue action to append the user in a usermulti field

## Summary
This is a sample of creating a button to register for a course. It also checks if the course is already full or if the user has already registered for the course.

## View requirements

|Type|Internal Name|Additional Information
|---|:---:|---|
|DateTime|RegistrationEndDate| Column for when the registration period for the course ends
|DateTime|CourseDate|Column for when the Course is scheduled
|Text|Register|Column to show the registration button, apply the template to this column
|Number|NumberOfPlaces|Column for the number of available places in the course
|UserMulti|PeopleWhoRegistered|Column to track the number of people who already registered

Included a PowerShell script in the assets folder to easily create the Courses list. 

## Sample

Solution                                   |Author(s)
-------------------------------------------|---------------------------
course-registration-setvalue-appendto.json |[Dennis](https://twitter.com/expiscornovus) [(@expiscornovus)](https://twitter.com/expiscornovus)

## Version history

Version |Date          |Comments
--------|--------------|--------------------------------
1.0     |November 25, 2021 |Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
##
