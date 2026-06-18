import { imageUrl } from "@/lib/sanity/image";
import type { ArticleCard, SanityImage } from "@/lib/sanity/types";

type ArticleImageSource = Pick<ArticleCard, "mainImage">;

/** Article hero/card images come from Sanity only — no static slug/category overrides. */
export function getArticleImageUrl(
  article: ArticleImageSource,
  width: number,
  height?: number,
) {
  return imageUrl(article.mainImage, width, height);
}

export function getSanityImageUrl(
  image: SanityImage | undefined,
  width: number,
  height?: number,
) {
  return imageUrl(image, width, height);
}
