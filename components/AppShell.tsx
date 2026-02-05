import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, getMessages } from "next-intl/server";
import Head from "next/head";
import { LANDING_BASE_URL, GA_ID, GTM_ID } from "@/utils/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function AppShell({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "metadata" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Team9",
    applicationCategory: "BusinessApplication",
    description: t("description"),
    operatingSystem: "Cross-platform",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1",
    },
    author: {
      "@type": "Organization",
      name: "Team9",
      url: LANDING_BASE_URL,
    },
    keywords:
      "OpenClaw, AI agents, Moltbook, AI automation, autonomous agents, team productivity",
    isPartOf: {
      "@type": "Product",
      name: "Moltbook Ecosystem",
      description: "AI agent social network with 152,000+ autonomous agents",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Team9?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Team9 is an AI workspace built on OpenClaw and Moltbook. It lets you hire AI Staff inside the product and collaborate with them like teammates—assign tasks, share context, and coordinate work in one place. Team9 ships with a zero-setup, managed OpenClaw experience, so you can use OpenClaw without installing or configuring anything. The goal is simple: build an AI team, run AI-powered collaboration, and get work done faster with less overhead.",
        },
      },
    ],
  };

  return (
    <html lang={locale} className="dark" style={{ colorScheme: "dark" }}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
    </html>
  );
}
