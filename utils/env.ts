export const LANDING_BASE_URL = process.env.NEXT_PUBLIC_LANDING_BASE_URL || "https://team9.ai";
export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || "https://app.team9.ai";
// Cloudflare R2 public domain for large static assets (video, etc.) that
// exceed the Cloudflare Pages 25 MB per-file limit.
export const ASSET_CDN_URL = process.env.NEXT_PUBLIC_ASSET_CDN_URL || "https://cdn.team9.ai";

// Google Analytics & Tag Manager
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0";

