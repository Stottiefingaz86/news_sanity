"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArticleListItem } from "@/components/news/article-tile";
import { LeagueStandings } from "@/components/news/widgets/league-standings";
import { categoryPath } from "@/lib/article-url";
import { STANDINGS_BY_LEAGUE } from "@/lib/sports-widgets/data";
import type { ArticleCard } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type HomeSidebarWidgetsProps = {
  popular: ArticleCard[];
  scrollBoundaryRef: React.RefObject<HTMLElement | null>;
};

export function HomeSidebarWidgets({
  popular,
  scrollBoundaryRef,
}: HomeSidebarWidgetsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const belowRef = useRef<HTMLDivElement>(null);
  const [listMaxHeight, setListMaxHeight] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    const below = belowRef.current;
    const boundary = scrollBoundaryRef.current;
    if (!section || !list || !boundary) return;

    const update = () => {
      const gap = 24;
      const sectionTop = section.getBoundingClientRect().top;
      const boundaryTop = boundary.getBoundingClientRect().top;
      const roomUntilCarousel = boundaryTop - sectionTop - gap;

      if (roomUntilCarousel < 160) {
        setListMaxHeight(null);
        return;
      }

      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const belowHeight = below?.offsetHeight ?? 0;
      const listBudget = roomUntilCarousel - headerHeight - belowHeight - 16;

      if (listBudget < 120 || list.scrollHeight <= listBudget) {
        setListMaxHeight(null);
        return;
      }

      setListMaxHeight(listBudget);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(section);
    observer.observe(list);
    if (below) observer.observe(below);
    observer.observe(boundary);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [popular.length, scrollBoundaryRef]);

  return (
    <div ref={sectionRef} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-1 lg:gap-8">
      <div className="min-w-0">
        <h3
          ref={headerRef}
          className="mb-4 border-b border-[var(--ds-content-card-border,#e5e5e5)] pb-3 font-serif text-lg text-[var(--ds-content-foreground,#0a0a0a)]"
        >
          Most read
        </h3>
        <div
          ref={listRef}
          className={cn(
            "flex flex-col gap-1",
            listMaxHeight !== null &&
              "overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]",
          )}
          style={listMaxHeight !== null ? { maxHeight: `${listMaxHeight}px` } : undefined}
        >
          {popular.map((article) => (
            <ArticleListItem
              key={article._id}
              article={article}
              variant="popular"
            />
          ))}
        </div>
      </div>

      <div ref={belowRef} className="flex flex-col gap-8 md:col-span-2 lg:col-span-1 lg:gap-8">
        <LeagueStandings table={STANDINGS_BY_LEAGUE.nfl} compact />

        <div className="rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-surface,#f5f5f5)] p-4">
          <h3 className="mb-3 font-serif text-lg text-[var(--ds-content-foreground,#0a0a0a)]">
            Browse by sport
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: "NFL", slug: "nfl" },
              { label: "NBA", slug: "nba" },
              { label: "Expert Analysis", slug: "expert-analysis" },
            ].map((item) => (
              <li key={item.slug}>
                <Link
                  href={categoryPath(item.slug)}
                  className="font-medium text-[var(--ds-content-foreground,#0a0a0a)] transition-colors hover:text-[var(--ds-primary,#ee3536)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
