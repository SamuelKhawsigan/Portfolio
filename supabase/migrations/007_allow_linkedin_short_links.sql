alter table public.gallery_items
  drop constraint if exists gallery_items_linkedin_url_check;

alter table public.gallery_items
  add constraint gallery_items_linkedin_url_check
  check (
    linkedin_url is null
    or linkedin_url ~ '^https://((([a-z0-9-]+)\.)?linkedin\.com|lnkd\.in)/'
  );
