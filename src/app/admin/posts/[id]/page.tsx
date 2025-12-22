'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';
  publishedAt: string | null;
  tags: Tag[];
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [postId, setPostId] = useState<string>('');
  const [post, setPost] = useState<Post | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'SCHEDULED',
    publishedAt: '',
    tagIds: [] as string[],
  });

  useEffect(() => {
    const initPage = async () => {
      const resolvedParams = await params;
      setPostId(resolvedParams.id);
    };
    initPage();
  }, [params]);

  useEffect(() => {
    if (postId) {
      fetchPost();
      fetchTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/posts/${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      const data = await response.json();
      setPost(data);

      // Populate form
      setFormData({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        content: data.content,
        coverImage: data.coverImage || '',
        status: data.status,
        publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString().slice(0, 16) : '',
        tagIds: data.tags.map((t: Tag) => t.id),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/admin/tags');
      if (response.ok) {
        const data = await response.json();
        setTags(data);
      }
    } catch (err) {
      console.error('Failed to fetch tags:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update post');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
    }
  };

  const toggleTag = (tagId: string) => {
    setFormData(prev => ({
      ...prev,
      tagIds: prev.tagIds.includes(tagId)
        ? prev.tagIds.filter(id => id !== tagId)
        : [...prev.tagIds, tagId],
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href="/admin/posts" className="btn btn-primary">
          Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </Link>
        <h1 className="text-3xl font-bold">Edit Post</h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Post Details</h2>

          <div className="space-y-4">
            <div>
              <label className="label">Title *</label>
              <input
                type="text"
                className="input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label">Slug *</label>
              <input
                type="text"
                className="input"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                URL-friendly version of the title
              </p>
            </div>

            <div>
              <label className="label">Excerpt</label>
              <textarea
                className="input"
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary of the post"
              />
            </div>

            <div>
              <label className="label">Content * (Markdown supported)</label>
              <textarea
                className="input font-mono text-sm"
                rows={15}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                placeholder="Write your post content here using Markdown..."
              />
            </div>

            <div>
              <label className="label">Cover Image URL</label>
              <input
                type="url"
                className="input"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Publishing</h2>

          <div className="space-y-4">
            <div>
              <label className="label">Status *</label>
              <select
                className="input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="SCHEDULED">Scheduled</option>
              </select>
            </div>

            {(formData.status === 'PUBLISHED' || formData.status === 'SCHEDULED') && (
              <div>
                <label className="label">
                  {formData.status === 'PUBLISHED' ? 'Published At' : 'Schedule For'}
                </label>
                <input
                  type="datetime-local"
                  className="input"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                />
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Tags</h2>

          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-1 rounded-lg border transition-colors ${
                    formData.tagIds.includes(tag.id)
                      ? 'bg-lightning-glow text-white border-lightning-glow'
                      : 'bg-gray-100 dark:bg-storm-700 border-gray-300 dark:border-storm-600'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No tags available</p>
          )}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link href="/admin/posts" className="btn btn-secondary">
              Cancel
            </Link>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            className="btn bg-red-600 hover:bg-red-700 text-white inline-flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Post
          </button>
        </div>
      </form>
    </div>
  );
}
