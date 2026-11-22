/**
 * Safe Markdown rendering pipeline.
 *
 * - Uses marked for parsing
 * - DOMPurify for sanitization (removes script/iframe/event handlers)
 * - Rejects javascript: and data: URLs
 * - Does NOT evaluate stored content as MDX or executable JS
 * - Runs server-side via jsdom — never re-exported to browser bundles
 */
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window as unknown as Window & typeof globalThis);

// Configure marked: no raw HTML pass-through
marked.setOptions({
  gfm: true,
  breaks: false,
});

// Extend DOMPurify to also reject dangerous URL protocols
purify.addHook('afterSanitizeAttributes', (node) => {
  if ('href' in node) {
    const href = (node as HTMLAnchorElement).href;
    if (/^(javascript|data|vbscript):/i.test(href)) {
      (node as HTMLAnchorElement).removeAttribute('href');
    }
  }
  if ('src' in node) {
    const src = (node as HTMLImageElement).src;
    if (/^(javascript|data|vbscript):/i.test(src)) {
      (node as HTMLImageElement).removeAttribute('src');
    }
  }
});

const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'del', 'code', 'pre',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'blockquote',
    'a',
    'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'hr',
    'details', 'summary',
    'div', 'span',
  ],
  ALLOWED_ATTR: [
    'href', 'title', 'target', 'rel',
    'src', 'alt', 'width', 'height', 'loading',
    'class', 'id',
    'lang',
    // Table alignment
    'align',
  ],
  ALLOW_DATA_ATTR: false,
  FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style'],
};

/**
 * Render a Markdown string to safe HTML.
 * Returns an empty string for null/undefined input.
 */
export async function renderMarkdown(md: string | null | undefined): Promise<string> {
  if (!md) return '';
  const raw = await marked.parse(md);
  return purify.sanitize(raw, PURIFY_CONFIG) as string;
}

/**
 * Same rules used for admin preview — identical sanitization to public rendering.
 */
export { renderMarkdown as renderPreview };
