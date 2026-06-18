"use client";

import Image from "next/image";
import {
  IconArrowUpRight,
  IconChartBar,
  IconCircleDot,
  IconMinus,
  IconTrendingDown,
  IconTrendingUp,
  IconTrophy,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { imageUrl } from "@/lib/sanity/image";
import type { ContentGridBlock, GridItem } from "@/lib/article-blocks/types";

const gapClass = {
  tight: "gap-3",
  normal: "gap-4",
  loose: "gap-6",
} as const;

type TileTone = "positive" | "negative" | "neutral" | "accent" | "default";

function resolveTileMeta(title?: string) {
  const text = (title ?? "").toLowerCase();

  if (/negative|stop|avoid|loss|leak|exit/.test(text)) {
    return { Icon: IconTrendingDown, tone: "negative" as const };
  }
  if (/neutral|break-even|flat/.test(text)) {
    return { Icon: IconMinus, tone: "neutral" as const };
  }
  if (/positive|beat|edge|upside|contender|value/.test(text)) {
    return { Icon: IconTrendingUp, tone: "positive" as const };
  }
  if (/sample|track|data|chart|rate|odds|size|metric/.test(text)) {
    return { Icon: IconChartBar, tone: "accent" as const };
  }
  if (/brazil|france|argentina|team|winner|boot/.test(text)) {
    return { Icon: IconTrophy, tone: "accent" as const };
  }

  return { Icon: IconCircleDot, tone: "default" as const };
}

const toneClass: Record<TileTone, string> = {
  positive: "bg-emerald-600/10 text-emerald-800",
  negative: "bg-[var(--ds-primary,#ee3536)]/10 text-[var(--ds-primary,#ee3536)]",
  neutral: "bg-[var(--ds-content-card-bg,#ffffff)] text-[var(--ds-content-muted,#737373)]",
  accent: "bg-[var(--ds-primary,#ee3536)]/8 text-[var(--ds-primary,#ee3536)]",
  default: "bg-[var(--ds-content-card-bg,#ffffff)] text-[var(--ds-content-foreground,#0a0a0a)]",
};

function GridTile({
  item,
  featured = false,
}: {
  item: GridItem;
  featured?: boolean;
}) {
  const src = imageUrl(item.image, 800, 600);
  const { Icon, tone } = resolveTileMeta(item.title);

  const content = (
    <>
      {src ? (
        <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-lg bg-[var(--ds-content-card-border,#e5e5e5)]">
          <Image
            src={src}
            alt={item.title ?? ""}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div
          className={cn(
            "mb-4 inline-flex items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105",
            featured ? "size-12" : "size-10",
            toneClass[tone],
          )}
        >
          <Icon className={featured ? "size-6" : "size-5"} strokeWidth={1.75} />
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {item.title ? (
            <h4
              className={cn(
                "font-serif leading-snug text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:balance]",
                featured ? "text-xl md:text-2xl" : "text-lg",
              )}
            >
              {item.title}
            </h4>
          ) : null}
          {item.body ? (
            <p className="mt-2 text-sm leading-6 text-[var(--ds-content-muted,#737373)] [text-wrap:pretty]">
              {item.body}
            </p>
          ) : null}
        </div>
        {item.href ? (
          <IconArrowUpRight
            className="mt-0.5 size-4 shrink-0 text-[var(--ds-content-muted,#737373)] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--ds-primary,#ee3536)] group-hover:opacity-100"
            strokeWidth={1.75}
          />
        ) : null}
      </div>
    </>
  );

  const shellClass = cn(
    "group relative flex h-full flex-col rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] p-5 transition-all duration-200 ease-out",
    "hover:-translate-y-0.5 hover:border-[var(--ds-primary,#ee3536)]/30 hover:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.35)] motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none",
    featured && "p-6 md:p-7",
  );

  if (item.href) {
    return (
      <a href={item.href} className={cn(shellClass, "cursor-pointer")}>
        {content}
      </a>
    );
  }

  return <div className={shellClass}>{content}</div>;
}

function gridColumnClass(columns: number) {
  if (columns >= 4) return "md:grid-cols-2 xl:grid-cols-4";
  if (columns === 3) return "md:grid-cols-2 lg:grid-cols-3";
  return "md:grid-cols-2";
}

export function ContentGridBlockView({
  value,
}: {
  value: ContentGridBlock;
}) {
  const items = value.items ?? [];
  if (!items.length) return null;

  const layout = value.layout ?? "uniform";
  const columns = value.columns ?? 3;
  const gap = gapClass[value.gap ?? "normal"];

  if (layout === "masonry") {
    return (
      <section className="my-10">
        <div className={cn("grid grid-cols-1", gridColumnClass(columns), gap)}>
          {items.map((item, index) => (
            <GridTile key={item._key} item={item} featured={index === 0} />
          ))}
        </div>
      </section>
    );
  }

  if (layout === "bento") {
    return (
      <section className="my-10">
        <div
          className={cn(
            "grid grid-cols-1 grid-flow-dense sm:grid-cols-2",
            gap,
          )}
        >
          {items.map((item, index) => (
            <div
              key={item._key}
              className={cn(
                (item.colSpan === 2 || index === 0) && "sm:col-span-2",
                item.rowSpan === 2 && "sm:min-h-[14rem]",
              )}
            >
              <GridTile item={item} featured={index === 0 || item.colSpan === 2} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="my-8">
      <div className={cn("grid grid-cols-1", gridColumnClass(columns), gap)}>
        {items.map((item) => (
          <GridTile key={item._key} item={item} />
        ))}
      </div>
    </section>
  );
}
