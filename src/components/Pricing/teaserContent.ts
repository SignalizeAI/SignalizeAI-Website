export const teaserPlanOrder = ["Free", "Pro", "Team"];

export const teaserDescriptions: Record<string, string> = {
  free: "Start with quick checks, saved prospects, and lightweight outreach.",
  pro: "Run batch prospecting with larger saved capacity, website prospect access, and export-ready workflow.",
  team: "Scale outbound faster with higher-volume prospecting, outreach, and follow-up workflows.",
};

export const teaserMeta = {
  free: {
    eyebrow: "Starter",
    summary: "Single-site checks",
    badge: "Free",
    eyebrowClassName: "text-primary dark:text-accent",
    badgeClassName: "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent",
    cardClassName: "border-black/8 bg-white dark:border-white/10 dark:bg-dark",
    surfaceClassName: "bg-black/[0.02] dark:bg-white/5",
    iconClassName: "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent",
    textClassName: "text-ink dark:text-white",
    mutedTextClassName: "text-muted dark:text-white/65",
    borderClassName: "border-black/8 dark:border-white/10",
  },
  pro: {
    eyebrow: "Best for reps",
    summary: "Batch + saved workflow",
    badge: "Popular",
    eyebrowClassName: "text-primary dark:text-accent",
    badgeClassName: "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent",
    cardClassName:
      "border-black/8 bg-white dark:border-white/10 dark:bg-dark-2",
    surfaceClassName: "bg-white/80 dark:bg-white/[0.03]",
    iconClassName: "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent",
    textClassName: "text-ink dark:text-white",
    mutedTextClassName: "text-muted dark:text-white/70",
    borderClassName: "border-black/8 dark:border-white/10",
  },
  team: {
    eyebrow: "For teams",
    summary: "Higher-volume research",
    badge: "Scale",
    eyebrowClassName: "text-cyan-300 dark:text-accent",
    badgeClassName: "bg-white/10 text-white dark:bg-accent/15 dark:text-accent",
    cardClassName:
      "border-black/10 bg-ink dark:border-accent/25 dark:bg-dark-3",
    surfaceClassName: "bg-white/5",
    iconClassName: "bg-white/10 text-white dark:bg-accent/15 dark:text-accent",
    textClassName: "text-white",
    mutedTextClassName: "text-white/72",
    borderClassName: "border-white/10 dark:border-white/10",
  },
};

export const teaserOfferMap: Record<string, string[]> = {
  free: [
    "Generate insights for 5 prospects/day",
    "Save up to 3 prospects",
    "Generate outreach emails and follow-ups",
    "Open saved prospects on the website",
  ],
  pro: [
    "Generate insights for 50 prospects/day",
    "Save up to 200 prospects",
    "Batch prospecting up to 10 URLs/run",
    "Open saved prospects on the website",
  ],
  team: [
    "Generate insights for 500 prospects/day",
    "Save up to 5000 prospects",
    "Batch prospecting up to 50 URLs/run",
    "Open saved prospects on the website",
  ],
};

export const pricingHighlights = [
  "Full plan-by-plan comparison",
  "Billing and subscription actions",
  "Exact limits for batch, saves, website prospect access, and export",
  "Dedicated page without homepage clutter",
];
