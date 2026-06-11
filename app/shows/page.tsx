import type { Metadata } from "next";
import { shows, formatShowDate, site } from "@/lib/content";
import FollowSection from "@/components/FollowSection";

export const metadata: Metadata = {
  title: "Shows",
  description: "Upcoming Ange's Rant gigs and live dates.",
};

export default function ShowsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
          Live
        </p>
        <h1 className="font-display mt-4 text-5xl text-groove sm:text-7xl">Shows</h1>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {shows.upcoming.length > 0 ? (
          <ul className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-night-soft/60">
            {shows.upcoming.map((show) => (
              <li
                key={`${show.date}-${show.venue}`}
                className="flex flex-col gap-4 px-8 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="font-display text-3xl text-groove-pink">
                      {new Date(`${show.date}T00:00:00`).getDate()}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                      {new Date(`${show.date}T00:00:00`).toLocaleDateString("en-AU", { month: "short" })}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{show.venue}</p>
                    <p className="text-sm text-white/50">
                      {formatShowDate(show.date)} · {show.city}
                    </p>
                    {show.note && <p className="mt-1 text-sm text-white/40">{show.note}</p>}
                  </div>
                </div>
                {show.ticketUrl && (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-groove glow-pink self-start rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider text-night transition-transform hover:scale-105 sm:self-auto"
                  >
                    Tickets
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 px-8 py-20 text-center">
            <p className="font-display text-3xl text-white/85 sm:text-4xl">
              The stage is being warmed up.
            </p>
            <p className="mx-auto mt-4 max-w-md text-white/50">
              No gigs announced right now — but the groove never sleeps. Follow
              us below or get in touch about booking the band.
            </p>
            <a
              href={`mailto:${site.contactEmail}?subject=Booking%20enquiry%20—%20Ange's%20Rant`}
              className="bg-groove glow-pink mt-8 inline-block rounded-full px-8 py-4 font-bold uppercase tracking-wider text-night transition-transform hover:scale-105"
            >
              Book the band
            </a>
          </div>
        )}

        {shows.past.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl text-white/70">Past shows</h2>
            <ul className="mt-6 space-y-3 text-white/40">
              {shows.past.map((show) => (
                <li key={`${show.date}-${show.venue}`}>
                  {formatShowDate(show.date)} — {show.venue}, {show.city}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <FollowSection />
    </>
  );
}
