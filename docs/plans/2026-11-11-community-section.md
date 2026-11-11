---
title: Community section (Kamiyama AI presentation)
status: active   # approved via the Kamiyama implementation prompt (2026-11-11)
owner: Trevor
created: 2026-11-11
---

# Community section

## Problem and outcome
The homepage has no place for talks, workshops or community outreach. When this is done, a bilingual
**Community** section sits between Portfolio and Writing, is linked from the desktop and mobile nav,
and shows the July 2026 Kamiyama AI presentation with all three supplied photos. Further entries are
added by appending to one data array.

## Acceptance criteria
1. The homepage renders a `<section id="community">` after `#portfolio` and before `#writing`.
2. Desktop and mobile nav (homepage nav and shared `Header`) link to `#community` / `/#community`, placed after Portfolio.
3. The Kamiyama entry renders title, localized date (July 2026 / 2026年7月), location, category, summary, detail blocks, tags and skills footer, in EN and JA.
4. All three photos render from `public/images/community/kamiyama-2026/` with descriptive alt text and explicit width/height (no layout shift, no cropping).
5. Entries come from a typed `communityEntries` array (title, date, location, category, summary, tags, images, optional `detailUrl`); every referenced image exists on disk.
6. Lint, type check, tests and `next build` pass.

## Out of scope
- A `/community/[slug]` detail page (homepage holds the full entry; `detailUrl` is supported for later).
- A "View presentation" link (no public deck exists in the repo).
- Scroll-spy active-section highlighting (the site doesn't have it today).

## Design
- `src/data/community.ts`: `CommunityEntry` type + `communityEntries` (newest first) + `formatCommunityDate`.
- `src/components/CommunitySection.tsx`: presentational, takes `isDark` + `language` like `WritingSection` takes `isDark`.
- `src/components/HomePageClient.tsx`: render section between Portfolio and Writing; add nav item.
- `src/components/public/Header.tsx`: add `/#community` nav item.
- `src/lib/translations.ts`: `common.community`, `home.communityTitle`, `home.communityIntro`, `home.communityTopics`, `home.communityReadMore`.
- `src/components/LanguageProvider.tsx`: export the `Language` type for reuse.
- Gallery: `grid-cols-[8fr_5fr]` on lg, which matches column heights for one portrait primary + landscape/portrait supporting pair at natural aspect ratios; stacked on smaller screens. `next/image` with width/height, lazy (below the fold).
- Tests: add Vitest (dev only; the repo has no test runner and the guardrails workflow requires tests).

## Risks and unknowns
| Risk | How we'll check it |
|---|---|
| `next/image` under Vitest | Render test with `react-dom/server` |
| Date shifts a month in negative-offset time zones | Format with `timeZone: 'UTC'`, unit test |
| Portrait photos too tall on mobile | Playwright screenshots at 375 / 768 / 1280 |

## Test plan
| Criterion | Test file | What it asserts |
|---|---|---|
| 1 | `src/components/HomePageClient.test.tsx` | `id="portfolio"` < `id="community"` < `id="writing"` in rendered HTML |
| 2 | `src/components/HomePageClient.test.tsx`, `src/components/public/Header.test.tsx` | nav contains `#community` link right after Portfolio |
| 3 | `src/components/CommunitySection.test.tsx` | EN and JA render title, date, location, summary, tags |
| 4 | `src/components/CommunitySection.test.tsx` | three `<img>` with alt text, width and height |
| 5 | `src/data/community.test.ts` | required fields in both languages, unique slugs, newest first, image files exist with their declared pixel dimensions |
| 6 | — | `npm run lint`, `npx tsc --noEmit`, `npx vitest run`, `npm run build` |

**Eval impact:** none

## Tasks
- [x] 1. Add Vitest and the data module with its test.
- [x] 2. CommunitySection component and its test; copy photos.
- [x] 3. Wire into homepage + nav (both headers) with ordering tests.
- [x] 4. Full checks + responsive screenshots.

## Decisions log
- 2026-11-11: No detail page. The homepage entry is short enough to hold the full copy, which keeps routing unchanged.
- 2026-11-11: Photos are shown at their natural aspect ratio instead of `object-cover`, so no participant or speaker gets cropped out.
- 2026-11-11: Trimmed the black letterbox bars from all three photos (top/bottom only, 6-40px each) at JPEG q92 4:4:4, at Trevor's request. Declared dimensions are now checked against the files by a test.
- 2026-11-11: Added an ESLint flat config so `next lint` (and the guardrails lint hooks/CI) can run; fixed the 26 existing errors it found as a separate commit.
- 2026-11-11: Declared `sharp` as a dev dependency (same version Next already pulls in) because the dimension test reads image metadata.
