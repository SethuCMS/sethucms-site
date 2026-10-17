# sethucms-site

The SethuCMS website, built with Next.js (App Router, TypeScript).

```
pnpm install      # or npm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm typecheck
```

- Pages: Home, `/packages`, `/docs` and one page per guide (`/docs/<guide>`).
  The guides are copies of the markdown in the sethucms-docs repository; run
  `pnpm sync-docs` to refresh them.
- Words live in `lib/content.ts`; layout in `components/`; styles in
  `app/globals.css`.
- Security headers (including a strict Content-Security-Policy) are set in
  `next.config.ts`.
- Deploy to Vercel: import the repo, no settings needed.

Licence: MIT.
