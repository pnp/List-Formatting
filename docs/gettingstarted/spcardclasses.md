# `sp-card-*` Classes: The Less-Code Playbook

The `sp-card-*` family is the **single biggest code-saver in the SharePoint formatting toolbox**. Every class is a pre-baked CSS rule that ships in SharePoint's own stylesheet — so you apply it via `attributes.class` and instantly inherit pixel-perfect Microsoft defaults for spacing, typography, hover, focus rings, line-clamp, accessibility, and motion. **No `style` block required.**

These classes were designed for Gallery / Tile / Board card layouts, but the engine treats them like any other CSS class — meaning **they also work inside `rowFormatter` for List views**. That's the trick that unlocks a consistent "card aesthetic" across every layout your users might pick.

!!! info "Why this matters"
    A hand-rolled card in a Gallery view typically runs **80-200 lines** of JSON because each container, label, and content paragraph needs its own `style` block for padding, font weight, color, ellipsis, and hover behavior. The same card built on `sp-card-*` classes is **20-40 lines** because all of that is encoded in the class. You only write `style` when you want to *override* the default.

---

## How the classes actually work

When the formatter renders, the engine drops your `class` string straight onto the rendered DOM element. SharePoint's stylesheet has rules like `.sp-card-container { ... }`, `.sp-card-label { ... }` etc. — they apply automatically. Your JSON stays clean.

Two practical consequences:

1. **No theme drift.** If the tenant switches to dark mode or a custom theme, your cards re-color themselves because Fluent's tokens are baked into the class rules.
2. **No `@window.innerWidth` math for typography.** `sp-card-label`, `sp-card-content`, `sp-card-multiline` already encode the responsive font sizes Microsoft tested.

---

## The canonical card scaffold

Almost every Microsoft-shipped Gallery card and every well-built community sample follows this exact tree. Memorize it — once you do, building a new card type takes minutes.

```
sp-card-container                              ← root tile box (sizing + focus ring)
├── sp-card-defaultClickButton                 ← invisible click overlay (captures default action)
└── sp-card-subContainer + sp-card-borderHighlight
    │                                          ← visible card body + hover border treatment
    ├── sp-card-previewColumnContainer         ← top "hero" / image area
    │   └── sp-card-imageContainer
    │       └── sp-card-imagePreviewBackground ← gray placeholder background
    │           ├── <img sp-card-imagePreview>            ← real thumbnail
    │           ├── <svg sp-card-defaultImage>            ← decorative shape (no image)
    │           └── <svg sp-card-defaultImageOverlay>     ← placeholder icon
    │
    ├── sp-card-displayColumnContainer × N     ← one per key/value pair in the body
    │   ├── <p sp-card-label>                  ← the field caption (small, secondary color)
    │   └── <p sp-card-content>                ← the field value
    │         + sp-card-multiline              ← line-clamped multi-line value
    │         + sp-card-highlightedContent     ← bolder/larger "headline" content
    │         + sp-card-urlContent             ← hyperlink content
    │
    ├── sp-card-lastTextColumnContainer        ← last text block (different bottom margin)
    │
    ├── star-rating block
    │   ├── <span sp-card-starRating>          ← filled star (default)
    │   │     + sp-card-emptyFillStar          ← modifier: empty
    │   │     + sp-card-halfFillStar           ← modifier: half
    │   └── <span sp-card-ratingCount>         ← "(12)" count beside stars
    │
    └── people block (sp-card-previewColumnContainer)
        ├── sp-card-userContainer              ← one per visible person
        │   └── <img sp-card-userThumbnail>
        ├── sp-card-userOthers                 ← "+N" chip when overflow
        ├── sp-card-userTitle                  ← single-person name beside thumbnail
        ├── sp-card-userEmptyText              ← "–" placeholder when no people
        ├── sp-card-userCustomCard             ← modifier for personCallout list items
        └── sp-card-personCallout              ← container of overflow people inside customCardProps
```

---

## Class reference

| Class | Purpose | Where it goes |
| --- | --- | --- |
| `sp-card-container` | Root card box — fixes the tile size, applies the focus ring, sets up positioning context for the click button. | Outermost `div` |
| `sp-card-container-noPadding` | Variant of container with internal padding stripped — for full-bleed image cards. | Outermost `div` |
| `sp-card-subContainer` | The visible "card surface" inside the container. Sets the inner padding, rounded corners, and content layout. | First child of `sp-card-container` |
| `sp-card-borderHighlight` | Adds the 1px neutral border that glows on hover. Combine with `sp-css-borderColor-neutralLight` or `ms-borderColor-themePrimary` for theme variants. | Same element as `sp-card-subContainer` |
| `sp-card-defaultClickButton` | Invisible, absolutely-positioned overlay that captures clicks and routes them to a `customRowAction`. **Required for the "whole card is clickable" UX.** | Child of `sp-card-container`, sibling of `sp-card-subContainer` |
| `sp-card-bottomCommandBar` | Reserved zone at the bottom of the card for command-bar-style controls. Sticks to the bottom. | Inside `sp-card-subContainer` |
| `sp-card-previewColumnContainer` | Top section that holds the image preview (or a people row in the lower half). | Inside `sp-card-subContainer` |
| `sp-card-imageContainer` | Wrapper around the image — handles aspect ratio and overflow. | Inside `sp-card-previewColumnContainer` |
| `sp-card-imagePreview` | The actual `<img>` thumbnail. Encodes `object-fit`, sizing, and the loading transition. | On the `<img>` itself |
| `sp-card-imagePreviewBackground` | The flat gray "no-image-yet" background under the thumbnail. Combine with `ms-bgColor-neutralLight` for the canonical Fluent gray. | Inside `sp-card-imageContainer` |
| `sp-card-defaultImage` | Decorative SVG placeholder shape shown when the image field is empty. Pair with `ms-bgColor-themeLighter` for the tinted fill. | `<svg>` |
| `sp-card-defaultImageOverlay` | The little "missing image" icon drawn on top of the placeholder. | `<svg>` |
| `sp-card-displayColumnContainer` | One block per `label + content` pair in the body of the card. Encodes the vertical rhythm. | Inside `sp-card-subContainer` — repeat for every field |
| `sp-card-lastTextColumnContainer` | Same as displayColumnContainer but for the *last* text field — different bottom margin so it doesn't double up with whatever comes next. | Last text block in the card |
| `sp-card-label` | The small, neutral-secondary caption above a value. Auto-handles font-size and color. **Use `[!FieldName.DisplayName]` for the text.** | `<p>` or `<span>` inside a `displayColumnContainer` |
| `sp-card-content` | The actual value text. Sets font, color, line-height. | `<p>` / `<span>` / `<a>` inside a `displayColumnContainer` |
| `sp-card-highlightedContent` | Modifier on `sp-card-content` — bigger, bolder. Use for the *primary* identifier on the card (usually Title). | Combined with `sp-card-content` |
| `sp-card-multiline` | Modifier on `sp-card-content` — allows wrapping across multiple lines (pair with `-webkit-line-clamp` to cap line count). | Combined with `sp-card-content` |
| `sp-card-urlContent` | Modifier on `sp-card-content` — applies hyperlink styling. | Combined with `sp-card-content` on `<a>` |
| `sp-card-boldText` | Inline bold text helper. | `<span>` |
| `sp-card-keyboard` / `sp-card-keyboard-focusable` | Makes the element show the SharePoint focus ring when tabbed to. **Always add to interactive elements** for accessibility. | Any focusable element |
| `sp-card-formatterRef` | Container for output of `columnFormatterReference`. | Wrapper `div` around the reference |
| `sp-card-starRating` | One filled star in a rating block. | `<span>` per star (use `forEach`) |
| `sp-card-emptyFillStar` | Modifier on `sp-card-starRating` — renders as empty/outline. | Combined |
| `sp-card-halfFillStar` | Modifier on `sp-card-starRating` — renders as half-filled. | Combined |
| `sp-card-ratingCount` | The "(12)" rating count text beside the stars. | `<span>` |
| `sp-card-userContainer` | Wrapper around one person's thumbnail. Encodes the circular cropping and spacing. | `<a>` or `<div>` per person (use `forEach`) |
| `sp-card-userThumbnail` | The actual person `<img>`. Round, sized, hover state included. | `<img>` |
| `sp-card-userTitle` | Person's name beside the thumbnail when there's only one person. | `<div>` |
| `sp-card-userOthers` | The "+3" overflow chip when more people are assigned than fit. | `<div>` |
| `sp-card-userEmptyText` | The "–" placeholder shown when a multi-person field is empty. | `<p>` |
| `sp-card-userCustomCard` | Modifier on `sp-card-userContainer` used inside the overflow callout. | Inside a `customCardProps.formatter` |
| `sp-card-personCallout` | Container for the overflow people list inside a `customCardProps` callout. | Root of the callout formatter |

---

## Copy-paste templates

### Template 1: Minimal clickable card (~25 lines)

The smallest viable card — clickable, hover ring, accessible focus, theme-aware. This replaces ~80 lines of hand-rolled `style` blocks.

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/sp/v2/tile-formatting.schema.json",
  "height": 120,
  "width": 240,
  "hideSelection": true,
  "fillHorizontally": true,
  "formatter": {
    "elmType": "div",
    "attributes": { "class": "sp-card-container" },
    "children": [
      {
        "elmType": "div",
        "attributes": { "class": "sp-card-defaultClickButton" },
        "customRowAction": { "action": "defaultClick" }
      },
      {
        "elmType": "div",
        "attributes": { "class": "ms-bgColor-white sp-css-borderColor-neutralLight sp-card-borderHighlight sp-card-subContainer" },
        "children": [
          {
            "elmType": "div",
            "attributes": { "class": "sp-card-displayColumnContainer" },
            "children": [
              { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralSecondary sp-card-label" }, "txtContent": "[!Title.DisplayName]" },
              { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralPrimary sp-card-content sp-card-highlightedContent" }, "txtContent": "[$Title]" }
            ]
          }
        ]
      }
    ]
  }
}
```

### Template 2: Key/value spec card (~40 lines)

The everyday "card view of a list item." Replace, add, or remove `sp-card-displayColumnContainer` blocks to match your columns. Each block is ~6 lines.

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/sp/v2/tile-formatting.schema.json",
  "height": 200,
  "width": 280,
  "hideSelection": true,
  "fillHorizontally": true,
  "formatter": {
    "elmType": "div",
    "attributes": { "class": "sp-card-container" },
    "children": [
      { "elmType": "div", "attributes": { "class": "sp-card-defaultClickButton" }, "customRowAction": { "action": "defaultClick" } },
      {
        "elmType": "div",
        "attributes": { "class": "ms-bgColor-white sp-css-borderColor-neutralLight sp-card-borderHighlight sp-card-subContainer" },
        "children": [
          {
            "elmType": "div",
            "attributes": { "class": "sp-card-displayColumnContainer" },
            "children": [
              { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralSecondary sp-card-label" }, "txtContent": "[!Title.DisplayName]" },
              { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralPrimary sp-card-content sp-card-highlightedContent" }, "txtContent": "[$Title]" }
            ]
          },
          {
            "elmType": "div",
            "attributes": { "class": "sp-card-displayColumnContainer" },
            "children": [
              { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralSecondary sp-card-label" }, "txtContent": "[!Status.DisplayName]" },
              { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralPrimary sp-card-content" }, "txtContent": "[$Status]" }
            ]
          },
          {
            "elmType": "div",
            "attributes": { "class": "sp-card-lastTextColumnContainer" },
            "children": [
              { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralSecondary sp-card-label" }, "txtContent": "[!DueDate.DisplayName]" },
              { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralPrimary sp-card-content" }, "txtContent": "=toLocaleDateString([$DueDate])" }
            ]
          }
        ]
      }
    ]
  }
}
```

### Template 3: Image + content card

The "preview thumbnail on top, details below" pattern. The image block (`sp-card-previewColumnContainer` → `sp-card-imageContainer` → `sp-card-imagePreviewBackground`) is the part that's most painful to write from scratch, and the class makes it ~10 lines.

```json
{
  "elmType": "div",
  "attributes": { "class": "ms-bgColor-white sp-css-borderColor-neutralLight sp-card-borderHighlight sp-card-subContainer" },
  "children": [
    {
      "elmType": "div",
      "attributes": { "class": "sp-card-previewColumnContainer" },
      "children": [
        {
          "elmType": "div",
          "attributes": { "class": "sp-card-imageContainer" },
          "children": [
            {
              "elmType": "div",
              "attributes": { "class": "ms-bgColor-neutralLight sp-card-imagePreviewBackground" },
              "children": [
                {
                  "elmType": "img",
                  "attributes": {
                    "src": "=getThumbnailImage([$Image], 400, 300)",
                    "title": "[$Image.fileName]",
                    "class": "sp-card-imagePreview"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "elmType": "div",
      "attributes": { "class": "sp-card-displayColumnContainer" },
      "children": [
        { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralSecondary sp-card-label" }, "txtContent": "[!Title.DisplayName]" },
        { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralPrimary sp-card-content sp-card-highlightedContent" }, "txtContent": "[$Title]" }
      ]
    }
  ]
}
```

### Template 4: Star rating row

Five stars rendered with `forEach`, each toggling fill state based on a numeric `[$AverageRating]`. The `setValue` customRowAction makes the stars themselves clickable — full rating UI in ~25 lines.

```json
{
  "elmType": "div",
  "attributes": { "class": "sp-card-displayColumnContainer" },
  "children": [
    { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralSecondary sp-card-label" }, "txtContent": "[!AverageRating.DisplayName]" },
    {
      "elmType": "div",
      "children": [
        {
          "elmType": "span",
          "forEach": "rating in split('1,2,3,4,5',',')",
          "children": [
            {
              "elmType": "span",
              "attributes": {
                "iconName": "FavoriteStarFill",
                "class": "=if([$AverageRating] >= [$rating], 'sp-card-starRating', if([$AverageRating] > [$rating] - 1, 'sp-card-starRating sp-card-halfFillStar', 'sp-card-starRating sp-card-emptyFillStar'))"
              }
            }
          ]
        },
        { "elmType": "span", "attributes": { "class": "sp-card-ratingCount" }, "txtContent": "=' ' + toString([$RatingCount])" }
      ]
    }
  ]
}
```

### Template 5: People row with overflow ("+N more")

The classic Microsoft "5 thumbnails then a +N chip with a hover callout listing the rest." Built entirely on `sp-card-user*` classes.

```json
{
  "elmType": "div",
  "attributes": { "class": "sp-card-previewColumnContainer" },
  "children": [
    { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralSecondary sp-card-label" }, "txtContent": "[!AssignedTo.DisplayName]" },
    {
      "elmType": "div",
      "style": { "display": "flex" },
      "children": [
        {
          "elmType": "p",
          "attributes": { "class": "sp-card-userEmptyText" },
          "txtContent": "=if(length([$AssignedTo]) == 0, '–', '')"
        },
        {
          "forEach": "person in [$AssignedTo]",
          "elmType": "a",
          "attributes": { "class": "sp-card-userContainer sp-card-keyboard-focusable" },
          "style": { "display": "=if(loopIndex('person') >= 5, 'none', '')" },
          "children": [
            {
              "elmType": "img",
              "defaultHoverField": "[$person]",
              "attributes": {
                "src": "=getUserImage([$person.email], 'S')",
                "title": "[$person.title]",
                "class": "sp-card-userThumbnail"
              }
            }
          ]
        },
        {
          "elmType": "div",
          "attributes": { "class": "ms-bgColor-neutralLight ms-fontColor-neutralSecondary sp-card-userOthers" },
          "style": { "display": "=if(length([$AssignedTo]) > 5, '', 'none')" },
          "children": [
            { "elmType": "span", "txtContent": "='+' + toString(length([$AssignedTo]) - 4)" }
          ]
        }
      ]
    }
  ]
}
```

### Template 6: Quick-link tile (image-only, no body)

For "launchpad" style views — small image-only tiles with a clickable URL. Demonstrates `sp-card-container-noPadding` for full-bleed imagery.

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/sp/v2/tile-formatting.schema.json",
  "width": 72,
  "height": 98,
  "hideSelection": true,
  "fillHorizontally": false,
  "formatter": {
    "elmType": "div",
    "attributes": { "class": "sp-card-container" },
    "children": [
      {
        "elmType": "a",
        "attributes": {
          "class": "sp-card-defaultClickButton",
          "target": "_blank",
          "href": "[$Link]",
          "title": "[$Link.desc]"
        }
      },
      {
        "elmType": "div",
        "attributes": { "class": "ms-bgColor-neutralLight sp-css-borderColor-neutralLight sp-card-borderHighlight sp-card-subContainer" },
        "children": [
          {
            "elmType": "div",
            "attributes": { "class": "sp-card-previewColumnContainer" },
            "children": [
              {
                "elmType": "div",
                "attributes": { "class": "sp-card-imageContainer" },
                "children": [
                  {
                    "elmType": "div",
                    "attributes": { "class": "sp-card-imagePreviewBackground" },
                    "children": [
                      {
                        "elmType": "img",
                        "attributes": { "src": "[$Picture]", "alt": "[$Picture.desc]", "class": "sp-card-imagePreview" }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

---

## Using `sp-card-*` in **List view** rowFormatters

The class rules don't care which formatter context they're in — they're plain CSS. Set the row formatter schema, wrap your row in `sp-card-container` + `sp-card-subContainer`, and you get the card look-and-feel **inside a List layout**:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/sp/v2/row-formatting.schema.json",
  "hideSelection": true,
  "hideColumnHeader": true,
  "rowFormatter": {
    "elmType": "div",
    "attributes": { "class": "sp-card-container" },
    "style": { "width": "100%", "margin-bottom": "8px" },
    "children": [
      { "elmType": "div", "attributes": { "class": "sp-card-defaultClickButton" }, "customRowAction": { "action": "defaultClick" } },
      {
        "elmType": "div",
        "attributes": { "class": "ms-bgColor-white sp-css-borderColor-neutralLight sp-card-borderHighlight sp-card-subContainer" },
        "style": { "display": "flex", "align-items": "center", "padding": "12px" },
        "children": [
          {
            "elmType": "div",
            "attributes": { "class": "sp-card-displayColumnContainer" },
            "style": { "flex": "1 1 0", "min-width": "0" },
            "children": [
              { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralSecondary sp-card-label" }, "txtContent": "[!Title.DisplayName]" },
              { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralPrimary sp-card-content sp-card-highlightedContent" }, "txtContent": "[$Title]" }
            ]
          },
          {
            "elmType": "div",
            "attributes": { "class": "sp-card-lastTextColumnContainer" },
            "style": { "flex": "0 0 120px" },
            "children": [
              { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralSecondary sp-card-label" }, "txtContent": "[!Status.DisplayName]" },
              { "elmType": "p", "attributes": { "class": "ms-fontColor-neutralPrimary sp-card-content" }, "txtContent": "[$Status]" }
            ]
          }
        ]
      }
    ]
  }
}
```

The List layout now renders each row as a horizontally-stretched card with consistent Fluent spacing. Set `hideColumnHeader: true` so the row cards aren't competing with sortable column headings.

!!! tip
    The `width: 100%` override on `sp-card-container` is the one inline style you need — the class defaults to the fixed Gallery tile width. Apply it and the card stretches to fill the List row.

---

## Pro tips

### Code-savings hot list

These are the patterns that pay the biggest dividends — start here.

1. **Always pair `sp-card-label` with `[!FieldName.DisplayName]`.** That gives you a localized, theme-aware caption above your value with **zero** style configuration. Without the class you'd hand-write color, font-size, and font-weight every time.
2. **`sp-card-highlightedContent` is your headline.** Apply it to the Title field on every card to get the Microsoft-standard prominent title — saves you defining font-size, font-weight, and color.
3. **`sp-card-multiline` + `-webkit-line-clamp` in `style`** = clean N-line truncation. The class handles the wrapping; one inline style caps the lines.
4. **`sp-card-displayColumnContainer` is composable.** Need 1 column on phones and 2 on desktop? Wrap a row of `displayColumnContainer`s in a `display: flex` + `flex-wrap: wrap` div. The class handles the per-block typography, you only do the layout.
5. **`sp-card-defaultClickButton` + `customRowAction: defaultClick`** is the single best UX upgrade: makes the entire card clickable for the default item action without you positioning an overlay yourself. Drop it in once and forget about pointer events.
6. **Always combine `sp-card-borderHighlight` with `sp-css-borderColor-neutralLight`** for the resting border color. The class only encodes the hover behavior; the resting color comes from the Fluent class. This pair is the canonical "Microsoft card" look.

### Accessibility wins for free

- **`sp-card-keyboard-focusable`** on any interactive child element gives you the SharePoint focus ring on tab — meets WCAG focus-visible requirements without you styling outlines.
- **`role="heading"` + `aria-level="3"`** on the title `<p>` (via `attributes`) makes screen readers announce cards as a list of headings. The Microsoft samples do this and you should too.

### Theme awareness without effort

- The card classes use Fluent **tokens**, not hard-coded colors. Switching the site theme or toggling dark mode auto-recolors your cards. **Don't hard-code `color` or `background-color` if a Fluent class would do** — you'll fight the cascade and lose theme parity.
- For accents, prefer `ms-bgColor-themePrimary`, `ms-fontColor-themePrimary`, `ms-borderColor-themePrimary` over `#0078d4`. Same look today, follows the tenant theme tomorrow.

### Gotchas

- **Class application uses `attributes.class`, not `className`.** The formatter schema accepts only the HTML-attribute name, not the React-style camelCase one.
- **Space-separate multiple classes inside a single string** — e.g. `"class": "sp-card-content sp-card-highlightedContent ms-fontColor-neutralPrimary"`. You don't get an array.
- **`sp-card-defaultClickButton` must be a sibling of `sp-card-subContainer`, not nested inside it.** Otherwise clicks land on your content and the card-wide click target stops working.
- **`sp-card-container` sets a fixed width** matching the Gallery tile size. In List rowFormatter, override with `style: { "width": "100%" }`.
- **The classes are not in the JSON schema and won't autocomplete in Monaco.** Type them by hand or copy from a known-good sample. Mistyped class names fail silently — the rule just doesn't apply.
- **Don't try to extend with your own `.sp-card-myThing` class.** You can't ship CSS through the formatter. Stick to the published classes plus inline `style` for the bits you need to override.

### Decision matrix: when to use a class vs. inline style

| Need | Use a class | Use inline `style` |
| --- | --- | --- |
| Field caption text (small, secondary) | ✅ `sp-card-label` | ❌ |
| Field value text (primary) | ✅ `sp-card-content` | ❌ |
| Bold/large title | ✅ `sp-card-content sp-card-highlightedContent` | ❌ |
| Multi-line description with N-line clamp | ✅ `sp-card-content sp-card-multiline` | ✅ `-webkit-line-clamp` only |
| Hyperlink styling | ✅ `sp-card-urlContent` on `<a>` | ❌ |
| Whole-card click target | ✅ `sp-card-defaultClickButton` | ❌ |
| Card hover border | ✅ `sp-card-borderHighlight` + `sp-css-borderColor-neutralLight` | ❌ |
| Image thumbnail | ✅ `sp-card-imagePreview` + `imagePreviewBackground` | ❌ |
| Star rating UI | ✅ `sp-card-starRating` (+ modifiers) | ❌ |
| People row with overflow | ✅ `sp-card-userContainer` + `sp-card-userOthers` | ❌ |
| Custom card width (List rowFormatter) | ❌ | ✅ `width: 100%` |
| Custom card colors (off-theme) | ❌ — use `ms-bgColor-*` / `sp-css-borderColor-*` | ✅ only as last resort |
| Flexbox layout *between* card blocks | ❌ | ✅ `display: flex`, `flex-direction`, `justify-content` |
| Per-priority severity bar | ❌ | ✅ `border-left-color` |

**The rule of thumb:** if a class encodes the *visual treatment* (typography, color, spacing of a known card component), use the class. If you're doing *layout* (arranging your specific fields in your specific way), use `style`.

---

## When the playbook still isn't enough

The classes give you Microsoft's defaults. When you need something genuinely off-pattern — custom severity colors, non-Fluent typography, animations beyond the built-in motion — fall back to the [Style Properties Reference](./styleproperties.md) and combine `class` (for the base treatment) with `style` (for the deltas). The two coexist on the same element.
