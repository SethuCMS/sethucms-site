/**
 * Copies the guides from the sethucms-docs repository into content/docs.
 *
 *   pnpm sync-docs                 (expects ../sethucms-docs)
 *   DOCS_DIR=/path/to/docs pnpm sync-docs
 */
import { cpSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(
  process.env.DOCS_DIR ?? join(here, '..', '..', 'sethucms-docs', 'docs'),
);
const target = join(here, '..', 'content', 'docs');

if (!existsSync(source)) {
  console.error(`Docs folder not found: ${source}`);
  process.exit(1);
}
let count = 0;
for (const file of readdirSync(source)) {
  if (/^\d\d-[a-z0-9-]+\.md$/.test(file)) {
    cpSync(join(source, file), join(target, file));
    count += 1;
  }
}
console.log(`Copied ${count} guides from ${source}`);
