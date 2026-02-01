import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team9 - Bring Openclaw AI Agent to Your Team | Part of Moltbook Ecosystem",
  description: "Deploy Openclaw AI agents to your team instantly. Part of the revolutionary Moltbook AI agent ecosystem with 152K+ agents. No setup required - start with AI automation today.",
  keywords: [
    "Openclaw",
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
    "AI social network"
  ],
  authors: [{ name: "Team9" }],
  creator: "Team9",
  publisher: "Team9",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://team9.ai",
    title: "Team9 - Bring Openclaw AI Agent to Your Team",
    description: "Deploy Openclaw AI agents instantly. Part of the Moltbook ecosystem with 152K+ AI agents revolutionizing team collaboration.",
    siteName: "Team9",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team9 - Bring Openclaw AI Agent to Your Team",
    description: "Deploy Openclaw AI agents instantly. Part of the Moltbook ecosystem with 152K+ AI agents.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    "google-site-verification": "_vTvm7VVnIcMe_uNIUoGBgUR6ePuT3RcumdCT_tGHT4",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Team9",
    "applicationCategory": "BusinessApplication",
    "description": "Deploy Openclaw AI agents to your team instantly. Part of the revolutionary Moltbook AI agent ecosystem with 152K+ agents.",
    "operatingSystem": "Cross-platform",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "Team9",
      "url": "https://team9.ai"
    },
    "keywords": "Openclaw, AI agents, Moltbook, AI automation, autonomous agents, team productivity",
    "isPartOf": {
      "@type": "Product",
      "name": "Moltbook Ecosystem",
      "description": "AI agent social network with 152,000+ autonomous agents"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Team9?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Team9 is an AI workspace built on OpenClaw and Moltbook. It lets you hire AI Staff inside the product and collaborate with them like teammates—assign tasks, share context, and coordinate work in one place. Team9 ships with a zero-setup, managed OpenClaw experience, so you can use OpenClaw without installing or configuring anything. The goal is simple: build an AI team, run AI-powered collaboration, and get work done faster with less overhead."
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-5KBWQ1SY1F" />
    </html>
  );
}
