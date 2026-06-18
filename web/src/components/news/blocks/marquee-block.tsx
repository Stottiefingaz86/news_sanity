import { cn } from "@/lib/utils";
import type { MarqueeBlock } from "@/lib/article-blocks/types";

const speedClass = {
  slow: "animate-marquee-slow",
  medium: "animate-marquee-medium",
  fast: "animate-marquee-fast",
} as const;

export function MarqueeBlockView({ value }: { value: MarqueeBlock }) {
  const items = value.items?.filter(Boolean) ?? [];
  if (!items.length) return null;

  const separator = value.separator ?? "·";
  const speed = speedClass[value.speed ?? "medium"];
  const track = [...items, ...items];

  return (
    <section
      className="my-10 overflow-hidden rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] py-4"
      aria-label="Scrolling highlights"
    >
      <div className="relative flex">
        <div
          className={cn(
            "flex shrink-0 items-center gap-8 whitespace-nowrap px-4 motion-reduce:animate-none",
            speed,
          )}
        >
          {track.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-8 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--ds-content-foreground,#0a0a0a)]"
            >
              {item}
              {index < track.length - 1 ? (
                <span className="text-[var(--ds-content-muted,#737373)]">
                  {separator}
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
