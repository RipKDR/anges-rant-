import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";
import FollowSection from "@/components/FollowSection";
import SectionReveal from "@/components/SectionReveal";
import { MailIcon, MusicNoteIcon, PlatformIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Bookings, collaborations and good old-fashioned fan mail for Ange's Rant.",
};

const officialStore = site.socials.find((s) => s.platform === "store");

export default function ContactPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="diagonal-stripe absolute inset-0 opacity-[0.025]" />
          <div className="animate-float absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-groove-gold/10 blur-3xl" />
          <div className="animate-float absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-groove-pink/15 blur-3xl [animation-delay:-3s]" />
        </div>
        <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
            Let&apos;s Talk
          </p>
          <h1
            className="font-display mt-4 leading-[0.85] tracking-tight text-white"
            style={{ fontSize: "clamp(4rem,14vw,11rem)" }}
          >
            BOOK<br />
            <span className="text-groove">US.</span>
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-white/60">
            Venues, festivals, private events, corporate parties — we bring
            the 80&apos;s funk alive for any stage.
          </p>
        </section>
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {site.contactEmail ? (
            <>
              <SectionReveal>
                <a
                  href={`mailto:${site.contactEmail}?subject=Booking%20enquiry%20—%20Ange's%20Rant`}
                  className="group relative block overflow-hidden rounded-3xl p-px"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-groove-orange via-groove-pink to-groove-violet opacity-30 transition-opacity duration-300 group-hover:opacity-60" />
                  <div className="relative rounded-3xl bg-night-soft/80 p-10 backdrop-blur-sm transition-all group-hover:-translate-y-0.5">
                    <MailIcon className="h-10 w-10 text-groove-pink" />
                    <h2 className="font-display mt-6 text-3xl text-white">
                      Bookings
                    </h2>
                    <p className="mt-3 text-white/60">
                      Venues, festivals, private events — bring the 80&apos;s
                      flavour to your stage.
                    </p>
                    <p className="mt-6 font-semibold text-groove-pink transition-colors group-hover:text-groove-orange">
                      {site.contactEmail} →
                    </p>
                  </div>
                </a>
              </SectionReveal>
              <SectionReveal delay={80}>
                <a
                  href={`mailto:${site.contactEmail}?subject=Hello%20from%20the%20website`}
                  className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-night-soft/50 p-10 transition-all hover:-translate-y-0.5 hover:border-groove-violet/40 hover:shadow-[0_16px_50px_rgba(139,92,246,0.15)]"
                >
                  <span className="font-display text-4xl" aria-hidden="true">
                    👋
                  </span>
                  <h2 className="font-display mt-6 text-3xl text-white">
                    Everything else
                  </h2>
                  <p className="mt-3 text-white/60">
                    Press, collaborations, fan mail and rants of your own —
                    all welcome.
                  </p>
                  <p className="mt-6 font-semibold text-groove-violet transition-colors group-hover:text-groove-pink">
                    Drop us a line →
                  </p>
                </a>
              </SectionReveal>
            </>
          ) : officialStore ? (
            <SectionReveal className="sm:col-span-2">
              <a
                href={officialStore.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-3xl p-px sm:col-span-2"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-groove-orange via-groove-pink to-groove-violet opacity-30 transition-opacity duration-300 group-hover:opacity-60" />
                <div className="relative rounded-3xl bg-night-soft/80 p-10 backdrop-blur-sm transition-all group-hover:-translate-y-0.5 sm:p-14">
                  <MusicNoteIcon className="h-12 w-12 text-groove-pink" />
                  <h2 className="font-display mt-6 text-4xl text-white sm:text-5xl">
                    Reach the band
                  </h2>
                  <p className="mt-4 max-w-xl text-lg text-white/60">
                    Bookings, press, collaborations and fan mail all reach us
                    through the official Ange&apos;s Rant store page — drop a
                    message and we&apos;ll get back to you.
                  </p>
                  <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-groove-pink/30 bg-groove-pink/10 px-6 py-3 text-groove-pink transition-all group-hover:bg-groove-pink group-hover:text-night">
                    <PlatformIcon platform={officialStore.platform} className="h-5 w-5" />
                    <span className="font-bold uppercase tracking-wider">
                      {officialStore.label} →
                    </span>
                  </div>
                </div>
              </a>
            </SectionReveal>
          ) : null}
        </div>

        <SectionReveal delay={120}>
          <div className="mt-10">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-white/30">
              Or find us here
            </p>
            <div className="flex flex-wrap gap-3">
              {site.socials
                .filter((s) => s.platform !== "store")
                .map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-full border border-white/10 bg-night-soft/50 px-5 py-2.5 text-sm font-semibold text-white/60 transition-all hover:border-groove-pink/40 hover:text-groove-pink"
                  >
                    <PlatformIcon platform={social.platform} className="h-4 w-4" />
                    {social.label}
                  </a>
                ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={160}>
          <div className="mt-20 flex flex-col items-center gap-5 rounded-3xl border border-white/[0.06] bg-night-soft/20 px-8 py-16 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-groove-gold">
              While you&apos;re here
            </p>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Have you heard the music?
            </h2>
            <p className="max-w-md text-white/55">
              Four releases of pure funk, soul, and disco. Available everywhere you stream.
            </p>
            <Link
              href="/music"
              className="bg-groove glow-pink mt-2 inline-block rounded-full px-10 py-4 font-bold uppercase tracking-wider text-night transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(255,46,166,0.6)]"
            >
              Listen Now
            </Link>
          </div>
        </SectionReveal>
      </section>

      <FollowSection />
    </>
  );
}
