import type { Metadata } from "next";
import { site, members } from "@/lib/content";
import FollowSection from "@/components/FollowSection";

export const metadata: Metadata = {
  title: "The Band",
  description:
    "Meet Ange's Rant — Angelo Pisano and the Melbourne musicians behind the funk.",
};

export default function BandPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 -top-16 h-80 w-80 rounded-full bg-groove-orange/15 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 top-16 h-72 w-72 rounded-full bg-groove-violet/20 blur-3xl" aria-hidden="true" />
        <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
            The story
          </p>
          <h1 className="font-display mt-4 text-5xl text-groove sm:text-7xl">
            The Band
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-lg text-white/70">
            {site.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl text-white sm:text-4xl">
          The players
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <article
              key={member.name}
              className="group rounded-3xl border border-white/10 bg-night-soft/60 p-8 transition-all hover:-translate-y-1 hover:border-groove-pink/50 hover:shadow-[0_14px_50px_rgba(255,46,166,0.2)]"
            >
              {member.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <span className="bg-groove flex h-24 w-24 items-center justify-center rounded-full font-display text-3xl text-night">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
              )}
              <h3 className="mt-6 font-display text-2xl text-white">{member.name}</h3>
              <p className="mt-1 text-sm font-bold uppercase tracking-widest text-groove-pink">
                {member.role}
              </p>
              <p className="mt-4 text-white/60">{member.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <FollowSection />
    </>
  );
}
