/**
 * Reads the guides in content/docs (copies of the markdown in the
 * sethucms-docs repository; `pnpm sync-docs` refreshes them).
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DOC_GROUPS } from '@/lib/content';

const DOCS_DIR = join(process.cwd(), 'content', 'docs');
const FILE = /^(\d\d)-([a-z0-9-]+)\.md$/;

/** One guide, ready to list. */
export interface DocSummary {
  slug: string;
  number: number;
  title: string;
  /** First sentence or two, for the index. */
  summary: string;
  group: string;
}

/** One guide with its text. */
export interface Doc extends DocSummary {
  body: string;
}

/** "12. The gateway (`apps/api`)" becomes "The gateway (apps/api)". */
function cleanTitle(heading: string): string {
  return heading
    .replace(/^\d+\.\s*/, '')
    .replace(/`/g, '')
    .trim();
}

/** The first plain paragraph, trimmed to about 170 characters. */
function firstParagraph(body: string): string {
  const paragraph = body
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .find((part) => part !== '' && !/^(#|[-*>|`\d])/.test(part));
  const text = (paragraph ?? '')
    .replace(/\s+/g, ' ')
    .replace(/[`*_]/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  return text.length > 170 ? `${text.slice(0, 167).trimEnd()}...` : text;
}

/** Which group a guide belongs to; anything unlisted goes to "More". */
function groupOf(slug: string): string {
  const found = DOC_GROUPS.find((group) => group.slugs.includes(slug));
  return found ? found.title : 'More';
}

/** Read one guide file. */
function read(file: string): Doc {
  const match = FILE.exec(file);
  if (!match) {
    throw new Error(`Unexpected file in content/docs: ${file}`);
  }
  const raw = readFileSync(join(DOCS_DIR, file), 'utf8');
  const lines = raw.split('\n');
  const headingIndex = lines.findIndex((line) => line.startsWith('# '));
  const title = cleanTitle(lines[headingIndex]?.slice(2) ?? file);
  const body = lines
    .slice(headingIndex + 1)
    .join('\n')
    .trim();
  const slug = `${match[1]}-${match[2]}`;
  return {
    slug,
    number: Number(match[1]),
    title,
    summary: firstParagraph(body),
    group: groupOf(slug),
    body,
  };
}

/** Every guide, in number order. */
export function allDocs(): Doc[] {
  return readdirSync(DOCS_DIR)
    .filter((file) => FILE.test(file))
    .sort()
    .map(read);
}

/** One guide by its address, or undefined. */
export function getDoc(slug: string): Doc | undefined {
  return allDocs().find((doc) => doc.slug === slug);
}
