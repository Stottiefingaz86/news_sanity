import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePageContent } from "@/components/news/article-page-content";
import { isPolitelyRawArticle } from "@/lib/politely-raw";
import {
  getArticleBySlug,
  getArticleSlugs,
  getPolitelyRawRelatedVideos,
} from "@/lib/sanity/articles";
import { getArticleImageUrl } from "@/lib/article-images";
import { imageUrl } from "@/lib/sanity/image";
import { getNewsSettings } from "@/lib/sanity/news-settings";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt;
  const ogImage =
    imageUrl(article.ogImage, 1200, 630) ??
    getArticleImageUrl(article, 1200, 630);

  return {
    title,
    description,
    alternates: article.canonicalOverride
      ? { canonical: article.canonicalOverride }
      : undefined,
    robots:
      article.indexation === "noindex"
        ? { index: false, follow: true }
        : undefined,
    openGraph: {
      title,
      description: description ?? undefined,
      type: "article",
      publishedTime: article.publishedAt,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const [article, settings] = await Promise.all([
    getArticleBySlug(slug),
    getNewsSettings(),
  ]);

  if (!article) notFound();

  const relatedPolitelyRawVideos = isPolitelyRawArticle(article)
    ? await getPolitelyRawRelatedVideos(slug, 6)
    : [];

  return (
    <ArticlePageContent
      article={article}
      settings={settings}
      relatedPolitelyRawVideos={relatedPolitelyRawVideos}
    />
  );
}
