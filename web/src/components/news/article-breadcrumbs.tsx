import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { NewsBreadcrumbs } from "@/components/news/library/news-breadcrumbs";
import { categoryPath } from "@/lib/article-url";
import type { ArticleCategory } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type ArticleBackLinkProps = {
  categories?: ArticleCategory[];
  className?: string;
};

export function ArticleBackLink({ categories, className }: ArticleBackLinkProps) {
  const primary = categories?.[0];
  const href = primary ? categoryPath(primary.slug) : "/";
  const label = primary ? `Back to ${primary.title}` : "Back to In the News";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ds-content-muted,#737373)] transition-colors hover:text-[var(--ds-content-foreground,#0a0a0a)]",
        className,
      )}
    >
      <ArrowLeftIcon className="size-4 shrink-0" />
      {label}
    </Link>
  );
}

type ArticleBreadcrumbsProps = {
  categories?: ArticleCategory[];
  title: string;
  className?: string;
};

export function ArticleBreadcrumbs({
  categories,
  title,
  className,
}: ArticleBreadcrumbsProps) {
  const primary = categories?.[0];

  return (
    <nav aria-label="Article navigation" className={cn("mb-4 flex flex-col gap-3", className)}>
      <ArticleBackLink categories={categories} />
      <NewsBreadcrumbs
        items={[
          { label: "In the News", href: "/" },
          ...(primary
            ? [{ label: primary.title, href: categoryPath(primary.slug) }]
            : []),
          { label: title },
        ]}
      />
    </nav>
  );
}

type CategoryPageNavProps = {
  title: string;
  className?: string;
};

export function CategoryPageNav({ title, className }: CategoryPageNavProps) {
  return (
    <nav aria-label="Page navigation" className={cn("mb-4 flex flex-col gap-3", className)}>
      <ArticleBackLink />
      <NewsBreadcrumbs
        items={[
          { label: "In the News", href: "/" },
          { label: title },
        ]}
      />
    </nav>
  );
}
