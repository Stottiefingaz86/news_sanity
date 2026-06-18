import { ArticleBreadcrumbs } from "@/components/news/article-breadcrumbs";
import { ArticleBodySection } from "@/components/news/article-body-section";
import { ArticleShareButtons } from "@/components/news/article-share-buttons";
import { formatNewsDateLong } from "@/lib/format-news-date";
import { primaryCategoryLabel } from "@/lib/article-url";
import type { ArticleDetail } from "@/lib/sanity/types";

type LongformArticleLayoutProps = {
  article: ArticleDetail;
};

export function LongformArticleLayout({ article }: LongformArticleLayoutProps) {
  const category = primaryCategoryLabel(article.categories);
  const date = formatNewsDateLong(article.publishedAt);

  return (
    <article className="min-w-0">
      <ArticleBreadcrumbs categories={article.categories} title={article.title} />

      <div className="mb-6 flex flex-col gap-3 border-b border-[var(--ds-content-card-border,#e5e5e5)] pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--ds-primary,#ee3536)]">
            {category}
          </p>
          <h1 className="font-serif text-3xl leading-tight text-[var(--ds-content-foreground,#0a0a0a)] md:text-[2.75rem] md:leading-[1.05] [text-wrap:balance]">
            {article.title}
          </h1>
        </div>
        {date ? (
          <p className="shrink-0 text-sm font-medium text-[var(--ds-content-muted,#737373)]">
            {date}
          </p>
        ) : null}
      </div>

      <ArticleShareButtons
        title={article.title}
        slug={article.slug}
        className="mb-8"
      />

      {article.excerpt ? (
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-[var(--ds-content-muted,#737373)]">
          {article.excerpt}
        </p>
      ) : null}

      <div className="max-w-3xl">
        <ArticleBodySection slug={article.slug} blocks={article.body} />
      </div>
    </article>
  );
}
