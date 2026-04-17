"use client";

import type { PostHog } from "posthog-js";

const UTM_PARAMS = [
  ["utm_source", "acquisition_source"],
  ["utm_medium", "acquisition_medium"],
  ["utm_campaign", "acquisition_campaign"],
  ["utm_content", "acquisition_content"],
  ["utm_term", "acquisition_term"],
] as const;

export function captureAcquisitionOnce(client: PostHog): void {
  if (typeof window === "undefined") return;

  const search = new URLSearchParams(window.location.search);
  const setOnce: Record<string, string> = {};

  for (const [urlKey, propKey] of UTM_PARAMS) {
    const value = search.get(urlKey);
    if (value) setOnce[propKey] = value;
  }

  if (Object.keys(setOnce).length > 0) {
    client.setPersonProperties(undefined, setOnce);
  }
}
