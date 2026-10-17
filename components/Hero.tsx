import Image from 'next/image';
import Link from 'next/link';
import { LINKS } from '@/lib/content';

const SIDEBAR = [
  'Home',
  'Content',
  'Connections',
  'Roles and access',
  'Projects',
  'Audit log',
];

/** Opening block: the promise, two buttons and a picture of the admin. */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div>
        <div className="pill">
          <i />
          Open source · MIT licence · Version 0.1.0
        </div>
        <h1>
          Use the <em>database</em> you already have.
        </h1>
        <p className="lede">
          SethuCMS is a content management system that sits in front of your own
          PostgreSQL, MySQL, MongoDB or Firestore. You run it next to your
          database, so your data stays where it is.
        </p>
        <div className="cta">
          <Link className="btn btn-coral" href="/docs/28-run-it-yourself">
            Read how to run it
          </Link>
          <a className="btn btn-line" href={LINKS.admin}>
            Open the admin
          </a>
        </div>
        <div className="facts">
          <span>
            <b>Your data</b> never passes through us
          </span>
          <span>
            <b>One person</b>, one login: Google, GitHub or an authenticator
          </span>
        </div>
      </div>

      <div
        className="stage"
        role="img"
        aria-label="Illustration of the admin panel"
      >
        <div className="disc" />
        <div className="window">
          <div className="win-in">
            <div className="win-side">
              <div className="logo">
                <Image src="/logo.svg" alt="" width={22} height={22} />
                sethucms
              </div>
              {SIDEBAR.map((name, index) => (
                <span key={name} className={index === 0 ? 'on' : undefined}>
                  {name}
                </span>
              ))}
            </div>
            <div className="win-main">
              <h3>Your connections</h3>
              <div className="row">
                <b>Orders database</b>
                <span className="ok">Healthy</span>
              </div>
              <div className="row">
                <b>Blog</b>
                <span className="tag sky">Read-only</span>
              </div>
              <div className="row">
                <b>Drafts waiting</b>
                <span className="tag blush">Review</span>
              </div>
              <div className="row">
                <b>Sign-in</b>
                <span className="tag">Google or GitHub</span>
              </div>
            </div>
          </div>
        </div>
        <div className="float">
          <i>✓</i>
          <div>
            <b>Published</b>
            <small>Approved by an editor</small>
          </div>
        </div>
        <div className="caption">Illustration, not real data.</div>
      </div>
    </section>
  );
}
