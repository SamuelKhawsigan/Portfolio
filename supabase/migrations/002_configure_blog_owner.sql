create schema if not exists portfolio_private;

create table if not exists portfolio_private.blog_owner (
  singleton boolean primary key default true check (singleton),
  user_id uuid not null references auth.users(id) on delete cascade
);

alter table portfolio_private.blog_owner enable row level security;

revoke all on schema portfolio_private from public, anon, authenticated;
revoke all on portfolio_private.blog_owner from public, anon, authenticated;

create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from portfolio_private.blog_owner
    where user_id = auth.uid()
  );
$$;

revoke execute on function public.is_owner() from public;
grant execute on function public.is_owner() to authenticated;
grant select on public.posts to anon;
grant select, insert, update on public.posts to authenticated;
