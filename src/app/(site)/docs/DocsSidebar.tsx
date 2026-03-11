import { docsNav } from "./content";

const DocsSidebar = () => (
  <aside className="lg:sticky lg:top-28 lg:self-start">
    <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0a0a0a]">
      <div className="border-b border-gray-200 px-6 py-5 dark:border-white/10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary dark:text-accent">On this page</p>
      </div>
      <nav className="px-4 py-4">
        <div className="space-y-2">
          {docsNav.map((item) => (
            <a key={item.href} href={item.href} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-gray-50 hover:text-slate-950 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white">
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  </aside>
);

export default DocsSidebar;
