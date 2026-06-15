import Image from "next/image";
import { fetchChannelVideos } from "@/lib/youtube";
import { PlayIcon, YouTubeIcon } from "@/components/Icons";
import SectionReveal from "@/components/SectionReveal";

const CHANNEL_URL = "https://youtube.com/channel/UCkPr6Zy3aoPVX5Yntw39UAQ";

export default async function VideoSection() {
  const videos = await fetchChannelVideos(6);
  if (videos.length === 0) return null;

  return (
    <SectionReveal>
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-groove-gold">
              Videos
            </p>
            <h2 className="font-display mt-4 text-4xl text-white sm:text-5xl">
              Watch the groove
            </h2>
          </div>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 font-semibold text-groove-pink transition-colors hover:text-groove-orange sm:flex"
          >
            <YouTubeIcon className="h-5 w-5" />
            All videos →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-night-soft/60 transition-all duration-300 hover:-translate-y-1 hover:border-groove-pink/30 hover:shadow-[0_16px_48px_rgba(255,46,166,0.2)]"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-groove-pink p-4 shadow-[0_0_40px_rgba(255,46,166,0.6)]">
                    <PlayIcon className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="line-clamp-2 text-sm font-semibold leading-snug text-white/90">
                  {video.title}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/70 transition-all hover:border-groove-pink hover:text-groove-pink"
          >
            <YouTubeIcon className="h-4 w-4" />
            Subscribe on YouTube
          </a>
        </div>
      </section>
    </SectionReveal>
  );
}
