export const teaserPlanOrder = ["Free", "Pro", "Team"];

export const teaserDescriptions: Record<string, string> = {
  free: "Watch 3 accounts with weekly checks, plus quick research and outreach drafts.",
  pro: "Watch 100 accounts with checks every 48 hours, 90 days of history, batch prospecting, and export.",
  team: "Watch 1000 accounts with daily checks, 365 days of history, and the largest batch and research limits.",
};

export const teaserMeta = {
  free: {
    eyebrow: "Starter",
    summary: "3 watched accounts",
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
    summary: "100 watched, 48h checks",
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
    summary: "1000 watched, daily checks",
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
    "Watch up to 3 accounts, checked weekly",
    "Generate insights for 5 prospects/day",
    "Save up to 25 prospects",
    "Generate outreach emails and follow-ups",
  ],
  pro: [
    "Watch up to 100 accounts, checked every 48 hours",
    "90 days of change history",
    "Generate insights for 50 prospects/day",
    "Batch prospecting up to 10 URLs/run",
  ],
  team: [
    "Watch up to 1000 accounts, checked daily",
    "365 days of change history",
    "Generate insights for 500 prospects/day",
    "Batch prospecting up to 50 URLs/run",
  ],
};

export const pricingHighlights = [
  "Full plan-by-plan comparison",
  "Billing and subscription actions",
  "Exact limits for watched accounts, check frequency, history, batch, and export",
  "Dedicated page without homepage clutter",
];
