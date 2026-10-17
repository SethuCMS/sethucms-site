'use client';

import { useEffect, useId, useState } from 'react';

/** The drawing, or why it could not be drawn. */
type Drawn = { svg: string } | { error: string };

/**
 * One diagram from a guide, drawn in the browser. Mermaid is loaded only when
 * a page has a diagram. It runs in its strict mode, which escapes the text in
 * the diagram and turns off clickable links, so a guide cannot inject
 * anything. If drawing fails, the diagram source is shown instead.
 */
export function Mermaid({ chart }: { chart: string }) {
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const [drawn, setDrawn] = useState<Drawn | null>(null);

  useEffect(() => {
    let cancelled = false;
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    void import('mermaid')
      .then(async ({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: dark ? 'dark' : 'neutral',
          fontFamily: 'inherit',
        });
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled) {
          setDrawn({ svg });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setDrawn({
            error: error instanceof Error ? error.message : 'Could not draw',
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (drawn && 'svg' in drawn) {
    return (
      <figure
        className="diagram"
        // Mermaid's strict mode already sanitises what it returns.
        dangerouslySetInnerHTML={{ __html: drawn.svg }}
      />
    );
  }
  return (
    <figure className="diagram diagram-wait">
      {drawn ? (
        <>
          <figcaption>This diagram could not be drawn. Its source:</figcaption>
          <pre>
            <code>{chart}</code>
          </pre>
        </>
      ) : (
        <figcaption>Drawing diagram…</figcaption>
      )}
    </figure>
  );
}
