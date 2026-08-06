export const docsNav = [
  { href: "#getting-started", label: "Getting Started" },
  { href: "#workflows", label: "Workflows" },
  { href: "#outputs", label: "Outputs" },
  { href: "#access", label: "Access" },
  { href: "#privacy", label: "Privacy" },
  { href: "#troubleshooting", label: "Troubleshooting" },
];

export const heroFacts = [
  { label: "Format", value: "Product docs" },
  { label: "Focus", value: "Account monitoring + outreach" },
  { label: "Scope", value: "Single, batch, saved, and watched workflows" },
];

export const browserLinks = [
  {
    label: "Install on Chrome",
    mobileLabel: "Chrome",
    href: "https://chromewebstore.google.com/detail/nhgeihbbpdnhcfccedpnkionaofdpaib",
    icon: "/images/browser/chrome.svg",
  },
  {
    label: "Install on Firefox",
    mobileLabel: "Firefox",
    href: "https://addons.mozilla.org/en-US/firefox/addon/signalizeai/",
    icon: "/images/browser/firefox.svg",
  },
] as const;

export const gettingStartedSteps = [
  {
    title: "Install the extension",
    description:
      "Add SignalizeAI to Chrome or Firefox and keep it pinned so it is available when you are reviewing public business sites.",
  },
  {
    title: "Open a public company page",
    description:
      "Use a homepage, product page, or pricing page where the business clearly explains what it sells and who it serves.",
  },
  {
    title: "Run a quick website check",
    description:
      "SignalizeAI reads visible page content on demand and converts it into a sales-focused brief instead of generic metadata.",
  },
  {
    title: "Save the account to start watching it",
    description:
      "Saving stores the brief and a snapshot of the page content. That snapshot is the baseline every later check is compared against, so an account only gets change detection once it is saved.",
  },
  {
    title: "Read the changes and reach out",
    description:
      "On its schedule, SignalizeAI re-reads your watched accounts and shows what moved since the last check, with a suggested opener you can edit.",
  },
];

export const workflowCards = [
  {
    eyebrow: "Single prospect",
    title: "Quick website check",
    description:
      "Use this when you need a fast read on one account before outreach, discovery, or qualification.",
    points: [
      "Use when: you are evaluating a single company page in real time",
      "Expect: a short brief in seconds from public, visible page content",
      "Output: summary, target customer signal, value proposition, readiness cues, and suggested outreach direction",
    ],
  },
  {
    eyebrow: "Scaled research",
    title: "Batch prospecting",
    description:
      "Use this when manual tab-by-tab review is too slow and you need consistent prospect data across a list.",
    points: [
      "Use when: running prospecting sprints, territory sweeps, or list validation",
      "Expect: queue-style processing from pasted URLs or CSV inputs",
      "Output: standardized per-domain briefs with optional outreach and follow-up generation for fast comparison and triage",
    ],
  },
  {
    eyebrow: "Ongoing monitoring",
    title: "Account change detection",
    description:
      "Use this when you sell to a named list and need a fresh, specific reason to contact the same accounts again.",
    points: [
      "Use when: your accounts are already identified and the problem is what to say, not who to say it to",
      "Expect: scheduled re-checks of saved accounts, run from your browser while it is open, at a frequency set by your plan",
      "Output: a change record with the before and after text, the change type, and a one-line suggested opener",
      "Detects: pricing page changes, new job postings on the careers page, rewritten homepage messaging, and new product pages",
      "Does not detect: anything behind a login, inside images or PDFs, on sites that block automated requests, or announced somewhere other than the company website",
      "Not real-time: there are no email alerts, no push notifications, and no guarantee that any individual scheduled check runs on time",
    ],
  },
  {
    eyebrow: "Ongoing workflow",
    title: "Saved prospects",
    description:
      "Use this when prospecting spans multiple sessions and you need a reusable record across the extension and website.",
    points: [
      "Use when: tracking accounts over days, revisiting outreach, or handing context to teammates",
      "Expect: stored runs with status, outreach emails, follow-ups, search, filtering, bulk delete, and optional export",
      "Output: a reusable working set you can reopen in the website prospect page or manage inside the website saved prospects workspace",
    ],
  },
];

export const outputCards = [
  {
    title: "Business summary",
    description:
      "A concise explanation of what the company appears to do and how it presents itself.",
  },
  {
    title: "Target customer",
    description:
      "The likely buyer segment inferred from messaging, offer structure, and page context.",
  },
  {
    title: "Value proposition",
    description:
      "The most obvious product or service angle surfaced from the public copy.",
  },
  {
    title: "Best persona recommendation",
    description:
      "The role most likely to care about the problem or budget signaled by the site.",
  },
  {
    title: "Suggested outreach",
    description:
      "A goal, outreach angle, and AI-generated outreach emails built from the prospect data.",
  },
  {
    title: "Follow-up emails",
    description:
      "Additional follow-up messages generated after the opening outreach so the prospect can move from first touch to sequence.",
  },
  {
    title: "Readiness signal",
    description:
      "A directional indicator for how ready the account appears for outreach and why.",
  },
  {
    title: "Change record",
    description:
      "For watched accounts, the before and after text of what moved, the change type (pricing, hiring, messaging, or new page), and a one-line suggested opener built from it.",
  },
  {
    title: "Exportable working set",
    description:
      "When supported, saved prospects can become a reusable set for filtering, export, website prospect views, the `/prospects` workspace, and follow-up.",
  },
];

export const accessCards = [
  {
    title: "Quick website check",
    availability: "Available to all users",
    description:
      "The core single-page workflow for active-tab prospecting, immediate context generation, and outreach direction.",
  },
  {
    title: "Batch prospecting",
    availability: "Plan-dependent",
    description:
      "Used when you need to process multiple domains at once and generate prospect data or outreach across a list.",
  },
  {
    title: "Account change detection",
    availability: "All plans, at plan-dependent frequency",
    description:
      "Every plan can watch accounts. What changes by plan is how many accounts you can watch, how often they are re-checked (weekly on Free, every 48 hours on Pro, daily on Team), and how much change history is retained.",
  },
  {
    title: "Saved prospects",
    availability: "Plan-dependent",
    description:
      "Saved prospect capacity, organization features, `/prospects` workspace tools, and export access vary by plan. Website prospect pages are available for saved prospects.",
  },
];

export const privacyPoints = [
  "SignalizeAI turns public website content into prospect data rather than monitoring general browsing.",
  "Scheduled checks only re-read the public pages of accounts you explicitly saved, and they run from your own browser rather than from our servers.",
  "The extension does not collect form inputs, cookies, or private account data.",
  "API keys stay server-side and requests are rate-limited.",
  "Saved prospects are optional and tied to the authenticated user account.",
  "Users can remove saved prospects through the product interface.",
];

export const permissions = [
  {
    title: "activeTab",
    description: "Access the current tab only when you request prospect data.",
  },
  {
    title: "tabs",
    description: "Read the active page URL for prospect context.",
  },
  {
    title: "scripting",
    description: "Inject the extraction script into the page on demand.",
  },
  {
    title: "storage",
    description: "Store preferences and local extension state.",
  },
  {
    title: "sidePanel / sidebar_action",
    description: "Render the SignalizeAI UI inside the browser side panel or sidebar.",
  },
  {
    title: "host permissions",
    description:
      "Allow secure requests to SignalizeAI services, Supabase, and user-requested prospect targets.",
  },
];

export const troubleshootingCards = [
  {
    title: "Nothing happens when I run a check",
    description:
      "Refresh the page and retry on a public website. Browser-protected tabs, PDFs, and restricted pages do not allow content scripts.",
  },
  {
    title: "The output feels too thin",
    description:
      "Try a stronger page source such as the homepage, product page, or pricing page where the business explains itself clearly.",
  },
  {
    title: "Batch prospecting is unavailable",
    description:
      "Batch prospecting is not a universal feature. Check plan access if the workflow is not available in your account.",
  },
  {
    title: "Saved prospects are missing",
    description:
      "Confirm you are signed in to the same account used when the prospects were created.",
  },
  {
    title: "A watched account has not been checked recently",
    description:
      "Checks are scheduled and run inside the browser, so they only happen while the browser is open. If it has been closed, the check runs the next time the browser is running. Sites that block automated requests may also fail a check, which is recorded rather than reported as a change.",
  },
  {
    title: "A reported change looks trivial",
    description:
      "Comparison is on public page text, so a small copy edit can register as a messaging change. Use the before and after shown on the change record to judge whether it is worth acting on, and dismiss the ones that are not.",
  },
  {
    title: "Outreach or follow-ups are missing",
    description:
      "Open the saved prospect again and generate them from the current view. Saved prospects keep outreach and follow-ups once they are generated.",
  },
];
