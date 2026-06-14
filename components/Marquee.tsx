const STRIP_A = ["FUNK", "SOUL", "DISCO", "80'S FLAVOUR", "KEEP MOVIN'", "MELBOURNE"].map((w) => `${w}  ·  `).join("");
const STRIP_B = ["LIVE LOUD", "GROOVE NEVER DIES", "ANOTHER TIME", "MADE IN MELBOURNE", "BORN IN THE 80'S"].map((w) => `${w}  ·  `).join("");

export default function Marquee() {
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div className="bg-groove py-3.5">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-display px-2 text-base tracking-[0.4em] text-night"
            >
              {STRIP_A}
            </span>
          ))}
        </div>
      </div>
      <div className="border-b border-white/[0.05] bg-night-soft/50 py-3 backdrop-blur-sm">
        <div className="animate-marquee-reverse flex w-max whitespace-nowrap">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-display px-2 text-sm tracking-[0.35em] text-groove-pink/40"
            >
              {STRIP_B}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
