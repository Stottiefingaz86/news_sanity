"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { leagueIconForSlug } from "@/lib/league-icons";
import {
  SCORE_GROUPS,
  scoreTickerDefaultGroup,
  scoreTickerLockedLeague,
  type ScoreGame,
} from "@/lib/sports-widgets/data";
import { cn } from "@/lib/utils";

function ScoreGameCard({ game }: { game: ScoreGame }) {
  const isUpcoming = game.upcoming;

  return (
    <div
      className={cn(
        "flex min-w-[8.75rem] shrink-0 snap-start flex-col border-r border-[var(--ds-content-card-border,#e5e5e5)] px-3 py-2.5 last:border-r-0 sm:min-w-[7.25rem] sm:py-2",
        isUpcoming && "bg-[var(--ds-content-card-bg,#ffffff)]/60",
      )}
    >
      <p
        className={cn(
          "mb-1.5 text-[11px] font-semibold uppercase tracking-wide sm:text-[10px]",
          isUpcoming
            ? "text-[var(--ds-primary,#ee3536)]"
            : "text-[var(--ds-content-muted,#737373)]",
        )}
      >
        {game.status}
      </p>
      <div className="flex flex-col gap-1.5 sm:gap-1">
        {[game.away, game.home].map((team) => (
          <div key={team.abbr} className="flex items-center justify-between gap-2 text-sm sm:text-xs">
            <span
              className={cn(
                "font-semibold",
                !isUpcoming && team.winner
                  ? "text-[var(--ds-content-foreground,#0a0a0a)]"
                  : "text-[var(--ds-content-muted,#525252)]",
                isUpcoming && "text-[var(--ds-content-foreground,#0a0a0a)]",
              )}
            >
              {team.abbr}
            </span>
            {!isUpcoming && team.score !== undefined ? (
              <span
                className={cn(
                  "min-w-[1.25rem] text-right font-bold tabular-nums",
                  team.winner
                    ? "text-[var(--ds-content-foreground,#0a0a0a)]"
                    : "text-[var(--ds-content-muted,#525252)]",
                )}
              >
                {team.score}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreGamesRail({
  group,
  className,
}: {
  group: (typeof SCORE_GROUPS)[number];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {group.games.map((game) => (
        <ScoreGameCard key={game.id} game={game} />
      ))}

      {group.upcoming.length ? (
        <>
          <div className="flex min-w-[4.5rem] shrink-0 snap-start items-center justify-center border-r border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-surface,#f5f5f5)] px-2 sm:min-w-[5.5rem] sm:px-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ds-content-muted,#737373)] sm:[writing-mode:vertical-rl] sm:rotate-180">
              Coming up
            </span>
          </div>
          {group.upcoming.map((game) => (
            <ScoreGameCard key={game.id} game={game} />
          ))}
        </>
      ) : null}
    </div>
  );
}

type ScoreTickerProps = {
  className?: string;
};

export function ScoreTicker({ className }: ScoreTickerProps) {
  const pathname = usePathname();
  const lockedLeague = scoreTickerLockedLeague(pathname);
  const defaultGroup = scoreTickerDefaultGroup(pathname);
  const [activeGroup, setActiveGroup] = useState(defaultGroup);

  useEffect(() => {
    setActiveGroup(defaultGroup);
  }, [defaultGroup]);

  const group = SCORE_GROUPS.find((item) => item.id === activeGroup) ?? SCORE_GROUPS[0];
  const icon = leagueIconForSlug(group.id);

  const leagueControl = lockedLeague ? (
    <span className="truncate text-xs font-bold uppercase tracking-wide text-[var(--ds-content-foreground,#0a0a0a)] sm:whitespace-nowrap">
      {group.label}
    </span>
  ) : (
    <>
      <label htmlFor="score-league-select" className="sr-only">
        Select sport
      </label>
      <select
        id="score-league-select"
        value={activeGroup}
        onChange={(event) => setActiveGroup(event.target.value)}
        className="max-w-full cursor-pointer truncate appearance-none bg-transparent text-xs font-bold uppercase tracking-wide text-[var(--ds-content-foreground,#0a0a0a)] outline-none sm:max-w-[9rem]"
      >
        {SCORE_GROUPS.map((item) => (
          <option key={item.id} value={item.id}>
            {item.selectLabel ?? item.label}
          </option>
        ))}
      </select>
    </>
  );

  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-surface,#f5f5f5)]",
        className,
      )}
    >
      {/* Mobile: stacked header + full-width scores */}
      <div className="flex flex-col sm:hidden">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            {icon ? (
              <Image
                src={icon}
                alt=""
                width={20}
                height={20}
                className="size-5 shrink-0 object-contain"
              />
            ) : null}
            <div className="min-w-0">{leagueControl}</div>
          </div>
          <Link
            href={group.moreHref}
            className="flex shrink-0 items-center gap-0.5 text-[11px] font-bold uppercase tracking-wide text-[var(--ds-content-foreground,#0a0a0a)] transition-colors hover:text-[var(--ds-primary,#ee3536)]"
          >
            More
            <ChevronRightIcon className="size-3.5" />
          </Link>
        </div>
        <ScoreGamesRail group={group} />
      </div>

      {/* Desktop: single horizontal bar */}
      <div className="hidden items-stretch sm:flex">
        <div className="flex min-w-0 shrink-0 items-center gap-2 border-r border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] px-3 py-2">
          {icon ? (
            <Image src={icon} alt="" width={20} height={20} className="size-5 shrink-0 object-contain" />
          ) : null}
          {leagueControl}
        </div>

        <ScoreGamesRail group={group} className="min-w-0 flex-1" />

        <Link
          href={group.moreHref}
          className="flex shrink-0 items-center gap-1 border-l border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] px-4 text-xs font-bold uppercase tracking-wide text-[var(--ds-content-foreground,#0a0a0a)] transition-colors hover:text-[var(--ds-primary,#ee3536)]"
        >
          Show more
          <ChevronRightIcon className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
