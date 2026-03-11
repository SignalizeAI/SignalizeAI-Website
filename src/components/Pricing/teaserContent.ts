export const teaserPlanOrder = ["Free", "Pro", "Team"];

export const teaserDescriptions: Record<string, string> = {
  free: "Start with quick website checks and a small saved-analysis limit.",
  pro: "Move into batch analysis, larger saved capacity, and export-ready workflow.",
  team: "Run higher-volume research with broader limits for multi-user workflows.",
};

export const teaserMeta = {
  free: {
    eyebrow: "Starter",
    summary: "Single-site checks",
    badge: "Free",
    eyebrowClassName: "text-primary dark:text-accent",
    badgeClassName: "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent",
    cardClassName: "border-gray-200 bg-white dark:border-white/10 dark:bg-[#0a0a0a]",
    surfaceClassName: "bg-gray-50 dark:bg-white/5",
    iconClassName: "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent",
    textClassName: "text-slate-900 dark:text-white",
    mutedTextClassName: "text-slate-600 dark:text-white/65",
    borderClassName: "border-gray-200 dark:border-white/10",
  },
  pro: {
    eyebrow: "Best for reps",
    summary: "Batch + saved workflow",
    badge: "Popular",
    eyebrowClassName: "text-primary dark:text-accent",
    badgeClassName: "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent",
    cardClassName:
      "border-gray-200 bg-[#f8fbff] shadow-[0_28px_70px_-42px_rgba(26,35,126,0.18)] dark:border-white/10 dark:bg-[#08111a]",
    surfaceClassName: "bg-white/80 dark:bg-white/[0.03]",
    iconClassName: "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent",
    textClassName: "text-slate-900 dark:text-white",
    mutedTextClassName: "text-slate-600 dark:text-white/70",
    borderClassName: "border-gray-200 dark:border-white/10",
  },
  team: {
    eyebrow: "For teams",
    summary: "Higher-volume research",
    badge: "Scale",
    eyebrowClassName: "text-cyan-300 dark:text-accent",
    badgeClassName: "bg-white/10 text-white dark:bg-accent/15 dark:text-accent",
    cardClassName:
      "border-slate-900/20 bg-slate-950 shadow-[0_32px_80px_-42px_rgba(15,23,42,0.7)] dark:border-accent/25 dark:bg-[#030712]",
    surfaceClassName: "bg-white/5",
    iconClassName: "bg-white/10 text-white dark:bg-accent/15 dark:text-accent",
    textClassName: "text-white",
    mutedTextClassName: "text-white/72",
    borderClassName: "border-white/10 dark:border-white/10",
  },
};

export const teaserOfferMap: Record<string, string[]> = {
  free: ["AI analysis 5/day", "Save up to 3 analyses"],
  pro: [
    "AI analysis 50/day",
    "Batch analysis up to 10 URLs/run",
    "Save up to 200 analyses",
  ],
  team: [
    "AI analysis 500/day",
    "Batch analysis up to 50 URLs/run",
    "Save up to 5000 analyses",
  ],
};

export const pricingHighlights = [
  "Full plan-by-plan comparison",
  "Billing and subscription actions",
  "Exact limits for batch, saves, and export",
  "Dedicated page without homepage clutter",
];
