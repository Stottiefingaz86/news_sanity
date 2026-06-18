import Link from "next/link";
import {
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { categoryPath } from "@/lib/article-url";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CategoryPaginationProps = {
  slug: string;
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  className?: string;
};

function pageRangeLabel(page: number, pageSize: number, total: number) {
  if (total === 0) return "No stories";
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  return `${start.toLocaleString()}–${end.toLocaleString()} of ${total.toLocaleString()}`;
}

function visiblePages(current: number, totalPages: number): (number | "gap")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, current]);
  for (let offset = -1; offset <= 1; offset += 1) {
    const value = current + offset;
    if (value >= 1 && value <= totalPages) pages.add(value);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | "gap")[] = [];

  sorted.forEach((value, index) => {
    const previous = sorted[index - 1];
    if (previous !== undefined && value - previous > 1) {
      result.push("gap");
    }
    result.push(value);
  });

  return result;
}

const navButtonClass =
  "border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] text-[var(--ds-content-foreground,#0a0a0a)] hover:bg-[var(--ds-content-surface,#f5f5f5)]";

export function CategoryPagination({
  slug,
  page,
  totalPages,
  total,
  pageSize,
  className,
}: CategoryPaginationProps) {
  if (totalPages <= 1) {
    return (
      <p
        className={cn(
          "text-sm tabular-nums text-[var(--ds-content-muted,#525252)]",
          className,
        )}
      >
        {pageRangeLabel(page, pageSize, total)}
      </p>
    );
  }

  const pages = visiblePages(page, totalPages);
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <nav
      aria-label="Category stories pagination"
      className={cn(
        "flex flex-col gap-4 border-t border-[var(--ds-content-card-border,#e5e5e5)] pt-6 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-sm tabular-nums text-[var(--ds-content-muted,#525252)]">
        {pageRangeLabel(page, pageSize, total)}
      </p>

      <div className="flex flex-wrap items-center gap-1.5">
        {prevDisabled ? (
          <span
            aria-disabled="true"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              navButtonClass,
              "pointer-events-none opacity-40",
            )}
          >
            <IconChevronLeft className="size-4" />
            <span className="hidden sm:inline">Previous</span>
          </span>
        ) : (
          <Link
            href={categoryPath(slug, page - 1)}
            aria-label="Previous page"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), navButtonClass)}
          >
            <IconChevronLeft className="size-4" />
            <span className="hidden sm:inline">Previous</span>
          </Link>
        )}

        <div className="flex items-center gap-1">
          {pages.map((item, index) =>
            item === "gap" ? (
              <span
                key={`gap-${index}`}
                aria-hidden
                className="px-1 text-sm text-[var(--ds-content-muted,#737373)]"
              >
                …
              </span>
            ) : item === page ? (
              <span
                key={item}
                aria-current="page"
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "min-w-8 bg-[var(--ds-primary,#ee3536)] px-2 tabular-nums text-white",
                )}
              >
                {item}
              </span>
            ) : (
              <Link
                key={item}
                href={categoryPath(slug, item)}
                aria-label={`Page ${item}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  navButtonClass,
                  "min-w-8 px-2 tabular-nums",
                )}
              >
                {item}
              </Link>
            ),
          )}
        </div>

        {nextDisabled ? (
          <span
            aria-disabled="true"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              navButtonClass,
              "pointer-events-none opacity-40",
            )}
          >
            <span className="hidden sm:inline">Next</span>
            <IconChevronRight className="size-4" />
          </span>
        ) : (
          <Link
            href={categoryPath(slug, page + 1)}
            aria-label="Next page"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), navButtonClass)}
          >
            <span className="hidden sm:inline">Next</span>
            <IconChevronRight className="size-4" />
          </Link>
        )}
      </div>
    </nav>
  );
}
