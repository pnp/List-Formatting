# 🎵 Music Cards

This view formatting transforms your SharePoint list into a vibrant music discovery board. Employees can recommend songs via YouTube, listen to each other's picks, and vote on their favorites. It's a fun and engaging way to share musical tastes across the organization.

Overview of Music Cards
![screenshot of the sample](./assets/music_cards_view.png)

Playing video
![screenshot of the sample](./assets/music_cards_view2.png)

## ✨ Features

- **Embedded YouTube previews** – Click the thumbnail to play the song directly in the card.
- **Artist and Title display** – Clear and stylish presentation of song details.
- **Contributor info** – See who tipped the track.
- **Star rating system** – Vote on songs with a simple 1–5 star interface.
- **Responsive design** – Cards adapt well to different screen sizes.

## 📋 Required Settings
- Go to the settings of the list
- Click **Rating Settings**
- Switch **Rating Settings**
- Optionally choose **voting/rating experience**. 
In the Music Cards View only stars are shown. You can adjust the icon to any icon you want in the code.

Playing video
![screenshot of the settings](./assets/music_cards_view_settings.png)

## 📋 Required Columns

To use this View formatting, your list should include the following columns:

| Internal Name     | Display Name     | Type       | Description                                  |
|-------------------|------------------|------------|----------------------------------------------|
| `Title`           | Title            | Single line of text | The name of the song.                        |
| `Artist`          | Artist           | Single line of text | The performing artist.                       |
| `YouTubeCode`     | YouTube Code     | Single line of text | The unique video ID from the YouTube URL.    |
| `Author`          | Created By       | Person     | Automatically filled when the item is created. |

Beware that you don't use the full url of a YouTube video. You only need the unique ID.
The reason for that is that the script automatically will show a correct still of the video. 

## 📋 Required Columns in view
The following columns are necessary inside your view. If you do not add them, the data will not show within the Music Cards.

| Internal Name     | Display Name     |
|-------------------|------------------|
| `Title`           | Title            |
| `Artist`          | Artist           |
| `Author`          | Created By       |
| `YouTubeCode`     | YouTube Code     |
| `AverageRating`   | Average Rating   |
| `RatingCount`     | Rating Count     |
| `Ratings`         | Ratings          |
| `RatedBy`         | Rated By         |

![screenshot of the settings](./assets/music_cards_view_settings2.png)

## 🧩 Column Formatting: YouTubeCode

Add the following column formatting to the **YouTubeCode** column to enable embedded previews:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/sp/v2/column-formatting.schema.json",
  "elmType": "div",
  "children": [
    {
      "elmType": "div",
      "style": {
        "cursor": "pointer",
        "display": "=if(@currentField,'flex','none')",
        "align-items": "center"
      },
      "attributes": {
        "class": "ms-fontSize-s ms-fontColor-white ms-bgColor-themePrimary ms-bgColor-themeTertiary--hover"
      },
      "customRowAction": {
        "action": "embed",
        "actionInput": {
          "src": "='https://www.youtube.com/embed/' + @currentField",
          "width": "640",
          "height": "360"
        }
      },
      "children": [
        {
          "elmType": "img",
          "attributes": {
            "src": "='https://img.youtube.com/vi/' + @currentField + '/mqdefault.jpg'"
          },
          "style": {
            "width": "240px",
            "padding": "0px"
          }
        }
      ]
    }
  ]
}
```

## Sample

Solution|Author(s)
--------|---------
music_cards_view.json | [Ron Ackermans](https://github.com/RonDZV) ([@Ron Ackermans](https://www.linkedin.com/in/ronackermans/))

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 18, 2025 |Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


---




