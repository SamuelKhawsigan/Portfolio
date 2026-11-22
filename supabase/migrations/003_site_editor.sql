create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  alt text not null,
  image_path text not null,
  width integer,
  height integer,
  display_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
alter table public.gallery_items enable row level security;

create policy "site_settings_public_read" on public.site_settings
  for select to anon using (true);
create policy "site_settings_owner_write" on public.site_settings
  for all to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "gallery_public_read" on public.gallery_items
  for select to anon using (status = 'published');
create policy "gallery_owner_all" on public.gallery_items
  for all to authenticated using (public.is_owner()) with check (public.is_owner());

grant select on public.site_settings, public.gallery_items to anon;
grant select, insert, update, delete on public.site_settings, public.gallery_items to authenticated;

insert into public.gallery_items (slug, title, summary, alt, image_path, width, height, display_order)
values
  ('builders-and-brews', 'Builders & Brews, Hack Edition', 'A builder event hosted by Nebius and Tavily.', 'Samuel beside a Nebius and Tavily Builders and Brews Hack Edition banner.', '/images/about/builders-and-brews.webp', 744, 992, 10),
  ('aws-photo', 'AWS', 'An industry visit to AWS.', 'Samuel seated in front of an AWS display.', '/images/about/aws-photo.webp', 800, 1066, 20),
  ('qwen-workshop', 'Alibaba Cloud Qwen AI 101 Workshop', 'An introductory workshop on Alibaba Cloud’s Qwen models.', 'Samuel with another attendee in front of the Alibaba Cloud Qwen AI 101 Workshop presentation.', '/images/about/qwen-workshop.webp', 800, 1066, 30),
  ('microsoft-photo', 'Microsoft', 'An industry visit to Microsoft.', 'Samuel and three other people posing in front of a Microsoft sign.', '/images/about/microsoft-photo.webp', 800, 1067, 40),
  ('grow-ai-summit', 'Exabytes GROW AI Summit 2026', 'A community summit focused on AI.', 'Samuel and three other people in front of the Exabytes GROW AI Summit 2026 event backdrop.', '/images/about/grow-ai-summit.webp', 1080, 718, 50)
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-gallery', 'portfolio-gallery', true, 8388608, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "portfolio_gallery_public_read" on storage.objects
  for select to anon using (bucket_id = 'portfolio-gallery');
create policy "portfolio_gallery_owner_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio-gallery' and public.is_owner());
create policy "portfolio_gallery_owner_update" on storage.objects
  for update to authenticated using (bucket_id = 'portfolio-gallery' and public.is_owner())
  with check (bucket_id = 'portfolio-gallery' and public.is_owner());
create policy "portfolio_gallery_owner_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio-gallery' and public.is_owner());
