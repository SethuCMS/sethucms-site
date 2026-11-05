/**
 * Reads collections from SethuCMS on the server, for the whole site.
 * Set SETHUCMS_BASE_URL, SETHUCMS_VIEWER_TOKEN and SETHUCMS_DOCS_CONNECTION
 * (the connection id) to turn it on. Without them, or when the gateway is
 * down, every caller gets null and falls back to the text kept in the code.
 * Only a viewer token belongs here: the site must never be able to write.
 */

/** One record as the gateway returns it. */
export type Row = Record<string, unknown>;

function settings() {
  const base = process.env.SETHUCMS_BASE_URL?.replace(/\/+$/, '');
  const token = process.env.SETHUCMS_VIEWER_TOKEN;
  const connection =
    process.env.SETHUCMS_CONNECTION || process.env.SETHUCMS_DOCS_CONNECTION;
  return base && token && connection ? { base, token, connection } : null;
}

/** Every record of a collection, or null when SethuCMS is off or unreachable. */
export async function cmsRows(collection: string): Promise<Row[] | null> {
  const config = settings();
  if (!config) {
    return null;
  }
  const rows: Row[] = [];
  let cursor: string | null = null;
  try {
    for (let page = 0; page < 20; page += 1) {
      const url = new URL(
        `${config.base}/v1/connections/${encodeURIComponent(
          config.connection,
        )}/collections/${encodeURIComponent(collection)}/records`,
      );
      url.searchParams.set('limit', '100');
      if (cursor) {
        url.searchParams.set('cursor', cursor);
      }
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${config.token}` },
        // Check again at most once a minute (SETHUCMS_DOCS_REVALIDATE changes that).
        next: {
          revalidate: Number(process.env.SETHUCMS_DOCS_REVALIDATE) || 60,
          tags: ['sethucms', `sethucms-${collection}`],
        },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) {
        console.warn(`SethuCMS ${collection}: gateway answered ${response.status}`);
        return null;
      }
      const json = (await response.json()) as {
        data?: Row[];
        page?: { nextCursor?: string | null };
      };
      rows.push(...(json.data ?? []));
      cursor = json.page?.nextCursor ?? null;
      if (!cursor) {
        break;
      }
    }
  } catch (error) {
    // Never break the site because the CMS is down.
    console.warn(`SethuCMS ${collection}: could not read the gateway`, error);
    return null;
  }
  return rows;
}

/** Sort by the "position" field, then by id. */
export function byPosition(a: Row, b: Row): number {
  const pa = typeof a.position === 'number' ? a.position : 9999;
  const pb = typeof b.position === 'number' ? b.position : 9999;
  return pa - pb || Number(a.id ?? 0) - Number(b.id ?? 0);
}

export const text = (value: unknown, max = 600): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';
