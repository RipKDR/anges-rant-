import type { Metadata } from "next";
import { Outfit, Unbounded } from "next/font/google";
import { site, spotifyUrl } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyFollowBar from "@/components/StickyFollowBar";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const unbounded = Unbounded({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  variable: "--font-unbounded",
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://angesrant.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: `${site.name} — Funk, Soul & Disco from Melbourne`,
    template: `%s | ${site.name}`,
  },
  description: site.shortBio,
  openGraph: {
    title: site.name,
    description: site.shortBio,
    type: "website",
    locale: "en_AU",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.shortBio,
  },
};

// schema.org MusicGroup data so search engines understand who the band is
const structuredData = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: site.name,
  description: site.shortBio,
  genre: ["Funk", "Soul", "Disco"],
  foundingLocation: {
    "@type": "Place",
    name: site.location,
  },
  url: BASE,
  album: {
    "@type": "MusicAlbum",
    name: "Another Time",
    numTracks: 13,
    byArtist: site.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${unbounded.variable}`}>
      <body className="grain min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        {spotifyUrl && <StickyFollowBar spotifyUrl={spotifyUrl} />}
        <Analytics />
      </body>
    </html>
  );
}
