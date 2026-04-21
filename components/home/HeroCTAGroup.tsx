"use client";

import DownloadButton from "@/components/DownloadButton";
import { usePostHogClient } from "@/utils/analytics/provider";
import { captureWithBridge } from "@/utils/analytics/capture";
import { EVENTS } from "@/utils/analytics/events";
import { APP_BASE_URL } from "@/utils/env";

interface Props {
  downloadLabel: string;
  signUpWithGoogleLabel: string;
}

export default function HeroCTAGroup({
  downloadLabel,
  signUpWithGoogleLabel,
}: Props) {
  const client = usePostHogClient();

  return (
    <>
      <DownloadButton
        label={downloadLabel}
        className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-white px-5 py-3 text-[14px] font-semibold text-[#0a0d12] transition-colors hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:opacity-60"
      />
      <a
        href={APP_BASE_URL}
        onClick={() => {
          captureWithBridge(client, EVENTS.HOME_SIGNUP_BUTTON_CLICKED, {
            button_location: "hero",
          });
        }}
        className="inline-flex items-center justify-center gap-2 rounded-[12px] border border-white/18 bg-black/16 px-5 py-3 text-[14px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.54-1.8 4.5-5.5 4.5-3.31 0-6-2.69-6-6s2.69-6 6-6c1.88 0 3.13.8 3.85 1.49l2.62-2.54C16.82 4.01 14.64 3.2 12 3.2 7.03 3.2 3 7.23 3 12.2s4.03 9 9 9c5.19 0 8.62-3.65 8.62-8.8 0-.59-.06-1.04-.14-1.48H12Z" />
          <path fill="#4285F4" d="M3.98 7.54 7.2 9.9A5.41 5.41 0 0 1 12 6.6c1.88 0 3.13.8 3.85 1.49l2.62-2.54C16.82 4.01 14.64 3.2 12 3.2c-3.46 0-6.44 1.99-8.02 4.34Z" />
          <path fill="#FBBC05" d="M3 12.2c0 1.58.38 3.07 1.06 4.38l3.58-2.76a5.4 5.4 0 0 1-.28-1.62c0-.56.1-1.1.28-1.62L4.06 7.82A8.94 8.94 0 0 0 3 12.2Z" />
          <path fill="#34A853" d="M12 21.2c2.44 0 4.48-.8 5.98-2.18l-3.48-2.7c-.94.65-2.14 1.08-3.5 1.08-2.7 0-5-1.82-5.82-4.28L4.06 16.58A9 9 0 0 0 12 21.2Z" />
        </svg>
        {signUpWithGoogleLabel}
      </a>
    </>
  );
}
