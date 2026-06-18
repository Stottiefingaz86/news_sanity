"use client";

import { usePathname } from "next/navigation";
import { CompetitionWidget } from "@/components/news/widgets/competition-widget";
import { ScoreTicker } from "@/components/news/widgets/score-ticker";
import {
  getCompetitionBySlug,
  resolveCompetitionSlug,
} from "@/lib/sports-widgets/competitions";
import { scoreTickerDefaultGroup } from "@/lib/sports-widgets/data";
import { cn } from "@/lib/utils";

type SportsCompetitionPanelProps = {
  /** Explicit league/competition slug (from category or article). */
  leagueSlug?: string | null;
  /** Article or page category slugs — used when leagueSlug is not set. */
  categorySlugs?: string[];
  className?: string;
  defaultTab?: "matches" | "table" | "stats";
  /** When true, fall back to the legacy score ticker if no competition mock exists. */
  fallbackToTicker?: boolean;
};

export function SportsCompetitionPanel({
  leagueSlug,
  categorySlugs,
  className,
  defaultTab = "table",
  fallbackToTicker = true,
}: SportsCompetitionPanelProps) {
  const pathname = usePathname();
  const resolved =
    leagueSlug ??
    resolveCompetitionSlug(categorySlugs, pathname) ??
    scoreTickerDefaultGroup(pathname);

  const competition = getCompetitionBySlug(resolved);

  if (competition) {
    return (
      <CompetitionWidget
        competition={competition}
        className={className}
        defaultTab={defaultTab}
      />
    );
  }

  if (fallbackToTicker) {
    return <ScoreTicker className={className} />;
  }

  return null;
}

export function competitionPanelForCategories(
  categorySlugs?: { slug: string }[] | null,
): string | null {
  return resolveCompetitionSlug(categorySlugs?.map((c) => c.slug));
}
