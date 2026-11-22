import type { SupabaseClient } from '@supabase/supabase-js';
import sharp from 'sharp';

export async function uploadPortfolioImage(client: SupabaseClient, file: File, folder: 'gallery' | 'blog' = 'gallery'): Promise<{ error: string; path: string; width?: number; height?: number }> {
  if (file.size === 0 || file.size > 8 * 1024 * 1024) {
    return { error: 'The image must be smaller than 8 MB.', path: '' };
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  const jpeg = bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const png = bytes.length >= 8 && bytes.slice(0, 8).every((byte, i) => byte === [137,80,78,71,13,10,26,10][i]);
  const webp = bytes.length >= 12 && new TextDecoder().decode(bytes.slice(0, 4)) === 'RIFF'
    && new TextDecoder().decode(bytes.slice(8, 12)) === 'WEBP';
  if (!jpeg && !png && !webp) return { error: 'Choose a JPEG, PNG or WebP image.', path: '' };
  try {
    const clean = await sharp(bytes, { limitInputPixels: 40_000_000 })
      .rotate().resize({ width: 3000, height: 3000, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 88 }).toBuffer({ resolveWithObject: true });
    if (clean.data.length > 8 * 1024 * 1024) return { error: 'The processed image is too large.', path: '' };
    const path = `${folder}/${crypto.randomUUID()}.webp`;
    const upload = await client.storage.from('portfolio-gallery').upload(path, clean.data, {
      contentType: 'image/webp', upsert: false,
    });
    return upload.error ? { error: 'Couldn’t upload the image. Check the storage bucket and permissions.', path: '' }
      : { error: '', path, width: clean.info.width, height: clean.info.height };
  } catch {
    return { error: 'Couldn’t read that image. Try another JPEG, PNG or WebP.', path: '' };
  }
}
