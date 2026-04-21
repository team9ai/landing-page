import type { Metadata, Viewport } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import AppShell from "@/components/AppShell";
import { LANDING_BASE_URL } from "@/utils/env";
import "../globals.css";

export function generateStaticParams() {
  // English is served at root via (root) route group, skip /en
  return routing.locales
    .filter((l) => l !== "en")
    .map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const isDev = process.env.NODE_ENV === "development";
  const titlePrefix = isDev ? "[DEV] " : "";

  return {
    title: `${titlePrefix}${t("title")}`,
    description: t("description"),
    keywords: [
      "AI agents",
      "AI agent team",
      "AI workspace",
      "AI workflow",
      "autonomous agents",
      "AI operations",
      "Team9.ai",
    ],
    authors: [{ name: "Team9" }],
    creator: "Team9",
    publisher: "Team9",
    openGraph: {
      type: "website",
      locale:
        locale === "zh"
          ? "zh_CN"
          : locale === "zh-Hant"
            ? "zh_TW"
            : locale === "ja"
              ? "ja_JP"
              : locale === "ko"
                ? "ko_KR"
                : "en_US",
      url: `${LANDING_BASE_URL}/${locale}`,
      title: t("ogTitle"),
      description: t("ogDescription"),
      siteName: "Team9.ai",
      images: [
        {
          url: `${LANDING_BASE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Team9.ai",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [`${LANDING_BASE_URL}/images/og-image.jpg`],
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
      canonical: `${LANDING_BASE_URL}/${locale}`,
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

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <AppShell locale={locale}>
      {children}
    </AppShell>
  );
}
