import Link from "next/link";
import Image from "next/image";
import { newsLeagues } from "@/lib/news-nav";
import { cn } from "@/lib/utils";

type LeagueQuickNavProps = {
  className?: string;
};

export function LeagueQuickNav({ className }: LeagueQuickNavProps) {
  return (
    <nav
      aria-label="Leagues"
      className={cn(
        "flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {newsLeagues.map((league) => (
        <Link
          key={league.slug}
          href={league.href}
          className="flex shrink-0 items-center gap-2 rounded-full border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] px-3 py-1.5 text-xs font-semibold text-[var(--ds-content-foreground,#0a0a0a)] transition-colors hover:border-[var(--ds-primary,#ee3536)] hover:text-[var(--ds-primary,#ee3536)]"
        >
          <Image
            src={league.icon}
            alt=""
            width={16}
            height={16}
            className="size-4 object-contain"
          />
          {league.label}
        </Link>
      ))}
    </nav>
  );
}
