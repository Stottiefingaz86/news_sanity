import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { articlePath, primaryCategoryLabel } from "@/lib/article-url";
import { formatNewsDate } from "@/lib/format-news-date";
import { getArticleImageUrl } from "@/lib/article-images";
import type { ArticleCard } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type CardBaseProps = {
  article: ArticleCard;
  className?: string;
};

export function ArticleCardHorizontal({ article, className }: CardBaseProps) {
  const category = primaryCategoryLabel(article.categories);
  const date = formatNewsDate(article.publishedAt);
  const thumb = getArticleImageUrl(article, 320, 200);

  return (
    <Card
      className={cn(
        "overflow-hidden border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] py-0 ring-0",
        className,
      )}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[9rem_minmax(0,1fr)]">
        <Link href={articlePath(article.slug)} className="block min-h-[120px] bg-[var(--ds-content-surface,#f5f5f5)] sm:min-h-full">
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumb} alt="" className="size-full object-cover" />
          ) : null}
        </Link>
        <CardContent className="flex flex-col justify-center gap-2 py-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--ds-primary,#ee3536)]">
            {category}
            {date ? <span className="font-normal text-[var(--ds-content-muted,#737373)]"> · {date}</span> : null}
          </p>
          <h3 className="font-serif text-lg leading-snug text-[var(--ds-content-foreground,#0a0a0a)]">
            <Link href={articlePath(article.slug)} className="hover:text-[var(--ds-primary,#ee3536)]">
              {article.title}
            </Link>
          </h3>
          {article.excerpt ? (
            <p className="line-clamp-2 text-sm text-[var(--ds-content-muted,#737373)]">{article.excerpt}</p>
          ) : null}
        </CardContent>
      </div>
    </Card>
  );
}

export function ArticleCardOverlay({ article, className }: CardBaseProps) {
  const category = primaryCategoryLabel(article.categories);
  const hero = getArticleImageUrl(article, 800, 500);

  return (
    <Link
      href={articlePath(article.slug)}
      className={cn(
        "group relative block min-h-[280px] overflow-hidden rounded-xl",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[var(--ds-content-surface,#f5f5f5)]">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero}
            alt=""
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 text-white">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--ds-primary,#ee3536)]">
          {category}
        </span>
        <h3 className="font-serif text-xl leading-snug [text-wrap:balance]">{article.title}</h3>
      </div>
    </Link>
  );
}

export function ArticleCardStat({
  label,
  value,
  change,
  className,
}: {
  label: string;
  value: string;
  change?: string;
  className?: string;
}) {
  return (
    <Card className={cn("border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] ring-0", className)}>
      <CardHeader className="pb-0">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--ds-content-muted,#737373)]">
          {label}
        </p>
      </CardHeader>
      <CardContent>
        <p className="font-serif text-3xl text-[var(--ds-content-foreground,#0a0a0a)]">{value}</p>
        {change ? (
          <p className="mt-1 text-sm text-[var(--ds-primary,#ee3536)]">{change}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function ArticleCardAuthor({ article, className }: CardBaseProps) {
  const author = article.author?.name ?? "Editorial Team";

  return (
    <Card className={cn("border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] ring-0", className)}>
      <CardContent className="flex items-start gap-4 py-5">
        <Avatar className="size-14 border border-[var(--ds-content-card-border,#e5e5e5)]">
          <AvatarFallback className="bg-[var(--ds-content-surface,#f5f5f5)] text-lg">
            {author.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--ds-primary,#ee3536)]">
            Author
          </p>
          <h3 className="mt-1 font-serif text-xl text-[var(--ds-content-foreground,#0a0a0a)]">{author}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--ds-content-muted,#737373)]">
            Covers betting analysis, futures markets, and tournament previews for BetOnline News.
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-[var(--ds-content-card-border,#e5e5e5)]">
        <Link
          href={articlePath(article.slug)}
          className="text-sm font-semibold text-[var(--ds-primary,#ee3536)] hover:underline"
        >
          Read latest from {author.split(" ")[0]}
        </Link>
      </CardFooter>
    </Card>
  );
}

export function ArticleCardMini({ article, className }: CardBaseProps) {
  const category = primaryCategoryLabel(article.categories);

  return (
    <Link
      href={articlePath(article.slug)}
      className={cn(
        "block rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] p-3 transition-shadow hover:shadow-md",
        className,
      )}
    >
      <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--ds-primary,#ee3536)]">
        {category}
      </p>
      <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-[var(--ds-content-foreground,#0a0a0a)]">
        {article.title}
      </p>
    </Link>
  );
}
