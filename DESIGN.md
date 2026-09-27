# The Lapis AI: Design System

Dark, photographic and quiet. The site mirrors a pinned reference: a near-black olive page, full-bleed moody photography graded to olive shadows and warm highlights, frosted-glass UI, a split uppercase nav around a centred logo, and a single tight neo-grotesk. It replaces the old navy/cyan system entirely. Product context and copy rules live in `PRODUCT.md`.

Mode: **Persuade** for marketing pages (Home, Solutions, Services, Industries, Pricing, How It Works, About, Case Studies, Contact); **Read** for blog posts (a 70ch reading column inside the same shell).

## Palette (`src/index.css :root`)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0f120c` | Page background (also `theme-color`, manifest and OG) |
| `--bg-2` / `--bg-3` | `#151812` / `#1b1e17` | Quiet bands (`.section-navy`), inputs, table heads |
| `--bg-deep` | `#080a06` | Deepest shadows |
| `--text` | `#f2f2ee` | Headings and primary text |
| `--text-2` | `#c8cac1` | Secondary text on photos, hero subtitles |
| `--muted` | `#979a90` | Body grey (6.4:1 on `--bg`) |
| `--dim` | `#6d7067` | Large display text only (3.6:1, passes 3:1 for large text) |
| `--sage-200/300/400` | `#d3dfc8` / `#b4c6a4` / `#93a883` | Sparkles, ticks, links, focus rings |
| `--green-500…900` | `#556655` → `#1a2219` | Buttons, icon circles, featured cards |
| `--star` | `#e5c867` | Reserved; there are no ratings on the site |
| `--hair` / `--hair-2` / `--hair-3` | white at 8% / 12% / 20% | Hairlines, borders, hover borders |
| `--glass` / `--glass-2` / `--glass-dark` | white 4.5% / 7%, olive 62% | Glass fills |
| `--featured` | `#2e422d → #1d271c → #1a2219` | Featured plan card, highlighted quote, callouts |
| `--btn-primary` | `#4d624b → #34493a → #253824` | Primary pill button |

Rules: never introduce a new hue; accents are sage and green only. No naira, and no gold or cyan anywhere in the UI (the favicon remains the old cyan mark until the owner replaces it).

## Typography

- **Inter Tight** (variable 300–700, OFL), self-hosted in `public/fonts/inter-tight-latin(-ext).woff2`, licence at `public/fonts/InterTight-OFL.txt`. The latin subset is preloaded in `index.html`.
- Display (`.hero-title`, `.section-title`, statements): weight 500, letter-spacing `-0.035em` to `-0.038em`, line-height 1.04–1.1, `text-wrap: balance`.
  - Hero: `clamp(38px, 5vw, 72px)`.
  - Section: `clamp(32px, 3.6vw, 52px)`; the trailing `.accent` span is `--muted`, echoing the reference's white-then-grey headings.
- Body: 15–17px, line-height 1.55–1.6, `--muted`.
- Labels, nav and footer menu: UPPERCASE, 11–12.5px, weight 500, slight positive tracking.

## Layout

- Container max width 1320px (`--maxw`); gutter `clamp(20px, 4.2vw, 60px)`.
- Section rhythm: `clamp(80px, 9vw, 136px)` vertical padding.
- Section header (`SectionHeading`):
  - Default: eyebrow pill, a big left heading, and a grey right-aligned paragraph with an optional pill button (`action`).
  - `center`: for testimonial-style sections.
- Radii: 10 / 14 / 18 / 26px and pill. Cards use 18–22px; the How We Work panel uses 26px.

## Components

- **Eyebrow pill** (`.eyebrow`): dark translucent pill, 1px `--hair-2`, with a masked four-point sparkle `::before`.
- **Buttons** (`Button.tsx`, all pills):

  | Variant | Class | Look |
  |---|---|---|
  | `primary` | `.btn-primary` | Green gradient, inner top highlight |
  | `ghost` / `ghost-light` | `.btn-secondary` | Near-black with a hairline border |
  | `green` | `.btn-green` | Flat `--green-800` (e.g. "View Solutions") |
  | `light` | `.btn-light` | Light fill |

  Sizes are `sm` (38px), `md` (46px) and `lg` (52px).
- **Glass card** (`.card`): a white 5.5% → 2.5% gradient, 1px `--hair`, and an inset top highlight. Hover lifts linked cards and brightens the border. Cards in a row share equal heights.
- **Featured card**: the `--featured` gradient, a brighter border and faint corner cross-hair glow lines.
  - Used for the middle plan card (`PricingBlocks`) and the centre quote on the Home results wall.
- **Plan cards** (`PricingBlocks.tsx`), in this order:
  1. a green icon circle;
  2. the plan name and grey description;
  3. the price with a small grey suffix;
  4. a hairline;
  5. "What's included?";
  6. circle-check list;
  7. a full-width pill button.
- **Green icon circle**: `radial-gradient(circle at 50% 28%, #5a7757, #33503a 55%, #22381f)` with a sage icon. Used on plan cards, service cards, team cards and step cards.
- **Hero chips** (`HeroChips.tsx`): floating dark glass pills with a green sparkle, restating real capabilities only.
  - Home shows 5 (3 below 768px); inner heroes show up to 4 (hidden below 1200px).
  - `aria-hidden`, because they are decorative.
- **Page hero** (`PageHero.tsx`): a full-bleed graded photo with a bottom fade into `--bg`, then crumbs, a centred eyebrow, the h1, subtitle and pill CTAs. It is about 70–80vh on desktop.
  - Props: `image` (a `PhotoName`), `chips`, `crumbs`, `eyebrow`, `text`, `subtext`, `ctaLabel`, children.
- **Nav** (`Header.tsx`): transparent over the hero, becoming a dark blurred bar on scroll.
  - Layout: LEFT = Solutions▾ · Services▾ · Industries▾ · How It Works; a centred logo; RIGHT = Pricing · Case Studies · About · Contact.
  - Dropdowns are dark glass panels.
  - Below 1280px, a full-screen glass menu that is focus-trapped and closes on Escape.
- **Logo** (`Logo.tsx`): `src/data/logo-mark.webp` rendered monochrome white via a CSS filter, plus the "The Lapis AI" wordmark in Inter Tight 500.
- **Logo strip** (`ClientLogoStrip.tsx`): a monochrome marquee with edge fades.
  - Per-logo `tone`: `invert` for dark marks on light badges; `badge` for white marks on mid-tone discs.
- **Solution cards and mockups** (`SolutionMockups.tsx`): a misty-forest photo background with a frosted UI mockup, then a title and grey copy.
  - Mockup figures are real site facts only (under 60 seconds, 24/7, 45 days) or generic labels.
- **How We Work** (`HowWeWork.tsx`): a full-bleed photo with a large frosted panel carousel of the 6 real sales-path steps.
  - Shows a `// 01 - 06` counter and a line-art SVG icon per step.
  - Controls: prev/next glass buttons, dots, arrow keys, swipe and `aria-live`.
- **Results wall** (Home): 3-column masonry of the 3 real client quotes and the 4 real result stats, with monogram avatars and no stars. The centre card is featured; the top and bottom fades are subtle.
- **Footer** (`Footer.tsx`):
  - Columns: logo, blurb and circular social buttons; the big underlined email, location and phones; an uppercase MENU (includes Blog).
  - Then a hairline and the © line.
  - Then the giant "Lapis" wordmark: its letters are filled with the misty forest photo (`background-clip: text`) over the mossy forest-floor image. The gradient text here is deliberate and mirrors the reference.
- **Tables** (`ResponsiveTable`): dark glass with hairlines; they reflow to stacked cards on mobile.
- **FAQ** (`FaqList`): glass rows; open and close with a `grid-template-rows` animation.
- **Forms** (Contact): glass inputs and selects, sage focus ring, `:user-invalid` error states. The plan select preselects from `?plan=`.
- **Case study system panel** (`CaseStudyDetail.tsx` `SystemFlow`): a glass panel over forest mist, with three stages of agents. It replaces the old orbit visual.

## Motion

- Entrance: `.fade-up` / `.fade-down` (opacity, 18px rise, 6px blur; 0.9–1s, expo-out). Hero delays stay under 0.35s.
- Scroll: `.reveal` elements rise 22px from a 4px blur, triggered by `IntersectionObserver`. The hidden state only applies under `.js`, so content is visible without JavaScript.
- Ambient: a hero chip float (7s), a logo marquee (46s, pauses on hover) and slow image zoom on card hover.
- `prefers-reduced-motion: reduce` disables the chip float, marquee (logos wrap instead), reveals, carousel transitions and hover zooms.

## Photography

- 23 Unsplash photos (standard Unsplash License); sources and photographers are listed in `CREDITS.md`.
- Files are `public/images/photos/<name>-<width>.webp`; `src/data/photos.ts` lists each name's widths and heights.
- `Photo.tsx` renders `srcset`/`sizes` with explicit dimensions.
  - Heroes use `priority` (eager loading plus `fetchpriority="high"`).
  - Everything else is lazy.
- **Grade.** Every image uses one recipe:
  1. desaturate to 62% and darken to 80%;
  2. recombine channels to pull blue out of the shadows (olive);
  3. apply a warm olive soft-light wash (`rgb(58,66,36)` at 55%);
  4. add a vignette into `#0f120c`.
- **Swapping a photo.**
  1. Run `npm i --no-save sharp`.
  2. Run `node scripts/grade-photo.mjs <input.jpg> <name> --widths 960,1600,2400 [--aspect 1.78] [--y 0.3]`.
  3. Reusing an existing name with the same widths needs no code change. Otherwise paste the printed entry into `photoSources`.
  4. Update `CREDITS.md`.
- **Share images.** `npm run images -- --og-only` regenerates `public/og/*.jpg` in this style: graded page photo, Inter Tight, sage sparkle eyebrow. Leave off `--og-only` to also rebuild favicons and logos.

## Accessibility floor

- Body text is at least 4.5:1 (`--muted` or lighter on `--bg`); `--dim` is only for large display text.
- Visible sage focus rings on every interactive element.
- Dropdowns, mobile menu, carousel and FAQ are fully keyboard operable.
- One h1 per page and semantic landmarks.
- Decorative photos use `alt=""`; meaningful photos get descriptive alt text.
