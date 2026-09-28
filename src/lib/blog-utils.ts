export function formatPostDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatPostDateShort(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export function getReadingTime(content: string): number {
  const text = stripHtml(content);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

import { marked } from 'marked';

/**
 * Converts content to HTML.
 * If content already contains HTML block elements, returns it as-is.
 * If content contains markdown syntax, parses it with marked.
 * Otherwise, wraps plain text in paragraph tags.
 */
export function contentToHtml(content: string): string {
  // If content already has HTML block elements, return as-is
  if (/<(p|div|h[1-6]|ul|ol|blockquote|pre|table|section|article)\b/i.test(content)) {
    return content;
  }

  // Check for common markdown syntax
  if (/^#{1,6}\s|^\*\s|^-\s|^\d+\.\s|\*\*|__|\[.*\]\(.*\)|^>/m.test(content)) {
    return marked.parse(content, { async: false }) as string;
  }

  // Plain text: split on double newlines and wrap in <p> tags
  return content
    .split(/\n{2,}/)
    .map((para) => para.trim())
    .filter((para) => para.length > 0)
    .map((para) => `<p>${para.replace(/\n/g, '<br />')}</p>`)
    .join('\n');
}
