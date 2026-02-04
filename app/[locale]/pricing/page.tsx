/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PricingPage from "@/components/PricingPage";

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
      canonical: `https://team9.ai/${locale}/pricing`,
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
