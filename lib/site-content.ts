/**
 * The home page and packages page words, from SethuCMS when it is set up and
 * from lib/content.ts otherwise. An empty or unreachable collection never
 * blanks a section: the text in the code is used instead.
 *
 * Collections (all optional):
 *   whats_new  title, text, highlight (yes/no), position
 *   security   title, text, highlight (yes/no), position
 *   packages   name, text, group, command, position
 */
import {
  PACKAGE_GROUPS,
  SECURITY,
  WHATS_NEW,
  type Card,
  type Package,
} from '@/lib/content';
import { byPosition, cmsRows, text, type Row } from '@/lib/cms';

async function cards(collection: string, fallback: Card[]): Promise<Card[]> {
  const rows = await cmsRows(collection);
  const found = (rows ?? [])
    .sort(byPosition)
    .map((row): Card | null => {
      const title = text(row.title, 120);
      const body = text(row.text);
      if (title === '' || body === '') {
        return null;
      }
      return { title, text: body, ...(row.highlight === true ? { lime: true } : {}) };
    })
    .filter((card): card is Card => card !== null);
  return found.length > 0 ? found : fallback;
}

/** "What's new" cards. */
export const getWhatsNew = () => cards('whats_new', WHATS_NEW);

/** "Security first" cards. */
export const getSecurity = () => cards('security', SECURITY);

/** An npm package name: lowercase, optional @scope/. Anything else is ignored. */
const PACKAGE_NAME = /^(@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/;

function toPackage(row: Row): (Package & { group: string }) | null {
  const name = text(row.name, 100);
  const body = text(row.text);
  if (!PACKAGE_NAME.test(name) || body === '') {
    return null;
  }
  const command = text(row.command, 200);
  return {
    name,
    text: body,
    group: text(row.group, 120),
    ...(command ? { command } : {}),
  };
}

/** Packages grouped by what a person wants to do. */
export async function getPackageGroups(): Promise<typeof PACKAGE_GROUPS> {
  const rows = await cmsRows('packages');
  const packages = (rows ?? [])
    .sort(byPosition)
    .map(toPackage)
    .filter((item): item is Package & { group: string } => item !== null);
  if (packages.length === 0) {
    return PACKAGE_GROUPS;
  }
  // Group order and group text stay in the code; the packages come from SethuCMS.
  const groups = PACKAGE_GROUPS.map((group) => ({
    ...group,
    packages: packages
      .filter((item) => item.group === group.title)
      .map(({ group: _group, ...rest }) => rest),
  }));
  const known = new Set(PACKAGE_GROUPS.map((group) => group.title));
  const other = packages
    .filter((item) => !known.has(item.group))
    .map(({ group: _group, ...rest }) => rest);
  if (other.length > 0) {
    groups.push({ title: 'More', text: 'More packages.', packages: other });
  }
  return groups.filter((group) => group.packages.length > 0);
}
