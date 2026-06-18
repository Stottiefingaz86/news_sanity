import Link from "next/link";
import { ArticleCardMeta } from "@/components/news/article-card-meta";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { articlePath } from "@/lib/article-url";
import { getArticleImageUrl } from "@/lib/article-images";
import { imageUrl } from "@/lib/sanity/image";
import type { ArticleCard } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type ArticleTileProps = {
  article: ArticleCard;
  featured?: boolean;
  compact?: boolean;
  grid?: boolean;
  lead?: boolean;
};

export function ArticleTile({
  article,
  featured = false,
  compact = false,
  grid = false,
  lead = false,
}: ArticleTileProps) {
  const heroImage = getArticleImageUrl(
    article,
    featured ? 960 : lead ? 480 : grid ? 400 : 640,
    featured ? 540 : lead ? 320 : grid ? 260 : 360,
  );
  const authorImage = imageUrl(article.author?.image, 64, 64);

  if (lead) {
    return (
      <article className="group border-b border-[var(--ds-content-card-border,#e5e5e5)] pb-8 last:border-b-0 last:pb-0">
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,1fr)_13rem] lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-8">
          <div className="min-w-0">
            <h2 className="font-serif text-2xl leading-tight text-[var(--ds-content-foreground,#0a0a0a)] md:text-[2rem] [text-wrap:balance]">
              <Link
                href={articlePath(article.slug)}
                className="transition-colors hover:text-[var(--ds-primary,#ee3536)]"
              >
                {article.title}
              </Link>
            </h2>
            <ArticleCardMeta article={article} className="mt-3" />
          </div>
          <Link
            href={articlePath(article.slug)}
            className="block min-w-0 overflow-hidden rounded-lg bg-[var(--ds-content-surface,#f5f5f5)]"
          >
            <div className="aspect-[16/10]">
              {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroImage}
                  alt={article.title}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : null}
            </div>
          </Link>
        </div>
      </article>
    );
  }

  if (grid) {
    return (
      <article className="group min-w-0">
        <Link href={articlePath(article.slug)} className="block min-w-0">
          <div className="aspect-[16/10] overflow-hidden rounded-lg bg-[var(--ds-content-surface,#f5f5f5)]">
            {heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroImage}
                alt={article.title}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : null}
          </div>
        </Link>
        <h2 className="mt-3 line-clamp-3 font-serif text-base leading-snug text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:balance]">
          <Link
            href={articlePath(article.slug)}
            className="transition-colors hover:text-[var(--ds-primary,#ee3536)]"
          >
            {article.title}
          </Link>
        </h2>
      </article>
    );
  }

  if (featured) {
    return (
      <article className="group grid min-w-0 grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
        <Link
          href={articlePath(article.slug)}
          className="block min-h-[220px] min-w-0 overflow-hidden rounded-lg bg-[var(--ds-content-surface,#f5f5f5)] lg:min-h-[320px]"
        >
          {heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroImage}
              alt={article.title}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : null}
        </Link>

        <div className="flex min-w-0 flex-col justify-center gap-4 py-1">
          <ArticleCardMeta article={article} showAuthor={false} />

          <h2 className="font-serif text-2xl leading-tight text-[var(--ds-content-foreground,#0a0a0a)] md:text-[2rem] md:leading-[1.15] [text-wrap:balance]">
            <Link
              href={articlePath(article.slug)}
              className="transition-colors hover:text-[var(--ds-primary,#ee3536)]"
            >
              {article.title}
            </Link>
          </h2>

          {article.excerpt ? (
            <p className="line-clamp-3 text-sm leading-relaxed text-[var(--ds-content-muted,#737373)] [text-wrap:pretty]">
              {article.excerpt}
            </p>
          ) : null}

          {article.author?.name ? (
            <div className="flex items-center gap-2 text-sm text-[var(--ds-content-muted,#737373)]">
              <Avatar className="size-7 border border-[var(--ds-content-card-border,#e5e5e5)]">
                {authorImage ? (
                  <AvatarImage src={authorImage} alt={article.author.name} />
                ) : null}
                <AvatarFallback className="bg-[var(--ds-primary,#ee3536)] text-[10px] text-white">
                  {article.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>by {article.author.name}</span>
            </div>
          ) : null}
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group min-w-0 overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md",
        "border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)]",
      )}
    >
      <Link href={articlePath(article.slug)} className="block min-w-0">
        <div className="aspect-[16/10] bg-[var(--ds-content-surface,#f5f5f5)]">
          {heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroImage}
              alt={article.title}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : null}
        </div>
      </Link>

      <div className="flex min-w-0 flex-col gap-3 p-4">
        <ArticleCardMeta article={article} />

        <h2
          className={cn(
            "font-serif leading-snug text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:balance]",
            compact ? "text-base" : "text-lg",
          )}
        >
          <Link
            href={articlePath(article.slug)}
            className="transition-colors hover:text-[var(--ds-primary,#ee3536)]"
          >
            {article.title}
          </Link>
        </h2>
      </div>
    </article>
  );
}

type ArticleListItemProps = {
  article: ArticleCard;
  variant?: "default" | "popular";
};

export function ArticleListItem({ article, variant = "default" }: ArticleListItemProps) {
  const thumb = getArticleImageUrl(article, 112, 112);

  if (variant === "popular") {
    return (
      <Link
        href={articlePath(article.slug)}
        className="group flex gap-3 py-2 transition-colors"
      >
        <span
          aria-hidden
          className="mt-1.5 size-2 shrink-0 bg-[var(--ds-content-muted,#737373)]"
        />
        <div className="min-w-0 flex-1">
          <p className="line-clamp-3 text-sm font-semibold leading-snug text-[var(--ds-content-foreground,#0a0a0a)] group-hover:text-[var(--ds-primary,#ee3536)]">
            {article.title}
          </p>
          <ArticleCardMeta article={article} className="mt-1.5" showAuthor={false} />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={articlePath(article.slug)}
      className="group flex gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-[var(--ds-content-card-border,#e5e5e5)] hover:bg-[var(--ds-content-surface,#f5f5f5)]"
    >
      <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-[var(--ds-content-surface,#f5f5f5)]">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumb} alt="" className="size-full object-cover" />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--ds-content-foreground,#0a0a0a)] group-hover:text-[var(--ds-primary,#ee3536)]">
          {article.title}
        </p>
        <ArticleCardMeta article={article} className="mt-1" showAuthor={false} />
      </div>
    </Link>
  );
}
