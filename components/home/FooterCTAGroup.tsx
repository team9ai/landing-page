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
    <button
      aria-label="Get started with Team9"
      onClick={() => {
        captureWithBridge(client, EVENTS.HOME_SIGNUP_BUTTON_CLICKED, {
          button_location: "footer",
        });
        window.location.href = APP_BASE_URL;
      }}
      className="group relative px-12 py-6 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-white text-xl font-bold rounded-full touch-action-manipulation transition-all duration-300 hover:scale-105 hover:shadow-[0_30px_80px_-20px_rgba(168,85,247,0.8)] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50 flex items-center gap-3"
    >
      {ctaLabel}
      <svg
        className="w-6 h-6 transition-transform group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}
