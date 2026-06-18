import { Suspense } from "react";
import { ArticleBodyRenderer } from "@/components/news/article-body-renderer";
import { ArticleComposeShell } from "@/components/news/compose/article-compose-shell";
import type { ArticleBodyBlock } from "@/lib/article-blocks/types";

type ArticleBodySectionProps = {
  slug: string;
  blocks?: ArticleBodyBlock[];
};

export function ArticleBodySection({ slug, blocks = [] }: ArticleBodySectionProps) {
  return (
    <Suspense fallback={<ArticleBodyRenderer blocks={blocks} />}>
      <ArticleComposeShell slug={slug} initialBlocks={blocks} />
    </Suspense>
  );
}
