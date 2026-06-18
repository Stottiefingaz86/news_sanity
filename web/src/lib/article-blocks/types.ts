import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImage } from "@/lib/sanity/types";

export type GridItem = {
  _key: string;
  title?: string;
  body?: string;
  image?: SanityImage;
  href?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
};

export type ContentGridBlock = {
  _type: "contentGrid";
  _key: string;
  layout?: "uniform" | "masonry" | "bento";
  columns?: 2 | 3 | 4;
  gap?: "tight" | "normal" | "loose";
  items?: GridItem[];
};

export type SectionHeaderBlock = {
  _type: "sectionHeader";
  _key: string;
  kicker?: string;
  title?: string;
  subtitle?: string;
  size?: "display" | "large" | "medium";
  align?: "left" | "center";
};

export type PullQuoteBlock = {
  _type: "pullQuote";
  _key: string;
  quote?: string;
  attribution?: string;
  variant?: "highlight" | "boxed" | "minimal";
};

export type MarqueeBlock = {
  _type: "marquee";
  _key: string;
  items?: string[];
  speed?: "slow" | "medium" | "fast";
  separator?: string;
};

export type OddsListBlock = {
  _type: "oddsList";
  _key: string;
  title?: string;
  entries?: { label?: string; odds?: string }[];
};

export type VideoEmbedBlock = {
  _type: "videoEmbed";
  _key: string;
  url?: string;
  caption?: string;
  aspect?: "video" | "square";
  size?: "default" | "narrow" | "wide" | "full";
};

export type MediaImageBlock = {
  _type: "mediaImage";
  _key: string;
  image?: SanityImage;
  externalUrl?: string;
  caption?: string;
  size?: "default" | "narrow" | "wide";
  aspect?: "landscape" | "portrait";
};

export type CtaBlock = {
  _type: "ctaBlock";
  _key: string;
  kicker?: string;
  title?: string;
  body?: string;
  buttonLabel?: string;
  buttonHref?: string;
  variant?: "primary" | "outline" | "accent";
};

export type DividerBlock = {
  _type: "dividerBlock";
  _key: string;
  style?: "line" | "thick" | "dots" | "space";
};

export type RelatedArticlesBlock = {
  _type: "relatedArticles";
  _key: string;
  title?: string;
  articles?: { title?: string; href?: string; category?: string }[];
};

export type FaqBlock = {
  _type: "faqBlock";
  _key: string;
  title?: string;
  items?: { question?: string; answer?: string }[];
};

export type ProseBodyBlock = {
  _type: "proseBody";
  _key: string;
  columns?: 1 | 2 | 3 | "1" | "2" | "3";
  dropCap?: boolean;
  paragraphs?: string[];
};

export type StandfirstBlock = {
  _type: "standfirst";
  _key: string;
  text?: string;
};

export type TextHeadingBlock = {
  _type: "textHeading";
  _key: string;
  text?: string;
  level?: "h2" | "h3";
};

export type ArticleCustomBlock =
  | ContentGridBlock
  | SectionHeaderBlock
  | PullQuoteBlock
  | MarqueeBlock
  | OddsListBlock
  | VideoEmbedBlock
  | MediaImageBlock
  | CtaBlock
  | DividerBlock
  | RelatedArticlesBlock
  | FaqBlock
  | ProseBodyBlock
  | StandfirstBlock
  | TextHeadingBlock;

export type ArticleBodyBlock = PortableTextBlock | ArticleCustomBlock;

export function isCustomBlock(
  block: ArticleBodyBlock,
): block is ArticleCustomBlock {
  return (
    typeof block === "object" &&
    block !== null &&
    "_type" in block &&
    block._type !== "block"
  );
}

export function createBlockKey() {
  return `blk_${Math.random().toString(36).slice(2, 10)}`;
}
