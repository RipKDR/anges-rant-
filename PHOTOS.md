# Photo placement guide

Five band photos were chosen for the site. The site is wired so that each one is a
**drop-in**: save the file at the path below and the matching section lights up. Until a
file exists, the site falls back gracefully (no broken images), so it always looks finished.

> Tip: keep files reasonably sized (long edge ~2000px, JPG ~70–80% quality) so pages stay fast.

| # | Photo | Save it as | What it powers | Final step |
|---|-------|-----------|----------------|-----------|
| 1 | Studio group shot — three of the band posed with sax in the studio (landscape) | `public/band/studio.jpg` | Cinematic banner across the top of **The Band** page | Set `"bandPhoto": "/band/studio.jpg"` in `content/site.json` |
| 2 | Black-and-white live shot of Angelo deep in the groove on bass (square) | `public/gallery/angelo-live-bw.jpg` | **Gallery** tile on the home page | Move its entry from `_planned` to `photos` in `content/gallery.json` |
| 3 | Studio session — producer at the desk + guitar (portrait) | `public/gallery/studio-session.jpg` | **Gallery** tile on the home page | Move its entry from `_planned` to `photos` in `content/gallery.json` |
| 4 | Studio trio smiling to camera (landscape) | `public/gallery/studio-trio.jpg` | **Gallery** tile on the home page | Move its entry from `_planned` to `photos` in `content/gallery.json` |
| 5 | Live duo — Ange + Alex under teal/pink stage lights | `public/gallery/live-neon.jpg` | **Gallery hero** (large tile, spans two columns) | Move its entry from `_planned` to `photos` in `content/gallery.json` |

## Switching the gallery on

`content/gallery.json` already contains the four gallery entries under `_planned`, in display
order (live-neon is first, so it becomes the large hero tile). Once the image files are in
`public/gallery/`, move those objects into the `photos` array (or rename `_planned` →
`photos`). The gallery stays hidden while `photos` is empty, so nothing looks unfinished.

```jsonc
// content/gallery.json
{
  "photos": [
    { "src": "/gallery/live-neon.jpg",      "alt": "Ange and Alex on stage under neon lights" },
    { "src": "/gallery/angelo-live-bw.jpg", "alt": "Angelo Pisano deep in the groove on bass" },
    { "src": "/gallery/studio-session.jpg", "alt": "Tracking a session at the studio" },
    { "src": "/gallery/studio-trio.jpg",    "alt": "Behind the scenes in the studio" }
  ]
}
```

## Optional upgrade

The black-and-white live bass shot (photo 2) also makes a stronger portrait for Angelo than
the current one. To use it there instead of (or as well as) the gallery, save it as
`public/members/angelo.jpg` — `content/members.json` already points at that path.
