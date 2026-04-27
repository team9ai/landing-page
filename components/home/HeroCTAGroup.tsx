"use client";

import {
  GoogleOAuthProvider,
  GoogleLogin,
  type CredentialResponse,
} from "@react-oauth/google";
import { useLocale } from "next-intl";
import { useEffect } from "react";
import DownloadButton from "@/components/DownloadButton";
import { usePostHogClient } from "@/utils/analytics/provider";
import { captureWithBridge } from "@/utils/analytics/capture";
import { EVENTS } from "@/utils/analytics/events";
import { APP_BASE_URL, GOOGLE_CLIENT_ID } from "@/utils/env";

interface Props {
  downloadLabel: string;
}

// Map next-intl locale to the BCP-47 tag Google Identity Services expects.
// Google needs the script subtag for Chinese; defaults to Brazilian Portuguese
// since that covers the majority of pt speakers.
const NEXT_INTL_TO_GOOGLE_LOCALE: Record<string, string> = {
  en: "en",
  zh: "zh-CN",
  "zh-Hant": "zh-TW",
  es: "es",
  pt: "pt-BR",
  fr: "fr",
  de: "de",
  ja: "ja",
  ko: "ko",
  ru: "ru",
  it: "it",
  nl: "nl",
};

function GoogleSignupButton() {
  const client = usePostHogClient();

  // Google's GIS button renders inside a cross-origin iframe, so its clicks
  // never bubble to React. Detect click intent via window blur + activeElement
  // check: clicking (or keyboard-focusing) the iframe shifts focus into it.
  useEffect(() => {
    const handleBlur = () => {
      const el = document.activeElement;
      if (
        el?.tagName === "IFRAME" &&
        (el as HTMLIFrameElement).src.includes("accounts.google.com")
      ) {
        captureWithBridge(client, EVENTS.HOME_SIGNUP_BUTTON_CLICKED, {
          button_location: "hero",
        });
      }
    };
    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, [client]);

  const handleSuccess = (resp: CredentialResponse) => {
    if (!resp.credential) return;
    // Hand the Google ID token off to app.team9.ai via URL fragment so the
    // existing /login flow can exchange it for a session in localStorage.
    // Fragment (not query) keeps the token out of server access logs and the
    // HTTP referer header; app.team9.ai's login page strips the hash on read.
    const url = `${APP_BASE_URL}/login#google_credential=${encodeURIComponent(resp.credential)}`;
    window.location.assign(url);
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      text="signup_with"
      theme="outline"
      size="large"
      shape="rectangular"
      width="220"
    />
  );
}

export default function HeroCTAGroup({ downloadLabel }: Props) {
  const locale = useLocale();
  const googleLocale = NEXT_INTL_TO_GOOGLE_LOCALE[locale] ?? "en";

  return (
    <>
      <DownloadButton
        label={downloadLabel}
        className="inline-flex h-10 w-55 items-center justify-center gap-3 rounded-sm bg-white px-4 text-[14px] font-medium text-[#0a0d12] transition-colors hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:opacity-60"
      />
      {GOOGLE_CLIENT_ID ? (
        <GoogleOAuthProvider
          clientId={GOOGLE_CLIENT_ID}
          locale={googleLocale}
        >
          <GoogleSignupButton />
        </GoogleOAuthProvider>
      ) : null}
    </>
  );
}
