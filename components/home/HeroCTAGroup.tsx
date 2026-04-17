"use client";

import DownloadButton from "@/components/DownloadButton";
import { usePostHogClient } from "@/utils/analytics/provider";
import { captureWithBridge } from "@/utils/analytics/capture";
import { EVENTS } from "@/utils/analytics/events";
import { APP_BASE_URL } from "@/utils/env";

interface Props {
  downloadLabel: string;
  startForFreeLabel: string;
}

export default function HeroCTAGroup({ downloadLabel, startForFreeLabel }: Props) {
  const client = usePostHogClient();

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <DownloadButton
        label={downloadLabel}
        className="group relative px-9 py-4 md:px-11 md:py-5 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-white text-base md:text-lg font-bold rounded-xl md:rounded-2xl touch-action-manipulation transition-all duration-150 hover:scale-105 hover:shadow-[0_18px_50px_-14px_rgba(251,191,36,0.55)] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50 flex items-center gap-2 cursor-pointer"
      />
      <a
        href={APP_BASE_URL}
        onClick={() => {
          captureWithBridge(client, EVENTS.HOME_SIGNUP_BUTTON_CLICKED, {
            button_location: "hero",
          });
        }}
      >
        <button
          aria-label="Open Team9 in your browser"
          className="group relative px-9 py-4 md:px-11 md:py-5 border border-white/20 bg-white/5 backdrop-blur-sm text-white text-base md:text-lg font-bold rounded-xl md:rounded-2xl touch-action-manipulation transition-all duration-150 hover:scale-105 hover:bg-white/10 hover:border-white/30 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 flex items-center gap-2 cursor-pointer"
        >
          {startForFreeLabel}
        </button>
      </a>
    </div>
  );
}
