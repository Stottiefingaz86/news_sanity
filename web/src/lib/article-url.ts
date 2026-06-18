export function articlePath(slug: string) {
  return `/${slug}`;
}

const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.betonline.ag/news";

export function articleAbsoluteUrl(slug: string) {
  return `${SITE_ORIGIN}${articlePath(slug)}`;
}

export function categoryPath(slug: string) {
  return `/category/${slug}`;
}

export function primaryCategoryLabel(
  categories?: { title: string }[],
  fallback = "News",
) {
  return categories?.[0]?.title ?? fallback;
}
