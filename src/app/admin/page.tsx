import prisma from '@/lib/prisma';
import { FileText, Briefcase, Users, Eye } from 'lucide-react';

export default async function AdminDashboard() {
  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalPortfolio,
    totalUsers,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: 'PUBLISHED' } }),
    prisma.blogPost.count({ where: { status: 'DRAFT' } }),
    prisma.portfolioItem.count(),
    prisma.user.count(),
  ]);

  const recentPosts = await prisma.blogPost.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });

  const stats = [
    { label: 'Total Posts', value: totalPosts, icon: FileText, color: 'text-blue-600' },
    { label: 'Published', value: publishedPosts, icon: Eye, color: 'text-green-600' },
    { label: 'Drafts', value: draftPosts, icon: FileText, color: 'text-yellow-600' },
    { label: 'Portfolio Items', value: totalPortfolio, icon: Briefcase, color: 'text-purple-600' },
    { label: 'Users', value: totalUsers, icon: Users, color: 'text-indigo-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your site.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-storm-700 last:border-0"
            >
              <div>
                <h3 className="font-medium">{post.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  By {post.author.name} • {post.status}
                </p>
              </div>
              <span className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${post.status === 'PUBLISHED'
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                  : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                }
              `}>
                {post.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
