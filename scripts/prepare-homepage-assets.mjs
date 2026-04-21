#!/usr/bin/env node
// One-off: copy + compress reference assets into public/.
// Safe to re-run; outputs are deterministic (within JPEG/PNG encoder stability).
// sharp is kept as a devDependency intentionally: it is already a transitive dep of Next.js
// and is standard for image tooling (plan Step 7 fallback — no extra prod bundle cost).
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

// 1. Hero background (LCP image; downscaled to max 1920px wide)
// reduced from plan q85 to q75 + 1920px cap to meet ≤300 KB budget
await sharp(path.join(REF, "assets", "002.jpg"))
  .resize({ width: 1920, withoutEnlargement: true })
  .jpeg({ quality: 75, mozjpeg: true })
  .toFile(path.join(IMG_OUT, "hero-bg.jpg"));

// 2. Four feature backgrounds (JPEG quality 50, downscaled to max 1440px wide)
// feature-bg-3: reduced from plan q82 to q40 + 1280px cap to meet ≤300 KB budget (high visual complexity)
const featureBgSettings = {
  "feature-bg.jpg":   { width: 1440, quality: 50 },
  "feature-bg-2.jpg": { width: 1440, quality: 50 },
  "feature-bg-3.jpg": { width: 1280, quality: 40 }, // reduced from plan q82 to q40 + 1280px cap to meet ≤300 KB budget
  "feature-bg-4.jpg": { width: 1440, quality: 50 },
};
for (const [name, { width, quality }] of Object.entries(featureBgSettings)) {
  await sharp(path.join(REF, "assets", name))
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(path.join(IMG_OUT, name));
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

// 4. Preview video: NOT copied into public/. The mp4 (~37 MB) exceeds
// Cloudflare Pages' 25 MB per-file limit and is served from Cloudflare R2
// via ASSET_CDN_URL (see utils/env.ts). Upload the mp4 to R2 manually if
// it changes.

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
try {
  // reduced from plan q85 to q75 + 1920px cap to meet ≤300 KB budget
  await sharp(posterTmp)
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 75, mozjpeg: true })
    .toFile(path.join(IMG_OUT, "team9-preview-poster.jpg"));
} finally {
  await rm(posterTmp, { force: true });
}

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

// 8. Probe the reference mp4 duration for JSON-LD (prints to stdout for operator).
// Reads from the reference source since the mp4 is no longer copied into public/.
const probe = execFileSync("ffprobe", [
  "-v", "error",
  "-show_entries", "format=duration",
  "-of", "default=noprint_wrappers=1:nokey=1",
  path.join(REF, "assets", "team9-preview.mp4"),
]).toString().trim();
console.log(`video_duration_seconds=${probe}`);

console.log("Done.");
