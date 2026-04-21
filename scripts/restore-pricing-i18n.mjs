#!/usr/bin/env node
// One-shot: merge missing pricing-related i18n keys from main branch back
// into each current locale file. Run once, commit, delete (or keep — small).
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const LOCALES = ["en", "zh", "zh-Hant", "es", "pt", "fr", "de", "ja", "ko", "ru", "it", "nl"];
const KEYS_TO_COPY_FROM_HEADER = ["contactUs"];
const KEYS_TO_COPY_FROM_METADATA = ["pricingTitle", "pricingDescription"];

for (const locale of LOCALES) {
  // Load main's file for this locale
  const mainJson = execFileSync("git", ["show", `main:messages/${locale}.json`], { encoding: "utf8" });
  const fromMain = JSON.parse(mainJson);

  // Load current file
  const currentPath = `messages/${locale}.json`;
  const current = JSON.parse(readFileSync(currentPath, "utf8"));

  // Restore header.contactUs
  for (const k of KEYS_TO_COPY_FROM_HEADER) {
    if (fromMain.header?.[k] !== undefined) {
      current.header[k] = fromMain.header[k];
    } else {
      console.warn(`[${locale}] main has no header.${k} — skipping`);
    }
  }

  // Restore metadata.pricingTitle + pricingDescription
  for (const k of KEYS_TO_COPY_FROM_METADATA) {
    if (fromMain.metadata?.[k] !== undefined) {
      current.metadata[k] = fromMain.metadata[k];
    } else {
      console.warn(`[${locale}] main has no metadata.${k} — skipping`);
    }
  }

  // Restore entire pricing namespace
  if (fromMain.pricing && typeof fromMain.pricing === "object") {
    current.pricing = fromMain.pricing;
  } else {
    console.warn(`[${locale}] main has no pricing namespace — skipping`);
  }

  // Write back with 2-space indent + trailing newline
  writeFileSync(currentPath, JSON.stringify(current, null, 2) + "\n");
  console.log(`[${locale}] restored`);
}

console.log("Done.");
