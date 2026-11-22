import type { APIRoute } from 'astro';
import { createPublicBlogClient } from '../lib/supabase';

export const prerender = false;

const escapeXml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
})[character]!);

export const GET: APIRoute = async ({ request }) => {
  const client = createPublicBlogClient();
  const result = client && await client.from('posts')
    .select('slug,title,excerpt,published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false });

  if (result?.error) return new Response('Feed temporarily unavailable.', { status: 503 });

  const siteUrl = new URL(import.meta.env.PUBLIC_SITE_URL || request.url);
  const blogUrl = new URL('/blog/', siteUrl).href;
  const items = (result?.data ?? []).map((post) => {
    const postUrl = new URL(`/blog/${encodeURIComponent(post.slug)}/`, siteUrl).href;
    const date = post.published_at ? new Date(post.published_at) : null;
    return `<item><title>${escapeXml(post.title)}</title><link>${escapeXml(postUrl)}</link><guid isPermaLink="true">${escapeXml(postUrl)}</guid>${post.excerpt ? `<description>${escapeXml(post.excerpt)}</description>` : ''}${date && !Number.isNaN(date.valueOf()) ? `<pubDate>${date.toUTCString()}</pubDate>` : ''}</item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Samuel Khawsigan’s blog</title><link>${escapeXml(blogUrl)}</link><description>Cybersecurity notes and write-ups from Samuel Khawsigan.</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
