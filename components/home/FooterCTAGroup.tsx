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
