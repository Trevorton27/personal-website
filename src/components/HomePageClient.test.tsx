import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { HomePageClient } from './HomePageClient';
import { LanguageProvider } from './LanguageProvider';
import { ThemeProvider } from './ThemeProvider';

vi.mock('@/images/trevorMearnsHeadShot.png', () => ({
  default: { src: '/headshot.png', width: 800, height: 1000, blurDataURL: 'data:image/png;base64,AA==' },
}));

const html = renderToStaticMarkup(
  <ThemeProvider>
    <LanguageProvider>
      <HomePageClient projects={[]} latestPosts={[]} />
    </LanguageProvider>
  </ThemeProvider>,
);

describe('HomePageClient', () => {
  it('places Community between Portfolio and Writing', () => {
    const portfolio = html.indexOf('id="portfolio"');
    const community = html.indexOf('id="community"');
    const writing = html.indexOf('id="writing"');
    expect(portfolio).toBeGreaterThan(-1);
    expect(community).toBeGreaterThan(portfolio);
    expect(writing).toBeGreaterThan(community);
  });

  it('links to #community right after Portfolio in the nav', () => {
    const nav = html.match(/<nav[^>]*aria-label="Main navigation"[\s\S]*?<\/nav>/)?.[0] ?? '';
    const hrefs = [...nav.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    expect(hrefs.indexOf('#community')).toBe(hrefs.indexOf('#portfolio') + 1);
  });
});
