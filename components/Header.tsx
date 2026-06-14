"use client";

import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const headerSocials = site.socials.filter((s) => s.showInHeader);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-groove-pink/20 bg-night/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="font-display text-xl tracking-wide text-groove sm:text-2xl"
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
              className="bg-groove glow-pink rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wider text-night transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,46,166,0.6)]"
            >
              Listen
            </Link>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-night transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="font-display text-xl tracking-wide text-groove sm:text-2xl"
            onClick={() => setOpen(false)}
          >
            ANGE&apos;S RANT
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <span className="relative block h-6 w-6">
              <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rotate-45 bg-white" />
              <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 -rotate-45 bg-white" />
            </span>
          </button>
        </div>

        <nav
          className="flex flex-1 flex-col items-center justify-center gap-8 px-8"
          aria-label="Mobile"
        >
          {NAV.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`font-display text-5xl transition-colors hover:text-groove-pink ${
                  active ? "text-groove" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-center gap-5 px-8 pb-12">
          {site.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="rounded-full border border-white/20 p-3 text-white/60 transition-all hover:border-groove-pink hover:text-groove-pink"
            >
              <PlatformIcon platform={social.platform} className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
