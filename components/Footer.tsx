import Link from "next/link";
import { site } from "@/lib/content";
import { PlatformIcon } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-night-soft/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <p className="font-display text-3xl text-groove">ANGE&apos;S RANT</p>
          <p className="max-w-md text-sm text-white/50">{site.tagline}</p>

          <div className="flex flex-wrap justify-center gap-5">
            {site.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="rounded-full border border-white/10 p-3 text-white/60 transition-all hover:scale-110 hover:border-groove-pink hover:text-groove-pink"
              >
                <PlatformIcon platform={social.platform} className="h-5 w-5" />
              </a>
            ))}
          </div>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-6 text-xs font-medium uppercase tracking-widest text-white/40">
            <Link href="/" className="transition-colors hover:text-groove-pink">Home</Link>
            <Link href="/music" className="transition-colors hover:text-groove-pink">Music</Link>
            <Link href="/band" className="transition-colors hover:text-groove-pink">The Band</Link>
            <Link href="/shows" className="transition-colors hover:text-groove-pink">Shows</Link>
            <Link href="/contact" className="transition-colors hover:text-groove-pink">Contact</Link>
          </nav>

          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {site.name} · Made with groove in {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
