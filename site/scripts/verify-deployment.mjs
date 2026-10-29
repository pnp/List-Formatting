import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const site = process.env.SITE_URL;
const commit = process.env.EXPECTED_COMMIT_SHA;
assert(site && /^[0-9a-f]{40}$/i.test(commit ?? ''), 'Set SITE_URL and EXPECTED_COMMIT_SHA to verify a deployment.');
const url = new URL(site.endsWith('/') ? site : `${site}/`);
async function request(target, method = 'GET') {
  const targetUrl = new URL(target, url);
  targetUrl.searchParams.set('deployment', commit);
  const response = await fetch(targetUrl, { method, signal: AbortSignal.timeout(30_000), cache: 'no-store' });
  assert(response.ok, `${method} ${targetUrl} returned ${response.status}`);
  return response;
}
const marker = await (await request('deployment.json')).json();
assert(marker.commit === commit, `Expected ${commit}; published deployment is ${marker.commit}.`);
const bytes = Buffer.from(await (await request('catalog.json')).arrayBuffer());
assert(createHash('sha256').update(bytes).digest('hex') === marker.catalogSha256, 'Published catalog hash does not match the deployment marker.');
const { samples } = JSON.parse(bytes.toString('utf8'));
assert(samples.length === marker.samples, 'Published catalog count does not match the deployment marker.');
const targets = ['', 'getting-started/', 'contributors/', 'contributing/', 'whats-new/', 'tools/', ...samples.flatMap((sample) => [
  sample.route, sample.preview, ...sample.definitions.map((definition) => definition.download),
])];
for (let offset = 0; offset < targets.length; offset += 8) await Promise.all(targets.slice(offset, offset + 8).map((target) => request(target, 'HEAD')));
console.log(`Verified ${samples.length} samples and ${targets.length} published routes/assets for ${commit}.`);
