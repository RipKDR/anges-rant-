import { site } from "@/lib/content";
import { PlatformIcon } from "@/components/Icons";

/* Big social call-to-action block reused across pages — the conversion point
   for turning visitors into followers. */
export default function FollowSection() {
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
          Follow the groove
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          New tracks, behind-the-scenes rants and gig news land on our channels
          first. Pick your platform and come hang.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {site.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-night-soft/60 px-5 py-5 transition-all hover:-translate-y-1 hover:border-groove-pink/60 hover:shadow-[0_10px_40px_rgba(255,46,166,0.25)]"
            >
              <PlatformIcon
                platform={social.platform}
                className="h-6 w-6 text-white/70 transition-colors group-hover:text-groove-pink"
              />
              <span className="font-semibold text-white/80 transition-colors group-hover:text-white">
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
