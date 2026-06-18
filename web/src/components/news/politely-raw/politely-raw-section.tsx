import Link from "next/link";
import { PolitelyRawBadge } from "@/components/news/politely-raw/politely-raw-badge";
import { PolitelyRawVideoGrid } from "@/components/news/politely-raw/politely-raw-video-grid";
import { POLITELY_RAW_PATH } from "@/lib/politely-raw";
import type { ArticleCard } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type PolitelyRawSectionProps = {
  videos: ArticleCard[];
  className?: string;
  limit?: number;
};

export function PolitelyRawSection({
  videos,
  className,
  limit = 6,
}: PolitelyRawSectionProps) {
  const displayVideos = videos.slice(0, limit);
  if (!displayVideos.length) return null;

  return (
    <section aria-label="Politely RAW" className={cn(className)}>
      <div className="mb-5 flex items-end justify-between gap-4 border-b border-[var(--ds-content-card-border,#e5e5e5)] pb-3">
        <h2 className="m-0">
          <PolitelyRawBadge size="lg" />
        </h2>
        <Link
          href={POLITELY_RAW_PATH}
          className="shrink-0 text-sm font-semibold text-[var(--ds-primary,#ee3536)] transition-colors hover:text-[var(--ds-primary,#ee3536)]/80"
        >
          View all episodes
        </Link>
      </div>
      <PolitelyRawVideoGrid videos={displayVideos} hideTitle />
    </section>
  );
}
