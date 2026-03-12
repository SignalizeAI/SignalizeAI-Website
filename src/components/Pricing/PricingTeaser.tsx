import Link from "next/link";
import { pricingData } from "@/stripe/pricingData";
import type { Price } from "@/types/price";
import { formatMonthlyPrice } from "./formatPrice";
import {
  pricingHighlights,
  teaserDescriptions,
  teaserMeta,
  teaserOfferMap,
  teaserPlanOrder,
} from "./teaserContent";

const CheckIcon = ({ className }: { className: string }) => (
  <span className={`mt-1.5 flex h-5 w-5 items-center justify-center rounded-full ${className}`}>
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  </span>
);

const teaserPlans = teaserPlanOrder
  .map((nickname) => pricingData.find((product) => product.nickname === nickname))
  .filter((product): product is Price => Boolean(product));

const PricingTeaser = () => (
  <div className="relative overflow-hidden rounded-[2.8rem] border border-slate-200/80 bg-white/75 px-4 py-6 shadow-[0_35px_90px_-50px_rgba(15,23,42,0.22)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_35px_90px_-50px_rgba(0,0,0,0.75)] sm:px-6 sm:py-8 lg:px-8 lg:py-10">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.1),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.14),transparent_28%)]" />
    <div className="relative">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {teaserPlans.map((product, index) => {
          const planName = product.nickname?.toLowerCase() || "free";
          const meta = teaserMeta[planName as keyof typeof teaserMeta];
          const priceDisplay = formatMonthlyPrice(product, true);

          return (
            <div key={index} className={`relative h-full overflow-hidden rounded-[2rem] border p-8 shadow-lg transition duration-300 hover:-translate-y-1 ${meta.cardClassName}`}>
              {planName === "team" && (
                <>
                  <div className="absolute left-0 top-0 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
                  <div className="absolute bottom-0 right-0 h-28 w-28 rounded-full bg-accent/20 blur-3xl" />
                </>
              )}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${meta.eyebrowClassName}`}>
                    {meta.eyebrow}
                  </span>
                  <p className={`mt-2 text-sm font-semibold ${meta.mutedTextClassName}`}>{meta.summary}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${meta.badgeClassName}`}>
                  {meta.badge}
                </span>
              </div>
              <h3 className={`mt-6 text-3xl font-black tracking-tight ${meta.textClassName}`}>{priceDisplay}</h3>
              <p className={`mt-4 text-sm leading-7 ${meta.mutedTextClassName}`}>{teaserDescriptions[planName]}</p>
              <div className={`mt-6 rounded-[1.5rem] border p-5 ${meta.surfaceClassName} ${meta.borderClassName}`}>
                <div className="grid gap-3">
                  {teaserOfferMap[planName].map((offerText) => (
                    <div key={offerText} className={`flex items-start gap-3 text-sm leading-7 ${meta.mutedTextClassName}`}>
                      <CheckIcon className={meta.iconClassName} />
                      <p>{offerText}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-4 max-w-5xl overflow-hidden rounded-[2.4rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0a0a0a]">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden px-8 py-8 sm:px-10 sm:py-10">
            <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-36 w-36 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative">
              <span className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
                Full comparison
              </span>
              <h3 className="mt-5 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Need the exact plan details before you choose?
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-white/65">
                Open the dedicated pricing page for the full comparison, billing flow, and plan-specific detail without crowding the homepage.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {pricingHighlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-950 px-8 py-8 text-white dark:border-white/10 dark:bg-white dark:text-slate-950 lg:border-l lg:border-t-0 sm:px-10 sm:py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60 dark:text-slate-500">
              Next step
            </p>
            <h4 className="mt-4 text-2xl font-black tracking-tight">Open pricing and choose with confidence</h4>
            <p className="mt-5 text-sm leading-7 text-white/70 dark:text-slate-600">
              Use the pricing page when you want the full plan breakdown, exact limits, and subscription flow in one place.
            </p>
            <Link
              href="/pricing"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-slate-200 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800"
            >
              View all plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PricingTeaser;
