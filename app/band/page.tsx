import type { Metadata } from "next";
import Image from "next/image";
import { site, members } from "@/lib/content";
import FollowSection from "@/components/FollowSection";
import SectionReveal from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "The Band",
  description:
    "Meet Ange's Rant — Angelo Pisano and the Melbourne musicians behind the funk.",
};

const accentMap = [
  {
    border: "hover:border-groove-pink/60",
    shadow: "hover:shadow-[0_16px_50px_rgba(255,46,166,0.2)]",
    role: "text-groove-pink",
    badge: "border-groove-pink/20 bg-groove-pink/10 text-groove-pink",
    ring: "ring-groove-pink/20",
  },
  {
    border: "hover:border-groove-orange/60",
    shadow: "hover:shadow-[0_16px_50px_rgba(255,122,24,0.2)]",
    role: "text-groove-orange",
    badge: "border-groove-orange/20 bg-groove-orange/10 text-groove-orange",
    ring: "ring-groove-orange/20",
  },
  {
    border: "hover:border-groove-violet/60",
    shadow: "hover:shadow-[0_16px_50px_rgba(139,92,246,0.2)]",
    role: "text-groove-violet",
    badge: "border-groove-violet/20 bg-groove-violet/10 text-groove-violet",
    ring: "ring-groove-violet/20",
  },
  {
    border: "hover:border-groove-gold/60",
    shadow: "hover:shadow-[0_16px_50px_rgba(255,209,102,0.2)]",
    role: "text-groove-gold",
    badge: "border-groove-gold/20 bg-groove-gold/10 text-groove-gold",
    ring: "ring-groove-gold/20",
  },
];

export default function BandPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="diagonal-stripe absolute inset-0 opacity-[0.02]" />
          <div className="absolute -left-32 -top-16 h-96 w-96 rounded-full bg-groove-orange/15 blur-3xl" />
          <div className="absolute -right-20 top-16 h-80 w-80 rounded-full bg-groove-violet/20 blur-3xl" />
        </div>
        <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
            The Story
          </p>
          <h1
            className="font-display mt-4 leading-[0.88] tracking-tight text-groove"
            style={{ fontSize: "clamp(3.5rem,10vw,7rem)" }}
          >
            The Band
          </h1>
        </section>
      </div>

      <SectionReveal>
        <section className="border-y border-white/[0.06] bg-night-soft/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
                  Origin story
                </p>
                <h2 className="font-display mt-4 text-3xl text-white sm:text-4xl">
                  One bass player&apos;s love letter to the groove
                </h2>
              </div>
              <div className="space-y-5 text-lg leading-relaxed text-white/60">
                {site.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionReveal>
          <div className="mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
              Meet the players
            </p>
            <h2 className="font-display mt-4 text-3xl text-white sm:text-4xl">
              The people behind the groove
            </h2>
          </div>
        </SectionReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => {
            const accent = accentMap[i % accentMap.length];
            const initials = member.name
              .split(" ")
              .map((part) => part[0])
              .join("");

            return (
              <SectionReveal key={member.name} delay={i * 70}>
                <article
                  className={`group overflow-hidden rounded-3xl border border-white/[0.08] bg-night-soft/50 transition-all duration-300 hover:-translate-y-1 ${accent.border} ${accent.shadow}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-night">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-night-soft to-night">
                        <div
                          className={`flex h-24 w-24 items-center justify-center rounded-full ring-2 ${accent.ring} bg-night-soft`}
                        >
                          <span className="text-groove font-display text-4xl">
                            {initials}
                          </span>
                        </div>
                      </div>
                    )}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-night-soft/80 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${accent.badge}`}
                      >
                        {member.role}
                      </span>
                    </div>
                  </div>

                  <div className="px-6 pb-7 pt-5">
                    <h3 className="font-display text-2xl text-white">
                      {member.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      {member.blurb}
                    </p>
                  </div>
                </article>
              </SectionReveal>
            );
          })}
        </div>
      </section>

      <FollowSection />
    </>
  );
}
