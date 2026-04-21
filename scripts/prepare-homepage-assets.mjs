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

// 1. Hero background (JPEG quality 75, LCP image; downscaled to max 1920px wide)
await sharp(path.join(REF, "assets", "002.jpg"))
  .resize({ width: 1920, withoutEnlargement: true })
  .jpeg({ quality: 75, mozjpeg: true })
  .toFile(path.join(IMG_OUT, "hero-bg.jpg"));

// 2. Four feature backgrounds (JPEG quality 50, downscaled to max 1440px wide)
// feature-bg-3 uses extra aggressive compression (quality 40, 1280px) due to high visual complexity
const featureBgSettings = {
  "feature-bg.jpg":   { width: 1440, quality: 50 },
  "feature-bg-2.jpg": { width: 1440, quality: 50 },
  "feature-bg-3.jpg": { width: 1280, quality: 40 },
  "feature-bg-4.jpg": { width: 1440, quality: 50 },
};
for (const [src, dst] of [
  ["feature-bg.jpg", "feature-bg.jpg"],
  ["feature-bg-2.jpg", "feature-bg-2.jpg"],
  ["feature-bg-3.jpg", "feature-bg-3.jpg"],
  ["feature-bg-4.jpg", "feature-bg-4.jpg"],
]) {
  const { width, quality } = featureBgSettings[src];
  await sharp(path.join(REF, "assets", src))
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
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
  .resize({ width: 1920, withoutEnlargement: true })
  .jpeg({ quality: 75, mozjpeg: true })
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
