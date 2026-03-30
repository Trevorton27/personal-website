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

/**
 * Converts plain text content to HTML paragraphs.
 * If content already contains HTML block elements, returns it as-is.
 */
export function contentToHtml(content: string): string {
  // If content already has HTML block elements, return as-is
  if (/<(p|div|h[1-6]|ul|ol|blockquote|pre|table|section|article)\b/i.test(content)) {
    return content;
  }

  // Split on double newlines (paragraph breaks) and wrap each in <p> tags
  return content
    .split(/\n{2,}/)
    .map((para) => para.trim())
    .filter((para) => para.length > 0)
    .map((para) => `<p>${para.replace(/\n/g, '<br />')}</p>`)
    .join('\n');
}
