import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseStrictJson, formattingIssues, sourceFingerprint } from '../../scripts/validation.mjs';

test('baseline fingerprints ignore checkout newlines and BOMs but still detect source edits', () => {
  const source = '{\n  "value": 1\n}\n';
  const windows = Buffer.from(`\uFEFF${source.replaceAll('\n', '\r\n')}`);
  assert.equal(sourceFingerprint(windows), sourceFingerprint(source));
  assert.notEqual(sourceFingerprint(source.replace('1', '2')), sourceFingerprint(source));
  assert.notEqual(sourceFingerprint(`${source} `), sourceFingerprint(source));
});

test('rejects duplicate JSON keys, comments and trailing commas with a source location', () => {
  assert.throws(() => parseStrictJson('{"elmType":"div","elmType":"span"}', 'sample.json'), /sample.json:1: duplicate/);
  assert.throws(() => parseStrictJson('{"elmType":"div",}', 'sample.json'), /sample.json:1:/);
  assert.throws(() => parseStrictJson('{//comment\n"elmType":"div"}', 'sample.json'), /sample.json:1:/);
  assert.deepEqual(parseStrictJson('\uFEFF{"elmType":"div"}', 'sample.json'), { elmType: 'div' });
});
test('validates form body structure independently of column formatting', () => {
  assert.deepEqual(formattingIssues({ sections: [{ displayname: 'Details', fields: ['Title'] }] }, 'form'), []);
  assert.notDeepEqual(formattingIssues({ sections: [{ fields: 2 }] }, 'form'), []);
  assert.deepEqual(formattingIssues({ elmType: 'div', txtContent: 'Hello' }, 'form'), []);
});
test('uses pinned Microsoft schemas and reports incompatible definitions', () => {
  const $schema = 'https://developer.microsoft.com/json-schemas/sp/v2/column-formatting.schema.json';
  assert.deepEqual(formattingIssues({ $schema, elmType: 'div', txtContent: '@currentField' }, 'column'), []);
  assert.notDeepEqual(formattingIssues({ $schema, elmType: 'not-an-element' }, 'column'), []);
});
