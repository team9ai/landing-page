import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PricingPage from "@/components/PricingPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "metadata" });
  return {
    title: t("pricingTitle"),
    description: t("pricingDescription"),
    alternates: {
      canonical: "https://team9.ai/pricing",
    },
  };
}

export default async function RootPricingPage() {
  setRequestLocale("en");
  return <PricingPage locale="en" />;
}
