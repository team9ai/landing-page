/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import PricingPage from "@/components/PricingPage";
import { LANDING_BASE_URL } from "@/utils/env";

export function generateStaticParams() {
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
  return {
    title: t("pricingTitle"),
    description: t("pricingDescription"),
    alternates: {
      canonical: `${LANDING_BASE_URL}/${locale}/pricing`,
    },
  };
}

export default async function Pricing({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PricingPage locale={locale} />;
}
