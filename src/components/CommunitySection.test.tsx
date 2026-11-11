import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { translations } from '@/lib/translations';
import type { Language } from './LanguageProvider';
import { CommunitySection } from './CommunitySection';

function render(language: Language, isDark = true) {
  const t = (key: string) => {
    const [group, name] = key.split('.');
    const table = translations[language] as unknown as Record<string, Record<string, string>>;
    return table[group]?.[name] ?? key;
  };
  return renderToStaticMarkup(<CommunitySection isDark={isDark} language={language} t={t} />);
}

const imgTags = (html: string) => html.match(/<img [^>]*>/g) ?? [];

describe('CommunitySection', () => {
  it('renders an anchored section with heading and intro', () => {
    const html = render('en');
    expect(html).toMatch(/<section[^>]*id="community"/);
    expect(html).toMatch(/<h2[^>]*id="community-heading"[^>]*>Community<\/h2>/);
    expect(html).toContain('aria-labelledby="community-heading"');
    expect(html).toContain('helping people and organizations navigate digital transformation');
  });

  it('renders the Kamiyama entry in English', () => {
    const html = render('en');
    expect(html).toContain('AI: Supporting Japan&#x27;s Future');
    expect(html).toContain('July 2026');
    expect(html).toContain('Kamiyama, Tokushima, Japan');
    expect(html).toContain('AI Education');
    expect(html).toContain('Delivered a Japanese-language presentation');
    expect(html).toContain('The context');
    expect(html).toContain('Regional revitalization');
    expect(html).toContain('Bilingual technical communication');
  });

  it('renders the Kamiyama entry in Japanese', () => {
    const html = render('ja');
    expect(html).toContain('>コミュニティ<');
    expect(html).toContain('AI：日本の未来を支える');
    expect(html).toContain('2026年7月');
    expect(html).toContain('徳島県神山町');
    expect(html).toContain('地域活性化');
  });

  it('renders all three photos with alt text and intrinsic dimensions', () => {
    const imgs = imgTags(render('en'));
    expect(imgs).toHaveLength(3);
    for (const img of imgs) {
      expect(img).toMatch(/alt="[^"]{20,}"/);
      expect(img).toMatch(/width="\d+"/);
      expect(img).toMatch(/height="\d+"/);
      expect(img).toContain('loading="lazy"');
    }
    expect(imgs[0]).toContain('IMG_8027.jpeg');
    expect(imgs[0]).toContain('Presenter speaking to a small group');
  });

  it('localizes photo alt text', () => {
    expect(imgTags(render('ja'))[0]).toContain('alt="神山町でのAIセッション');
  });

  it('switches surface colours with the theme', () => {
    expect(render('en', true)).toContain('bg-slate-800/60');
    const light = render('en', false);
    expect(light).toContain('bg-slate-100 text-slate-600');
    expect(light).not.toContain('bg-slate-800');
  });
});
