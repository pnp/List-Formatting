import fs from 'node:fs';
import { createHash } from 'node:crypto';
import Ajv from 'ajv';
import AjvDraft4 from 'ajv-draft-04';
import addFormats from 'ajv-formats';
import { parseTree, printParseErrorCode } from 'jsonc-parser';
import { assert } from './model.mjs';

export function sourceFingerprint(source) {
  const text = source.toString('utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  return createHash('sha256').update(text).digest('hex');
}

export function parseStrictJson(input, source) {
  const text = input.replace(/^\uFEFF/, '');
  const errors = [];
  const tree = parseTree(text, errors, { disallowComments: true, allowTrailingComma: false });
  if (errors.length) {
    const error = errors[0];
    throw new Error(`${source}:${text.slice(0, error.offset).split('\n').length}: ${printParseErrorCode(error.error)}`);
  }
  function visit(node) {
    if (node.type === 'object') {
      const keys = new Set();
      for (const property of node.children ?? []) {
        const key = property.children[0].value;
        assert(!keys.has(key), `${source}:${text.slice(0, property.offset).split('\n').length}: duplicate JSON property "${key}"`);
        keys.add(key);
        visit(property.children[1]);
      }
    } else for (const child of node.children ?? []) visit(child);
  }
  assert(tree, `${source}: empty JSON document`);
  visit(tree);
  return JSON.parse(text);
}

const schemaFiles = {
  'column-v1': 'column-formatting', 'column-v2': 'v2/column-formatting',
  'row-v2': 'v2/row-formatting', 'view-v1': 'view-formatting', 'view-v2': 'v2/view-formatting',
  'tile-v2': 'v2/tile-formatting', 'board-v2': 'v2/board-formatting',
  'command-bar-v2': 'v2/command-bar-formatting', 'calendar-v2': 'v2/calendar-formatting',
};
// Microsoft's draft-04 schemas contain escaped hyphens that predate Unicode regex mode.
const formatting = new AjvDraft4({ strict: false, allErrors: false, validateFormats: false, unicodeRegExp: false });
for (const [file, schema] of Object.entries(schemaFiles)) {
  // Some published snapshots omit the leading slash in JSON Pointer fragments.
  const schemaDocument = JSON.parse(fs.readFileSync(new URL(`../schemas/${file}.json`, import.meta.url), 'utf8'),
    (key, value) => key === '$ref' && typeof value === 'string' ? value.replace('#definitions/', '#/definitions/') : value);
  formatting.addSchema(schemaDocument,
    `https://developer.microsoft.com/json-schemas/sp/${schema}.schema.json`);
}
const metadataAjv = new Ajv({ strict: false });
addFormats(metadataAjv);
const metadata = metadataAjv.compile(JSON.parse(fs.readFileSync(new URL('../schemas/metadata.json', import.meta.url), 'utf8')));
const body = metadataAjv.compile({
  type: 'object', required: ['sections'], additionalProperties: false,
  properties: { sections: { type: 'array', minItems: 1, items: {
    type: 'object', required: ['fields'], additionalProperties: false,
    properties: { displayname: { type: 'string' }, fields: { type: 'array', items: { type: 'string' } } },
  } } },
});

export function metadataIssues(records) {
  return metadata(records) ? [] : metadata.errors.map((error) => `${error.instancePath || '/'} ${error.message}`);
}

export function formattingIssues(data, family) {
  let validator;
  if (family === 'form' && Array.isArray(data.sections)) validator = body;
  else {
    const schema = data.$schema ?? (family === 'form'
      ? 'https://developer.microsoft.com/json-schemas/sp/v2/column-formatting.schema.json' : '');
    validator = formatting.getSchema(schema.replace(/#$/, ''));
    if (!validator) return [`Unsupported or missing schema: ${schema || '(none)'}`];
  }
  return validator(data) ? [] : validator.errors.map((error) => `${error.instancePath || '/'} ${error.message}`);
}
