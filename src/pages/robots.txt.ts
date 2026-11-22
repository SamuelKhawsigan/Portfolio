import type { APIRoute } from 'astro';
export const prerender = false;
export const GET: APIRoute = ({ request }) => {
 const origin = new URL(import.meta.env.PUBLIC_SITE_URL || request.url);
 return new Response(`User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${new URL('/sitemap.xml', origin)}\n`, {headers:{'Content-Type':'text/plain; charset=utf-8'}});
};
