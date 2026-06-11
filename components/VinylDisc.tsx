/* Cover-art stand-in: a spinning vinyl record with the release title on the label. */
export default function VinylDisc({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`vinyl animate-spin-slow relative aspect-square ${className}`}>
      <div className="absolute inset-0 m-auto flex h-[34%] w-[34%] flex-col items-center justify-center rounded-full bg-gradient-to-br from-groove-orange via-groove-pink to-groove-violet p-2 text-center">
        <span className="font-display text-[0.6rem] leading-tight text-night sm:text-xs">
          {title}
        </span>
        {subtitle && (
          <span className="mt-0.5 text-[0.45rem] font-semibold uppercase tracking-wider text-night/70 sm:text-[0.55rem]">
            {subtitle}
          </span>
        )}
        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-night" />
      </div>
    </div>
  );
}
