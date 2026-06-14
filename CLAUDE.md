# CLAUDE.md — Ange's Rant Website

This file documents the codebase for AI assistants (Claude Code and others). Read it before making any changes.

---

## Project Overview

**Ange's Rant** is a band website for a Melbourne-based funk/soul/disco group. It is a statically generated Next.js site deployed on Vercel. All band-editable content lives in JSON files — there is no database, no CMS, and no server state.

The site is intentionally designed to be AI-agent-friendly: one source of truth per concern, typed JSON, and a clear separation between "data" and "code".

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.3.3 (App Router) |
| UI | React 19.1.0 |
| Styling | Tailwind CSS 4 |
| Language | TypeScript 5.8.3 |
| External API | Spotify Web API (client-credentials) |
| Fonts | Google Fonts: Outfit (body), Righteous (display) |
| Deploy | Vercel (via GitHub Actions) |
| OG Images | `next/og` (ImageResponse) |

---

## Repository Structure

```
anges-rant-/
├── app/                        # Next.js App Router
│   ├── api/spotify/artist/     # GET /api/spotify/artist
│   ├── band/page.tsx           # Band members page
│   ├── contact/page.tsx        # Contact/booking page
│   ├── music/page.tsx          # Discography page
│   ├── shows/page.tsx          # Upcoming & past shows
│   ├── globals.css             # Tailwind imports + custom tokens + animations
│   ├── layout.tsx              # Root layout: fonts, metadata, schema.org
│   ├── not-found.tsx           # 404 page
│   ├── opengraph-image.tsx     # Dynamic OG social card (1200×630)
│   ├── page.tsx                # Home page
│   ├── robots.ts               # Generates robots.txt
│   └── sitemap.ts              # Generates sitemap.xml
├── components/
│   ├── FollowSection.tsx       # CTA block for social/follow links
│   ├── Footer.tsx              # Site footer
│   ├── Header.tsx              # Fixed nav + mobile hamburger (client component)
│   ├── Icons.tsx               # SVG icon system (Spotify, Apple Music, etc.)
│   ├── ListenButtons.tsx       # Streaming/purchase link buttons
│   ├── Marquee.tsx             # Scrolling text animation
│   └── VinylDisc.tsx           # Animated vinyl fallback (no cover art)
├── content/                    # ★ BAND-EDITABLE DATA — see "Content Layer" below
│   ├── members.json
│   ├── releases.json
│   ├── shows.json
│   └── site.json
├── lib/
│   ├── content.ts              # TypeScript types + JSON content loaders
│   └── spotify.ts              # Spotify API client (token + artist/album fetch)
├── public/
│   ├── members/                # Band member photos (referenced in members.json)
│   └── releases/               # Album/single cover art (referenced in releases.json)
├── .github/workflows/
│   └── deploy-vercel.yml       # CI/CD: deploys to Vercel on push
├── .env.example                # Required env vars (copy to .env.local)
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

---

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Local dev server → http://localhost:3000
npm run build        # Production build
npm start            # Serve production build locally
npm run lint         # ESLint via Next.js
```

No test suite exists. Quality is validated via linting + Vercel preview deploys.

---

## Content Layer — The Single Source of Truth

**Do not hardcode band data in TSX files.** All band-specific content lives in `content/`. Pages import via `lib/content.ts`.

### content/site.json
Top-level band info used site-wide: name, tagline, short bio, contact email, social links (Spotify, Apple Music, YouTube, Instagram, Facebook, Bandcamp, store URL).

### content/members.json
Array of band member cards. Each entry: `name`, `role`, `photo` (path relative to `/public/`), `blurb`.

### content/releases.json
Array of releases (albums/singles). Each entry: `title`, `type` (`album` | `single`), `year`, `cover` (path relative to `/public/`), `description`, `tracklist` (array), `links` (object with platform URLs).

### content/shows.json
Two arrays: `upcoming` and `past`. Each show: `date`, `venue`, `city`, `ticketUrl` (optional).

### Adding/updating content

To add a band member, release, or show — edit **only** the relevant JSON file and (if applicable) add the image to `public/`. No TSX changes required.

To update site-wide info (band bio, socials, contact) — edit `content/site.json` only.

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development. Never commit `.env.local`.

```
SPOTIFY_CLIENT_ID=        # Spotify Developer Dashboard → app client ID
SPOTIFY_CLIENT_SECRET=    # Spotify Developer Dashboard → app client secret
SPOTIFY_ARTIST_ID=        # From open.spotify.com/artist/<ID>
NEXT_PUBLIC_SITE_URL=     # Production URL (e.g. https://angesrant.com) — for SEO
```

Spotify variables are optional; the `GET /api/spotify/artist` route will fail gracefully if not set.

In Vercel: set these under **Project → Settings → Environment Variables**.

---

## Styling Conventions

Tailwind CSS 4 is used throughout. Custom design tokens and animations are defined in `app/globals.css`.

### Color Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--color-night` | `#0a0414` | Primary dark background |
| `--color-night-soft` | `#140a26` | Secondary dark surface |
| `--color-groove-pink` | `#ff2ea6` | Primary accent |
| `--color-groove-orange` | `#ff7a18` | Secondary accent |
| `--color-groove-gold` | `#ffd166` | Highlight |
| `--color-groove-violet` | `#8b5cf6` | Tertiary accent |

### Utility Classes

- `.text-groove` — Gradient text (gold → orange → pink → violet)
- `.bg-groove` — Gradient background (orange → pink)
- `.glow-pink` — Box shadow neon glow
- `.grain` — Film-grain texture overlay
- `.vinyl` — CSS vinyl disc styling

### Animations

- `animate-spin-slow` — 9s vinyl spin
- `animate-marquee` — 28s horizontal scroll
- `animate-float` — 7s floating blob

### Fonts

- **Headings / display**: `font-display` → Righteous
- **Body**: default (Outfit)

---

## Component Conventions

- Components are in `components/` and are server components by default.
- `Header.tsx` is the only `"use client"` component (needs mobile menu toggle state).
- Icons live in `Icons.tsx` as named SVG exports — add new platform icons there.
- `ListenButtons.tsx` reads from `release.links` to render streaming/purchase buttons.
- `FollowSection.tsx` dynamically builds from `site.socials` — no hardcoded URLs.

---

## API Route

### GET /api/spotify/artist

Returns live Spotify artist data: followers, genres, popularity, and latest album info.

- Auth: Spotify client-credentials flow (no user login required)
- Caching: `next: { revalidate: 3600 }` (1 hour) on artist/album fetches; token cached for ~50 minutes
- Located: `app/api/spotify/artist/route.ts`
- Lib: `lib/spotify.ts`

If Spotify env vars are missing, the API route returns an error JSON. Pages handle this gracefully (data is supplementary, not required).

---

## SEO & Metadata

- Root metadata in `app/layout.tsx` uses `content/site.json` for title, description, socials
- Title template: `{page} | Ange's Rant`
- `app/opengraph-image.tsx` — auto-generated social card at `/opengraph-image`
- `app/robots.ts` — generates `robots.txt` (allow all, links sitemap)
- `app/sitemap.ts` — generates `sitemap.xml` for 6 pages
- Schema.org `MusicGroup` JSON-LD in the root layout

When changing the band name or site URL, update `content/site.json` and `NEXT_PUBLIC_SITE_URL`. The metadata will cascade automatically.

---

## Deployment

### Vercel (primary)
Every push to the designated branch triggers `.github/workflows/deploy-vercel.yml`, which runs `npx vercel@latest` to deploy to production.

Required GitHub secrets:
- `VERCEL_TOKEN` — from vercel.com/account/tokens
- `VERCEL_SCOPE` — Vercel team/account slug

### Manual deploy
```bash
npx vercel --prod
```

### Environment
- Node.js 22 (as specified in the GitHub Actions workflow)
- Vercel auto-detects Next.js; no custom build commands needed

---

## Key Conventions for AI Assistants

1. **Content changes go in `content/*.json` only.** Never hardcode band data (names, dates, URLs, bios) in TSX.

2. **Images go in `public/`.** Reference them with a root-relative path (e.g., `/members/ange.jpg`) in the JSON.

3. **Types are in `lib/content.ts`.** If you add a new field to a JSON file, add the corresponding TypeScript type there.

4. **No database, no server state.** This is a statically generated site. Avoid patterns that require runtime DB access.

5. **Only `Header.tsx` is a client component.** Keep new components as server components unless they require browser APIs or React hooks for interactivity.

6. **Use existing utility classes.** Prefer `.text-groove`, `.bg-groove`, `.glow-pink`, etc. over custom inline gradient styles.

7. **Don't add test files.** There is no test runner configured. Do not add Jest/Vitest/Playwright setup unless explicitly requested.

8. **Follow the deployment branch.** The CI workflow is pinned to a specific branch — confirm the active branch before pushing (see `.github/workflows/deploy-vercel.yml`).

9. **Spotify is optional.** Do not make Spotify data required for any page render. It is supplementary / enhancement only.

10. **No comments unless the WHY is non-obvious.** The codebase is intentionally comment-light. Self-documenting names are preferred.
