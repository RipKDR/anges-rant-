import type { Metadata } from "next";
import { releases, releaseMeta } from "@/lib/content";
import VinylDisc from "@/components/VinylDisc";
import ListenButtons from "@/components/ListenButtons";
import FollowSection from "@/components/FollowSection";
import { PlatformIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Listen to Ange's Rant — the debut album Another Time and more. Funk, soul and disco with an 80's flavour.",
};

export default function MusicPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
          Discography
        </p>
        <h1 className="font-display mt-4 text-5xl text-groove sm:text-7xl">
          The Music
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          Every track is a homage to the artists that shaped the journey —
          played loud, with love, and built to keep you movin&apos;.
        </p>
      </section>

      {releases.map((release) => (
        <section
          key={release.slug}
          className="mx-auto max-w-6xl px-4 py-12 sm:px-6"
          id={release.slug}
        >
          <div className="grid gap-12 rounded-3xl border border-white/10 bg-night-soft/50 p-8 sm:p-12 lg:grid-cols-[1fr_1.3fr]">
            <div className="mx-auto w-full max-w-xs lg:mx-0">
              {release.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={release.cover}
                  alt={`${release.title} cover art`}
                  className="aspect-square w-full rounded-2xl object-cover shadow-[0_18px_60px_rgba(255,46,166,0.25)]"
                />
              ) : (
                <VinylDisc title={release.title.toUpperCase()} subtitle="Ange's Rant" className="w-full" />
              )}
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-groove-gold">
                {releaseMeta(release)}
              </p>
              <h2 className="font-display mt-3 text-4xl text-white sm:text-5xl">
                {release.title}
              </h2>
              <p className="mt-5 text-white/70">{release.description}</p>

              <div className="mt-8">
                <ListenButtons links={release.links} />
              </div>

              {release.tracks.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-white/40">
                    Tracklist
                  </h3>
                  <ol className="mt-4 divide-y divide-white/5">
                    {release.tracks.map((track, i) => (
                      <li
                        key={track.title}
                        className="group flex items-center gap-4 py-3"
                      >
                        <span className="font-display w-8 text-groove-pink">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 font-medium text-white/85 transition-colors group-hover:text-white">
                          {track.title}
                        </span>
                        {track.duration && (
                          <span className="text-sm text-white/35">{track.duration}</span>
                        )}
                        {track.links?.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${link.label}: ${track.title}`}
                            className="rounded-full border border-white/10 p-2 text-white/50 transition-all hover:border-groove-pink hover:text-groove-pink"
                          >
                            <PlatformIcon platform={link.platform} className="h-4 w-4" />
                          </a>
                        ))}
                      </li>
                    ))}
                  </ol>
                  {release.totalTracks &&
                    release.tracks.length < release.totalTracks &&
                    release.links[0] && (
                      <a
                        href={release.links[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-sm font-semibold text-groove-pink underline-offset-4 transition-colors hover:text-groove-orange hover:underline"
                      >
                        Hear all {release.totalTracks} tracks on the official
                        store →
                      </a>
                    )}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <FollowSection />
    </>
  );
}
