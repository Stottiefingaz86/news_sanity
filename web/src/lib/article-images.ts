import { assetPath } from "@/lib/base-path";
import { imageUrl } from "@/lib/sanity/image";
import type { ArticleCard, SanityImage } from "@/lib/sanity/types";

const FALLBACK_BY_SLUG: Record<string, string> = {
  "ranking-10-teams-best-chance-win-world-cup": assetPath(
    "/images/articles/world-cup/group-draw.png",
  ),
  "nfl-division-odds-early-look": assetPath("/images/articles/nfl.jpg"),
  "nba-playoff-race-betting-guide": assetPath("/images/articles/nba.jpg"),
  "betonline-launches-new-sgp-features": assetPath("/images/articles/betting.jpg"),
  "closing-line-value-explained": assetPath("/images/articles/analytics.jpg"),
  "march-madness-bracket-breakdown-podcast": assetPath(
    "/images/articles/march-madness.jpg",
  ),
};

const FALLBACK_BY_CATEGORY: Record<string, string> = {
  nfl: assetPath("/images/articles/nfl.jpg"),
  nba: assetPath("/images/articles/nba.jpg"),
  "expert-analysis": assetPath("/images/articles/world-cup/group-draw.png"),
  news: assetPath("/images/articles/march-madness.jpg"),
};

type ArticleImageSource = Pick<ArticleCard, "slug" | "mainImage" | "categories">;

export function getArticleFallbackImage(slug: string, categories?: ArticleCard["categories"]) {
  if (FALLBACK_BY_SLUG[slug]) return FALLBACK_BY_SLUG[slug];

  const categorySlug = categories?.[0]?.slug;
  if (categorySlug && FALLBACK_BY_CATEGORY[categorySlug]) {
    return FALLBACK_BY_CATEGORY[categorySlug];
  }

  return assetPath("/images/articles/world-cup/group-draw.png");
}

export function getArticleImageUrl(
  article: ArticleImageSource,
  width: number,
  height?: number,
) {
  const fromSanity = imageUrl(article.mainImage, width, height);
  if (fromSanity) return fromSanity;

  return getArticleFallbackImage(article.slug, article.categories);
}

export function getSanityImageUrl(
  image: SanityImage | undefined,
  width: number,
  height?: number,
) {
  return imageUrl(image, width, height);
}
