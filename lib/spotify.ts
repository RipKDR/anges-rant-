/**
 * Spotify Web API integration (client-credentials flow).
 *
 * To activate, set in .env.local (see .env.example):
 *   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET — from https://developer.spotify.com/dashboard
 *   SPOTIFY_ARTIST_ID — the id segment of the artist page URL,
 *     e.g. https://open.spotify.com/artist/<SPOTIFY_ARTIST_ID>
 *
 * Used by /api/spotify/artist to surface live artist data (followers,
 * latest releases) so the site stays current without manual edits. This is
 * also the hook point for future automation that uploads music and syncs
 * release metadata from Spotify.
 */

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_BASE = "https://api.spotify.com/v1";

export function spotifyConfigured(): boolean {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
      process.env.SPOTIFY_CLIENT_SECRET &&
      process.env.SPOTIFY_ARTIST_ID
  );
}

async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    next: { revalidate: 3000 },
  });
  if (!res.ok) throw new Error(`Spotify token request failed: ${res.status}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export type SpotifyArtistData = {
  name: string;
  followers: number;
  genres: string[];
  imageUrl?: string;
  spotifyUrl: string;
  latestReleases: {
    name: string;
    releaseDate: string;
    type: string;
    coverUrl?: string;
    spotifyUrl: string;
    totalTracks: number;
  }[];
};

export async function getArtistData(): Promise<SpotifyArtistData> {
  const token = await getAccessToken();
  const artistId = process.env.SPOTIFY_ARTIST_ID;
  const headers = { Authorization: `Bearer ${token}` };

  const [artistRes, albumsRes] = await Promise.all([
    fetch(`${API_BASE}/artists/${artistId}`, { headers, next: { revalidate: 3600 } }),
    fetch(
      `${API_BASE}/artists/${artistId}/albums?include_groups=album,single&limit=10&market=AU`,
      { headers, next: { revalidate: 3600 } }
    ),
  ]);
  if (!artistRes.ok) throw new Error(`Spotify artist request failed: ${artistRes.status}`);
  if (!albumsRes.ok) throw new Error(`Spotify albums request failed: ${albumsRes.status}`);

  const artist = await artistRes.json();
  const albums = await albumsRes.json();

  return {
    name: artist.name,
    followers: artist.followers?.total ?? 0,
    genres: artist.genres ?? [],
    imageUrl: artist.images?.[0]?.url,
    spotifyUrl: artist.external_urls?.spotify ?? "",
    latestReleases: (albums.items ?? []).map(
      (album: {
        name: string;
        release_date: string;
        album_type: string;
        images?: { url: string }[];
        external_urls?: { spotify?: string };
        total_tracks: number;
      }) => ({
        name: album.name,
        releaseDate: album.release_date,
        type: album.album_type,
        coverUrl: album.images?.[0]?.url,
        spotifyUrl: album.external_urls?.spotify ?? "",
        totalTracks: album.total_tracks,
      })
    ),
  };
}
