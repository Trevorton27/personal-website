import { promises as fs } from 'fs';
import path from 'path';

export type PortfolioProject = {
  slug: string;
  title: string;
  description: string;
  category: string;
  githubUrl: string;
  demoUrl: string | null;
  techStack: string[];
  featured: boolean;
  image: string;
  lastUpdated: string;
};

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const dataPath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');
  const file = await fs.readFile(dataPath, 'utf8');
  const projects = JSON.parse(file) as PortfolioProject[];
  return projects.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
}
