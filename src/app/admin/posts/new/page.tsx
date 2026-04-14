'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, FileText, Trash2 } from 'lucide-react';

const DRAFT_STORAGE_KEY = 'blog-draft-new-post';
const AUTOSAVE_DELAY_MS = 1000;

interface Tag {
  id: string;
  name: string;
  slug: string;
}

type FormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';
  publishedAt: string;
  tagIds: string[];
};

const emptyFormData: FormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  status: 'DRAFT',
  publishedAt: '',
  tagIds: [],
};

function loadDraft(): FormData | null {
  try {
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    // Ensure it has at least a title or content to be worth restoring
    if (parsed.title || parsed.content) return parsed;
    return null;
  } catch {
    return null;
  }
}

export default function NewPostPage() {
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [error, setError] = useState('');
  const [draftRestored, setDraftRestored] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [formData, setFormData] = useState<FormData>(emptyFormData);

  // Restore draft from localStorage on mount
  useEffect(() => {
    const saved = loadDraft();
    if (saved) {
      setFormData(saved);
      setDraftRestored(true);
    }
  }, []);

  // Auto-save draft to localStorage (debounced)
  const saveDraft = useCallback((data: FormData) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      if (data.title || data.content) {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
        setLastSaved(new Date());
      }
    }, AUTOSAVE_DELAY_MS);
  }, []);

  useEffect(() => {
    saveDraft(formData);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [formData, saveDraft]);

  const discardDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setFormData(emptyFormData);
    setDraftRestored(false);
    setLastSaved(null);
  };

  useEffect(() => {
    fetchTags();
  }, []);

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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert local datetime to ISO string so the server stores the correct UTC time
      const payload = {
        ...formData,
        publishedAt: formData.publishedAt
          ? new Date(formData.publishedAt).toISOString()
          : '',
      };

      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create post');
      }

      const post = await response.json();
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      router.push('/admin/posts');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const saveDraftToDb = async () => {
    if (!formData.title) {
      setError('A title is required to save a draft');
      return;
    }

    setSavingDraft(true);
    setError('');

    try {
      const payload = {
        ...formData,
        status: 'DRAFT',
        publishedAt: '',
        content: formData.content || '',
      };

      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save draft');
      }

      const post = await response.json();
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      router.push(`/admin/posts/${post.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save draft');
    } finally {
      setSavingDraft(false);
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
        <h1 className="text-3xl font-bold">Create New Post</h1>
      </div>

      {draftRestored && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center justify-between">
          <span className="text-blue-700 dark:text-blue-400 text-sm">
            Draft restored from a previous session.
          </span>
          <button
            type="button"
            onClick={discardDraft}
            className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Discard
          </button>
        </div>
      )}

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
                onChange={(e) => handleTitleChange(e.target.value)}
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

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading || savingDraft}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Creating...' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={saveDraftToDb}
            disabled={loading || savingDraft}
            className="btn btn-secondary inline-flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            {savingDraft ? 'Saving...' : 'Save Draft'}
          </button>
          <Link href="/admin/posts" className="btn btn-secondary">
            Cancel
          </Link>
          {lastSaved && (
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
              Draft auto-saved at {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
