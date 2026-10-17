import type { Metadata } from 'next';
import Link from 'next/link';
import { DOC_GROUPS } from '@/lib/content';
import { allDocs } from '@/lib/docs';

export const metadata: Metadata = {
  title: 'Docs · SethuCMS',
  description: 'Guides for running, using and building on SethuCMS.',
};

/** The Docs home: every guide, grouped by what you want to do. */
export default function DocsHome() {
  const docs = allDocs();
  return (
    <div className="wrap page">
      <div className="kicker">Docs</div>
      <h1 className="page-title">Everything, in plain words.</h1>
      <p className="sub">
        Guides for running SethuCMS, working in the admin app and building on
        the API. Start with “Start here”.
      </p>
      {DOC_GROUPS.map((group) => (
        <section key={group.title} className="pkg-group">
          <h2 className="group-title">{group.title}</h2>
          <p className="muted">{group.text}</p>
          <div className="grid">
            {docs
              .filter((doc) => doc.group === group.title)
              .map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className="card card-link"
                >
                  <h3>{doc.title}</h3>
                  <p>{doc.summary}</p>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
