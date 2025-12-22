'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';

export default function NewPortfolioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: '',
    techStack: [''],
    images: [''],
    featured: false,
    order: 0,
    links: {
      github: '',
      demo: '',
      website: '',
    },
  });

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

  const addTechStack = () => {
    setFormData(prev => ({
      ...prev,
      techStack: [...prev.techStack, ''],
    }));
  };

  const removeTechStack = (index: number) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index),
    }));
  };

  const updateTechStack = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.map((tech, i) => i === index ? value : tech),
    }));
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Filter out empty tech stack items
      const cleanedTechStack = formData.techStack.filter(tech => tech.trim() !== '');

      // Filter out empty image URLs
      const cleanedImages = formData.images.filter(img => img.trim() !== '');

      // Clean links object
      const cleanedLinks: Record<string, string> = {};
      if (formData.links.github) cleanedLinks.github = formData.links.github;
      if (formData.links.demo) cleanedLinks.demo = formData.links.demo;
      if (formData.links.website) cleanedLinks.website = formData.links.website;

      const response = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          techStack: cleanedTechStack,
          images: cleanedImages,
          links: Object.keys(cleanedLinks).length > 0 ? cleanedLinks : null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create portfolio item');
      }

      router.push('/admin/portfolio');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create portfolio item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/portfolio"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
        <h1 className="text-3xl font-bold">Create New Portfolio Item</h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Project Details</h2>

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
              <label className="label">Category *</label>
              <input
                type="text"
                className="input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                placeholder="e.g. Web Development, Art, Design"
              />
            </div>

            <div>
              <label className="label">Description * (Markdown supported)</label>
              <textarea
                className="input font-mono text-sm"
                rows={10}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                placeholder="Describe your project using Markdown..."
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Tech Stack</h2>

          <div className="space-y-2">
            {formData.techStack.map((tech, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  className="input flex-1"
                  value={tech}
                  onChange={(e) => updateTechStack(index, e.target.value)}
                  placeholder="Technology name"
                />
                {formData.techStack.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTechStack(index)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addTechStack}
            className="mt-3 inline-flex items-center gap-2 text-sm text-lightning-glow hover:underline"
          >
            <Plus className="w-4 h-4" />
            Add Technology
          </button>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Project Images</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Add image URLs for your project gallery. First image will be used as the thumbnail.
          </p>

          <div className="space-y-2">
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  className="input flex-1"
                  value={image}
                  onChange={(e) => updateImage(index, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addImage}
            className="mt-3 inline-flex items-center gap-2 text-sm text-lightning-glow hover:underline"
          >
            <Plus className="w-4 h-4" />
            Add Image
          </button>

          {formData.images.some(img => img.trim()) && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                💡 Tip: You can upload images to services like{' '}
                <a href="https://imgur.com" target="_blank" rel="noopener noreferrer" className="underline">
                  Imgur
                </a>
                ,{' '}
                <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="underline">
                  Cloudinary
                </a>
                , or{' '}
                <a href="https://imagekit.io" target="_blank" rel="noopener noreferrer" className="underline">
                  ImageKit
                </a>
                {' '}and paste the URLs here.
              </p>
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Links</h2>

          <div className="space-y-4">
            <div>
              <label className="label">GitHub URL</label>
              <input
                type="url"
                className="input"
                value={formData.links.github}
                onChange={(e) => setFormData({
                  ...formData,
                  links: { ...formData.links, github: e.target.value }
                })}
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div>
              <label className="label">Live Demo URL</label>
              <input
                type="url"
                className="input"
                value={formData.links.demo}
                onChange={(e) => setFormData({
                  ...formData,
                  links: { ...formData.links, demo: e.target.value }
                })}
                placeholder="https://demo.example.com"
              />
            </div>

            <div>
              <label className="label">Website URL</label>
              <input
                type="url"
                className="input"
                value={formData.links.website}
                onChange={(e) => setFormData({
                  ...formData,
                  links: { ...formData.links, website: e.target.value }
                })}
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Display Options</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-lightning-glow focus:ring-lightning-glow"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Featured (show on homepage)
              </label>
            </div>

            <div>
              <label className="label">Display Order</label>
              <input
                type="number"
                className="input"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                min="0"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Lower numbers appear first
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Creating...' : 'Create Portfolio Item'}
          </button>
          <Link href="/admin/portfolio" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
