import type { TrackLink } from "@/lib/content";
import { PlatformIcon } from "@/components/Icons";

/* Row of streaming/purchase buttons. `primary` renders the first link as a filled CTA. */
export default function ListenButtons({
  links,
  primary = true,
}: {
  links: TrackLink[];
  primary?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link, i) => {
        const isPrimary = primary && i === 0;
        return (
          <a
            key={`${link.platform}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={
              isPrimary
                ? "bg-groove glow-pink inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider text-night transition-transform hover:scale-105"
                : "inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-groove-pink hover:text-groove-pink"
            }
          >
            <PlatformIcon platform={link.platform} className="h-4 w-4" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
