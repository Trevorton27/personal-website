#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { exec as execCb } from 'child_process';

const exec = promisify(execCb);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const cacheRoot = path.join(projectRoot, '.cache', 'portfolio-sync');
const publicDir = path.join(projectRoot, 'public', 'portfolio');
const dataDir = path.join(projectRoot, 'src', 'data');
const dataPath = path.join(dataDir, 'portfolio.json');

const REPOS = [
  { owner: 'Trevorton27', repo: 'signal-works-lms', category: 'AI LMS' },
  { owner: 'Trevorton27', repo: 'aict-main', category: 'AI/Automation' },
  { owner: 'Trevorton27', repo: 'voice-app', category: 'Voice Apps' },
  { owner: 'Trevorton27', repo: 'ai-support-engineer-integration', category: 'Integrations' },
];

const TITLE_OVERRIDES = {
  'signal-works-lms': 'Signal Works LMS',
  'aict-main': 'AICT',
  'voice-app': 'Voice App',
  'ai-support-engineer-integration': 'AI Support Engineer Integration',
};

const PACKAGE_LABELS = new Map([
  ['next', 'Next.js'],
  ['react', 'React'],
  ['react-dom', 'React'],
  ['typescript', 'TypeScript'],
  ['tailwindcss', 'Tailwind CSS'],
  ['prisma', 'Prisma'],
  ['@prisma/client', 'Prisma'],
  ['lucide-react', 'Lucide Icons'],
  ['zustand', 'Zustand'],
  ['shadcn-ui', 'shadcn/ui'],
  ['openai', 'OpenAI'],
  ['express', 'Express'],
]);

const README_TECH_KEYWORDS = [
  { pattern: /next\.js/i, label: 'Next.js' },
  { pattern: /prisma/i, label: 'Prisma' },
  { pattern: /tailwind/i, label: 'Tailwind CSS' },
  { pattern: /supabase/i, label: 'Supabase' },
  { pattern: /clerk/i, label: 'Clerk' },
  { pattern: /openai/i, label: 'OpenAI' },
  { pattern: /vercel/i, label: 'Vercel' },
];

const HEADERS = {
  'Accept': 'application/vnd.github+json',
  'User-Agent': 'trevor-website-portfolio-sync',
  'X-GitHub-Api-Version': '2022-11-28',
};

if (process.env.GITHUB_TOKEN || process.env.GH_TOKEN) {
  HEADERS['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN}`;
}

const IMAGE_PATTERN = /screenshot|preview|hero|cover|demo|ui|app|landing/i;
const COLOR_PATTERN = /#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
const MAX_COLOR_DEPTH = 4;

function titleCase(value) {
  return value
    .replace(/[-_/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function normalizeTitle(slug, fallback) {
  if (TITLE_OVERRIDES[slug]) return TITLE_OVERRIDES[slug];
  const base = titleCase(fallback ?? slug);
  return base
    .replace(/\bAi\b/g, 'AI')
    .replace(/\bLms\b/g, 'LMS')
    .replace(/\bApi\b/g, 'API');
}

async function fetchJson(url, extraHeaders = {}) {
  const res = await fetch(url, { headers: { ...HEADERS, ...extraHeaders } });
  if (!res.ok) {
    throw new Error(`Request failed for ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function cloneRepo(owner, repo) {
  const targetDir = path.join(cacheRoot, `${owner}-${repo}`);
  await fs.rm(targetDir, { recursive: true, force: true });
  await ensureDir(cacheRoot);
  await exec(`git clone --depth 1 https://github.com/${owner}/${repo}.git ${targetDir}`);
  return targetDir;
}

async function walkFiles(dir, { extensions = [], depth = 0, maxDepth = Infinity, matcher = null } = {}, results = []) {
  if (depth > maxDepth) return results;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === '.git') {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkFiles(fullPath, { extensions, depth: depth + 1, maxDepth, matcher }, results);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.length && !extensions.includes(ext)) continue;
      if (matcher && !matcher(entry.name, fullPath)) continue;
      results.push(fullPath);
    }
  }
  return results;
}

async function findScreenshot(clonePath) {
  const candidates = await walkFiles(clonePath, {
    extensions: ['.png', '.jpg', '.jpeg', '.webp'],
    maxDepth: 5,
    matcher: (name) => IMAGE_PATTERN.test(name),
  });
  candidates.sort((a, b) => a.length - b.length);
  return candidates[0] ?? null;
}

async function extractColors(clonePath) {
  const files = await walkFiles(clonePath, {
    extensions: ['.css', '.scss', '.sass', '.less', '.ts', '.tsx', '.js', '.jsx'],
    maxDepth: MAX_COLOR_DEPTH,
  });
  const colors = new Set();
  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf8');
      const matches = content.match(COLOR_PATTERN);
      if (matches) {
        matches.forEach((match) => {
          if (colors.size < 6) {
            colors.add(match);
          }
        });
      }
      if (colors.size >= 2) break;
    } catch (err) {
      // ignore
    }
  }
  if (!colors.size) {
    return ['#0f172a', '#38bdf8'];
  }
  if (colors.size === 1) {
    return [Array.from(colors)[0], '#475569'];
  }
  return Array.from(colors).slice(0, 2);
}

function createPlaceholderSvg(title, colors) {
  const [start, end] = colors;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${start}" />
      <stop offset="100%" stop-color="${end}" />
    </linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#grad)" rx="32" />
  <text x="50%" y="50%" font-family="'Inter', 'Segoe UI', sans-serif" font-size="72" fill="#ffffff" opacity="0.9" text-anchor="middle" dominant-baseline="middle">
    ${title}
  </text>
</svg>`;
}

async function savePlaceholder(title, colors, slug) {
  await ensureDir(publicDir);
  const svg = createPlaceholderSvg(title, colors);
  const filePath = path.join(publicDir, `${slug}.svg`);
  await fs.writeFile(filePath, svg, 'utf8');
  return `/portfolio/${slug}.svg`;
}

async function copyScreenshot(screenshotPath, slug) {
  await ensureDir(publicDir);
  const ext = path.extname(screenshotPath).toLowerCase();
  const destPath = path.join(publicDir, `${slug}${ext}`);
  await fs.copyFile(screenshotPath, destPath);
  return `/portfolio/${slug}${ext}`;
}

async function readReadme(clonePath) {
  const candidates = ['README.md', 'readme.md', 'Readme.md'];
  for (const candidate of candidates) {
    const fullPath = path.join(clonePath, candidate);
    try {
      const content = await fs.readFile(fullPath, 'utf8');
      return content;
    } catch (err) {
      // ignore
    }
  }
  return null;
}

async function extractPackageTech(clonePath) {
  try {
    const pkgPath = path.join(clonePath, 'package.json');
    const content = await fs.readFile(pkgPath, 'utf8');
    const pkg = JSON.parse(content);
    const deps = Object.keys({ ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) });
    return deps
      .filter((name) => !name.startsWith('@types/'))
      .map((name) => PACKAGE_LABELS.get(name) ?? name)
      .slice(0, 6);
  } catch {
    return [];
  }
}

function stripMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_#>~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractSummary(markdown) {
  if (!markdown) return null;
  const paragraphs = markdown
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  for (const paragraph of paragraphs) {
    if (paragraph.startsWith('#')) continue;
    if (paragraph.startsWith('![')) continue;
    if (paragraph.startsWith('<')) continue;
    const cleaned = stripMarkdown(paragraph);
    if (cleaned.length < 20) continue;
    return cleaned;
  }
  return null;
}

function inferTechFromReadme(markdown) {
  if (!markdown) return [];
  const matches = [];
  for (const { pattern, label } of README_TECH_KEYWORDS) {
    if (pattern.test(markdown)) {
      matches.push(label);
    }
  }
  return matches;
}

async function buildProject({ owner, repo, category }) {
  console.log(`\n📦 Processing ${owner}/${repo}`);
  const repoData = await fetchJson(`https://api.github.com/repos/${owner}/${repo}`);
  const topicsData = await fetchJson(`https://api.github.com/repos/${owner}/${repo}/topics`);
  const languagesData = await fetchJson(`https://api.github.com/repos/${owner}/${repo}/languages`);
  const clonePath = await cloneRepo(owner, repo);
  const screenshotPath = await findScreenshot(clonePath);
  let imagePath;
  if (screenshotPath) {
    imagePath = await copyScreenshot(screenshotPath, repo);
    console.log(`   📸 Found screenshot: ${path.relative(projectRoot, screenshotPath)}`);
  } else {
    const colors = await extractColors(clonePath);
    imagePath = await savePlaceholder(titleCase(repo), colors, repo);
    console.log('   🎨 Created placeholder screenshot');
  }
  const readme = await readReadme(clonePath);
  const summary = extractSummary(readme) ?? stripMarkdown(repoData.description) ?? 'Project description pending.';
  const packageTech = await extractPackageTech(clonePath);
  const readmeTech = inferTechFromReadme(readme);
  const techPieces = [
    ...Object.keys(languagesData),
    ...packageTech,
    ...readmeTech,
  ];
  if (techPieces.length < 3 && topicsData.names?.length) {
    techPieces.push(...topicsData.names);
  }
  const techStack = [...new Set(techPieces)].slice(0, 6);

  const project = {
    slug: repo,
    title: normalizeTitle(repo, repoData.name ?? repo),
    description: summary,
    category: category ?? topicsData.names?.[0] ?? 'Project',
    githubUrl: repoData.html_url,
    demoUrl: repoData.homepage && repoData.homepage.trim() ? repoData.homepage.trim() : null,
    techStack: [...new Set(techStack)].slice(0, 6),
    featured: repoData.stargazers_count > 0,
    image: imagePath,
    lastUpdated: repoData.pushed_at,
  };

  return project;
}

async function main() {
  await ensureDir(cacheRoot);
  await ensureDir(publicDir);
  await ensureDir(dataDir);

  const projects = [];
  for (const repoConfig of REPOS) {
    try {
      const project = await buildProject(repoConfig);
      projects.push(project);
    } catch (error) {
      console.error(`❌ Failed to process ${repoConfig.repo}:`, error.message);
    }
  }

  await fs.writeFile(dataPath, JSON.stringify(projects, null, 2));
  console.log(`\n💾 Updated ${path.relative(projectRoot, dataPath)} with ${projects.length} projects`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
