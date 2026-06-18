import { cn } from "@/lib/utils";
import type { SectionHeaderBlock } from "@/lib/article-blocks/types";

const titleClass = {
  display:
    "font-serif text-4xl leading-[1.05] md:text-5xl [text-wrap:balance]",
  large: "font-serif text-3xl leading-tight md:text-4xl [text-wrap:balance]",
  medium: "text-2xl font-semibold leading-tight [text-wrap:balance]",
} as const;

export function SectionHeaderBlockView({
  value,
}: {
  value: SectionHeaderBlock;
}) {
  if (!value.title) return null;

  const align = value.align === "center" ? "text-center" : "text-left";

  return (
    <header className={cn("my-10 space-y-3", align)}>
      {value.kicker ? (
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ds-primary,#ee3536)]">
          {value.kicker}
        </p>
      ) : null}
      <h2
        className={cn(
          titleClass[value.size ?? "large"],
          "text-[var(--ds-content-foreground,#0a0a0a)]",
        )}
      >
        {value.title}
      </h2>
      {value.subtitle ? (
        <p className="max-w-2xl text-base leading-7 text-[var(--ds-content-muted,#737373)] [text-wrap:pretty]">
          {value.subtitle}
        </p>
      ) : null}
    </header>
  );
}
