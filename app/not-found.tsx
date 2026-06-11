import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
      <p className="font-display text-8xl text-groove">404</p>
      <h1 className="font-display mt-4 text-3xl text-white">
        This groove doesn&apos;t exist.
      </h1>
      <p className="mt-3 max-w-md text-white/50">
        The page you&apos;re after has left the dance floor. Let&apos;s get you
        back to the music.
      </p>
      <Link
        href="/"
        className="bg-groove glow-pink mt-8 rounded-full px-8 py-4 font-bold uppercase tracking-wider text-night transition-transform hover:scale-105"
      >
        Back home
      </Link>
    </section>
  );
}
