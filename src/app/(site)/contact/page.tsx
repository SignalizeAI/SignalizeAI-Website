import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | SignalizeAI",
  description:
    "Contact SignalizeAI for product support, privacy questions, workflow help, or team inquiries.",
};

const ContactPage = () => {
  return (
    <Contact variant="page" />
  );
};

export default ContactPage;
