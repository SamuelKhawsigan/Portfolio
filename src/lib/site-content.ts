import evidence from '../content/profile/evidence.json';
import { createPublicBlogClient } from './supabase';

export const siteDefaults = {
  home_intro: 'I study IT in Kuala Lumpur and spend my time testing web apps and LLMs, reversing crackmes, and watching homelab logs.',
  home_portrait_caption: 'Off the keyboard for once.',
  profile_portrait_path: '/images/about/samuel-portrait.webp',
  profile_portrait_alt: 'Samuel Khawsigan wearing glasses, a grey suit, and a red tie.',
  home_work_heading: 'Work with receipts.',
  home_events_heading: 'People, places, occasional sunlight.',
  home_notes_heading: 'Field notes.',
  home_notes_intro: 'Security labs, things I got wrong, and what finally made sense.',
  profile_intro_1: 'I’m Samuel, a Diploma in IT student in Kuala Lumpur. I spend my time around web pentesting, LLM security testing, crackmes, and homelab logging.',
  profile_intro_2: 'I completed a cybersecurity internship at a telecom company. The experience belongs here. The company’s internals don’t.',
  profile_intro_3: 'Next up is APU’s BSc Computer Science (Cyber Security). There’s still plenty to learn. That’s the point.',
  profile_web_tools: '[PLACEHOLDER: TOOLS] Add tools and techniques I actually use.',
  profile_re_tools: '[PLACEHOLDER: TOOLS] Add my debugger and RE toolchain.',
  profile_siem_tools: '[PLACEHOLDER: TOOLS] Add my lab and logging stack.',
  profile_internship: '[PLACEHOLDER] Add a short description of responsibilities and lessons learned that can be shared publicly.',
  profile_internship_dates: '[PLACEHOLDER: DATES]',
  profile_diploma: '[PLACEHOLDER] Add relevant modules or a real coursework project.',
  profile_diploma_dates: '[PLACEHOLDER: DATES]',
  profile_diploma_institution: '[PLACEHOLDER: INSTITUTION]',
  profile_apu_start_date: '[PLACEHOLDER: START DATE]',
  profile_learning: '[PLACEHOLDER] What I’m studying, where I’m stuck, and what I’m trying next.',
  profile_certifications_note: 'These are completion and participation records. DataCamp GitHub Foundations is a course completion. In-progress certifications: [PLACEHOLDER].',
  events_intro: 'Workshops, visits, and the occasional group photo.',
  uses_intro: 'Setup details pending. Nothing here is a recommendation until I’ve actually used it.',
  uses_hardware: '[PLACEHOLDER] Hardware, memory, storage, and virtualisation.',
  uses_os: '[PLACEHOLDER] Distro and version.',
  uses_editor: '[PLACEHOLDER] Editor and useful extensions.',
  uses_terminal: '[PLACEHOLDER] Terminal, shell, and configuration.',
  uses_web: '[PLACEHOLDER] Tools I use and why.',
  uses_re: '[PLACEHOLDER] Disassembler, debugger, and supporting tools.',
  uses_siem: '[PLACEHOLDER] Logging stack and lab structure. Keep network details private.',
  contact_intro: 'Email works. There’s no form pretending to send one.',
  contact_email: 'samuelkhawsigan.it@gmail.com',
  contact_github: 'https://github.com/SamuelKhawsigan',
  contact_linkedin: 'https://www.linkedin.com/in/samuel-khawsigan/',
  footer_heading: 'Still here?',
  footer_intro: 'Send a note, look through the code, or follow the blog.',
} as const;

export type SiteKey = keyof typeof siteDefaults;
export type SiteSettings = Record<SiteKey, string>;

const safeSocial = (value: string, host: string) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (url.hostname === host || url.hostname === `www.${host}`);
  } catch { return false; }
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const client = createPublicBlogClient();
  if (!client) return { ...siteDefaults };
  const { data, error } = await client.from('site_settings').select('key,value');
  if (error || !data) return { ...siteDefaults };
  const settings: SiteSettings = { ...siteDefaults };
  for (const item of data) {
    if (Object.hasOwn(siteDefaults, item.key) && typeof item.value === 'string') {
      settings[item.key as SiteKey] = item.value;
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.contact_email)) settings.contact_email = siteDefaults.contact_email;
  if (!safeSocial(settings.contact_github, 'github.com')) settings.contact_github = siteDefaults.contact_github;
  if (!safeSocial(settings.contact_linkedin, 'linkedin.com')) settings.contact_linkedin = siteDefaults.contact_linkedin;
  if (!settings.profile_portrait_path.startsWith('/images/about/') && !/^gallery\/[a-f0-9-]+\.(jpg|png|webp)$/.test(settings.profile_portrait_path)) {
    settings.profile_portrait_path = siteDefaults.profile_portrait_path;
  }
  return settings;
}

export type GalleryPhoto = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  alt: string;
  src: string;
  width: number | null;
  height: number | null;
};

const fallbackPhotos: GalleryPhoto[] = evidence.photos.map((photo) => ({
  slug: photo.image, title: photo.title, summary: photo.summary, alt: photo.alt,
  src: `/images/about/${photo.image}.webp`, width: photo.width, height: photo.height,
}));

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const client = createPublicBlogClient();
  if (!client) return fallbackPhotos;
  const { data, error } = await client.from('gallery_items')
    .select('id,slug,title,summary,alt,image_path,width,height')
    .eq('status', 'published')
    .order('display_order', { ascending: true });
  if (error || !data) return fallbackPhotos;
  return data.map((photo) => ({
    id: photo.id, slug: photo.slug, title: photo.title, summary: photo.summary,
    alt: photo.alt, width: photo.width, height: photo.height,
    src: photo.image_path.startsWith('/') ? photo.image_path
      : client.storage.from('portfolio-gallery').getPublicUrl(photo.image_path).data.publicUrl,
  }));
}

export type Achievement = {
  slug: string;
  category: 'completion' | 'participation' | 'ctf';
  title: string;
  issuer: string;
  type: string;
  date: string;
  detail: string;
  alt: string;
  src: string;
  width: number | null;
  height: number | null;
};

const fallbackAchievements: Achievement[] = ([
  ...evidence.completions.map(item => ({ ...item, category: 'completion' as const })),
  ...evidence.participation.map(item => ({ ...item, category: 'participation' as const })),
  ...evidence.ctf.map(item => ({ ...item, category: 'ctf' as const })),
]).map(item => ({
  slug: item.image, category: item.category, title: item.title, issuer: item.issuer,
  type: item.type, date: item.date, detail: 'detail' in item ? item.detail : '',
  alt: item.alt, src: `/images/about/${item.image}.webp`, width: item.width, height: item.height,
}));

export async function getAchievements(): Promise<Achievement[]> {
  const client = createPublicBlogClient();
  if (!client) return fallbackAchievements;
  const { data, error } = await client.from('achievement_items')
    .select('slug,category,title,issuer,type,date_label,detail,image_path,alt,width,height')
    .eq('status', 'published')
    .order('display_order', { ascending: true });
  if (error || !data) return fallbackAchievements;
  return data.map(item => ({
    slug: item.slug, category: item.category, title: item.title, issuer: item.issuer,
    type: item.type, date: item.date_label, detail: item.detail, alt: item.alt,
    width: item.width, height: item.height,
    src: item.image_path.startsWith('/') ? item.image_path
      : client.storage.from('portfolio-gallery').getPublicUrl(item.image_path).data.publicUrl,
  }));
}

export type PublicProject = {
  slug: string;
  title: string;
  description: string | null;
  problem: string | null;
  approach: string | null;
  tools: string | null;
  result: string | null;
  learned: string | null;
  repo_url: string | null;
  live_url: string | null;
  cover_image: string | null;
  cover_alt: string | null;
  featured: boolean;
  display_order: number;
};

export async function getPublicProjects(): Promise<PublicProject[]> {
  const client = createPublicBlogClient();
  if (!client) return [];
  const { data, error } = await client.from('projects').select('slug,title,description,problem,approach,tools,result,learned,repo_url,live_url,cover_image,cover_alt,featured,display_order')
    .eq('status', 'published').order('display_order', { ascending: true });
  return error || !data ? [] : data;
}

export function publicImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith('/')) return path;
  const client = createPublicBlogClient();
  return client ? client.storage.from('portfolio-gallery').getPublicUrl(path).data.publicUrl : null;
}
