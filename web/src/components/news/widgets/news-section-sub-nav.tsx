"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useContentTheme } from "@/components/providers/content-theme-provider";
import {
  getNewsSectionNavConfig,
  isNewsSectionNavActive,
  newsNavIconInvertClass,
  type NewsSectionNavItem,
} from "@/lib/news-nav";
import { cn } from "@/lib/utils";

type NewsSectionSubNavProps = {
  className?: string;
  stickyOffset?: number;
  activeSectionSlug?: string;
};

function SectionNavLink({
  item,
  active,
  isDark,
}: {
  item: NewsSectionNavItem;
  active: boolean;
  isDark: boolean;
}) {
  return (
    <Link
      href={item.href}
      data-tab-item
      aria-label={item.slug === "world-cup" ? "World Cup 2026 news" : undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative z-10 flex h-9 shrink-0 items-center gap-1.5 rounded-2xl px-4 py-1 text-xs font-medium transition-colors",
        isDark
          ? "text-white/70 hover:bg-white/5 hover:text-white"
          : "text-[var(--ds-content-muted,#737373)] hover:bg-black/[0.04] hover:text-[var(--ds-content-foreground,#0a0a0a)]",
        active && "text-white",
      )}
    >
      {active ? (
        <motion.span
          layoutId="newsSectionActiveTab"
          className="absolute inset-0 -z-10 rounded-2xl"
          style={{ backgroundColor: "var(--ds-primary, #ee3536)" }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        />
      ) : null}
      {item.icon ? (
        <Image
          src={item.icon}
          alt=""
          width={16}
          height={16}
          className={cn(
            "relative z-10 size-4 object-contain",
            newsNavIconInvertClass(item.slug, { isDark, active }),
          )}
        />
      ) : null}
      <span className="relative z-10 whitespace-nowrap">{item.label}</span>
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
  activeSectionSlug,
}: NewsSectionSubNavProps) {
  const pathname = usePathname();
  const { theme } = useContentTheme();
  const isDark = theme === "dark";
  const { heading, items } = getNewsSectionNavConfig();
  const { ref, canScrollLeft, canScrollRight, scrollBy, update } =
    useHorizontalScrollState();

  useEffect(() => {
    update();
  }, [items, update]);

  const showArrows = canScrollLeft || canScrollRight;

  const scrollButtonClass = cn(
    "absolute top-1/2 z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full border transition-colors sm:flex",
    isDark
      ? "border-white/20 bg-[var(--ds-page-bg,#1c1c1c)]/90 text-white hover:border-white/30 hover:bg-[var(--ds-page-bg,#1c1c1c)]"
      : "border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] text-[var(--ds-content-muted,#737373)] shadow-sm hover:text-[var(--ds-content-foreground,#0a0a0a)]",
  );

  return (
    <nav
      data-news-section-sub-nav
      aria-label={`${heading} sections`}
      className={cn(
        "sticky z-30 border-b py-3 shadow-sm backdrop-blur-xl",
        isDark
          ? "border-white/10"
          : "border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-bg,#ffffff)]",
        className,
      )}
      style={{ top: stickyOffset }}
    >
      <div className="mx-auto flex w-full max-w-[1240px] items-center px-4 md:px-8 lg:px-10">
        <div className="relative min-w-0 flex-1">
          {showArrows && canScrollLeft ? (
            <button
              type="button"
              aria-label="Scroll sections left"
              onClick={() => scrollBy(-220)}
              className={cn(scrollButtonClass, "left-0 sm:-left-1")}
            >
              <ChevronLeftIcon className="size-4" />
            </button>
          ) : null}

          <div
            ref={ref}
            className={cn(
              "overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              showArrows && "sm:px-9",
            )}
          >
            <div
              className={cn(
                "inline-flex min-w-min gap-1 rounded-3xl p-0.5",
                isDark ? "bg-white/5" : "bg-[var(--ds-content-surface,#f5f5f5)]",
              )}
            >
              {items.map((item) => (
                <SectionNavLink
                  key={item.slug}
                  item={item}
                  isDark={isDark}
                  active={isNewsSectionNavActive(pathname, item, activeSectionSlug)}
                />
              ))}
            </div>
          </div>

          {showArrows && canScrollRight ? (
            <button
              type="button"
              aria-label="Scroll sections right"
              onClick={() => scrollBy(220)}
              className={cn(scrollButtonClass, "right-0 sm:-right-1")}
            >
              <ChevronRightIcon className="size-4" />
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
