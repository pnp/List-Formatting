
import { SCHEMA_URI } from "../FormatterConstants";

export const testInputs = [
  // ── Basic element support ──────────────────────────────────
  {
    name: 'simple div element',
    html: `<div>SolidTest</div>`,
    css: ``,
    expected: { "$schema": SCHEMA_URI, "elmType": "div", "txtContent": "SolidTest" }
  },
  {
    name: 'span element',
    html: `<span>inline text</span>`,
    css: ``,
    expected: { "$schema": SCHEMA_URI, "elmType": "span", "txtContent": "inline text" }
  },
  {
    name: 'p element',
    html: `<p>paragraph text</p>`,
    css: ``,
    expected: { "$schema": SCHEMA_URI, "elmType": "p", "txtContent": "paragraph text" }
  },
  {
    name: 'button element',
    html: `<button>Click me</button>`,
    css: ``,
    expected: { "$schema": SCHEMA_URI, "elmType": "button", "txtContent": "Click me" }
  },

  // ── Unsupported elements ───────────────────────────────────
  {
    name: 'script tag is removed',
    html: `<script src="abc.js">p Tag unsupported</script>`,
    css: ``,
    expected: undefined
  },
  {
    name: 'script tag inside html body is removed',
    html: `<html><body><script src="abc.js">p Tag unsupported</script></body></html>`,
    css: ``,
    expected: undefined
  },
  {
    name: 'unsupported children do not append nulls into json',
    html: `<div><ul><li>test-list-item-01</li></ul></div>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "children": []
    }
  },
  {
    name: 'mixed supported and unsupported children',
    html: `<div><span>kept</span><h1>dropped</h1><span>also kept</span></div>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "children": [
        { "elmType": "span", "txtContent": "kept" },
        { "elmType": "span", "txtContent": "also kept" }
      ]
    }
  },

  // ── Attribute handling ─────────────────────────────────────
  {
    name: 'anchor with href and target',
    html: `<a href="https://example.com" target="_blank">link</a>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "a",
      "attributes": { "href": "https://example.com", "target": "_blank" },
      "txtContent": "link"
    }
  },
  {
    name: 'image with src and alt',
    html: `<img src="photo.png" alt="A photo"/>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "img",
      "attributes": { "src": "photo.png", "alt": "A photo" }
    }
  },
  {
    name: 'iconName attribute (lowercased by HTML parser)',
    html: `<span iconName="Mail">icon</span>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "span",
      "attributes": { "iconname": "Mail" },
      "txtContent": "icon"
    }
  },
  {
    name: 'data-interception attribute',
    html: `<a href="/page" data-interception="on">nav link</a>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "a",
      "attributes": { "href": "/page", "data-interception": "on" },
      "txtContent": "nav link"
    }
  },
  {
    name: 'aria-label attribute is allowed',
    html: `<div role="alert" aria-label="Warning">caution</div>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "attributes": { "role": "alert", "aria-label": "Warning" },
      "txtContent": "caution"
    }
  },
  {
    name: 'aria-hidden attribute is allowed',
    html: `<span aria-hidden="true">hidden</span>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "span",
      "attributes": { "aria-hidden": "true" },
      "txtContent": "hidden"
    }
  },
  {
    name: 'draggable attribute',
    html: `<div draggable="true">drag me</div>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "attributes": { "draggable": "true" },
      "txtContent": "drag me"
    }
  },
  {
    name: 'unknown attributes are filtered out',
    html: `<div id="myid" onclick="alert(1)" class="valid">text</div>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "attributes": { "class": "valid" },
      "txtContent": "text"
    }
  },

  // ── SVG support ────────────────────────────────────────────
  {
    name: 'svg with viewBox and path with d attribute',
    html: `<svg viewBox="0 0 24 24"><path d="M12 2L2 22h20z"></path></svg>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "svg",
      "attributes": { "viewBox": "0 0 24 24" },
      "children": [
        { "elmType": "path", "attributes": { "d": "M12 2L2 22h20z" } }
      ]
    }
  },
  {
    name: 'svg with preserveAspectRatio',
    html: `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"></svg>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "svg",
      "attributes": { "viewBox": "0 0 100 100", "preserveAspectRatio": "xMidYMid meet" }
    }
  },

  // ── Style handling ─────────────────────────────────────────
  {
    name: 'inline style parsed to object',
    html: `<div style="color:red;font-size:14px">styled</div>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "style": { "color": "red", "font-size": "14px" },
      "txtContent": "styled"
    }
  },
  {
    name: 'style values containing colons are preserved',
    html: `<div style="background-image: url(http://example.com/img.png)">test</div>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "style": { "background-image": "url(http://example.com/img.png)" },
      "txtContent": "test"
    }
  },
  {
    name: 'style properties with extra whitespace are trimmed',
    html: `<div style="  margin : 10px ; color : red  ">test</div>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "style": { "margin": "10px", "color": "red" },
      "txtContent": "test"
    }
  },
  {
    name: 'duplicate style property keeps last value',
    html: `<div style="color:red;color:blue">test</div>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "style": { "color": "blue" },
      "txtContent": "test"
    }
  },

  // ── CSS external/internal ──────────────────────────────────
  {
    name: 'html with style tag and external css',
    html: `<html>
    <head><style>.testClass{ margin-left: 10px; }</style></head>
    <body><div class="testClass">Test-txtContent</div></body>
    </html>`,
    css: `div {
      border: 1px black dashed;
    }
    .thing {
      border-right:10px;
      font-size:20px;
      color: red;
    }
    .spnThing {
      font-size:16px;
      color:green;
    }`,
    expected: {
      "$schema": SCHEMA_URI,
      "attributes": { "class": "testClass" },
      "style": { "border": "1px black dashed", "margin-left": "10px" },
      "elmType": "div",
      "txtContent": "Test-txtContent"
    }
  },
  {
    name: 'css class specificity overrides element selector',
    html: `<div class="highlight">text</div>`,
    css: `div { color: red; } .highlight { color: blue; }`,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "attributes": { "class": "highlight" },
      "style": { "color": "blue" },
      "txtContent": "text"
    }
  },
  {
    name: 'inline style overrides external css',
    html: `<div style="color:green">text</div>`,
    css: `div { color: red; font-size: 12px; }`,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "style": { "color": "green", "font-size": "12px" },
      "txtContent": "text"
    }
  },

  // ── Nesting and structure ──────────────────────────────────
  {
    name: 'deeply nested elements',
    html: `<div><div><div><span>deep</span></div></div></div>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "children": [{
        "elmType": "div",
        "children": [{
          "elmType": "div",
          "children": [{
            "elmType": "span",
            "txtContent": "deep"
          }]
        }]
      }]
    }
  },
  {
    name: 'children take precedence over txtContent',
    html: `<div>text<span>child</span></div>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "children": [
        { "elmType": "span", "txtContent": "child" }
      ]
    }
  },
  {
    name: 'multiple root elements are wrapped in a div',
    html: `<div>first</div><span>second</span>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "children": [
        { "elmType": "div", "txtContent": "first" },
        { "elmType": "span", "txtContent": "second" }
      ]
    }
  },

  // ── Edge cases ─────────────────────────────────────────────
  {
    name: 'empty html input returns undefined json',
    html: ``,
    css: ``,
    expected: undefined
  },
  {
    name: 'element with no text and no children',
    html: `<div></div>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div"
    }
  },
  {
    name: 'element with class and title attributes together',
    html: `<div class="status" title="Completed">done</div>`,
    css: ``,
    expected: {
      "$schema": SCHEMA_URI,
      "elmType": "div",
      "attributes": { "class": "status", "title": "Completed" },
      "txtContent": "done"
    }
  }
];
