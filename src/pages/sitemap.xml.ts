import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getPublicProjects } from '../lib/site-content';
import { createPublicBlogClient } from '../lib/supabase';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const [projectFiles, writeups, managed] = await Promise.all([
    getCollection('projects'), getCollection('writeups'), getPublicProjects(),
  ]);
  const client = createPublicBlogClient();
  const blog = client ? await client.from('posts').select('slug').eq('status', 'published') : null;
  const paths = new Set([
    '/', '/projects/', '/write-ups/', '/profile/', '/events/', '/gallery/', '/blog/', '/uses/', '/contact/',
    ...projectFiles.filter(entry => !entry.data.placeholder).map(entry => `/projects/${entry.id}/`),
    ...writeups.filter(entry => !entry.data.placeholder).map(entry => `/write-ups/${entry.id}/`),
    ...managed.map(project => `/projects/${encodeURIComponent(project.slug)}/`),
    ...(blog?.data ?? []).map(post => `/blog/${encodeURIComponent(post.slug)}/`),
  ]);
  const origin = new URL(import.meta.env.PUBLIC_SITE_URL || request.url);
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const urls = [...paths].map(path => `<url><loc>${escape(new URL(path, origin).href)}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
