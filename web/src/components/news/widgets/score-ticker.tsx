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
        "flex min-w-[7.25rem] shrink-0 flex-col border-r border-[var(--ds-content-card-border,#e5e5e5)] px-3 py-2 last:border-r-0",
        isUpcoming && "bg-[var(--ds-content-card-bg,#ffffff)]/60",
      )}
    >
      <p
        className={cn(
          "mb-1.5 text-[10px] font-semibold uppercase tracking-wide",
          isUpcoming
            ? "text-[var(--ds-primary,#ee3536)]"
            : "text-[var(--ds-content-muted,#737373)]",
        )}
      >
        {game.status}
      </p>
      <div className="flex flex-col gap-1">
        {[game.away, game.home].map((team) => (
          <div key={team.abbr} className="flex items-center justify-between gap-3 text-xs">
            <span
              className={cn(
                "font-semibold",
                !isUpcoming && team.winner
                  ? "text-[var(--ds-content-foreground,#0a0a0a)]"
                  : "text-[var(--ds-content-muted,#737373)]",
                isUpcoming && "text-[var(--ds-content-foreground,#0a0a0a)]",
              )}
            >
              {team.abbr}
            </span>
            {!isUpcoming && team.score !== undefined ? (
              <span
                className={cn(
                  "font-bold tabular-nums",
                  team.winner
                    ? "text-[var(--ds-content-foreground,#0a0a0a)]"
                    : "text-[var(--ds-content-muted,#737373)]",
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

  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-surface,#f5f5f5)]",
        className,
      )}
    >
      <div className="flex items-stretch">
        <div className="flex min-w-0 shrink-0 items-center gap-2 border-r border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] px-3 py-2">
          {icon ? (
            <Image src={icon} alt="" width={20} height={20} className="size-5 shrink-0 object-contain" />
          ) : null}
          {lockedLeague ? (
            <span className="text-xs font-bold uppercase tracking-wide text-[var(--ds-content-foreground,#0a0a0a)]">
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
                className="max-w-[9rem] cursor-pointer appearance-none bg-transparent text-xs font-bold uppercase tracking-wide text-[var(--ds-content-foreground,#0a0a0a)] outline-none"
              >
                {SCORE_GROUPS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.selectLabel ?? item.label}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        <div className="flex min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {group.games.map((game) => (
            <ScoreGameCard key={game.id} game={game} />
          ))}

          {group.upcoming.length ? (
            <>
              <div className="flex min-w-[5.5rem] shrink-0 items-center border-r border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-surface,#f5f5f5)] px-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ds-content-muted,#737373)] [writing-mode:vertical-rl] rotate-180">
                  Coming up
                </span>
              </div>
              {group.upcoming.map((game) => (
                <ScoreGameCard key={game.id} game={game} />
              ))}
            </>
          ) : null}
        </div>

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
