import { PolitelyRawVideoCard } from "@/components/news/politely-raw/politely-raw-video-card";
import type { ArticleCard } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type PolitelyRawVideoGridProps = {
  videos: ArticleCard[];
  title?: string;
  hideTitle?: boolean;
  className?: string;
  compact?: boolean;
};

export function PolitelyRawVideoGrid({
  videos,
  title = "More videos",
  hideTitle = false,
  className,
  compact = false,
}: PolitelyRawVideoGridProps) {
  if (!videos.length) return null;

  return (
    <section className={cn("min-w-0", className)}>
      {!hideTitle ? (
        <h2 className="mb-4 font-serif text-xl text-[var(--ds-content-foreground,#0a0a0a)] md:text-2xl">
          {title}
        </h2>
      ) : null}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {videos.map((video) => (
          <PolitelyRawVideoCard key={video._id} video={video} compact={compact} />
        ))}
      </div>
    </section>
  );
}
