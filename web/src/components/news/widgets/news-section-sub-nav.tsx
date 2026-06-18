"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  getNewsSectionNavConfig,
  isNewsSectionNavActive,
  type NewsSectionNavItem,
} from "@/lib/news-nav";
import { cn } from "@/lib/utils";

type NewsSectionSubNavProps = {
  className?: string;
  stickyOffset?: number;
};

function SectionNavChip({
  item,
  active,
}: {
  item: NewsSectionNavItem;
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      aria-label={item.slug === "world-cup" ? "World Cup 2026 news" : undefined}
      className={cn(
        "flex h-9 shrink-0 items-center gap-2 rounded-full border px-3.5 text-xs font-semibold transition-colors",
        active
          ? "border-[var(--ds-primary,#ee3536)] bg-[var(--ds-primary,#ee3536)] text-white"
          : "border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] text-[var(--ds-content-foreground,#0a0a0a)] hover:border-[var(--ds-primary,#ee3536)] hover:text-[var(--ds-primary,#ee3536)]",
      )}
    >
      {item.icon ? (
        <Image
          src={item.icon}
          alt=""
          width={16}
          height={16}
          className="size-4 object-contain"
        />
      ) : null}
      <span className="whitespace-nowrap">{item.label}</span>
    </Link>
  );
}

function useHorizontalScrollState() {
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const update = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    setCanScrollLeft(node.scrollLeft > 1);
    setCanScrollRight(node.scrollLeft + node.clientWidth < node.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    update();
    node.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(node);

    return () => {
      node.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [update]);

  const scrollBy = useCallback((delta: number) => {
    ref.current?.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return { ref, canScrollLeft, canScrollRight, scrollBy, update };
}

export function NewsSectionSubNav({
  className,
  stickyOffset = 0,
}: NewsSectionSubNavProps) {
  const pathname = usePathname();
  const { heading, items } = getNewsSectionNavConfig(pathname);
  const { ref, canScrollLeft, canScrollRight, scrollBy, update } =
    useHorizontalScrollState();

  useEffect(() => {
    update();
  }, [items, update]);

  const showArrows = canScrollLeft || canScrollRight;

  return (
    <nav
      aria-label={`${heading} sections`}
      className={cn(
        "sticky z-30 border-b border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-bg,#ffffff)]",
        className,
      )}
      style={{ top: stickyOffset }}
    >
      <div className="mx-auto flex w-full max-w-[1240px] items-center px-4 py-2.5 md:px-8 lg:px-10">
        <div className="relative min-w-0 flex-1">
          {showArrows && canScrollLeft ? (
            <button
              type="button"
              aria-label="Scroll sections left"
              onClick={() => scrollBy(-220)}
              className="absolute top-1/2 left-0 z-10 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] text-[var(--ds-content-muted,#737373)] shadow-sm transition-colors hover:text-[var(--ds-content-foreground,#0a0a0a)] sm:flex"
            >
              <ChevronLeftIcon className="size-4" />
            </button>
          ) : null}

          <div
            ref={ref}
            className={cn(
              "flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              showArrows && "sm:px-8",
            )}
          >
            {items.map((item) => (
              <SectionNavChip
                key={item.slug}
                item={item}
                active={isNewsSectionNavActive(pathname, item)}
              />
            ))}
          </div>

          {showArrows && canScrollRight ? (
            <button
              type="button"
              aria-label="Scroll sections right"
              onClick={() => scrollBy(220)}
              className="absolute top-1/2 right-0 z-10 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] text-[var(--ds-content-muted,#737373)] shadow-sm transition-colors hover:text-[var(--ds-content-foreground,#0a0a0a)] sm:flex"
            >
              <ChevronRightIcon className="size-4" />
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
