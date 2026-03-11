import Image from "next/image";
import Link from "next/link";

const Logo = () => (
  <Link href="/" className="group flex items-center gap-2">
    <div className="relative h-7 w-7 transition-transform duration-300 group-hover:scale-110">
      <Image
        src="/images/logo/logo-dark.png"
        alt="SignalizeAI Logo"
        fill
        sizes="28px"
        className="object-contain dark:hidden"
      />
      <Image
        src="/images/logo/logo-white.png"
        alt="SignalizeAI Logo"
        fill
        sizes="28px"
        className="hidden object-contain dark:block"
      />
    </div>
    <span className="text-lg font-bold tracking-tight text-slate-900 transition-all duration-300 dark:text-white">
      Signalize<span className="text-primary dark:text-accent">AI</span>
    </span>
  </Link>
);

export default Logo;
