import Link from "next/link";
import { site } from "@/lib/content";
import { PlatformIcon } from "@/components/Icons";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/band", label: "The Band" },
  { href: "/shows", label: "Shows" },
  { href: "/contact", label: "Book" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const store = site.socials.find((s) => s.platform === "store");

  return (
    <footer className="relative border-t border-white/[0.06] bg-night">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-groove-pink/25 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] lg:gap-16">
          {/* Brand */}
          <div>
            <p className="font-display text-groove text-4xl leading-none sm:text-5xl">
              ANGE&apos;S RANT
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
              {site.tagline}
            </p>
            <div className="mt-6 flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-groove-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/25">
                {site.location}
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-2.5">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.35em] text-white/25">
              Navigate
            </p>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/50 transition-colors hover:text-groove-pink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-white/25">
              Listen & Follow
            </p>
            <div className="flex flex-col gap-3">
              {site.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-white/45 transition-colors hover:text-groove-pink"
                >
                  <PlatformIcon
                    platform={social.platform}
                    className="h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-groove-pink"
                  />
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/[0.05] pt-8 text-xs text-white/20 sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name} · Made with groove in {site.location}
          </p>
          {store && (
            <a
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-groove-gold"
            >
              All tracks available on the official store →
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
