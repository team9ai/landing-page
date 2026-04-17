"use client";

import type { PostHog } from "posthog-js";
import { POSTHOG_KEY, POSTHOG_HOST, APP_VERSION } from "@/utils/env";

let clientPromise: Promise<PostHog | null> | null = null;

export function getPostHogClient(): Promise<PostHog | null> {
  if (!POSTHOG_KEY) return Promise.resolve(null);
  if (clientPromise) return clientPromise;

  clientPromise = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        defaults: "2026-01-30",
        cross_subdomain_cookie: true,
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: false,
        capture_dead_clicks: false,
        capture_exceptions: false,
        capture_heatmaps: false,
        disable_external_dependency_loading: true,
        disable_session_recording: true,
        disable_surveys: true,
        advanced_disable_flags: true,
        advanced_disable_toolbar_metrics: true,
        mask_all_element_attributes: true,
        mask_all_text: true,
        debug: process.env.NODE_ENV === "development",
      });

      posthog.register({
        app_name: "team9-homepage",
        app_platform: "homepage",
        app_version: APP_VERSION,
      });

      return posthog;
    })
    .catch((err) => {
      console.error("[PostHog] init failed", err);
      clientPromise = null;
      return null;
    });

  return clientPromise;
}
