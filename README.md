# Samuel Khawsigan’s portfolio

Astro, MDX, and hand-written CSS. No analytics. Fonts are served locally.

## Run

Requires Node 22 or newer. Run `npm ci`, then `npm run dev`. Production: `npm run build`. Preview the build with `npm run preview`.

## Add content

Duplicate a file under `src/content/projects/` or `src/content/writeups/`. The filename becomes the URL. Keep the frontmatter fields `title`, `description`, `placeholder`, and optionally `featured`. Set `placeholder: false` only when the content is real and ready to share. Lists and routes are generated automatically.

Store sanitised screenshots under `public/images/`. Use Markdown image syntax with a root-relative image path and meaningful alt text. Remove the placeholder evidence block once you attach actual evidence. Remove IP addresses, credentials, tokens, identifying company material, and active flags before committing images or text. Templates intentionally contain no claimed findings.

With the database editor configured, Home shows a published featured project from the admin portal. The admin also edits Home, Profile, Uses, Events, Contact and footer text. Gallery images, achievements and projects can be added or changed without a rebuild. The repository content remains a fallback when the database is not configured. MDX project and write-up files can still be added directly; unpublished project templates remain visible until a matching project is published from admin.

## Vercel

Import this folder as the project root in Vercel. Astro is detected automatically; `vercel.json` provides the build and output settings plus security headers. Set `PUBLIC_SITE_URL` to your full production origin, including `https://`, then rebuild. It controls canonical URLs and OG image URLs. The live sitemap and RSS feed use it for absolute links; during local development they use the request origin.

Add your custom domain in Vercel, update `PUBLIC_SITE_URL`, and redeploy. Never put secrets in `PUBLIC_` variables. Public content pages render on request so admin edits appear without a rebuild. Unknown URLs use the custom 404, and the write-up index has an explicit empty state.

The RSS feed is at `/rss.xml`. It reads only published blog posts from the same database as `/blog/`, so drafts stay out of the feed and new posts appear without rebuilding the site. The feed uses `PUBLIC_SITE_URL` for absolute production links, or the current request origin during local development. It is linked in the page metadata and footer. Before the first post is published, it is a valid empty feed.

The compiler uses the WebAssembly edition of esbuild for compatibility with this restricted Windows environment. It produces the same static website output and needs no native compiler installation.

## Editing

Palette, spacing, and breakpoints live in `src/styles/global.css` and `src/styles/editorial.css`. Shared navigation, metadata, and footer live in `src/layouts/Layout.astro`. The year is calculated at render time for the live pages. The old profile MDX file is retained as a source snapshot; the live profile uses editable site settings with the same default copy.

## Photos and records

The portrait and supplied photos live in `public/images/about/` as compressed WebP files with embedded metadata removed. `src/content/profile/evidence.json` supplies an offline fallback for event and achievement records. The admin saves new images as WebP after resizing and stripping metadata. Dates and team results were transcribed from the supplied documents. OPSWAT’s numeric date is preserved as printed because its date format was not confirmed. The diploma institution, internship dates, tools, and currently learning fields still need your input.

## Admin portal

The owner editor is at `/admin/`. It manages blog posts, projects, achievement records, gallery photos, the Home/Profile portrait, and page text. Blog and project editors support drafts and publishing. The blog editor can upload an optional JPEG, PNG, or WebP image with alt text when saving a post; it adds the image to the end of the Markdown body. To place an image elsewhere, move the generated Markdown image line after saving. Gallery and achievement entries can be reordered and hidden. Public pages read published records on request, so content changes do not require a rebuild. Layout, colors, and the older MDX write-up archive remain code-managed.

To enable the editor:

1. In your Supabase project, apply the SQL migrations under `supabase/migrations/` in numeric order. If you already applied the initial schema and owner migration, apply migrations 003, 004 and 005. Migration 003 creates the public gallery storage bucket and seeds the existing photos; migration 004 seeds the existing completion and CTF records.
2. Create the owner login under Authentication → Users. Disable public sign-ups if you don't need other accounts.
3. In the Supabase SQL Editor, run the following with the UUID of that owner:

   ```sql
   insert into portfolio_private.blog_owner (singleton, user_id)
   values (true, 'YOUR_OWNER_UUID')
   on conflict (singleton) do update set user_id = excluded.user_id;
   ```

4. Copy `.env.example` to `.env` and set `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `OWNER_USER_ID`. Set the same values in Vercel project settings. Use the same owner UUID in both the SQL and environment. The editor uses the publishable key with the signed-in owner's session and Supabase row policies. The older `PUBLIC_SUPABASE_ANON_KEY` variable remains supported for an existing project.
5. Restart the local server or redeploy, then visit `/admin/`. Create a draft first and confirm it is absent from the public site before publishing. Images must be sanitized before upload; the editor accepts JPEG, PNG or WebP up to 8 MB.

The sign-in page has a password reset flow. In Supabase Authentication → URL Configuration, set the Site URL or an allowed redirect URL to the deployed `/admin/reset-password/` page. During local setup, use `http://localhost:4321/admin/reset-password/`. Update this setting to the production HTTPS address after deployment. The local `.env` file contains only the publishable key and project identifiers, never a password or service-role key.

The database is the live source after these migrations. The original images and evidence JSON remain as an offline fallback. The admin is intentionally disabled until the environment variables and owner account are configured. Keep the local `.env` file private; it is ignored by version control.

