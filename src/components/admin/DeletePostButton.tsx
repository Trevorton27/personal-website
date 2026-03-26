'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DeletePostButton({ postId, postTitle }: { postId: string; postTitle: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || 'Failed to delete post');
        setDeleting(false);
        setConfirming(false);
        return;
      }
      router.refresh();
    } catch {
      alert('Failed to delete post');
      setDeleting(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-2 py-1 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? 'Deleting...' : 'Confirm'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={deleting}
          className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-storm-700 rounded hover:bg-gray-300 dark:hover:bg-storm-600"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2 rounded text-gray-600 dark:text-gray-400 hover:text-gray-400 dark:hover:text-gray-300"
      title={`Delete "${postTitle}"`}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
