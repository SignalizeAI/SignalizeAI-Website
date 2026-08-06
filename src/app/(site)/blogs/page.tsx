import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "SignalizeAI blog updates and upcoming deep dives on selling, targeting, and outreach.",
};

export default function BlogsPage() {
  return (
    <main aria-label="Blogs" className="flex min-h-[60vh] items-center justify-center px-4">
      <section className="max-w-2xl text-center">
        <h1 className="mb-4 text-3xl font-semibold text-ink dark:text-white sm:text-4xl">
          Blog
        </h1>
        <p className="text-base text-muted dark:text-white/60">
          No posts yet. Guides and deep dives on selling, targeting, and outreach are coming soon.
        </p>
      </section>
    </main>
  );
}
