import { cn } from "@/lib/utils";
import type { ProseBodyBlock } from "@/lib/article-blocks/types";

export function ProseBodyBlockView({ value }: { value: ProseBodyBlock }) {
  const paragraphs = (value.paragraphs ?? []).filter(Boolean);
  if (!paragraphs.length) return null;

  const rawColumns = value.columns ?? 1;
  const columns = Number(rawColumns) as 1 | 2 | 3;

  return (
    <div
      className={cn(
        "font-serif text-[1.0625rem] leading-[1.75] text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:pretty]",
        columns === 2 && "article-prose-columns-2",
        columns === 3 && "article-prose-columns-3",
        value.dropCap && "article-prose-drop-cap",
        paragraphs.length > 0 && "mb-6",
      )}
    >
      {paragraphs.map((paragraph, index) => (
        <p
          key={`${value._key}-${index}`}
          className={cn(
            "mb-5 last:mb-0",
            columns > 1 && "break-inside-avoid",
          )}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
