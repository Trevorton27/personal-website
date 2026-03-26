import Link from 'next/link';
import prisma from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { Plus, Edit, Eye } from 'lucide-react';
import { DeletePostButton } from '@/components/admin/DeletePostButton';

const STATUSES = [
  { value: '', label: 'All' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'SCHEDULED', label: 'Scheduled' },
] as const;

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const statusFilter = params.status || '';

  const where = statusFilter
    ? { status: statusFilter as 'PUBLISHED' | 'DRAFT' | 'SCHEDULED' }
    : {};

  const [posts, counts] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { author: true, tags: true },
    }),
    prisma.blogPost.groupBy({
      by: ['status'],
      _count: true,
    }),
  ]);

  const totalCount = counts.reduce((sum, c) => sum + c._count, 0);
  const countMap: Record<string, number> = { '': totalCount };
  for (const c of counts) {
    countMap[c.status] = c._count;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your blog content
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="btn btn-primary inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200 dark:border-storm-700">
        {STATUSES.map((s) => {
          const isActive = statusFilter === s.value;
          const count = countMap[s.value] || 0;
          return (
            <Link
              key={s.value}
              href={s.value ? `/admin/posts?status=${s.value}` : '/admin/posts'}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                isActive
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {s.label}
              <span
                className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'bg-gray-100 dark:bg-storm-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-storm-800 border-b border-gray-200 dark:border-storm-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-storm-700">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No {statusFilter ? statusFilter.toLowerCase() : ''} posts found.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-storm-800/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-gray-500">/{post.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === 'PUBLISHED'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                            : post.status === 'DRAFT'
                            ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                            : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {post.author.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(post.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag.id}
                            className="text-xs px-2 py-1 bg-gray-100 dark:bg-storm-700 rounded"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 rounded text-gray-600 dark:text-gray-400 hover:text-gray-400 dark:hover:text-gray-300"
                          title="View post"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="p-2 rounded text-gray-600 dark:text-gray-400 hover:text-gray-400 dark:hover:text-gray-300"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeletePostButton postId={post.id} postTitle={post.title} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
