# Ange's Rant — Official Website

Funk. Soul. Disco. Made to keep you movin'. The official site for
[Ange's Rant](https://angesrant.com), Melbourne's groove-based homage to the
80's, built with **Next.js 15 + Tailwind CSS 4**.

## Why this stack

- **Content lives in plain JSON** (`content/*.json`) — band members (or
  automation agents on their devices) update the site by editing a file and
  pushing. No CMS, no database, no lock-in.
- **One-click deployment on [Vercel](https://vercel.com/new)** — every push to
  the default branch auto-deploys. Netlify or any Node host works too.
- **API routes built in** — `/api/spotify/artist` already scaffolds the
  Spotify Web API connection for live release data and future automation.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing the site (no code required)

All band-editable content is in the `content/` folder. Each file has an
`_editing` note at the top explaining its format.

| File | What it controls |
| --- | --- |
| `content/site.json` | Band name, tagline, bio, contact email, **social links** |
| `content/releases.json` | Albums/singles, tracklists, streaming/purchase links |
| `content/members.json` | Band member cards (name, role, photo, blurb) |
| `content/shows.json` | Upcoming + past gigs (with ticket links) |

Typical workflows:

- **New gig** → add an entry to `upcoming` in `content/shows.json`.
- **New release** → add it to the **front** of the `releases` array in
  `content/releases.json`; it automatically becomes the featured release on
  the home page.
- **Photos / cover art** → drop images into `public/members/` or
  `public/releases/` and set the `photo` / `cover` field to the path. While
  those fields are empty the site renders styled fallbacks (initial badges
  and a spinning vinyl), so nothing ever looks broken.

### Going-live checklist

The site ships with **only verified, real links** (the official store at
angesrant.com/music and the Fun Cool track page). Everything else is
data-driven and appears automatically once added:

- **Social/streaming profiles** — when the band's Spotify, Instagram,
  Facebook, YouTube etc. go live, add each to `socials` in
  `content/site.json`. Icons, header, footer and the "Take the groove with
  you" sections all pick them up instantly.
- **Booking email** — set `contactEmail` in `content/site.json` and the
  Contact page switches from the store link to direct booking/fan-mail
  cards, and email CTAs appear site-wide.
- **Tracklist** — the remaining *Another Time* tracks go in
  `content/releases.json`; until then the site links to the full album on
  the store.
- **Domain note** — store links point at `angesrant.com/music` (the current
  Bandzoogle store). If you later point the `angesrant.com` domain at this
  site, first move the store to its Bandzoogle subdomain (or another shop)
  and update the URLs in `content/`.

## Deploying to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with the
   GitHub account that owns this repo.
2. Import **RipKDR/anges-rant-** — Vercel auto-detects Next.js; no
   configuration needed. Click **Deploy**.
3. Every future push to the default branch redeploys automatically.
4. Optional: set `NEXT_PUBLIC_SITE_URL` (e.g. `https://angesrant.com`) in
   Project → Settings → Environment Variables so the sitemap, robots.txt
   and social-share metadata use the final domain, then add the custom
   domain under Project → Settings → Domains.

## Spotify integration

`/api/spotify/artist` returns live artist data (followers, genres, latest
releases) once credentials are configured:

1. Create an app at the [Spotify developer dashboard](https://developer.spotify.com/dashboard).
2. Copy `.env.example` to `.env.local` and fill in `SPOTIFY_CLIENT_ID`,
   `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_ARTIST_ID` (the id in
   `open.spotify.com/artist/<id>`).
3. On Vercel, add the same three variables under Project → Settings →
   Environment Variables.

`lib/spotify.ts` is the single integration point — extend it for richer
release syncing later.

## Agent / automation friendliness (OpenClaw, Hermes, …)

This repo is intentionally structured so AI agents on band members' devices
can manage the site safely:

- **Single source of truth**: agents only ever need to touch `content/*.json`
  and `public/` assets — never application code — for day-to-day updates.
- **Self-documenting**: every JSON file carries an `_editing` instruction key
  that an agent can read to learn the schema in place.
- **Git-native publishing**: edit → commit → push → auto-deploy. Agents get
  full audit history and easy rollback for free.
- **Spotify hook point**: `lib/spotify.ts` + `app/api/spotify/` is where
  release-sync automation should plug in, so uploaded music can surface on
  the site automatically.

A sensible future flow: an agent watches for a new mix/master, uploads it via
the band's distributor, waits for it to appear on Spotify, then opens a PR
adding the release to `content/releases.json` with the real streaming links.

## Project structure

```
app/            pages (home, /music, /band, /shows, /contact) + API routes
components/     header, footer, hero pieces, listen buttons, social sections
content/        ← band-editable JSON (the only place day-to-day edits happen)
lib/            typed content loaders + Spotify Web API client
public/         static assets (member photos, cover art)
```
