import type { ArticleCard, ArticleDetail } from "@/lib/sanity/types";
import { assetPath } from "@/lib/base-path";

export const POLITELY_RAW_CATEGORY_SLUG = "politely-raw";
export const POLITELY_RAW_PATH = "/politely-raw";
export const POLITELY_RAW_LOGO = assetPath("/logos/politely%20raw.png");

export function isPolitelyRawArticle(
  article: Pick<ArticleDetail | ArticleCard, "categories">,
) {
  return (
    article.categories?.some((category) => category.slug === POLITELY_RAW_CATEGORY_SLUG) ??
    false
  );
}
