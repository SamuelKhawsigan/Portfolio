import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import type { AstroCookies } from 'astro';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const key = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
export const ownerId = import.meta.env.OWNER_USER_ID;
export const adminConfigured = Boolean(url && key && ownerId);

export function createSupabaseClient(cookies: AstroCookies, headers: Headers) {
  if (!url || !key) return null;
  return createServerClient(url, key, {
    cookies: {
      getAll: () => parseCookieHeader(headers.get('cookie') ?? '')
        .map(({ name, value }) => ({ name, value: value ?? '' })),
      setAll: (updates) => {
        for (const { name, value, options } of updates) {
          cookies.set(name, value, {
            ...options,
            httpOnly: true,
            secure: import.meta.env.PROD,
            sameSite: 'lax',
            path: '/',
          });
        }
      },
    },
  });
}

export function createPublicBlogClient() {
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
