import Link from "next/link";
import { heroHeadline, heroSubhead, heroTrustChips } from "./content";
import HeroInstallButtons from "./HeroInstallButtons";
import HeroProductMock from "./HeroProductMock";

const Hero = () => {
  return (
    <section
      id="home"
      className="dark:bg-dark relative overflow-hidden bg-white pt-[110px] pb-16 md:pt-[140px] lg:pt-[170px] lg:pb-24"
    >
      <div className="glow bg-primary/25 top-[-12%] left-[-10%] h-[420px] w-[560px]" />
      <div className="glow bg-accent/20 top-[6%] right-[-8%] h-[380px] w-[460px]" />

      <div className="relative container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
          {/* left column */}
          <div className="max-w-[640px]">
            <span className="text-ink/70 inline-flex items-center gap-2 rounded-full border border-black/8 bg-black/[0.03] px-3 py-1.5 text-xs font-semibold dark:border-white/10 dark:bg-white/5 dark:text-white/70">
              <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              SignalizeAI v5.5.0 is now live
            </span>

            <h1 className="display text-ink mt-6 text-[32px] leading-[1.12] font-extrabold text-balance sm:text-[42px] lg:text-[50px] dark:text-white">
              {heroHeadline.lead}{" "}
              <span className="text-primary dark:text-accent">
                {heroHeadline.highlight}
              </span>
            </h1>

            <p className="text-muted mt-6 max-w-[560px] text-base leading-8 sm:text-lg dark:text-white/65">
              {heroSubhead}
            </p>

            <div className="mt-9">
              <HeroInstallButtons />
            </div>

            {/* honest trust row: no invented user counts or testimonials */}
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {heroTrustChips.map((chip) => (
                <span
                  key={chip}
                  className="text-muted inline-flex items-center gap-2 rounded-full border border-black/8 px-3 py-1.5 text-xs font-medium dark:border-white/10 dark:text-white/60"
                >
                  <svg
                    className="text-primary dark:text-accent h-3.5 w-3.5"
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
                className="text-muted hover:text-primary dark:hover:text-accent inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 transition hover:underline dark:text-white/60"
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
      </div>
    </section>
  );
};

export default Hero;
