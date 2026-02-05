import { getTranslations, setRequestLocale } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { APP_BASE_URL } from "@/utils/env";

export default async function HomePage({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const tHeader = await getTranslations("header");
  const tHero = await getTranslations("hero");
  const tMoltbook = await getTranslations("moltbook");
  const tTeam9 = await getTranslations("whatIsTeam9");
  const tOpenClaw = await getTranslations("whatIsOpenClaw");
  const tFeatures = await getTranslations("keyFeatures");
  const tViral = await getTranslations("whyViral");
  const tUseCases = await getTranslations("useCases");
  const tArch = await getTranslations("architecture");
  const tInstall = await getTranslations("installation");
  const tSkills = await getTranslations("skills");
  const tSecurity = await getTranslations("security");
  const tFaq = await getTranslations("faq");
  const tComparison = await getTranslations("comparison");
  const tCta = await getTranslations("cta");
  const tFooter = await getTranslations("footer");

  return (
    <div className="max-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1419] text-white overflow-x-hidden relative grid-background flex flex-col">
      {/* Noise texture */}
      {/* <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"

        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      /> */}

      <div className="relative z-10 flex flex-col min-h-screen" id="ctn">
        {/* Header */}
        <header className="sticky-header sticky top-0 z-50 px-6 py-3 md:px-12 lg:px-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl md:text-3xl font-black tracking-[-0.04em] animate-fade-in-up bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
              Team9
            </div>
            <a
              href={`/${locale}#contact`}
              className="text-white/60 hover:text-white text-sm md:text-base font-medium transition-colors duration-200"
            >
              {tHeader("contactUs")}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher locale={locale} />
            <a
              href={`${APP_BASE_URL}/login`}
              className="px-4 py-2 md:px-5 md:py-2.5 text-white/70 text-sm md:text-base font-semibold hover:text-white transition-colors duration-200"
            >
              {tHeader("signIn")}
            </a>
            <a
              href={APP_BASE_URL}
              className="px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/30"
            >
              {tHeader("signUp")}
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <main
          className="flex-1 flex flex-col items-center justify-center px-6 py-8 md:py-24 relative"
          id="main"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-bl from-blue-500/25 via-cyan-500/15 to-transparent rounded-full blur-3xl animation-delay-1000" />
            <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-tr from-purple-500/20 via-pink-500/15 to-transparent rounded-full blur-3xl animation-delay-2000" />
          </div>
          <div className="max-w-6xl w-full text-center space-y-8 md:space-y-10 relative z-10">
            <a
              href="https://github.com/team9ai/team9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/15 rounded-full animate-fade-in-up hover:border-amber-400/40 hover:bg-amber-500/10 transition-all duration-300"
            >
              <svg
                className="w-5 h-5 text-white/70"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-sm md:text-base font-semibold text-white/80">
                {tHero("deployOpenSource")}
              </span>
            </a>
            <div className="relative animate-fade-in-up animation-delay-100">
              <h1 className="text-[clamp(2.5rem,12vw,7rem)] font-black leading-[1.1] tracking-[-0.03em]">
                <span className="block text-white [text-shadow:_0_2px_30px_rgba(0,0,0,0.5),_0_4px_60px_rgba(0,0,0,0.3)]">
                  {tHero("headline1")}{" "}
                  <span className="inline-block bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent [text-shadow:none] drop-shadow-[0_2px_20px_rgba(251,191,36,0.3)]">
                    OpenClaw
                  </span>
                  <span className="text-white">{" "}{tHero("headline2")}</span>
                </span>
                <span className="block text-white/90 [text-shadow:_0_2px_30px_rgba(0,0,0,0.5),_0_4px_60px_rgba(0,0,0,0.3)]">
                  {tHero("headline3")}
                </span>
              </h1>
            </div>
            <div className="-mt-2 md:-mt-4 animate-fade-in-up animation-delay-200 flex justify-center">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/15 border border-amber-400/30 text-lg md:text-xl font-semibold text-amber-300">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                {tHero("badge")}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-3 pt-2 animate-fade-in-up animation-delay-300">
              <a href={APP_BASE_URL}>
                <button
                  aria-label="Start for free on Team9"
                  className="group relative px-9 py-4 md:px-11 md:py-5 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-white text-base md:text-lg font-bold rounded-xl md:rounded-2xl touch-action-manipulation transition-all duration-300 hover:scale-105 hover:shadow-[0_18px_50px_-14px_rgba(251,191,36,0.55)] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50 flex items-center gap-2"
                >
                  {tHero("startForFree")}
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </a>
              <p className="text-sm text-white/50">
                {tHero("alreadyHaveAccount")}{" "}
                <a
                  href={`${APP_BASE_URL}/login`}
                  className="text-amber-400 hover:text-amber-300 font-medium underline underline-offset-2 transition-colors duration-200"
                >
                  {tHero("signIn")}
                </a>
              </p>

              {/* <button
                aria-label="View demo"
                className="px-10 py-4 md:px-12 md:py-5 bg-white/5 backdrop-blur-sm border border-white/10 text-white text-base md:text-lg font-semibold rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                View Demo
              </button> */}
            </div>

            {/* Social Proof */}
            {/* <div className="pt-8 animate-fade-in-up animation-delay-400">
              <p className="text-sm text-white/40 mb-6">
                Trusted by innovative teams worldwide
              </p>
            </div> */}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bg.webp" id="bg" alt="" />
        </main>

        {/* Moltbook Ecosystem Badge */}
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent backdrop-blur-md border border-amber-400/20 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(251,191,36,0.15)] hover:shadow-[0_0_80px_rgba(251,191,36,0.25)] transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-12 h-12 md:w-14 md:h-14 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                      {tMoltbook("label")}
                    </span>
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                    {tMoltbook("title")}
                  </h3>
                  <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
                    {tMoltbook("description")}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-white/70">
                      <svg
                        className="w-5 h-5 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span className="font-semibold">
                        {tMoltbook("activeAgents")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <svg
                        className="w-5 h-5 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-semibold">
                        {tMoltbook("humanObservers")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshot Section */}
        <div
          className="px-6 md:px-12 lg:px-20 pb-20 animate-fade-in-up animation-delay-500"
          id="sc"
        >
          <div className="max-w-6xl mx-auto perspective-container">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)] border border-white/10 hover:border-amber-500/30 transition-all duration-500 group scroll-rotate-element">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              {/*eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/screenshot.webp"
                alt="OpenClaw Terminal Interface"
                width={1920}
                height={1080}
                className="w-full h-auto relative z-10"
              />
            </div>
          </div>
        </div>

        {/* What is Team9 */}
        <section className="px-6 md:px-12 lg:px-20 py-32 mt-[-20svh]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                {tTeam9("title")}
              </h2>
              <p className="text-lg text-white/70 max-w-4xl mx-auto leading-relaxed">
                {tTeam9("subtitle")}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mt-6" />
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-xl text-white/80 leading-relaxed">
                  {tTeam9.rich("description1", {
                    bold: (chunks) => (
                      <span className="text-amber-400 font-bold">{chunks}</span>
                    ),
                  })}
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  {tTeam9.rich("description2", {
                    highlight: (chunks) => (
                      <span className="text-yellow-400 font-semibold">
                        {chunks}
                      </span>
                    ),
                  })}
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  {tTeam9("description3")}
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:scale-[1.02]">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  {tTeam9("whyTeam9")}
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                      <svg
                        className="w-5 h-5 text-amber-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg mb-1">
                        {tTeam9("feature1Title")}
                      </p>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {tTeam9("feature1Desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg mb-1">
                        {tTeam9("feature2Title")}
                      </p>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {tTeam9("feature2Desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                      <svg
                        className="w-5 h-5 text-orange-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg mb-1">
                        {tTeam9("feature3Title")}
                      </p>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {tTeam9("feature3Desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is OpenClaw */}
        <section className="px-6 md:px-12 lg:px-20 py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                {tOpenClaw("title")}
              </h2>
              <p className="text-lg text-white/70 max-w-4xl mx-auto leading-relaxed">
                {tOpenClaw("subtitle")}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mt-6" />
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-xl text-white/80 leading-relaxed">
                  {tOpenClaw.rich("description1", {
                    bold: (chunks) => (
                      <span className="text-amber-400 font-bold">{chunks}</span>
                    ),
                  })}
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  {tOpenClaw("description2")}
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  {tOpenClaw.rich("description3", {
                    highlight: (chunks) => (
                      <span className="text-yellow-400 font-semibold">
                        {chunks}
                      </span>
                    ),
                  })}
                </p>
                <p className="text-base text-white/70 leading-relaxed">
                  {tOpenClaw("description4")}
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:scale-[1.02]">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  {tOpenClaw("principlesTitle")}
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                      <svg
                        className="w-5 h-5 text-amber-400"
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
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg mb-1">
                        {tOpenClaw("principle1Title")}
                      </p>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {tOpenClaw("principle1Desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                      <svg
                        className="w-5 h-5 text-yellow-400"
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
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg mb-1">
                        {tOpenClaw("principle2Title")}
                      </p>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {tOpenClaw("principle2Desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                      <svg
                        className="w-5 h-5 text-orange-400"
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
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg mb-1">
                        {tOpenClaw("principle3Title")}
                      </p>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {tOpenClaw("principle3Desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="px-6 md:px-12 lg:px-20 py-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  {tFeatures("title")}
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg
                    className="w-9 h-9 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors">
                  {tFeatures("feature1Title")}
                </h3>
                <p className="text-white/80 leading-relaxed text-lg">
                  {tFeatures("feature1Desc")}
                </p>
              </div>
              <div className="group bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500/30 to-orange-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg
                    className="w-9 h-9 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors">
                  {tFeatures("feature2Title")}
                </h3>
                <p className="text-white/80 leading-relaxed text-lg">
                  {tFeatures("feature2Desc")}
                </p>
              </div>
              <div className="group bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/30 to-orange-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg
                    className="w-9 h-9 text-orange-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors">
                  {tFeatures("feature3Title")}
                </h3>
                <p className="text-white/80 leading-relaxed text-lg">
                  {tFeatures("feature3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why OpenClaw Went Viral */}
        <section className="px-6 md:px-12 lg:px-20 py-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {tViral("title")}
              </h2>
              <p className="text-xl text-white/75 max-w-3xl mx-auto">
                {tViral("subtitle")}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mt-6" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-amber-500/30 transition-all duration-500">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {tViral("card1Title")}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {tViral("card1Desc")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-yellow-500/30 transition-all duration-500">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-yellow-500/30 to-yellow-600/20 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {tViral("card2Title")}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {tViral("card2Desc")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-orange-500/30 transition-all duration-500">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500/30 to-orange-600/20 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-orange-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {tViral("card3Title")}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {tViral("card3Desc")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-amber-500/30 transition-all duration-500">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-amber-500/30 to-yellow-600/20 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {tViral("card4Title")}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {tViral("card4Desc")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-500/[0.15] to-orange-500/[0.10] backdrop-blur-md border-2 border-amber-400/40 rounded-3xl p-8 hover:border-amber-400/60 transition-all duration-500 shadow-[0_0_40px_rgba(251,191,36,0.2)] hover:shadow-[0_0_60px_rgba(251,191,36,0.3)] md:col-span-2">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-white">
                        {tViral("card5Title")}
                      </h3>
                      <span className="px-3 py-1 bg-amber-400/30 text-amber-200 text-xs font-bold rounded-full border border-amber-400/50">
                        {tViral("card5Badge")}
                      </span>
                    </div>
                    <p className="text-white/90 leading-relaxed mb-4">
                      {tViral("card5Desc1")}
                    </p>
                    <p className="text-white/90 leading-relaxed mb-4">
                      {tViral("card5Desc2")}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-amber-400/30">
                        <svg
                          className="w-5 h-5 text-amber-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <span className="text-white/90 font-semibold">
                          {tViral("card5Agents")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-amber-400/30">
                        <svg
                          className="w-5 h-5 text-amber-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-white/90 font-semibold">
                          {tViral("card5Observers")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-amber-400/30">
                        <svg
                          className="w-5 h-5 text-amber-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-white/90 font-semibold">
                          {tViral("card5Growth")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="px-6 md:px-12 lg:px-20 py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
                {tUseCases("title")}
              </h2>
              <p className="text-xl text-white/75 max-w-2xl mx-auto">
                {tUseCases("subtitle")}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group bg-gradient-to-br from-amber-500/10 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-amber-400/50 hover:bg-amber-500/[0.15] transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                    <svg
                      className="w-6 h-6 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-300 mb-3">
                      {tUseCases("case1Title")}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {tUseCases("case1Desc")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="group bg-gradient-to-br from-amber-500/10 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-yellow-400/50 hover:bg-amber-500/[0.15] transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                    <svg
                      className="w-6 h-6 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-yellow-300 mb-3">
                      {tUseCases("case2Title")}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {tUseCases("case2Desc")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="group bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-orange-400/50 hover:bg-orange-500/[0.15] transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                    <svg
                      className="w-6 h-6 text-orange-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-orange-300 mb-3">
                      {tUseCases("case3Title")}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {tUseCases("case3Desc")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="group bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-amber-400/50 hover:bg-orange-500/[0.15] transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                    <svg
                      className="w-6 h-6 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-yellow-200 mb-3">
                      {tUseCases("case4Title")}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {tUseCases("case4Desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="px-6 md:px-12 lg:px-20 py-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
          <div className="max-w-4xl mx-auto relative">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {tArch("title")}
              </h2>
              <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
                {tArch("subtitle")}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 mx-auto rounded-full mt-6" />
            </div>
            <div className="space-y-8">
              <div className="group flex gap-6 items-start bg-gradient-to-br from-amber-500/10 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-amber-400/50 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-2xl flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform">
                  <span className="text-amber-300 font-bold text-xl">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {tArch("step1Title")}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-lg mb-3">
                    {tArch("step1Desc1")}
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    {tArch("step1Desc2")}
                  </p>
                </div>
              </div>
              <div className="group flex gap-6 items-start bg-gradient-to-br from-amber-500/10 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-yellow-400/50 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-amber-500/30 to-orange-600/20 rounded-2xl flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform">
                  <span className="text-yellow-300 font-bold text-xl">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">
                    {tArch("step2Title")}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-lg mb-3">
                    {tArch("step2Desc1")}
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    {tArch("step2Desc2")}
                  </p>
                </div>
              </div>
              <div className="group flex gap-6 items-start bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-orange-400/50 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500/30 to-orange-600/20 rounded-2xl flex items-center justify-center border border-orange-500/30 group-hover:scale-110 transition-transform">
                  <span className="text-orange-300 font-bold text-xl">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors">
                    {tArch("step3Title")}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-lg mb-3">
                    {tArch("step3Desc1")}
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    {tArch("step3Desc2")}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                {tArch("networkTitle")}
              </h3>
              <p className="text-white/80 leading-relaxed mb-4">
                {tArch.rich("networkDesc1", {
                  code: (chunks) => (
                    <code className="px-2 py-1 bg-black/30 rounded text-blue-300">
                      {chunks}
                    </code>
                  ),
                })}
              </p>
              <p className="text-white/70 leading-relaxed">
                {tArch("networkDesc2")}
              </p>
            </div>
          </div>
        </section>

        {/* Installation Guide */}
        <section className="px-6 md:px-12 lg:px-20 py-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {tInstall("title")}
              </h2>
              <p className="text-xl text-white/75 max-w-3xl mx-auto">
                {tInstall("subtitle")}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mt-6" />
            </div>
            <div className="mb-16 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-amber-300 mb-6 flex items-center gap-3">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                {tInstall("prerequisitesTitle")}
              </h3>
              <ul className="space-y-3 text-white/80 text-lg">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-amber-400 rounded-full" />
                  {tInstall("prereq1")}
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                  {tInstall("prereq2")}
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full" />
                  {tInstall("prereq3")}
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-amber-400 rounded-full" />
                  {tInstall("prereq4")}
                </li>
              </ul>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-amber-500/10 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-amber-400/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {tInstall("macosTitle")}
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {tInstall("macosDesc")}
                </p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-green-400 space-y-2">
                  <div># Install nvm</div>
                  <div className="text-white/50 break-all">
                    curl -o-
                    https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh
                    | bash
                  </div>
                  <div className="mt-3"># Install Node 22</div>
                  <div className="text-white/50">
                    nvm install 22 && nvm use 22
                  </div>
                  <div className="mt-3"># Install OpenClaw</div>
                  <div className="text-white/50 break-all">
                    curl -fsSL https://clawd.bot/install.sh | bash
                  </div>
                  <div className="mt-3"># Start daemon</div>
                  <div className="text-white/50">
                    openclaw onboard --install-daemon
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.705-.395 2.524.016.87.14 1.706.469 2.459 1.005 2.291 3.614 3.154 5.63 2.163.667-.328 1.354-.686 2.021-1.013l.64-.33c.331-.172.583-.245.78-.152.31.15.479.49.541.735.083.328-.077.639-.319.935-.3.369-.793.849-1.845 1.862C9.8 22.486 9.78 24 11.804 24c.363 0 .694-.037 1.02-.108 2.419-.528 4.031-2.669 4.889-4.684.869-2.043 1.029-4.116.509-5.554-.518-1.428-1.624-2.512-2.896-2.853-.758-.203-1.527-.169-2.174.115-.647.284-1.17.854-1.478 1.605" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {tInstall("linuxTitle")}
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {tInstall("linuxDesc")}
                </p>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>{tInstall("linuxItem1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>{tInstall("linuxItem2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>{tInstall("linuxItem3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>{tInstall("linuxItem4")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>{tInstall("linuxItem5")}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-orange-400/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-orange-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {tInstall("windowsTitle")}
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {tInstall("windowsDesc")}
                </p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-green-400 space-y-2">
                  <div># Install WSL2</div>
                  <div className="text-white/50">wsl --install</div>
                  <div className="mt-3"># Inside WSL2:</div>
                  <div className="text-white/50">cd ~</div>
                  <div className="text-white/50 break-all">
                    curl -o-
                    https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh
                    | bash
                  </div>
                  <div className="text-white/50">
                    nvm install 22 && nvm use 22
                  </div>
                </div>
                <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <p className="text-amber-300 text-xs font-semibold flex items-start gap-2">
                    <span>&#9888;&#65039;</span>
                    <span>{tInstall("windowsWarning")}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Automation */}
        <section className="px-6 md:px-12 lg:px-20 py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
                {tSkills("title")}
              </h2>
              <p className="text-xl text-white/75 max-w-3xl mx-auto">
                {tSkills("subtitle")}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mt-6" />
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-amber-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {tSkills("marketplaceTitle")}
                  </h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  {tSkills("marketplaceDesc")}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-amber-300">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                    {tSkills("marketplaceItem1")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-yellow-300">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                    {tSkills("marketplaceItem2")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-orange-300">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                    {tSkills("marketplaceItem3")}
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-yellow-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {tSkills("scheduledTitle")}
                  </h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  {tSkills("scheduledDesc")}
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 text-sm font-mono mt-0.5">
                      08:00
                    </span>
                    <span className="text-white/70 text-sm">
                      {tSkills("scheduleItem1")}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 text-sm font-mono mt-0.5">
                      */15 *
                    </span>
                    <span className="text-white/70 text-sm">
                      {tSkills("scheduleItem2")}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 text-sm font-mono mt-0.5">
                      22:00
                    </span>
                    <span className="text-white/70 text-sm">
                      {tSkills("scheduleItem3")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 border border-amber-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-amber-300 mb-4">
                {tSkills("customTitle")}
              </h3>
              <p className="text-white/80 leading-relaxed mb-4">
                {tSkills.rich("customDesc", {
                  code: (chunks) => (
                    <code className="px-2 py-1 bg-black/30 rounded text-amber-300">
                      {chunks}
                    </code>
                  ),
                })}
              </p>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <svg
                  className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{tSkills("customTip")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="px-6 md:px-12 lg:px-20 py-32 bg-gradient-to-b from-transparent via-red-500/[0.03] to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
                {tSecurity("title")}
              </h2>
              <p className="text-xl text-white/75 max-w-3xl mx-auto">
                {tSecurity("subtitle")}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 mx-auto rounded-full mt-6" />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-red-500/10 to-transparent backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 hover:border-red-400/50 transition-all duration-300">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-300 mb-3">
                  {tSecurity("card1Title")}
                </h3>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {tSecurity("card1Desc")}
                </p>
                <ul className="space-y-2 text-xs text-white/60">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    <span>{tSecurity("card1Item1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    <span>{tSecurity("card1Item2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    <span>{tSecurity("card1Item3")}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6 hover:border-orange-400/50 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-orange-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-orange-300 mb-3">
                  {tSecurity("card2Title")}
                </h3>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {tSecurity("card2Desc")}
                </p>
                <ul className="space-y-2 text-xs text-white/60">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">•</span>
                    <span>{tSecurity("card2Item1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">•</span>
                    <span>{tSecurity("card2Item2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">•</span>
                    <span>{tSecurity("card2Item3")}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-amber-500/10 to-transparent backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6 hover:border-amber-400/50 transition-all duration-300">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-amber-300 mb-3">
                  {tSecurity("card3Title")}
                </h3>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {tSecurity("card3Desc")}
                </p>
                <ul className="space-y-2 text-xs text-white/60">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{tSecurity("card3Item1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{tSecurity("card3Item2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{tSecurity("card3Item3")}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg
                  className="w-7 h-7 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                {tSecurity("baselineTitle")}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">&#10003;</span>
                    <span>{tSecurity("baseline1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">&#10003;</span>
                    <span>{tSecurity("baseline2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">&#10003;</span>
                    <span>{tSecurity("baseline3")}</span>
                  </li>
                </ul>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">&#10003;</span>
                    <span>{tSecurity("baseline4")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">&#10003;</span>
                    <span>{tSecurity("baseline5")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">&#10003;</span>
                    <span>{tSecurity("baseline6")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-12 lg:px-20 py-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
                {tFaq("title")}
              </h2>
              <p className="text-xl text-white/75">{tFaq("subtitle")}</p>
            </div>
            <div className="space-y-4">
              {(
                [
                  ["q1", "a1", "amber"],
                  ["q2", "a2", "yellow"],
                  ["q3", "a3", "orange"],
                  ["q4", "a4", "yellow"],
                  ["q5", "a5", "amber"],
                  ["q6", "a6", "yellow"],
                  ["q7", "a7", "orange"],
                  ["q8", "a8", "amber"],
                  ["q9", "a9", "yellow"],
                ] as const
              ).map(([qKey, aKey, color]) => (
                <details
                  key={qKey}
                  className={`group bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-${color}-500/30 transition-all duration-300`}
                >
                  <summary
                    className={`text-lg font-bold text-white cursor-pointer list-none flex items-center justify-between p-6 hover:text-${color}-300 transition-colors`}
                  >
                    {tFaq(qKey)}
                    <svg
                      className="w-6 h-6 text-white/60 group-open:rotate-180 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-white/80 leading-relaxed text-lg border-t border-white/10 pt-4">
                      {tFaq(aKey)}
                    </p>
                  </div>
                </details>
              ))}
              <details className="group bg-gradient-to-br from-amber-500/[0.12] to-orange-500/[0.08] backdrop-blur-md border border-amber-400/30 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all duration-300 shadow-[0_0_30px_rgba(251,191,36,0.1)]">
                <summary className="text-lg font-bold text-white cursor-pointer list-none flex items-center justify-between p-6 hover:text-amber-300 transition-colors">
                  {tFaq("q10")}
                  <svg
                    className="w-6 h-6 text-white/60 group-open:rotate-180 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/80 leading-relaxed text-lg border-t border-amber-400/20 pt-4 mb-4">
                    {tFaq("a10Desc1")}
                  </p>
                  <p className="text-white/80 leading-relaxed text-lg mb-4">
                    {tFaq("a10Desc2")}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-sm rounded-full border border-amber-400/30">
                      {tFaq("a10Agents")}
                    </span>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-sm rounded-full border border-amber-400/30">
                      {tFaq("a10Observers")}
                    </span>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-sm rounded-full border border-amber-400/30">
                      {tFaq("a10Network")}
                    </span>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* OpenClaw vs Other Frameworks */}
        <section className="px-6 md:px-12 lg:px-20 py-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
                {tComparison("title")}
              </h2>
              <p className="text-xl text-white/75 max-w-3xl mx-auto">
                {tComparison("subtitle")}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mt-6" />
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-black text-amber-300">
                        CB
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-amber-300 mb-3 flex items-center gap-3">
                      OpenClaw
                      <span className="text-sm font-normal text-white/60">
                        ({tComparison("openclawLabel")})
                      </span>
                    </h3>
                    <div className="space-y-3 text-white/80 leading-relaxed">
                      <p>
                        <span className="font-semibold text-white">
                          {tComparison("philosophy")}
                        </span>{" "}
                        {tComparison("openclawPhilosophy")}
                      </p>
                      <p>
                        <span className="font-semibold text-white">
                          {tComparison("bestFor")}
                        </span>{" "}
                        {tComparison("openclawBestFor")}
                      </p>
                      <p>
                        <span className="font-semibold text-white">
                          {tComparison("uniqueAdvantage")}
                        </span>{" "}
                        <span className="text-amber-300">
                          {tComparison("openclawUniqueAdvantage")}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold text-white">
                          {tComparison("tradeoffs")}
                        </span>{" "}
                        {tComparison("openclawTradeoffs")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-black text-blue-300">
                        AG
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-blue-300 mb-3 flex items-center gap-3">
                      AutoGPT / AgentGPT
                      <span className="text-sm font-normal text-white/60">
                        ({tComparison("autogptLabel")})
                      </span>
                    </h3>
                    <div className="space-y-3 text-white/80 leading-relaxed">
                      <p>
                        <span className="font-semibold text-white">
                          {tComparison("philosophy")}
                        </span>{" "}
                        {tComparison("autogptPhilosophy")}
                      </p>
                      <p>
                        <span className="font-semibold text-white">
                          {tComparison("bestFor")}
                        </span>{" "}
                        {tComparison("autogptBestFor")}
                      </p>
                      <p>
                        <span className="font-semibold text-white">
                          {tComparison("tradeoffs")}
                        </span>{" "}
                        {tComparison("autogptTradeoffs")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-black text-green-300">
                        LC
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-green-300 mb-3 flex items-center gap-3">
                      LangChain Agents
                      <span className="text-sm font-normal text-white/60">
                        ({tComparison("langchainLabel")})
                      </span>
                    </h3>
                    <div className="space-y-3 text-white/80 leading-relaxed">
                      <p>
                        <span className="font-semibold text-white">
                          {tComparison("philosophy")}
                        </span>{" "}
                        {tComparison("langchainPhilosophy")}
                      </p>
                      <p>
                        <span className="font-semibold text-white">
                          {tComparison("bestFor")}
                        </span>{" "}
                        {tComparison("langchainBestFor")}
                      </p>
                      <p>
                        <span className="font-semibold text-white">
                          {tComparison("tradeoffs")}
                        </span>{" "}
                        {tComparison("langchainTradeoffs")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-purple-600/20 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-black text-purple-300">
                        &#9729;&#65039;
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-purple-300 mb-3 flex items-center gap-3">
                      Cloud AI Assistants
                      <span className="text-sm font-normal text-white/60">
                        ({tComparison("cloudLabel")})
                      </span>
                    </h3>
                    <div className="space-y-3 text-white/80 leading-relaxed">
                      <p>
                        <span className="font-semibold text-white">
                          {tComparison("philosophy")}
                        </span>{" "}
                        {tComparison("cloudPhilosophy")}
                      </p>
                      <p>
                        <span className="font-semibold text-white">
                          {tComparison("bestFor")}
                        </span>{" "}
                        {tComparison("cloudBestFor")}
                      </p>
                      <p>
                        <span className="font-semibold text-white">
                          {tComparison("tradeoffs")}
                        </span>{" "}
                        {tComparison("cloudTradeoffs")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 border border-amber-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-amber-300 mb-4 flex items-center gap-3">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {tComparison("advantageTitle")}
              </h3>
              <p className="text-white/80 leading-relaxed text-lg mb-4">
                {tComparison("advantageDesc1")}
              </p>
              <p className="text-white/80 leading-relaxed text-lg">
                {tComparison.rich("advantageDesc2", {
                  highlight: (chunks) => (
                    <span className="text-amber-300 font-semibold">
                      {chunks}
                    </span>
                  ),
                })}
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 md:px-12 lg:px-20 py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-yellow-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-tl from-yellow-500/20 via-amber-500/20 to-orange-500/20 blur-3xl animate-pulse-slow" />
          <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm text-white/90 mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {tCta("readyToDeploy")}
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              {tCta("title")}
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {tCta("subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                aria-label="Get started with Team9"
                className="group relative px-12 py-6 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-white text-xl font-bold rounded-full touch-action-manipulation transition-all duration-300 hover:scale-105 hover:shadow-[0_30px_80px_-20px_rgba(168,85,247,0.8)] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50 flex items-center gap-3"
              >
                {tCta("getStarted")}
                <svg
                  className="w-6 h-6 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              {/* <button
                aria-label="Contact sales"
                className="px-12 py-6 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xl font-semibold rounded-full hover:bg-white/15 hover:border-white/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
              >
                Talk to Sales
              </button> */}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          id="contact"
          className="px-6 md:px-12 lg:px-20 py-16 border-t border-white/10 bg-black/20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div>
                <div className="text-3xl font-black mb-4 text-white">Team9</div>
                <p className="text-white/60 leading-relaxed mb-6">
                  {tFooter("tagline")}
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:hello@team9.ai"
                    className="flex items-center gap-3 text-white/80 hover:text-amber-400 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span>{tFooter("email")}</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-white/80 hover:text-amber-400 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <span>{tFooter("chatWithUs")}</span>
                  </a>
                </div>
              </div>
              {/* <div>
                <h4 className="text-white font-bold mb-4">Product</h4>
                <ul className="space-y-2 text-white/60">
                  <li className="hover:text-amber-400 transition-colors cursor-pointer">
                    Features
                  </li>
                  <li className="hover:text-amber-400 transition-colors cursor-pointer">
                    Documentation
                  </li>
                  <li className="hover:text-amber-400 transition-colors cursor-pointer">
                    Pricing
                  </li>
                  <li className="hover:text-amber-400 transition-colors cursor-pointer">
                    Security
                  </li>
                </ul>
              </div> */}
              {/* <div>
                <h4 className="text-white font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-white/60">
                  <li className="hover:text-amber-400 transition-colors cursor-pointer">
                    About
                  </li>
                  <li className="hover:text-amber-400 transition-colors cursor-pointer">
                    Blog
                  </li>
                  <li className="hover:text-amber-400 transition-colors cursor-pointer">
                    Contact
                  </li>
                  <li className="hover:text-amber-400 transition-colors cursor-pointer">
                    Careers
                  </li>
                </ul>
              </div> */}
              <div>
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  {tFooter("ecosystemTitle")}
                </h4>
                <ul className="space-y-2 text-white/60">
                  <li className="hover:text-amber-400 transition-colors">
                    <a
                      href="https://www.moltbook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <span>{tFooter("moltbookNetwork")}</span>
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="text-white/50 text-sm">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
                      {tFooter("activeAgents")}
                    </span>
                  </li>
                  <li className="text-white/50 text-sm">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
                      {tFooter("humanObservers")}
                    </span>
                  </li>
                  <li className="hover:text-amber-400 transition-colors cursor-pointer mt-3">
                    {tFooter("openclawCommunity")}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">
                  {tFooter("contactTitle")}
                </h4>
                <ul className="space-y-2 text-white/60">
                  <li className="hover:text-amber-400 transition-colors cursor-pointer">
                    <a href="https://discord.gg/edMATqpU" target="_blank">
                      {tFooter("discord")}
                    </a>
                  </li>
                  <li className="hover:text-amber-400 transition-colors cursor-pointer">
                    <a href="mailto:support@Weight-wave.com" target="_blank">
                      {tFooter("emailLink")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm">
                &copy; {tFooter("copyright")}
              </p>
              <div className="flex gap-6 text-white/40 text-sm">
                <a href="#" className="hover:text-amber-400 transition-colors">
                  {tFooter("privacy")}
                </a>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  {tFooter("terms")}
                </a>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  {tFooter("cookies")}
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
