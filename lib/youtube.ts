const CHANNEL_ID = "UCkPr6Zy3aoPVX5Yntw39UAQ";

export type YouTubeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
};

export async function fetchChannelVideos(maxResults = 6): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json() as {
      items?: Array<{
        id: { videoId: string };
        snippet: {
          title: string;
          thumbnails: { high?: { url: string }; default?: { url: string } };
        };
      }>;
    };
    return (data.items ?? []).map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail:
        item.snippet.thumbnails.high?.url ??
        item.snippet.thumbnails.default?.url ??
        "",
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch {
    return [];
  }
}
