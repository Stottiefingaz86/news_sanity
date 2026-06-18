import type { StandfirstBlock } from "@/lib/article-blocks/types";

export function StandfirstBlockView({ value }: { value: StandfirstBlock }) {
  if (!value.text) return null;

  return (
    <p className="mb-6 font-sans text-lg font-medium leading-[1.6] text-[var(--ds-content-foreground,#0a0a0a)] md:text-[1.25rem] md:leading-[1.55] [text-wrap:pretty]">
      {value.text}
    </p>
  );
}
