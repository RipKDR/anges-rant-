import { site } from "@/lib/content";
import { PlatformIcon } from "@/components/Icons";

/* Big call-to-action block reused across pages — the conversion point for
   turning visitors into listeners and followers. Renders whatever channels
   exist in content/site.json (plus email when configured), so it scales from
   a single store link today to a full social grid later. */
export default function FollowSection() {
  const channels = [
    ...site.socials,
    ...(site.contactEmail
      ? [
          {
            platform: "email",
            label: "Email the band",
            url: `mailto:${site.contactEmail}`,
          },
        ]
      : []),
  ];

  return (
    <section className="relative overflow-hidden py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,46,166,0.35), transparent)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-display text-4xl text-groove sm:text-5xl">
          Take the groove with you
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          Every track from the album is on the official store for AU $1.99 —
          the best way to listen and support the band while streaming channels
          spin up.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {channels.map((channel) => (
            <a
              key={`${channel.platform}-${channel.url}`}
              href={channel.url}
              target={channel.url.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-night-soft/60 px-8 py-5 transition-all hover:-translate-y-1 hover:border-groove-pink/60 hover:shadow-[0_10px_40px_rgba(255,46,166,0.25)]"
            >
              <PlatformIcon
                platform={channel.platform}
                className="h-6 w-6 text-white/70 transition-colors group-hover:text-groove-pink"
              />
              <span className="font-semibold text-white/80 transition-colors group-hover:text-white">
                {channel.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
