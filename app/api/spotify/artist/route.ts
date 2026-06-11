import { NextResponse } from "next/server";
import { getArtistData, spotifyConfigured } from "@/lib/spotify";

export async function GET() {
  if (!spotifyConfigured()) {
    return NextResponse.json(
      {
        error: "Spotify integration not configured",
        hint: "Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET and SPOTIFY_ARTIST_ID — see .env.example",
      },
      { status: 503 }
    );
  }

  try {
    const data = await getArtistData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Spotify request failed" },
      { status: 502 }
    );
  }
}
