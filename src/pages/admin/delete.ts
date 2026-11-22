import type { APIRoute, AstroGlobal } from 'astro';
import { getAdminClient } from '../../lib/auth';

export const prerender = false;

const targetFor = {
  post: { table: 'posts', path: '/admin/posts/' },
  project: { table: 'projects', path: '/admin/projects/' },
  gallery: { table: 'gallery_items', path: '/admin/gallery/' },
  achievement: { table: 'achievement_items', path: '/admin/achievements/' },
  home_slide: { table: 'home_portrait_slides', path: '/admin/home-slides/' },
} as const;

type ContentKind = keyof typeof targetFor;
const imagePattern = /!\[[^\]]*\]\(([^\s)]+)/g;

export const POST: APIRoute = async (context) => {
  const supabase = await getAdminClient(context as unknown as AstroGlobal);
  if (!supabase) return context.redirect('/admin/login/', 303);
  const origin = context.request.headers.get('origin');
  if (origin && origin !== context.url.origin) return new Response('Forbidden', { status: 403 });

  const form = await context.request.formData();
  const kind = String(form.get('kind') ?? '') as ContentKind;
  const id = String(form.get('id') ?? '');
  if (!(kind in targetFor) || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(id)) {
    return context.redirect('/admin/?error=delete', 303);
  }

  const target = targetFor[kind];
  const { data: item, error: readError } = await supabase.from(target.table).select('*').eq('id', id).maybeSingle();
  if (readError || !item) return context.redirect(`${target.path}?error=delete`, 303);

  const { error: deleteError } = await supabase.from(target.table).delete().eq('id', id);
  if (deleteError) return context.redirect(`${target.path}?error=delete`, 303);

  const publicBase = supabase.storage.from('portfolio-gallery').getPublicUrl('').data.publicUrl;
  const toStoragePath = (value: string | null | undefined) => value?.startsWith(publicBase)
    ? decodeURIComponent(value.slice(publicBase.length).split('?')[0]) : null;
  const candidates = kind === 'post'
    ? [...String(item.content_md ?? '').matchAll(imagePattern)].map(match => match[1])
    : [item.image_path ?? item.cover_image];
  const paths = candidates.map(toStoragePath).filter((path): path is string => !!path);
  if (paths.length) await supabase.storage.from('portfolio-gallery').remove(paths);

  return context.redirect(`${target.path}?deleted=1`, 303);
};
