// Server-only: discovers band photos dropped into /public so adding imagery is
// a pure "drop the file in" step — no JSON or code edits required.
// Imported only by server components (GallerySection, the Band page).
import fs from "node:fs";
import path from "node:path";
import galleryJson from "@/content/gallery.json";
import type { GalleryPhoto } from "@/lib/content";

const IMAGE_RE = /\.(jpe?g|png|webp|avif)$/i;
const PUBLIC = path.join(process.cwd(), "public");

type Meta = GalleryPhoto;

function readImages(dir: string): string[] {
  try {
    return fs
      .readdirSync(path.join(PUBLIC, dir))
      .filter((f) => IMAGE_RE.test(f))
      .map((f) => `/${dir}/${f}`);
  } catch {
    return [];
  }
}

function prettify(src: string): string {
  const base = src.split("/").pop()?.replace(IMAGE_RE, "") ?? "Ange's Rant";
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Gallery photos for the home-page grid. Any image in /public/gallery shows up
 * automatically. Captions and display order come from content/gallery.json
 * (its `photos` and `_planned` entries) when a filename matches; everything
 * else falls back to a tidy name derived from the filename.
 */
export function getGalleryPhotos(): GalleryPhoto[] {
  const json = galleryJson as { photos?: Meta[]; _planned?: Meta[] };
  const meta = [...(json.photos ?? []), ...(json._planned ?? [])];
  const metaBySrc = new Map(meta.map((m) => [m.src, m]));

  const present = readImages("gallery");
  if (present.length === 0) return [];
  const presentSet = new Set(present);

  // Honour the curated order first, then append any extra files alphabetically.
  const ordered: GalleryPhoto[] = [];
  const used = new Set<string>();
  for (const m of meta) {
    if (presentSet.has(m.src) && !used.has(m.src)) {
      ordered.push(m);
      used.add(m.src);
    }
  }
  for (const src of [...present].sort()) {
    if (!used.has(src)) {
      ordered.push(metaBySrc.get(src) ?? { src, alt: prettify(src) });
      used.add(src);
    }
  }
  return ordered;
}

/**
 * Wide band/studio banner for the top of the Band page. Uses an explicit
 * content/site.json `bandPhoto` if set, otherwise the first image dropped into
 * /public/band (preferring one named "studio").
 */
export function getBandPhoto(configured?: string): string | undefined {
  if (configured) return configured;
  const images = readImages("band");
  if (images.length === 0) return undefined;
  return images.find((src) => /studio/i.test(src)) ?? images.sort()[0];
}
