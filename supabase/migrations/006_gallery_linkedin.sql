alter table public.gallery_items
  add column if not exists linkedin_url text;

alter table public.gallery_items
  add column if not exists event_slug text;

-- A gallery item can be attached to an event. Reuse an event slug for
-- additional photos from the same event; the first photo becomes its cover.
update public.gallery_items
  set event_slug = slug
  where event_slug is null or event_slug = '';

alter table public.gallery_items
  alter column event_slug set not null;

alter table public.gallery_items
  drop constraint if exists gallery_items_event_slug_check;

alter table public.gallery_items
  add constraint gallery_items_event_slug_check
  check (event_slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$');

alter table public.gallery_items
  drop constraint if exists gallery_items_linkedin_url_check;

alter table public.gallery_items
  add constraint gallery_items_linkedin_url_check
  check (linkedin_url is null or linkedin_url ~ '^https://([a-z]{2,3}\.)?linkedin\.com/');
