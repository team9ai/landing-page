import { Geist, Geist_Mono, Instrument_Serif, Noto_Serif_SC } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { LANDING_BASE_URL, GA_ID, GTM_ID } from "@/utils/env";
import { PostHogProvider } from "@/utils/analytics/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifSc = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export default async function AppShell({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });

  // Duration obtained from ffprobe on public/images/team9-preview.mp4 (Task 1).
  // If the mp4 is swapped, re-run ffprobe and update this value.
  const VIDEO_DURATION_ISO = "PT12S";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${LANDING_BASE_URL}#organization`,
        name: "Team9.ai",
        url: LANDING_BASE_URL,
        logo: `${LANDING_BASE_URL}/favicon.svg`,
        sameAs: [
          "https://x.com/team9_ai",
          "https://github.com/team9ai/team9",
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${LANDING_BASE_URL}#software`,
        name: "Team9.ai",
        applicationCategory: "ProjectManagement",
        operatingSystem: "Web, macOS",
        description: tMeta("description"),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": `${LANDING_BASE_URL}#organization` },
      },
      {
        "@type": "FAQPage",
        mainEntity: [1, 2, 3, 4, 5, 6].map((n) => ({
          "@type": "Question",
          name: tFaq(`q${n}`),
          acceptedAnswer: {
            "@type": "Answer",
            text: tFaq(`a${n}`),
          },
        })),
      },
      {
        "@type": "VideoObject",
        name: "Team9.ai board view",
        description:
          "Humans and agents coordinating work in a single Team9.ai workspace",
        thumbnailUrl: `${LANDING_BASE_URL}/images/team9-preview-poster.jpg`,
        contentUrl: `${LANDING_BASE_URL}/images/team9-preview.mp4`,
        uploadDate: "2026-01-15",
        duration: VIDEO_DURATION_ISO,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: LANDING_BASE_URL,
          },
        ],
      },
    ],
  };

  return (
    <html lang={locale} className="dark" style={{ colorScheme: "dark" }}>
      {/* App Router renders <head> as static html; next/head is deprecated here. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://app.team9.ai" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${notoSerifSc.variable} antialiased`}
      >
        <PostHogProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </PostHogProvider>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
    </html>
  );
}
