#!/usr/bin/env node
/**
 * Copies the guides in content/docs into the SethuCMS "docs" collection, once.
 * After that you edit them in the SethuCMS editor and the site follows.
 *
 *   SETHUCMS_BASE_URL=https://your-gateway \
 *   SETHUCMS_EDITOR_TOKEN=...  (an Editor token, used here only, never on the site)
 *   SETHUCMS_DOCS_CONNECTION=conn_xxxx
 *   node scripts/seed-docs-to-cms.mjs            # shows what it would do
 *   node scripts/seed-docs-to-cms.mjs --apply    # does it
 *
 * Guides already in SethuCMS (same slug) are left alone, so it is safe to run again.
 */
import { randomUUID } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const base = process.env.SETHUCMS_BASE_URL?.replace(/\/+$/, '');
const token = process.env.SETHUCMS_EDITOR_TOKEN;
const connection = process.env.SETHUCMS_DOCS_CONNECTION;
const collection = process.env.SETHUCMS_DOCS_COLLECTION || 'docs';
const apply = process.argv.includes('--apply');

if (!base || !token || !connection) {
  console.error('Set SETHUCMS_BASE_URL, SETHUCMS_EDITOR_TOKEN and SETHUCMS_DOCS_CONNECTION first.');
  process.exit(1);
}

const root = `${base}/v1/connections/${encodeURIComponent(connection)}/collections/${encodeURIComponent(collection)}/records`;
const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

async function existingSlugs() {
  const found = new Set();
  let cursor = null;
  for (let page = 0; page < 50; page += 1) {
    const url = new URL(root);
    url.searchParams.set('limit', '100');
    if (cursor) url.searchParams.set('cursor', cursor);
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Could not list "${collection}": ${res.status} ${await res.text()}`);
    const json = await res.json();
    for (const row of json.data ?? []) found.add(row.slug);
    cursor = json.page?.nextCursor ?? null;
    if (!cursor) break;
  }
  return found;
}

const dir = join(process.cwd(), 'content', 'docs');
const files = readdirSync(dir).filter((f) => /^\d\d-[a-z0-9-]+\.md$/.test(f)).sort();
const have = await existingSlugs();
let created = 0;
let skipped = 0;
let failed = 0;

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  if (have.has(slug)) {
    skipped += 1;
    continue;
  }
  const lines = readFileSync(join(dir, file), 'utf8').split('\n');
  const at = lines.findIndex((l) => l.startsWith('# '));
  const title = (lines[at]?.slice(2) ?? slug).replace(/^\d+\.\s*/, '').replace(/`/g, '').trim();
  const body = lines.slice(at + 1).join('\n').trim();
  if (!apply) {
    console.log(`would add  ${slug}  (${title})`);
    created += 1;
    continue;
  }
  const res = await fetch(root, {
    method: 'POST',
    headers: { ...headers, 'Idempotency-Key': randomUUID() },
    body: JSON.stringify({ slug, number: Number(slug.slice(0, 2)), title, body }),
  });
  if (res.ok) {
    created += 1;
    console.log(`added      ${slug}`);
  } else {
    failed += 1;
    console.log(`FAILED     ${slug}: ${res.status} ${(await res.text()).slice(0, 160)}`);
  }
}
console.log(`\n${apply ? 'Added' : 'Would add'} ${created}, already there ${skipped}${failed ? `, failed ${failed}` : ''}.${apply ? '' : ' Run again with --apply.'}`);
if (failed) process.exit(1);
