import Image from "next/image";
import { leagueIconForCategory } from "@/lib/league-icons";
import { formatNewsDate } from "@/lib/format-news-date";
import { primaryCategoryLabel } from "@/lib/article-url";
import type { ArticleCard } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type ArticleCardMetaProps = {
  article: ArticleCard;
  className?: string;
  showAuthor?: boolean;
};

export function ArticleCardMeta({
  article,
  className,
  showAuthor = true,
}: ArticleCardMetaProps) {
  const category = primaryCategoryLabel(article.categories);
  const date = formatNewsDate(article.publishedAt);
  const icon = leagueIconForCategory(article.categories);

  return (
    <div className={cn("flex flex-wrap items-center gap-x-2 gap-y-1", className)}>
      {icon ? (
        <Image
          src={icon}
          alt=""
          width={18}
          height={18}
          className="size-[18px] shrink-0 object-contain"
        />
      ) : null}
      <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--ds-primary,#ee3536)]">
        {category}
      </span>
      {showAuthor && article.author?.name ? (
        <span className="text-[11px] text-[var(--ds-content-muted,#737373)]">
          by {article.author.name}
        </span>
      ) : null}
      {date ? (
        <span className="text-[11px] font-medium uppercase text-[var(--ds-content-muted,#737373)]">
          {date}
        </span>
      ) : null}
    </div>
  );
}
