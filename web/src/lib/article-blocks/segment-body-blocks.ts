import type { PortableTextBlock } from "@portabletext/types";
import type { ArticleBodyBlock } from "@/lib/article-blocks/types";
import { isCustomBlock } from "@/lib/article-blocks/types";

export type ArticleBodySegment =
  | { kind: "prose"; key: string; blocks: PortableTextBlock[] }
  | { kind: "block"; key: string; block: ArticleBodyBlock };

function blockKey(block: ArticleBodyBlock, index: number) {
  return "_key" in block && typeof block._key === "string"
    ? block._key
    : `block-${index}`;
}

/** Merge consecutive Sanity portable-text blocks so lists and heading rhythm render correctly. */
export function segmentArticleBody(blocks: ArticleBodyBlock[]): ArticleBodySegment[] {
  const segments: ArticleBodySegment[] = [];

  blocks.forEach((block, index) => {
    const key = blockKey(block, index);

    if (isCustomBlock(block)) {
      segments.push({ kind: "block", key, block });
      return;
    }

    const last = segments[segments.length - 1];
    if (last?.kind === "prose") {
      last.blocks.push(block as PortableTextBlock);
      return;
    }

    segments.push({
      kind: "prose",
      key: `prose-${key}`,
      blocks: [block as PortableTextBlock],
    });
  });

  return segments;
}
