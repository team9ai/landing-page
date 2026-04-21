import { Geist, Geist_Mono, Instrument_Serif, Noto_Serif_SC } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { GA_ID, GTM_ID } from "@/utils/env";
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

  return (
    <html lang={locale} className="dark" style={{ colorScheme: "dark" }}>
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
