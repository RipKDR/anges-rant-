const WORDS = ["FUNK", "SOUL", "DISCO", "80'S FLAVOUR", "KEEP MOVIN'", "MELBOURNE"];

export default function Marquee() {
  const strip = WORDS.map((word) => `${word} ★ `).join("");
  return (
    <div className="bg-groove overflow-hidden py-3" aria-hidden="true">
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-display px-2 text-lg tracking-[0.3em] text-night"
          >
            {strip}
          </span>
        ))}
      </div>
    </div>
  );
}
