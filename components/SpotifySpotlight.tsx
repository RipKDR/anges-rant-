"use client";

import { useEffect, useRef, useState } from "react";
import { SpotifyIcon, UsersIcon, CheckIcon } from "@/components/Icons";

type Props = {
  /** Public Spotify profile URL — the Follow button always works, even with no API. */
  spotifyUrl: string;
  /** Tighter spacing / no outer section padding when embedded inside another section. */
  variant?: "section" | "bare";
};

const SPOTIFY_GREEN = "#1DB954";

function useCountUp(target: number | null, durationMs = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (target == null) return;
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduce) {
        setValue(target);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / durationMs, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && run(),
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [target, durationMs]);

  return { value, ref };
}

export default function SpotifySpotlight({ spotifyUrl, variant = "section" }: Props) {
  const [followers, setFollowers] = useState<number | null>(null);
  const { value, ref } = useCountUp(followers);

  useEffect(() => {
    let active = true;
    fetch("/api/spotify/artist")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (active && data && typeof data.followers === "number") {
          setFollowers(data.followers);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const hasCount = followers != null && followers > 0;

  const card = (
    <div
      ref={ref}
      className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 p-px"
    >
      <div
        className="absolute inset-0 rounded-[2rem] opacity-60"
        style={{
          background:
            "linear-gradient(120deg, rgba(29,185,84,0.5), rgba(255,46,166,0.35), rgba(139,92,246,0.4))",
        }}
        aria-hidden="true"
      />
      <div className="relative rounded-[2rem] bg-night-soft/85 px-7 py-10 backdrop-blur-md sm:px-12 sm:py-12">
        <div className="flex flex-col items-center text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: SPOTIFY_GREEN, background: "rgba(29,185,84,0.1)" }}
          >
            <SpotifyIcon className="h-4 w-4" />
            On Spotify
          </span>

          {hasCount ? (
            <>
              <p className="font-display mt-7 text-6xl leading-none text-white tabular-nums sm:text-7xl">
                {value.toLocaleString("en-AU")}
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/50">
                <UsersIcon className="h-4 w-4 text-[#1DB954]" />
                followers &amp; growing
              </p>
            </>
          ) : (
            <h2 className="font-display mt-7 text-3xl leading-tight text-white sm:text-4xl">
              New funk in your library,
              <br />
              <span className="text-groove">on repeat.</span>
            </h2>
          )}

          <p className="mx-auto mt-6 max-w-md text-white/60">
            {hasCount
              ? "Hit follow and every new Ange's Rant release lands straight in your library — plus you're first to hear when we drop a track or announce a show."
              : "Follow the band and every new release lands straight in your library — and you're first to know when we announce a show."}
          </p>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/45">
            {["New releases first", "Show announcements", "Zero spam"].map((perk) => (
              <li key={perk} className="flex items-center gap-1.5">
                <CheckIcon className="h-3.5 w-3.5 text-[#1DB954]" />
                {perk}
              </li>
            ))}
          </ul>

          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-3 rounded-full px-10 py-4 text-base font-bold uppercase tracking-wider text-black transition-all hover:scale-[1.04]"
            style={{
              background: SPOTIFY_GREEN,
              boxShadow: "0 0 44px rgba(29,185,84,0.45)",
            }}
          >
            <SpotifyIcon className="h-5 w-5" />
            Follow on Spotify
          </a>
        </div>
      </div>
    </div>
  );

  if (variant === "bare") return card;

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">{card}</section>
  );
}
