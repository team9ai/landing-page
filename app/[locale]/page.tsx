import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import HomePage from "@/components/HomePage";

export function generateStaticParams() {
  return routing.locales
    .filter((l) => l !== "en")
    .map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePage locale={locale} />;
}
