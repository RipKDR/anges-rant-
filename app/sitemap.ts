import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://angesrant.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/music", "/band", "/shows", "/contact"].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
