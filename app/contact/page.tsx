import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";
import FollowSection from "@/components/FollowSection";
import SectionReveal from "@/components/SectionReveal";
import BookingForm from "@/components/BookingForm";
import { MailIcon, PlatformIcon, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Book the Band",
  description:
    "Book Ange's Rant for your venue, festival, private party or corporate event. Live funk, soul and disco from Melbourne.",
};

const WHAT_YOU_GET = [
  "Full live band — bass, drums, guitar, saxes/keys & vocals",
  "Funk, soul & disco that fills the floor, 80's flavour throughout",
  "Flexible sets — one long set or multiple brackets",
  "Originals from the album plus the grooves people know",
  "Self-contained & punctual — we make load-in easy",
];

export default function ContactPage() {
  const channels = site.socials.filter((s) => s.platform !== "store");

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="diagonal-stripe absolute inset-0 opacity-[0.025]" />
          <div className="animate-float absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-groove-gold/10 blur-3xl" />
          <div className="animate-float absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-groove-pink/15 blur-3xl [animation-delay:-3s]" />
        </div>
        <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
            Bookings
          </p>
          <h1
            className="font-display mt-4 leading-[0.85] tracking-tight text-white"
            style={{ fontSize: "clamp(4rem,14vw,11rem)" }}
          >
            BOOK<br />
            <span className="text-groove">THE BAND.</span>
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-white/60">
            Venues, festivals, private parties, corporate events — we bring the
            80&apos;s funk alive for any stage. Tell us what you&apos;re planning
            and we&apos;ll get straight back to you.
          </p>
        </section>
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          {/* Form */}
          <SectionReveal>
            <div className="relative overflow-hidden rounded-3xl p-px">
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-groove-orange via-groove-pink to-groove-violet opacity-25"
                aria-hidden="true"
              />
              <div className="relative rounded-3xl bg-night-soft/80 p-7 backdrop-blur-sm sm:p-10">
                <h2 className="font-display text-2xl text-white sm:text-3xl">
                  Send an enquiry
                </h2>
                <p className="mt-2 text-sm text-white/50">
                  Takes a minute. Fields marked * are required.
                </p>
                <div className="mt-8">
                  <BookingForm contactEmail={site.contactEmail} />
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* What you get + channels */}
          <SectionReveal delay={80}>
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/[0.08] bg-night-soft/50 p-7 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-groove-gold">
                  What you get
                </p>
                <ul className="mt-5 space-y-3.5">
                  {WHAT_YOU_GET.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/70">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-groove-pink" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {site.contactEmail && (
                <a
                  href={`mailto:${site.contactEmail}?subject=Booking%20enquiry%20%E2%80%94%20Ange's%20Rant`}
                  className="group flex items-center gap-4 rounded-3xl border border-white/[0.08] bg-night-soft/50 p-6 transition-all hover:-translate-y-0.5 hover:border-groove-pink/40"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-groove-pink/10">
                    <MailIcon className="h-6 w-6 text-groove-pink" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.25em] text-white/40">
                      Prefer email?
                    </span>
                    <span className="font-semibold text-white transition-colors group-hover:text-groove-pink">
                      {site.contactEmail}
                    </span>
                  </span>
                </a>
              )}

              <div className="rounded-3xl border border-white/[0.08] bg-night-soft/50 p-7 sm:p-8">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                  Find us
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {channels.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 rounded-full border border-white/10 bg-night/50 px-4 py-2.5 text-sm font-semibold text-white/60 transition-all hover:border-groove-pink/40 hover:text-groove-pink"
                    >
                      <PlatformIcon platform={social.platform} className="h-4 w-4" />
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={160}>
          <div className="mt-16 flex flex-col items-center gap-5 rounded-3xl border border-white/[0.06] bg-night-soft/20 px-8 py-14 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-groove-gold">
              While you&apos;re here
            </p>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Hear the band before you book
            </h2>
            <p className="max-w-md text-white/55">
              Four releases of pure funk, soul and disco — give them a spin, then
              picture them filling your room.
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
