"use client";

import { usePostHogClient } from "@/utils/analytics/provider";
import { captureWithBridge } from "@/utils/analytics/capture";
import { EVENTS } from "@/utils/analytics/events";
import { APP_BASE_URL } from "@/utils/env";

interface Props {
  signInLabel: string;
  signUpLabel: string;
}

export default function HeaderCTAGroup({ signInLabel, signUpLabel }: Props) {
  const client = usePostHogClient();

  return (
    <>
      <a
        href={`${APP_BASE_URL}/login`}
        className="px-4 py-2 md:px-5 md:py-2.5 text-white/70 text-sm md:text-base font-semibold hover:text-white transition-colors duration-200"
      >
        {signInLabel}
      </a>
      <a
        href={APP_BASE_URL}
        onClick={() => {
          captureWithBridge(client, EVENTS.HOME_SIGNUP_BUTTON_CLICKED, {
            button_location: "header",
          });
        }}
        className="px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/30"
      >
        {signUpLabel}
      </a>
    </>
  );
}
