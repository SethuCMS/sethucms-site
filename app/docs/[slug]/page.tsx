import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsNav } from '@/components/DocsNav';
import { GuideText } from '@/components/Markdown';
import { allDocs, getDoc } from '@/lib/docs';

type Params = { params: Promise<{ slug: string }> };

/**
 * Guides written in SethuCMS after the last deploy are built on first visit,
 * then refreshed at most once a minute. Unknown addresses are still a 404.
 */
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await allDocs()).map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDoc(slug);
  return doc
    ? { title: `${doc.title} · SethuCMS docs`, description: doc.summary }
    : {};
}

/** One guide, with the list of all guides beside it. */
export default async function GuidePage({ params }: Params) {
  const { slug } = await params;
  const doc = await getDoc(slug);
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
