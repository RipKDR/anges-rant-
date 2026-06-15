"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SpotifyIcon } from "@/components/Icons";

export default function StickyFollowBar({ spotifyUrl }: { spotifyUrl: string }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-3 mb-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-night/90 p-2 shadow-[0_-8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider text-black"
          style={{ background: "#1DB954" }}
        >
          <SpotifyIcon className="h-4 w-4" />
          Follow
        </a>
        <Link
          href="/contact"
          className="flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white/80"
        >
          Book
        </Link>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/40 transition-colors hover:text-white"
        >
          <span className="relative block h-4 w-4">
            <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 -rotate-45 bg-current" />
          </span>
        </button>
      </div>
    </div>
  );
}
