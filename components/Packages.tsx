import { LINKS, PACKAGE_GROUPS } from '@/lib/content';

/**
 * The npm packages, in plain words. Each one links to its npm page and shows
 * the command that installs it. `page` is true on the Packages page itself.
 */
export function Packages({ page = false }: { page?: boolean }) {
  return (
    <section>
      <div className="kicker">Packages</div>
      {page ? (
        <h1 className="page-title">Install only what you need.</h1>
      ) : (
        <h2 className="title">Install only what you need.</h2>
      )}
      <p className="sub">
        SethuCMS is published as small packages on npm, a free library of
        JavaScript code. Pick the ones for your job and install them with one
        command. You can browse all of them on{' '}
        <a href={LINKS.npm}>the SethuCMS npm page</a>.
      </p>
      {PACKAGE_GROUPS.map((group) => (
        <div key={group.title} className="pkg-group">
          <h2 className="group-title">{group.title}</h2>
          <p className="muted">{group.text}</p>
          <div className="grid">
            {group.packages.map((item) => (
              <div key={item.name} className="card">
                <h3>
                  <a
                    href={`https://www.npmjs.com/package/${item.name}`}
                    rel="noopener"
                  >
                    {item.name}
                  </a>
                </h3>
                <p>{item.text}</p>
                <code className="install">npm install {item.name}</code>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
