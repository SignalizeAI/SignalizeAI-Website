import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className="!scroll-smooth"
      data-scroll-behavior="smooth"
      lang="en"
    >
      <body suppressHydrationWarning className="bg-white text-dark dark:bg-[#000000] dark:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
