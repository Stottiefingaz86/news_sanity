import type { ArticleBodyBlock } from "@/lib/article-blocks/types";

export type ArticleLayout = "standard" | "analysis" | "longform" | "media";

export type SanityImage = {
  asset?: {
    _ref?: string;
    _id?: string;
    _type?: string;
    url?: string;
  };
  alt?: string;
  hotspot?: {
    x?: number;
    y?: number;
  };
};

export type ArticleAuthor = {
  name: string;
  slug?: string;
  image?: SanityImage;
};

export type ArticleCategory = {
  title: string;
  slug: string;
  kind?: "editorial" | "league";
};

export type ShowTimestamp = {
  time?: string;
  label?: string;
};

export type ArticleCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  layout?: ArticleLayout;
  featured?: boolean;
  mainImage?: SanityImage;
  author?: ArticleAuthor;
  categories?: ArticleCategory[];
};

export type ArticleDetail = ArticleCard & {
  summary?: string;
  showTableOfContents?: boolean;
  heroMediaUrl?: string;
  timestamps?: ShowTimestamp[];
  body?: ArticleBodyBlock[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalOverride?: string;
  ogImage?: SanityImage;
  indexation?: "index" | "noindex";
};

export type HomepageArticles = {
  featured: ArticleCard | null;
  latest: ArticleCard[];
  popular: ArticleCard[];
};

export type CategoryPageData = {
  title: string;
  slug: string;
  description?: string;
  articles: ArticleCard[];
};
