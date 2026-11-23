import type { GalleryPhoto } from './site-content';
import { createPublicBlogClient } from './supabase';

export const eventCoverKey = (slug: string) => `gallery_event_cover:${slug}`;

export function groupEventPhotos(photos: GalleryPhoto[], covers: Record<string, string> = {}) {
  const groups = new Map<string, GalleryPhoto[]>();
  for (const photo of photos) {
    const slug = photo.event_slug || photo.slug;
    const group = groups.get(slug) ?? [];
    group.push(photo);
    groups.set(slug, group);
  }
  return [...groups].map(([slug, images]) => {
    const cover = images.find(photo => photo.id === covers[eventCoverKey(slug)]) ?? images[0];
    return { ...cover, event_slug: slug, photos: images,
      linkedin_url: cover.linkedin_url || images.find(photo => photo.linkedin_url)?.linkedin_url };
  });
}

export async function getEventCovers(): Promise<Record<string, string>> {
  const client = createPublicBlogClient();
  if (!client) return {};
  const { data } = await client.from('site_settings').select('key,value').like('key', 'gallery_event_cover:%');
  return Object.fromEntries((data ?? []).map(item => [item.key, item.value]));
}
