import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '../LanguageProvider';
import { ThemeProvider } from '../ThemeProvider';
import { Header } from './Header';

vi.mock('next/navigation', () => ({ usePathname: () => '/blog' }));

describe('Header', () => {
  it('links to /#community right after Portfolio', () => {
    const html = renderToStaticMarkup(
      <ThemeProvider>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </ThemeProvider>,
    );
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    expect(hrefs.indexOf('/#community')).toBe(hrefs.indexOf('/#portfolio') + 1);
    expect(html).toContain('>Community</a>');
  });
});
