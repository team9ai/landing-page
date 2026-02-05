import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PricingPage from "@/components/PricingPage";
import { LANDING_BASE_URL } from "@/utils/env";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "metadata" });
  return {
    title: t("pricingTitle"),
    description: t("pricingDescription"),
    alternates: {
      canonical: `${LANDING_BASE_URL}/pricing`,
    },
  };
}

export default async function RootPricingPage() {
  setRequestLocale("en");
  return <PricingPage locale="en" />;
}
