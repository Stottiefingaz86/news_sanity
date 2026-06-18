"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "lucide-react";
import { CompetitionFormDots } from "@/components/news/widgets/competition-form-dots";
import {
  type CompetitionData,
  type CompetitionMatch,
  type CompetitionTab,
  type GroupStandingRow,
  type StatLeaderCategory,
  teamFlagEmoji,
} from "@/lib/sports-widgets/competitions";
import { leagueIconForSlug } from "@/lib/league-icons";
import { cn } from "@/lib/utils";

const TAB_LABELS: Record<CompetitionTab, string> = {
  matches: "Matches",
  table: "Table",
  stats: "Stats",
};

function TeamBadge({
  team,
  showName = false,
  align = "left",
}: {
  team: { code: string; name: string };
  showName?: boolean;
  align?: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-2",
        align === "right" && "flex-row-reverse text-right",
      )}
    >
      <span className="text-lg leading-none" aria-hidden>
        {teamFlagEmoji(team.code)}
      </span>
      <div className={cn("min-w-0", align === "right" && "text-right")}>
        <span className="block truncate text-sm font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
          {showName ? team.name : team.code}
        </span>
      </div>
    </div>
  );
}

function MatchRow({ match }: { match: CompetitionMatch }) {
  const isLive = match.status === "LIVE";
  const isUpcoming = match.status === "UPCOMING";

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-[var(--ds-content-card-border,#e5e5e5)] px-4 py-3 last:border-b-0">
      <TeamBadge team={match.home} align="right" showName />
      <div className="flex min-w-[4.5rem] flex-col items-center gap-0.5 text-center">
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-wide",
            isLive
              ? "text-[var(--ds-primary,#ee3536)]"
              : "text-[var(--ds-content-muted,#737373)]",
          )}
        >
          {match.statusLabel}
        </span>
        {!isUpcoming ? (
          <span className="text-base font-bold tabular-nums text-[var(--ds-content-foreground,#0a0a0a)]">
            {match.home.score ?? 0} – {match.away.score ?? 0}
          </span>
        ) : (
          <span className="text-xs font-semibold text-[var(--ds-content-muted,#737373)]">vs</span>
        )}
        {match.stage ? (
          <span className="text-[10px] text-[var(--ds-content-muted,#737373)]">{match.stage}</span>
        ) : null}
      </div>
      <TeamBadge team={match.away} showName />
    </div>
  );
}

function GroupStandingsTable({
  groupName,
  rows,
}: {
  groupName: string;
  rows: GroupStandingRow[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="mb-2 px-1 text-sm font-bold text-[var(--ds-content-foreground,#0a0a0a)]">
        {groupName}
      </h3>
      <div className="overflow-x-auto rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)]">
        <table className="w-full min-w-[28rem] text-left text-xs">
          <thead>
            <tr className="border-b border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-surface,#f5f5f5)] text-[var(--ds-content-muted,#737373)]">
              <th scope="col" className="w-8 px-2 py-2 text-center font-semibold">
                #
              </th>
              <th scope="col" className="px-2 py-2 font-semibold">
                Team
              </th>
              <th scope="col" className="px-1.5 py-2 text-center font-semibold">
                MP
              </th>
              <th scope="col" className="px-1.5 py-2 text-center font-semibold">
                W
              </th>
              <th scope="col" className="px-1.5 py-2 text-center font-semibold">
                D
              </th>
              <th scope="col" className="px-1.5 py-2 text-center font-semibold">
                L
              </th>
              <th scope="col" className="px-1.5 py-2 text-center font-semibold">
                GF
              </th>
              <th scope="col" className="px-1.5 py-2 text-center font-semibold">
                GA
              </th>
              <th scope="col" className="px-1.5 py-2 text-center font-semibold">
                GD
              </th>
              <th scope="col" className="px-1.5 py-2 text-center font-semibold">
                Pts
              </th>
              <th scope="col" className="min-w-[4.5rem] px-2 py-2 text-right font-semibold">
                Last 5
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.team.code}
                className="border-b border-[var(--ds-content-card-border,#e5e5e5)] last:border-b-0"
              >
                <td className="px-2 py-2 text-center tabular-nums text-[var(--ds-content-muted,#737373)]">
                  {row.rank}
                </td>
                <td className="px-2 py-2">
                  <div className="flex items-center gap-2">
                    <span aria-hidden>{teamFlagEmoji(row.team.code)}</span>
                    <span className="font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
                      {row.team.name}
                    </span>
                  </div>
                </td>
                <td className="px-1.5 py-2 text-center tabular-nums">{row.mp}</td>
                <td className="px-1.5 py-2 text-center tabular-nums">{row.w}</td>
                <td className="px-1.5 py-2 text-center tabular-nums">{row.d}</td>
                <td className="px-1.5 py-2 text-center tabular-nums">{row.l}</td>
                <td className="px-1.5 py-2 text-center tabular-nums">{row.gf}</td>
                <td className="px-1.5 py-2 text-center tabular-nums">{row.ga}</td>
                <td className="px-1.5 py-2 text-center tabular-nums">{row.gd}</td>
                <td className="px-1.5 py-2 text-center font-bold tabular-nums">{row.pts}</td>
                <td className="px-2 py-2">
                  <CompetitionFormDots form={row.form} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LeagueStandingsPanel({
  table,
}: {
  table: NonNullable<CompetitionData["leagueStandings"]>;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)]">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-surface,#f5f5f5)]">
            {table.headers.map((header) => (
              <th
                key={header}
                scope="col"
                className={cn(
                  "px-3 py-2 font-semibold uppercase tracking-wide text-[var(--ds-content-muted,#737373)]",
                  header === "Team" ? "text-left" : "text-center",
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr
              key={row.team}
              className="border-b border-[var(--ds-content-card-border,#e5e5e5)] last:border-b-0"
            >
              <td className="px-3 py-2 font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
                {row.team}
              </td>
              <td className="px-3 py-2 text-center tabular-nums">{row.w}</td>
              <td className="px-3 py-2 text-center tabular-nums">{row.l}</td>
              <td className="px-3 py-2 text-center tabular-nums">{row.pct}</td>
              <td className="px-3 py-2 text-center tabular-nums">{row.gb}</td>
              <td className="px-3 py-2 text-center tabular-nums">{row.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatLeadersPanel({ categories }: { categories: StatLeaderCategory[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "goals");
  const active = categories.find((cat) => cat.id === activeId) ?? categories[0];

  if (!active) return null;

  return (
    <aside className="flex flex-col">
      <h3 className="mb-3 text-sm font-bold text-[var(--ds-content-foreground,#0a0a0a)]">
        Stat leaders
      </h3>
      <div
        role="tablist"
        aria-label="Stat categories"
        className="mb-3 flex flex-wrap gap-1"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={activeId === cat.id}
            onClick={() => setActiveId(cat.id)}
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-semibold transition-colors",
              activeId === cat.id
                ? "bg-[var(--ds-content-emphasis-bg,#2d2d2d)] text-[var(--ds-content-emphasis-fg,#ffffff)]"
                : "bg-[var(--ds-content-surface,#f5f5f5)] text-[var(--ds-content-muted,#737373)] hover:text-[var(--ds-content-foreground,#0a0a0a)]",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <ol className="flex flex-col gap-0 divide-y divide-[var(--ds-content-card-border,#e5e5e5)] rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)]">
        {active.leaders.map((leader) => (
          <li
            key={`${leader.player}-${leader.rank}`}
            className="flex items-center gap-3 px-3 py-2.5"
          >
            <span className="w-4 shrink-0 text-center text-xs font-bold tabular-nums text-[var(--ds-content-muted,#737373)]">
              {leader.rank}
            </span>
            <div
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--ds-content-surface,#f5f5f5)] text-xs font-bold text-[var(--ds-content-muted,#737373)]"
              aria-hidden
            >
              {leader.player
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
                {leader.player}
              </p>
              <p className="flex items-center gap-1 truncate text-[11px] text-[var(--ds-content-muted,#737373)]">
                <span aria-hidden>{teamFlagEmoji(leader.team.code)}</span>
                {leader.team.name}
              </p>
            </div>
            <span className="shrink-0 text-sm font-bold tabular-nums text-[var(--ds-content-foreground,#0a0a0a)]">
              {leader.value}
            </span>
          </li>
        ))}
      </ol>
    </aside>
  );
}

type CompetitionWidgetProps = {
  competition: CompetitionData;
  className?: string;
  defaultTab?: CompetitionTab;
};

export function CompetitionWidget({
  competition,
  className,
  defaultTab = "table",
}: CompetitionWidgetProps) {
  const [activeTab, setActiveTab] = useState<CompetitionTab>(
    competition.tabs.includes(defaultTab) ? defaultTab : competition.tabs[0],
  );
  const icon = leagueIconForSlug(competition.iconSlug);
  const hasGroups = Boolean(competition.groups?.length);
  const hasStatSidebar =
    activeTab === "table" && Boolean(competition.statLeaders?.length);

  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)]",
        className,
      )}
      aria-label={`${competition.title} scores and standings`}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ds-content-card-border,#e5e5e5)] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          {icon ? (
            <Image
              src={icon}
              alt=""
              width={28}
              height={28}
              className="size-7 shrink-0 object-contain"
            />
          ) : null}
          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:balance]">
              {competition.title}
            </h2>
            <p className="text-xs text-[var(--ds-content-muted,#737373)]">
              Season {competition.seasonLabel}
              <span className="mx-1.5 text-[var(--ds-content-card-border,#e5e5e5)]">·</span>
              Mock data — live feed coming soon
            </p>
          </div>
        </div>
        <Link
          href={competition.moreHref}
          className="flex shrink-0 items-center gap-0.5 text-xs font-bold uppercase tracking-wide text-[var(--ds-primary,#ee3536)] hover:underline"
        >
          More coverage
          <ChevronRightIcon className="size-3.5" />
        </Link>
      </header>

      <div
        role="tablist"
        aria-label="Competition views"
        className="flex gap-1 overflow-x-auto border-b border-[var(--ds-content-card-border,#e5e5e5)] px-4 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {competition.tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
              activeTab === tab
                ? "bg-[var(--ds-content-emphasis-bg,#2d2d2d)] text-[var(--ds-content-emphasis-fg,#ffffff)]"
                : "text-[var(--ds-content-muted,#737373)] hover:bg-[var(--ds-content-surface,#f5f5f5)] hover:text-[var(--ds-content-foreground,#0a0a0a)]",
            )}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === "matches" && competition.matches?.length ? (
          <div
            role="tabpanel"
            className="overflow-hidden rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)]"
          >
            {competition.matches.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </div>
        ) : null}

        {activeTab === "table" ? (
          <div
            role="tabpanel"
            className={cn(
              "grid gap-6",
              hasStatSidebar ? "lg:grid-cols-[1fr_16rem]" : "",
            )}
          >
            <div className="min-w-0 space-y-6">
              {hasGroups
                ? competition.groups!.map((group) => (
                    <GroupStandingsTable
                      key={group.id}
                      groupName={group.name}
                      rows={group.rows}
                    />
                  ))
                : null}
              {competition.leagueStandings ? (
                <div>
                  <h3 className="mb-2 text-sm font-bold text-[var(--ds-content-foreground,#0a0a0a)]">
                    {competition.leagueStandings.title}
                  </h3>
                  <LeagueStandingsPanel table={competition.leagueStandings} />
                </div>
              ) : null}
            </div>
            {hasStatSidebar && competition.statLeaders ? (
              <StatLeadersPanel categories={competition.statLeaders} />
            ) : null}
          </div>
        ) : null}

        {activeTab === "stats" && competition.statLeaders?.length ? (
          <div role="tabpanel" className="max-w-md">
            <StatLeadersPanel categories={competition.statLeaders} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
