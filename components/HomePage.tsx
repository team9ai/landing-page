import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import HomeViewTracker from "@/components/home/HomeViewTracker";
import HeaderCTAGroup from "@/components/home/HeaderCTAGroup";
import HeroCTAGroup from "@/components/home/HeroCTAGroup";
import FooterCTAGroup from "@/components/home/FooterCTAGroup";
import FeaturesNav from "@/components/home/FeaturesNav";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { APP_BASE_URL } from "@/utils/env";

const GITHUB_URL = "https://github.com/team9ai/team9";
const X_URL = "https://x.com/team9_ai";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.65 7.65 0 0 1 8 4.84c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default async function HomePage() {
  const locale = await getLocale();
  const tHeader = await getTranslations("header");
  const tHero = await getTranslations("hero");
  const tFeatures = await getTranslations("features");
  const tHow = await getTranslations("howItWorks");
  const tBuilt = await getTranslations("builtFor");
  const tFaq = await getTranslations("faq");
  const tFooter = await getTranslations("footer");

  const featureNavItems = [
    { id: "agent-team", label: tFeatures("navAgentTeam") },
    { id: "real-work", label: tFeatures("navRealWork") },
    { id: "playbooks", label: tFeatures("navPlaybooks") },
    { id: "control-room", label: tFeatures("navControlRoom") },
  ];

  const featureBlocks = [
    {
      id: "agent-team",
      headline: tFeatures("agentTeamHeadline"),
      description: tFeatures("agentTeamDescription"),
      imageSrc: "/images/ai-staff.png",
      imageAlt: tFeatures("agentTeamImageAlt"),
      bgSrc: "/images/feature-bg.jpg",
      cards: [
        { title: tFeatures("agentTeamCard1Title"), desc: tFeatures("agentTeamCard1Desc") },
        { title: tFeatures("agentTeamCard2Title"), desc: tFeatures("agentTeamCard2Desc") },
        { title: tFeatures("agentTeamCard3Title"), desc: tFeatures("agentTeamCard3Desc") },
      ],
    },
    {
      id: "real-work",
      headline: tFeatures("realWorkHeadline"),
      description: tFeatures("realWorkDescription"),
      imageSrc: "/images/home-ai-staff.png",
      imageAlt: tFeatures("realWorkImageAlt"),
      bgSrc: "/images/feature-bg-2.jpg",
      cards: [
        { title: tFeatures("realWorkCard1Title"), desc: tFeatures("realWorkCard1Desc") },
        { title: tFeatures("realWorkCard2Title"), desc: tFeatures("realWorkCard2Desc") },
        { title: tFeatures("realWorkCard3Title"), desc: tFeatures("realWorkCard3Desc") },
      ],
    },
    {
      id: "playbooks",
      headline: tFeatures("playbooksHeadline"),
      description: tFeatures("playbooksDescription"),
      imageSrc: "/images/home-not-join.png",
      imageAlt: tFeatures("playbooksImageAlt"),
      bgSrc: "/images/feature-bg-3.jpg",
      cards: [
        { title: tFeatures("playbooksCard1Title"), desc: tFeatures("playbooksCard1Desc") },
        { title: tFeatures("playbooksCard2Title"), desc: tFeatures("playbooksCard2Desc") },
        { title: tFeatures("playbooksCard3Title"), desc: tFeatures("playbooksCard3Desc") },
      ],
    },
    {
      id: "control-room",
      headline: tFeatures("controlRoomHeadline"),
      description: tFeatures("controlRoomDescription"),
      imageSrc: "/images/settings.png",
      imageAlt: tFeatures("controlRoomImageAlt"),
      bgSrc: "/images/feature-bg-4.jpg",
      cards: [
        { title: tFeatures("controlRoomCard1Title"), desc: tFeatures("controlRoomCard1Desc") },
        { title: tFeatures("controlRoomCard2Title"), desc: tFeatures("controlRoomCard2Desc") },
        { title: tFeatures("controlRoomCard3Title"), desc: tFeatures("controlRoomCard3Desc") },
      ],
    },
  ];

  const modelChips = [
    { src: "/brand/anthropic.png", alt: tHero("brandClaudeAlt"), label: tHero("modelClaude"), rounded: true },
    { src: null, alt: tHero("brandGptAlt"), label: tHero("modelGpt"), rounded: false },
    { src: "/brand/gemini.svg", alt: tHero("brandGeminiAlt"), label: tHero("modelGemini"), rounded: false },
    { src: "/brand/kimi.ico", alt: tHero("brandKimiAlt"), label: tHero("modelKimi"), rounded: true },
    { src: "/brand/zai.svg", alt: tHero("brandGlmAlt"), label: tHero("modelGlm"), rounded: false },
  ];

  const faqItems = [1, 2, 3, 4, 5, 6].map((n) => ({
    q: tFaq(`q${n}`),
    a: tFaq(`a${n}`),
  }));

  return (
    <>
      <HomeViewTracker />
      <div className="h-full overflow-x-hidden overflow-y-auto bg-white">
        <div className="relative">
          <header className="inset-x-0 top-0 z-30 absolute bg-transparent">
            <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 sm:gap-5">
                <Link
                  href="/"
                  className="text-[18px] font-semibold tracking-[0.02em] text-white/92 sm:text-[20px]"
                >
                  Team9
                </Link>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={tHeader("githubAriaLabel")}
                  className="inline-flex size-10 items-center justify-center rounded-[11px] border border-white/18 bg-black/16 text-white backdrop-blur-sm transition-colors hover:bg-black/24"
                >
                  <GithubIcon className="size-4" />
                </a>
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={tHeader("xAriaLabel")}
                  className="inline-flex size-10 items-center justify-center rounded-[11px] border border-white/18 bg-black/16 text-white backdrop-blur-sm transition-colors hover:bg-black/24"
                >
                  <XIcon className="size-4" />
                </a>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3">
                <LanguageSwitcher locale={locale} />
                <HeaderCTAGroup signInLabel={tHeader("signIn")} />
              </div>
            </div>
          </header>

          <section
            id="product"
            className="relative min-h-full overflow-hidden bg-[#05070b] text-white"
          >
            <div className="pointer-events-none absolute inset-0">
              <Image
                src="/images/hero-bg.jpg"
                alt=""
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                className="object-cover object-top"
                style={{ transform: "scale(0.85)", transformOrigin: "center top" }}
              />
            </div>
            <main className="relative z-10">
              <div className="mx-auto max-w-[1320px] px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
                <div className="mx-auto max-w-[1120px] text-center">
                  <h1 className="font-[family-name:var(--font-serif)] text-[3.65rem] leading-[0.93] tracking-[-0.038em] text-white drop-shadow-[0_10px_34px_rgba(0,0,0,0.32)] sm:text-[4.85rem] lg:text-[6.4rem]">
                    {tHero("headlineLine1")}
                    <br />
                    {tHero("headlineLine2")}
                  </h1>
                  <p className="mx-auto mt-7 max-w-[820px] text-[15px] leading-7 text-white/84 sm:text-[17px]">
                    {tHero("subheadline")}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <HeroCTAGroup
                      downloadLabel={tHero("downloadMac")}
                      signUpWithGoogleLabel={tHero("signUpWithGoogle")}
                    />
                  </div>
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                    <span className="text-[15px] text-white/50">{tHero("worksWith")}</span>
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
                      {modelChips.map((chip, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-white/80">
                          {chip.src ? (
                            <Image
                              src={chip.src}
                              alt={chip.alt}
                              width={20}
                              height={20}
                              className="size-5"
                              style={chip.rounded ? { borderRadius: 4 } : undefined}
                            />
                          ) : (
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="currentColor">
                              <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073ZM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494Z" />
                            </svg>
                          )}
                          <span className="text-[15px] font-medium">{chip.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div id="preview" className="mt-10 sm:mt-12">
                    <div className="relative overflow-hidden border border-white/14">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster="/images/team9-preview-poster.jpg"
                        className="block h-auto w-full"
                        style={{ aspectRatio: "3840 / 1916", background: "#000" }}
                        aria-label={tHero("videoAriaLabel")}
                      >
                        <source src="/images/team9-preview.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </section>

          <section id="features" className="bg-white text-[#0a0d12]">
            <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
              <div className="relative lg:flex lg:gap-20">
                <FeaturesNav items={featureNavItems} />
                <div className="flex-1">
                  {featureBlocks.map((block, idx) => (
                    <div
                      key={block.id}
                      id={block.id}
                      className={`py-20 lg:py-28 ${idx < featureBlocks.length - 1 ? "border-b border-[#0a0d12]/8" : ""}`}
                    >
                      <h2 className="font-[family-name:var(--font-serif)] text-[2.6rem] leading-[1.05] tracking-[-0.03em] text-[#0a0d12] whitespace-pre-line sm:text-[3.4rem] lg:text-[4.2rem]">
                        {block.headline}
                      </h2>
                      <p className="mt-5 max-w-[640px] text-[15px] leading-7 text-[#0a0d12]/60 sm:text-[16px]">
                        {block.description}
                      </p>
                      <div className="mt-14 sm:mt-18">
                        <div className="relative overflow-hidden rounded-sm">
                          <Image
                            src={block.bgSrc}
                            alt=""
                            fill
                            sizes="(max-width: 1320px) 100vw, 1320px"
                            className="object-cover object-center"
                          />
                          <div className="relative px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                            <Image
                              src={block.imageSrc}
                              alt={block.imageAlt}
                              width={1200}
                              height={600}
                              className="block w-full h-auto"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-14 grid gap-8 sm:mt-18 md:grid-cols-3 md:gap-10">
                        {block.cards.map((card) => (
                          <div key={card.title}>
                            <h3 className="text-[15px] font-semibold leading-snug text-[#0a0d12] sm:text-[16px]">
                              {card.title}
                            </h3>
                            <p className="mt-2.5 text-[14px] leading-[1.7] text-[#0a0d12]/56 sm:text-[15px]">
                              {card.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="bg-[#05070b] text-white">
            <div className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                {tHow("eyebrow")}
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-serif)] text-[2.6rem] leading-[1.05] tracking-[-0.03em] sm:text-[3.4rem] lg:text-[4.2rem]">
                {tHow("headlineLine1")}
                <br />
                <span className="text-white/40">{tHow("headlineLine2")}</span>
              </h2>
              <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="flex flex-col bg-[#05070b] p-8 lg:p-10">
                    <span className="text-[13px] font-semibold tabular-nums text-white/28">
                      {String(n).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-[17px] font-semibold leading-snug text-white sm:text-[18px]">
                      {tHow(`step${n}Title`)}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.7] text-white/50 sm:text-[15px]">
                      {tHow(`step${n}Desc`)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-14 flex flex-wrap items-center gap-4">
                <a
                  href={APP_BASE_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-white px-5 py-3 text-[14px] font-semibold text-[#0a0d12] transition-colors hover:bg-white/92"
                >
                  {tHow("ctaBuild")}
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-[12px] border border-white/18 bg-black/16 px-5 py-3 text-[14px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/24"
                >
                  <GithubIcon className="size-4" />
                  {tHow("ctaSeeWorkflow")}
                </a>
              </div>
            </div>
          </section>

          <section id="built-for" className="bg-white text-[#0a0d12]">
            <div className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
              <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
                <div className="lg:w-[480px] lg:shrink-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0a0d12]/40">
                    {tBuilt("eyebrow")}
                  </p>
                  <h2 className="mt-4 font-[family-name:var(--font-serif)] text-[2.6rem] leading-[1.05] tracking-[-0.03em] sm:text-[3.4rem] lg:text-[4.2rem]">
                    {tBuilt("headlineLine1")}
                    <br />
                    {tBuilt("headlineLine2")}
                  </h2>
                  <p className="mt-6 max-w-[420px] text-[15px] leading-7 text-[#0a0d12]/60 sm:text-[16px]">
                    {tBuilt("description")}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href={APP_BASE_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-[12px] bg-[#0a0d12] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#0a0d12]/88"
                    >
                      <GithubIcon className="size-4" />
                      {tBuilt("cta")}
                    </a>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="grid gap-px overflow-hidden rounded-2xl border border-[#0a0d12]/8 bg-[#0a0d12]/8 sm:grid-cols-2">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="bg-white p-8 lg:p-10">
                        <h3 className="text-[17px] font-semibold leading-snug text-[#0a0d12] sm:text-[18px]">
                          {tBuilt(`card${n}Title`)}
                        </h3>
                        <p className="mt-3 text-[14px] leading-[1.7] text-[#0a0d12]/56 sm:text-[15px]">
                          {tBuilt(`card${n}Desc`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="faq" className="bg-[#f8f8f8] text-[#0a0d12]">
            <div className="mx-auto max-w-[860px] px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0a0d12]/40">
                  {tFaq("eyebrow")}
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-serif)] text-[2.6rem] leading-[1.05] tracking-[-0.03em] sm:text-[3.4rem] lg:text-[4.2rem]">
                  {tFaq("headline")}
                </h2>
              </div>
              <div className="mt-14 divide-y divide-[#0a0d12]/10 sm:mt-16">
                {faqItems.map((item, i) => (
                  <details key={i} className="group" name="faq">
                    <summary className="flex w-full cursor-pointer list-none items-start justify-between gap-4 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0d12]/40 rounded-md [&::-webkit-details-marker]:hidden">
                      <span className="text-[16px] font-semibold leading-snug text-[#0a0d12] sm:text-[17px]">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-[#0a0d12]/12 text-[#0a0d12]/40 transition-transform group-open:rotate-45"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M6 1v10M1 6h10" />
                        </svg>
                      </span>
                    </summary>
                    <p className="pb-6 pr-12 text-[14px] leading-[1.7] text-[#0a0d12]/56 sm:text-[15px]">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <footer className="bg-[#0a0d12] text-white">
            <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-12 border-b border-white/10 py-16 sm:py-20 lg:flex-row lg:gap-20">
                <div className="lg:w-[340px] lg:shrink-0">
                  <a href="#product" className="flex items-center gap-3">
                    <span className="text-[18px] font-semibold tracking-[0.04em] lowercase">team9.ai</span>
                  </a>
                  <p className="mt-4 max-w-[300px] text-[14px] leading-[1.7] text-white/50 sm:text-[15px]">
                    {tFooter("tagline")}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <a
                      href={X_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={tFooter("xAriaLabel")}
                      className="text-white/40 transition-colors hover:text-white"
                    >
                      <XIcon className="size-4" />
                    </a>
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={tFooter("githubAriaLabel")}
                      className="text-white/40 transition-colors hover:text-white"
                    >
                      <GithubIcon className="size-4" />
                    </a>
                  </div>
                  <div className="mt-6">
                    <FooterCTAGroup ctaLabel={tFooter("ctaBuildYourTeam")} />
                  </div>
                </div>
                <div className="flex flex-1 items-start lg:justify-end">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
                    <a
                      href="https://app.team9.ai/terms-of-service"
                      target="_blank"
                      rel="noopener"
                      className="text-[14px] text-white/50 transition-colors hover:text-white"
                    >
                      {tFooter("terms")}
                    </a>
                    <a
                      href="https://app.team9.ai/privacy"
                      target="_blank"
                      rel="noopener"
                      className="text-[14px] text-white/50 transition-colors hover:text-white"
                    >
                      {tFooter("privacy")}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-6">
                <p className="text-[13px] text-white/36">{tFooter("copyright")}</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
