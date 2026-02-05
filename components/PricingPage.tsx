/* eslint-disable @next/next/no-html-link-for-pages */
import { getTranslations, setRequestLocale } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { APP_BASE_URL } from "@/utils/env";

export default async function PricingPage({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pricing" });
  const headerT = await getTranslations({ locale, namespace: "header" });

  return (
    <div className="max-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1419] text-white overflow-x-hidden relative grid-background flex flex-col">
      <div className="relative z-10 flex flex-col min-h-screen" id="ctn">
        {/* Header */}
        <header className="sticky-header sticky top-0 z-50 px-6 py-3 md:px-12 lg:px-20 flex items-center justify-between">
          <a
            href={`/${locale}`}
            className="text-2xl md:text-3xl font-black tracking-[-0.04em] animate-fade-in-up bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Team9
          </a>

          <div className="flex items-center gap-4">
            <LanguageSwitcher locale={locale} />
            <a
              href={`/${locale}#contact`}
              className="group px-4 py-2 md:px-5 md:py-2.5 text-white/80 text-sm md:text-base font-semibold rounded-lg border border-white/15 bg-white/5 hover:border-amber-300/60 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/30 flex items-center gap-2"
            >
              <span className="relative z-10">{headerT("contactUs")}</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            {/* Sign In Button */}
            <a
              href={`${APP_BASE_URL}/login`}
              className="px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/30"
            >
              {headerT("signIn")}
            </a>
          </div>
        </header>

        {/* Pricing Section */}
        <main className="flex flex-col items-center px-6 py-16 md:py-24 relative">
          {/* Blurred gradient background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-bl from-blue-500/25 via-cyan-500/15 to-transparent rounded-full blur-3xl animation-delay-1000" />
            <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-tr from-purple-500/20 via-pink-500/15 to-transparent rounded-full blur-3xl animation-delay-2000" />
          </div>

          <div className="max-w-6xl w-full relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                {t("title")}
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                {t("subtitle")}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mt-6" />
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 animate-fade-in-up animation-delay-200">
              {/* Free Plan */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 hover:scale-[1.02] flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{t("freeTitle")}</h3>
                  <p className="text-white/60">
                    {t("freeDesc")}
                  </p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-black text-white">{t("freePrice")}</span>
                  <span className="text-white/60 ml-2">{t("perMonth")}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-white/80">
                      {t("freeFeature1")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-white/80">
                      {t("freeFeature2")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-white/80">{t("freeFeature3")}</span>
                  </li>
                </ul>
                <a
                  href={APP_BASE_URL}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 text-white text-center font-semibold rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  {t("getStarted")}
                </a>
              </div>

              {/* Pro Plan */}
              <div className="bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent backdrop-blur-md border-2 border-amber-400/40 rounded-3xl p-8 shadow-[0_0_50px_rgba(251,191,36,0.2)] hover:shadow-[0_0_80px_rgba(251,191,36,0.3)] transition-all duration-500 hover:scale-[1.02] flex flex-col relative">
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                    {t("mostPopular")}
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{t("proTitle")}</h3>
                  <p className="text-white/60">{t("proDesc")}</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    {t("proPrice")}
                  </span>
                  <span className="text-white/60 ml-2">{t("perMonth")}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-white/80">{t("proFeature1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-white/80">
                      <span className="text-amber-400 font-semibold">
                        {t("proFeature2Agent")}
                      </span>{" "}
                      {t("proFeature2Suffix")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-white/80">{t("proFeature3")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-white/80">
                      {t("proFeature4")}
                    </span>
                  </li>
                </ul>
                {/* Free During Beta Badge */}
                <div className="mb-4 flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-lg">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-green-400 font-semibold text-sm">
                    {t("freeDuringBeta")}
                  </span>
                </div>
                <a
                  href={APP_BASE_URL}
                  className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-white text-center font-bold rounded-xl hover:shadow-[0_10px_30px_-10px_rgba(251,191,36,0.5)] transition-all duration-300 hover:scale-105"
                >
                  {t("startFreeTrial")}
                </a>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-[1.02] flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {t("enterpriseTitle")}
                  </h3>
                  <p className="text-white/60">{t("enterpriseDesc")}</p>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-black text-white">{t("enterprisePrice")}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-white/80">{t("enterpriseFeature1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-white/80">
                      {t("enterpriseFeature2")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-white/80">
                      {t("enterpriseFeature3")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-white/80">{t("enterpriseFeature4")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-white/80">{t("enterpriseFeature5")}</span>
                  </li>
                </ul>
                <a
                  href={`/${locale}#contact`}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-center font-semibold rounded-xl hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-105"
                >
                  {t("contactSales")}
                </a>
              </div>
            </div>

            {/* FAQ or Additional Info */}
            <div className="mt-20 text-center animate-fade-in-up animation-delay-400">
              <p className="text-white/60 mb-4">
                {t("faqQuestion")}
              </p>
              <a
                href={`/${locale}#contact`}
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                {t("faqLink")}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 md:px-12 lg:px-20 py-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              {t("footerCopyright")}
            </p>
            <div className="flex items-center gap-6">
              <a
                href={`/${locale}`}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                {t("footerHome")}
              </a>
              <a
                href={`/${locale}#contact`}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                {t("footerContact")}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
