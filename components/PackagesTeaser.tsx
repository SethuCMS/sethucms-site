import Link from 'next/link';

/** A short pointer from the home page to the Packages page. */
export function PackagesTeaser() {
  return (
    <section className="block" id="packages" style={{ paddingTop: 0 }}>
      <div className="kicker">Packages</div>
      <h2 className="title">Install only what you need.</h2>
      <p className="sub">
        SethuCMS comes as small packages on npm: a client for your app, one
        adapter for each database, and building blocks for your own tools.
      </p>
      <div className="cta">
        <Link className="btn btn-dark" href="/packages">
          See all packages
        </Link>
        <Link className="btn btn-line" href="/docs">
          Read the docs
        </Link>
      </div>
    </section>
  );
}
