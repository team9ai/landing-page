"use client";

import type { MouseEvent } from "react";
import type { PostHog } from "posthog-js";
import { GTM_BRIDGE_EVENTS } from "./events";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function captureWithBridge(
  client: PostHog | null,
  event: string,
  properties?: Record<string, unknown>,
): void {
  // send_instantly bypasses PostHog's internal request batching so the event
  // is flushed before the browser starts a subsequent navigation.
  client?.capture(event, properties, { send_instantly: true });

  const gtmEvent = GTM_BRIDGE_EVENTS[event];
  if (gtmEvent && typeof window !== "undefined") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: gtmEvent, ...properties });
  }
}

// Delay same-tab navigation so sendBeacon/XHR from captureWithBridge has
// time to dispatch before the page unloads. Modifier-key / middle-click
// new-tab intents are left to the browser (the current page stays alive,
// so there is no unload race to worry about).
const ANALYTICS_NAV_DELAY_MS = 150;

export function captureAndNavigate(
  e: MouseEvent<HTMLAnchorElement>,
  client: PostHog | null,
  event: string,
  properties?: Record<string, unknown>,
): void {
  captureWithBridge(client, event, properties);

  if (
    e.defaultPrevented ||
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey
  ) {
    return;
  }

  const href = e.currentTarget.href;
  if (!href) return;

  e.preventDefault();
  window.setTimeout(() => {
    window.location.href = href;
  }, ANALYTICS_NAV_DELAY_MS);
}
