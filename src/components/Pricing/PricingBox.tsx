"use client";

import LazyBrowserModal from "@/components/BrowserModal/LazyBrowserModal";
import type { Price } from "@/types/price";
import { formatMonthlyPrice } from "./formatPrice";
import OfferList from "./OfferList";
import usePricingBoxState from "./usePricingBoxState";

interface PricingBoxProps {
  product: Price;
  currentPlan: string;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const planDescriptions: Record<string, string> = {
  free: "For individual reps testing quick website checks and lightweight saved research.",
  pro: "For solo operators or small teams that need batch runs, saved analyses, and export.",
  team: "For higher-volume teams running larger research lists with broader saved-analysis capacity.",
};

const PricingBox = ({ product, currentPlan, isHighlighted, onMouseEnter, onMouseLeave }: PricingBoxProps) => {
  const { buttonConfig, handleAction, installModalOpen, setInstallModalOpen } = usePricingBoxState(product, currentPlan);
  const planName = product.nickname?.toLowerCase() || "free";
  const priceDisplay = formatMonthlyPrice(product);
  const planBadge = product.nickname === "Pro" ? "Popular" : null;

  return (
    <>
      <div className="flex w-full flex-col items-stretch px-4 md:w-1/2 lg:w-1/3">
        <div
          className={`relative z-10 mb-10 flex h-full flex-col overflow-hidden rounded-[2rem] bg-white px-8 py-10 transition duration-300 hover:shadow-2xl dark:bg-[#0a0a0a] sm:p-12 lg:px-8 lg:py-12 xl:p-12 ${
            isHighlighted
              ? "z-20 border border-primary shadow-xl md:scale-105 lg:scale-[1.03] dark:border-accent dark:shadow-[0_0_30px_rgba(0,229,255,0.15)]"
              : "border border-gray-200 dark:border-white/10"
          }`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {isHighlighted && <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />}
          {planBadge && (
            <>
              <p className="absolute right-4 top-4 inline-block rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1 text-xs font-semibold text-white dark:text-black sm:hidden">
                {planBadge}
              </p>
              <p className="absolute -right-8 top-[60px] hidden rotate-45 rounded-md bg-gradient-to-r from-primary to-accent px-8 py-1.5 text-xs font-semibold text-white shadow-lg dark:text-black sm:inline-block">
                {planBadge}
              </p>
            </>
          )}
          <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.22em] text-primary dark:text-accent">{product.nickname}</span>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white xl:text-[40px] xl:leading-[1.1]">{priceDisplay}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/65">{planDescriptions[planName]}</p>
          <div className="mb-8 mt-8 grow">
            <h3 className="mb-6 border-b border-gray-200 pb-4 text-base font-semibold text-slate-900 dark:border-white/10 dark:text-white">
              Included Features
            </h3>
            <div className="mb-8 text-slate-600 dark:text-white/70">
              {product.offers.map((offer, index) => {
                const offerText = typeof offer === "string" ? offer : offer.text;
                const available = typeof offer === "string" ? true : (offer.available ?? true);
                return <OfferList key={index} text={offerText} available={available} />;
              })}
            </div>
          </div>
          <button
            onClick={handleAction}
            disabled={buttonConfig.disabled}
            className={`mt-auto inline-block w-full rounded-full px-7 py-3.5 text-center text-sm font-semibold transition-all duration-300 ${
              buttonConfig.disabled
                ? "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-white/40"
                : isHighlighted
                  ? "bg-gradient-to-r from-primary to-accent text-white hover:scale-[1.02] hover:shadow-lg dark:text-black"
                  : "border border-gray-200 bg-gray-100 text-slate-900 hover:bg-gray-200 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            }`}
          >
            {buttonConfig.text}
          </button>
        </div>
      </div>
      <LazyBrowserModal isOpen={installModalOpen} onClose={() => setInstallModalOpen(false)} />
    </>
  );
};

export default PricingBox;
