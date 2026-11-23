import { adminConfigured, createSupabaseClient, ownerId } from './supabase';
import type { AstroGlobal } from 'astro';

// This is deliberately a session cookie. A valid Supabase token on its own is
// not enough to reopen the CMS after a browser restart; the owner must sign in
// again for a new editing session.
export const adminAccessCookie = 'portfolio_admin_access';

export async function getAdminClient(astro: AstroGlobal) {
  astro.response.headers.set('Cache-Control', 'private, no-store');
  if (!adminConfigured) return null;
  if (astro.cookies.get(adminAccessCookie)?.value !== '1') return null;
  const supabase = createSupabaseClient(astro.cookies, astro.request.headers);
  if (!supabase) return null;
  const token = await supabase.auth.getUser();
  return !token.error && token.data.user?.id === ownerId ? supabase : null;
}
