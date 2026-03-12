import { detailCards } from "./contactContent";

const helpChecklist = [
  "your browser",
  "the page you analyzed",
  "what you expected",
  "what happened instead",
];

const ContactDetails = () => (
  <div className="max-w-xl xl:mb-0">
    {detailCards.map((card) => (
      <div
        key={card.title}
        className="rounded-[1.5rem] border border-gray-200 bg-gray-50/90 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 sm:p-6"
      >
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{card.title}</h3>
        <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-white/65">
          <p className="font-medium text-slate-700 dark:text-white/72">Include:</p>
          <ul className="mt-3 space-y-2">
            {helpChecklist.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary dark:bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
);

export default ContactDetails;
