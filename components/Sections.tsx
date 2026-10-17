import {
  DATABASES,
  LINKS,
  SECURITY,
  STEPS,
  WHATS_NEW,
  type Card,
} from '@/lib/content';

/** A grid of cards; the highlighted one gets the lime background. */
function CardGrid({ cards }: { cards: Card[] }) {
  return (
    <div className="grid">
      {cards.map((card) => (
        <div key={card.title} className={card.lime ? 'card lime' : 'card'}>
          <h3>{card.title}</h3>
          <p>{card.text}</p>
        </div>
      ))}
    </div>
  );
}

/** "How it works": three steps and the commands to start the gateway. */
export function HowItWorks() {
  return (
    <section className="block" id="how">
      <div className="kicker">How it works</div>
      <h2 className="title">Three steps, on your own machine.</h2>
      <p className="sub">
        There is nothing to sign up for. The gateway is a program you run. The
        admin panel is a web page that talks to it.
      </p>
      <ol className="steps">
        {STEPS.map((step) => (
          <li key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
      <pre aria-label="Commands to start the gateway">
        <b>cd</b> sethucms
        {'\n'}
        <b>sh</b> scripts/build-all.sh
        {'\n'}
        <b>sh</b> scripts/run-local.sh{'   '}
        <span style={{ opacity: 0.55 }}># http://127.0.0.1:8080</span>
      </pre>
    </section>
  );
}

/** Recent additions. */
export function WhatsNew() {
  return (
    <section className="block" id="new" style={{ paddingTop: 0 }}>
      <div className="kicker">What’s new</div>
      <h2 className="title">More ways to work with your content.</h2>
      <p className="sub">
        Recent additions. Each one is covered by tests; the hosted pieces are
        still being tried on a real deployment.
      </p>
      <CardGrid cards={WHATS_NEW} />
    </section>
  );
}

export function Security() {
  return (
    <section className="block" id="security" style={{ paddingTop: 0 }}>
      <div className="kicker">Security first</div>
      <h2 className="title">Built so the safe way is the default.</h2>
      <CardGrid cards={SECURITY} />
    </section>
  );
}

/** Which databases have been tested, and how far. */
export function Status() {
  return (
    <section className="block" id="status" style={{ paddingTop: 0 }}>
      <div className="kicker">Where it stands</div>
      <h2 className="title">Early, and honest about it.</h2>
      <p className="sub">
        SethuCMS is version 0.1.0. This is what has been tested, and what has
        not. Projects, hosted sign-in and file uploads are tested with simulated
        services and are still being tried on a live deployment.
      </p>
      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>Database</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {DATABASES.map((database) => (
              <tr key={database.name}>
                <td>{database.name}</td>
                <td>
                  <span
                    className={
                      database.level === 'tested'
                        ? 'st'
                        : database.level === 'compatible'
                          ? 'st mid'
                          : 'st no'
                    }
                  >
                    {database.label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/** Closing call to action. */
export function Final() {
  return (
    <div className="final">
      <h2>Try it on a copy of your data.</h2>
      <p>
        It is free software under the MIT licence, with no warranty. Start
        read-only, and tell us what breaks.
      </p>
      <div className="cta" style={{ margin: 0 }}>
        <a className="btn btn-dark" href={LINKS.github}>
          See the code
        </a>
        <a className="btn btn-line" href={LINKS.npm}>
          npm packages
        </a>
      </div>
    </div>
  );
}
