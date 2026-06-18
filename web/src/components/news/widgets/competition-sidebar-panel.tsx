"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "lucide-react";
import {
  type CompetitionMatch,
  type StatLeaderCategory,
  getCompetitionBySlug,
  teamFlagEmoji,
} from "@/lib/sports-widgets/competitions";
import { leagueIconForSlug } from "@/lib/league-icons";
import { cn } from "@/lib/utils";

function CompactMatchRow({ match }: { match: CompetitionMatch }) {
  const isUpcoming = match.status === "UPCOMING";

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-[var(--ds-content-card-border,#e5e5e5)] px-3 py-2.5 last:border-b-0">
      <span className="truncate text-right text-xs font-bold text-[var(--ds-content-foreground,#0a0a0a)]">
        {match.home.code}
      </span>
      <div className="min-w-[3.25rem] text-center">
        <p className="text-[10px] font-semibold uppercase text-[var(--ds-content-muted,#737373)]">
          {match.statusLabel}
        </p>
        {!isUpcoming ? (
          <p className="text-xs font-bold tabular-nums">
            {match.home.score ?? 0}–{match.away.score ?? 0}
          </p>
        ) : (
          <p className="text-[10px] text-[var(--ds-content-muted,#737373)]">vs</p>
        )}
      </div>
      <span className="truncate text-left text-xs font-bold text-[var(--ds-content-foreground,#0a0a0a)]">
        {match.away.code}
      </span>
    </div>
  );
}

function SidebarStatLeaders({ categories }: { categories: StatLeaderCategory[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "goals");
  const active = categories.find((cat) => cat.id === activeId) ?? categories[0];
  if (!active) return null;

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1 px-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveId(cat.id)}
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors",
              activeId === cat.id
                ? "bg-[var(--ds-content-emphasis-bg,#2d2d2d)] text-white"
                : "bg-[var(--ds-content-surface,#f5f5f5)] text-[var(--ds-content-muted,#737373)]",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <ol className="divide-y divide-[var(--ds-content-card-border,#e5e5e5)]">
        {active.leaders.slice(0, 5).map((leader) => (
          <li
            key={`${leader.player}-${leader.rank}`}
            className="flex items-center gap-2.5 px-3 py-2"
          >
            <span className="w-3 shrink-0 text-center text-[11px] font-bold tabular-nums text-[var(--ds-content-muted,#737373)]">
              {leader.rank}
            </span>
            <div
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--ds-content-surface,#f5f5f5)] text-[10px] font-bold text-[var(--ds-content-muted,#737373)]"
              aria-hidden
            >
              {leader.player
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
                {leader.player}
              </p>
              <p className="flex items-center gap-1 truncate text-[10px] text-[var(--ds-content-muted,#737373)]">
                <span aria-hidden>{teamFlagEmoji(leader.team.code)}</span>
                {leader.team.name}
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold tabular-nums">
              {leader.value}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

type CompetitionSidebarPanelProps = {
  leagueSlug: string;
  className?: string;
};

export function CompetitionSidebarPanel({
  leagueSlug,
  className,
}: CompetitionSidebarPanelProps) {
  const competition = getCompetitionBySlug(leagueSlug);
  const [activeTab, setActiveTab] = useState<"stats" | "matches">("stats");

  if (!competition) return null;

  const icon = leagueIconForSlug(competition.iconSlug);
  const hasStats = Boolean(competition.statLeaders?.length);
  const hasMatches = Boolean(competition.matches?.length);
  const upcoming = competition.matches?.filter((m) => m.status === "UPCOMING").slice(0, 4);
  const recent = competition.matches?.filter((m) => m.status !== "UPCOMING").slice(0, 3);

  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)]",
        className,
      )}
      aria-label={`${competition.title} quick view`}
    >
      <header className="border-b border-[var(--ds-content-card-border,#e5e5e5)] px-4 py-3">
        <div className="flex items-center gap-2">
          {icon ? (
            <Image src={icon} alt="" width={22} height={22} className="size-[22px] shrink-0" />
          ) : null}
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-bold text-[var(--ds-content-foreground,#0a0a0a)]">
              {competition.title}
            </h2>
            <p className="text-[10px] text-[var(--ds-content-muted,#737373)]">
              Season {competition.seasonLabel}
            </p>
          </div>
        </div>
        {(hasStats || hasMatches) && (
          <div className="mt-2 flex gap-1">
            {hasStats ? (
              <button
                type="button"
                onClick={() => setActiveTab("stats")}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-semibold transition-colors",
                  activeTab === "stats"
                    ? "bg-[var(--ds-content-emphasis-bg,#2d2d2d)] text-white"
                    : "text-[var(--ds-content-muted,#737373)] hover:bg-[var(--ds-content-surface,#f5f5f5)]",
                )}
              >
                Stat leaders
              </button>
            ) : null}
            {hasMatches ? (
              <button
                type="button"
                onClick={() => setActiveTab("matches")}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-semibold transition-colors",
                  activeTab === "matches"
                    ? "bg-[var(--ds-content-emphasis-bg,#2d2d2d)] text-white"
                    : "text-[var(--ds-content-muted,#737373)] hover:bg-[var(--ds-content-surface,#f5f5f5)]",
                )}
              >
                Matches
              </button>
            ) : null}
          </div>
        )}
      </header>

      <div className="py-1">
        {activeTab === "stats" && hasStats && competition.statLeaders ? (
          <SidebarStatLeaders categories={competition.statLeaders} />
        ) : null}
        {activeTab === "matches" && hasMatches ? (
          <div>
            {recent?.map((match) => (
              <CompactMatchRow key={match.id} match={match} />
            ))}
            {upcoming?.length ? (
              <>
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ds-content-muted,#737373)]">
                  Coming up
                </p>
                {upcoming.map((match) => (
                  <CompactMatchRow key={match.id} match={match} />
                ))}
              </>
            ) : null}
          </div>
        ) : null}
      </div>

      <footer className="border-t border-[var(--ds-content-card-border,#e5e5e5)] px-4 py-2.5">
        <Link
          href={competition.moreHref}
          className="flex items-center gap-0.5 text-[11px] font-bold uppercase tracking-wide text-[var(--ds-primary,#ee3536)] hover:underline"
        >
          Full standings
          <ChevronRightIcon className="size-3.5" />
        </Link>
      </footer>
    </section>
  );
}
