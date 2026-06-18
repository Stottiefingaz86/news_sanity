"use client";

import Link from "next/link";
import { ArticleCardMeta } from "@/components/news/article-card-meta";
import { articlePath } from "@/lib/article-url";
import { getArticleImageUrl } from "@/lib/article-images";
import type { ArticleCard } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type CategoryArticleSidebarProps = {
  articles: ArticleCard[];
  activeArticleId?: string | null;
  /** Return true to keep the user on the page (e.g. sync carousel). False opens the article link. */
  onArticleSelect?: (article: ArticleCard, index: number) => boolean;
  title?: string;
  className?: string;
};

export function CategoryArticleSidebar({
  articles,
  activeArticleId,
  onArticleSelect,
  title = "Stories",
  className,
}: CategoryArticleSidebarProps) {
  if (!articles.length) return null;

  return (
    <section
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)]",
        className,
      )}
      aria-label={title}
    >
      <div className="shrink-0 border-b border-[var(--ds-content-card-border,#e5e5e5)] px-4 py-3">
        <h2 className="font-serif text-lg text-[var(--ds-content-foreground,#0a0a0a)]">
          {title}
        </h2>
      </div>
      <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin]">
        {articles.map((article, index) => {
          const thumb = getArticleImageUrl(article, 96, 96);
          const isActive = activeArticleId === article._id;

          return (
            <li key={article._id}>
              <Link
                href={articlePath(article.slug)}
                onClick={(event) => {
                  if (onArticleSelect?.(article, index)) {
                    event.preventDefault();
                  }
                }}
                className={cn(
                  "flex gap-3 border-b border-[var(--ds-content-card-border,#e5e5e5)] px-3 py-3 transition-colors last:border-b-0",
                  isActive
                    ? "bg-[var(--ds-content-surface,#f5f5f5)]"
                    : "hover:bg-[var(--ds-content-surface,#f5f5f5)]/70",
                )}
                aria-current={isActive ? "true" : undefined}
              >
                <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-[var(--ds-content-surface,#f5f5f5)]">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb}
                      alt=""
                      className="size-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "line-clamp-3 text-sm font-semibold leading-snug [text-wrap:pretty]",
                      isActive
                        ? "text-[var(--ds-primary,#ee3536)]"
                        : "text-[var(--ds-content-foreground,#0a0a0a)]",
                    )}
                  >
                    {article.title}
                  </p>
                  <ArticleCardMeta
                    article={article}
                    className="mt-1.5"
                    showAuthor={false}
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function sortArticlesByDate(articles: ArticleCard[]) {
  return [...articles].sort((a, b) => {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bTime - aTime;
  });
}
