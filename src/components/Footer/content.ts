export const footerLinkGroups = [
  {
    title: "Product",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Pricing", href: "/pricing" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "GitHub", href: "https://github.com/SignalizeAI", external: true },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Discord", href: "https://discord.gg/eCvhD6WZhX", external: true },
      { label: "Contact support", href: "/contact" },
    ],
  },
];

export const footerMetaLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/signalizeai/",
    variant: "primary",
  },
  {
    label: "GitHub",
    href: "https://github.com/SignalizeAI",
    variant: "dark",
  },
  {
    label: "Discord",
    href: "https://discord.gg/eCvhD6WZhX",
    variant: "accent",
  },
] as const;
