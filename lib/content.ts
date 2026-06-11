import siteJson from "@/content/site.json";
import releasesJson from "@/content/releases.json";
import membersJson from "@/content/members.json";
import showsJson from "@/content/shows.json";

export type SocialLink = {
  platform: string;
  label: string;
  url: string;
  showInHeader?: boolean;
};

export type Site = {
  name: string;
  tagline: string;
  location: string;
  shortBio: string;
  bio: string[];
  contactEmail: string;
  socials: SocialLink[];
};

export type TrackLink = { platform: string; label: string; url: string };

export type Track = {
  title: string;
  duration?: string;
  links?: TrackLink[];
};

export type Release = {
  slug: string;
  title: string;
  type: string;
  year: string;
  cover?: string;
  description: string;
  links: TrackLink[];
  tracks: Track[];
};

export type Show = {
  date: string;
  venue: string;
  city: string;
  ticketUrl?: string;
  note?: string;
};

export const site: Site = siteJson as Site;
export const releases: Release[] = (releasesJson as { releases: Release[] }).releases;
export const members = (membersJson as {
  members: { name: string; role: string; photo?: string; blurb: string }[];
}).members;
export const shows: { upcoming: Show[]; past: Show[] } = {
  upcoming: (showsJson as { upcoming: Show[]; past: Show[] }).upcoming ?? [],
  past: (showsJson as { upcoming: Show[]; past: Show[] }).past ?? [],
};

export const featuredRelease: Release | undefined = releases[0];

export function formatShowDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
