import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NewsBreadcrumbs } from "@/components/news/library/news-breadcrumbs";
import type { ArticleCard } from "@/lib/sanity/types";
import { articlePath, primaryCategoryLabel } from "@/lib/article-url";
import { formatNewsDate } from "@/lib/format-news-date";
import { cn } from "@/lib/utils";

type NewsSectionHeroProps = {
  article: ArticleCard;
  className?: string;
};

export function NewsSectionHero({ article, className }: NewsSectionHeroProps) {
  const category = primaryCategoryLabel(article.categories);
  const date = formatNewsDate(article.publishedAt);

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl bg-[var(--ds-content-foreground,#0a0a0a)] px-6 py-10 text-white md:px-10 md:py-14",
        className,
      )}
    >
      <div className="relative z-10 mx-auto max-w-3xl">
        <NewsBreadcrumbs
          variant="hero"
          items={[
            { label: "In the News", href: "/" },
            { label: category, href: `/category/${article.categories?.[0]?.slug ?? "news"}` },
            { label: article.title },
          ]}
        />
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ds-primary,#ee3536)]">
          {category}
          {date ? ` · ${date}` : ""}
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight [text-wrap:balance] md:text-5xl">
          {article.title}
        </h1>
        {article.excerpt ? (
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 [text-wrap:pretty]">
            {article.excerpt}
          </p>
        ) : null}
        <div className="mt-8">
          <Button render={<Link href={articlePath(article.slug)} />}>Read article</Button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(238,53,54,0.25),transparent_55%)]" />
    </section>
  );
}

type NewsSectionNewsletterProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function NewsSectionNewsletter({
  title = "Get the edge in your inbox",
  description = "Weekly picks, odds moves, and analysis from the BetOnline News desk.",
  className,
}: NewsSectionNewsletterProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-surface,#f5f5f5)] p-6 md:p-8",
        className,
      )}
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ds-primary,#ee3536)]">
          Newsletter
        </p>
        <h2 className="mt-2 font-serif text-2xl text-[var(--ds-content-foreground,#0a0a0a)]">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--ds-content-muted,#737373)]">{description}</p>
        <form className="mt-6 flex flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="you@example.com"
            className="h-10 min-w-0 flex-1 rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] px-3 text-sm outline-none focus:border-[var(--ds-primary,#ee3536)]"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}

type NewsTagCloudProps = {
  tags: string[];
  className?: string;
};

export function NewsTagCloud({ tags, className }: NewsTagCloudProps) {
  return (
    <section className={className}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--ds-content-foreground,#0a0a0a)]">
        Trending topics
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] px-3 py-1 text-xs font-medium text-[var(--ds-content-foreground,#0a0a0a)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

type NewsTopicRailProps = {
  title: string;
  topics: { label: string; href: string; count?: number }[];
  className?: string;
};

export function NewsTopicRail({ title, topics, className }: NewsTopicRailProps) {
  return (
    <section className={className}>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-[var(--ds-content-foreground,#0a0a0a)]">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {topics.map((topic) => (
          <Link
            key={topic.href}
            href={topic.href}
            className="rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] p-4 transition-shadow hover:shadow-md"
          >
            <p className="font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">{topic.label}</p>
            {topic.count !== undefined ? (
              <p className="mt-1 text-xs text-[var(--ds-content-muted,#737373)]">
                {topic.count} articles
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
