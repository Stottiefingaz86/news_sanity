import Link from "next/link";
import Image from "next/image";
import { leagueIconForSlug } from "@/lib/league-icons";
import type { StandingsTable } from "@/lib/sports-widgets/data";
import { cn } from "@/lib/utils";

type LeagueStandingsProps = {
  table: StandingsTable;
  className?: string;
  compact?: boolean;
};

export function LeagueStandings({ table, className, compact = false }: LeagueStandingsProps) {
  const icon = leagueIconForSlug(table.leagueSlug);

  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--ds-content-card-border,#e5e5e5)] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          {icon ? (
            <Image src={icon} alt="" width={20} height={20} className="size-5 shrink-0 object-contain" />
          ) : null}
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ds-content-muted,#737373)]">
              {table.league}
            </p>
            <h2 className="truncate text-sm font-bold text-[var(--ds-content-foreground,#0a0a0a)]">
              {table.title}
            </h2>
          </div>
        </div>
        <Link
          href={`/category/${table.leagueSlug}`}
          className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-[var(--ds-primary,#ee3536)] hover:underline"
        >
          More
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className={cn("w-full text-left", compact ? "text-[11px]" : "text-xs")}>
          <thead>
            <tr className="border-b border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-surface,#f5f5f5)]">
              {table.headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className={cn(
                    "px-3 py-2 font-bold uppercase tracking-wide text-[var(--ds-content-muted,#737373)]",
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
    </section>
  );
}
