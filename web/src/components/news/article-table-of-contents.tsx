import type { ArticleHeading } from "@/lib/extract-article-headings";
import { cn } from "@/lib/utils";

type ArticleTableOfContentsProps = {
  headings: ArticleHeading[];
  hasSubNav?: boolean;
  className?: string;
};

export function ArticleTableOfContents({
  headings,
  hasSubNav = false,
  className,
}: ArticleTableOfContentsProps) {
  if (!headings.length) return null;

  return (
    <aside
      className={cn(
        "hidden min-w-0 lg:block lg:sticky lg:self-start",
        hasSubNav ? "lg:top-[11.5rem]" : "lg:top-24",
        "lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:overscroll-contain",
        className,
      )}
    >
      <p className="mb-3 text-sm font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
        On this page
      </p>
      <ul className="space-y-2 border-l border-[var(--ds-content-card-border,#e5e5e5)] pl-3">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block text-sm text-[var(--ds-content-muted,#737373)] transition-colors hover:text-[var(--ds-primary,#ee3536)]",
                heading.level === 3 && "pl-3",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
