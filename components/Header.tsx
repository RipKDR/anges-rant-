"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/content";
import { PlatformIcon } from "@/components/Icons";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/band", label: "The Band" },
  { href: "/shows", label: "Shows" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerSocials = site.socials.filter((s) => s.showInHeader);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-night/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl tracking-wide text-groove sm:text-2xl"
          onClick={() => setOpen(false)}
        >
          ANGE&apos;S RANT
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b-2 pb-0.5 text-sm font-medium uppercase tracking-widest transition-colors hover:text-groove-pink ${
                  active
                    ? "border-groove-pink text-groove-pink"
                    : "border-transparent text-white/70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {headerSocials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-white/60 transition-all hover:scale-110 hover:text-groove-pink"
            >
              <PlatformIcon platform={social.platform} className="h-5 w-5" />
            </a>
          ))}
          <Link
            href="/music"
            className="bg-groove rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wider text-night transition-transform hover:scale-105"
          >
            Listen
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-white transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <nav
        className={`overflow-hidden border-t border-white/5 bg-night/95 backdrop-blur-md transition-all duration-300 ease-in-out md:hidden ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        <div className="px-6 py-6">
          <ul className="flex flex-col gap-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl text-white/90 transition-colors hover:text-groove-pink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-5">
            {site.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-white/60 transition-colors hover:text-groove-pink"
              >
                <PlatformIcon platform={social.platform} className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
