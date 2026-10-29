import fs from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export const base = '/List-Formatting/';
export const repository = 'https://github.com/pnp/List-Formatting';
export const rawRepository = 'https://raw.githubusercontent.com/pnp/List-Formatting/master';
export const families = { column: 'column-samples', view: 'view-samples', form: 'form-samples' };
export const metadataKeys = [
  'LIST-SAMPLE-TYPE', 'SHAREPOINT-COMPATIBILITY', 'SAMPLE-CATEGORIES',
  'LIST-COLUMN-TYPE', 'FORMATTING-TOKENS', 'FORMATTING-OPERATORS',
  'FORMATTING-ACTIONS', 'FORMATTING-FEATURES', 'CLASSES',
];

export function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export function sitePath(target = '') {
  return `${base}${target.replace(/^\/+/, '')}`;
}

export function encodePath(target) {
  return target.split('/').map(encodeURIComponent).join('/');
}

export function headingId(text) {
  return text.toLowerCase().replace(/<[^>]*>/g, '').replace(/[^\p{L}\p{N}_\s-]/gu, '').trim().replace(/\s+/g, '-');
}

export function trackerUrl(samplePath) {
  return `https://m365-visitor-stats.azurewebsites.net/list-formatting/${samplePath}`;
}

export function validateTracker(samplePath, markdown) {
  const expected = `<img src="${trackerUrl(samplePath)}" />`;
  const finalImage = markdown.trimEnd().split(/\r?\n/).at(-1).match(/^<img\s+src="([^"]+)"\s*\/>$/);
  assert(finalImage?.[1] === trackerUrl(samplePath), `${samplePath}/README.md: must end with ${expected}`);
  assert((markdown.match(/m365-visitor-stats\.azurewebsites\.net/g) ?? []).length === 1,
    `${samplePath}/README.md: expected exactly one visitor tracking image`);
}

export function validateMetadata(records, samplePath, family) {
  const source = `${samplePath}/assets/sample.json`;
  assert(Array.isArray(records) && records.length === 1, `${source}: expected a one-item metadata array`);
  const item = records[0];
  for (const key of ['name', 'title', 'shortDescription', 'url', 'creationDateTime', 'updateDateTime']) {
    assert(typeof item[key] === 'string' && item[key].trim(), `${source}: missing ${key}`);
  }
  for (const key of ['authors', 'thumbnails', 'products', 'metadata', 'longDescription']) {
    assert(Array.isArray(item[key]) && item[key].length, `${source}: ${key} must be a non-empty array`);
  }
  const sourceUrl = new URL(item.url);
  assert(sourceUrl.protocol === 'https:' && sourceUrl.hostname === 'github.com' &&
    sourceUrl.pathname.replace(/\/$/, '').toLowerCase().endsWith(`/${samplePath.toLowerCase()}`),
  `${source}: url must point to this sample's GitHub folder`);
  for (const author of item.authors) {
    assert(/^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(author.gitHubAccount) ||
      (author.gitHubAccount === '[NA]' && typeof author.name === 'string' && author.name.trim()),
    `${source}: invalid GitHub author`);
  }
  for (const key of ['creationDateTime', 'updateDateTime']) {
    assert(/^\d{4}-\d{2}-\d{2}T/.test(item[key]) && Number.isFinite(Date.parse(item[key])), `${source}: invalid ${key}`);
  }
  assert(Date.parse(item.updateDateTime) >= Date.parse(item.creationDateTime), `${source}: updated before creation`);
  for (const key of metadataKeys) {
    assert(item.metadata.filter((entry) => entry.key === key).length === 1, `${source}: expected one ${key}`);
  }
  assert(item.metadata.find((entry) => entry.key === 'LIST-SAMPLE-TYPE').value.toLowerCase() === family,
    `${source}: sample type does not match ${family}`);
  return item;
}

export async function exactFile(root, relative, { allowDirectory = false } = {}) {
  const parts = relative.replace(/\/$/, '').split('/');
  let directory = root;
  for (const part of parts) {
    assert(part && part !== '..' && part !== '.', `Unsafe repository path: ${relative}`);
    const entries = await fs.readdir(directory);
    assert(entries.includes(part), `Missing or incorrectly cased file: ${relative}`);
    directory = path.join(directory, part);
  }
  const stat = await fs.stat(directory);
  assert(stat.isFile() || (allowDirectory && stat.isDirectory()), `Expected a file: ${relative}`);
  return directory;
}

export async function validateReadmeTargets(root, markdown, sourcePath) {
  const targets = new Set();
  marked.walkTokens(marked.lexer(markdown), (token) => {
    if (token.type === 'link' || token.type === 'image') targets.add(token.href);
    if (token.type === 'html') {
      for (const match of token.text.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) targets.add(match[1]);
    }
  });
  for (const target of targets) {
    if (/^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(target) || !target) continue;
    const file = decodeURIComponent(target.split(/[?#]/)[0]).replaceAll('\\', '/');
    const relative = path.posix.normalize(path.posix.join(path.posix.dirname(sourcePath), file));
    try { await exactFile(root, relative, { allowDirectory: true }); }
    catch (error) { throw new Error(`${sourcePath}: broken relative target "${target}": ${error.message}`, { cause: error }); }
  }
}

export function thumbnailPath(url, samplePath) {
  const pathname = decodeURIComponent(new URL(url).pathname);
  const start = pathname.indexOf(`/${samplePath}/`);
  assert(start >= 0, `${samplePath}: thumbnail must belong to this sample: ${url}`);
  return pathname.slice(start + 1);
}

export function definitionTarget(family, filename, data) {
  if (family === 'column') return 'Column formatting';
  if (family === 'view') return 'View formatting';
  if (Array.isArray(data.sections)) return 'Form body';
  if (/footer/i.test(filename)) return 'Form footer';
  return 'Form header';
}

export function resolveTarget(sourcePath, target, image = false) {
  if (/^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(target)) {
    const sample = target.match(/^https:\/\/github\.com\/pnp\/list-formatting\/(?:tree|blob)\/master\/(column|view|form)-samples\/([^/#]+)\/?(#.*)?$/i);
    return sample ? sitePath(`samples/${sample[1].toLowerCase()}/${sample[2]}/${sample[3] ?? ''}`) : target;
  }
  const [filePart, hash = ''] = target.replaceAll('\\', '/').split('#');
  const relative = path.posix.normalize(path.posix.join(path.posix.dirname(sourcePath), decodeURIComponent(filePart)));
  assert(!relative.startsWith('../') && !path.posix.isAbsolute(relative), `${sourcePath}: link leaves repository: ${target}`);
  const fragment = hash ? `#${hash}` : '';
  const familyDirectory = relative.match(/^(column|view|form)-samples\/?$/);
  if (familyDirectory) return sitePath(`?type=${familyDirectory[1]}#gallery`);
  if (relative.startsWith('docs/')) {
    const doc = relative.slice(5);
    if (image || !doc.endsWith('.md')) return sitePath(`${doc}${fragment}`);
    return sitePath(`${doc.replace(/(?:\/index)?\.md$/, '/').replace(/^index\/$/, '')}${fragment}`);
  }
  const sample = relative.match(/^(column|view|form)-samples\/([^/]+)(?:\/README\.md)?\/?$/);
  if (sample) return sitePath(`samples/${sample[1]}/${sample[2]}/${fragment}`);
  const rootFile = relative.match(/^(column|view|form)-samples\/([^/]+)\/([^/]+\.json)$/i);
  if (rootFile && !image) return sitePath(`generated/definitions/${encodePath(relative)}${fragment}`);
  return `${image ? rawRepository : `${repository}/blob/master`}/${encodePath(relative)}${fragment}`;
}

export function renderMarkdown(markdown, sourcePath, { stripTitle = true, imageOverrides = {} } = {}) {
  let prepared = markdown
    .replace(/<img[^>]*m365-visitor-stats[^>]*>/gi, '')
    .replace(/^!\[[^\]]*\]\([^)]*m365-visitor-stats[^)]*\)\s*$/gm, '')
    .replace(/^!!!\s+(\w+)(?:\s+"([^"]+)")?\s*\r?\n((?:[ \t]{4}.*(?:\r?\n|$)|\r?\n)+)/gm,
      (_match, kind, title, body) => `> **${title ?? kind}**\n>\n${body.replace(/^[ \t]{4}/gm, '').trim().split(/\r?\n/).map((line) => `> ${line}`).join('\n')}\n\n`)
    .replace(/:fontawesome-[\w-]+:(?:\{[^}]*\})?/g, '')
    .replace(/\{(?:target=|\.|title=)[^}\r\n]*\}/g, '');
  if (stripTitle) prepared = prepared.replace(/^# [^\r\n]*(?:\r?\n)+/, '');
  const renderer = new marked.Renderer();
  const seen = new Map();
  renderer.heading = ({ tokens, depth, text }) => {
    const id = headingId(text);
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    return `<h${depth} id="${id}${count ? `_${count}` : ''}">${renderer.parser.parseInline(tokens)}</h${depth}>`;
  };
  return sanitizeHtml(marked.parse(prepared, { renderer, gfm: true, async: false }), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'details', 'summary'],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['id', 'class'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
      a: ['href', 'title', 'rel'],
      span: ['id', 'class', 'style', 'aria-hidden'],
    },
    allowedStyles: { span: { 'background-color': [/^#[\da-f]{3,8}$/i] } },
    allowedSchemes: ['https', 'http', 'mailto'],
    transformTags: {
      a: (_tag, attributes) => {
        const href = resolveTarget(sourcePath, attributes.href ?? '');
        return { tagName: 'a', attribs: { ...attributes, href, ...(href.startsWith('http') ? { rel: 'noopener noreferrer' } : {}) } };
      },
      img: (_tag, attributes) => {
        const source = resolveTarget(sourcePath, attributes.src ?? '', true);
        return {
          tagName: 'img',
          attribs: { ...attributes, src: imageOverrides[source] ?? source, alt: attributes.alt || 'Sample illustration', loading: 'lazy', decoding: 'async' },
        };
      },
    },
  });
}
