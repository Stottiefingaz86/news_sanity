import { getArticleImageUrl } from "@/lib/article-images";
import type { ArticleCard } from "@/lib/sanity/types";

/** Resolve watch URLs to iframe embed URLs (YouTube, Rumble embed links). */
export function getVideoEmbedUrl(url?: string | null) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.hostname.includes("youtu.be")
        ? parsed.pathname.slice(1).split("/")[0]
        : parsed.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }

    if (parsed.hostname.includes("rumble.com")) {
      const embedMatch = parsed.pathname.match(/\/embed\/([^/]+)/);
      if (embedMatch?.[1]) {
        return `https://rumble.com/embed/${embedMatch[1]}/`;
      }

      // Watch URLs (rumble.com/v…) need oEmbed — see fetchRumbleOEmbed in rumble.ts
      return null;
    }
  } catch {
    return null;
  }

  return url;
}

export function isRumbleUrl(url?: string | null) {
  if (!url) return false;
  try {
    return new URL(url).hostname.includes("rumble.com");
  } catch {
    return false;
  }
}

type VideoEmbedSource = {
  heroMediaUrl?: string | null;
  rumbleEmbedUrl?: string | null;
};

export function getArticleVideoEmbedUrl(article: VideoEmbedSource) {
  return article.rumbleEmbedUrl ?? getVideoEmbedUrl(article.heroMediaUrl);
}

type VideoThumbnailSource = VideoEmbedSource & {
  mainImage?: ArticleCard["mainImage"];
  rumbleThumbnailUrl?: string | null;
};

export function getVideoThumbnailUrl(
  article: VideoThumbnailSource,
  width: number,
  height?: number,
) {
  return article.rumbleThumbnailUrl ?? getArticleImageUrl(article, width, height);
}
