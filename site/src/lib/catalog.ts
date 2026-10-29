import fs from 'node:fs';
import path from 'node:path';

export interface Author {
  key: string;
  gitHubAccount: string;
  name: string;
  company?: string;
}

export interface Definition {
  filename: string;
  target: string;
  source: string;
  download: string;
  sourceUrl: string;
  sha256: string;
  schemaIssues: string[];
}

export interface Sample {
  id: string;
  family: 'column' | 'view' | 'form';
  slug: string;
  title: string;
  description: string;
  longDescription: string[];
  created: string;
  updated: string;
  products: string[];
  fields: Record<string, string[]>;
  authors: Author[];
  references: { name: string; url: string; description?: string }[];
  sourceUrl: string;
  route: string;
  preview: string;
  previewAlt: string;
  images: { url: string; alt: string }[];
  definitions: Definition[];
  readmeHtml: string;
  searchText: string;
}

export const samples: Sample[] = JSON.parse(fs.readFileSync(path.resolve('.cache', 'catalog.json'), 'utf8'));
export const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const sitePath = (target = '') => `${base}${target.replace(/^\/+/, '')}`;
export const formatDate = (date: string) => new Intl.DateTimeFormat('en', {
  year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
}).format(new Date(date));
export const familyLabel = (family: Sample['family']) => ({ column: 'Column', view: 'View', form: 'Form' })[family];
export const values = (key: string) => [...new Set(samples.flatMap((sample) => sample.fields[key] ?? []))].sort((a, b) => a.localeCompare(b));
export const contributors = [...samples.reduce((all, sample) => {
  for (const author of sample.authors) {
    const key = author.key;
    const previous = all.get(key);
    all.set(key, { ...author, count: (previous?.count ?? 0) + 1 });
  }
  return all;
}, new Map<string, Author & { count: number }>()).values()]
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
