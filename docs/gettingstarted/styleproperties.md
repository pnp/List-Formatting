# Style Properties Reference

The definitive list of every CSS property that the modern SharePoint List Formatting engine accepts inside a `style` block, with practical Pro tips for the flex, responsive, and otherwise interesting ones.

The schema is enforced by SharePoint's renderer: any property name **not** in this list is silently dropped. Property values can be hard-coded strings, [special tokens](https://learn.microsoft.com/sharepoint/dev/declarative-customization/formatting-syntax-reference#special-string-values), or [Expression objects](https://learn.microsoft.com/sharepoint/dev/declarative-customization/formatting-syntax-reference#expressions) (Excel-style `=` formulas or AST `{operator, operands}` form).

!!! info "Source of truth"
    The allow-list below is taken directly from the [Microsoft Learn formatting syntax reference](https://learn.microsoft.com/sharepoint/dev/declarative-customization/formatting-syntax-reference#style). When Microsoft adds a new property the schema in the Monaco editor will pick it up first - press `Ctrl+Space` inside `"style": { ... }` for live autocomplete.

---

## At-a-glance

| Category | Properties |
| --- | --- |
| **Box model** | `width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `box-sizing`, `box-shadow`, `box-decoration-break` |
| **Spacing** | `margin`, `margin-top/right/bottom/left`, `padding`, `padding-top/right/bottom/left` |
| **Borders** | `border`, `border-top/right/bottom/left` (and each `-color`/`-style`/`-width`), `border-color`, `border-style`, `border-width` |
| **Border radius** | `border-radius`, `border-top-left-radius`, `border-top-right-radius`, `border-bottom-left-radius`, `border-bottom-right-radius` |
| **Outline** | `outline`, `outline-color`, `outline-style`, `outline-width` |
| **Backgrounds & fills** | `background-color`, `background-image`, `fill`, `fill-opacity`, `stroke` |
| **Layout & position** | `display`, `position`, `top`, `right`, `bottom`, `left`, `z-index`, `clear`, `clip`, `visibility`, `overflow`, `overflow-x`, `overflow-y`, `overflow-style`, `float` *(deprecated)* |
| **Flexbox** | `flex`, `flex-grow`, `flex-shrink`, `flex-flow`, `flex-direction`, `flex-wrap`, `justify-content`, `align-items`, `gap`, `align-self` |
| **Legacy box (2009 spec)** | `box-align`, `box-direction`, `box-flex`, `box-flex-group`, `box-lines`, `box-ordinal-group`, `box-orient`, `box-pack` |
| **Multi-column** | `columns`, `column-count`, `column-fill`, `column-gap`, `column-span`, `column-width`, `column-rule`, `column-rule-color`, `column-rule-style`, `column-rule-width` |
| **Grid (legacy only)** | `grid-columns`, `grid-rows` |
| **Tables** | `border-collapse`, `border-spacing`, `caption-side`, `empty-cells`, `table-layout` |
| **Typography** | `font`, `font-family`, `font-size`, `font-size-adjust`, `font-stretch`, `font-style`, `font-variant`, `font-weight`, `color`, `direction`, `letter-spacing`, `line-height`, `text-align`, `text-align-last`, `text-decoration`, `text-indent`, `text-justify`, `text-outline`, `text-overflow`, `text-shadow`, `text-transform`, `text-wrap`, `unicode-bidi`, `vertical-align`, `white-space`, `word-break`, `word-spacing`, `word-wrap`, `hanging-punctuation`, `punctuation-trim`, `-webkit-line-clamp` |
| **Effects** | `opacity`, `cursor`, `transform` *(translate only)*, `rotation`, `rotation-point` |
| **Images / SVG** | `object-fit`, `fill`, `fill-opacity`, `stroke` |
| **Inline editor CSS variables** | `--inline-editor-border-width`, `--inline-editor-border-style`, `--inline-editor-border-radius`, `--inline-editor-border-color` |

!!! warning "Things you might *expect* to work but don't"
    These look like CSS but the SharePoint formatter strips them: `row-gap`, `column-gap` *(in flex context — works in multi-column)*, `align-content`, `justify-items`, `justify-self`, `place-items`, `place-content`, `place-self`, `order`, `aspect-ratio`, `inset`, `grid-template-columns`, `grid-template-rows`, `grid-template-areas`, `grid-area`, `grid-column`, `grid-row`, `transition`, `animation`, `filter`, `backdrop-filter`, `mix-blend-mode`, `clip-path`, `mask`, `will-change`, `pointer-events`, custom CSS variables (other than the four `--inline-editor-*` ones above), full `transform` (only `translate(...)` is honored), `float` (deprecated and quietly ignored).

    **Updated 2026-05:** `gap` (shorthand) and `align-self` were previously listed here but **empirical testing confirms both work** in deployed formatters. `getComputedStyle` returns the set values. Only the longhands `row-gap` and `column-gap` remain stripped in flex context.

    **Pro tip:** when you need any of these, fall back to one of the [Fluent / sp-css utility classes](../groupings/classes/ms-bgColor.md) via the `className` attribute - those are CSS rules that ship with SharePoint and survive the schema filter.

---

## Sizing & the box model

`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `box-sizing`, `box-shadow`, `box-decoration-break`.

```json
{
  "elmType": "div",
  "style": {
    "box-sizing": "border-box",
    "width": "100%",
    "max-width": "320px",
    "min-height": "44px",
    "box-shadow": "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
  }
}
```

!!! tip "Pro tips"
    - **Always set `box-sizing: border-box` on flex/card containers** so padding doesn't blow your `width: 100%` past the parent.
    - `width: 100%` + `max-width: <px>` is the SharePoint-friendly way to fake `clamp()` (which isn't allowed). Use it on cards in Gallery view to keep them readable on ultrawide monitors.
    - `box-shadow` accepts the full CSS syntax, including multiple comma-separated shadows. The "Material elevation" feel = `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)` for resting and `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)` on hover (you can swap via `=if([!isHover]...)` patterns or a Fluent class).
    - Set `min-width: 0` on flex children that contain long text - without it, flex items refuse to shrink below their content's intrinsic min-content width and your ellipsis breaks.

---

## Flexbox - the responsive workhorse

The supported subset:

| Property | Value cheatsheet |
| --- | --- |
| `display` | `flex`, `inline-flex`, `block`, `inline-block`, `none`, `inline`, `table`, `table-cell`, `table-row` |
| `flex-direction` | `row`, `row-reverse`, `column`, `column-reverse` |
| `flex-wrap` | `nowrap`, `wrap`, `wrap-reverse` |
| `flex-flow` | shorthand for `<flex-direction> <flex-wrap>` |
| `flex` | shorthand for `<flex-grow> <flex-shrink> <flex-basis>` |
| `flex-grow` | unitless number, e.g. `1` |
| `flex-shrink` | unitless number, e.g. `0` |
| `justify-content` | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` |
| `align-items` | `stretch`, `flex-start`, `flex-end`, `center`, `baseline` |
| `align-self` | `auto`, `flex-start`, `flex-end`, `center`, `baseline`, `stretch` |
| `gap` | shorthand, e.g. `"40px"` or `"20px 10px"` (row column). **Works as of 2026.** |

!!! danger "Not supported (despite being valid CSS)"
    `align-content`, `justify-items`, `justify-self`, `place-*`, `order`, `row-gap`, `column-gap` (yes, `column-gap` exists in the allow-list but it only applies to **multi-column layout**, not flex). Plan around them.

!!! success "Updated 2026-05 — `gap` and `align-self` now work"
    Empirical testing on a live SPO tenant (May 2026) confirmed that the `gap` shorthand and `align-self` render correctly in deployed formatters. `getComputedStyle()` returns the set values. The `row-gap` and `column-gap` longhands remain stripped in flex context. Microsoft likely added these to the allow-list without updating the docs.

### The canonical responsive card row

```json
{
  "elmType": "div",
  "style": {
    "display": "flex",
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "justify-content": "flex-start",
    "align-items": "stretch",
    "padding": "8px"
  },
  "children": [
    {
      "elmType": "div",
      "style": {
        "flex": "1 1 240px",
        "min-width": "0",
        "margin": "4px",
        "padding": "12px",
        "box-sizing": "border-box",
        "border-radius": "8px",
        "background-color": "#ffffff",
        "box-shadow": "0 1px 3px rgba(0,0,0,0.12)"
      },
      "txtContent": "[$Title]"
    }
  ]
}
```

!!! tip "Pro tips for flex"
    - **`gap` works!** As of 2026, `gap: "8px"` on a flex container renders correctly. No more margin hacks needed. Note: only the shorthand `gap` is supported — the longhands `row-gap` and `column-gap` are still stripped in flex context.
    - **`flex: 1 1 240px` is the responsive magic line.** Children grow to fill, shrink as needed, and wrap once each card would dip below 240px. This single declaration gives you a fully fluid card grid without media queries.
    - **`align-self` works!** As of 2026, you can use `align-self: center` (or `stretch`, `flex-start`, `flex-end`, `baseline`) directly on flex children. No more wrapper-div workarounds.
    - **No `order`?** Render the children in the order you want using `forEach` over an expression that returns a sorted array, or branch with two `children` arrays inside an `=if(...)` style trick. In practice, just author them in the right order.
    - **Vertical centering** = `display: flex` + `align-items: center` + `justify-content: center` on the parent. Works on any element, including a `span`.
    - **Stretching children to equal height** is `align-items: stretch` (default) - just don't set `height` on children.
    - **Sticky-style "push to right" element**: give the element before it `flex-grow: 1` so it eats the remaining space. (No `margin-left: auto` shortcut here, but that *does* work because `margin` is allowed.)

### Responsive without media queries

SharePoint formatters can't define `@media` rules, but you have two mechanisms:

1. **`@window.innerWidth` token** - read once at render and branch on it:

    ```json
    {
      "elmType": "div",
      "style": {
        "display": "flex",
        "flex-direction": "=if(@window.innerWidth < 600, 'column', 'row')",
        "padding": "=if(@window.innerWidth < 600, '4px', '12px')",
        "font-size": "=if(@window.innerWidth < 600, '12px', '14px')"
      }
    }
    ```

    !!! warning
        `@window.innerWidth` is captured at render time, not on resize. It's perfect for "phone vs. desktop" branching, awkward for live window resizing. The list re-renders when you switch views, sort, or filter, so the value refreshes often enough in practice.

2. **Fluid layouts via `flex-wrap: wrap` + `flex: 1 1 <basis>`** - this is the preferred approach because it adapts continuously, not just at one breakpoint.

!!! tip "Hybrid pattern"
    Use fluid flex for the layout, then use `@window.innerWidth` only to swap *content density* (font-size, padding, hide a column) at the small-screen extreme.

### Legacy `box-*` properties

`box-align`, `box-direction`, `box-flex`, `box-flex-group`, `box-lines`, `box-ordinal-group`, `box-orient`, `box-pack` come from the **2009 flexbox spec**. They're in the allow-list for compatibility with very old WebKit/Edge engines but should **not** be used in new formatters - modern Edge/Chrome ignore them. Use the standard `flex-*` family instead.

---

## Multi-column layout

`columns`, `column-count`, `column-fill`, `column-gap`, `column-rule`, `column-rule-color`, `column-rule-style`, `column-rule-width`, `column-span`, `column-width`.

This is **CSS multi-column** (newspaper-style flowing text), not Grid. The renderer takes the **height** of the container and **flows** the children top-to-bottom, then wraps to the next column. It's the right tool when you have a single blob of content (a long description, a bullet list, a notes field) that should fill horizontal space — and the wrong tool when you have discrete "cards" you don't want sliced in half.

| Property | What it does | Typical value |
| --- | --- | --- |
| `columns` | Shorthand for `<column-width> <column-count>` | `"240px 3"` |
| `column-count` | Force *exactly* N columns regardless of width | `"2"` |
| `column-width` | "*At least* this wide" — engine fits as many as possible | `"240px"` |
| `column-gap` | Space between columns. In multi-column context this works; in flex context use the `gap` shorthand instead. | `"16px"` |
| `column-rule` | Vertical divider between columns. Shorthand for `<width> <style> <color>` | `"1px solid #eee"` |
| `column-rule-color` / `-style` / `-width` | Long-hand pieces of the same divider | `"#ddd"` / `"dashed"` / `"2px"` |
| `column-fill` | `balance` (default — equal-height columns) or `auto` (fill first column to container height before overflowing) | `"balance"` |
| `column-span` | `"all"` lets one element break out and span every column (perfect for section headers) | `"all"` |

### Recipe: responsive newspaper layout for a Notes field

```json
{
  "elmType": "div",
  "style": {
    "column-width": "240px",
    "column-gap": "24px",
    "column-rule": "1px solid #e1dfdd",
    "column-fill": "balance",
    "padding": "12px",
    "line-height": "1.5"
  },
  "txtContent": "[$Notes]"
}
```

### Recipe: spanning section header inside a multi-column block

```json
{
  "elmType": "div",
  "style": { "column-count": "2", "column-gap": "20px" },
  "children": [
    {
      "elmType": "div",
      "style": {
        "column-span": "all",
        "font-weight": "600",
        "font-size": "18px",
        "padding-bottom": "8px",
        "border-bottom": "2px solid #0078d4",
        "margin-bottom": "8px"
      },
      "txtContent": "[$Title]"
    },
    { "elmType": "div", "txtContent": "[$Description]" }
  ]
}
```

!!! tip "Pro tips for multi-column"
    - **`column-width` beats `column-count` for responsive layouts.** With `column-width: 240px` the engine produces 1 column on a phone, 2-3 on a tablet, and 4+ on a desktop — *without a single media query or `@window.innerWidth` branch*. This is the single most underused responsive trick in SharePoint formatting.
    - **`column-gap` works in multi-column context.** For flex layouts, use the `gap` shorthand instead (confirmed working as of 2026).
    - **`column-fill: auto` for sidebars.** When you want a short list to stay in one column instead of being awkwardly balanced into two short stubby columns, set `column-fill: auto` and a fixed `height` on the container.
    - **`column-span: all` is unreliable inside very tall containers** on older Edge builds — test in the browsers your tenant supports. When it works it's magic for a "headline + body" two-up.
    - **Avoid multi-column for card grids.** If each child has its own border/shadow, the renderer can slice one across a column break and look broken. `flex-wrap: wrap` is the right answer for cards.
    - **`column-rule` doesn't take layout space** (it's painted *in* the `column-gap`), so changing rule width never reflows your content. Great for hover-reveal dividers driven by an expression.
    - **Pair with `-webkit-line-clamp`** to keep each "column-card" to a fixed line count: prevents the column-break-mid-card issue above.

---

## Grid (mostly unavailable)

Only `grid-columns` and `grid-rows` are accepted, and they're the **old IE10 `-ms-grid` placeholders**. Modern `display: grid` plus `grid-template-columns`, `grid-template-rows`, `grid-template-areas`, `grid-area`, etc. **are not in the allow-list and are stripped**. (Note: the `gap` shorthand works in flex context but not grid context since `display: grid` itself is stripped.)

**Do this instead:** use Flexbox + `flex-wrap` for grid-like layouts. It covers 90% of grid use cases inside a list view.

---

## Borders, radii, outlines

All four sides plus shorthands and the four radius corners are honored.

```json
{
  "style": {
    "border": "1px solid #d1d1d1",
    "border-left": "4px solid #0078d4",
    "border-radius": "6px",
    "outline": "2px dashed transparent"
  }
}
```

!!! tip "Pro tips"
    - **Status pills:** `border-radius: 999px` + `padding: 2px 10px` + `background-color` = a perfect Fluent pill, no class needed.
    - **Severity bars:** A 4-6px coloured `border-left` on a row card is the cleanest "criticality indicator" you can build. Drive the colour from an expression: `"border-left-color": "=if([$Priority]=='High','#d13438','#107c10')"`.
    - **`outline` doesn't take layout space** - use it for hover rings without pushing the layout. Pair with the `--inline-editor-border-color` variables on `inlineEditField` elements.

---

## Backgrounds, fills, SVG

`background-color`, `background-image`, `fill`, `fill-opacity`, `stroke`.

!!! tip
    - `background-image` accepts a `url(...)` value but the URL must pass [SharePoint's image domain allow-list](https://support.microsoft.com/office/allow-or-restrict-the-ability-to-embed-content-on-sharepoint-pages-e7baf83f-09d0-4bd1-9058-4aa483ee137b). Tenant URLs and `cdn.office.net` always work.
    - **CSS gradients work** inside `background-image`: `"background-image": "linear-gradient(135deg, #0078d4, #5c2d91)"`. Solid `background-color` is the fallback when a gradient isn't allowed for the current build.
    - For SVG `path`/`svg` `elmType`, drive the colour with `fill` and `stroke` - the regular `color` property won't paint SVGs.

---

## Position, display, layering

`position`, `top`, `right`, `bottom`, `left`, `z-index`, `display`, `visibility`, `clear`, `clip`, `overflow`, `overflow-x`, `overflow-y`.

```json
{
  "style": {
    "position": "relative",
    "overflow": "hidden",
    "display": "=if([$Hidden]=='Yes','none','flex')"
  }
}
```

!!! tip "Pro tips"
    - **Hide an element conditionally** with `"display": "=if(<cond>,'none','')"`. The empty string is the magic value that removes the inline rule and lets the default cascade win.
    - `position: absolute` anchors to the nearest positioned ancestor - so always set `position: relative` on the container if you want a badge in a corner.
    - **Truncate to one line:** `overflow: hidden` + `text-overflow: ellipsis` + `white-space: nowrap` (all three are required and all three are supported).
    - **Truncate to N lines:** use `-webkit-line-clamp` (it's allow-listed!): `display: -webkit-box`, `-webkit-line-clamp: 3`, `overflow: hidden`. Even though `-webkit-box-orient: vertical` isn't in the list, modern engines treat `display: -webkit-box` + `-webkit-line-clamp` as enough.

---

## Typography

The full Western typography stack is supported: `font`, `font-family`, `font-size`, `font-style`, `font-variant`, `font-weight`, `font-stretch`, `font-size-adjust`, `color`, `letter-spacing`, `line-height`, `text-align`, `text-align-last`, `text-decoration`, `text-indent`, `text-justify`, `text-outline`, `text-overflow`, `text-shadow`, `text-transform`, `text-wrap`, `unicode-bidi`, `vertical-align`, `white-space`, `word-break`, `word-spacing`, `word-wrap`, `hanging-punctuation`, `punctuation-trim`, `direction`, `-webkit-line-clamp`.

!!! tip "Pro tips"
    - **Stick to Fluent's font stack** for visual consistency: `"font-family": "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif"`.
    - For RTL-aware lists, set `"direction": "rtl"` on the row container - all the alignment props auto-flip.
    - `text-shadow` is a cheap way to make text legible on photo backgrounds: `"text-shadow": "0 1px 2px rgba(0,0,0,0.6)"`.
    - The `ms-font-*`, `ms-fontSize-*`, `ms-fontWeight-*` Fluent classes (applied via `className`) are usually preferable to inline values - they automatically follow theme changes.

---

## Effects

`opacity`, `cursor`, `transform` (only `translate(x)` and `translate(x, y)`), `rotation`, `rotation-point`.

!!! warning
    `transform` is **drastically** restricted. Only translate works:

    ```json
    "transform": "translate(0, -2px)"
    ```

    `rotate`, `scale`, `skew`, `matrix` etc. are silently dropped. For rotation, use a Fluent animation class via `className` (`ms-motion-*`) or rely on `rotation`/`rotation-point` which are the IE-era equivalents (limited engine support today).

!!! tip
    - `cursor: "pointer"` on any element with a `customRowAction` makes the affordance obvious.
    - `opacity` works in expressions: `"opacity": "=if([$Status]=='Inactive','0.5','1')"` to dim completed/inactive rows.

---

## Inline editor CSS variables

When an element uses `inlineEditField`, four custom properties are available to style its hover and focus rings:

- `--inline-editor-border-width`
- `--inline-editor-border-style`
- `--inline-editor-border-radius`
- `--inline-editor-border-color`

```json
{
  "elmType": "div",
  "inlineEditField": "[$Status]",
  "txtContent": "[$Status]",
  "style": {
    "--inline-editor-border-color": "transparent transparent #0078d4 transparent",
    "--inline-editor-border-style": "solid",
    "--inline-editor-border-width": "0 0 2px 0",
    "--inline-editor-border-radius": "0"
  }
}
```

!!! tip
    Pass a 4-side TRBL value to draw an underline-only editor ring. This is the recommended way to make inline editing feel like a Material text field instead of a chunky bordered box. These are the **only** CSS custom properties the renderer respects - generic `--my-color` won't survive.

---

## Tables (and why you should care even when you don't think you need one)

Five properties: `border-collapse`, `border-spacing`, `caption-side`, `empty-cells`, `table-layout`. They look unglamorous next to flexbox until you realize **`display: table` + `display: table-cell` is the cleanest workaround for almost every layout limitation in the SharePoint allow-list.** No `grid-template-columns`? Tables. Need inter-cell spacing? `border-spacing`. Need bullet-proof vertical centering? Table-cell with `vertical-align: middle`. (Note: `gap` and `align-self` now work in flex — see Flexbox section — but tables remain the best choice for true equal-width columns.)

| Property | What it does | Typical value |
| --- | --- | --- |
| `table-layout` | `fixed` = column widths set by the first row, **fast and predictable**. `auto` = browser measures every cell, slow and unpredictable. | `"fixed"` |
| `border-collapse` | `collapse` (one shared border per edge) vs `separate` (every cell has its own border, with `border-spacing` between them) | `"collapse"` |
| `border-spacing` | Distance between cells. **Only takes effect when `border-collapse: separate`.** Can be `<h>` or `<h> <v>`. This is the **only way** to add inter-element spacing in a table context without margins. | `"8px 12px"` |
| `caption-side` | `top` or `bottom` — position of a `<caption>` element relative to the table. | `"top"` |
| `empty-cells` | `show` or `hide` — whether cells with no content render their background/border. | `"hide"` |

### The four `display` values that unlock all this

These work on **any** element (`div`, `span`, etc.), not just `<table>`:

| `display` value | Behaves like an HTML element |
| --- | --- |
| `table` | `<table>` (the container) |
| `table-row` | `<tr>` |
| `table-cell` | `<td>` — this is the magic one |
| `inline-block` | not table-y, but the partner-in-crime for "shrink-to-fit width" cells |

### Recipe: rock-solid 3-column equal-height row (no flexbox)

Useful when you need *guaranteed equal height* without depending on `align-items: stretch` quirks:

```json
{
  "elmType": "div",
  "style": {
    "display": "table",
    "width": "100%",
    "table-layout": "fixed",
    "border-collapse": "separate",
    "border-spacing": "12px 0"
  },
  "children": [
    {
      "elmType": "div",
      "style": { "display": "table-cell", "vertical-align": "middle", "padding": "12px", "background-color": "#faf9f8", "border-radius": "6px" },
      "txtContent": "[$Title]"
    },
    {
      "elmType": "div",
      "style": { "display": "table-cell", "vertical-align": "middle", "padding": "12px", "background-color": "#faf9f8", "border-radius": "6px" },
      "txtContent": "[$Status]"
    },
    {
      "elmType": "div",
      "style": { "display": "table-cell", "vertical-align": "middle", "padding": "12px", "background-color": "#faf9f8", "border-radius": "6px" },
      "txtContent": "[$AssignedTo.title]"
    }
  ]
}
```

Three benefits over the flex equivalent:

1. The three cells are **mathematically equal width** without any `flex-basis` math.
2. They're **automatically equal height** without `align-items: stretch`.
3. `border-spacing: 12px 0` gives you a horizontal gap — though as of 2026, flex `gap` also works.

### Recipe: vertical-centering anything

Probably the most useful one. Flex centering wraps you in a flex container with all its baggage. Table-cell centering is local and works inside any context:

```json
{
  "elmType": "div",
  "style": {
    "display": "table-cell",
    "vertical-align": "middle",
    "text-align": "center",
    "height": "44px"
  },
  "txtContent": "[$Status]"
}
```

`vertical-align: middle` only does the intuitive thing inside `table-cell` (or on inline elements). Knowing this saves you hours of flex debugging.

### Recipe: a true data table inside a row formatter

For Gallery cards that present mini-spec sheets (key/value pairs):

```json
{
  "elmType": "div",
  "style": {
    "display": "table",
    "width": "100%",
    "table-layout": "fixed",
    "border-collapse": "collapse"
  },
  "children": [
    {
      "elmType": "div",
      "style": { "display": "table-row" },
      "children": [
        {
          "elmType": "div",
          "style": {
            "display": "table-cell",
            "padding": "6px 8px",
            "width": "40%",
            "color": "#605e5c",
            "border-bottom": "1px solid #edebe9",
            "font-weight": "600",
            "vertical-align": "top"
          },
          "txtContent": "Owner"
        },
        {
          "elmType": "div",
          "style": {
            "display": "table-cell",
            "padding": "6px 8px",
            "border-bottom": "1px solid #edebe9",
            "vertical-align": "top"
          },
          "txtContent": "[$Owner.title]"
        }
      ]
    },
    {
      "elmType": "div",
      "style": { "display": "table-row" },
      "children": [
        {
          "elmType": "div",
          "style": {
            "display": "table-cell",
            "padding": "6px 8px",
            "color": "#605e5c",
            "border-bottom": "1px solid #edebe9",
            "font-weight": "600",
            "vertical-align": "top"
          },
          "txtContent": "Due"
        },
        {
          "elmType": "div",
          "style": {
            "display": "table-cell",
            "padding": "6px 8px",
            "border-bottom": "1px solid #edebe9",
            "vertical-align": "top"
          },
          "txtContent": "=toLocaleDateString([$DueDate])"
        }
      ]
    }
  ]
}
```

!!! tip "Pro tips for tables"
    - **`table-layout: fixed` is non-negotiable.** Without it the renderer does an `auto` pass that measures every cell — slow on long lists and the column widths jitter as data changes. With `fixed`, the **first row's `width` values define every subsequent row** and the engine just paints.
    - **`border-spacing` is your `gap`.** The trick is `border-collapse: separate` (the *default*, but always set it explicitly so a future reader isn't confused) plus `border-spacing: <h> <v>`. Negative values aren't allowed, so if you need to *remove* spacing you set it to `0`.
    - **`empty-cells: hide` cleans up sparse data.** If a row has nulls for half its columns and you've given each cell a background, `empty-cells: hide` makes the empty ones invisible (no border, no bg) without you writing `=if(...)` everywhere.
    - **Mixing `display: table` with flex parents works fine** — the table behaves like a single flex item from the outside. Wrap a table-display block inside a `display: flex` row to combine the strengths of both.
    - **No `colspan` / `rowspan`.** Those are HTML attributes, not CSS, and `attributes.colspan` is not in the allow-list. To fake a colspan: use a single `table-cell` with no siblings in its `table-row`, and give it `width: 100%`.
    - **Tables are the only way to get true equal-width children without flexbox math.** `display: table` + `table-layout: fixed` divides the available width exactly evenly among siblings with `display: table-cell` (or honors explicit `width: X%` values across the row).
    - **`caption-side` is rarely useful** in formatter output (you'd need a `<caption>` element, and `caption` isn't a valid `elmType`). Skip it.
    - **Performance note:** for views with thousands of rows, a deeply nested `display: table` row formatter renders faster than a `display: flex` one with lots of conditional logic, because the engine doesn't re-measure on each render.

### When to pick table vs. flex vs. multi-column

| Need | Best choice |
| --- | --- |
| Card row that wraps to next line | **flex** (`flex-wrap: wrap` + `flex: 1 1 240px`) |
| 2-3 fixed columns with equal heights | **table** (`display: table` + `table-cell`) |
| Vertical centering one element inside another | **table-cell** + `vertical-align: middle` |
| Long flowing text into N columns | **multi-column** (`column-width: 240px`) |
| Spec-sheet style key/value pairs | **table** (cleaner than flex per row) |
| Sidebar + main content | **flex** (`flex: 0 0 240px` + `flex: 1 1 0`) |
| Inter-item spacing without margin math | **flex** (`gap`) or **table** (`border-spacing`) or **multi-column** (`column-gap`) |

---

## Putting it together: a fully responsive card

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/sp/v2/row-formatting.schema.json",
  "elmType": "div",
  "style": {
    "display": "flex",
    "flex-direction": "=if(@window.innerWidth < 600, 'column', 'row')",
    "align-items": "stretch",
    "box-sizing": "border-box",
    "width": "100%",
    "padding": "12px",
    "margin": "6px 0",
    "border-radius": "8px",
    "border-left": "4px solid",
    "border-left-color": "=if([$Priority]=='High','#d13438',if([$Priority]=='Medium','#ffaa44','#107c10'))",
    "background-color": "#ffffff",
    "box-shadow": "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
  },
  "children": [
    {
      "elmType": "div",
      "style": {
        "flex": "1 1 0",
        "min-width": "0",
        "padding-right": "12px",
        "overflow": "hidden",
        "text-overflow": "ellipsis",
        "white-space": "nowrap",
        "font-weight": "600"
      },
      "txtContent": "[$Title]"
    },
    {
      "elmType": "div",
      "style": {
        "flex": "0 0 auto",
        "padding": "2px 10px",
        "border-radius": "999px",
        "color": "#ffffff",
        "background-color": "=if([$Status]=='Done','#107c10','#0078d4')",
        "font-size": "12px"
      },
      "txtContent": "[$Status]"
    }
  ]
}
```

This card:

- Stacks vertically on screens narrower than 600px, sits horizontally otherwise.
- Has a colour-coded severity bar driven by `[$Priority]`.
- Truncates the title with an ellipsis using the supported `overflow` + `text-overflow` + `white-space` trio.
- Uses a status pill via `border-radius: 999px` and a coloured `background-color`.

---

## When the allow-list isn't enough

If a property you need (`transition`, `grid-template-columns`, full `transform`, etc.) is stripped:

1. **Use a SharePoint utility class** via the `attributes.class` property. The site already documents [every available class](../groupings/classes/ms-bgColor.md) - those rules ship in SharePoint's stylesheet and bypass the schema filter entirely.
2. **Approximate with what is allowed.** Most missing properties have a one-line workaround documented above (flex-wrap instead of grid, etc.).
