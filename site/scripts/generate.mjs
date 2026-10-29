import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import sharp from 'sharp';
import { parseStrictJson, metadataIssues, formattingIssues } from './validation.mjs';
import {
  assert, families, metadataKeys, validateMetadata, validateTracker, validateReadmeTargets, exactFile,
  thumbnailPath, definitionTarget, renderMarkdown, repository, rawRepository, encodePath,
} from './model.mjs';

const siteRoot = path.resolve(import.meta.dirname, '..');
const root = path.resolve(siteRoot, '..');
const output = path.join(siteRoot, 'public', 'generated');
const cache = path.join(siteRoot, '.cache');
const validateOnly = process.argv.includes('--validate');
const updateAggregate = process.argv.includes('--catalog');
const updateBaseline = process.argv.includes('--update-baseline');
await fs.mkdir(cache, { recursive: true });
if (!validateOnly) await fs.mkdir(output, { recursive: true });
const samples = [];
const aggregate = [];
const advisories = [];
const previewIndexPath = path.join(cache, 'previews.json');
let previewHashes = {};
if (!validateOnly) {
  try { previewHashes = JSON.parse(await fs.readFile(previewIndexPath, 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
}

for (const [family, folder] of Object.entries(families)) {
  const entries = (await fs.readdir(path.join(root, folder), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name, 'en'));
  for (const entry of entries) {
    const samplePath = `${folder}/${entry.name}`;
    const directory = path.join(root, folder, entry.name);
    const records = parseStrictJson(await fs.readFile(path.join(directory, 'assets', 'sample.json'), 'utf8'), `${samplePath}/assets/sample.json`);
    const metadata = validateMetadata(records, samplePath, family);
    for (const issue of metadataIssues(records)) advisories.push({ path: `${samplePath}/assets/sample.json`, message: `PnP schema: ${issue}` });
    aggregate.push(metadata);
    const markdown = await fs.readFile(path.join(directory, 'README.md'), 'utf8');
    validateTracker(samplePath, markdown);
    await validateReadmeTargets(root, markdown, `${samplePath}/README.md`);
    const fields = Object.fromEntries(metadataKeys.map((key) => [
      key, metadata.metadata.find((item) => item.key === key).value.split(',').map((value) => value.trim()).filter(Boolean),
    ]));
    const definitions = [];
    for (const filename of (await fs.readdir(directory)).filter((name) => name.endsWith('.json')).sort()) {
      const bytes = await fs.readFile(path.join(directory, filename));
      const source = bytes.toString('utf8').replace(/^\uFEFF/, '');
      const data = parseStrictJson(source, `${samplePath}/${filename}`);
      assert(data && typeof data === 'object' && !Array.isArray(data), `${samplePath}/${filename}: expected a formatting object`);
      const target = definitionTarget(family, filename, data);
      const schemaIssues = formattingIssues(data, family);
      for (const issue of schemaIssues) advisories.push({ path: `${samplePath}/${filename}`, message: `Formatting schema: ${issue}` });
      definitions.push({
        filename, target, source, schemaIssues,
        download: `generated/definitions/${samplePath}/${filename}`,
        sourceUrl: `${repository}/blob/master/${encodePath(`${samplePath}/${filename}`)}`,
        sha256: createHash('sha256').update(bytes).digest('hex'),
      });
      if (!validateOnly) {
        const destination = path.join(output, 'definitions', folder, entry.name, filename);
        await fs.mkdir(path.dirname(destination), { recursive: true });
        await fs.writeFile(destination, bytes);
      }
    }
    assert(definitions.length, `${samplePath}: no formatting definitions`);
    const thumbnails = [...metadata.thumbnails].filter((image) => image.type === 'image').sort((a, b) => a.order - b.order);
    assert(thumbnails.length, `${samplePath}: missing image thumbnail`);
    for (const image of thumbnails) await exactFile(root, thumbnailPath(image.url, samplePath));
    const sourceImage = await exactFile(root, thumbnailPath(thumbnails[0].url, samplePath));
    const preview = `generated/previews/${family}-${entry.name}.webp`;
    if (!validateOnly) {
      const destination = path.join(siteRoot, 'public', preview);
      await fs.mkdir(path.dirname(destination), { recursive: true });
      const imageBytes = await fs.readFile(sourceImage);
      const imageHash = createHash('sha256').update(imageBytes).digest('hex');
      let fresh = previewHashes[preview] === imageHash;
      if (fresh) {
        try { await fs.access(destination); }
        catch (error) { if (error.code !== 'ENOENT') throw error; fresh = false; }
      }
      if (!fresh) await sharp(imageBytes, { animated: false }).rotate().resize({ width: 800, height: 600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 76 }).toFile(destination);
      previewHashes[preview] = imageHash;
    }
    if (!/##\s+(?:view|column|form|list) requirements/i.test(markdown)) {
      advisories.push({ path: `${samplePath}/README.md`, message: 'Review prerequisites: no standard requirements heading detected.' });
    }
    samples.push({
      id: samplePath, family, slug: entry.name, title: metadata.title,
      description: metadata.shortDescription, longDescription: metadata.longDescription,
      created: metadata.creationDateTime, updated: metadata.updateDateTime,
      products: metadata.products, fields,
      authors: metadata.authors.map((author) => ({
        ...author, gitHubAccount: author.gitHubAccount === '[NA]' ? '' : author.gitHubAccount,
        key: author.gitHubAccount === '[NA]' ? `name:${author.name.toLowerCase()}` : author.gitHubAccount.toLowerCase(),
        name: author.name || author.gitHubAccount,
      })),
      references: metadata.references ?? [],
      sourceUrl: `${repository}/tree/master/${encodePath(samplePath)}`,
      route: `samples/${family}/${entry.name}/`,
      preview, previewAlt: thumbnails[0].alt === 'screenshot' ? `${metadata.title} formatting preview` : thumbnails[0].alt,
      images: thumbnails.map((image) => ({ ...image, url: `${rawRepository}/${encodePath(thumbnailPath(image.url, samplePath))}` })),
      definitions,
      readmeHtml: validateOnly ? '' : renderMarkdown(markdown, `${samplePath}/README.md`, {
        imageOverrides: {
          [`${rawRepository}/${encodePath(thumbnailPath(thumbnails[0].url, samplePath))}`]: `/List-Formatting/${preview}`,
        },
      }),
      searchText: [metadata.title, metadata.shortDescription, entry.name, ...Object.values(fields).flat(), ...metadata.authors.map((author) => `${author.name ?? ''} ${author.gitHubAccount}`)].join(' ').toLowerCase(),
    });
  }
}
samples.sort((a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title, 'en'));
const identity = (item) => new URL(item.url).pathname.match(/(?:column|view|form)-samples\/[^/]+/)?.[0].toLowerCase();
if (!updateAggregate) {
  const published = JSON.parse(await fs.readFile(path.join(root, 'samples.json'), 'utf8'));
  const publishedById = new Map(published.map((item) => [identity(item), item]));
  assert(published.length === aggregate.length && aggregate.every((item) => isDeepStrictEqual(item, publishedById.get(identity(item)))),
    'samples.json is out of sync with sample metadata. Run npm run catalog:update and include the updated catalog.');
}
const report = { samples: samples.length, definitions: samples.reduce((sum, item) => sum + item.definitions.length, 0), advisories };
await fs.writeFile(path.join(cache, 'quality.json'), `${JSON.stringify(report, null, 2)}\n`);
const baselinePath = path.join(siteRoot, 'quality-baseline.json');
const findings = await Promise.all(advisories.map(async (finding) => ({
  ...finding, sourceSha256: createHash('sha256').update(await fs.readFile(path.join(root, ...finding.path.split('/')))).digest('hex'),
})));
if (updateBaseline) await fs.writeFile(baselinePath, `${JSON.stringify(findings, null, 2)}\n`);
const baseline = JSON.parse(await fs.readFile(baselinePath, 'utf8'));
const accepted = new Set(baseline.map((finding) => JSON.stringify(finding)));
const introduced = findings.filter((finding) => !accepted.has(JSON.stringify(finding)));
assert(!introduced.length, `New or changed quality findings require source fixes or an explicit reviewed baseline update:\n${introduced.map((finding) => `${finding.path}: ${finding.message}`).join('\n')}`);
if (!validateOnly) {
  await fs.writeFile(previewIndexPath, JSON.stringify(previewHashes));
  await fs.writeFile(path.join(cache, 'catalog.json'), JSON.stringify(samples));
  const publicSamples = samples.map(({ readmeHtml, searchText, definitions, ...sample }) => ({
    ...sample, definitions: definitions.map(({ source, ...definition }) => definition),
  }));
  const catalogBytes = `${JSON.stringify({ version: 1, samples: publicSamples }, null, 2)}\n`;
  await fs.writeFile(path.join(siteRoot, 'public', 'catalog.json'), catalogBytes);
  await fs.writeFile(path.join(siteRoot, 'public', 'quality.json'), `${JSON.stringify(report, null, 2)}\n`);
  const commit = process.env.GITHUB_SHA ?? execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  await fs.writeFile(path.join(siteRoot, 'public', 'deployment.json'), `${JSON.stringify({
    commit, samples: report.samples, definitions: report.definitions,
    catalogSha256: createHash('sha256').update(catalogBytes).digest('hex'),
  }, null, 2)}\n`);
  await fs.cp(path.join(root, 'docs', 'img'), path.join(siteRoot, 'public', 'img'), { recursive: true });
  await fs.cp(path.join(root, 'docs', 'tools', 'html-formatter-generator'), path.join(siteRoot, 'public', 'tools', 'html-formatter-generator'), { recursive: true });
}
if (updateAggregate) {
  const previous = JSON.parse(execFileSync('git', ['show', 'HEAD:samples.json'], { cwd: root, encoding: 'utf8' }));
  const remaining = new Map(aggregate.map((item) => [identity(item), item]));
  const ordered = previous.flatMap((item) => {
    const key = identity(item);
    const current = remaining.get(key);
    remaining.delete(key);
    return current ? [current] : [];
  });
  ordered.push(...remaining.values());
  await fs.writeFile(path.join(root, 'samples.json'), `${JSON.stringify(ordered, null, 2)}\n`);
}
console.log(`Validated ${report.samples} samples, ${report.definitions} definitions, and exact-case thumbnail paths.`);
console.log(`${advisories.length} non-blocking documentation/schema review items: .cache/quality.json`);
