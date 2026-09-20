import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'portfolio');

interface Shot {
  name: string;
  scrollY?: number;
  action?: (page: import('playwright').Page) => Promise<void>;
}

interface App {
  slug: string;
  url: string;
  shots: Shot[];
}

const apps: App[] = [
  {
    slug: 'support-buddy-x9000',
    url: 'https://the-support-buddy-x9000.vercel.app/',
    shots: [
      { name: 'hero', scrollY: 0 },
      { name: 'dashboard', scrollY: 600 },
      { name: 'pipeline', scrollY: 1200 },
    ],
  },
  {
    slug: 'ai-support-engineer',
    url: 'https://smart-ticket-system.vercel.app/',
    shots: [
      { name: 'hero', scrollY: 0 },
      { name: 'dashboard', scrollY: 600 },
      { name: 'features', scrollY: 1200 },
    ],
  },
  {
    slug: 'inside-the-llm',
    url: 'https://inside-the-llm-nine.vercel.app/',
    shots: [
      { name: 'hero', scrollY: 0 },
      { name: 'pipeline', scrollY: 600 },
      { name: 'visualization', scrollY: 1200 },
    ],
  },
  {
    slug: 'jlpt-app',
    url: 'https://jlpt-app-seven.vercel.app/',
    shots: [
      { name: 'hero', scrollY: 0 },
      { name: 'study', scrollY: 600 },
      { name: 'features', scrollY: 1200 },
    ],
  },
  {
    slug: 'aict-main',
    url: 'https://aict-main-web.vercel.app',
    shots: [
      { name: 'hero', scrollY: 0 },
      { name: 'challenges', scrollY: 600 },
      { name: 'editor', scrollY: 1200 },
    ],
  },
];

async function capture() {
  const browser = await chromium.launch({ headless: true });

  for (const app of apps) {
    console.log(`\nCapturing ${app.slug}...`);
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const page = await context.newPage();

    try {
      await page.goto(app.url, { waitUntil: 'networkidle', timeout: 30000 });
      // Let any animations settle after initial load
      await page.waitForTimeout(1500);

      for (const shot of app.shots) {
        if (shot.action) {
          await shot.action(page);
        } else {
          const scrollY = shot.scrollY ?? 0;
          await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
          await page.waitForTimeout(600);
        }

        const outPath = path.join(OUTPUT_DIR, `${app.slug}-${shot.name}.png`);
        await page.screenshot({ path: outPath, fullPage: false });
        console.log(`  ✓ ${app.slug}-${shot.name}.png`);
      }
    } catch (err) {
      console.error(`  ✗ Failed for ${app.slug}:`, err);
    }

    await context.close();
  }

  await browser.close();
  console.log('\nDone.');
}

capture();
