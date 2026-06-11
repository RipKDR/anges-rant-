import Link from "next/link";
import { site, featuredRelease, members, shows, formatShowDate } from "@/lib/content";
import Marquee from "@/components/Marquee";
import VinylDisc from "@/components/VinylDisc";
import ListenButtons from "@/components/ListenButtons";
import FollowSection from "@/components/FollowSection";
import { PlayIcon } from "@/components/Icons";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="animate-float absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-groove-violet/25 blur-3xl" />
          <div className="animate-float absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-groove-pink/20 blur-3xl [animation-delay:-3s]" />
          <div className="animate-float absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-groove-orange/15 blur-3xl [animation-delay:-5s]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
              {site.location}
            </p>
            <h1 className="font-display mt-4 text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
              <span className="text-groove">FUNK.</span>
              <br />
              <span className="text-white">SOUL.</span>
              <br />
              <span className="text-groove">DISCO.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/70">{site.shortBio}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/music"
                className="bg-groove glow-pink inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold uppercase tracking-wider text-night transition-transform hover:scale-105"
              >
                <PlayIcon className="h-5 w-5" />
                Listen Now
              </Link>
              <Link
                href="/band"
                className="inline-flex items-center rounded-full border border-white/20 px-8 py-4 font-semibold text-white/80 transition-all hover:border-groove-pink hover:text-groove-pink"
              >
                Meet the Band
              </Link>
            </div>
          </div>

          {featuredRelease && (
            <Link href="/music" className="group relative mx-auto w-64 sm:w-80" aria-label={`Latest release: ${featuredRelease.title}`}>
              <VinylDisc
                title={featuredRelease.title.toUpperCase()}
                subtitle={site.name}
                className="w-full transition-transform group-hover:scale-105"
              />
              <span className="bg-groove absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-night">
                Out now · {featuredRelease.title}
              </span>
            </Link>
          )}
        </div>
      </section>

      <Marquee />

      {/* Featured release */}
      {featuredRelease && (
        <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
            Latest release
          </p>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-5xl text-white sm:text-6xl">
                {featuredRelease.title}
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-white/40">
                {featuredRelease.type} · {featuredRelease.year} ·{" "}
                {featuredRelease.tracks.length > 1
                  ? `${featuredRelease.tracks.length} tracks`
                  : "13 tracks"}
              </p>
              <p className="mt-6 text-white/70">{featuredRelease.description}</p>
              <div className="mt-8">
                <ListenButtons links={featuredRelease.links} />
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-night-soft/60 p-8">
              <h3 className="font-display text-xl text-groove">On the record</h3>
              <ul className="mt-5 space-y-3">
                {featuredRelease.tracks.map((track, i) => (
                  <li key={track.title} className="flex items-center gap-4 text-white/80">
                    <span className="font-display w-7 text-groove-pink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {track.title}
                  </li>
                ))}
                <li className="flex items-center gap-4 text-white/40">
                  <span className="font-display w-7">…</span>
                  <Link href="/music" className="underline-offset-4 transition-colors hover:text-groove-pink hover:underline">
                    Full tracklist & ways to listen →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* About teaser */}
      <section className="border-y border-white/5 bg-night-soft/40">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
                The story
              </p>
              <h2 className="font-display mt-4 text-4xl text-white sm:text-5xl">
                One bass player&apos;s love letter to the groove
              </h2>
              <p className="mt-6 text-white/70">{site.bio[0]}</p>
              <Link
                href="/band"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-groove-pink transition-colors hover:text-groove-orange"
              >
                Read the full story →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:content-center">
              {members.slice(0, 6).map((member) => (
                <Link
                  key={member.name}
                  href="/band"
                  className="group rounded-2xl border border-white/10 bg-night/60 p-4 text-center transition-all hover:-translate-y-1 hover:border-groove-pink/50"
                >
                  <span className="bg-groove mx-auto flex h-14 w-14 items-center justify-center rounded-full font-display text-lg text-night">
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <p className="mt-3 text-sm font-semibold text-white/90">{member.name}</p>
                  <p className="mt-0.5 text-xs text-white/40">{member.role}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shows teaser */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
              Live
            </p>
            <h2 className="font-display mt-4 text-4xl text-white sm:text-5xl">
              Catch us movin&apos;
            </h2>
          </div>
          <Link
            href="/shows"
            className="font-semibold text-groove-pink transition-colors hover:text-groove-orange"
          >
            All shows →
          </Link>
        </div>
        <div className="mt-10">
          {shows.upcoming.length > 0 ? (
            <ul className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-night-soft/60">
              {shows.upcoming.slice(0, 3).map((show) => (
                <li
                  key={`${show.date}-${show.venue}`}
                  className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-white">{show.venue}</p>
                    <p className="text-sm text-white/50">
                      {formatShowDate(show.date)} · {show.city}
                    </p>
                  </div>
                  {show.ticketUrl && (
                    <a
                      href={show.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-groove rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wider text-night"
                    >
                      Tickets
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/15 px-8 py-12 text-center">
              <p className="font-display text-2xl text-white/80">
                No gigs announced… yet.
              </p>
              <p className="mx-auto mt-3 max-w-md text-white/50">
                Follow us on socials to be the first to know when Ange&apos;s Rant
                hits a stage near you.
              </p>
            </div>
          )}
        </div>
      </section>

      <FollowSection />
    </>
  );
}
