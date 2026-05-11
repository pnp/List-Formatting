# Connect to SharePoint
Connect-PnPOnline -Url "https://thetaco1nz.sharepoint.com/sites/Sudeep" -UseWebLogin

# Create list
New-PnPList -Title "Popular Books" -Template GenericList -Url "Lists/PopularBooks" -OnQuickLaunch

# Add columns (as per requirements)

Add-PnPField -List "Popular Books" -DisplayName "Number" -InternalName "Number" -Type Number
Add-PnPField -List "Popular Books" -DisplayName "BookAuthor" -InternalName "BookAuthor" -Type Text
Add-PnPField -List "Popular Books" -DisplayName "BookAbstract" -InternalName "BookAbstract" -Type Note
Add-PnPField -List "Popular Books" -DisplayName "Category" -InternalName "Category" -Type Text
Add-PnPField -List "Popular Books" -DisplayName "Price" -InternalName "Price" -Type Text
Add-PnPField -List "Popular Books" -DisplayName "BookCoverUrl" -InternalName "BookCoverUrl" -Type Text
Add-PnPField -List "Popular Books" -DisplayName "IsBestSeller" -InternalName "IsBestSeller" -Type Boolean
Add-PnPField -List "Popular Books" -DisplayName "ReleaseDate" -InternalName "ReleaseDate" -Type DateTime
Add-PnPField -List "Popular Books" -DisplayName "FindInStoreUrl" -InternalName "FindInStoreUrl" -Type Text
Add-PnPField -List "Popular Books" -DisplayName "AddtoCart" -InternalName "AddtoCart" -Type Boolean

# Insert sample book records
Add-PnPListItem -List "Popular Books" -Values @{ Number = "1"; BookAuthor = "J.K. Rowling"; Title = "Harry Potter"; Category = "Fantasy"; Price = "39.99"; BookAbstract = "Harry discovers he is a wizard and attends Hogwarts, where he makes friends and faces the dark wizard Voldemort."; IsBestSeller = $true; FindInStoreUrl = "https://www.google.com/maps?q=amazon+books+store+nyc" }
Add-PnPListItem -List "Popular Books" -Values @{ Number = "2"; BookAuthor = "J.R.R. Tolkien"; Title = "The Lord of the Rings"; Category = "Fantasy"; Price = "59.99"; BookAbstract = "Frodo Baggins embarks on a perilous journey to destroy the One Ring and save Middle-earth from Sauron."; IsBestSeller = $true; FindInStoreUrl = "https://www.google.com/maps?q=amazon+books+store+nyc" }
Add-PnPListItem -List "Popular Books" -Values @{ Number = "3"; BookAuthor = "George Orwell"; Title = "1984"; Category = "Dystopian"; Price = "24.50"; BookAbstract = "Winston Smith rebels against a totalitarian regime that watches every move and controls every thought."; IsBestSeller = $false; FindInStoreUrl = "https://www.google.com/maps?q=amazon+books+store+nyc" }
Add-PnPListItem -List "Popular Books" -Values @{ Number = "4"; BookAuthor = "Jane Austen"; Title = "Pride and Prejudice"; Category = "Classic"; Price = "29.95"; BookAbstract = "Elizabeth Bennet navigates issues of manners, upbringing, and marriage in 19th-century England."; IsBestSeller = $false; FindInStoreUrl = "https://www.google.com/maps?q=amazon+books+store+nyc" }
Add-PnPListItem -List "Popular Books" -Values @{ Number = "5"; BookAuthor = "F. Scott Fitzgerald"; Title = "The Great Gatsby"; Category = "Classic"; Price = "44.00"; BookAbstract = "Jay Gatsby pursues wealth and love in the Roaring Twenties, only to face tragedy and disillusionment."; IsBestSeller = $true; FindInStoreUrl = "https://www.google.com/maps?q=amazon+books+store+nyc" }
Add-PnPListItem -List "Popular Books" -Values @{ Number = "6"; BookAuthor = "Yuval Noah Harari"; Title = "Sapiens"; Category = "Non-Fiction"; Price = "54.25"; BookAbstract = "A thought-provoking exploration of humanity’s history, from ancient ancestors to the modern world."; IsBestSeller = $false; FindInStoreUrl = "https://www.google.com/maps?q=amazon+books+store+nyc" }
