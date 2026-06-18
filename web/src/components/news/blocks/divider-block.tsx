import { NewsRelatedLinks } from "@/components/news/ui/news-related-links";
import { cn } from "@/lib/utils";
import type { DividerBlock } from "@/lib/article-blocks/types";

export function DividerBlockView({ value }: { value: DividerBlock }) {
  const style = value.style ?? "line";

  if (style === "space") {
    return <div className="my-12" aria-hidden />;
  }

  if (style === "dots") {
    return (
      <div className="my-10 flex justify-center gap-2" aria-hidden>
        <span className="size-1 rounded-full bg-[var(--ds-content-muted,#737373)]" />
        <span className="size-1 rounded-full bg-[var(--ds-content-muted,#737373)]" />
        <span className="size-1 rounded-full bg-[var(--ds-content-muted,#737373)]" />
      </div>
    );
  }

  return (
    <hr
      className={cn(
        "my-10 border-0",
        style === "thick"
          ? "h-1 rounded-full bg-[var(--ds-content-card-border,#e5e5e5)]"
          : "border-t border-[var(--ds-content-card-border,#e5e5e5)]",
      )}
    />
  );
}

export function RelatedArticlesBlockView({
  value,
}: {
  value: {
    title?: string;
    articles?: { title?: string; href?: string; category?: string }[];
  };
}) {
  return (
    <NewsRelatedLinks
      title={value.title ?? "Related reading"}
      articles={value.articles ?? []}
    />
  );
}
