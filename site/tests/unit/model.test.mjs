import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { definitionTarget, renderMarkdown, resolveTarget, trackerUrl, validateTracker, thumbnailPath, exactFile } from '../../scripts/model.mjs';
import { fileURLToPath } from 'node:url';

test('sample identities include their family and relative links preserve definitions', () => {
  assert.equal(resolveTarget('column-samples/custom-hover-card/README.md', './custom-hover-card.json'),
    '/List-Formatting/generated/definitions/column-samples/custom-hover-card/custom-hover-card.json');
  assert.equal(resolveTarget('view-samples/custom-hover-card/README.md', './custom-hover-card.json'),
    '/List-Formatting/generated/definitions/view-samples/custom-hover-card/custom-hover-card.json');
  assert.equal(resolveTarget('column-samples/example/README.md', '../generic-file-preview/'),
    '/List-Formatting/samples/column/generic-file-preview/');
});
test('recognizes form body, header and footer destinations without requiring a folder-named file', () => {
  assert.equal(definitionTarget('form', 'status-header.json', {}), 'Form header');
  assert.equal(definitionTarget('form', 'status-footer.json', {}), 'Form footer');
  assert.equal(definitionTarget('form', 'wrapped-body.json', { sections: [] }), 'Form body');
  assert.equal(definitionTarget('view', 'Board.json', {}), 'View formatting');
});
test('keeps one final-line unique README tracker, allowing valid HTML whitespace', () => {
  const id = 'view-samples/example';
  assert.doesNotThrow(() => validateTracker(id, `# Example\n<img src="${trackerUrl(id)}"/>`));
  assert.throws(() => validateTracker(id, `<img src="${trackerUrl('column-samples/example')}" />`), /must end/);
  assert.throws(() => validateTracker(id, `<img src="${trackerUrl(id)}" />\nText`), /must end/);
});
test('sanitizes authored HTML, preserves heading anchors and removes embedded trackers', () => {
  const html = renderMarkdown(`# Example\n\n## View Requirements\n\n<img src="./assets/test.png" onerror="alert(1)">\n<script>alert(1)</script>\n<img src="${trackerUrl('view-samples/example')}" />`, 'view-samples/example/README.md');
  assert.match(html, /id="view-requirements"/);
  assert.match(html, /loading="lazy"/);
  assert.doesNotMatch(html, /onerror|<script|m365-visitor-stats/);
});
test('converts indented admonitions and rejects paths outside the repository', () => {
  assert.match(renderMarkdown('!!! Warning "Read first"\n    Use the right fields.\n', 'docs/gettingstarted/index.md'), /<blockquote>/);
  assert.throws(() => resolveTarget('docs/index.md', '../../../secret.txt'), /leaves repository/);
  assert.throws(() => thumbnailPath('https://example.com/other/sample.png', 'view-samples/example'), /belong/);
});
test('sample trackers cannot be reintroduced by rendering raw HTML', () => {
  const html = renderMarkdown(`<img src="${trackerUrl('form-samples/test')}" />`, 'form-samples/test/README.md');
  assert.doesNotMatch(html, /azurewebsites/);
});
test('asset validation catches Windows-hidden filename casing problems', async () => {
  const root = fileURLToPath(new URL('../../../', import.meta.url));
  await assert.doesNotReject(() => exactFile(root, 'assets/Info-Light.png'));
  await assert.rejects(() => exactFile(root, 'assets/info-light.png'), /incorrectly cased/);
});
test('every generated download matches the original repository bytes', async () => {
  const catalog = JSON.parse(await fs.readFile(new URL('../../.cache/catalog.json', import.meta.url), 'utf8'));
  const root = new URL('../../../', import.meta.url);
  const siteRoot = new URL('../../', import.meta.url);
  assert.equal(new Set(catalog.map((sample) => sample.route)).size, catalog.length);
  for (const sample of catalog) for (const definition of sample.definitions) {
    const original = await fs.readFile(new URL(`${sample.id}/${definition.filename}`, root));
    const published = await fs.readFile(new URL(`public/${definition.download}`, siteRoot));
    assert.deepEqual(published, original, definition.download);
  }
});
