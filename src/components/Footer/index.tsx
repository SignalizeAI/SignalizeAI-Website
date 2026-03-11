import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { label: "Documentation", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Privacy", href: "/privacy" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "GitHub", href: "https://github.com/SignalizeAI", external: true },
];

const supportLinks = [
  { label: "Discord", href: "https://discord.gg/eCvhD6WZhX", external: true },
  { label: "Contact", href: "/contact" },
  { label: "support@signalizeai.org", href: "mailto:support@signalizeai.org", external: true },
];

const Footer = () => {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-gray-200 bg-white pt-20 pb-10 dark:border-white/10 dark:bg-[#050505] lg:pt-24">
      <div className="absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-accent/10 blur-[120px]" />

      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.9fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative h-9 w-9">
                <Image
                  src="/images/logo/logo-dark.png"
                  alt="SignalizeAI"
                  fill
                  className="object-contain dark:hidden"
                />
                <Image
                  src="/images/logo/logo-white.png"
                  alt="SignalizeAI"
                  fill
                  className="hidden object-contain dark:block"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Signalize<span className="text-primary dark:text-accent">AI</span>
              </span>
            </Link>

            <p className="mt-5 max-w-[460px] text-sm leading-7 text-slate-600 dark:text-white/65">
              SignalizeAI helps teams understand what a company sells, who it is
              for, and how ready it looks for outreach by turning public website
              content into clear sales context.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                aria-label="LinkedIn"
                href="https://www.linkedin.com/company/signalizeai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-slate-600 transition hover:border-primary hover:bg-primary hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:border-white dark:hover:bg-white dark:hover:text-[#0a0a0a]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <path d="M18.8065 1.8335H3.16399C2.42474 1.8335 1.83334 2.42489 1.83334 3.16414V18.8362C1.83334 19.5459 2.42474 20.1668 3.16399 20.1668H18.7473C19.4866 20.1668 20.078 19.5754 20.078 18.8362V3.13457C20.1371 2.42489 19.5457 1.8335 18.8065 1.8335ZM7.24464 17.4168H4.55379V8.69371H7.24464V17.4168ZM5.88443 7.48135C4.99733 7.48135 4.31721 6.77167 4.31721 5.91414C4.31721 5.05661 5.0269 4.34694 5.88443 4.34694C6.74196 4.34694 7.45163 5.05661 7.45163 5.91414C7.45163 6.77167 6.8011 7.48135 5.88443 7.48135ZM17.4463 17.4168H14.7554V13.1883C14.7554 12.183 14.7258 10.8523 13.336 10.8523C11.9167 10.8523 11.7097 11.976 11.7097 13.0996V17.4168H9.01884V8.69371H11.6506V9.90608H11.6801C12.0645 9.1964 12.9221 8.48672 14.2527 8.48672C17.0027 8.48672 17.5054 10.2609 17.5054 12.6856V17.4168H17.4463Z" />
                </svg>
              </Link>

              <Link
                aria-label="GitHub"
                href="https://github.com/SignalizeAI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-slate-600 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:border-white dark:hover:bg-white dark:hover:text-[#0a0a0a]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>

              <Link
                aria-label="Discord"
                href="https://discord.gg/eCvhD6WZhX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-slate-600 transition hover:border-accent hover:bg-accent hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:border-white dark:hover:bg-white dark:hover:text-[#0a0a0a]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.5328-9.7413-3.4683-13.6373a.061.061 0 00-.0325-.0277zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-primary dark:text-accent">
              Product
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              {productLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-600 transition hover:text-slate-950 dark:text-white/65 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-primary dark:text-accent">
              Company
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-sm text-slate-600 transition hover:text-slate-950 dark:text-white/65 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-primary dark:text-accent">
              Support
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              {supportLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-sm text-slate-600 transition hover:text-slate-950 dark:text-white/65 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-gray-200 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500 dark:text-white/40">
            &copy; {new Date().getFullYear()} SignalizeAI. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              href="/docs"
              className="text-xs text-slate-500 transition hover:text-slate-900 dark:text-white/40 dark:hover:text-white"
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="text-xs text-slate-500 transition hover:text-slate-900 dark:text-white/40 dark:hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-slate-500 transition hover:text-slate-900 dark:text-white/40 dark:hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
