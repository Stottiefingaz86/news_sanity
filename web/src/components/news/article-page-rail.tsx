import Link from "next/link";
import { ArticleShareButtons } from "@/components/news/article-share-buttons";
import { categoryPath } from "@/lib/article-url";
import type { ArticleDetail } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type ArticlePageRailProps = {
  article: ArticleDetail;
  hasSubNav?: boolean;
  className?: string;
};

const BROWSE_LINKS = [
  { label: "Expert Analysis", slug: "expert-analysis" },
  { label: "NFL", slug: "nfl" },
  { label: "NBA", slug: "nba" },
  { label: "News", slug: "news" },
];

export function ArticlePageRail({
  article,
  hasSubNav = false,
  className,
}: ArticlePageRailProps) {
  return (
    <aside
      className={cn(
        "hidden min-w-0 lg:block lg:sticky lg:self-start",
        hasSubNav ? "lg:top-[11.5rem]" : "lg:top-24",
        "lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:overscroll-contain",
        className,
      )}
    >
      <p className="mb-3 text-sm font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
        Share
      </p>
      <ArticleShareButtons title={article.title} slug={article.slug} className="mb-8" />

      <p className="mb-3 text-sm font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
        Browse
      </p>
      <ul className="space-y-2 border-l border-[var(--ds-content-card-border,#e5e5e5)] pl-3">
        {BROWSE_LINKS.map((item) => (
          <li key={item.slug}>
            <Link
              href={categoryPath(item.slug)}
              className="block text-sm text-[var(--ds-content-muted,#737373)] transition-colors hover:text-[var(--ds-primary,#ee3536)]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
