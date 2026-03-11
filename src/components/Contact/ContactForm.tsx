import type { ChangeEvent, FormEvent } from "react";
import type { SubmitStatus } from "./useContactForm";

type ContactFormProps = {
  formData: { fullName: string; email: string; phone: string; message: string };
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  status: SubmitStatus;
  errorMessage: string | null;
  isPageVariant: boolean;
};

const inputClassName =
  "w-full border-0 border-b border-gray-300 bg-transparent pb-3 text-slate-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none dark:border-white/20 dark:text-white dark:placeholder:text-white/30 dark:focus:border-accent";

const ContactForm = ({
  errorMessage,
  formData,
  handleChange,
  handleSubmit,
  isPageVariant,
  status,
}: ContactFormProps) => (
  <div className="wow fadeInUp rounded-[2rem] border border-gray-200 bg-white px-6 py-8 shadow-xl dark:border-white/10 dark:bg-[#111111] dark:shadow-2xl sm:px-10 sm:py-12 md:p-[60px] lg:p-10 lg:px-10 lg:py-12 2xl:p-[60px]">
    <h3 className="mb-3 text-2xl font-semibold text-slate-900 dark:text-white md:text-[28px] md:leading-[1.42]">
      {isPageVariant ? "Contact the team" : "Send a message"}
    </h3>
    <p className="mb-8 text-sm leading-7 text-slate-600 dark:text-white/60">
      {isPageVariant
        ? "Include your browser, the kind of page you were analyzing, and what you expected to happen."
        : "We usually reply fastest when the request includes the browser, URL type, and the exact issue or workflow you are asking about."}
    </p>
    <form onSubmit={handleSubmit}>
      {[
        ["fullName", "Full Name*", "Adam Gelius", "text", "name"],
        ["email", "Email*", "example@yourmail.com", "email", "email"],
        ["phone", "Phone", "+885 1254 5211 552", "text", "tel"],
      ].map(([name, label, placeholder, type, autoComplete]) => (
        <div key={name} className="mb-[22px]">
          <label htmlFor={name} className="mb-4 block text-sm font-medium text-slate-700 dark:text-white/70">
            {label}
          </label>
          <input
            suppressHydrationWarning={name === "email"}
            type={type}
            id={name}
            name={name}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={name !== "phone"}
            className={inputClassName}
          />
        </div>
      ))}
      <div className="mb-[30px]">
        <label htmlFor="message" className="mb-4 block text-sm font-medium text-slate-700 dark:text-white/70">
          Message*
        </label>
        <textarea
          id="message"
          name="message"
          autoComplete="on"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="type your message here"
          required
          className={`${inputClassName} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-10 py-3.5 text-base font-semibold text-white transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none dark:text-black"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="mt-4 text-center text-sm text-primary dark:text-accent" role="status" aria-live="polite">
          Thanks! We received your message and will get back to you.
        </p>
      )}
      {status === "error" && errorMessage && (
        <p className="mt-4 text-center text-sm text-red-500" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  </div>
);

export default ContactForm;
