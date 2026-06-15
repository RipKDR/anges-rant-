# Photo placement guide

Five band photos were chosen for the site. **You only have to drop the files in** — the
gallery and the Band-page banner auto-detect them, so there's no JSON or code to edit.
Until the files exist, the site falls back gracefully (no broken images), so it always
looks finished.

> Tip: keep files reasonably sized (long edge ~2000px, JPG ~70–80% quality) so pages stay fast.
> The filenames below are recommended only because `content/gallery.json` already has matching
> captions — but **any** filename works; unlisted files just get a caption derived from their name.

| # | Photo | Drop it in as | What it powers |
|---|-------|--------------|----------------|
| 1 | Studio group shot — three of the band posed with sax (landscape) | `public/band/studio.jpg` | Cinematic banner across the top of **The Band** page |
| 5 | Live duo — Ange + Alex under teal/pink stage lights | `public/gallery/live-neon.jpg` | **Gallery hero** (large tile, spans two columns) |
| 2 | Black-and-white live shot of Angelo on bass (square) | `public/gallery/angelo-live-bw.jpg` | **Gallery** tile on the home page |
| 3 | Studio session — producer at the desk + guitar (portrait) | `public/gallery/studio-session.jpg` | **Gallery** tile on the home page |
| 4 | Studio trio smiling to camera (landscape) | `public/gallery/studio-trio.jpg` | **Gallery** tile on the home page |

## That's it

Drop the files into `public/gallery/` and `public/band/`, commit, and they appear. The gallery
shows photos in the order listed in `content/gallery.json` (live-neon first → large hero tile),
then any extra files alphabetically. Editing `gallery.json` is optional — it only customises
captions and order.

## Optional upgrade

The black-and-white live bass shot (photo 2) also makes a stronger portrait for Angelo than
the current one. To use it there instead of (or as well as) the gallery, save it as
`public/members/angelo.jpg` — `content/members.json` already points at that path.
