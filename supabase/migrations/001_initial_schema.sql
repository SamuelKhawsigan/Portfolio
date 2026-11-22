-- Migration: 001_initial_schema
-- Run this in the Supabase SQL editor or via supabase db push
-- Creates all tables, RLS policies, and storage configuration

-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "pgcrypto";

-- ============================================================
-- POSTS
-- ============================================================
create table if not exists posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  excerpt      text,
  content_md   text not null default '',
  category     text not null default 'note',
  tags         text[] not null default '{}',
  status       text not null default 'draft' check (status in ('draft', 'published')),
  cover_image  text,          -- storage path, not a full URL
  cover_alt    text,
  seo_title    text,
  seo_desc     text,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  version      integer not null default 1
);

-- Prevent slug changes on published posts without explicit migration
create or replace function check_slug_change()
returns trigger language plpgsql as $$
begin
  if old.status = 'published' and new.slug != old.slug then
    raise exception 'Cannot change slug of a published post. Unpublish first or add a redirect.';
  end if;
  return new;
end;
$$;

create trigger guard_published_slug
  before update on posts
  for each row execute function check_slug_change();

-- Auto-update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  new.version = old.version + 1;
  return new;
end;
$$;

create trigger posts_updated_at
  before update on posts
  for each row execute function set_updated_at();

-- ============================================================
-- PROJECTS
-- ============================================================
create table if not exists projects (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  description  text,
  problem      text,
  approach     text,
  tools        text,
  result       text,
  learned      text,
  repo_url     text,
  live_url     text,
  cover_image  text,
  cover_alt    text,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  featured     boolean not null default false,
  display_order integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  version      integer not null default 1
);

create trigger projects_updated_at
  before update on projects
  for each row execute function set_updated_at();

-- ============================================================
-- PROFILE / SETTINGS  (single row, keyed by owner)
-- ============================================================
create table if not exists profile (
  id           uuid primary key default gen_random_uuid(),
  owner_id     uuid not null unique,  -- references auth.users(id)
  tagline      text,
  bio          text,
  currently    text,
  currently_date text,
  skills_web   text,
  skills_re    text,
  skills_infra text,
  uses_editor  text,
  uses_terminal text,
  uses_os      text,
  uses_hardware text,
  uses_lab     text,
  updated_at   timestamptz not null default now()
);

-- Only one profile row; insert or update pattern used from application
create or replace function profile_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profile_updated_at
  before update on profile
  for each row execute function profile_updated_at();

-- ============================================================
-- MEDIA METADATA
-- ============================================================
create table if not exists media (
  id           uuid primary key default gen_random_uuid(),
  storage_path text not null unique,   -- path within Supabase Storage bucket
  filename     text not null,
  mime_type    text not null,
  size_bytes   integer,
  width        integer,
  height       integer,
  alt_text     text,
  caption      text,
  is_public    boolean not null default false,
  uploaded_at  timestamptz not null default now()
);

-- ============================================================
-- SLUG REDIRECTS
-- ============================================================
create table if not exists slug_redirects (
  id           uuid primary key default gen_random_uuid(),
  from_slug    text not null unique,
  to_slug      text not null,
  created_at   timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table posts          enable row level security;
alter table projects       enable row level security;
alter table profile        enable row level security;
alter table media          enable row level security;
alter table slug_redirects enable row level security;

-- Helper: is the current user the owner?
-- Replace the UUID with your actual owner UUID after provisioning.
-- The app also checks auth.uid() = owner_id where applicable.
create or replace function is_owner()
returns boolean language sql security definer as $$
  select auth.uid() is not null
    and auth.uid()::text = current_setting('app.owner_id', true)
$$;

-- POSTS policies
-- Anonymous: read published only
create policy "posts_anon_read" on posts
  for select to anon
  using (status = 'published');

-- Owner: full access
create policy "posts_owner_all" on posts
  for all to authenticated
  using (is_owner())
  with check (is_owner());

-- PROJECTS policies
create policy "projects_anon_read" on projects
  for select to anon
  using (status = 'published');

create policy "projects_owner_all" on projects
  for all to authenticated
  using (is_owner())
  with check (is_owner());

-- PROFILE policies
-- Public tagline/bio fields are read via the application layer, not direct anon access
create policy "profile_owner_all" on profile
  for all to authenticated
  using (is_owner())
  with check (is_owner());

-- MEDIA policies
-- Anon can see metadata for public media only
create policy "media_anon_read" on media
  for select to anon
  using (is_public = true);

create policy "media_owner_all" on media
  for all to authenticated
  using (is_owner())
  with check (is_owner());

-- SLUG REDIRECTS: anon read, owner write
create policy "redirects_anon_read" on slug_redirects
  for select to anon using (true);

create policy "redirects_owner_all" on slug_redirects
  for all to authenticated
  using (is_owner())
  with check (is_owner());

-- ============================================================
-- STORAGE BUCKETS
-- (Run these manually in Supabase dashboard -> Storage, or via supabase CLI)
-- ============================================================
-- 1. Create bucket "media" — private by default
-- 2. Create bucket "media-public" — public
--
-- Storage policies (apply in Supabase dashboard -> Storage -> Policies):
--
-- media bucket (private):
--   - Owner can INSERT, SELECT, UPDATE, DELETE (match uid = owner_id setting)
--   - No anon access
--
-- media-public bucket:
--   - Anon can SELECT
--   - Owner can INSERT, SELECT, UPDATE, DELETE

-- ============================================================
-- INITIAL SEED: placeholder projects (migrate from MDX)
-- ============================================================
insert into projects (slug, title, description, status, display_order)
values
  ('project-01', '[PLACEHOLDER] Project 01', 'Editable project slot. No findings or results claimed.', 'draft', 1),
  ('project-02', '[PLACEHOLDER] Project 02', 'Editable project slot. No findings or results claimed.', 'draft', 2),
  ('project-03', '[PLACEHOLDER] Project 03', 'Editable project slot. No findings or results claimed.', 'draft', 3),
  ('project-04', '[PLACEHOLDER] Project 04', 'Editable project slot. No findings or results claimed.', 'draft', 4)
on conflict (slug) do nothing;
