import type { NextConfig } from 'next';

/**
 * Security headers for every page. The page has no forms and loads nothing
 * from other sites, so the policy only allows its own files. Next.js needs
 * inline scripts to start the page, hence 'unsafe-inline' for scripts.
 */
const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Script sources. React's development mode uses eval() to rebuild call stacks,
 * so 'unsafe-eval' is allowed only while running `next dev`. Production builds
 * never get it.
 */
const SCRIPT_SOURCES = isDevelopment
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'no-referrer' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      SCRIPT_SOURCES,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "frame-ancestors 'none'",
      "base-uri 'none'",
      "form-action 'none'",
    ].join('; '),
  },
];

const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: '/(.*)', headers: SECURITY_HEADERS }];
  },
};

export default config;
