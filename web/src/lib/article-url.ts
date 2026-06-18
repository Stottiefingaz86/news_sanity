export function articlePath(slug: string) {
  return `/${slug}`;
}

const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.betonline.ag/news";

export function articleAbsoluteUrl(slug: string) {
  return `${SITE_ORIGIN}${articlePath(slug)}`;
}

export function categoryPath(slug: string, page?: number) {
  if (!page || page <= 1) return `/category/${slug}`;
  return `/category/${slug}?page=${page}`;
}

export function primaryCategoryLabel(
  categories?: { title: string }[],
  fallback = "News",
) {
  return categories?.[0]?.title ?? fallback;
}
