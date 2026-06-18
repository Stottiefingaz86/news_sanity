import { cn } from "@/lib/utils";
import type { TextHeadingBlock } from "@/lib/article-blocks/types";

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const levelClass = {
  h2: "mb-4 mt-10 scroll-mt-28 font-serif text-[1.625rem] font-bold leading-tight md:text-[1.875rem] [text-wrap:balance]",
  h3: "mb-3 mt-8 scroll-mt-28 font-serif text-xl font-bold leading-snug md:text-[1.375rem] [text-wrap:balance]",
} as const;

export function TextHeadingBlockView({ value }: { value: TextHeadingBlock }) {
  if (!value.text) return null;

  const level = value.level ?? "h2";
  const id = slugifyHeading(value.text);
  const className = cn(
    levelClass[level],
    "text-[var(--ds-content-foreground,#0a0a0a)]",
  );

  if (level === "h3") {
    return (
      <h3 id={id || undefined} className={className}>
        {value.text}
      </h3>
    );
  }

  return (
    <h2 id={id || undefined} className={className}>
      {value.text}
    </h2>
  );
}
