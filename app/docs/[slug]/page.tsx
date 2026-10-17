import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsNav } from '@/components/DocsNav';
import { GuideText } from '@/components/Markdown';
import { allDocs, getDoc } from '@/lib/docs';

type Params = { params: Promise<{ slug: string }> };

/** Only the guides that exist are pages; any other address is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return allDocs().map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  return doc
    ? { title: `${doc.title} · SethuCMS docs`, description: doc.summary }
    : {};
}

/** One guide, with the list of all guides beside it. */
export default async function GuidePage({ params }: Params) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) {
    notFound();
  }
  return (
    <div className="wrap docs-layout">
      <DocsNav current={doc.slug} />
      <article className="prose">
        <div className="kicker">{doc.group}</div>
        <h1 className="page-title">{doc.title}</h1>
        <GuideText text={doc.body} />
      </article>
    </div>
  );
}
