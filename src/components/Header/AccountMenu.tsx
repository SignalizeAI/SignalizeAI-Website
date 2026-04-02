"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
type AccountMenuProps = {
  name: string;
  avatarUrl: string | null;
  sticky: boolean;
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

export default function AccountMenu({
  name,
  avatarUrl,
  sticky,
  onSignOut,
}: AccountMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative hidden lg:block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`flex items-center rounded-full border py-2 transition-all ${
          sticky
            ? "gap-0 border-slate-200 bg-white/95 px-2 shadow-sm hover:border-slate-300 dark:border-white/10 dark:bg-white/8 dark:hover:border-white/20"
            : "gap-3 border-slate-200/80 bg-white/70 px-3 hover:border-slate-300 dark:border-white/10 dark:bg-white/6 dark:hover:border-white/20"
        }`}
      >
        <div className={`text-right transition-all ${sticky ? "hidden" : "block"}`}>
          <div className="max-w-[140px] truncate text-sm font-semibold text-slate-900 dark:text-white">
            {name}
          </div>
        </div>
        <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] text-xs font-bold text-white">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              fill
              sizes="36px"
              className="object-cover"
            />
          ) : (
            <span>{getInitials(name)}</span>
          )}
        </div>
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-50 mt-3 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.28)] dark:border-white/10 dark:bg-[#111111]">
          <Link
            href="/prospects"
            onClick={() => setOpen(false)}
            className="flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950 dark:text-white/78 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Saved Prospects
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onSignOut();
            }}
            className="mt-1 flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50 hover:text-rose-700 dark:text-rose-300 dark:hover:bg-rose-500/10 dark:hover:text-rose-200"
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
