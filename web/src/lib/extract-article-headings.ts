import type { PortableTextBlock } from "@portabletext/types";
import type { ArticleBodyBlock } from "@/lib/article-blocks/types";
import { isCustomBlock } from "@/lib/article-blocks/types";

function blockToPlainText(block: PortableTextBlock) {
  if (!("children" in block) || !Array.isArray(block.children)) return "";

  return block.children
    .map((child) => ("text" in child ? child.text : ""))
    .join("")
    .trim();
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export type ArticleHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function extractArticleHeadings(
  body?: ArticleBodyBlock[],
): ArticleHeading[] {
  if (!body?.length) return [];

  const headings: ArticleHeading[] = [];

  for (const block of body) {
    if (isCustomBlock(block) && block._type === "textHeading" && block.text) {
      headings.push({
        id: slugifyHeading(block.text),
        text: block.text,
        level: block.level === "h3" ? 3 : 2,
      });
      continue;
    }

    if (isCustomBlock(block) && block._type === "sectionHeader" && block.title) {
      headings.push({
        id: slugifyHeading(block.title),
        text: block.title,
        level: 2,
      });
      continue;
    }

    if (
      block._type === "block" &&
      "style" in block &&
      (block.style === "h2" || block.style === "h3")
    ) {
      const text = blockToPlainText(block as PortableTextBlock);
      if (!text) continue;
      headings.push({
        id: slugifyHeading(text),
        text,
        level: block.style === "h3" ? 3 : 2,
      });
    }
  }

  return headings;
}
