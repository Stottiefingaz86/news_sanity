import type { ArticleBodyBlock } from "@/lib/article-blocks/types";
import { isCustomBlock } from "@/lib/article-blocks/types";

export type ArticleBlockLayout = "prose" | "inset" | "breakout" | "full";

export const ARTICLE_BLOCK_LAYOUT_CLASS: Record<ArticleBlockLayout, string> = {
  prose: "article-col-prose",
  inset: "article-col-inset",
  breakout: "article-col-breakout",
  full: "article-col-full",
};

export function getArticleBlockLayout(block: ArticleBodyBlock): ArticleBlockLayout {
  if (!isCustomBlock(block)) return "prose";

  switch (block._type) {
    case "videoEmbed": {
      if (block.size === "narrow") return "inset";
      if (block.size === "wide") return "breakout";
      if (block.size === "full") return "full";
      return block.aspect === "square" ? "inset" : "prose";
    }
    case "mediaImage":
      if (block.size === "wide") return "breakout";
      if (block.size === "narrow") return "inset";
      return "prose";
    case "pullQuote":
      return "breakout";
    case "ctaBlock":
    case "oddsList":
    case "dividerBlock":
    case "proseBody":
    case "standfirst":
    case "textHeading":
      return "prose";
    case "contentGrid":
      return "breakout";
    case "relatedArticles":
    case "faqBlock":
    case "marquee":
    case "sectionHeader":
      return "full";
    default:
      return "prose";
  }
}
