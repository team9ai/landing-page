"use client";

import { usePostHogClient } from "@/utils/analytics/provider";
import { captureAndNavigate } from "@/utils/analytics/capture";
import { EVENTS } from "@/utils/analytics/events";
import { APP_BASE_URL } from "@/utils/env";

interface Props {
  signInLabel: string;
}

export default function HeaderCTAGroup({ signInLabel }: Props) {
  const client = usePostHogClient();

  return (
    <a
      href={`${APP_BASE_URL}/login`}
      onClick={(e) => {
        captureAndNavigate(e, client, EVENTS.HOME_SIGNUP_BUTTON_CLICKED, {
          button_location: "header",
        });
      }}
      className="inline-flex items-center justify-center gap-2 rounded-[11px] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0a0d12] transition-colors hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      {signInLabel}
    </a>
  );
}
