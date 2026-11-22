create table if not exists public.achievement_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null check (category in ('completion', 'participation', 'ctf')),
  title text not null,
  issuer text not null default '',
  type text not null default '',
  date_label text not null default '',
  detail text not null default '',
  image_path text not null,
  alt text not null,
  width integer,
  height integer,
  display_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);

alter table public.achievement_items enable row level security;
create policy "achievement_public_read" on public.achievement_items
  for select to anon using (status = 'published');
create policy "achievement_owner_all" on public.achievement_items
  for all to authenticated using (public.is_owner()) with check (public.is_owner());
grant select on public.achievement_items to anon;
grant select, insert, update, delete on public.achievement_items to authenticated;

insert into public.achievement_items (slug, category, title, issuer, type, date_label, detail, image_path, alt, width, height, display_order)
values
  ('thm-junior-pentester','completion','Jr Penetration Tester Learning Path','TryHackMe','Learning path completion','23 June 2026','','/images/about/thm-junior-pentester.webp','TryHackMe certificate confirming Samuel Khawsigan completed the Jr Penetration Tester Learning Path on 23 June 2026.',487,345,10),
  ('opswat-cip','completion','Introduction to Critical Infrastructure Protection','OPSWAT Academy','Program completion','Issued 09/03/2026, as printed','','/images/about/opswat-cip.webp','OPSWAT Academy Introduction to Critical Infrastructure Protection completion certificate for Samuel Khawsigan.',1280,1010,20),
  ('datacamp-github','completion','GitHub Foundations','DataCamp','Course completion, 9 hours','29 September 2026','','/images/about/datacamp-github.webp','DataCamp statement of accomplishment for Samuel Khawsigan, GitHub Foundations, completed 29 September 2026.',1287,742,30),
  ('datacamp-git','completion','Intermediate Git','DataCamp','Course completion, 2 hours','29 September 2026','','/images/about/datacamp-git.webp','DataCamp statement of accomplishment for Samuel Khawsigan, Intermediate Git, completed 29 September 2026.',1287,742,40),
  ('apu-pwnexe-workshop','participation','Pwn.exe / AI: IoT Exploitation with Ollama + MCP','Asia Pacific University','Workshop participation','19 July 2026','','/images/about/apu-pwnexe-workshop.webp','APU certificate of participation for Samuel Khawsigan in the Pwn.exe AI IoT exploitation workshop on 19 July 2026.',491,347,50),
  ('htb-nightfall','ctf','Global Cyber Skills Benchmark 2026: Project Nightfall','Hack The Box','Team orient, 226th of 589 teams','15–20 May 2026','66 of 126 challenges solved. Team total: 35,950 points.','/images/about/htb-nightfall.webp','Hack The Box participation result for Samuel Khawsigan and team orient, Project Nightfall 2026: team rank 226, 66 challenges solved and 35,950 points.',491,347,60),
  ('htb-cyber-apocalypse','ctf','Cyber Apocalypse CTF 2026: The Salt Crown','Hack The Box','Team orient, 566th of 6,744 teams','24–29 July 2026','46 of 136 challenges solved. Team total: 26,925 points.','/images/about/htb-cyber-apocalypse.webp','Hack The Box Cyber Apocalypse 2026 participation result for Samuel Khawsigan and team orient: team rank 566, 46 challenges solved and 26,925 points.',491,347,70),
  ('htb-holmes','ctf','Holmes CTF 2026: The Reichenbach Directive','Hack The Box','Team orient, 980th of 5,637 teams','17–21 September 2026','13 of 111 challenges solved. Team total: 1,100 points.','/images/about/htb-holmes.webp','Hack The Box Holmes CTF 2026 participation result for Samuel Khawsigan and team orient: team rank 980, 13 challenges solved and 1,100 points.',1600,1131,80)
on conflict (slug) do nothing;
