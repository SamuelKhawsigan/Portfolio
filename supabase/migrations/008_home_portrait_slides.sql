create table if not exists public.home_portrait_slides (
  id uuid primary key default gen_random_uuid(),
  caption text not null default '',
  alt text not null,
  image_path text not null,
  display_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);

alter table public.home_portrait_slides enable row level security;

create policy "home_portrait_slides_public_read" on public.home_portrait_slides
  for select to anon using (status = 'published');
create policy "home_portrait_slides_owner_all" on public.home_portrait_slides
  for all to authenticated using (public.is_owner()) with check (public.is_owner());

grant select on public.home_portrait_slides to anon;
grant select, insert, update, delete on public.home_portrait_slides to authenticated;

insert into public.home_portrait_slides (caption, alt, image_path, display_order)
values ('Off the keyboard for once.', 'Samuel Khawsigan wearing glasses, a grey suit, and a red tie.', '/images/about/samuel-portrait.webp', 10)
on conflict do nothing;
