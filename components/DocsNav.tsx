import Link from 'next/link';
import { DOC_GROUPS } from '@/lib/content';
import { allDocs } from '@/lib/docs';

/** The list of every guide, grouped, shown beside each guide. */
export function DocsNav({ current }: { current?: string }) {
  const docs = allDocs();
  const groups = [...DOC_GROUPS.map((group) => group.title), 'More'];
  return (
    <nav className="docs-nav" aria-label="Guides">
      <Link href="/docs" className="docs-nav-all">
        All docs
      </Link>
      {groups.map((title) => {
        const items = docs.filter((doc) => doc.group === title);
        if (items.length === 0) {
          return null;
        }
        return (
          <div key={title}>
            <h2>{title}</h2>
            <ul>
              {items.map((doc) => (
                <li key={doc.slug}>
                  <Link
                    href={`/docs/${doc.slug}`}
                    aria-current={doc.slug === current ? 'page' : undefined}
                  >
                    {doc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
