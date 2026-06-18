import { ArticleTile } from "@/components/news/article-tile";
import { CategoryPagination } from "@/components/news/category-pagination";
import type { CategoryArticlesPage } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type CategoryArticleFeedProps = {
  slug: string;
  title: string;
  articlesPage: CategoryArticlesPage;
  className?: string;
};

export function CategoryArticleFeed({
  slug,
  title,
  articlesPage,
  className,
}: CategoryArticleFeedProps) {
  const { articles, total, page, pageSize, totalPages } = articlesPage;

  if (total === 0) return null;

  return (
    <section
      id="coverage"
      className={cn("scroll-mt-24", className)}
      aria-label={`${title} archive`}
    >
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-serif text-2xl text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:balance] md:text-[1.75rem]">
          All coverage
        </h2>
        <p className="text-sm tabular-nums text-[var(--ds-content-muted,#525252)]">
          {total.toLocaleString()} {total === 1 ? "story" : "stories"}
        </p>
      </div>

      <div className="flex flex-col gap-8 md:gap-10">
        {articles.map((article) => (
          <ArticleTile key={article._id} article={article} lead />
        ))}
      </div>

      <CategoryPagination
        slug={slug}
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        className="mt-8 md:mt-10"
      />
    </section>
  );
}
