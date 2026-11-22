import { adminConfigured, createSupabaseClient, ownerId } from './supabase';
import type { AstroGlobal } from 'astro';

export async function getAdminClient(astro: AstroGlobal) {
  astro.response.headers.set('Cache-Control', 'private, no-store');
  if (!adminConfigured) return null;
  const supabase = createSupabaseClient(astro.cookies, astro.request.headers);
  if (!supabase) return null;
  const token = await supabase.auth.getUser();
  return !token.error && token.data.user?.id === ownerId ? supabase : null;
}
