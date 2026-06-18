import type { PullQuoteBlock } from "@/lib/article-blocks/types";

export function PullQuoteBlockView({ value }: { value: PullQuoteBlock }) {
  if (!value.quote) return null;

  return (
    <figure className="my-10 py-2">
      <blockquote className="font-serif text-[clamp(1.375rem,2.5vw,1.75rem)] leading-[1.35] text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:pretty]">
        “{value.quote}”
      </blockquote>
      {value.attribution ? (
        <figcaption className="mt-4 font-sans text-xs font-bold uppercase tracking-[0.1em] text-[var(--ds-content-muted,#737373)]">
          {value.attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
