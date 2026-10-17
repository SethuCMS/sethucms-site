/**
 * Everything the page says, in one place, so the words can change without
 * touching the layout.
 */

export const LINKS = {
  github: 'https://github.com/SethuCMS',
  /** The docs repository: used only for files that are not guides. */
  docs: 'https://github.com/SethuCMS/sethucms-docs',
  npm: 'https://www.npmjs.com/org/sethucms',
  admin: 'https://sethucms-admin.vercel.app',
} as const;

/** A card in a grid; `lime` marks the highlighted one. */
export interface Card {
  title: string;
  text: string;
  lime?: boolean;
}

export const STEPS: Array<{ title: string; text: string }> = [
  {
    title: 'Run the gateway',
    text: 'Start it next to your database, on your computer or a server. The first start prints a one-time admin token.',
  },
  {
    title: 'Connect your database',
    text: 'Open the admin, add a connection, and start read-only. Choose which tables to expose as content.',
  },
  {
    title: 'Add your team',
    text: 'Invite teammates by e-mail with a role. They sign in with Google or GitHub, or an authenticator code on your own server. Then revoke the first token.',
  },
];

export const WHATS_NEW: Card[] = [
  {
    title: 'Projects',
    text: 'One person can have several projects, each with its own connections, people and content, and switch between them from the sidebar. Invite teammates by e-mail.',
    lime: true,
  },
  {
    title: 'Schema as code',
    text: 'Describe fields, labels, editors and which fields to hide in a file that lives with your code. It can tighten rules; it never loosens what your database enforces.',
  },
  {
    title: 'Files and images',
    text: 'Upload files with type checks, content sniffing, metadata stripping and storage limits. Files stay private unless you publish them.',
  },
  {
    title: 'Google and GitHub sign-in',
    text: 'Teammates sign in with an account they already have. Roles still decide what each person can do.',
  },
  {
    title: 'Choose the fields you see',
    text: 'Show or hide fields while editing, and switch any field to edit as raw code when you need to.',
  },
  {
    title: 'Smaller, clearer code',
    text: 'Every source file stays under 700 lines, so the project is easier to read, review and trust.',
  },
];

export const SECURITY: Card[] = [
  {
    title: 'One login per person',
    text: 'Sign in with Google or GitHub, or with an authenticator code on your own server. No shared password.',
    lime: true,
  },
  {
    title: 'Roles that mean something',
    text: 'Admins manage connections and people. Editors work on content. Viewers read published content only.',
  },
  {
    title: 'Read-only first',
    text: 'A new connection starts read-only. New tables stay out of the API until someone reviews them.',
  },
  {
    title: 'A record of every change',
    text: 'An audit log shows who changed what and when, and it is built so tampering shows.',
  },
  {
    title: 'Hashed tokens',
    text: 'API tokens are stored only as hashes and are shown once. Replace one and the old one keeps working for an hour.',
  },
  {
    title: 'You hold the keys',
    text: 'The gateway runs on your side. Your database passwords stay encrypted on your own server.',
  },
];

/** How far each database has been tested. */
export type Level = 'tested' | 'compatible' | 'no';

export const DATABASES: Array<{ name: string; level: Level; label: string }> = [
  { name: 'PostgreSQL', level: 'tested', label: 'Tested on the real database' },
  { name: 'SQLite', level: 'tested', label: 'Tested on the real database' },
  {
    name: 'MySQL and MariaDB',
    level: 'compatible',
    label: 'Tested on compatible servers',
  },
  {
    name: 'MongoDB',
    level: 'compatible',
    label: 'Tested on a compatible server',
  },
  { name: 'Firestore', level: 'compatible', label: 'Experimental' },
  { name: 'SQL Server', level: 'no', label: 'Not supported yet' },
];

/** A package published on npm under the @sethucms name. */
export interface Package {
  name: string;
  text: string;
}

/** Packages, grouped by what a person wants to do with them. */
export const PACKAGE_GROUPS: Array<{
  title: string;
  text: string;
  packages: Package[];
}> = [
  {
    title: 'Use SethuCMS in your app',
    text: 'Read and write content from your website or app.',
    packages: [
      {
        name: '@sethucms/sdk',
        text: 'The TypeScript client for the SethuCMS API. Works in Node 20 or newer, browsers and edge runtimes.',
      },
    ],
  },
  {
    title: 'Connect a database',
    text: 'Install the one that matches the database you already run.',
    packages: [
      {
        name: '@sethucms/adapter-postgres',
        text: 'PostgreSQL.',
      },
      {
        name: '@sethucms/adapter-mysql',
        text: 'MySQL and MariaDB.',
      },
      {
        name: '@sethucms/adapter-mongodb',
        text: 'MongoDB.',
      },
      {
        name: '@sethucms/adapter-sqlite',
        text: 'SQLite, using the SQLite built into Node.js.',
      },
      {
        name: '@sethucms/adapter-firestore',
        text: 'Firestore (Firebase).',
      },
    ],
  },
  {
    title: 'Build your own',
    text: 'For people who write adapters or tools on top of SethuCMS.',
    packages: [
      {
        name: '@sethucms/core',
        text: 'Shared types: content model, query language, permissions and errors.',
      },
      {
        name: '@sethucms/adapter-sdk',
        text: 'The adapter contract, a safety layer, and a test suite to check a new adapter.',
      },
      {
        name: '@sethucms/adapter-memory',
        text: 'An in-memory adapter for tests, demos and as a starting template.',
      },
      {
        name: '@sethucms/adapter-sql-kit',
        text: 'Shared building blocks for the PostgreSQL, MySQL and SQLite adapters.',
      },
    ],
  },
];

/** How the guides are grouped on the Docs page. */
export const DOC_GROUPS: Array<{
  title: string;
  text: string;
  slugs: string[];
}> = [
  {
    title: 'Start here',
    text: 'What it is, and how to run it.',
    slugs: [
      '01-overview',
      '28-run-it-yourself',
      '14-build-and-run',
      '26-hosted-gateway',
      '25-use-from-your-app',
    ],
  },
  {
    title: 'Using it',
    text: 'Day-to-day work in the admin app.',
    slugs: [
      '32-admin-app',
      '30-workspaces',
      '29-schema-as-code',
      '31-files-and-images',
      '13-drafts-and-publishing',
      '24-changes-and-webhooks',
      '21-sso',
      '17-migration',
    ],
  },
  {
    title: 'Security and running it',
    text: 'Keeping it safe, deployed and watched.',
    slugs: [
      '07-security',
      '15-deploy-production',
      '22-deploy-cloud',
      '10-deployment',
      '16-logging-and-monitoring',
    ],
  },
  {
    title: 'Build on it',
    text: 'The API, the adapters and how the code fits together.',
    slugs: [
      '08-api',
      '09-sdks',
      '18-adapters',
      '05-adapter-contract',
      '23-grpc-adapters',
      '06-data-model',
      '04-architecture',
      '12-gateway',
      '33-code-layout',
    ],
  },
  {
    title: 'The project',
    text: 'Why it exists and where it is going.',
    slugs: [
      '02-what-to-build',
      '03-language-decision',
      '11-roadmap',
      '27-upcoming-and-plans',
      '19-open-source-release',
      '20-sponsorship',
    ],
  },
];

/** Guides shown in the Docs menu; `isNew` marks the recent additions. */
export const DOCS_MENU: Array<{
  slug: string;
  label: string;
  isNew?: boolean;
}> = [
  { slug: '28-run-it-yourself', label: 'Run it yourself' },
  { slug: '25-use-from-your-app', label: 'Use it from your app' },
  { slug: '30-workspaces', label: 'Projects and workspaces', isNew: true },
  { slug: '29-schema-as-code', label: 'Schema as code', isNew: true },
  { slug: '31-files-and-images', label: 'Images and files', isNew: true },
  { slug: '32-admin-app', label: 'The admin app', isNew: true },
  { slug: '33-code-layout', label: 'How the code is laid out', isNew: true },
];
