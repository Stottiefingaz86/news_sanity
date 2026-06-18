type ArticleSummaryBoxProps = {
  summary: string;
};

export function ArticleSummaryBox({ summary }: ArticleSummaryBoxProps) {
  return (
    <aside className="rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-surface,#f5f5f5)] px-5 py-5 md:px-6 md:py-6">
      <p className="mb-2 font-sans text-sm font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
        In brief
      </p>
      <p className="font-serif text-[1.0625rem] leading-[1.7] text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:pretty]">
        {summary}
      </p>
    </aside>
  );
}
