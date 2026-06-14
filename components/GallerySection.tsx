import Image from "next/image";
import { gallery } from "@/lib/content";
import { InstagramIcon } from "@/components/Icons";
import SectionReveal from "@/components/SectionReveal";

const INSTAGRAM_URL = "https://www.instagram.com/angesrant/";

export default function GallerySection() {
  if (gallery.length === 0) return null;

  const [hero, ...rest] = gallery;

  return (
    <SectionReveal>
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
              Gallery
            </p>
            <h2 className="font-display mt-4 text-4xl text-white sm:text-5xl">
              Life in the groove
            </h2>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 font-semibold text-groove-pink transition-colors hover:text-groove-orange sm:flex"
          >
            <InstagramIcon className="h-5 w-5" />
            @angesrant →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {hero && (
            <a
              href={hero.instagramUrl ?? INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative col-span-2 row-span-2 overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-square w-full overflow-hidden sm:aspect-auto sm:h-full sm:min-h-[400px]">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 66vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm font-semibold text-white/90 line-clamp-2">
                    {hero.alt}
                  </p>
                </div>
              </div>
            </a>
          )}

          {rest.map((photo) => (
            <a
              key={photo.src}
              href={photo.instagramUrl ?? INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/70 transition-all hover:border-groove-pink hover:text-groove-pink"
          >
            <InstagramIcon className="h-4 w-4" />
            Follow @angesrant on Instagram
          </a>
        </div>
      </section>
    </SectionReveal>
  );
}
