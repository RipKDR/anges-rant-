import type { Metadata } from "next";
import { site } from "@/lib/content";
import FollowSection from "@/components/FollowSection";
import { MailIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Bookings, collaborations and good old-fashioned fan mail for Ange's Rant.",
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
          Say hello
        </p>
        <h1 className="font-display mt-4 text-5xl text-groove sm:text-7xl">Contact</h1>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          Want the funk at your venue, festival or party? Got a collaboration
          idea, or just want to tell us which track keeps you movin&apos;? We
          read everything.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <a
            href={`mailto:${site.contactEmail}?subject=Booking%20enquiry%20—%20Ange's%20Rant`}
            className="group rounded-3xl border border-white/10 bg-night-soft/60 p-10 transition-all hover:-translate-y-1 hover:border-groove-pink/60 hover:shadow-[0_14px_50px_rgba(255,46,166,0.2)]"
          >
            <MailIcon className="h-10 w-10 text-groove-pink" />
            <h2 className="font-display mt-6 text-3xl text-white">Bookings</h2>
            <p className="mt-3 text-white/60">
              Venues, festivals, private events — bring the 80&apos;s flavour to
              your stage.
            </p>
            <p className="mt-6 font-semibold text-groove-pink transition-colors group-hover:text-groove-orange">
              {site.contactEmail} →
            </p>
          </a>

          <a
            href={`mailto:${site.contactEmail}?subject=Hello%20from%20the%20website`}
            className="group rounded-3xl border border-white/10 bg-night-soft/60 p-10 transition-all hover:-translate-y-1 hover:border-groove-pink/60 hover:shadow-[0_14px_50px_rgba(255,46,166,0.2)]"
          >
            <span className="font-display text-4xl" aria-hidden="true">👋</span>
            <h2 className="font-display mt-6 text-3xl text-white">Everything else</h2>
            <p className="mt-3 text-white/60">
              Press, collaborations, fan mail and rants of your own — all welcome.
            </p>
            <p className="mt-6 font-semibold text-groove-pink transition-colors group-hover:text-groove-orange">
              Drop us a line →
            </p>
          </a>
        </div>
      </section>

      <FollowSection />
    </>
  );
}
