# Homepage Redesign — Design Spec

**Date:** 2026-04-21
**Author:** jt + Claude
**Status:** Approved (pending user spec review)
**Reference design:** `/Users/jiangtao/Desktop/页面设计/team9-new-homepage/index.html` (saved snapshot of current live team9.ai)

## 1. Goal

Replace the existing 2041-line `components/HomePage.tsx` (OpenClaw / Moltbook narrative across 14 sections) with a focused 5-section homepage aligned to the current live `team9.ai` design. Optimize for SEO and Core Web Vitals. Preserve the existing analytics surface byte-for-byte.

## 2. Non-Goals

- No new analytics events, no new `button_location` values, no removal of existing events. The analytics surface is frozen.
- No refactor of unrelated surfaces (`PricingPage`, `LanguageSwitcher`, Sentry config, i18n routing).
- No new runtime dependencies (no framer-motion, no radix, no shadcn, no third-party image/video CDN).
- No new pages (no `/terms`, no `/privacy` — we link to existing `app.team9.ai` pages).

## 3. Approach (approved: Option A — integral rewrite)

Rewrite `HomePage.tsx` as a single async Server Component that composes 5 sections plus Header/Footer. Introduce exactly one new client component (`FeaturesNav`) for the sticky-highlight nav in the Features section. Reuse existing `HomeViewTracker`, `HeaderCTAGroup`, `HeroCTAGroup`, `FooterCTAGroup`, `DownloadButton`, `LanguageSwitcher`, `AppShell` — changing their props/labels only, not their analytics behavior.

## 4. Page structure

Top-to-bottom, all inside one `<HomePage>` Server Component:

1. **Header** (absolute, transparent, over Hero bg)
   - Left: Team9 wordmark → `href="/"`; GitHub icon → `https://github.com/team9ai/team9`; X icon → `https://x.com/team9_ai`
   - Right: `LanguageSwitcher`; `HeaderCTAGroup` (renders "Sign in" white button)
2. **Hero** (`#product`, dark `#05070b` bg, full-bleed `hero-bg.jpg`)
   - Single H1: `headlineLine1<br>headlineLine2` (serif)
   - Subheadline paragraph
   - `HeroCTAGroup`: Download Mac (white, Apple icon) + Sign up with Google (transparent, Google 4-color icon)
   - "Works with" label + 5 model chips (Claude Opus 4.7, GPT-5.4, Gemini 3.1 Pro, Kimi K2.5, GLM 5.1) with brand logos
   - Autoplay muted loop video `team9-preview.mp4` with `poster="team9-preview-poster.jpg"` and `preload="metadata"`
3. **Features** (`#features`, white bg)
   - Desktop (lg+): left sticky `FeaturesNav` (180px) + right 4 `FeatureBlock`s
   - Mobile/tablet: nav hidden, blocks stack vertically
   - 4 blocks: `#agent-team`, `#real-work`, `#playbooks`, `#control-room`. Each block = H2 (serif, 2-line `whitespace-pre-line`) + description + product screenshot over `feature-bg-N.jpg` + 3-card grid
4. **How it works** (`#how-it-works`, dark `#05070b` bg)
   - Eyebrow "HOW IT WORKS" + H2 (serif, 2-line) + 4-step grid (01–04) + 2 CTAs: "Build your team" (→ `APP_BASE_URL`) + "See the workflow" (→ GitHub)
   - Neither CTA is tracked (per analytics freeze rule)
5. **Built for** (`#built-for`, white bg)
   - Left: eyebrow "BUILT FOR" + H2 "BUILT FOR / Real work." (literal repetition per reference) + description + "Explore Team9.ai" CTA (→ `APP_BASE_URL`, untracked)
   - Right: 2×2 grid of 4 cards
6. **FAQ** (`#faq`, light `#f8f8f8` bg, centered)
   - Eyebrow "FAQ" + H2 "Questions & answers." + 6 `<details>` items (native, not client-state)
7. **Footer** (dark `#0a0d12` bg)
   - Left: wordmark + tagline + X/GitHub icons + `FooterCTAGroup` ("Build your team", tracked `button_location="footer"`)
   - Right: "Terms of Use" → `app.team9.ai/terms-of-service`, "Privacy Policy" → `app.team9.ai/privacy` (both `target="_blank" rel="noopener"`)
   - Copyright row: `© 2026 Team9.ai. All rights reserved.`

## 5. Components

### 5.1 Rewritten

- `components/HomePage.tsx` — top-to-bottom composition; all strings via `next-intl`
- `components/AppShell.tsx` — add `Instrument_Serif` + `Noto_Serif_SC` fonts (exposed as `--font-serif` CSS var), replace old JSON-LD with 5-schema `@graph`, add `preconnect` for `us.i.posthog.com` + `googletagmanager.com`, add `dns-prefetch` for `app.team9.ai`

### 5.2 Prop-only changes

- `components/home/HeaderCTAGroup.tsx` — prop renamed to `signInLabel`; behavior/analytics unchanged
- `components/home/HeroCTAGroup.tsx` — props now `{ downloadLabel, signUpWithGoogleLabel }`; second button keeps existing Google-icon + `home_signup_button_clicked + button_location:"hero"` behavior
- `components/home/FooterCTAGroup.tsx` — prop renamed to `ctaLabel`; **must keep** the `<a href={APP_BASE_URL}>` wrapper (preserves commit `8e659df` SEO fix); analytics unchanged

### 5.3 New

- `components/home/FeaturesNav.tsx` — `"use client"`; uses `IntersectionObserver` with `rootMargin: "-40% 0px -50% 0px"` to pick the nav item whose section is most visible; `<a href="#id">` items so the nav works without JS and yields shareable anchor URLs; `aria-label="Feature sections"`; hidden below `lg`

### 5.4 Unchanged

- `components/home/HomeViewTracker.tsx` — fires `home_viewed` on mount; exactly one reference in new `HomePage.tsx`
- `components/home/DownloadButton.tsx` — fires `home_download_button_clicked + button_location:"hero"`
- `components/LanguageSwitcher.tsx`, `components/PricingPage.tsx`
- `utils/analytics/*` (every file), `utils/env.ts`, `i18n/routing.ts`, `i18n/request.ts`

### 5.5 Deleted

- All the OpenClaw/Moltbook/Installation/Security/Comparison scaffolding inside `HomePage.tsx` (lines 287–1831 of current file); no separate files to delete

## 6. Analytics (FROZEN — no additions, no removals)

| Event | Trigger | Parameters | Source |
|---|---|---|---|
| `home_viewed` | `HomeViewTracker` mount (once per visit) | `{ page_key: "home" }` | PostHog only |
| `home_signup_button_clicked` | Click on Header "Sign in" | `{ button_location: "header" }` | PostHog + GTM (`conversion_signup_click`) |
| `home_signup_button_clicked` | Click on Hero "Sign up with Google" | `{ button_location: "hero" }` | PostHog + GTM |
| `home_signup_button_clicked` | Click on Footer "Build your team" | `{ button_location: "footer" }` | PostHog + GTM |
| `home_download_button_clicked` | Click on Hero "Download Mac" | `{ button_location: "hero" }` | PostHog + GTM (`conversion_download_click`) |
| `captureAcquisitionOnce` (person props) | PostHog client ready | `acquisition_source/medium/campaign/content/term` derived from UTM | PostHog `setPersonProperties` |

New CTAs introduced by the design that are **deliberately not tracked**:
- "Build your team" in How-it-works section
- "See the workflow" in How-it-works section (external GitHub link)
- "Explore Team9.ai" in Built-for section

Rationale: user preference `feedback_analytics_scope.md` — keep the existing event schema stable so downstream PostHog/GTM dashboards don't need migration.

## 7. i18n

### 7.1 Namespaces (final)

Old (17 total — 16 content + metadata): `header, hero, moltbook, whatIsTeam9, whatIsOpenClaw, keyFeatures, whyViral, useCases, architecture, installation, skills, security, faq, comparison, cta, footer, metadata`
New (8 total — 7 content + metadata): `header, hero, features, howItWorks, builtFor, faq, footer, metadata`

All old keys not in new namespaces are deleted from all 12 locale files.

### 7.2 Key structure

Per-namespace key list (exhaustive):

- `header`: `signIn, githubAriaLabel, xAriaLabel`
- `hero`: `headlineLine1, headlineLine2, subheadline, downloadMac, signUpWithGoogle, worksWith, modelClaude, modelGpt, modelGemini, modelKimi, modelGlm, videoAriaLabel`
- `features`: `nav.{agentTeam,realWork,playbooks,controlRoom}`, then 4 blocks each with `headline, description, imageAlt, card1Title, card1Desc, card2Title, card2Desc, card3Title, card3Desc`
- `howItWorks`: `eyebrow, headlineLine1, headlineLine2, step{1..4}{Title,Desc}, ctaBuild, ctaSeeWorkflow`
- `builtFor`: `eyebrow, headlineLine1, headlineLine2, description, cta, card{1..4}{Title,Desc}`
- `faq`: `eyebrow, headline, q{1..6}, a{1..6}`
- `footer`: `tagline, ctaBuildYourTeam, terms, privacy, copyright, xAriaLabel, githubAriaLabel`
- `metadata`: `title, ogTitle, description, ogDescription`

### 7.3 Translation coverage

All 12 locales (`en, zh, zh-Hant, es, pt, fr, de, ja, ko, ru, it, nl`) get every new key. English is source of truth; Chinese follows current `zh.json` tone (concise, no marketing fluff). Other 10 languages translated to match English in meaning and register.

### 7.4 Route structure

Unchanged:
- `/` → `app/(root)/page.tsx` → `<HomePage locale="en" />`
- `/{locale}` → `app/[locale]/page.tsx` → `<HomePage locale={locale} />` (`generateStaticParams` still excludes `en`)

## 8. SEO

### 8.1 Metadata (both layouts)

- `title`: `"Team9.ai — Best AI Agent Team for Real Work"` (+ `[DEV] ` prefix in development, preserved)
- `description`: `"Team9.ai turns AI agents into a dependable execution team for product, engineering, and operations work. Assign outcomes, track progress, reuse playbooks, and keep every agent accountable in one workspace."` (**new** — current codebase has no description)
- `keywords`: `["AI agents", "AI agent team", "AI workspace", "AI workflow", "autonomous agents", "AI operations", "Team9.ai"]` (trimmed from 12)
- `openGraph.images`: `[{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Team9.ai — Best AI Agent Team for Real Work' }]`
- `twitter.images`: same
- `alternates.canonical`, `alternates.languages`, `robots`, `authors/creator/publisher`, `other.google-site-verification`: unchanged

### 8.2 JSON-LD (`AppShell.tsx`)

Replace current `{SoftwareApplication, FAQPage}` scripts with a single `<script type="application/ld+json">` containing `@graph` with 5 entities:

1. `Organization` — `name: "Team9.ai"`, `url`, `logo: LANDING_BASE_URL + "/favicon.svg"` (placeholder until logo asset is provided), `sameAs: [X, GitHub]`
2. `SoftwareApplication` — `name: "Team9.ai"`, `applicationCategory: "ProjectManagement"`, `operatingSystem: "Web, macOS"`, `offers: { price: "0", priceCurrency: "USD" }`, `publisher: { @id: Organization }`, `description` from metadata
3. `FAQPage` — `mainEntity` built from `faq.q1/a1 .. q6/a6` of the current request's locale
4. `VideoObject` — `name`, `description`, `thumbnailUrl: /images/team9-preview-poster.jpg`, `contentUrl: /images/team9-preview.mp4`, `uploadDate: "2026-01-15"`, `duration: "PT<N>S"` where N is ffprobe output on the final compressed mp4
5. `BreadcrumbList` — single item "Home" → `LANDING_BASE_URL`

### 8.3 `app/sitemap.ts` (new)

Dynamic static sitemap listing `{"", "/pricing"} × 12 locales = 24 URLs`. Each entry carries `alternates.languages` with all 12 hreflang URLs. `priority: 1.0` for `/`, `0.8` for `/pricing`. `changeFrequency: "monthly"` for home, `"yearly"` for pricing.

### 8.4 `<head>` additions

```html
<link rel="preconnect" href="https://us.i.posthog.com" />
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://app.team9.ai" />
```

### 8.5 H tag hierarchy

- Exactly one H1 on the page: Hero headline
- H2: Features block headlines (×4), How it works headline, Built for headline, FAQ headline = **7**
- H3: Features card titles (×12), How it works step titles (×4), Built for card titles (×4) = **20**
- FAQ questions stay inside `<summary><span>…</span></summary>` (not H3) to avoid flat H3 sprawl

### 8.6 Image alt text

Every `next/image` with content has locale-specific alt. Purely decorative images (Hero bg, feature-bg tiles) use `alt=""`. Brand logos use `alt="<vendor name>"`.

## 9. Performance

### 9.1 LCP strategy

LCP element is the Hero background image (`/images/hero-bg.jpg`). It gets `priority`, `fetchPriority="high"`, `sizes="100vw"` via `next/image`. Target LCP < 2.5s on a mid-tier mobile.

Video does **not** compete for LCP: `preload="metadata"` means only a few KB of metadata is fetched before interaction. Video starts painting after `loadeddata` via native `autoplay`. The `poster` image is shown in the meantime and is itself small (< 100 KB).

### 9.2 Asset budget (after `sharp` compression)

| Asset | Format | Target size |
|---|---|---|
| `hero-bg.jpg` | JPEG Q85 | ≤ 250 KB |
| `feature-bg{,-2,-3,-4}.jpg` | JPEG Q82 | ≤ 120 KB each |
| `ai-staff.png`, `home-ai-staff.png`, `home-not-join.png`, `settings.png` | PNG quantized Q85 | ≤ 200 KB each |
| `og-image.jpg` (new, 1200×630) | JPEG Q88 | ≤ 200 KB |
| `team9-preview-poster.jpg` | JPEG Q85 | ≤ 100 KB |
| `team9-preview.mp4` | H.264 | Copy reference file as-is; do not re-encode |
| `brand/{anthropic,kimi}.png` + `.ico`, `gemini.svg`, `zai.svg` | mixed | tiny, unchanged |

### 9.3 Fonts

- `Instrument_Serif` from `next/font/google`, subset `latin`, weight `400`, `display: "swap"`
- `Noto_Serif_SC` from `next/font/google`, subset `chinese-simplified`, weight `400`, `display: "swap"`
- Both exposed via `variable: "--font-serif"`; Tailwind classes use `font-[family-name:var(--font-serif)]`
- Existing `Geist` / `Geist_Mono` stay

### 9.4 Client bundle

Only `FeaturesNav` and existing PostHog/Language/CTA/Tracker clients are shipped to the browser. All section content is Server Component HTML.

## 10. Styling

- Tailwind v4 (already installed). No new `@theme` vars except `--font-serif` registration in `globals.css`
- Delete legacy CSS keyframes from `globals.css`: `grid-background`, `perspective-container`, `scroll-rotate`, any `animate-fade-in-up*` / `animation-delay-*` still present
- Color tokens used inline (matching reference): `bg-white`, `bg-[#05070b]`, `bg-[#0a0d12]`, `bg-[#f8f8f8]`, `text-white/{84,50,40,36,28,18,14,10}`, `text-[#0a0d12]/{60,56,40,36,12,8}`, `rounded-[11px]` / `rounded-[12px]`

## 11. External links

| Link | Target | Rel |
|---|---|---|
| Header GitHub icon | `https://github.com/team9ai/team9` | `noreferrer` |
| Header X icon | `https://x.com/team9_ai` | `noreferrer` |
| How-it-works "See the workflow" | `https://github.com/team9ai/team9` | `noreferrer` |
| Built-for "Explore Team9.ai" | `https://app.team9.ai` (= `APP_BASE_URL`) | `noreferrer` |
| Footer X icon | `https://x.com/team9_ai` | `noreferrer` |
| Footer GitHub icon | `https://github.com/team9ai/team9` | `noreferrer` |
| Footer "Terms of Use" | `https://app.team9.ai/terms-of-service` | `noopener` |
| Footer "Privacy Policy" | `https://app.team9.ai/privacy` | `noopener` |
| Footer "Build your team" | `APP_BASE_URL` (via `FooterCTAGroup`) | (same-org) |

`NEXT_PUBLIC_GITHUB_URL` is **not** added; the URL is inlined where used (user preference — not secret, no value from indirection).

## 12. Asset pipeline

One-time script (not committed to the repo, run by Claude locally) to copy + compress from `/Users/jiangtao/Desktop/页面设计/team9-new-homepage/`:

1. `assets/002.jpg` → `public/images/hero-bg.jpg` (sharp JPEG Q85)
2. `assets/feature-bg{,-2,-3,-4}.jpg` → `public/images/` (sharp JPEG Q82)
3. `assets/{ai-staff,home-ai-staff,home-not-join,settings}.png` → `public/images/` (sharp PNG quantize Q85)
4. `assets/brand/{anthropic.png,gemini.svg,kimi.ico,zai.svg}` → `public/brand/` (copy as-is)
5. `assets/team9-preview.mp4` → `public/images/team9-preview.mp4` (copy as-is)
6. Extract frame 0 from mp4 via `ffmpeg -ss 0 -vframes 1` → `public/images/team9-preview-poster.jpg` (sharp JPEG Q85)
7. `images/landing-hero.png` → `public/images/og-image.jpg` at 1200×630 (sharp resize + JPEG Q88)
8. Read `ffprobe -v error -show_entries format=duration` on the final mp4 to fill `VideoObject.duration`

## 13. Verification

Before claiming "done":

- `pnpm build` passes with zero type errors
- `pnpm lint` passes
- Dev server loads `/`, `/zh`, `/ja` without console errors
- In each locale, visually verify all 5 sections render
- Open DevTools Network tab on `/`: Hero image is fetched with `fetchpriority: high`; video is not fetched before interaction (only metadata)
- Click each of 5 tracked CTAs with PostHog debug enabled — confirm events fire with correct `button_location`
- View-source `/`: confirm the `@graph` JSON-LD is present, `<meta name="description">` is set, OG tags include `og:image`
- `/sitemap.xml` returns 24 URLs with `xhtml:link` alternates
- `/robots.txt` still references `sitemap.xml`
- Lighthouse run on `/`: SEO ≥ 95, Performance ≥ 85 on mobile simulation

## 14. Out of scope / deferred

- Any new `/terms`, `/privacy` pages on the landing domain
- A dedicated Team9 logo asset (currently JSON-LD `logo` field uses `favicon.svg` as placeholder)
- A professionally designed OG image (we derive from `landing-hero.png`)
- Translating "BUILT FOR / Real work." ambiguity — reference uses this literal repetition, we ship as-is
- Any changes to `PricingPage` even though its header/footer will diverge slightly from the new homepage

## 15. Risks

- **Translation quality for 10 non-zh/en locales**: machine-assisted by Claude; user has not reserved a review pass. Mitigation: include per-locale smoke render in the verification checklist so obviously broken strings are caught at review time.
- **Details element `name` attribute support**: Chrome 120+ / Firefox 126+ for mutually-exclusive details. Older browsers fall back to independently-expandable — functional, just not the exact animation-at-most-one UX. Accepted.
- **`VideoObject.uploadDate` is fake (2026-01-15)**: Google may flag if it detects the video file was uploaded on a different date. Low risk, trivial to correct later.
- **IntersectionObserver with `rootMargin: "-40% 0px -50% 0px"`** may not highlight exactly the "most visible" section at scroll extremes; edge cases (first load, bottom of page) may show last-hovered active state. Acceptable — it's a nav helper, not a critical UX.
