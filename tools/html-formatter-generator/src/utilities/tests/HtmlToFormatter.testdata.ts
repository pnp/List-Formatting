
export const testInputs = [
  {
    name: `simple div element`,
    html: `<div>SolidTest</div>`,
    css: ``,
    expected: { "elmType": "div", "txtContent": "SolidTest" }
  },
  {
    name: 'check unsupported p tag',
    html: `<p>p Tag unsupported</p>`,
    css: ``,
    expected: undefined
  },
  {
    name: 'check script tag be removed',
    html: `<script src="abc.js">p Tag unsupported</script>`,
    css: ``,
    expected: undefined
  },
  {
    name: 'invalid html escapes being parsed',
    html: `<html><body><script src="abc.js">p Tag unsupported</script></body></html>`,
    css: ``,
    expected: undefined
  },
  {
    name: 'html with style tag',
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
      "attributes": { "class": "testClass" },
      "style": { "border": "1px black dashed", "margin-left": "10px" },
      "elmType": "div",
      "txtContent": "Test-txtContent"
    }
  },
  {
    name: 'unsupported children shouldnot append nulls into json',
    html: `<div><ul><li>test-list-item-01</li></ul></div>`,
    css: ``,
    expected: {
      "elmType": "div",
      "children": []
    }
  }
];