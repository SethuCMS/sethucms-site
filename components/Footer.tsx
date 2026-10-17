import Link from 'next/link';
import { LINKS } from '@/lib/content';

export function Footer() {
  return (
    <footer>
      <span>© SethuCMS. MIT licensed.</span>
      <nav aria-label="Footer">
        <a href={LINKS.github}>GitHub</a>
        <Link href="/docs">Docs</Link>
        <Link href="/packages">Packages</Link>
        <a href={LINKS.npm}>npm</a>
        <a href={LINKS.admin}>Admin</a>
      </nav>
    </footer>
  );
}
