import Link from "next/link";
import { site } from "@/lib/content";
import { PlatformIcon } from "@/components/Icons";

export default function FollowSection() {
  const channels = [
    ...site.socials,
    ...(site.contactEmail
      ? [
          {
            platform: "email",
            label: "Email the band",
            url: `mailto:${site.contactEmail}`,
            showInHeader: false,
          },
        ]
      : []),
  ];

  const [primary, ...rest] = channels;

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-groove-pink/[0.06] to-transparent" />
        <div className="absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-groove-pink/15 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] translate-x-1/2 -translate-y-1/2 rounded-full bg-groove-violet/15 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-groove-pink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-groove-violet/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.4em] text-groove-gold">
          Stay Connected
        </p>
        <h2
          className="font-display mt-4 leading-[0.9] tracking-tight text-white"
          style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)" }}
        >
          Take the groove<br />
          <span className="text-groove">with you.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-white/50">
          Every track from the album on the official store for AU&nbsp;$1.99 —
          the best way to listen and support the band.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4">
          {primary && (
            <a
              href={primary.url}
              target={primary.url.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl p-px"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-groove-orange via-groove-pink to-groove-violet opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-center gap-3 rounded-2xl bg-night px-10 py-5 transition-colors group-hover:bg-night/80">
                <PlatformIcon
                  platform={primary.platform}
                  className="h-6 w-6 text-groove-pink"
                />
                <span className="font-display text-lg tracking-wide text-white">
                  {primary.label}
                </span>
              </div>
            </a>
          )}

          {rest.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {rest.map((channel) => (
                <a
                  key={`${channel.platform}-${channel.url}`}
                  href={channel.url}
                  target={channel.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-night-soft/60 px-6 py-3.5 text-sm transition-all hover:-translate-y-0.5 hover:border-groove-pink/50 hover:shadow-[0_8px_30px_rgba(255,46,166,0.2)]"
                >
                  <PlatformIcon
                    platform={channel.platform}
                    className="h-4.5 w-4.5 text-white/50 transition-colors group-hover:text-groove-pink"
                  />
                  <span className="font-semibold text-white/70 transition-colors group-hover:text-white">
                    {channel.label}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="mt-14 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <Link
            href="/contact"
            className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 transition-colors hover:text-groove-pink"
          >
            Book us for your event
          </Link>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </div>
    </section>
  );
}
