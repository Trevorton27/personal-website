import { promises as fs } from 'fs';
import path from 'path';

export type PortfolioScreenshot = { src: string; alt: string; caption?: string };
export type PortfolioFeature = { title: string; description: string; screenshot?: string };
export type PortfolioDetails = {
  extendedDescription: string;
  problemStatement?: string;
  impactTags?: string[];
  features: PortfolioFeature[];
  screenshots: PortfolioScreenshot[];
};

export type PortfolioProject = {
  slug: string;
  title: string;
  description: string;
  highlights?: string[];
  category: string;
  githubUrl: string;
  demoUrl: string | null;
  techStack: string[];
  featured: boolean;
  image: string;
  lastUpdated: string;
  details?: PortfolioDetails;
};

async function loadProjects(): Promise<PortfolioProject[]> {
  const dataPath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');
  const file = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(file) as PortfolioProject[];
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  return loadProjects();
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | undefined> {
  const projects = await loadProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getAllPortfolioSlugs(): Promise<string[]> {
  const projects = await loadProjects();
  return projects.map((p) => p.slug);
}
