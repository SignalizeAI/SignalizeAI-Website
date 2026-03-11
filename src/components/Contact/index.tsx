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
        isPageVariant ? "py-0" : "py-16 md:py-20 lg:py-[120px]"
      }`}
    >
      {!isPageVariant && (
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-gray-100 to-gray-50 dark:from-[#000000] dark:to-[#0a0a0a]" />
      )}

      <div className="container relative z-10 px-4">
        {!isPageVariant && <ContactIntro />}

        {isPageVariant && (
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
              <div className="ud-contact-content-wrapper">
                <ContactDetails />
              </div>
            </div>
            <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
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
        )}
      </div>
    </section>
  );
};

export default Contact;
