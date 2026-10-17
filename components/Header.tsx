import Image from 'next/image';
import Link from 'next/link';
import { DOCS_MENU, LINKS } from '@/lib/content';

/**
 * The top bar. The Docs item opens a menu on hover or keyboard focus, listing
 * the guides people look for first and the newest additions.
 */
export function Header() {
  return (
    <header>
      <Link className="brand" href="/" aria-label="SethuCMS home">
        <Image src="/logo.svg" alt="" width={36} height={36} priority />
        sethucms
      </Link>
      <nav className="links" aria-label="Main">
        <Link href="/#how">How it works</Link>
        <Link href="/#new">What’s new</Link>
        <Link href="/#security">Security</Link>
        <Link href="/packages">Packages</Link>
        <div className="menu">
          <Link href="/docs" aria-haspopup="true">
            Docs
          </Link>
          <div className="menu-panel">
            {DOCS_MENU.map((item) => (
              <Link key={item.slug} href={`/docs/${item.slug}`}>
                {item.label}
                {item.isNew ? <span className="new-tag">New</span> : null}
              </Link>
            ))}
            <Link href="/docs" className="menu-all">
              All docs
            </Link>
          </div>
        </div>
      </nav>
      <div className="head-actions">
        <a className="btn btn-line" href={LINKS.github}>
          GitHub
        </a>
        <a className="btn btn-dark" href={LINKS.admin}>
          Open the admin
        </a>
      </div>
    </header>
  );
}
