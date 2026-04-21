# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `components/HomePage.tsx` (and related files) to match the live `team9.ai` 5-section design (Hero / Features / How it works / Built for / FAQ) while preserving every existing analytics event and upgrading SEO signals.

**Architecture:** Single async Server Component composing 7 sections (Header + 5 content sections + Footer). One new client component (`FeaturesNav`) uses `IntersectionObserver` for sticky-nav highlighting. Analytics surface is frozen: same 5 events, same `button_location` values (`header | hero | footer`), same GTM bridge. i18n across 12 locales via `next-intl`. SEO upgraded with a 5-entity JSON-LD `@graph`, dynamic sitemap.ts, description metadata, and `preconnect` hints.

**Tech Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · `next-intl` v4 · PostHog · GTM · `next/image` · `next/font/google`

**Spec:** [`docs/superpowers/specs/2026-04-21-homepage-redesign-design.md`](../specs/2026-04-21-homepage-redesign-design.md)

**Design reference:** `/Users/jiangtao/Desktop/页面设计/team9-new-homepage/index.html`

---

## File Structure

| Action | Path | Responsibility |
|---|---|---|
| Create | `public/images/hero-bg.jpg` | Dark full-bleed Hero background (from reference `002.jpg`, compressed) |
| Create | `public/images/feature-bg.jpg`, `feature-bg-2.jpg`, `feature-bg-3.jpg`, `feature-bg-4.jpg` | Under-image textures for 4 feature blocks (compressed) |
| Create | `public/images/ai-staff.png`, `home-ai-staff.png`, `home-not-join.png`, `settings.png` | Feature product screenshots (quantized PNG) |
| Create | `public/images/team9-preview.mp4` | Hero preview video (copied as-is) |
| Create | `public/images/team9-preview-poster.jpg` | Video poster (frame 0 extracted via ffmpeg) |
| Create | `public/images/og-image.jpg` | 1200×630 OG/Twitter card image (from `landing-hero.png`) |
| Create | `public/brand/anthropic.png`, `gemini.svg`, `kimi.ico`, `zai.svg` | Model-chip brand logos |
| Create | `scripts/prepare-homepage-assets.mjs` | One-off Node script: copy + compress reference assets, extract video frame |
| Create | `components/home/FeaturesNav.tsx` | Sticky left-nav client component with IntersectionObserver |
| Create | `app/sitemap.ts` | Dynamic sitemap covering 2 paths × 12 locales with hreflang alternates |
| Modify | `components/HomePage.tsx` | Full rewrite: 7 sections, all strings via next-intl, one H1 |
| Modify | `components/home/HeaderCTAGroup.tsx` | Single "Sign in" button linking to `${APP_BASE_URL}/login`; keeps tracked `home_signup_button_clicked + button_location:"header"` |
| Modify | `components/home/HeroCTAGroup.tsx` | "Download Mac" + "Sign up with Google" pair; renames `startForFreeLabel` → `signUpWithGoogleLabel`; styling aligned to design |
| Modify | `components/home/FooterCTAGroup.tsx` | "Build your team" label; keeps `<a>` wrapper (SEO fix from commit 8e659df); styling aligned to design |
| Modify | `components/AppShell.tsx` | Add Instrument Serif + Noto Serif SC fonts (`--font-serif`); replace JSON-LD with 5-entity `@graph`; add preconnect/dns-prefetch; remove obsolete `next/head` import |
| Modify | `app/(root)/layout.tsx` | Simplify keywords; add description + openGraph.description + openGraph.images + twitter.images |
| Modify | `app/[locale]/layout.tsx` | Same metadata updates, per-locale |
| Modify | `app/globals.css` | Delete legacy animations / `#sc` / `#bg` / `.grid-background` / `.perspective-container` / `.scroll-rotate*` / all `fade-in-up` / button `::before` ripple; keep Tailwind import + essential resets |
| Modify | `messages/en.json` | New namespaces (header, hero, features, howItWorks, builtFor, faq, footer, metadata) |
| Modify | `messages/{zh,zh-Hant,es,pt,fr,de,ja,ko,ru,it,nl}.json` | Parallel translations |

**Not touched:** `components/home/HomeViewTracker.tsx`, `components/DownloadButton.tsx`, `components/LanguageSwitcher.tsx`, `components/PricingPage.tsx`, `utils/analytics/**`, `utils/env.ts`, `i18n/**`, `app/robots.ts`, `app/layout.tsx`, `app/global-error.tsx`, `next.config.ts`, `sentry.*.config.ts`.

**Branch:** All work on `jt` branch. No worktree isolation requested.

**Verification runs:** `pnpm build`, `pnpm lint`. No test framework is configured; manual smoke-testing is the acceptance gate.

---

### Task 1: Prepare image + video assets

Copy + compress reference media to `public/`. Uses existing `sharp` (bundled with `next/image` peer dep) and `ffmpeg` (user has Homebrew).

**Files:**
- Create: `scripts/prepare-homepage-assets.mjs`
- Create: `public/images/hero-bg.jpg`
- Create: `public/images/feature-bg.jpg`, `feature-bg-2.jpg`, `feature-bg-3.jpg`, `feature-bg-4.jpg`
- Create: `public/images/ai-staff.png`, `home-ai-staff.png`, `home-not-join.png`, `settings.png`
- Create: `public/images/team9-preview.mp4`
- Create: `public/images/team9-preview-poster.jpg`
- Create: `public/images/og-image.jpg`
- Create: `public/brand/anthropic.png`, `public/brand/gemini.svg`, `public/brand/kimi.ico`, `public/brand/zai.svg`

- [ ] **Step 1: Confirm `ffmpeg` is installed**

Run: `ffmpeg -version | head -1`
Expected: something like `ffmpeg version 6.x ...`
If missing, run: `brew install ffmpeg` and re-check.

- [ ] **Step 2: Verify `sharp` is available via project node_modules**

Run: `node -e "require('sharp'); console.log('sharp ok')"` from repo root
Expected: `sharp ok`
If it errors, run: `pnpm add -D sharp` (transient, do NOT commit — we'll revert the package.json change after Task 1).

- [ ] **Step 3: Create the asset prep script**

Write `scripts/prepare-homepage-assets.mjs`:

```js
#!/usr/bin/env node
// One-off: copy + compress reference assets into public/.
// Safe to re-run; outputs are deterministic (within JPEG/PNG encoder stability).
import { copyFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import sharp from "sharp";

const REF = "/Users/jiangtao/Desktop/页面设计/team9-new-homepage";
const REPO = path.resolve(new URL(".", import.meta.url).pathname, "..");
const IMG_OUT = path.join(REPO, "public", "images");
const BRAND_OUT = path.join(REPO, "public", "brand");

await mkdir(IMG_OUT, { recursive: true });
await mkdir(BRAND_OUT, { recursive: true });

// 1. Hero background (JPEG quality 85, LCP image)
await sharp(path.join(REF, "assets", "002.jpg"))
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(path.join(IMG_OUT, "hero-bg.jpg"));

// 2. Four feature backgrounds (JPEG quality 82)
for (const [src, dst] of [
  ["feature-bg.jpg", "feature-bg.jpg"],
  ["feature-bg-2.jpg", "feature-bg-2.jpg"],
  ["feature-bg-3.jpg", "feature-bg-3.jpg"],
  ["feature-bg-4.jpg", "feature-bg-4.jpg"],
]) {
  await sharp(path.join(REF, "assets", src))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(IMG_OUT, dst));
}

// 3. Four product PNG screenshots (PNG quality 85, compression 9)
for (const name of [
  "ai-staff.png",
  "home-ai-staff.png",
  "home-not-join.png",
  "settings.png",
]) {
  await sharp(path.join(REF, "assets", name))
    .png({ quality: 85, compressionLevel: 9 })
    .toFile(path.join(IMG_OUT, name));
}

// 4. Preview video (copy as-is, no re-encode)
await copyFile(
  path.join(REF, "assets", "team9-preview.mp4"),
  path.join(IMG_OUT, "team9-preview.mp4"),
);

// 5. Video poster (extract frame 0 via ffmpeg, then JPEG q85)
const posterTmp = path.join(IMG_OUT, "_poster_tmp.png");
execFileSync("ffmpeg", [
  "-y",
  "-ss", "0",
  "-i", path.join(REF, "assets", "team9-preview.mp4"),
  "-vframes", "1",
  "-q:v", "2",
  posterTmp,
]);
await sharp(posterTmp)
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(path.join(IMG_OUT, "team9-preview-poster.jpg"));
await rm(posterTmp);

// 6. OG image (1200x630 from landing-hero.png, JPEG q88)
await sharp(path.join(REF, "images", "landing-hero.png"))
  .resize(1200, 630, { fit: "cover", position: "center" })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(path.join(IMG_OUT, "og-image.jpg"));

// 7. Brand logos (copy as-is; these are already small)
for (const name of ["anthropic.png", "gemini.svg", "kimi.ico", "zai.svg"]) {
  const srcPath = path.join(REF, "assets", "brand", name);
  if (existsSync(srcPath)) {
    await copyFile(srcPath, path.join(BRAND_OUT, name));
  } else {
    console.warn(`[warn] brand asset missing at reference: ${srcPath}`);
  }
}

// 8. Probe the mp4 duration for JSON-LD (prints to stdout for operator to read)
const probe = execFileSync("ffprobe", [
  "-v", "error",
  "-show_entries", "format=duration",
  "-of", "default=noprint_wrappers=1:nokey=1",
  path.join(IMG_OUT, "team9-preview.mp4"),
]).toString().trim();
console.log(`video_duration_seconds=${probe}`);

console.log("Done.");
```

- [ ] **Step 4: Run the script**

Run: `node scripts/prepare-homepage-assets.mjs`
Expected: Finishes with no errors and prints e.g. `video_duration_seconds=28.3` (record this — it's used in Task 10).

- [ ] **Step 5: Check output sizes match the budget**

Run: `ls -lh public/images/*.{jpg,png,mp4} public/brand/*`
Expected rough sizes (OK to deviate ±30%):
- `hero-bg.jpg` ≤ 300 KB
- `feature-bg*.jpg` ≤ 150 KB each
- Four product PNGs ≤ 250 KB each
- `og-image.jpg` ≤ 220 KB
- `team9-preview-poster.jpg` ≤ 120 KB
- `team9-preview.mp4` as-is

If any file is dramatically larger (e.g., PNG > 1 MB), open the script and lower the quality for that file, re-run.

- [ ] **Step 6: Record video duration for later**

Append the `video_duration_seconds=…` line printed in Step 4 to the spec file as a comment, or write it to a scratch note. Needed for `VideoObject.duration` ISO 8601 format: `PT<seconds>S`. Round down to an integer (e.g., `28.3` → `PT28S`).

- [ ] **Step 7: If `sharp` was added to devDependencies in Step 2, revert that**

Run: `git diff package.json`
If it now includes `sharp` as a new devDependency that wasn't there before, run: `git restore package.json pnpm-lock.yaml` and instead use a one-shot invocation: `pnpm dlx sharp@0.33 ...` — or just accept the devDependency addition since `sharp` is already a transitive dep.

(In practice: `sharp` ships with Next.js 13+; the script should resolve it without a separate install. If it couldn't, keep the devDep — it's standard.)

- [ ] **Step 8: Commit**

```bash
git add scripts/prepare-homepage-assets.mjs public/images public/brand
git add package.json pnpm-lock.yaml  # only if sharp was added
git commit -m "chore(assets): add homepage images, video, og image, brand logos

Generated via scripts/prepare-homepage-assets.mjs from the team9-new-homepage
reference snapshot. Compressed with sharp; video frame 0 extracted via ffmpeg
for the autoplay poster."
```

---

### Task 2: Add serif fonts to AppShell

Introduce `Instrument Serif` (Latin) + `Noto Serif SC` (Simplified Chinese) via `next/font/google`, exposed as `--font-serif` for Tailwind consumption. No JSON-LD changes yet (that's Task 10) — this task is scoped to font plumbing only, so intermediate commits keep building.

**Files:**
- Modify: `components/AppShell.tsx:1-17, 87-89`

- [ ] **Step 1: Add font imports and constants**

Open `components/AppShell.tsx`. Replace lines 1–17 with:

```tsx
import { Geist, Geist_Mono, Instrument_Serif, Noto_Serif_SC } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, getMessages } from "next-intl/server";
import { LANDING_BASE_URL, GA_ID, GTM_ID } from "@/utils/env";
import { PostHogProvider } from "@/utils/analytics/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifSc = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  weight: ["400", "500"],
  subsets: ["latin"], // Noto Serif SC declares chinese via fallback; `latin` is the only currently supported next/font subset for this family
  display: "swap",
});
```

Note: `Head` is dropped from the `next/head` import — that entire import line disappears. (`next/head` does not work inside App Router; the JSON-LD block inside it is currently dead code and will be rewritten in Task 10.)

- [ ] **Step 2: Wire the font variables onto `<body>`**

Still in `AppShell.tsx`, find the `<body>` tag (line 87–89 before edit). Replace it with:

```tsx
<body
  className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${notoSerifSc.variable} antialiased`}
>
```

- [ ] **Step 3: Remove the dead `<Head>…</Head>` block**

Find lines 77–86 (the `<Head>` with two `<script>` children inside). Delete the entire `<Head>…</Head>` block. (Task 10 re-introduces JSON-LD correctly.)

After this edit the returned JSX is:

```tsx
return (
  <html lang={locale} className="dark" style={{ colorScheme: "dark" }}>
    <body className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${notoSerifSc.variable} antialiased`}>
      <PostHogProvider>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </PostHogProvider>
    </body>
    {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
  </html>
);
```

- [ ] **Step 4: Also remove now-unused `t`, `jsonLd`, `faqJsonLd` constants**

Delete lines 27–73 (the `const t = …`, `const jsonLd = { … }`, `const faqJsonLd = { … }` block). The `getTranslations` import from `next-intl/server` is still used via… actually it isn't anymore. Remove `getTranslations` from the import on line 4 so it reads:

```tsx
import { getMessages } from "next-intl/server";
```

- [ ] **Step 5: Build-check**

Run: `pnpm build`
Expected: Build succeeds. Font download happens during build (2–5 seconds). Warnings about unused imports should be absent.

- [ ] **Step 6: Commit**

```bash
git add components/AppShell.tsx
git commit -m "feat(shell): add Instrument Serif + Noto Serif SC fonts; drop unused next/head JSON-LD

The <Head> block from next/head doesn't work in App Router — the JSON-LD it
contained has been dead code since migration. Drop it now; a replacement
will land as a 5-entity @graph in a follow-up commit.

Introduces --font-instrument-serif and --font-noto-serif-sc CSS variables
for use in headline typography."
```

---

### Task 3: Clean legacy CSS from globals.css

Strip animations and styles that the old HomePage used but the new one doesn't. Keep Tailwind, `@theme`, font-family chain, and `prefers-reduced-motion`. Add `--font-serif` into `@theme` so `font-serif` Tailwind utility works (optional ergonomics).

**Files:**
- Modify: `app/globals.css` (full rewrite — shrink 323 lines → ~45 lines)

- [ ] **Step 1: Replace `app/globals.css` wholesale**

Overwrite the entire file with:

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-serif: var(--font-instrument-serif), var(--font-noto-serif-sc), ui-serif, Georgia, serif;
}

html,
body {
  height: 100%;
}

body {
  background: #ffffff;
  color: #0a0d12;
  font-family:
    var(--font-geist-sans),
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

*:focus-visible {
  outline: 2px solid #0a0d12;
  outline-offset: 2px;
  border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Note: body background becomes white (`#ffffff`) because the new design's default is white-on-dark sections vs. white-section sections — most content sections are white. Dark sections set their own `bg-[#05070b]` / `bg-[#0a0d12]`. The old default `#0a0a0a` only made sense for the old fully-dark page.

- [ ] **Step 2: Build-check**

Run: `pnpm build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: strip legacy animations from globals.css

The old homepage used grid-background, perspective-container, scroll-rotate,
fade-in-up, draw-line, pulse-slow, bounce-slow, button::before ripple, and
custom scroll containers — none of which survive into the new design.

Keep only Tailwind import, @theme tokens, body font-family, focus-visible
outline, and prefers-reduced-motion guard. Register --font-serif so the
font-serif Tailwind utility resolves to Instrument Serif + Noto Serif SC."
```

---

### Task 4: Create FeaturesNav client component

Sticky 180px left-column navigation that highlights the currently-scrolled feature block. `<a href="#id">` items fall back to plain anchor navigation if JS is off. Hidden on mobile/tablet.

**Files:**
- Create: `components/home/FeaturesNav.tsx`

- [ ] **Step 1: Write the component**

Create `components/home/FeaturesNav.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

interface Props {
  items: NavItem[];
}

export default function FeaturesNav({ items }: Props) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the intersecting entry closest to the top of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when the block's center crosses the upper portion of the viewport.
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      },
    );

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Feature sections"
      className="hidden lg:block lg:w-[180px] lg:shrink-0"
    >
      <div className="sticky top-28 flex flex-col gap-0 py-28">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`group flex items-center gap-3 rounded-lg px-4 py-3 text-left text-[11px] font-semibold tracking-[0.12em] transition-colors ${
                active
                  ? "text-[#0a0d12]"
                  : "text-[#0a0d12]/36 hover:text-[#0a0d12]/60"
              }`}
            >
              <span
                aria-hidden="true"
                className={`size-2 shrink-0 rounded-full transition-colors ${
                  active ? "bg-[#0a0d12]" : "bg-transparent"
                }`}
              />
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm build`
Expected: Build succeeds. No `FeaturesNav` consumer exists yet — that comes in Task 9.

- [ ] **Step 3: Commit**

```bash
git add components/home/FeaturesNav.tsx
git commit -m "feat(home): add FeaturesNav sticky-scroll highlight component

Observes four feature block elements (#agent-team, #real-work, #playbooks,
#control-room) via IntersectionObserver and highlights the one currently
centered in the viewport. Falls back to pure anchor links without JS.
Hidden below the lg breakpoint."
```

---

### Task 5: Write `messages/en.json` (new source-of-truth)

Replace the old 16-namespace English file with the 8-namespace design (7 content + metadata).

**Files:**
- Modify: `messages/en.json` (full rewrite)

- [ ] **Step 1: Overwrite `messages/en.json`**

Write exactly:

```json
{
  "metadata": {
    "title": "Team9.ai — Best AI Agent Team for Real Work",
    "ogTitle": "Team9.ai — Best AI Agent Team for Real Work",
    "description": "Team9.ai turns AI agents into a dependable execution team for product, engineering, and operations work. Assign outcomes, track progress, reuse playbooks, and keep every agent accountable in one workspace.",
    "ogDescription": "Team9.ai turns AI agents into a dependable execution team for product, engineering, and operations work."
  },
  "header": {
    "signIn": "Sign in",
    "githubAriaLabel": "Team9.ai on GitHub",
    "xAriaLabel": "Team9.ai on X"
  },
  "hero": {
    "headlineLine1": "Best AI Agent Team",
    "headlineLine2": "for Real Work.",
    "subheadline": "Team9.ai turns AI agents into a dependable execution team for product, engineering, and operations work. Assign outcomes, track progress, reuse playbooks, and keep every agent accountable in one workspace.",
    "downloadMac": "Download Mac",
    "signUpWithGoogle": "Sign up with Google",
    "worksWith": "Works with",
    "modelClaude": "Claude Opus 4.7",
    "modelGpt": "GPT-5.4",
    "modelGemini": "Gemini 3.1 Pro",
    "modelKimi": "Kimi K2.5",
    "modelGlm": "GLM 5.1",
    "brandClaudeAlt": "Anthropic",
    "brandGptAlt": "OpenAI",
    "brandGeminiAlt": "Google Gemini",
    "brandKimiAlt": "Moonshot AI",
    "brandGlmAlt": "Zhipu AI",
    "videoAriaLabel": "Team9.ai board view showing humans and agents coordinating work"
  },
  "features": {
    "navAgentTeam": "AGENT TEAM",
    "navRealWork": "REAL WORK",
    "navPlaybooks": "PLAYBOOKS",
    "navControlRoom": "CONTROL ROOM",
    "agentTeamHeadline": "Assign real work to agents,\nnot just prompts",
    "agentTeamDescription": "Team9.ai gives each agent a role, context, owner, and operating lane. They pick up work, report progress, ask for help, and leave a trail your team can trust.",
    "agentTeamImageAlt": "AI staff roster showing role-based agents for engineering, growth, support, research, QA, and ops",
    "agentTeamCard1Title": "Role-based agents",
    "agentTeamCard1Desc": "Create agents for engineering, growth, support, research, QA, and ops. Each one knows what it owns and how to work with your team.",
    "agentTeamCard2Title": "Human-grade accountability",
    "agentTeamCard2Desc": "Every update, blocker, decision, and handoff stays visible in one shared timeline.",
    "agentTeamCard3Title": "Shared execution board",
    "agentTeamCard3Desc": "Humans and agents work from one queue, so priorities stay clear and nothing disappears into a chat thread.",
    "realWorkHeadline": "Run long tasks\nwithout babysitting",
    "realWorkDescription": "Team9.ai manages the full execution loop: plan, start, inspect, escalate, finish, and summarize. Agents keep moving while people stay in control.",
    "realWorkImageAlt": "Task list view with agents working on scoped items, showing status and owners",
    "realWorkCard1Title": "Outcome-driven workflows",
    "realWorkCard1Desc": "Break big requests into scoped tasks with owners, status, dependencies, and a definition of done.",
    "realWorkCard2Title": "Blocker escalation",
    "realWorkCard2Desc": "When an agent hits missing context, a broken environment, or a risky decision, it raises the issue instead of guessing.",
    "realWorkCard3Title": "Live progress stream",
    "realWorkCard3Desc": "Watch work unfold in real time, review the trail later, and step in only when a human decision is needed.",
    "playbooksHeadline": "Turn repeatable work\ninto team playbooks",
    "playbooksDescription": "Team9.ai captures the way your team ships: launch checklists, bug triage, PR review, customer research, reporting, and handoffs. Reuse the best workflow every time.",
    "playbooksImageAlt": "Playbook library showing reusable workflows for launches, triage, and reporting",
    "playbooksCard1Title": "Reusable operating patterns",
    "playbooksCard1Desc": "Codify the instructions, examples, files, tools, and decision rules that make an agent effective.",
    "playbooksCard2Title": "Team-wide reuse",
    "playbooksCard2Desc": "A playbook written once becomes available to every agent and every teammate.",
    "playbooksCard3Title": "Compounding execution",
    "playbooksCard3Desc": "The more your team works, the stronger the operating system becomes.",
    "controlRoomHeadline": "One control room\nfor your AI workforce",
    "controlRoomDescription": "See who is working, what is queued, where compute is running, and which outcomes are at risk. Team9.ai keeps the whole agent team observable.",
    "controlRoomImageAlt": "Agent settings dashboard with usage, permissions, and health indicators",
    "controlRoomCard1Title": "Unified agent dashboard",
    "controlRoomCard1Desc": "Track local and cloud agents, work queues, owners, and status from one command center.",
    "controlRoomCard2Title": "Operational visibility",
    "controlRoomCard2Desc": "Usage, latency, errors, cost, and activity stay visible so your team can trust the system.",
    "controlRoomCard3Title": "Works with your tools",
    "controlRoomCard3Desc": "Coordinate coding agents, research agents, workflow automation, and internal systems without forcing a new operating model."
  },
  "howItWorks": {
    "eyebrow": "HOW IT WORKS",
    "headlineLine1": "Build your AI team",
    "headlineLine2": "around real work.",
    "step1Title": "Create your workspace",
    "step1Desc": "Start with the outcomes your team already owns: product work, engineering tasks, customer operations, research, and internal workflows.",
    "step2Title": "Design specialist agents",
    "step2Desc": "Give each agent a role, context, tools, permissions, and a clear definition of done.",
    "step3Title": "Assign work from one queue",
    "step3Desc": "Route tasks to the right agent or teammate, keep status visible, and review progress in one place.",
    "step4Title": "Improve the system every week",
    "step4Desc": "Turn successful runs into playbooks so the next task starts with better instructions, sharper context, and fewer handoffs.",
    "ctaBuild": "Build your team",
    "ctaSeeWorkflow": "See the workflow"
  },
  "builtFor": {
    "eyebrow": "BUILT FOR",
    "headlineLine1": "BUILT FOR",
    "headlineLine2": "Real work.",
    "description": "Team9.ai is the workspace for companies that want AI agents to do accountable work, not just generate answers. It keeps people, agents, context, and outcomes in sync.",
    "cta": "Explore Team9.ai",
    "card1Title": "Made for production work",
    "card1Desc": "Use agents for shipping, analysis, support, QA, growth, documentation, and back-office workflows.",
    "card2Title": "Humans stay in control",
    "card2Desc": "Set guardrails, approve risky steps, inspect decisions, and keep final ownership with the team.",
    "card3Title": "Context that carries forward",
    "card3Desc": "Every task, note, file, decision, and lesson becomes reusable team memory.",
    "card4Title": "Flexible agent stack",
    "card4Desc": "Bring the models, tools, and runtimes that fit your company. Team9.ai coordinates the work layer."
  },
  "faq": {
    "eyebrow": "FAQ",
    "headline": "Questions & answers.",
    "q1": "What does Team9.ai actually do?",
    "a1": "Team9.ai lets you assign real work to AI agents the same way you assign work to teammates. Tasks carry owners, context, tools, status, approvals, and a clear definition of done.",
    "q2": "Which models can I run inside Team9.ai?",
    "a2": "Team9.ai works with leading models including Claude Opus 4.7, GPT-5.4, Gemini 3.1 Pro, Kimi K2.5, and GLM 5.1. You can mix models by role instead of forcing one model to do every job.",
    "q3": "How is this different from ChatGPT or Claude?",
    "a3": "Chat is for one-off conversations. Team9.ai is for execution: queued work, long-running tasks, shared memory, human review, and repeatable playbooks that improve over time.",
    "q4": "Can humans approve or step in before something ships?",
    "a4": "Yes. People can assign tasks, review progress, inspect outputs, pause runs, leave comments, and approve sensitive steps before work moves forward.",
    "q5": "What kind of work fits best?",
    "a5": "Engineering, research, operations, support, QA, documentation, reporting, and other repeatable workflows where ownership, visibility, and follow-through matter.",
    "q6": "Do I need to replace my current tools?",
    "a6": "No. Team9.ai is the coordination layer. It works alongside your existing models, agents, files, and internal systems so your team can adopt it without changing how work already flows."
  },
  "footer": {
    "tagline": "Best AI Agent Team for Real Work. Build, run, and improve an accountable team of AI agents in one workspace.",
    "ctaBuildYourTeam": "Build your team",
    "terms": "Terms of Use",
    "privacy": "Privacy Policy",
    "copyright": "© 2026 Team9.ai. All rights reserved.",
    "xAriaLabel": "Team9.ai on X",
    "githubAriaLabel": "Team9.ai on GitHub"
  }
}
```

- [ ] **Step 2: JSON syntax check**

Run: `node -e "JSON.parse(require('fs').readFileSync('messages/en.json','utf8'))" && echo ok`
Expected: `ok`

- [ ] **Step 3: Commit**

```bash
git add messages/en.json
git commit -m "i18n(en): replace messages with new homepage namespaces

Drops the 16-namespace OpenClaw/Moltbook copy in favor of the 7 content
namespaces used by the redesigned homepage (header, hero, features,
howItWorks, builtFor, faq, footer) plus metadata."
```

---

### Task 6: Translate Chinese locales (`zh`, `zh-Hant`)

Produce the same key structure in Simplified and Traditional Chinese. Style = current `zh.json` tone: concise, no marketing fluff, professional.

**Files:**
- Modify: `messages/zh.json` (full rewrite)
- Modify: `messages/zh-Hant.json` (full rewrite)

- [ ] **Step 1: Write `messages/zh.json`**

Translate each key from the English source. Key structure MUST be byte-identical to `en.json` — only the values change. Maintain `\n` where the English has it (headline line breaks). For product/model names that are proper nouns (Team9.ai, Claude Opus 4.7, GPT-5.4, Gemini 3.1 Pro, Kimi K2.5, GLM 5.1, Anthropic, OpenAI), keep in English — do not translate.

Reference terminology (use these exact Chinese translations for consistency):
- "AI Agent" / "agent" → "AI 智能体" (except in navigation labels where "AGENT TEAM" → "智能体团队")
- "playbook" → "操作手册"
- "workspace" → "工作空间"
- "workflow" → "工作流"
- "queue" → "队列"
- "workload" → "工作"
- "handoff" → "交接"
- "guardrails" → "护栏"

Sample (partial — the agent executing this step is expected to produce the complete file following this style):

```json
{
  "metadata": {
    "title": "Team9.ai — 面向真实工作的最佳 AI 智能体团队",
    "ogTitle": "Team9.ai — 面向真实工作的最佳 AI 智能体团队",
    "description": "Team9.ai 让 AI 智能体成为可信赖的执行团队，负责产品、工程与运营工作。分配成果、追踪进度、复用操作手册，并让每个智能体对结果负责，全部集中在一个工作空间里。",
    "ogDescription": "Team9.ai 让 AI 智能体成为可信赖的执行团队，负责产品、工程与运营工作。"
  },
  "header": { "signIn": "登录", "githubAriaLabel": "Team9.ai 的 GitHub", "xAriaLabel": "Team9.ai 的 X" },
  "hero": {
    "headlineLine1": "面向真实工作的",
    "headlineLine2": "最佳 AI 智能体团队。",
    "subheadline": "Team9.ai 让 AI 智能体成为可信赖的执行团队，负责产品、工程与运营工作。分配成果、追踪进度、复用操作手册，并让每个智能体对结果负责，全部集中在一个工作空间里。",
    "downloadMac": "下载 Mac 版",
    "signUpWithGoogle": "使用 Google 注册",
    "worksWith": "支持模型",
    "modelClaude": "Claude Opus 4.7",
    "modelGpt": "GPT-5.4",
    "modelGemini": "Gemini 3.1 Pro",
    "modelKimi": "Kimi K2.5",
    "modelGlm": "GLM 5.1",
    "brandClaudeAlt": "Anthropic",
    "brandGptAlt": "OpenAI",
    "brandGeminiAlt": "Google Gemini",
    "brandKimiAlt": "Moonshot AI",
    "brandGlmAlt": "Zhipu AI",
    "videoAriaLabel": "Team9.ai 看板视图，展示人类与智能体协作工作"
  }
  // ... translate remaining namespaces: features, howItWorks, builtFor, faq, footer
}
```

Complete the full file. The JSON must parse. Preserve the literal `"BUILT FOR"` repetition in `builtFor.eyebrow` and `builtFor.headlineLine1` — translate both to the same Chinese phrase (e.g. "为真实工作打造" for both) to keep the designer's intentional repetition.

- [ ] **Step 2: Validate `zh.json`**

Run: `node -e "JSON.parse(require('fs').readFileSync('messages/zh.json','utf8'))" && echo ok`
Expected: `ok`

- [ ] **Step 3: Validate key parity with `en.json`**

Run:
```bash
node -e "
const en = require('./messages/en.json');
const zh = require('./messages/zh.json');
function keys(o, p='') { return Object.entries(o).flatMap(([k,v]) => typeof v === 'object' && v !== null ? keys(v, p+k+'.') : [p+k]); }
const ek = new Set(keys(en));
const zk = new Set(keys(zh));
const missing = [...ek].filter(k => !zk.has(k));
const extra = [...zk].filter(k => !ek.has(k));
if (missing.length || extra.length) { console.log({missing, extra}); process.exit(1); }
console.log('keys match:', ek.size);
"
```
Expected: `keys match: <N>` with N ≈ 90.
If missing/extra keys, fix the zh file.

- [ ] **Step 4: Write `messages/zh-Hant.json`**

Same as zh.json but Traditional Chinese characters. Use Taiwan/Hong Kong conventions — e.g. 登入 (not 登录), 軟體 (not 软件), 使用者 (not 用户), 資料 (not 数据), 設定 (not 设置).

- [ ] **Step 5: Validate `zh-Hant.json`**

Same commands as Steps 2 and 3 but targeting `zh-Hant.json`.

- [ ] **Step 6: Commit**

```bash
git add messages/zh.json messages/zh-Hant.json
git commit -m "i18n(zh,zh-Hant): translate homepage to Chinese

Full coverage of the 8 new namespaces. Keeps product/model proper nouns
in English. zh-Hant uses Taiwan/HK conventions."
```

---

### Task 7: Translate European Latin-script locales

`es` (Spanish), `pt` (Portuguese), `fr` (French), `de` (German), `it` (Italian), `nl` (Dutch). Same approach as Task 6 — preserve JSON structure, translate values, keep product/model proper nouns in English.

**Files:**
- Modify: `messages/{es,pt,fr,de,it,nl}.json`

- [ ] **Step 1: Translate each of the 6 locales**

For each locale, translate `messages/en.json` to the target language. Preserve:
- JSON structure (byte-identical key paths)
- `\n` line breaks in `headlineLine*` keys
- Product/model proper nouns in English
- "BUILT FOR" repetition in `builtFor` section (translate to the same phrase in both keys)

Style guidance per locale:
- **es**: Neutral Latin American Spanish (avoid Iberian-only terms like "vosotros")
- **pt**: Brazilian Portuguese conventions
- **fr**: Metropolitan French, formal register (vous, not tu)
- **de**: Modern German, formal register (Sie), use ß where standard
- **it**: Standard Italian
- **nl**: Netherlands Dutch (not Belgian)

- [ ] **Step 2: Validate each file**

For each locale, run:
```bash
for l in es pt fr de it nl; do
  node -e "JSON.parse(require('fs').readFileSync('messages/$l.json','utf8'))" && echo "$l: ok" || echo "$l: FAIL";
done
```
Expected: 6 × `<locale>: ok`.

- [ ] **Step 3: Validate key parity**

```bash
for l in es pt fr de it nl; do
  node -e "
  const en = require('./messages/en.json');
  const tr = require('./messages/$l.json');
  function keys(o, p='') { return Object.entries(o).flatMap(([k,v]) => typeof v === 'object' && v !== null ? keys(v, p+k+'.') : [p+k]); }
  const ek = new Set(keys(en));
  const tk = new Set(keys(tr));
  const missing = [...ek].filter(k => !tk.has(k));
  const extra = [...tk].filter(k => !ek.has(k));
  if (missing.length || extra.length) { console.log('$l:', {missing, extra}); process.exit(1); }
  console.log('$l: match', ek.size);
  "
done
```
Expected: 6 × `<locale>: match <N>`.

- [ ] **Step 4: Commit**

```bash
git add messages/es.json messages/pt.json messages/fr.json messages/de.json messages/it.json messages/nl.json
git commit -m "i18n(es,pt,fr,de,it,nl): translate homepage to European Latin locales"
```

---

### Task 8: Translate non-Latin-script locales

`ja` (Japanese), `ko` (Korean), `ru` (Russian).

**Files:**
- Modify: `messages/{ja,ko,ru}.json`

- [ ] **Step 1: Translate each of the 3 locales**

Same rules as Task 7. Style:
- **ja**: Standard Japanese, polite register (〜です/ます). Product names stay in English (e.g. "Team9.ai"). For technical terms, prefer katakana transliteration when it's the industry norm (e.g. エージェント, タスク).
- **ko**: Formal Korean (〜습니다/〜ㅂ니다). Product names in English.
- **ru**: Formal Russian, no slang.

- [ ] **Step 2: Validate each file**

```bash
for l in ja ko ru; do
  node -e "JSON.parse(require('fs').readFileSync('messages/$l.json','utf8'))" && echo "$l: ok" || echo "$l: FAIL";
done
```
Expected: 3 × `<locale>: ok`.

- [ ] **Step 3: Validate key parity**

```bash
for l in ja ko ru; do
  node -e "
  const en = require('./messages/en.json');
  const tr = require('./messages/$l.json');
  function keys(o, p='') { return Object.entries(o).flatMap(([k,v]) => typeof v === 'object' && v !== null ? keys(v, p+k+'.') : [p+k]); }
  const ek = new Set(keys(en));
  const tk = new Set(keys(tr));
  const missing = [...ek].filter(k => !tk.has(k));
  const extra = [...tk].filter(k => !ek.has(k));
  if (missing.length || extra.length) { console.log('$l:', {missing, extra}); process.exit(1); }
  console.log('$l: match', ek.size);
  "
done
```
Expected: 3 × `<locale>: match <N>`.

- [ ] **Step 4: Commit**

```bash
git add messages/ja.json messages/ko.json messages/ru.json
git commit -m "i18n(ja,ko,ru): translate homepage to non-Latin locales"
```

---

### Task 9: Rewrite `HomePage.tsx` + update 3 CTA components (atomic)

This is the core of the refactor. Files are rewritten in one commit so typecheck stays passing end-to-end.

**Files:**
- Modify: `components/home/HeaderCTAGroup.tsx` (full rewrite — single button, renamed prop)
- Modify: `components/home/HeroCTAGroup.tsx` (full rewrite — rename `startForFreeLabel` → `signUpWithGoogleLabel`; new styling)
- Modify: `components/home/FooterCTAGroup.tsx` (full rewrite — new label + new styling; keep `<a>` wrapper)
- Modify: `components/HomePage.tsx` (full rewrite: ~500 lines)

- [ ] **Step 1: Rewrite `components/home/HeaderCTAGroup.tsx`**

Replace entire file with:

```tsx
"use client";

import { usePostHogClient } from "@/utils/analytics/provider";
import { captureWithBridge } from "@/utils/analytics/capture";
import { EVENTS } from "@/utils/analytics/events";
import { APP_BASE_URL } from "@/utils/env";

interface Props {
  signInLabel: string;
}

export default function HeaderCTAGroup({ signInLabel }: Props) {
  const client = usePostHogClient();

  return (
    <a
      href={`${APP_BASE_URL}/login`}
      onClick={() => {
        captureWithBridge(client, EVENTS.HOME_SIGNUP_BUTTON_CLICKED, {
          button_location: "header",
        });
      }}
      className="inline-flex items-center justify-center gap-2 rounded-[11px] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0a0d12] transition-colors hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      {signInLabel}
    </a>
  );
}
```

Note: the onClick still fires `home_signup_button_clicked`/`button_location:"header"`. Current behavior is preserved (see spec §6 — analytics surface is frozen).

- [ ] **Step 2: Rewrite `components/home/HeroCTAGroup.tsx`**

Replace entire file with:

```tsx
"use client";

import DownloadButton from "@/components/DownloadButton";
import { usePostHogClient } from "@/utils/analytics/provider";
import { captureWithBridge } from "@/utils/analytics/capture";
import { EVENTS } from "@/utils/analytics/events";
import { APP_BASE_URL } from "@/utils/env";

interface Props {
  downloadLabel: string;
  signUpWithGoogleLabel: string;
}

export default function HeroCTAGroup({
  downloadLabel,
  signUpWithGoogleLabel,
}: Props) {
  const client = usePostHogClient();

  return (
    <>
      <DownloadButton
        label={downloadLabel}
        className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-white px-5 py-3 text-[14px] font-semibold text-[#0a0d12] transition-colors hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:opacity-60"
      />
      <a
        href={APP_BASE_URL}
        onClick={() => {
          captureWithBridge(client, EVENTS.HOME_SIGNUP_BUTTON_CLICKED, {
            button_location: "hero",
          });
        }}
        className="inline-flex items-center justify-center gap-2 rounded-[12px] border border-white/18 bg-black/16 px-5 py-3 text-[14px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.54-1.8 4.5-5.5 4.5-3.31 0-6-2.69-6-6s2.69-6 6-6c1.88 0 3.13.8 3.85 1.49l2.62-2.54C16.82 4.01 14.64 3.2 12 3.2 7.03 3.2 3 7.23 3 12.2s4.03 9 9 9c5.19 0 8.62-3.65 8.62-8.8 0-.59-.06-1.04-.14-1.48H12Z" />
          <path fill="#4285F4" d="M3.98 7.54 7.2 9.9A5.41 5.41 0 0 1 12 6.6c1.88 0 3.13.8 3.85 1.49l2.62-2.54C16.82 4.01 14.64 3.2 12 3.2c-3.46 0-6.44 1.99-8.02 4.34Z" />
          <path fill="#FBBC05" d="M3 12.2c0 1.58.38 3.07 1.06 4.38l3.58-2.76a5.4 5.4 0 0 1-.28-1.62c0-.56.1-1.1.28-1.62L4.06 7.82A8.94 8.94 0 0 0 3 12.2Z" />
          <path fill="#34A853" d="M12 21.2c2.44 0 4.48-.8 5.98-2.18l-3.48-2.7c-.94.65-2.14 1.08-3.5 1.08-2.7 0-5-1.82-5.82-4.28L4.06 16.58A9 9 0 0 0 12 21.2Z" />
        </svg>
        {signUpWithGoogleLabel}
      </a>
    </>
  );
}
```

- [ ] **Step 3: Rewrite `components/home/FooterCTAGroup.tsx`**

Replace entire file with:

```tsx
"use client";

import { usePostHogClient } from "@/utils/analytics/provider";
import { captureWithBridge } from "@/utils/analytics/capture";
import { EVENTS } from "@/utils/analytics/events";
import { APP_BASE_URL } from "@/utils/env";

interface Props {
  ctaLabel: string;
}

export default function FooterCTAGroup({ ctaLabel }: Props) {
  const client = usePostHogClient();

  return (
    <a
      href={APP_BASE_URL}
      onClick={() => {
        captureWithBridge(client, EVENTS.HOME_SIGNUP_BUTTON_CLICKED, {
          button_location: "footer",
        });
      }}
      className="inline-flex items-center justify-center rounded-[11px] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0a0d12] transition-colors hover:bg-white/88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      {ctaLabel}
    </a>
  );
}
```

The `<a>` → `<button>` nesting from the old version is collapsed into a single styled `<a>`. The tracked onClick stays on the `<a>`, which is what commit `8e659df` originally wanted (anchor with href for SEO + crawlable link). Analytics behavior unchanged.

- [ ] **Step 4: Rewrite `components/HomePage.tsx`**

Replace entire file with:

```tsx
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import HomeViewTracker from "@/components/home/HomeViewTracker";
import HeaderCTAGroup from "@/components/home/HeaderCTAGroup";
import HeroCTAGroup from "@/components/home/HeroCTAGroup";
import FooterCTAGroup from "@/components/home/FooterCTAGroup";
import FeaturesNav from "@/components/home/FeaturesNav";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { APP_BASE_URL } from "@/utils/env";

const GITHUB_URL = "https://github.com/team9ai/team9";
const X_URL = "https://x.com/team9_ai";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.65 7.65 0 0 1 8 4.84c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default async function HomePage() {
  const tHeader = await getTranslations("header");
  const tHero = await getTranslations("hero");
  const tFeatures = await getTranslations("features");
  const tHow = await getTranslations("howItWorks");
  const tBuilt = await getTranslations("builtFor");
  const tFaq = await getTranslations("faq");
  const tFooter = await getTranslations("footer");

  const featureNavItems = [
    { id: "agent-team", label: tFeatures("navAgentTeam") },
    { id: "real-work", label: tFeatures("navRealWork") },
    { id: "playbooks", label: tFeatures("navPlaybooks") },
    { id: "control-room", label: tFeatures("navControlRoom") },
  ];

  const featureBlocks = [
    {
      id: "agent-team",
      headline: tFeatures("agentTeamHeadline"),
      description: tFeatures("agentTeamDescription"),
      imageSrc: "/images/ai-staff.png",
      imageAlt: tFeatures("agentTeamImageAlt"),
      bgSrc: "/images/feature-bg.jpg",
      cards: [
        { title: tFeatures("agentTeamCard1Title"), desc: tFeatures("agentTeamCard1Desc") },
        { title: tFeatures("agentTeamCard2Title"), desc: tFeatures("agentTeamCard2Desc") },
        { title: tFeatures("agentTeamCard3Title"), desc: tFeatures("agentTeamCard3Desc") },
      ],
    },
    {
      id: "real-work",
      headline: tFeatures("realWorkHeadline"),
      description: tFeatures("realWorkDescription"),
      imageSrc: "/images/home-ai-staff.png",
      imageAlt: tFeatures("realWorkImageAlt"),
      bgSrc: "/images/feature-bg-2.jpg",
      cards: [
        { title: tFeatures("realWorkCard1Title"), desc: tFeatures("realWorkCard1Desc") },
        { title: tFeatures("realWorkCard2Title"), desc: tFeatures("realWorkCard2Desc") },
        { title: tFeatures("realWorkCard3Title"), desc: tFeatures("realWorkCard3Desc") },
      ],
    },
    {
      id: "playbooks",
      headline: tFeatures("playbooksHeadline"),
      description: tFeatures("playbooksDescription"),
      imageSrc: "/images/home-not-join.png",
      imageAlt: tFeatures("playbooksImageAlt"),
      bgSrc: "/images/feature-bg-3.jpg",
      cards: [
        { title: tFeatures("playbooksCard1Title"), desc: tFeatures("playbooksCard1Desc") },
        { title: tFeatures("playbooksCard2Title"), desc: tFeatures("playbooksCard2Desc") },
        { title: tFeatures("playbooksCard3Title"), desc: tFeatures("playbooksCard3Desc") },
      ],
    },
    {
      id: "control-room",
      headline: tFeatures("controlRoomHeadline"),
      description: tFeatures("controlRoomDescription"),
      imageSrc: "/images/settings.png",
      imageAlt: tFeatures("controlRoomImageAlt"),
      bgSrc: "/images/feature-bg-4.jpg",
      cards: [
        { title: tFeatures("controlRoomCard1Title"), desc: tFeatures("controlRoomCard1Desc") },
        { title: tFeatures("controlRoomCard2Title"), desc: tFeatures("controlRoomCard2Desc") },
        { title: tFeatures("controlRoomCard3Title"), desc: tFeatures("controlRoomCard3Desc") },
      ],
    },
  ];

  const modelChips = [
    { src: "/brand/anthropic.png", alt: tHero("brandClaudeAlt"), label: tHero("modelClaude"), rounded: true },
    { src: null, alt: tHero("brandGptAlt"), label: tHero("modelGpt"), rounded: false }, // OpenAI rendered as inline SVG below
    { src: "/brand/gemini.svg", alt: tHero("brandGeminiAlt"), label: tHero("modelGemini"), rounded: false },
    { src: "/brand/kimi.ico", alt: tHero("brandKimiAlt"), label: tHero("modelKimi"), rounded: true },
    { src: "/brand/zai.svg", alt: tHero("brandGlmAlt"), label: tHero("modelGlm"), rounded: false },
  ];

  const faqItems = [1, 2, 3, 4, 5, 6].map((n) => ({
    q: tFaq(`q${n}`),
    a: tFaq(`a${n}`),
  }));

  return (
    <>
      <HomeViewTracker />
      <div className="h-full overflow-x-hidden overflow-y-auto bg-white">
        <div className="relative">
          {/* ===== Header ===== */}
          <header className="inset-x-0 top-0 z-30 absolute bg-transparent">
            <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 sm:gap-5">
                <a
                  href="/"
                  className="text-[18px] font-semibold tracking-[0.02em] text-white/92 sm:text-[20px]"
                >
                  Team9
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={tHeader("githubAriaLabel")}
                  className="inline-flex size-10 items-center justify-center rounded-[11px] border border-white/18 bg-black/16 text-white backdrop-blur-sm transition-colors hover:bg-black/24"
                >
                  <GithubIcon className="size-4" />
                </a>
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={tHeader("xAriaLabel")}
                  className="inline-flex size-10 items-center justify-center rounded-[11px] border border-white/18 bg-black/16 text-white backdrop-blur-sm transition-colors hover:bg-black/24"
                >
                  <XIcon className="size-4" />
                </a>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3">
                <LanguageSwitcher />
                <HeaderCTAGroup signInLabel={tHeader("signIn")} />
              </div>
            </div>
          </header>

          {/* ===== Hero ===== */}
          <section
            id="product"
            className="relative min-h-full overflow-hidden bg-[#05070b] text-white"
          >
            <div className="pointer-events-none absolute inset-0">
              <Image
                src="/images/hero-bg.jpg"
                alt=""
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                className="object-cover object-top"
                style={{ transform: "scale(0.85)", transformOrigin: "center top" }}
              />
            </div>
            <main className="relative z-10">
              <div className="mx-auto max-w-[1320px] px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
                <div className="mx-auto max-w-[1120px] text-center">
                  <h1 className="font-[family-name:var(--font-serif)] text-[3.65rem] leading-[0.93] tracking-[-0.038em] text-white drop-shadow-[0_10px_34px_rgba(0,0,0,0.32)] sm:text-[4.85rem] lg:text-[6.4rem]">
                    {tHero("headlineLine1")}
                    <br />
                    {tHero("headlineLine2")}
                  </h1>
                  <p className="mx-auto mt-7 max-w-[820px] text-[15px] leading-7 text-white/84 sm:text-[17px]">
                    {tHero("subheadline")}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <HeroCTAGroup
                      downloadLabel={tHero("downloadMac")}
                      signUpWithGoogleLabel={tHero("signUpWithGoogle")}
                    />
                  </div>
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                    <span className="text-[15px] text-white/50">{tHero("worksWith")}</span>
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
                      {modelChips.map((chip, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-white/80">
                          {chip.src ? (
                            <Image
                              src={chip.src}
                              alt={chip.alt}
                              width={20}
                              height={20}
                              className="size-5"
                              style={chip.rounded ? { borderRadius: 4 } : undefined}
                            />
                          ) : (
                            // OpenAI logo (GPT chip) — inline SVG since we don't have an OpenAI brand asset
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="currentColor">
                              <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073ZM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494Z" />
                            </svg>
                          )}
                          <span className="text-[15px] font-medium">{chip.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div id="preview" className="mt-10 sm:mt-12">
                    <div className="relative overflow-hidden border border-white/14">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster="/images/team9-preview-poster.jpg"
                        className="block h-auto w-full"
                        style={{ aspectRatio: "3840 / 1916", background: "#000" }}
                        aria-label={tHero("videoAriaLabel")}
                      >
                        <source src="/images/team9-preview.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </section>

          {/* ===== Features ===== */}
          <section id="features" className="bg-white text-[#0a0d12]">
            <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
              <div className="relative lg:flex lg:gap-20">
                <FeaturesNav items={featureNavItems} />
                <div className="flex-1">
                  {featureBlocks.map((block, idx) => (
                    <div
                      key={block.id}
                      id={block.id}
                      data-index={idx}
                      className={`py-20 lg:py-28 ${idx < featureBlocks.length - 1 ? "border-b border-[#0a0d12]/8" : ""}`}
                    >
                      <h2 className="font-[family-name:var(--font-serif)] text-[2.6rem] leading-[1.05] tracking-[-0.03em] text-[#0a0d12] whitespace-pre-line sm:text-[3.4rem] lg:text-[4.2rem]">
                        {block.headline}
                      </h2>
                      <p className="mt-5 max-w-[640px] text-[15px] leading-7 text-[#0a0d12]/60 sm:text-[16px]">
                        {block.description}
                      </p>
                      <div className="mt-14 sm:mt-18">
                        <div className="relative overflow-hidden rounded-sm">
                          <Image
                            src={block.bgSrc}
                            alt=""
                            fill
                            sizes="(max-width: 1320px) 100vw, 1320px"
                            className="object-cover object-center"
                          />
                          <div className="relative px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                            <Image
                              src={block.imageSrc}
                              alt={block.imageAlt}
                              width={1200}
                              height={600}
                              className="block w-full h-auto"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-14 grid gap-8 sm:mt-18 md:grid-cols-3 md:gap-10">
                        {block.cards.map((card) => (
                          <div key={card.title}>
                            <h3 className="text-[15px] font-semibold leading-snug text-[#0a0d12] sm:text-[16px]">
                              {card.title}
                            </h3>
                            <p className="mt-2.5 text-[14px] leading-[1.7] text-[#0a0d12]/56 sm:text-[15px]">
                              {card.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ===== How it works ===== */}
          <section id="how-it-works" className="bg-[#05070b] text-white">
            <div className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                {tHow("eyebrow")}
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-serif)] text-[2.6rem] leading-[1.05] tracking-[-0.03em] sm:text-[3.4rem] lg:text-[4.2rem]">
                {tHow("headlineLine1")}
                <br />
                <span className="text-white/40">{tHow("headlineLine2")}</span>
              </h2>
              <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="flex flex-col bg-[#05070b] p-8 lg:p-10">
                    <span className="text-[13px] font-semibold tabular-nums text-white/28">
                      {String(n).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-[17px] font-semibold leading-snug text-white sm:text-[18px]">
                      {tHow(`step${n}Title`)}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.7] text-white/50 sm:text-[15px]">
                      {tHow(`step${n}Desc`)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-14 flex flex-wrap items-center gap-4">
                <a
                  href={APP_BASE_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-white px-5 py-3 text-[14px] font-semibold text-[#0a0d12] transition-colors hover:bg-white/92"
                >
                  {tHow("ctaBuild")}
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-[12px] border border-white/18 bg-black/16 px-5 py-3 text-[14px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/24"
                >
                  <GithubIcon className="size-4" />
                  {tHow("ctaSeeWorkflow")}
                </a>
              </div>
            </div>
          </section>

          {/* ===== Built for ===== */}
          <section id="built-for" className="bg-white text-[#0a0d12]">
            <div className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
              <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
                <div className="lg:w-[480px] lg:shrink-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0a0d12]/40">
                    {tBuilt("eyebrow")}
                  </p>
                  <h2 className="mt-4 font-[family-name:var(--font-serif)] text-[2.6rem] leading-[1.05] tracking-[-0.03em] sm:text-[3.4rem] lg:text-[4.2rem]">
                    {tBuilt("headlineLine1")}
                    <br />
                    {tBuilt("headlineLine2")}
                  </h2>
                  <p className="mt-6 max-w-[420px] text-[15px] leading-7 text-[#0a0d12]/60 sm:text-[16px]">
                    {tBuilt("description")}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href={APP_BASE_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-[12px] bg-[#0a0d12] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#0a0d12]/88"
                    >
                      <GithubIcon className="size-4" />
                      {tBuilt("cta")}
                    </a>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="grid gap-px overflow-hidden rounded-2xl border border-[#0a0d12]/8 bg-[#0a0d12]/8 sm:grid-cols-2">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="bg-white p-8 lg:p-10">
                        <h3 className="text-[17px] font-semibold leading-snug text-[#0a0d12] sm:text-[18px]">
                          {tBuilt(`card${n}Title`)}
                        </h3>
                        <p className="mt-3 text-[14px] leading-[1.7] text-[#0a0d12]/56 sm:text-[15px]">
                          {tBuilt(`card${n}Desc`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== FAQ ===== */}
          <section id="faq" className="bg-[#f8f8f8] text-[#0a0d12]">
            <div className="mx-auto max-w-[860px] px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0a0d12]/40">
                  {tFaq("eyebrow")}
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-serif)] text-[2.6rem] leading-[1.05] tracking-[-0.03em] sm:text-[3.4rem] lg:text-[4.2rem]">
                  {tFaq("headline")}
                </h2>
              </div>
              <div className="mt-14 divide-y divide-[#0a0d12]/10 sm:mt-16">
                {faqItems.map((item, i) => (
                  <details key={i} className="group" name="faq">
                    <summary className="flex w-full cursor-pointer list-none items-start justify-between gap-4 py-6 text-left [&::-webkit-details-marker]:hidden">
                      <span className="text-[16px] font-semibold leading-snug text-[#0a0d12] sm:text-[17px]">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-[#0a0d12]/12 text-[#0a0d12]/40 transition-transform group-open:rotate-45"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M6 1v10M1 6h10" />
                        </svg>
                      </span>
                    </summary>
                    <p className="pb-6 pr-12 text-[14px] leading-[1.7] text-[#0a0d12]/56 sm:text-[15px]">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ===== Footer ===== */}
          <footer className="bg-[#0a0d12] text-white">
            <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-12 border-b border-white/10 py-16 sm:py-20 lg:flex-row lg:gap-20">
                <div className="lg:w-[340px] lg:shrink-0">
                  <a href="#product" className="flex items-center gap-3">
                    <span className="text-[18px] font-semibold tracking-[0.04em] lowercase">team9.ai</span>
                  </a>
                  <p className="mt-4 max-w-[300px] text-[14px] leading-[1.7] text-white/50 sm:text-[15px]">
                    {tFooter("tagline")}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <a
                      href={X_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={tFooter("xAriaLabel")}
                      className="text-white/40 transition-colors hover:text-white"
                    >
                      <XIcon className="size-4" />
                    </a>
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={tFooter("githubAriaLabel")}
                      className="text-white/40 transition-colors hover:text-white"
                    >
                      <GithubIcon className="size-4" />
                    </a>
                  </div>
                  <div className="mt-6">
                    <FooterCTAGroup ctaLabel={tFooter("ctaBuildYourTeam")} />
                  </div>
                </div>
                <div className="flex flex-1 items-start lg:justify-end">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
                    <a
                      href="https://app.team9.ai/terms-of-service"
                      target="_blank"
                      rel="noopener"
                      className="text-[14px] text-white/50 transition-colors hover:text-white"
                    >
                      {tFooter("terms")}
                    </a>
                    <a
                      href="https://app.team9.ai/privacy"
                      target="_blank"
                      rel="noopener"
                      className="text-[14px] text-white/50 transition-colors hover:text-white"
                    >
                      {tFooter("privacy")}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-6">
                <p className="text-[13px] text-white/36">{tFooter("copyright")}</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 5: Build**

Run: `pnpm build`
Expected: Build succeeds with no type errors. Next.js statically generates `/` + `/zh`, `/fr`, etc.

If the build complains about `next/image` remotePatterns for the image paths, they're all `public/` (local), so no config change needed.

If the build complains about `<HomePage>` being async — the component is already `async`, and `page.tsx` awaits it.

- [ ] **Step 6: Lint**

Run: `pnpm lint`
Expected: no errors. Fix any warnings if trivial (unused imports).

- [ ] **Step 7: Commit**

```bash
git add components/HomePage.tsx components/home/HeaderCTAGroup.tsx components/home/HeroCTAGroup.tsx components/home/FooterCTAGroup.tsx
git commit -m "feat(home): rewrite homepage to match live team9.ai design

Replaces the 2041-line OpenClaw/Moltbook page with a 7-section layout
(Header, Hero, Features×4, How it works, Built for, FAQ, Footer).

Analytics surface is preserved byte-for-byte:
- home_viewed on mount (HomeViewTracker)
- home_signup_button_clicked with button_location in {header, hero, footer}
- home_download_button_clicked with button_location: hero
- UTM acquisition capture and GTM dataLayer bridge unchanged

Serif headlines via --font-serif (Instrument Serif + Noto Serif SC).
Hero image gets priority + fetchPriority for LCP. Video uses
preload=metadata with a JPEG poster to avoid blocking LCP."
```

---

### Task 10: Rewrite JSON-LD and add preconnect in AppShell

Insert a 5-entity `@graph` JSON-LD inline in the `<body>` (App Router safe), and add `preconnect` + `dns-prefetch` hints.

**Files:**
- Modify: `components/AppShell.tsx`

- [ ] **Step 1: Import `getTranslations` again**

Open `components/AppShell.tsx`. On the import line:

```tsx
import { getMessages } from "next-intl/server";
```

Change to:

```tsx
import { getMessages, getTranslations } from "next-intl/server";
```

- [ ] **Step 2: Add JSON-LD + preconnect**

In the function body, above the `return`, insert (replacing the previous location of the deleted const block):

```tsx
const tMeta = await getTranslations({ locale, namespace: "metadata" });
const tFaq = await getTranslations({ locale, namespace: "faq" });

// Duration obtained from `ffprobe` on the final compressed mp4 (see Task 1 Step 6).
// If the mp4 is swapped later, re-run ffprobe and update this value.
const VIDEO_DURATION_ISO = "PT28S"; // <-- replace with the actual rounded-down integer from Task 1

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${LANDING_BASE_URL}#organization`,
      name: "Team9.ai",
      url: LANDING_BASE_URL,
      logo: `${LANDING_BASE_URL}/favicon.svg`,
      sameAs: [
        "https://x.com/team9_ai",
        "https://github.com/team9ai/team9",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${LANDING_BASE_URL}#software`,
      name: "Team9.ai",
      applicationCategory: "ProjectManagement",
      operatingSystem: "Web, macOS",
      description: tMeta("description"),
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@id": `${LANDING_BASE_URL}#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [1, 2, 3, 4, 5, 6].map((n) => ({
        "@type": "Question",
        name: tFaq(`q${n}`),
        acceptedAnswer: {
          "@type": "Answer",
          text: tFaq(`a${n}`),
        },
      })),
    },
    {
      "@type": "VideoObject",
      name: "Team9.ai board view",
      description:
        "Humans and agents coordinating work in a single Team9.ai workspace",
      thumbnailUrl: `${LANDING_BASE_URL}/images/team9-preview-poster.jpg`,
      contentUrl: `${LANDING_BASE_URL}/images/team9-preview.mp4`,
      uploadDate: "2026-01-15",
      duration: VIDEO_DURATION_ISO,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: LANDING_BASE_URL,
        },
      ],
    },
  ],
};
```

- [ ] **Step 3: Emit JSON-LD + preconnect + body**

Replace the JSX return with:

```tsx
return (
  <html lang={locale} className="dark" style={{ colorScheme: "dark" }}>
    <head>
      <link rel="preconnect" href="https://us.i.posthog.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://app.team9.ai" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${notoSerifSc.variable} antialiased`}
    >
      <PostHogProvider>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </PostHogProvider>
    </body>
    {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
  </html>
);
```

Note: `<head>` (lowercase, no import) is valid inside a Next.js root layout and is rendered statically. This is different from the `<Head>` component from `next/head`, which is deprecated in App Router.

- [ ] **Step 4: Update `VIDEO_DURATION_ISO` with the real value**

Replace the placeholder `"PT28S"` in Step 2's inserted code with the value from Task 1 Step 6. If Task 1 printed `video_duration_seconds=31.7`, write `"PT31S"` (truncate).

- [ ] **Step 5: Build + view source**

Run: `pnpm build && pnpm start &` (in background)
Wait 3 seconds, then: `curl -s http://localhost:3000/ | grep -o 'application/ld+json' | head -1`
Expected: prints `application/ld+json` at least once.
Kill the server: `pkill -f "next start"` (or similar — if `pnpm start` is in foreground, Ctrl+C).

- [ ] **Step 6: Commit**

```bash
git add components/AppShell.tsx
git commit -m "feat(seo): emit 5-entity JSON-LD @graph and add preconnect hints

Replaces dead next/head JSON-LD with a statically-rendered <head> block
emitting Organization, SoftwareApplication, FAQPage, VideoObject, and
BreadcrumbList schema types. FAQPage entries are localized per request.

preconnect to PostHog and GTM origins; dns-prefetch for the app subdomain."
```

---

### Task 11: Update `(root)/layout.tsx` metadata

Add `description`, `openGraph.description`, `openGraph.images`, `twitter.images`. Simplify `keywords`.

**Files:**
- Modify: `app/(root)/layout.tsx`

- [ ] **Step 1: Replace the metadata return object**

Open `app/(root)/layout.tsx`. Inside `generateMetadata`, replace the returned object with:

```tsx
return {
  title: `${titlePrefix}${t("title")}`,
  description: t("description"),
  keywords: [
    "AI agents",
    "AI agent team",
    "AI workspace",
    "AI workflow",
    "autonomous agents",
    "AI operations",
    "Team9.ai",
  ],
  authors: [{ name: "Team9" }],
  creator: "Team9",
  publisher: "Team9",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: LANDING_BASE_URL,
    title: t("ogTitle"),
    description: t("ogDescription"),
    siteName: "Team9.ai",
    images: [
      {
        url: `${LANDING_BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Team9.ai — Best AI Agent Team for Real Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: t("ogTitle"),
    description: t("ogDescription"),
    images: [`${LANDING_BASE_URL}/images/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-site-verification":
      "_vTvm7VVnIcMe_uNIUoGBgUR6ePuT3RcumdCT_tGHT4",
  },
  alternates: {
    canonical: LANDING_BASE_URL,
    languages: {
      en: LANDING_BASE_URL,
      zh: `${LANDING_BASE_URL}/zh`,
      "zh-Hant": `${LANDING_BASE_URL}/zh-Hant`,
      es: `${LANDING_BASE_URL}/es`,
      pt: `${LANDING_BASE_URL}/pt`,
      fr: `${LANDING_BASE_URL}/fr`,
      de: `${LANDING_BASE_URL}/de`,
      ja: `${LANDING_BASE_URL}/ja`,
      ko: `${LANDING_BASE_URL}/ko`,
      ru: `${LANDING_BASE_URL}/ru`,
      it: `${LANDING_BASE_URL}/it`,
      nl: `${LANDING_BASE_URL}/nl`,
    },
  },
};
```

- [ ] **Step 2: Build check**

Run: `pnpm build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add app/\(root\)/layout.tsx
git commit -m "seo((root)): add description, OG description + image, twitter image

Simplifies keywords to the 7 terms that now fit the page narrative.
All new strings come from the metadata i18n namespace."
```

---

### Task 12: Update `[locale]/layout.tsx` metadata

Same treatment as Task 11, for the dynamic-locale layout.

**Files:**
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Replace the metadata return**

Open `app/[locale]/layout.tsx`. Inside `generateMetadata`, replace the returned object with:

```tsx
return {
  title: `${titlePrefix}${t("title")}`,
  description: t("description"),
  keywords: [
    "AI agents",
    "AI agent team",
    "AI workspace",
    "AI workflow",
    "autonomous agents",
    "AI operations",
    "Team9.ai",
  ],
  authors: [{ name: "Team9" }],
  creator: "Team9",
  publisher: "Team9",
  openGraph: {
    type: "website",
    locale: locale === "zh" ? "zh_CN" : locale === "zh-Hant" ? "zh_TW" : locale === "ja" ? "ja_JP" : locale === "ko" ? "ko_KR" : "en_US",
    url: `${LANDING_BASE_URL}/${locale}`,
    title: t("ogTitle"),
    description: t("ogDescription"),
    siteName: "Team9.ai",
    images: [
      {
        url: `${LANDING_BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Team9.ai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: t("ogTitle"),
    description: t("ogDescription"),
    images: [`${LANDING_BASE_URL}/images/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-site-verification":
      "_vTvm7VVnIcMe_uNIUoGBgUR6ePuT3RcumdCT_tGHT4",
  },
  alternates: {
    canonical: `${LANDING_BASE_URL}/${locale}`,
    languages: {
      en: LANDING_BASE_URL,
      zh: `${LANDING_BASE_URL}/zh`,
      "zh-Hant": `${LANDING_BASE_URL}/zh-Hant`,
      es: `${LANDING_BASE_URL}/es`,
      pt: `${LANDING_BASE_URL}/pt`,
      fr: `${LANDING_BASE_URL}/fr`,
      de: `${LANDING_BASE_URL}/de`,
      ja: `${LANDING_BASE_URL}/ja`,
      ko: `${LANDING_BASE_URL}/ko`,
      ru: `${LANDING_BASE_URL}/ru`,
      it: `${LANDING_BASE_URL}/it`,
      nl: `${LANDING_BASE_URL}/nl`,
    },
  },
};
```

- [ ] **Step 2: Build check**

Run: `pnpm build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add app/\[locale\]/layout.tsx
git commit -m "seo([locale]): add description, OG description + image per locale

Sets openGraph.locale using proper IETF codes for zh/zh-Hant/ja/ko.
Canonical uses the locale-prefixed URL, alternates cover all 12 languages."
```

---

### Task 13: Create `app/sitemap.ts`

Dynamic sitemap listing 2 paths × 12 locales with hreflang alternates.

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Write the sitemap module**

Create `app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";
import { LANDING_BASE_URL } from "@/utils/env";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

function urlFor(locale: string, path: string): string {
  return locale === "en"
    ? `${LANDING_BASE_URL}${path}`
    : `${LANDING_BASE_URL}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; changeFrequency: "monthly" | "yearly"; priority: number }[] = [
    { path: "", changeFrequency: "monthly", priority: 1.0 },
    { path: "/pricing", changeFrequency: "yearly", priority: 0.8 },
  ];

  return paths.flatMap(({ path, changeFrequency, priority }) =>
    routing.locales.map((locale) => ({
      url: urlFor(locale, path),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, urlFor(l, path)]),
        ),
      },
    })),
  );
}
```

- [ ] **Step 2: Build and inspect the generated sitemap**

Run: `pnpm build && pnpm start &` (background)
Wait 3 seconds, then: `curl -s http://localhost:3000/sitemap.xml | head -40`
Expected: an XML `<urlset>` root with `<url>` entries that include `xhtml:link hreflang="..."` children for each of the 12 locales.
Kill: `pkill -f "next start"`

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "seo(sitemap): add dynamic sitemap with hreflang alternates

Lists / and /pricing for all 12 locales. Each URL carries alternates for
every other locale so Search Console can interconnect the hreflang graph
without manual configuration. robots.ts already references /sitemap.xml."
```

---

### Task 14: Verification

The final gate. No committed changes in this task unless a defect is found and patched.

- [ ] **Step 1: Clean build**

Run:
```bash
rm -rf .next
pnpm build
```
Expected: completes without errors or type errors. Check the summary output: `/ → static`, `/{locale} → static` for each of 11 locales, `/pricing` and `/{locale}/pricing` → static.

- [ ] **Step 2: Lint**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: Start the production server**

Run: `pnpm start &` (background)
Wait 3 seconds.

- [ ] **Step 4: Verify HTML head has the important signals**

Run:
```bash
curl -s http://localhost:3000/ > /tmp/home.html
echo "== title =="
grep -o '<title[^>]*>[^<]*' /tmp/home.html | head -1
echo "== description =="
grep -oE '<meta name="description" content="[^"]*"' /tmp/home.html | head -1
echo "== og:image =="
grep -oE '<meta property="og:image" content="[^"]*"' /tmp/home.html | head -1
echo "== ld+json script count =="
grep -c 'application/ld+json' /tmp/home.html
echo "== hreflang links =="
grep -c 'hreflang=' /tmp/home.html
echo "== canonical =="
grep -oE '<link rel="canonical" href="[^"]*"' /tmp/home.html | head -1
echo "== preconnect =="
grep -oE '<link rel="preconnect" href="[^"]*"' /tmp/home.html
```
Expected:
- `title`: `Team9.ai — Best AI Agent Team for Real Work` (no `[DEV]` prefix in prod)
- `description`: starts with `Team9.ai turns AI agents into a dependable execution team…`
- `og:image`: `https://team9.ai/images/og-image.jpg`
- `ld+json script count`: at least `1` (the `@graph` is wrapped in a single script)
- `hreflang links`: `12` (one per locale, from `alternates.languages`)
- `canonical`: `https://team9.ai`
- `preconnect`: 2 entries (PostHog, GTM)

- [ ] **Step 5: Verify sitemap**

Run:
```bash
curl -s http://localhost:3000/sitemap.xml | grep -c '<url>'
```
Expected: `24` (12 locales × 2 paths).

- [ ] **Step 6: Verify a localized page renders**

Run:
```bash
curl -s http://localhost:3000/zh > /tmp/home-zh.html
grep -o '<h1[^>]*>[^<]*' /tmp/home-zh.html | head -1
grep -oE '<meta property="og:locale" content="[^"]*"' /tmp/home-zh.html | head -1
```
Expected: an H1 with Chinese text; `og:locale` of `zh_CN`.

- [ ] **Step 7: Verify analytics wiring (manual, browser)**

Open `http://localhost:3000/` in a browser with DevTools open → Network tab.
- Page load: confirm a POST to `us.i.posthog.com/…/e/` contains event `home_viewed` with `page_key: "home"`. (If posthog key is blank in `.env`, this will be absent — check `.env` for `NEXT_PUBLIC_POSTHOG_KEY`.)
- Click the Header "Sign in" button. Confirm a POST with `home_signup_button_clicked` and `button_location: "header"`.
- Back, click Hero "Download Mac". Confirm `home_download_button_clicked` + `button_location: "hero"`.
- Click Hero "Sign up with Google". Confirm `home_signup_button_clicked` + `button_location: "hero"`.
- Scroll to footer, click "Build your team". Confirm `home_signup_button_clicked` + `button_location: "footer"`.

If any of the 4 click events don't fire, stop and investigate — the analytics freeze rule says events must work.

- [ ] **Step 8: Verify visual rendering**

Still in the browser, scroll through `/`:
- Hero: one H1, CTA row, 5 model chips, autoplay video visible after LCP image paints
- Features: left sticky nav appears at `lg+`; active pill moves as you scroll through 4 blocks; each block has H2, image on textured bg, 3-card grid
- How it works: dark section, 4-step grid in a single row at `lg+`
- Built for: 2×2 card grid on the right, CTA button on the left
- FAQ: 6 questions; clicking one expands, clicking another collapses the first (native `details[name="faq"]` mutual-exclusion; degrades to independently-expandable on older browsers — still functional)
- Footer: team9.ai wordmark, X + GitHub icons, "Build your team" white button, Terms + Privacy in the right column, copyright row at bottom

Also resize to mobile (Chrome DevTools responsive, iPhone 12 Pro profile):
- Header stays visible and usable
- Hero text wraps without breaking
- Features `FeaturesNav` is **hidden**; 4 blocks stack
- How it works grid collapses to 2 columns / 1 column as viewport shrinks
- FAQ is readable

- [ ] **Step 9: Kill the server**

Run: `pkill -f "next start"` (or Ctrl+C if foreground).

- [ ] **Step 10: Lighthouse snapshot (optional but recommended)**

Run `pnpm start &`, then in Chrome DevTools → Lighthouse tab → Mobile + Performance + SEO + Accessibility → Analyze.
Expected thresholds:
- SEO ≥ 95
- Accessibility ≥ 90
- Performance ≥ 85 (LCP in green, CLS < 0.1)

If SEO < 95, inspect failing audits. Common causes: missing alt text (should not happen — images either have locale alt or `alt=""`), missing meta description (should not happen), link names (check Terms/Privacy anchors have text).

- [ ] **Step 11: No additional commit needed**

Verification is passive. If defects found, patch in additional commits before declaring done.

---

## Self-review

Spec coverage check (line by line against `docs/superpowers/specs/2026-04-21-homepage-redesign-design.md`):

- §4 page structure → Task 9 covers all 7 sections ✓
- §5.1-5.4 component matrix → Tasks 2, 4, 9, 10 cover AppShell, FeaturesNav, CTAs, HomePage ✓
- §6 analytics freeze → Task 9's CTA rewrites preserve event names and button_location values ✓
- §7.1-7.3 i18n → Tasks 5, 6, 7, 8 cover all 12 locales ✓
- §8.1 metadata → Tasks 11, 12 ✓
- §8.2 JSON-LD @graph → Task 10 ✓
- §8.3 sitemap → Task 13 ✓
- §8.4 preconnect → Task 10 ✓
- §8.5 H hierarchy → Task 9 (single H1, 7 H2s, correctly-nested H3s) ✓
- §8.6 image alt → Task 5 en.json has descriptive alt keys, Task 9 wires them into `next/image` ✓
- §9 performance → Task 1 budgets, Task 2 fonts with `display:swap`, Task 9 Hero image priority ✓
- §10 styling → Task 3 globals.css cleanup ✓
- §11 external links → Task 9 inlines all 9 URLs with correct rel attributes ✓
- §12 asset pipeline → Task 1 ✓
- §13 verification checklist → Task 14 ✓

Placeholder scan: Plan contains no "TBD"/"TODO"/"implement later"/"similar to"/"handle edge cases"; only explicit duration `PT28S` placeholder with instructions to replace from ffprobe output in Task 1 Step 6, fulfilled in Task 10 Step 4.

Type consistency: `signInLabel` consistent across HomePage.tsx → HeaderCTAGroup.tsx props. `downloadLabel`/`signUpWithGoogleLabel` consistent HomePage.tsx → HeroCTAGroup.tsx. `ctaLabel` consistent HomePage.tsx → FooterCTAGroup.tsx. `items: NavItem[]` consistent HomePage.tsx → FeaturesNav.tsx.
