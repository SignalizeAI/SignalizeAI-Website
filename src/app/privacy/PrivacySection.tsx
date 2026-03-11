type PrivacySectionProps = {
  section: (typeof import("./content").privacySections)[number];
};

const checklistClass =
  "flex items-start gap-3 text-sm leading-7 text-slate-700 dark:text-white/70";

const positiveIcon = (
  <svg className="mt-1 h-5 w-5 shrink-0 text-primary dark:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const negativeIcon = (
  <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PrivacySection = ({ section }: PrivacySectionProps) => (
  <section id={section.id}>
    <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-slate-950 dark:text-white">
      <span className="text-primary dark:text-accent">{section.number}</span>
      {section.title}
    </h2>
    <div className={`${section.subsections ? "border-l-2 border-primary/20 pl-0 sm:pl-8 dark:border-accent/20" : "sm:pl-8"} space-y-6`}>
      {section.intro && <p className="text-slate-700 dark:text-white/70">{section.intro}</p>}
      {section.subsections?.map((subsection) => (
        <div key={subsection.title}>
          <h3 className="mb-2 text-lg font-medium text-slate-950 dark:text-white">{subsection.title}</h3>
          {subsection.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mb-3 leading-8 text-slate-700 dark:text-white/70">{paragraph}</p>
          ))}
          {subsection.negativeItems && (
            <div>
              <span className="mb-2 block text-sm font-semibold text-slate-950 dark:text-white">We do NOT collect:</span>
              <ul className="grid gap-3 text-sm">
                {subsection.negativeItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-700 dark:text-white/70">
                    {negativeIcon}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      {section.items?.length && (
        <ul className="space-y-3">
          {section.items.map((item) => (
            <li key={item} className={checklistClass}>
              {positiveIcon}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {section.permissions?.length && (
        <ul className="space-y-3">
          {section.permissions.map((permission) => (
            <li key={permission.title} className={checklistClass}>
              {positiveIcon}
              <span><strong className="text-slate-950 dark:text-white">{permission.title}:</strong> {permission.desc}</span>
            </li>
          ))}
        </ul>
      )}
      {section.services?.length && (
        <ul className="mb-4 space-y-2 text-slate-700 dark:text-white/70">
          {section.services.map((service) => (
            <li key={service.title}><strong className="text-slate-950 dark:text-white">{service.title}:</strong> {service.desc}</li>
          ))}
        </ul>
      )}
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="text-slate-700 dark:text-white/70">
          {section.id === "contact-us" && paragraph.includes("privacy@signalizeai.org") ? (
            <>
              If you have any questions or concerns regarding privacy, please reach out to us directly at{" "}
              <a href="mailto:privacy@signalizeai.org" className="font-semibold text-primary hover:underline dark:text-accent">
                privacy@signalizeai.org
              </a>.
            </>
          ) : (
            paragraph
          )}
        </p>
      ))}
      {section.note && <p className="text-sm italic text-slate-500 dark:text-white/45">{section.note}</p>}
    </div>
  </section>
);

export default PrivacySection;
