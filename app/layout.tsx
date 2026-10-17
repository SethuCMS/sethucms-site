import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'SethuCMS',
  description:
    'SethuCMS is an open-source, security-first content management system that works with the database you already have.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

/** Every page shares the same top bar and footer. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div className="wrap">
          <Header />
        </div>
        <main id="main">{children}</main>
        <div className="wrap">
          <Footer />
        </div>
      </body>
    </html>
  );
}
