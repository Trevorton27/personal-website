import { existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { communityEntries, formatCommunityDate } from './community';

const languages = ['en', 'ja'] as const;

describe('communityEntries', () => {
  it('has at least the Kamiyama entry', () => {
    expect(communityEntries.map((e) => e.slug)).toContain('kamiyama-ai-2026');
  });

  it('has unique slugs', () => {
    const slugs = communityEntries.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('is ordered newest first', () => {
    const dates = communityEntries.map((e) => e.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it.each(communityEntries.map((e) => [e.slug, e] as const))('%s has complete content in both languages', (_, entry) => {
    expect(entry.date).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
    for (const lang of languages) {
      expect(entry.title[lang].trim()).not.toBe('');
      expect(entry.location[lang].trim()).not.toBe('');
      expect(entry.category[lang].trim()).not.toBe('');
      expect(entry.summary[lang].trim()).not.toBe('');
      expect(entry.tags[lang].length).toBeGreaterThan(0);
      for (const detail of entry.details ?? []) {
        expect(detail.label[lang].trim()).not.toBe('');
        expect(detail.body[lang].trim()).not.toBe('');
      }
    }
  });

  it.each(communityEntries.map((e) => [e.slug, e] as const))('%s images exist with dimensions and alt text', (_, entry) => {
    expect(entry.images.length).toBeGreaterThan(0);
    for (const image of entry.images) {
      expect(image.src.startsWith('/')).toBe(true);
      expect(existsSync(join(process.cwd(), 'public', image.src))).toBe(true);
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
      for (const lang of languages) {
        expect(image.alt[lang].trim()).not.toBe('');
      }
    }
  });

  it.each(communityEntries.flatMap((e) => e.images.map((i) => [i.src, i] as const)))(
    '%s declares its real pixel dimensions',
    async (_, image) => {
      const { width, height } = await sharp(join(process.cwd(), 'public', image.src)).metadata();
      expect({ width: image.width, height: image.height }).toEqual({ width, height });
    },
  );

  it('uses all three Kamiyama photos, with the presenter photo first', () => {
    const entry = communityEntries.find((e) => e.slug === 'kamiyama-ai-2026');
    expect(entry?.images.map((i) => i.src)).toEqual([
      '/images/community/kamiyama-2026/IMG_8027.jpeg',
      '/images/community/kamiyama-2026/IMG_8026.jpeg',
      '/images/community/kamiyama-2026/IMG_8028.jpeg',
    ]);
  });
});

describe('formatCommunityDate', () => {
  it('formats a year-month in English and Japanese', () => {
    expect(formatCommunityDate('2026-07', 'en')).toBe('July 2026');
    expect(formatCommunityDate('2026-07', 'ja')).toBe('2026年7月');
  });

  it('does not shift the month in negative-offset time zones', () => {
    const original = process.env.TZ;
    process.env.TZ = 'America/Los_Angeles';
    try {
      expect(formatCommunityDate('2026-07', 'en')).toBe('July 2026');
    } finally {
      process.env.TZ = original;
    }
  });
});
