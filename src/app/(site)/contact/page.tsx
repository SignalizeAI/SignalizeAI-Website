import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SignalizeAI for product support, privacy questions, workflow help, or team inquiries.",
};

const ContactPage = () => {
  return (
    <main>
      <Contact variant="page" />
    </main>
  );
};

export default ContactPage;
