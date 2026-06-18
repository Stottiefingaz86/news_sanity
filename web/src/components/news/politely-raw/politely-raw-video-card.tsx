import Link from "next/link";
import { PlayIcon } from "lucide-react";
import { PolitelyRawBadge } from "@/components/news/politely-raw/politely-raw-badge";
import { articlePath } from "@/lib/article-url";
import { getVideoThumbnailUrl } from "@/lib/video-embed";
import { formatNewsDatePolitelyRaw } from "@/lib/format-news-date";
import type { ArticleCard } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type PolitelyRawVideoCardProps = {
  video: ArticleCard;
  className?: string;
  compact?: boolean;
};

export function PolitelyRawVideoCard({
  video,
  className,
  compact = false,
}: PolitelyRawVideoCardProps) {
  const thumbnail = getVideoThumbnailUrl(
    video,
    compact ? 480 : 640,
    compact ? 270 : 360,
  );
  const date = formatNewsDatePolitelyRaw(video.publishedAt);

  return (
    <article className={cn("group min-w-0", className)}>
      <Link href={articlePath(video.slug)} className="block min-w-0">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-[var(--ds-content-surface,#f5f5f5)]">
          {thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt=""
              className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-white/95 text-[var(--ds-content-foreground,#0a0a0a)] shadow-lg transition-transform group-hover:scale-105 sm:size-14">
              <PlayIcon className="ml-0.5 size-5 fill-current sm:size-6" />
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-3 flex items-start gap-2.5">
        <PolitelyRawBadge size="sm" className="mt-0.5" />
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:balance]">
            <Link
              href={articlePath(video.slug)}
              className="transition-colors hover:text-[var(--ds-primary,#ee3536)]"
            >
              {video.title}
            </Link>
          </h3>
          {date ? (
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--ds-content-muted,#737373)]">
              {date}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
