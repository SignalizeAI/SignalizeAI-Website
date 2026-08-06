import Link from "next/link";
import { heroTrustChips } from "./content";
import HeroInstallButtons from "./HeroInstallButtons";
import HeroProductMock from "./HeroProductMock";

const HERO_VIDEO_URL = "https://www.youtube.com/embed/As31_p3I4jY?rel=0";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white pb-16 pt-[110px] dark:bg-dark md:pt-[140px] lg:pb-24 lg:pt-[170px]"
    >
      <div className="glow left-[-10%] top-[-12%] h-[420px] w-[560px] bg-primary/25" />
      <div className="glow right-[-8%] top-[6%] h-[380px] w-[460px] bg-accent/20" />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
          {/* left column */}
          <div className="max-w-[640px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-black/[0.03] px-3 py-1.5 text-xs font-semibold text-ink/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              SignalizeAI v5.4.1 is now live
            </span>

            <h1 className="display mt-6 text-[34px] font-extrabold text-ink dark:text-white sm:text-5xl lg:text-[56px]">
              Find the right angle to sell to any company{" "}
              <span className="text-primary dark:text-accent">in seconds</span>
            </h1>

            <p className="mt-6 max-w-[520px] text-base leading-8 text-muted dark:text-white/65 sm:text-lg">
              Get clear strategy, targeting, and outreach you can actually use
              without guessing.
            </p>

            <div className="mt-9">
              <HeroInstallButtons />
            </div>

            {/* honest trust row: no invented user counts or testimonials */}
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {heroTrustChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 rounded-full border border-black/8 px-3 py-1.5 text-xs font-medium text-muted dark:border-white/10 dark:text-white/60"
                >
                  <svg
                    className="h-3.5 w-3.5 text-primary dark:text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="https://www.producthunt.com/products/signalizeai/reviews/new?utm_source=badge-product_review&utm_medium=badge&utm_campaign=product_review-badge-signalizeai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted underline-offset-4 transition hover:text-primary hover:underline dark:text-white/60 dark:hover:text-accent"
              >
                Review us on Product Hunt
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          {/* right column: product visual */}
          <div className="flex justify-center lg:justify-end">
            <HeroProductMock />
          </div>
        </div>

        {/* secondary: demo video, below the fold */}
        <div className="mt-16 lg:mt-24">
          <div className="mx-auto max-w-[900px]">
            <p className="field-label mb-3 text-center text-muted dark:text-white/45">
              Watch the walkthrough
            </p>
            <div className="overflow-hidden rounded-2xl border border-black/8 bg-white dark:border-white/10 dark:bg-dark-2">
              <div className="relative aspect-video w-full">
                <iframe
                  src={HERO_VIDEO_URL}
                  title="SignalizeAI demo video"
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
