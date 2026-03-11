import { Feature } from "@/types/feature";
import Link from "next/link";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph, btn, btnLink } = feature;
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/4">
      <div className="group relative z-10 mb-12 h-full overflow-hidden rounded-[2.5rem] bg-white p-10 transition-all duration-500 hover:-translate-y-2 dark:bg-[#0a0a0a]">
        {/* Neon Glow Border Effect */}
        <div className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="h-full w-full bg-gradient-to-br from-primary via-accent to-primary blur-[2px]" />
        </div>

        {/* Inner Card Surface */}
        <div className="absolute inset-[1.5px] z-1 rounded-[calc(2.5rem-1px)] bg-white dark:bg-[#0d0d0d] transition-colors duration-500 group-hover:bg-gray-50/90 dark:group-hover:bg-[#111111]/90" />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Advanced Organic Icon Shape */}
          <div className="relative mb-12 flex h-20 w-20 items-center justify-center">
            {/* Background Aura */}
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-primary to-accent opacity-20 blur-2xl transition-opacity group-hover:opacity-40" />

            {/* Morphing Icon Container */}
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-br from-primary to-accent text-white shadow-[0_20px_40px_-10px_rgba(26,35,126,0.3)] transition-all duration-1000 group-hover:rounded-2xl group-hover:rotate-12 group-hover:scale-110">
              <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors" />
              <div className="relative z-10 transform transition-transform duration-500 group-hover:scale-110">
                {icon}
              </div>
            </div>
          </div>

          <h3 className="mb-5 text-2xl font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
            {title}
          </h3>

          <p className="mb-10 flex-grow text-[17px] font-medium leading-[1.65] text-slate-500 dark:text-gray-400">
            {paragraph}
          </p>

          {(btn && btnLink) ? (
            <Link
              href={btnLink}
              className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-primary dark:text-accent transition-all hover:gap-5 group/btn"
            >
              {btn}
              <svg className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          ) : (
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100 dark:bg-white/5">
              <div className="h-full w-1/3 bg-gradient-to-r from-primary to-accent transition-all duration-1000 group-hover:w-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleFeature;
