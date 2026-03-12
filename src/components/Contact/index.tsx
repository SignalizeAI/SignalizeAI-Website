"use client";

import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import ContactIntro from "./ContactIntro";
import useContactForm from "./useContactForm";

const Contact = ({ variant = "home" }: { variant?: "home" | "page" }) => {
  const { errorMessage, formData, handleChange, handleSubmit, status } = useContactForm();
  const isPageVariant = variant === "page";

  return (
    <section
      id="contact"
      className={`relative bg-gray-50 dark:bg-[#000000] ${
        isPageVariant ? "overflow-hidden pb-20 pt-28 md:pb-24 md:pt-32 lg:pb-28 lg:pt-36" : "py-16 md:py-20 lg:py-[120px]"
      }`}
    >
      {isPageVariant && (
        <>
          <div className="pointer-events-none absolute left-1/2 top-8 h-56 w-[42rem] -translate-x-1/2 rounded-full bg-primary/6 blur-[120px] dark:bg-primary/10" />
          <div className="pointer-events-none absolute bottom-8 right-0 h-48 w-48 translate-x-1/4 rounded-full bg-accent/6 blur-[120px] dark:bg-accent/10" />
        </>
      )}
      {!isPageVariant && (
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-gray-100 to-gray-50 dark:from-[#000000] dark:to-[#0a0a0a]" />
      )}

      <div className="container relative z-10 max-w-7xl px-4">
        {!isPageVariant && <ContactIntro />}

        {isPageVariant && (
          <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-gray-200 bg-white/92 p-6 shadow-[0_32px_80px_-48px_rgba(15,23,42,0.24)] dark:border-white/10 dark:bg-[#0b0b0b]/92 dark:shadow-[0_32px_80px_-48px_rgba(0,0,0,0.7)] sm:p-8 lg:p-10">
            <div className="grid h-full gap-8 xl:grid-cols-[minmax(0,0.82fr)_minmax(460px,1.18fr)]">
              <div className="space-y-8">
                <ContactIntro variant="page" />
                <ContactDetails />
              </div>
              <div className="h-full">
                <ContactForm
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  status={status}
                  errorMessage={errorMessage}
                  isPageVariant
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
