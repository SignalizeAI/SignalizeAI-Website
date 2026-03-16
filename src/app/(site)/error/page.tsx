import Breadcrumb from "@/components/Common/Breadcrumb";
import NotFound from "@/components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page | SignalizeAI",
  description: "The page could not be found on SignalizeAI.",
};

const ErrorPage = () => {
  return (
    <main>
      <Breadcrumb pageName="404 Page" />

      <NotFound />
    </main>
  );
};

export default ErrorPage;
