import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Video demos · SethuCMS',
  description:
    'Short narrated videos: create, update and delete a record, put SethuCMS on a website, and edit these docs without a redeploy.',
};

const DEMOS = [
  {
    file: 'demo-1-create-a-record.mp4',
    title: 'Create a record',
    text: 'Start a blank record, fill the fields, and publish it. Drafts stay safe until you press Publish.',
  },
  {
    file: 'demo-2-update-a-record.mp4',
    title: 'Update a record',
    text: 'Change a title, see it saved as a draft, then publish so the live record changes.',
  },
  {
    file: 'demo-3-delete-a-record.mp4',
    title: 'Delete a record',
    text: 'Delete asks you to confirm, because it cannot be undone. The deletion goes into the audit log.',
  },
  {
    file: 'demo-4-integrate-sethucms.mp4',
    title: 'Put SethuCMS on your website',
    text: 'Run npm create sethucms, answer a few questions, and watch an edit in the editor show up on the site with no deploy.',
    guide: '/docs/35-start-with-one-command',
  },
  {
    file: 'demo-5-docs-edited-in-sethucms.mp4',
    title: 'These docs, edited in SethuCMS',
    text: 'Our docs change every day, so they live in SethuCMS. Edit or add a guide and the site follows, without a redeploy.',
    guide: '/docs/38-edit-these-docs-in-sethucms',
  },
];

/** The narrated demo videos, one per task. Voice and captions are in the files. */
export default function DemosPage() {
  return (
    <div className="wrap page">
      <div className="kicker">Demos</div>
      <h1 className="page-title">Watch it done, step by step.</h1>
      <p className="sub">
        Five short videos with a voice and captions. Each one is a real run
        against a real gateway.
      </p>
      <div className="demo-list">
        {DEMOS.map((demo) => (
          <section key={demo.file} className="demo">
            <h2 className="group-title">{demo.title}</h2>
            <p className="muted">{demo.text}</p>
            <video
              controls
              preload="metadata"
              playsInline
              src={`/demos/${demo.file}`}
              aria-label={demo.title}
            />
            {demo.guide ? (
              <p>
                <Link href={demo.guide}>Read the written guide</Link>
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}
