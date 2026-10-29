import fs from 'node:fs/promises';
import path from 'node:path';
import { base } from './model.mjs';

const dist = path.resolve(import.meta.dirname, '..', 'dist');
async function files(directory) {
  return (await fs.readdir(directory, { withFileTypes: true })).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? [] : entry.name.endsWith('.html') ? [target] : [];
  }).concat(...await Promise.all((await fs.readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory()).map((entry) => files(path.join(directory, entry.name)))));
}
const pages = await files(dist);
const checked = new Set();
const failures = [];
for (const filename of pages) {
  const html = await fs.readFile(filename, 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const target = match[1].replaceAll('&amp;', '&');
    if (!target.startsWith(base)) continue;
    const relative = decodeURIComponent(new URL(target, 'https://pnp.github.io').pathname.slice(base.length));
    if (checked.has(relative)) continue;
    checked.add(relative);
    const parts = relative.split('/').filter(Boolean);
    const destination = path.join(dist, ...parts, ...(relative.endsWith('/') || !relative ? ['index.html'] : []));
    try { await fs.access(destination); } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      failures.push(`${path.relative(dist, filename)} -> ${target}`);
    }
  }
}
if (failures.length) throw new Error(`Broken internal links (${failures.length}):\n${failures.join('\n')}`);
console.log(`Checked ${checked.size} internal targets across ${pages.length} pages.`);
