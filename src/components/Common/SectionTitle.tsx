const SectionTitle = ({
  subtitle,
  title,
  paragraph,
  width = "635px",
  center,
}: {
  subtitle?: React.ReactNode;
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
}) => {
  return (
    <div className="-mx-4 flex flex-wrap">
      <div
        className={`wow fadeInUp w-full px-4 ${center ? "mx-auto text-center" : ""
          }`}
        data-wow-delay=".1s"
        style={{ maxWidth: width }}
      >
        {subtitle && (
          <span className="mb-4 inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
            {subtitle}
          </span>
        )}
        <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-[45px] leading-tight">
          {title}
        </h2>
        <p className="text-base leading-8 text-slate-600 dark:text-white/60 sm:text-lg">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SectionTitle;
