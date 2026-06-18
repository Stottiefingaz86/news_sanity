import Link from "next/link";
import { ArticleListItem } from "@/components/news/article-tile";
import type { ArticleCard } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type CategoryPopularStoriesProps = {
  articles: ArticleCard[];
  title?: string;
  className?: string;
};

export function CategoryPopularStories({
  articles,
  title = "Popular stories",
  className,
}: CategoryPopularStoriesProps) {
  if (!articles.length) return null;

  return (
    <section
      className={cn(
        "rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)]",
        className,
      )}
      aria-label={title}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--ds-content-card-border,#e5e5e5)] px-4 py-3">
        <h2 className="font-serif text-lg text-[var(--ds-content-foreground,#0a0a0a)]">
          {title}
        </h2>
        <span className="text-[11px] font-semibold tabular-nums text-[var(--ds-content-muted,#737373)]">
          {articles.length}
        </span>
      </div>
      <div className="flex flex-col gap-0.5 px-3 py-2">
        {articles.map((article) => (
          <ArticleListItem key={article._id} article={article} variant="popular" />
        ))}
      </div>
      {articles.length >= 5 ? (
        <div className="border-t border-[var(--ds-content-card-border,#e5e5e5)] px-4 py-2.5">
          <Link
            href="#more-coverage"
            className="text-xs font-bold uppercase tracking-wide text-[var(--ds-primary,#ee3536)] hover:underline"
          >
            See all coverage
          </Link>
        </div>
      ) : null}
    </section>
  );
}

export function pickPopularStories(
  articles: ArticleCard[],
  excludeIds: Set<string>,
  limit = 5,
) {
  return articles
    .filter((article) => !excludeIds.has(article._id))
    .slice(0, limit);
}
