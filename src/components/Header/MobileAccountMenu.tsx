"use client";

import Image from "next/image";
import Link from "next/link";

type MobileAccountMenuProps = {
  name: string;
  avatarUrl: string | null;
  onClose: () => void;
  onSignOut: () => void;
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

export default function MobileAccountMenu({
  name,
  avatarUrl,
  onClose,
  onSignOut,
}: MobileAccountMenuProps) {
  return (
    <div className="border-t border-gray-100 pt-3 dark:border-white/10">
      <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 dark:bg-white/5">
        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] text-xs font-bold text-white">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <span>{getInitials(name)}</span>
          )}
        </div>
        <div className="min-w-0 truncate text-sm font-semibold text-slate-900 dark:text-white">
          {name}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href="/prospects"
          onClick={onClose}
          className="flex rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 dark:text-white/78 dark:hover:bg-white/5 dark:hover:text-white"
        >
          Saved Prospects
        </Link>
        <button
          type="button"
          onClick={() => {
            onClose();
            onSignOut();
          }}
          className="flex rounded-xl px-4 py-3 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50 hover:text-rose-700 dark:text-rose-300 dark:hover:bg-rose-500/10 dark:hover:text-rose-200"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
