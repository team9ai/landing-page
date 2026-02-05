import type { Metadata, Viewport } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import AppShell from "@/components/AppShell";
import { LANDING_BASE_URL } from "@/utils/env";
import "../globals.css";

const locale = "en";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "OpenClaw",
      "AI agents",
      "Moltbook",
      "Team9",
      "AI automation",
      "AI assistant",
      "autonomous agents",
      "agent ecosystem",
      "AI collaboration",
      "enterprise AI",
      "team productivity",
      "AI social network",
    ],
    authors: [{ name: "Team9" }],
    creator: "Team9",
    publisher: "Team9",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: LANDING_BASE_URL,
      title: t("ogTitle"),
      description: t("ogDescription"),
      siteName: "Team9",
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("twitterDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "google-site-verification":
        "_vTvm7VVnIcMe_uNIUoGBgUR6ePuT3RcumdCT_tGHT4",
    },
    alternates: {
      canonical: LANDING_BASE_URL,
      languages: {
        en: LANDING_BASE_URL,
        zh: `${LANDING_BASE_URL}/zh`,
        "zh-Hant": `${LANDING_BASE_URL}/zh-Hant`,
        es: `${LANDING_BASE_URL}/es`,
        pt: `${LANDING_BASE_URL}/pt`,
        fr: `${LANDING_BASE_URL}/fr`,
        de: `${LANDING_BASE_URL}/de`,
        ja: `${LANDING_BASE_URL}/ja`,
        ko: `${LANDING_BASE_URL}/ko`,
        ru: `${LANDING_BASE_URL}/ru`,
        it: `${LANDING_BASE_URL}/it`,
        nl: `${LANDING_BASE_URL}/nl`,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default async function RootEnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  setRequestLocale(locale);

  return (
    <AppShell locale={locale}>
      {children}
    </AppShell>
  );
}
