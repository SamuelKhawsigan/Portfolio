# Kill the defaults audit

## Radius, shadow, font, and spacing

Built from an empty Astro project, with no component framework or starter theme to inherit.

| Default | Deliberate replacement |
| --- | --- |
| Rounded cards and buttons | Square corners throughout. No radius declarations. |
| Card shadows and glow | No box shadows, text shadows, or blur. Panes use 1px borders. |
| Browser body margin | Zero; the shell controls page gutters. |
| Browser serif body font | Locally served Source Sans 3, 18px base, 1.6 line height. |
| Browser heading font | Locally served JetBrains Mono, weights 400 and 600. |
| Browser heading sizes | Page H1 scales from 2rem to 4rem. Home nameplate scales from 2.25rem to 4.75rem on desktop and 1.7rem to 3rem on mobile. H2 is 1.3rem, selected project 1.1rem to 1.6rem, notes title 1.4rem, and H3 1rem. |
| Default bold headings | H1 weight 600; secondary headings weight 400. |
| Default heading tracking | Page H1 uses -0.06em and Home -0.055em. Labels use 0.04em. |
| Default heading margins | Page H1 has zero top margin and 1.4rem bottom margin. Home has 1.2rem above its nameplate and no bottom margin. Pane headings use zero top margin and 1rem bottom margin. |
| Default paragraph margins | Zero top margin and 1.4rem bottom margin. |
| Generic framework spacing scale | Custom tokens: 0.45, 0.9, 1.4, 2.2, 3.6, and 5.8rem. |
| Uniform section padding | Main 2rem top and 4rem bottom. Pane content 1.5rem, 1.2rem at intermediate widths, and 1rem on mobile. |
| Uniform layout gaps | Workbench 1.35rem with a 175px directory rail and 285px notes column. Notes offset 2.1rem. Lower sections use a 4rem gap and a 196px left offset. Intermediate widths use a 145px rail, 245px notes, 1rem gaps, and a 161px lower offset. |
| Default page width | 1560px maximum shell, 2rem desktop gutters, 1rem mobile gutters. |
| Default preformatted output | Bordered blocks, 1.4rem padding, 0.85rem mono text, horizontal scroll confined to the block. |
| Default definition-list indent | Zero; terms and descriptions have deliberate vertical spacing. |
| Default link underline placement | Offset 0.25em. Navigation uses explicit current-page color. |
| Browser focus appearance | 2px amber outline, 5px offset. Skip link becomes visible when focused. |

Fine spacing is explicit: status 0.4rem/1rem, nav 0.9rem/1rem, rows 1.1rem/0.25rem, pane bars 0.7rem/1rem, capture frame 0.75rem, empty capture 1rem/0.25rem, capture label rules 0.6rem, project footer gap 1rem, archive heading top margin 1.7rem, learning note margin 2rem and 1rem inset, area rows 1rem and 0.7rem gap, contact links 1.3rem, definition descriptions 0.5rem/1.5rem, and footer 1.2rem. Breakpoints are 650px, 960px, and 1200px. Mobile nameplate spacing is 1.2rem, identity bottom spacing 1.5rem, lower sections 2.2rem, and section gaps 2rem.

## Banned-list review

- Visuals: one amber accent, neutral surfaces, no gradients, glow, blobs, glass, stock avatars, scanlines, grid wallpaper, emoji features, or repeated icon cards. No Inter. Segmented navigation, bracket corners, a directory tree, project rows, and offset panes use different structures. Corner brackets and the empty capture cross are CSS and text interface geometry, not generated artwork.
- Layout: compact personal intro followed by the project evidence slot. No marketing sequence, logo strip, badges, paired CTA buttons, stats, pricing, or testimonials. Navigation stays visible on small screens.
- Copy: rendered page scan found no banned terms, em dashes, lorem ipsum, fake domains, or invented names. No fabricated findings, certifications, numbers, or companies. Unknown content is visibly marked [PLACEHOLDER].
- Code: custom favicon and title; project-specific README; no dead anchors, fake form, console logging, template comments, Tailwind utilities, or default starter content. Source contact links use the addresses supplied by Samuel.
- Behavior: no fade-in, scale hover, boot sequence, tracker, or client JavaScript. The sole easter egg is a native keyboard-operable disclosure on the 404 page.

## Verification

- Production build passed: 12 HTML pages, plus robots.txt and sitemap.xml.
- 108 route/viewport combinations checked: Home, Projects, all four project pages, Write-ups, write-up template, About, Uses, Contact, and a missing route, at 320, 375, 480, 650, 768, 900, 1024, 1440, and 1920px. No horizontal document overflow.
- Redesigned desktop and 320px Home screenshots inspected. Contact also inspected at 768px. The revised layout passed all 108 checks again.
- Visible keyboard focus, skip-to-main behavior, and 404 disclosure verified in browser.
- Built HTML scan found no broken internal links or missing linked assets, and zero JavaScript files.
- Static content needs no simulated loading state. Unpublished write-ups have an explicit empty state. Invalid MDX fails the build instead of silently rendering a broken page.

## Pending before publication

Vercel account/repository access and the production domain have not been supplied. Set PUBLIC_SITE_URL when those are known, then rebuild to populate canonical URLs, OG image URLs, and sitemap entries. The custom 1200×630 PNG social image and terminal SVG favicon are included. Placeholder detail pages are marked noindex and excluded from the sitemap. Security headers are configured in vercel.json; actual HTTP header delivery must be verified after deployment.

Screenshots and terminal captures are deliberately empty, not generated evidence. Replace them with sanitised real material before treating any project as published work. This revision takes visual cues from marsshark.my, portfolio-airil.vercel.app, and the six supplied reference images. It preserves Samuel’s content and amber theme. No borrowed portraits, projects, achievements, fake charts, neon green, scanlines, gradients, or glow were introduced.

## About layout revision

Added the supplied reference’s split introduction, grouped skills, and experience timeline. The personal mark is type, not an invented portrait. Radius stays zero, shadows stay absent, and fonts stay JetBrains Mono / Source Sans 3. New spacing is explicit: intro gap 5rem and 3.8rem bottom padding, skill inset 1.25rem/1.5rem, timeline columns 210px/remaining width with 1.8rem gaps, entries 1.3rem/1.6rem, and bottom sections 4rem apart. The 960px and 650px breakpoints reduce gaps and stack sections. About passed all nine viewport checks, 320px to 1920px; desktop and mobile screenshots inspected. Production build and link/banned-copy scans passed. Dates, tools, responsibilities, institution, and certification details remain marked placeholders. About content is editable MDX.

## Supplied photos and completion records

Added all 14 supplied images: one portrait, five event/visit photos, four completion records, one workshop participation record, and three CTF team records. Natural photo/document colors are preserved; the interface palette remains amber and neutral. Images have intrinsic dimensions, descriptive alt text, lazy loading except the primary portrait, WebP compression, and no embedded EXIF metadata. Completed courses are not represented as professional exam certifications, and CTF ranks/points are labelled team results. No employer, university enrolment, or award claims were inferred from event photos. Certificate disclosures use native details/summary and keyboard access. About passed nine widths from 320px to 1920px, including an expanded record at 320px. Build and linked-asset checks passed. Additional spacing is explicit: record rows 1.25rem/0.5rem with 2rem gaps, expanded image body 1.5rem, gallery gaps 1.5rem desktop and 1rem mobile, and section offsets 2.5rem/3rem. Corners remain square and shadows absent.

## ImageGen reference redesign, 10 October 2026

Generated a reference-based layout concept, then implemented its composition as native Astro markup and CSS. The concept is not shipped as a page bitmap or project evidence. Removed Home's three-column directory/project/notes composition, duplicate skill panels, and dense side notes. Home now uses one featured split, separate ruled project rows, and distinct notes and learning sections. Content remains collection-driven MDX.

Kill-the-defaults inventory for this revision: radius remains 0 throughout; no box shadows; fonts remain locally hosted JetBrains Mono 400/600 and Source Sans 3 400/600. Custom shell maximum 1320px with 1rem to 5rem gutters; Home maximum 1120px; section spacing 4.5rem to 7rem; featured columns .85fr/1.15fr with 2rem to 5rem gap; evidence inset 1rem, empty height 280px desktop/220px mobile; project row spacing 1.9rem; notes inset 2.5rem desktop/1.5rem mobile; now offset 4rem; About section offsets 6rem desktop/4rem mobile; photo gallery two columns with 3rem gaps and one column with 2.5rem gaps; portrait maximum 360px; timeline inset 1.8rem/2rem; disclosure row padding 1.8rem; main bottom 6rem; footer inset 2rem. Navigation uses spaced normal text links with a single square amber current-page border.

Banned-list review: no gradients, glow, blobs, glass, hero illustrations, repeated rounded cards, icons on features, fake metrics, fake dates, testimonials, logos strip, marketing CTA pairs, progress bars, animation, scale effects, trackers, forms, or dead controls. Kept real supplied images and clearly marked placeholders. Generated concept's invented dates and decorative controls were not copied into the implementation.

Production build passed for 12 pages. Checked all 108 route/width combinations at 320, 375, 480, 650, 768, 900, 1024, 1440 and 1920px: no horizontal overflow. Visually reviewed full desktop and 320px Home. Built-HTML audit found no broken local assets/links, banned copy, or client JavaScript.

## Dark editorial trial

The public pages use Source Sans 3 for headings and interface text, with monospace reserved for code and legacy evidence placeholders. The palette is charcoal, warm white and muted sand. Photos and the selected work panel have a 4px radius, shadows remain absent, and the split homepage stacks at 680px. Intro padding is 1.25rem–2.5rem, the first section gap is 3rem–5rem and subsequent section gaps are 4rem–7rem. The homepage uses the supplied portrait and a documented team result, and project drafts remain in the project index. The layout introduces no gradients, glow, repeated cards, animation or client scripting.

## Window and pixel details, 21 November 2026

The current revision adds a sparse 96px tiled pixel grain, 1px amber corner rules, a small window-framed wireframe sketch, and one 520ms entrance for the homepage introduction. The sketch uses Three.js only when the 200px canvas enters view on screens above 680px and reduced motion is off. It renders at 1x resolution and about 24fps; it stops while hidden. The canvas is decorative and omitted from the accessibility tree. Three.js is a separate lazy-loaded chunk, so it is not requested on phones or reduced-motion sessions.

Kill-the-defaults changes in this revision: no framework radius or shadow was introduced; photos, project panel, portrait outline, and sketch window use deliberate 4px corners, and all other edges remain square. Source Sans 3 remains the locally hosted body and heading face, with JetBrains Mono for code and the 10px window label. No new spacing framework was added: the sketch is 200px wide with a 24px title bar and 80px canvas, its top offset is 2rem, the portrait frame is offset 10px, and the corner rules are 1rem. Header links use a 180ms color transition. Reduced-motion users get no entrance animation or link transition.

Banned-list check: no gradient, glow, blur, fake chart, invented metric, repeated card grid, stock illustration, icon row, dead control, tracker, or new placeholder content. The only entrance animation is on the home introduction, not every section. The pixel texture contains no scanlines or wallpaper grid. The portfolio remains Astro because replacing the working stack with Next.js would add weight without improving this design. The optional visual uses Three.js as requested.

Production build passed. Browser checks covered 320, 375, 768, 1024, 1440 and 1920px on Home, plus 320px on Profile, Projects, Events, Gallery, Blog, Uses and Contact. No document overflow was found. The production builder reports a chunk over 500kB for Three.js; it is deferred and only used on larger motion-enabled screens.

## Graphic editorial revision, 21 November 2026

After reviewing ar-raqmi.net, marsshark.my, and adiefalsyarif.my, the public homepage uses a larger real portrait, a warm paper introduction within the dark textured shell, and an immediately following Hack The Box result with its supplied screenshot. Events now pairs each supplied photo with its actual summary. The navigation uses the shorter label Work. The gallery has a restrained offset rhythm.

The tiny Three.js sketch was removed because it distracted from the evidence and added a large download. Three.js is no longer a dependency. The intro alone has a short entrance animation; reduced-motion settings disable it. The page uses the existing Astro build.

Kill-the-defaults inventory for this revision: locally hosted Source Sans 3 remains the display and body face, locally hosted JetBrains Mono appears in small labels and code. New elements use square edges; the shared photo and panel corners stay at the deliberate 4px size inherited from the editorial trial. No shadows were added. The hero uses a custom 1.12/0.88 split, 2rem to 4rem padding, and a 470px minimum height. Section gaps are 3rem to 7rem, with the first proof section closer to the introduction. The featured result uses a .75/1.25 split and 2rem to 6rem gap. Event stories alternate a 1.2/.8 image/text split and stack below 680px. The 96px background pixel grain stays sparse.

Banned-list check: no purple or blue gradients, glow, glass, stock imagery, repeated icon cards, marketing sequence, fake stats, testimonials, dead controls, trackers, hover scaling, or broad scroll fades. No banned copy terms, lorem ipsum, sample domains, dead anchors, or console logs were found in source. Project details remain marked placeholders.

Production build passed without a large-chunk warning. Browser checks covered eight public routes at 320, 375, 768, 1024, 1440 and 1920px: no horizontal overflow or completed broken images. The Events-to-Gallery anchor was opened and resolved to the intended photo. The favicon and 1200×630 OG image now match the revised palette and portrait.

## Forest, paper and copper palette, 21 November 2026

Primary is deep forest #17231e, secondary is warm paper #eae3d6, and tertiary is copper #e8a076. Supporting colors are pine #24332b for controls, sage #c2cbbd for quiet text, and #526257 for rules. The OG image, favicon and browser theme color use the same palette. A scattered 192px fiber tile and the existing fine pixel grain give the dark background texture without a grid, scanlines, glow or gradient.

Kill-the-defaults inventory for this pass: navigation and action links now have deliberate 3px corners; photographs retain 4px corners; large sections keep square edges. There are no blurred drop shadows. The small brand mark uses zero-blur square shadows solely to draw pixels. Source Sans 3 and JetBrains Mono remain locally hosted. Navigation has a 0.4rem gap and 42px minimum targets, while action controls have 44px minimum targets and 0.65rem/1rem padding. Mobile navigation is a balanced three-column, two-row layout below 650px. The home and event section spacing is unchanged.

Animation is limited to the header on load (440ms), page headings (560ms), the home introduction (620ms), and the first event (600ms). A few images use CSS view-timeline motion where supported; other browsers show the static layout. Button hovers change fill and lift 2px, while gallery and event photos lift 3px. The site uses native smooth anchor scrolling. Reduced-motion settings disable animations, image transitions and smooth scrolling. No continuous animation, large client library or tracker was added.

The palette's tested contrast ratios are 14.05:1 for main text on forest, 9.70:1 for quiet text on forest, 7.50:1 for copper text on forest, 6.83:1 for dark text on copper, and 11.56:1 for dark text on paper. Production build passed. Browser checks covered eight public routes at 320, 375, 650, 768, 1440 and 1920px with no horizontal overflow; all action controls met their 44px target height. A source scan found none of the banned copy terms, dead anchors, sample domains or console logs.

## Blue navigation and contour texture, 21 November 2026

Primary is navy #101e2a, secondary is cool paper #e7edf0, and tertiary is blue #88c6ea. Supporting colors are pane #1a2c3a, quiet text #c3d1d8, and rule #456170. A custom contour SVG sits behind the existing fiber and pixel grain, so the background has visible detail without a grid, glow, scanlines or a gradient. The favicon, OG image and browser theme color use the new palette.

The header now has a separate identity line and a full-width segmented navigation. Six destinations use numbered labels and a solid blue current-page state. Hover changes the fill without shifting segment borders; focus has a visible inset outline. The navigation becomes three columns and two rows at 900px, with stacked number and label below 650px. It remains ordinary links and works without JavaScript.

Kill-the-defaults inventory: navigation corners are square, action buttons retain their deliberate 3px radius, photos retain 4px, and no blurred shadows were added. The existing pixel mark uses zero-blur square shadows. Source Sans 3 and JetBrains Mono remain locally hosted. Header spacing is 1.1rem top and 1rem between brand and navigation; navigation targets are 58px desktop and 64px mobile, with 1px rules and .7rem/.85rem desktop padding. The custom 1200px contour graphic is placed behind the content with 192px fiber and 96px grain tiles.

Banned-list check: no blue gradient, glass, glowing blob, stock illustration, repeated card grid, fake proof, dead link, hover scaling, or section-by-section fade was introduced. The existing selective entrance animations and reduced-motion behavior remain. Contrast ratios are 15.28:1 for light text on navy, 10.82:1 for quiet text on navy, 9.11:1 for blue text on navy, 7.77:1 for dark text on blue, and 12.21:1 for dark text on paper. Production build passed. Browser checks covered navigation at 320, 375, 650, 768, 900, 1024, 1440 and 1920px and eight public routes at 320px and 1440px, with no horizontal overflow. The Work link was clicked and its active state verified.

## Social footer and RSS, 21 November 2026

The footer now has a distinct contact area with real email, GitHub, LinkedIn and RSS links, plus Uses, Contact and Back to top. Only supplied social profiles were added. Its action controls have 54px minimum height, 3px radius, 1px rules, and a two-column layout that becomes one column on phones. There are no new shadows or fonts. The footer keeps the blue palette and restrained hover movement, with reduced-motion transitions disabled.

The RSS endpoint reads published blog posts from the same Supabase table as the blog index and emits titles, excerpts, dates and canonical links. Drafts and placeholder projects stay out. It remains valid when empty. The page head advertises the feed. No tracker, invented social profile, fake post, dead anchor, default icon or framework component was added. Desktop and mobile footer views were visually checked, and the feed was opened in the browser as parseable XML. The production build passed.

## Content admin, 21 November 2026

The owner portal now has Blog, Projects, Gallery, Achievements and Site text sections. Published database content appears on the public pages at request time. Source images and written copy remain fallbacks when Supabase is unconfigured. The public sitemap now includes published blog and project URLs without a rebuild. New photos are checked as JPEG/PNG/WebP, decoded, resized to a 3000px maximum, converted to WebP and stripped of embedded metadata before storage. The editor accepts up to 8 MB per input image. Admin routes require the configured owner account, and their pages use no-store responses.

Kill-the-defaults inventory: admin surfaces now use the same locally hosted Source Sans 3 and JetBrains Mono pair as the public site, navy #101e2a, pane #1a2c3a and blue #88c6ea. Controls have deliberate 2px or 3px corners, 1px borders, 44px minimum action height, and no shadow. The mobile admin navigation remains visible as a horizontally scrollable row. The desktop editor uses a 220px side rail and a 1180px maximum content width; field groups use two columns and collapse to one at 720px. No framework card style or default system font remains in the editor.

Banned-list check: no gradients, glowing shapes, glass, repeated icon cards, marketing claims, fake posts, sample domains, generic stock images, tracker, dead button, section fade or hover scaling was added. Existing project slots and unknown setup details remain clearly marked placeholders. The editor uses real labels, focus states, native form controls, useful error messages and draft visibility. Browser checks covered seven public routes at 320, 375, 768 and 1440px without horizontal overflow. The admin login empty state was checked at 320px. Authenticated save flows remain untested locally because this checkout has no Supabase environment or owner account; migrations and setup instructions are in README.
