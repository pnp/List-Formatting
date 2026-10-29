import fs from 'node:fs';
import path from 'node:path';
import { renderMarkdown } from '../../scripts/model.mjs';
import { samples } from './catalog';

const docsRoot = path.resolve('..', 'docs');

export interface DocumentPage { route: string; canonical: string; title: string; html: string; source: string; }

function files(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(path.join(directory, entry.name)) :
      entry.name.endsWith('.md') && entry.name !== 'README.md' ? [path.join(directory, entry.name)] : []);
}

function routeFor(relative: string) {
  return relative.replace(/(?:\/index)?\.md$/, '').replace(/^gettingstarted/, 'getting-started')
    .replace(/\/columnformats$/, '/column-formatting').replace(/\/viewformats$/, '/view-formatting');
}

const groupingKeys: Record<string, string> = {
  action: 'FORMATTING-ACTIONS', category: 'SAMPLE-CATEGORIES', columntype: 'LIST-COLUMN-TYPE',
  feature: 'FORMATTING-FEATURES', operator: 'FORMATTING-OPERATORS', token: 'FORMATTING-TOKENS',
};
const swatchColors = new Map([...fs.readFileSync(path.join(docsRoot, 'css', 'extra.css'), 'utf8')
  .matchAll(/\.cd-([\w-]+)\s*\{\s*color:\s*(#[\da-f]+)/gi)].map((match) => [match[1], match[2]]));

function refreshGrouping(markdown: string, relative: string) {
  const name = path.posix.basename(relative, '.md');
  const key = relative.includes('/classes/') ? 'CLASSES' : groupingKeys[name];
  if (!key && name !== 'author' && name !== 'SP2019') return markdown;
  const intro = markdown.split(/<div class="expansiongroup"|^## /m)[0];
  const historicalHeadings = [...markdown.matchAll(/^## (.+)$/gm)].map((match) => match[1].trim());
  const swatches = new Map([...markdown.matchAll(/:fontawesome-[^:]+:\{[^}]*\.cd-([\w-]+)[^}]*\}\r?\n## (.+)/g)]
    .map((match) => [match[2].trim(), swatchColors.get(match[1])]));
  const candidates = name === 'SP2019' ? samples.filter((sample) => sample.fields['SHAREPOINT-COMPATIBILITY'].includes('SharePoint 2019')) : samples;
  if (name === 'SP2019') return `${intro}\n${candidates.map((sample) => `- [${sample.title}](${sample.sourceUrl})`).join('\n')}`;
  const allValues = key ? [...new Set(candidates.flatMap((sample) => sample.fields[key] ?? []))] :
    [...new Set(candidates.flatMap((sample) => sample.authors.map((author) => author.name)))];
  const labels = key === 'CLASSES' ? historicalHeadings :
    [...new Set([...historicalHeadings, ...allValues])].sort((a, b) => a.localeCompare(b));
  return `${intro}\n${labels.map((label) => {
    const matches = candidates.filter((sample) => key
      ? sample.fields[key]?.includes(label)
      : sample.authors.some((author) => author.name === label));
    const color = swatches.get(label);
    const swatch = color ? `<span class="class-swatch" style="background-color:${color}" aria-hidden="true"></span>` : '';
    return `## ${label}\n\n${swatch}${matches.length ? `${matches.length} ${matches.length === 1 ? 'sample' : 'samples'}` : 'No current catalog entries are tagged with this value.'}\n\n${matches.map((sample) => `- [${sample.title}](${sample.sourceUrl}) (${sample.family})`).join('\n')}\n`;
  }).join('\n')}`;
}

export const documents: DocumentPage[] = files(docsRoot).flatMap((filename) => {
  const relative = path.relative(docsRoot, filename).split(path.sep).join('/');
  if (relative === 'index.md') return [];
  let markdown = fs.readFileSync(filename, 'utf8');
  if (relative.startsWith('groupings/')) markdown = refreshGrouping(markdown, relative);
  const canonical = routeFor(relative);
  const oldRoute = relative.replace(/(?:\/index)?\.md$/, '');
  const title = markdown.match(/^# (.+)/m)?.[1] ?? canonical;
  const html = renderMarkdown(markdown, `docs/${relative}`);
  const primary = { route: canonical, canonical, title, html, source: relative };
  return canonical === oldRoute ? [primary] : [primary, { ...primary, route: oldRoute }];
});

for (const [oldRoute, family] of [['columnsamples', 'column'], ['viewsamples', 'view'], ['formsamples', 'form']]) {
  const document = documents.find((item) => item.route === oldRoute);
  if (document) {
    document.html = `<p>Browse all current <a href="/List-Formatting/?type=${family}#gallery">${family} formatting samples in the gallery</a>.</p>` +
      samples.filter((sample) => sample.family === family).map((sample) => `<p><a href="/List-Formatting/${sample.route}">${sample.title.replaceAll('&', '&amp;').replaceAll('<', '&lt;')}</a></p>`).join('');
  }
}
