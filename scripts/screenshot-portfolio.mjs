import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '..', 'screenshots');

// Each app: up to 2 shots — [landing, secondary route or scrolled view]
const apps = [
  {
    label: 'AI Coding Tutor (AICT)',
    shots: [
      { url: 'http://localhost:3000', file: 'aict-main-1.png', scrollY: 0 },
      { url: 'http://localhost:3000/challenges', file: 'aict-main-2.png', scrollY: 0, fallbackScroll: 700 },
    ],
  },
  {
    label: 'AI Support Engineer',
    shots: [
      { url: 'http://localhost:3001', file: 'ai-support-engineer-1.png', scrollY: 0 },
      { url: 'http://localhost:3001/tickets', file: 'ai-support-engineer-2.png', scrollY: 0, fallbackScroll: 600 },
    ],
  },
  {
    label: 'KoeJLPT',
    shots: [
      { url: 'http://localhost:3003', file: 'jlpt-app-1.png', scrollY: 0 },
      { url: 'http://localhost:3003', file: 'jlpt-app-2.png', scrollY: 700 },
    ],
  },
  {
    label: 'AI Flashcard App',
    shots: [
      { url: 'http://localhost:3004', file: 'ai-flashcard-app-1.png', scrollY: 0 },
      { url: 'http://localhost:3004/flashcards', file: 'ai-flashcard-app-2.png', scrollY: 0, fallbackScroll: 400 },
    ],
  },
];

const browser = await chromium.launch();

for (const app of apps) {
  console.log(`\n📸 ${app.label}`);
  for (const shot of app.shots) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    try {
      const resp = await page.goto(shot.url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(1500);

      // If navigated page looks like an error or redirect back to root, fall back to scrolling
      const finalUrl = page.url();
      const isErrorPage = await page.evaluate(() =>
        document.body.innerText.includes('NOT_FOUND') ||
        document.body.innerText.includes('404') ||
        document.body.innerText.includes('Invalid host')
      );

      if (isErrorPage && shot.fallbackScroll !== undefined) {
        console.log(`  ⚠ Route not available, falling back to scrolled home view`);
        await page.goto(shot.url.replace(/\/[^/]+$/, ''), { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(1500);
        await page.evaluate(y => window.scrollTo(0, y), shot.fallbackScroll);
        await page.waitForTimeout(500);
      } else if (shot.scrollY) {
        await page.evaluate(y => window.scrollTo(0, y), shot.scrollY);
        await page.waitForTimeout(500);
      }

      const outPath = path.join(outputDir, shot.file);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`  ✓ ${shot.file}`);
    } catch (err) {
      console.error(`  ✗ ${shot.file}: ${err.message}`);
    }
    await page.close();
  }
}

await browser.close();
console.log('\nDone.');
