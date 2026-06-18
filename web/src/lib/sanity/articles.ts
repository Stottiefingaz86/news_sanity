import {
  articleBySlugQuery,
  articleSlugsQuery,
  categoryBySlugQuery,
  categorySlugsQuery,
  homepageArticlesQuery,
  politelyRawPageQuery,
  politelyRawVideosExceptQuery,
} from "@/lib/sanity/queries";
import { dataset, projectId, sanityClient } from "@/lib/sanity/client";
import { enrichManyWithRumbleMedia, enrichWithRumbleMedia } from "@/lib/rumble";
import type {
  ArticleCard,
  ArticleDetail,
  CategoryPageData,
  HomepageArticles,
  PolitelyRawPageData,
} from "@/lib/sanity/types";

const fetchOptions = { cache: "no-store" as const };

export async function getHomepageArticles(): Promise<HomepageArticles> {
  const data = await sanityClient.fetch<HomepageArticles>(
    homepageArticlesQuery,
    {},
    fetchOptions,
  );

  const featured = data.featured ?? data.latest?.[0] ?? null;
  const featuredId = featured?._id;
  const latest = (data.latest ?? []).filter((article) => article._id !== featuredId);
  const popular =
    data.popular?.length > 0
      ? data.popular.slice(0, 8)
      : (data.latest ?? []).slice(0, 8);

  return { featured, latest, popular };
}

export async function getArticleBySlug(
  slug: string,
): Promise<ArticleDetail | null> {
  const article = await sanityClient.fetch<ArticleDetail | null>(
    articleBySlugQuery,
    { slug },
    fetchOptions,
  );

  if (!article) return null;
  return enrichWithRumbleMedia(article);
}

export async function getArticleSlugs(): Promise<string[]> {
  return sanityClient.fetch<string[]>(articleSlugsQuery, {}, fetchOptions);
}

export async function getCategoryPage(
  slug: string,
): Promise<CategoryPageData | null> {
  return sanityClient.fetch<CategoryPageData | null>(
    categoryBySlugQuery,
    { slug },
    fetchOptions,
  );
}

export async function getCategorySlugs(): Promise<string[]> {
  return sanityClient.fetch<string[]>(categorySlugsQuery, {}, fetchOptions);
}

export async function getPolitelyRawPage(): Promise<PolitelyRawPageData | null> {
  const page = await sanityClient.fetch<PolitelyRawPageData | null>(
    politelyRawPageQuery,
    {},
    fetchOptions,
  );

  if (!page) return null;

  return {
    ...page,
    videos: await enrichManyWithRumbleMedia(page.videos ?? []),
  };
}

export async function getPolitelyRawRelatedVideos(
  slug: string,
  limit = 8,
): Promise<ArticleCard[]> {
  const videos = await sanityClient.fetch<ArticleCard[]>(
    politelyRawVideosExceptQuery,
    { slug, limit },
    fetchOptions,
  );

  return enrichManyWithRumbleMedia(videos ?? []);
}

export function getSanityConnectionInfo() {
  return { projectId, dataset };
}

export function toArticleCard(article: ArticleDetail): ArticleCard {
  const { body: _body, summary: _summary, ...card } = article;
  return card;
}
