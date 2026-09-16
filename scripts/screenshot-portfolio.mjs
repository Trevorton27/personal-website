import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '..', 'public', 'portfolio');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const apps = [
  {
    label: 'Support Buddy X9000',
    slug: 'support-buddy-x9000',
    baseUrl: 'https://the-support-buddy-x9000.vercel.app',
    shots: [
      { suffix: 'hero', scrollY: 0 },
      { suffix: 'pipeline', scrollY: 800 },
      { suffix: 'features', scrollY: 1600 },
    ],
  },
  {
    label: 'AI Support Engineer',
    slug: 'ai-support-engineer',
    baseUrl: 'https://smart-ticket-system.vercel.app',
    shots: [
      { suffix: 'hero', scrollY: 0 },
      { suffix: 'dashboard', scrollY: 700 },
      { suffix: 'features', scrollY: 1400 },
    ],
  },
  {
    label: 'Inside the LLM',
    slug: 'inside-the-llm',
    baseUrl: 'https://inside-the-llm-nine.vercel.app',
    shots: [
      { suffix: 'hero', scrollY: 0 },
      { suffix: 'pipeline', scrollY: 800 },
      { suffix: 'visualization', scrollY: 1600 },
    ],
  },
  {
    label: 'KoeJLPT',
    slug: 'jlpt-app',
    baseUrl: 'https://jlpt-app-seven.vercel.app',
    shots: [
      { suffix: 'hero', scrollY: 0 },
      { suffix: 'study', scrollY: 700 },
      { suffix: 'features', scrollY: 1400 },
    ],
  },
  {
    label: 'AI Coding Tutor',
    slug: 'aict-main',
    baseUrl: 'https://aict-main-web.vercel.app',
    shots: [
      { suffix: 'hero', scrollY: 0 },
      { suffix: 'challenges', scrollY: 700 },
      { suffix: 'editor', scrollY: 1400 },
    ],
  },
  // Udemy Compress-a-macator has no live demo — skip
];

const browser = await chromium.launch();

for (const app of apps) {
  console.log(`\n📸 ${app.label}`);
  for (const shot of app.shots) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    const file = `${app.slug}-${shot.suffix}.png`;
    try {
      await page.goto(app.baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      if (shot.scrollY > 0) {
        await page.evaluate((y) => window.scrollTo(0, y), shot.scrollY);
        await page.waitForTimeout(800);
      }

      const outPath = path.join(outputDir, file);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`  ✓ ${file}`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
    await page.close();
  }
}

await browser.close();
console.log('\nDone.');
