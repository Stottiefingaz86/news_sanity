import { BLOCK_CATALOG } from "@/lib/article-blocks/block-catalog";
import type { ArticleBodyBlock, ArticleCustomBlock } from "@/lib/article-blocks/types";
import { isCustomBlock } from "@/lib/article-blocks/types";

export function getCatalogIdForBlock(block: ArticleBodyBlock): string | null {
  if (!isCustomBlock(block)) return null;

  switch (block._type) {
    case "sectionHeader":
      return "section-header";
    case "pullQuote":
      return "pull-quote";
    case "contentGrid":
      if (block.layout === "masonry") return "grid-masonry";
      if (block.layout === "bento") return "grid-bento";
      return "grid-uniform";
    case "marquee":
      return "marquee";
    case "videoEmbed":
      return "video-embed";
    case "ctaBlock":
      return "cta-block";
    case "relatedArticles":
      return "related-articles";
    case "faqBlock":
      return "faq-block";
    case "dividerBlock":
      return "divider-line";
    case "proseBody": {
      const cols = Number(block.columns);
      if (cols === 2 || cols === 3) return "text-columns";
      return "prose-body";
    }
    case "standfirst":
      return "standfirst";
    case "textHeading":
      return "text-heading";
    default:
      return null;
  }
}

export function createBlockFromCatalog(catalogId: string, existingKey?: string) {
  const entry = BLOCK_CATALOG.find((item) => item.id === catalogId);
  if (!entry) return null;

  const block = entry.create();
  if (existingKey) block._key = existingKey;
  return block as ArticleCustomBlock;
}

export function isProseBlock(block: ArticleBodyBlock) {
  return !isCustomBlock(block);
}
