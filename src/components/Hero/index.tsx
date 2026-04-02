import Image from "next/image";
import Link from "next/link";
import { heroUsers } from "./content";
import HeroInstallButtons from "./HeroInstallButtons";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white dark:bg-[#000000] pb-12 pt-[120px] sm:pb-0 md:pt-[150px] lg:pt-[180px] min-h-screen flex items-center"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-primary/20 to-transparent blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="container relative z-10">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[850px] text-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-2 backdrop-blur-md transition-all hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary dark:bg-accent">
                  <svg className="w-3 h-3 text-white dark:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-slate-800 dark:text-white/90">SignalizeAI v5.4.0 is now live</span>
              </div>

              <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[64px] lg:leading-[1.1]">
                Sell to any company <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-accent">
                  in seconds
                </span>
              </h1>

              <p className="mx-auto mb-10 max-w-[650px] text-lg font-normal text-slate-600 dark:text-white/70 sm:text-xl sm:leading-relaxed">
                Get sales-ready insights and outreach in seconds.
              </p>

              <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:gap-6 px-4 sm:px-0">
                <HeroInstallButtons />

                <div className="mt-2 sm:mt-4 flex justify-center">
                  <Link
                    href="https://www.producthunt.com/products/signalizeai/reviews/new?utm_source=badge-product_review&utm_medium=badge&utm_campaign=product_review-badge-signalizeai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:scale-105 hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10"
                  >
                    <span>Review us on Product Hunt</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>

              <div className="mt-4 mb-12 flex flex-col items-center justify-center gap-6 lg:mb-16">
                <div className="flex -space-x-4">
                  {heroUsers.map((i) => (
                    <div key={i} className="h-16 w-16 lg:h-20 lg:w-20 overflow-hidden rounded-full border-4 border-white dark:border-[#000000] bg-gray-100 dark:bg-gray-800 shadow-2xl relative z-0 hover:z-10 transition-all hover:scale-110 cursor-pointer">
                      <Image
                        src={`/images/users/user-0${i}.webp`}
                        alt="User"
                        width={80}
                        height={80}
                        sizes="(max-width: 1023px) 64px, 80px"
                        quality={60}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-base lg:text-lg font-medium tracking-wide text-gray-500 dark:text-white/70">
                  <strong className="text-gray-900 dark:text-white/80">Used by</strong> founders, SDRs, and GTM teams
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 hidden lg:block pt-8 lg:pt-10">
          <div className="relative mx-auto max-w-[1000px]">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-primary to-accent opacity-20 blur-2xl" />

            <div className="relative rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#0a0a0a]/80 p-2 shadow-xl dark:shadow-2xl backdrop-blur-xl sm:p-4">
              <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#111111]">
                <div className="flex items-center border-b border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 px-4 py-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                </div>
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src="/images/hero/hero-image.png"
                    alt="SignalizeAI Hero Image"
                    fill
                    sizes="(max-width: 1023px) 100vw, 1000px"
                    quality={80}
                    className="object-cover object-center opacity-90 transition-opacity hover:opacity-100"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
