import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team9 - Bring Moltbot to Your Team",
  description: "Bring a Clawd Bot to Your Team. Instantly. No setup required.",
  other: {
    "google-site-verification": "_vTvm7VVnIcMe_uNIUoGBgUR6ePuT3RcumdCT_tGHT4",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const ReportScript = (
  <script key="gtag" id="gtag">
    {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-5KBWQ1SY1F');`}
  </script>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-5KBWQ1SY1F" />
      <Head>{ReportScript}</Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
