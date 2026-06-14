import type { Metadata } from "next";
import Link from "next/link";
import { spotifyUrl } from "@/lib/content";
import { SpotifyIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Page not found",
};

const LINKS = [
  { href: "/music", label: "Music" },
  { href: "/band", label: "The Band" },
  { href: "/shows", label: "Shows" },
  { href: "/contact", label: "Book the band" },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-16 text-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="diagonal-stripe absolute inset-0 opacity-[0.02]" />
        <div className="animate-float absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-groove-pink/12 blur-3xl" />
      </div>

      <div className="relative">
        <p className="font-display text-8xl text-groove sm:text-9xl">404</p>
        <h1 className="font-display mt-4 text-3xl text-white sm:text-4xl">
          This groove doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-white/50">
          The page you&apos;re after has left the dance floor. Let&apos;s get you
          back to the music.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="bg-groove glow-pink rounded-full px-8 py-4 font-bold uppercase tracking-wider text-night transition-transform hover:scale-105"
          >
            Back home
          </Link>
          {spotifyUrl && (
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-105"
              style={{ background: "#1DB954" }}
            >
              <SpotifyIcon className="h-4 w-4" />
              Follow on Spotify
            </a>
          )}
        </div>

        <nav
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          aria-label="Site"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-white/40 underline-offset-4 transition-colors hover:text-groove-pink hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
