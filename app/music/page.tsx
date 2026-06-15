import type { Metadata } from "next";
import Image from "next/image";
import { releases, releaseMeta, spotifyUrl } from "@/lib/content";
import VinylDisc from "@/components/VinylDisc";
import ListenButtons from "@/components/ListenButtons";
import FollowSection from "@/components/FollowSection";
import SectionReveal from "@/components/SectionReveal";
import SpotifySpotlight from "@/components/SpotifySpotlight";
import { PlatformIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Listen to Ange's Rant — the debut album Another Time and more. Funk, soul and disco with an 80's flavour.",
  alternates: { canonical: "/music" },
};

function isoDuration(d?: string): string | undefined {
  if (!d) return undefined;
  const parts = d.split(":").map((n) => parseInt(n, 10));
  if (parts.some(Number.isNaN)) return undefined;
  const [m, s] = parts.length === 2 ? parts : [0, parts[0]];
  return `PT${m}M${s}S`;
}

const discographyJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: releases.map((release, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": release.type.toLowerCase() === "album" ? "MusicAlbum" : "MusicRecording",
      name: release.title,
      byArtist: { "@type": "MusicGroup", name: "Ange's Rant" },
      ...(release.totalTracks ? { numTracks: release.totalTracks } : {}),
      ...(release.tracks.length
        ? {
            track: release.tracks.map((t) => ({
              "@type": "MusicRecording",
              name: t.title,
              ...(isoDuration(t.duration) ? { duration: isoDuration(t.duration) } : {}),
            })),
          }
        : {}),
    },
  })),
};

export default function MusicPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(discographyJsonLd) }}
      />
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="diagonal-stripe absolute inset-0 opacity-[0.02]" />
          <div className="absolute -left-32 -top-16 h-96 w-96 rounded-full bg-groove-violet/20 blur-3xl" />
          <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-groove-pink/15 blur-3xl" />
        </div>
        <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
            Discography
          </p>
          <h1
            className="font-display mt-4 leading-[0.88] tracking-tight text-groove"
            style={{ fontSize: "clamp(3.5rem,10vw,7rem)" }}
          >
            The Music
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Every track is a homage to the artists that shaped the journey —
            played loud, with love, and built to keep you movin&apos;.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-groove-pink/20 bg-groove-pink/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-groove-pink">
              {releases.length} releases
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              Melbourne, AU
            </span>
          </div>
        </section>
      </div>

      {spotifyUrl && (
        <SectionReveal>
          <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
            <SpotifySpotlight spotifyUrl={spotifyUrl} variant="bare" />
          </div>
        </SectionReveal>
      )}

      {releases.map((release, index) => (
        <SectionReveal key={release.slug} delay={index * 60}>
          <section
            id={release.slug}
            className="mx-auto max-w-6xl px-4 py-10 sm:px-6"
          >
            <div className="relative overflow-hidden rounded-3xl p-px">
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-groove-orange via-groove-pink to-groove-violet opacity-20"
                aria-hidden="true"
              />
              <div className="relative grid items-start gap-10 rounded-3xl bg-night-soft/80 p-8 backdrop-blur-sm sm:p-12 lg:grid-cols-[260px_1fr]">
                <div>
                  <div
                    className="group mx-auto w-full max-w-[220px] lg:mx-0"
                    style={{ transform: "rotate(-2deg)" }}
                  >
                    {release.cover ? (
                      <Image
                        src={release.cover}
                        alt={`${release.title} cover art`}
                        width={300}
                        height={300}
                        className="aspect-square w-full rounded-2xl object-cover shadow-[0_18px_60px_rgba(255,46,166,0.3)] transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <VinylDisc
                        title={release.title.toUpperCase()}
                        subtitle="Ange's Rant"
                        className="w-full shadow-[0_18px_60px_rgba(255,46,166,0.3)] transition-transform duration-700 group-hover:rotate-[18deg]"
                      />
                    )}
                  </div>
                  <div className="mx-auto mt-8 max-w-[220px] lg:mx-0">
                    <ListenButtons links={release.links} />
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-groove-gold">
                      {releaseMeta(release)}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-0.5 text-xs font-bold uppercase tracking-widest ${
                        release.type === "album"
                          ? "border-groove-orange/30 bg-groove-orange/10 text-groove-orange"
                          : "border-groove-pink/30 bg-groove-pink/10 text-groove-pink"
                      }`}
                    >
                      {release.type}
                    </span>
                  </div>
                  <h2 className="font-display mt-4 text-4xl text-white sm:text-5xl">
                    {release.title}
                  </h2>
                  <p className="mt-5 leading-relaxed text-white/60">
                    {release.description}
                  </p>

                  {release.spotifyEmbedId && (
                    <div className="mt-10">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
                        Listen
                      </p>
                      <iframe
                        src={`https://open.spotify.com/embed/album/${release.spotifyEmbedId}?utm_source=generator&theme=0`}
                        width="100%"
                        height={release.type === "Album" ? 352 : 152}
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        style={{ borderRadius: "12px" }}
                        title={`Listen to ${release.title} on Spotify`}
                      />
                    </div>
                  )}

                  {release.youtubeEmbedId && (
                    <div className="mt-10">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
                        Music Video
                      </p>
                      <div className="overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
                        <iframe
                          src={`https://www.youtube.com/embed/${release.youtubeEmbedId}`}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          loading="lazy"
                          title={`${release.title} — Music Video`}
                          style={{ display: "block" }}
                        />
                      </div>
                    </div>
                  )}

                  {release.tracks.length > 0 && (
                    <div className="mt-10">
                      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
                        Tracklist
                      </p>
                      <ol className="divide-y divide-white/[0.06]">
                        {release.tracks.map((track, i) => (
                          <li
                            key={track.title}
                            className="group/track -mx-2 flex items-center gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-white/[0.04]"
                          >
                            <span className="font-display w-8 shrink-0 text-sm text-groove-pink">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 text-white/80 transition-colors group-hover/track:text-white">
                              {track.title}
                            </span>
                            {track.duration && (
                              <span className="tabular-nums text-xs text-white/30">
                                {track.duration}
                              </span>
                            )}
                            {track.links?.map((link) => (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${link.label}: ${track.title}`}
                                className="rounded-full border border-white/10 p-1.5 text-white/40 transition-all hover:border-groove-pink hover:text-groove-pink"
                              >
                                <PlatformIcon
                                  platform={link.platform}
                                  className="h-3.5 w-3.5"
                                />
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
                            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-groove-pink underline-offset-4 transition-colors hover:text-groove-orange hover:underline"
                          >
                            Hear all {release.totalTracks} tracks on the
                            official store →
                          </a>
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>
      ))}

      <FollowSection />
    </>
  );
}
