import type { MetadataRoute } from "next";
import { LANDING_BASE_URL } from "@/utils/env";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

function urlFor(locale: string, path: string): string {
  return locale === "en"
    ? `${LANDING_BASE_URL}${path}`
    : `${LANDING_BASE_URL}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: {
    path: string;
    changeFrequency: "monthly" | "yearly";
    priority: number;
  }[] = [
    { path: "", changeFrequency: "monthly", priority: 1.0 },
    { path: "/pricing", changeFrequency: "yearly", priority: 0.8 },
  ];

  return paths.flatMap(({ path, changeFrequency, priority }) =>
    routing.locales.map((locale) => ({
      url: urlFor(locale, path),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, urlFor(l, path)]),
        ),
      },
    })),
  );
}
