#!/usr/bin/env node
/**
 * Copies the home page and packages text from lib/content.ts into SethuCMS,
 * once: the collections whats_new, security and packages. Needs Node 22.18+
 * (it reads the TypeScript file directly).
 *
 *   SETHUCMS_BASE_URL=https://your-gateway \
 *   SETHUCMS_EDITOR_TOKEN=...   (an Editor token, used here only)
 *   SETHUCMS_DOCS_CONNECTION=conn_xxxx
 *   node scripts/seed-site-content-to-cms.mjs            # shows what it would add
 *   node scripts/seed-site-content-to-cms.mjs --apply    # adds it
 *
 * Records already there (same title, or same package name) are left alone.
 */
import { randomUUID } from 'node:crypto';
import { WHATS_NEW, SECURITY, PACKAGE_GROUPS } from '../lib/content.ts';

const base = process.env.SETHUCMS_BASE_URL?.replace(/\/+$/, '');
const token = process.env.SETHUCMS_EDITOR_TOKEN;
const connection = process.env.SETHUCMS_CONNECTION || process.env.SETHUCMS_DOCS_CONNECTION;
const apply = process.argv.includes('--apply');
if (!base || !token || !connection) {
  console.error('Set SETHUCMS_BASE_URL, SETHUCMS_EDITOR_TOKEN and SETHUCMS_DOCS_CONNECTION first.');
  process.exit(1);
}
const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
const root = (c) => `${base}/v1/connections/${encodeURIComponent(connection)}/collections/${c}/records`;

async function existing(collection, key) {
  const seen = new Set();
  let cursor = null;
  for (let i = 0; i < 50; i += 1) {
    const url = new URL(root(collection));
    url.searchParams.set('limit', '100');
    if (cursor) url.searchParams.set('cursor', cursor);
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Cannot read "${collection}": ${res.status} ${(await res.text()).slice(0, 160)}. Create the collection first.`);
    const json = await res.json();
    for (const row of json.data ?? []) seen.add(row[key]);
    cursor = json.page?.nextCursor ?? null;
    if (!cursor) break;
  }
  return seen;
}

const plan = [
  ['whats_new', 'title', WHATS_NEW.map((c, i) => ({ title: c.title, text: c.text, highlight: c.lime === true, position: i + 1 }))],
  ['security', 'title', SECURITY.map((c, i) => ({ title: c.title, text: c.text, highlight: c.lime === true, position: i + 1 }))],
  ['packages', 'name', PACKAGE_GROUPS.flatMap((g, gi) => g.packages.map((p, i) => ({ name: p.name, text: p.text, group: g.title, command: p.command ?? '', position: gi * 100 + i + 1 })))],
];

let added = 0, skipped = 0, failed = 0;
for (const [collection, key, rows] of plan) {
  const have = await existing(collection, key);
  for (const row of rows) {
    if (have.has(row[key])) { skipped += 1; continue; }
    if (!apply) { console.log(`would add  ${collection}: ${row[key]}`); added += 1; continue; }
    const res = await fetch(root(collection), { method: 'POST', headers: { ...headers, 'Idempotency-Key': randomUUID() }, body: JSON.stringify(row) });
    if (res.ok) { added += 1; console.log(`added      ${collection}: ${row[key]}`); }
    else { failed += 1; console.log(`FAILED     ${collection}: ${row[key]}: ${res.status} ${(await res.text()).slice(0, 140)}`); }
  }
}
console.log(`\n${apply ? 'Added' : 'Would add'} ${added}, already there ${skipped}${failed ? `, failed ${failed}` : ''}.${apply ? '' : ' Run again with --apply.'}`);
if (failed) process.exit(1);
