import Markdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { Mermaid } from '@/components/Mermaid';

const REPO_DOCS = 'https://github.com/SethuCMS/sethucms-docs/blob/main/docs/';
const GUIDE = /^(\d\d-[a-z0-9-]+)\.md(#.*)?$/;

/**
 * Where a link inside a guide should go: other guides open inside the site,
 * files from the repository open on GitHub, everything else stays as written.
 */
export function resolveLink(href: string): { href: string; external: boolean } {
  const guide = GUIDE.exec(href);
  if (guide) {
    return { href: `/docs/${guide[1]}${guide[2] ?? ''}`, external: false };
  }
  if (href.startsWith('#')) {
    return { href, external: false };
  }
  if (/^https?:\/\//.test(href)) {
    return { href, external: true };
  }
  return { href: new URL(href, REPO_DOCS).toString(), external: true };
}

/**
 * A guide's markdown as page content. Raw HTML in the text is not rendered,
 * so a guide can never inject markup.
 */
export function GuideText({ text }: { text: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={{
        pre({ children, node }) {
          // A ```mermaid block is a diagram, not code to show.
          const code = node?.children[0];
          if (
            code &&
            code.type === 'element' &&
            code.tagName === 'code' &&
            Array.isArray(code.properties?.className) &&
            code.properties.className.includes('language-mermaid')
          ) {
            const first = code.children[0];
            const text = first && first.type === 'text' ? first.value : '';
            return <Mermaid chart={text.trim()} />;
          }
          return <pre>{children}</pre>;
        },
        a({ href, children }) {
          const target = resolveLink(href ?? '#');
          return target.external ? (
            <a href={target.href} rel="noopener noreferrer">
              {children}
            </a>
          ) : (
            <a href={target.href}>{children}</a>
          );
        },
      }}
    >
      {text}
    </Markdown>
  );
}
