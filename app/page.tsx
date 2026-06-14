import Image from "next/image";
import Link from "next/link";
import {
  site,
  spotifyUrl,
  featuredRelease,
  members,
  shows,
  formatShowDate,
  releaseMeta,
} from "@/lib/content";
import Marquee from "@/components/Marquee";
import SpotifySpotlight from "@/components/SpotifySpotlight";
import VinylDisc from "@/components/VinylDisc";
import ListenButtons from "@/components/ListenButtons";
import FollowSection from "@/components/FollowSection";
import SectionReveal from "@/components/SectionReveal";
import VideoSection from "@/components/VideoSection";
import GallerySection from "@/components/GallerySection";
import { PlayIcon, PlatformIcon, SpotifyIcon } from "@/components/Icons";

export default function HomePage() {
  const nextShow = shows.upcoming[0] ?? null;

  const memberAccents = [
    "hover:border-groove-pink/60 hover:shadow-[0_8px_30px_rgba(255,46,166,0.2)]",
    "hover:border-groove-orange/60 hover:shadow-[0_8px_30px_rgba(255,122,24,0.2)]",
    "hover:border-groove-violet/60 hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)]",
    "hover:border-groove-gold/60 hover:shadow-[0_8px_30px_rgba(255,209,102,0.2)]",
    "hover:border-groove-pink/60 hover:shadow-[0_8px_30px_rgba(255,46,166,0.2)]",
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="halftone absolute inset-0 opacity-[0.04]" />
          <div className="diagonal-stripe absolute inset-0 opacity-[0.02]" />
          <div className="animate-float absolute -left-40 top-1/3 h-[460px] w-[460px] rounded-full bg-groove-violet/15 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:py-32">
          {/* Text */}
          <div>
            <div className="rise inline-flex items-center gap-2.5 rounded-full border border-groove-gold/30 bg-groove-gold/10 px-4 py-1.5" style={{ animationDelay: "0.05s" }}>
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-groove-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-groove-gold">
                {site.location}
              </span>
            </div>

            <h1 className="font-display mt-6 font-extrabold leading-[0.82]" style={{ fontSize: "clamp(4rem,11vw,8.5rem)" }}>
              <span className="text-groove block">FUNK.</span>
              <span className="block text-white">SOUL.</span>
              <span className="text-groove block">DISCO.</span>
            </h1>

            <p className="rise mt-7 max-w-lg text-lg leading-relaxed text-white/60" style={{ animationDelay: "0.44s" }}>
              {site.shortBio}
            </p>

            <div className="rise mt-10 space-y-4" style={{ animationDelay: "0.56s" }}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/music"
                  className="bg-groove glow-pink inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-night transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(255,46,166,0.7)]"
                >
                  <PlayIcon className="h-4 w-4" />
                  Listen Now
                </Link>
                <Link
                  href={nextShow ? "/shows" : "/contact"}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:border-groove-pink hover:text-groove-pink"
                >
                  {nextShow
                    ? `Next show: ${formatShowDate(nextShow.date)}`
                    : "Book the Band →"}
                </Link>
              </div>
              {site.socials.find((s) => s.platform === "spotify") && (
                <a
                  href={site.socials.find((s) => s.platform === "spotify")!.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#1DB954] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-105 hover:bg-[#1ed760] hover:shadow-[0_0_32px_rgba(29,185,84,0.5)]"
                >
                  <SpotifyIcon className="h-4 w-4" />
                  Follow on Spotify
                </a>
              )}
            </div>
          </div>

          {/* Vinyl */}
          <div className="rise relative mx-auto w-72 lg:mx-0 lg:w-full lg:max-w-sm" style={{ animationDelay: "0.3s" }}>
            <div
              className="groove-rings animate-spin-sun pointer-events-none absolute -inset-12 m-auto"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 m-auto h-3/4 w-3/4 rounded-full bg-groove-pink/25 blur-3xl"
              aria-hidden="true"
            />
            <Link
              href="/music"
              className="group relative block"
              aria-label="Listen to our latest music"
            >
              <VinylDisc
                title={featuredRelease?.title.toUpperCase() ?? "ANGE'S RANT"}
                subtitle="Ange's Rant"
                className="w-full transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            {featuredRelease && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-night-soft/80 px-5 py-4 text-center backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-groove-gold">
                  Latest Release
                </p>
                <p className="mt-1 font-display text-xl text-white">
                  {featuredRelease.title}
                </p>
                <p className="mt-0.5 text-xs text-white/40">
                  {releaseMeta(featuredRelease)}
                </p>
                {featuredRelease.links[0] && (
                  <a
                    href={featuredRelease.links[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-groove-pink transition-colors hover:text-groove-orange"
                  >
                    <PlatformIcon
                      platform={featuredRelease.links[0].platform}
                      className="h-3.5 w-3.5"
                    />
                    {featuredRelease.links[0].label}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Marquee />

      {/* ── Spotify spotlight — primary conversion goal ── */}
      {spotifyUrl && (
        <SectionReveal>
          <SpotifySpotlight spotifyUrl={spotifyUrl} />
        </SectionReveal>
      )}

      {/* ── Featured Release ── */}
      {featuredRelease && (
        <SectionReveal>
          <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
              Latest Release
            </p>
            <div className="relative mt-8 overflow-hidden rounded-3xl p-px">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-groove-orange via-groove-pink to-groove-violet opacity-30" />
              <div className="relative grid items-center gap-10 rounded-3xl bg-night-soft/80 p-8 sm:p-12 backdrop-blur-sm lg:grid-cols-[auto_1fr]">
                <div
                  className="mx-auto w-52 lg:mx-0"
                  style={{ transform: "rotate(-3deg)" }}
                >
                  {featuredRelease.cover ? (
                    <Image
                      src={featuredRelease.cover}
                      alt={`${featuredRelease.title} cover art`}
                      width={300}
                      height={300}
                      className="aspect-square w-full rounded-2xl object-cover shadow-[0_24px_80px_rgba(255,46,166,0.4)]"
                    />
                  ) : (
                    <VinylDisc
                      title={featuredRelease.title.toUpperCase()}
                      subtitle="Ange's Rant"
                      className="w-full shadow-[0_24px_80px_rgba(255,46,166,0.4)]"
                    />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-groove-gold">
                    {releaseMeta(featuredRelease)}
                  </p>
                  <h2 className="font-display mt-3 text-4xl text-white sm:text-5xl">
                    {featuredRelease.title}
                  </h2>
                  <p className="mt-4 text-white/60">{featuredRelease.description}</p>
                  <div className="mt-8">
                    <ListenButtons links={featuredRelease.links} />
                  </div>
                  <div className="mt-8">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                      On the record
                    </p>
                    <ol className="divide-y divide-white/5">
                      {featuredRelease.tracks.map((track, i) => (
                        <li
                          key={track.title}
                          className="flex items-center gap-4 py-2.5 text-white/75"
                        >
                          <span className="font-display w-7 text-sm text-groove-pink">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1 text-sm">{track.title}</span>
                          {track.duration && (
                            <span className="text-xs text-white/35">
                              {track.duration}
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                    <Link
                      href="/music"
                      className="mt-4 inline-block text-sm font-semibold text-groove-pink underline-offset-4 transition-colors hover:text-groove-orange hover:underline"
                    >
                      Full catalogue & ways to listen →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>
      )}

      {/* ── About ── */}
      <SectionReveal>
        <section className="border-y border-white/5 bg-night-soft/30">
          <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
                  The Story
                </p>
                <h2 className="font-display mt-4 text-4xl text-white sm:text-5xl">
                  One bass player&apos;s love letter to the groove
                </h2>
                <p className="mt-6 leading-relaxed text-white/60">{site.bio[0]}</p>
                <Link
                  href="/band"
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-groove-pink transition-colors hover:text-groove-orange"
                >
                  Meet the full band →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:content-center">
                {members.slice(0, 6).map((member, i) => (
                  <Link
                    key={member.name}
                    href="/band"
                    className={`group rounded-2xl border border-white/10 bg-night/60 p-4 text-center transition-all hover:-translate-y-1 ${memberAccents[i % memberAccents.length]}`}
                  >
                    <div className="relative mx-auto h-14 w-14 overflow-hidden rounded-full">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <span className="bg-groove absolute inset-0 flex items-center justify-center font-display text-lg text-night">
                          {member.name
                            .split(" ")
                            .map((p) => p[0])
                            .join("")}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-white/90">
                      {member.name}
                    </p>
                    <p className="mt-0.5 text-xs text-white/40">{member.role}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── Shows ── */}
      <SectionReveal>
        <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
                Live
              </p>
              <h2 className="font-display mt-4 text-4xl text-white sm:text-5xl">
                Catch us movin&apos;
              </h2>
            </div>
            {shows.upcoming.length > 0 && (
              <Link
                href="/shows"
                className="font-semibold text-groove-pink transition-colors hover:text-groove-orange"
              >
                All shows →
              </Link>
            )}
          </div>

          {shows.upcoming.length > 0 ? (
            <ul className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-night-soft/60">
              {shows.upcoming.slice(0, 3).map((show) => (
                <li
                  key={`${show.date}-${show.venue}`}
                  className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-5">
                    <div className="text-center">
                      <p className="font-display text-3xl leading-none text-groove-pink">
                        {new Date(`${show.date}T00:00:00`).getDate()}
                      </p>
                      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                        {new Date(`${show.date}T00:00:00`).toLocaleDateString(
                          "en-AU",
                          { month: "short" }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{show.venue}</p>
                      <p className="text-sm text-white/50">
                        {formatShowDate(show.date)} · {show.city}
                      </p>
                    </div>
                  </div>
                  {show.ticketUrl && (
                    <a
                      href={show.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-groove self-start rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wider text-night transition-transform hover:scale-105 sm:self-auto"
                    >
                      Tickets
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-night-soft/40 p-12 text-center">
              <p
                className="font-display pointer-events-none absolute inset-0 flex items-center justify-center text-[8rem] leading-none text-white/[0.04] sm:text-[12rem]"
                aria-hidden="true"
              >
                SOON
              </p>
              <p className="font-display relative text-3xl text-white">
                The stage is being warmed up.
              </p>
              <p className="relative mx-auto mt-4 max-w-sm text-white/50">
                No gigs announced yet — follow us on socials to be the first to know.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                {site.socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-night/60 px-5 py-2.5 text-sm font-semibold text-white/70 transition-all hover:border-groove-pink hover:text-groove-pink"
                  >
                    <PlatformIcon platform={s.platform} className="h-4 w-4" />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>
      </SectionReveal>

      <VideoSection />

      <GallerySection />

      <FollowSection />
    </>
  );
}
