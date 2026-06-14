import type { Metadata } from "next";
import Link from "next/link";
import { shows, site, spotifyUrl, formatShowDate } from "@/lib/content";
import FollowSection from "@/components/FollowSection";
import SectionReveal from "@/components/SectionReveal";
import { PlatformIcon, SpotifyIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Shows",
  description: "Upcoming Ange's Rant gigs and live dates.",
};

export default function ShowsPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="diagonal-stripe absolute inset-0 opacity-[0.02]" />
          <div className="absolute -left-32 -top-16 h-96 w-96 rounded-full bg-groove-pink/15 blur-3xl" />
          <div className="absolute -right-20 top-8 h-80 w-80 rounded-full bg-groove-orange/15 blur-3xl" />
        </div>
        <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
            Live
          </p>
          <h1
            className="font-display mt-4 leading-[0.88] tracking-tight text-groove"
            style={{ fontSize: "clamp(3.5rem,10vw,7rem)" }}
          >
            Shows
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/60">
            Catch the groove in the flesh — pure funk, soul, and disco energy,
            live on stage.
          </p>
        </section>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {shows.upcoming.length > 0 ? (
          <SectionReveal>
            <div className="relative pl-10 sm:pl-14">
              <div
                className="pointer-events-none absolute bottom-0 left-3 top-0 w-0.5 bg-gradient-to-b from-groove-pink via-groove-pink/40 to-transparent sm:left-5"
                aria-hidden="true"
              />
              <ul className="space-y-5">
                {shows.upcoming.map((show) => {
                  const d = new Date(`${show.date}T00:00:00`);
                  return (
                    <li
                      key={`${show.date}-${show.venue}`}
                      className="group relative"
                    >
                      <div
                        className="absolute -left-[2.375rem] top-7 h-3.5 w-3.5 rounded-full border-2 border-groove-pink bg-night shadow-[0_0_10px_rgba(255,46,166,0.5)] transition-transform duration-300 group-hover:scale-125 sm:-left-[3.125rem]"
                        aria-hidden="true"
                      />
                      <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-night-soft/60 px-6 py-6 transition-all hover:-translate-y-0.5 hover:border-groove-pink/30 hover:shadow-[0_8px_40px_rgba(255,46,166,0.12)] sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-6">
                          <div className="shrink-0 text-center">
                            <p className="font-display text-4xl leading-none text-groove-pink">
                              {d.getDate()}
                            </p>
                            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                              {d.toLocaleDateString("en-AU", { month: "short" })}
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">
                              {d.getFullYear()}
                            </p>
                          </div>
                          <div className="h-12 w-px bg-white/10" aria-hidden="true" />
                          <div>
                            <p className="text-lg font-semibold text-white">
                              {show.venue}
                            </p>
                            <p className="mt-0.5 text-sm text-white/50">
                              {formatShowDate(show.date)} · {show.city}
                            </p>
                            {show.note && (
                              <p className="mt-1 text-sm text-white/35">
                                {show.note}
                              </p>
                            )}
                          </div>
                        </div>
                        {show.ticketUrl ? (
                          <a
                            href={show.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-groove glow-pink self-start rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wider text-night transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,46,166,0.6)] sm:self-auto"
                          >
                            Get Tickets
                          </a>
                        ) : (
                          <span className="self-start rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/40 sm:self-auto">
                            Free entry
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </SectionReveal>
        ) : (
          <SectionReveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-night-soft/30 px-8 py-32 text-center">
              <p
                className="font-display pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[10rem] leading-none text-white/[0.025] sm:text-[14rem]"
                aria-hidden="true"
              >
                STAY<br />TUNED
              </p>
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="h-72 w-72 animate-pulse-glow rounded-full bg-groove-pink/10 blur-3xl" />
              </div>
              <div className="relative">
                <div
                  className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-groove-pink to-transparent"
                  aria-hidden="true"
                />
                <p className="font-display text-3xl leading-snug text-white sm:text-5xl">
                  The stage is<br />being warmed up.
                </p>
                <p className="mx-auto mt-6 max-w-md text-lg text-white/50">
                  No dates on the board right now. Follow on Spotify and
                  you&apos;ll be notified the moment we announce a show — and
                  every time we drop new music.
                </p>
                {spotifyUrl && (
                  <div className="mt-9">
                    <a
                      href={spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-105"
                      style={{ background: "#1DB954", boxShadow: "0 0 40px rgba(29,185,84,0.4)" }}
                    >
                      <SpotifyIcon className="h-5 w-5" />
                      Follow on Spotify
                    </a>
                  </div>
                )}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {site.socials
                    .filter((s) => s.platform !== "spotify")
                    .map((s) => (
                      <a
                        key={s.platform}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-night/60 px-5 py-2.5 text-sm font-semibold text-white/60 transition-all hover:border-groove-pink hover:text-groove-pink"
                      >
                        <PlatformIcon platform={s.platform} className="h-4 w-4" />
                        {s.label}
                      </a>
                    ))}
                </div>
                <div className="mt-10 border-t border-white/[0.06] pt-8">
                  <p className="mb-4 text-sm text-white/40">
                    Putting on an event? Bring the funk to your stage.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block rounded-full border border-groove-pink/40 px-9 py-3.5 font-bold uppercase tracking-wider text-groove-pink transition-all hover:bg-groove-pink hover:text-night"
                  >
                    Book the band
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>
        )}

        {shows.past.length > 0 && (
          <SectionReveal delay={200}>
            <div className="mt-20 border-t border-white/[0.06] pt-16">
              <h2 className="font-display text-2xl text-white/50 sm:text-3xl">
                Past shows
              </h2>
              <ul className="mt-8 space-y-3">
                {shows.past.map((show) => (
                  <li
                    key={`${show.date}-${show.venue}`}
                    className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-white/30"
                  >
                    <span className="font-display text-sm text-groove-pink/50">
                      {new Date(`${show.date}T00:00:00`).getFullYear()}
                    </span>
                    <span>{show.venue}</span>
                    <span className="text-sm text-white/20">{show.city}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        )}
      </section>

      <FollowSection />
    </>
  );
}
