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
| **Flexbox** | `flex`, `flex-grow`, `flex-shrink`, `flex-flow`, `flex-direction`, `flex-wrap`, `justify-content`, `align-items` |
| **Legacy box (2009 spec)** | `box-align`, `box-direction`, `box-flex`, `box-flex-group`, `box-lines`, `box-ordinal-group`, `box-orient`, `box-pack` |
| **Multi-column** | `columns`, `column-count`, `column-fill`, `column-gap`, `column-span`, `column-width`, `column-rule`, `column-rule-color`, `column-rule-style`, `column-rule-width` |
| **Grid (legacy only)** | `grid-columns`, `grid-rows` |
| **Tables** | `border-collapse`, `border-spacing`, `caption-side`, `empty-cells`, `table-layout` |
| **Typography** | `font`, `font-family`, `font-size`, `font-size-adjust`, `font-stretch`, `font-style`, `font-variant`, `font-weight`, `color`, `direction`, `letter-spacing`, `line-height`, `text-align`, `text-align-last`, `text-decoration`, `text-indent`, `text-justify`, `text-outline`, `text-overflow`, `text-shadow`, `text-transform`, `text-wrap`, `unicode-bidi`, `vertical-align`, `white-space`, `word-break`, `word-spacing`, `word-wrap`, `hanging-punctuation`, `punctuation-trim`, `-webkit-line-clamp` |
| **Effects** | `opacity`, `cursor`, `transform` *(translate only)*, `rotation`, `rotation-point` |
| **Images / SVG** | `object-fit`, `fill`, `fill-opacity`, `stroke` |
| **Inline editor CSS variables** | `--inline-editor-border-width`, `--inline-editor-border-style`, `--inline-editor-border-radius`, `--inline-editor-border-color` |

!!! warning "Things you might *expect* to work but don't"
    These look like CSS but the SharePoint formatter strips them: `gap`, `row-gap`, `align-self`, `align-content`, `justify-items`, `justify-self`, `place-items`, `place-content`, `place-self`, `order`, `aspect-ratio`, `inset`, `grid-template-columns`, `grid-template-rows`, `grid-template-areas`, `grid-area`, `grid-column`, `grid-row`, `gap`, `transition`, `animation`, `filter`, `backdrop-filter`, `mix-blend-mode`, `clip-path`, `mask`, `will-change`, `pointer-events`, custom CSS variables (other than the four `--inline-editor-*` ones above), full `transform` (only `translate(...)` is honored), `float` (deprecated and quietly ignored).

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

!!! danger "Not supported (despite being valid CSS)"
    `align-self`, `align-content`, `justify-items`, `justify-self`, `place-*`, `order`, `gap`, `row-gap`, `column-gap` (yes, `column-gap` exists in the allow-list but it only applies to **multi-column layout**, not flex). Plan around them.

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
    - **Faking `gap`:** Use `margin: 4px` on every child plus `margin: -4px` on the container, or simpler - `padding` on each child and rely on its own background. SharePoint's renderer ignores real `gap`.
    - **`flex: 1 1 240px` is the responsive magic line.** Children grow to fill, shrink as needed, and wrap once each card would dip below 240px. This single declaration gives you a fully fluid card grid without media queries.
    - **No `align-self`?** Wrap the misbehaving child in *another* flex container with its own `align-items`. A 1-deep extra `<div>` is cheap.
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

This is **CSS multi-column** (newspaper-style flowing text), not Grid. Useful for long `description` or `notes` fields:

```json
{
  "elmType": "div",
  "style": {
    "column-count": "=if(@window.innerWidth < 800, '1', '2')",
    "column-gap": "16px",
    "column-rule": "1px solid #eee"
  },
  "txtContent": "[$LongDescription]"
}
```

!!! tip
    `column-width` instead of `column-count` is the responsive-friendly variant: `"column-width": "240px"` flows into as many columns as fit. No `@window.innerWidth` required.

---

## Grid (mostly unavailable)

Only `grid-columns` and `grid-rows` are accepted, and they're the **old IE10 `-ms-grid` placeholders**. Modern `display: grid` plus `grid-template-columns`, `grid-template-rows`, `grid-template-areas`, `grid-area`, `gap`, etc. **are not in the allow-list and are stripped**.

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

## Tables

`border-collapse`, `border-spacing`, `caption-side`, `empty-cells`, `table-layout`. Useful when you set `display: table`/`table-cell` on children to fake a grid.

```json
{
  "style": { "display": "table", "table-layout": "fixed", "width": "100%", "border-collapse": "collapse" }
}
```

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

If a property you need (`gap`, `transition`, `grid-template-columns`, full `transform`, etc.) is stripped:

1. **Use a SharePoint utility class** via the `attributes.class` property. The site already documents [every available class](../groupings/classes/ms-bgColor.md) - those rules ship in SharePoint's stylesheet and bypass the schema filter entirely.
2. **Approximate with what is allowed.** Most missing properties have a one-line workaround documented above (margin instead of gap, flex-wrap instead of grid, etc.).
3. **Promote to a SPFx Field Customizer** when the visual genuinely cannot be expressed declaratively. That's the official escape hatch.
