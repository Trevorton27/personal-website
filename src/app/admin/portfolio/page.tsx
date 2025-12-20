import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Plus, Edit, Trash2, Eye, Star } from 'lucide-react';

export default async function AdminPortfolioPage() {
  const items = await prisma.portfolioItem.findMany({
    orderBy: [{ featured: 'desc' }, { order: 'asc' }],
    include: { author: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Portfolio</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="btn btn-primary inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="card">
            <div className="aspect-video bg-gradient-to-br from-lightning-glow to-storm-600 rounded-lg mb-4 flex items-center justify-center relative">
              <span className="text-white text-4xl font-bold opacity-50">
                {item.title[0]}
              </span>
              {item.featured && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 p-2 rounded-full">
                  <Star className="w-4 h-4" />
                </div>
              )}
            </div>

            <h3 className="font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {item.category}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {item.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-storm-700 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-200 dark:border-storm-700">
              <Link
                href={`/portfolio/${item.slug}`}
                target="_blank"
                className="p-2 hover:bg-gray-100 dark:hover:bg-storm-700 rounded"
                title="View"
              >
                <Eye className="w-4 h-4" />
              </Link>
              <Link
                href={`/admin/portfolio/${item.id}`}
                className="p-2 hover:bg-gray-100 dark:hover:bg-storm-700 rounded"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </Link>
              <button
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
