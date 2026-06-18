import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArticleShareButtons } from "@/components/news/article-share-buttons";
import { formatNewsDate } from "@/lib/format-news-date";
import { imageUrl } from "@/lib/sanity/image";
import type { ArticleDetail } from "@/lib/sanity/types";
import { primaryCategoryLabel } from "@/lib/article-url";

type ArticleMetaRowProps = {
  article: ArticleDetail;
};

export function ArticleMetaRow({ article }: ArticleMetaRowProps) {
  const category = primaryCategoryLabel(article.categories);
  const date = formatNewsDate(article.publishedAt);
  const authorImage = imageUrl(article.author?.image, 64, 64);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--ds-content-card-border,#e5e5e5)] pb-4">
      <div className="flex flex-wrap items-center gap-3">
        {article.author?.name ? (
          <Avatar className="size-10 border border-[var(--ds-content-card-border,#e5e5e5)]">
            {authorImage ? (
              <AvatarImage src={authorImage} alt={article.author.name} />
            ) : null}
            <AvatarFallback className="bg-[var(--ds-content-surface,#f5f5f5)] text-sm">
              {article.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        ) : null}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="font-bold uppercase tracking-wide text-[var(--ds-primary,#ee3536)]">
              {category}
            </span>
            {article.author?.name ? (
              <span className="font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
                {article.author.name}
              </span>
            ) : null}
            {date ? (
              <span className="text-[var(--ds-content-muted,#737373)]">{date}</span>
            ) : null}
          </div>
        </div>
      </div>
      <ArticleShareButtons title={article.title} slug={article.slug} />
    </div>
  );
}
