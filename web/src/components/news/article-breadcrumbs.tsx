import { NewsBreadcrumbs } from "@/components/news/library/news-breadcrumbs";
import { categoryPath } from "@/lib/article-url";
import type { ArticleCategory } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type ArticleBackLinkProps = {
  categories?: ArticleCategory[];
  className?: string;
};

/** @deprecated Use NewsBreadcrumbs with showBackArrow instead. */
export function ArticleBackLink({ categories, className }: ArticleBackLinkProps) {
  const primary = categories?.[0];

  return (
    <NewsBreadcrumbs
      className={className}
      showBackArrow
      items={[
        { label: "In the News", href: "/" },
        ...(primary ? [{ label: primary.title, href: categoryPath(primary.slug) }] : []),
      ]}
    />
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
    <nav aria-label="Article navigation" className={cn("mb-4", className)}>
      <NewsBreadcrumbs
        showBackArrow
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
    <nav aria-label="Page navigation" className={cn("mb-4", className)}>
      <NewsBreadcrumbs
        showBackArrow
        items={[
          { label: "In the News", href: "/" },
          { label: title },
        ]}
      />
    </nav>
  );
}
