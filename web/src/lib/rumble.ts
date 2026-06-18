import { isRumbleUrl } from "@/lib/video-embed";

export type RumbleOEmbed = {
  embedUrl: string;
  thumbnailUrl: string;
  title?: string;
};

type RumbleOEmbedResponse = {
  html?: string;
  thumbnail_url?: string;
  title?: string;
};

function normalizeRumbleWatchUrl(url: string) {
  try {
    const parsed = new URL(url);
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return url.split("?")[0] ?? url;
  }
}

function parseEmbedUrlFromOEmbedHtml(html?: string) {
  if (!html) return null;

  const match = html.match(/src="(https:\/\/rumble\.com\/embed\/[^"]+)"/);
  return match?.[1] ?? null;
}

/** Fetch embed + thumbnail from Rumble's oEmbed API (cached 24h). */
export async function fetchRumbleOEmbed(
  watchUrl: string,
): Promise<RumbleOEmbed | null> {
  if (!isRumbleUrl(watchUrl)) return null;

  const normalized = normalizeRumbleWatchUrl(watchUrl);

  try {
    const response = await fetch(
      `https://rumble.com/api/Media/oembed.json?url=${encodeURIComponent(normalized)}`,
      { next: { revalidate: 86400 } },
    );

    if (!response.ok) return null;

    const data = (await response.json()) as RumbleOEmbedResponse;
    const embedUrl = parseEmbedUrlFromOEmbedHtml(data.html);
    const thumbnailUrl = data.thumbnail_url;

    if (!embedUrl || !thumbnailUrl) return null;

    return {
      embedUrl,
      thumbnailUrl,
      title: data.title,
    };
  } catch {
    return null;
  }
}

export type RumbleMediaFields = {
  rumbleEmbedUrl?: string;
  rumbleThumbnailUrl?: string;
};

export async function enrichWithRumbleMedia<
  T extends { heroMediaUrl?: string | null },
>(item: T): Promise<T & RumbleMediaFields> {
  if (!item.heroMediaUrl || !isRumbleUrl(item.heroMediaUrl)) {
    return item;
  }

  const oembed = await fetchRumbleOEmbed(item.heroMediaUrl);
  if (!oembed) return item;

  return {
    ...item,
    rumbleEmbedUrl: oembed.embedUrl,
    rumbleThumbnailUrl: oembed.thumbnailUrl,
  };
}

export async function enrichManyWithRumbleMedia<
  T extends { heroMediaUrl?: string | null },
>(items: T[]): Promise<(T & RumbleMediaFields)[]> {
  return Promise.all(items.map(enrichWithRumbleMedia));
}
