"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconClipboardList,
  IconTournament,
} from "@tabler/icons-react";
import type { ContestPromo, ContestPromoIcon } from "@/lib/promo-banners/data";
import {
  CASINO_BANNER_ASPECT_CLASS,
  CASINO_BANNER_SURFACE_CLASS,
} from "@/lib/promo-banners/constants";
import { cn } from "@/lib/utils";

function contestIcon(type: ContestPromoIcon) {
  const className = "size-3.5 shrink-0 text-[var(--ds-content-foreground,#0a0a0a)]";
  if (type === "pickem") return <IconClipboardList className={className} aria-hidden />;
  return <IconTournament className={className} aria-hidden />;
}

function useCountdownLabel(closesAt: string) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const remainingMs = new Date(closesAt).getTime() - Date.now();
      if (remainingMs <= 0) {
        setLabel("CLOSED");
        return;
      }

      const days = Math.floor(remainingMs / 86_400_000);
      const hours = Math.floor((remainingMs % 86_400_000) / 3_600_000);
      setLabel(`${days}D, ${hours}H LEFT`);
    };

    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [closesAt]);

  return label;
}

type PromoContestCardProps = {
  contest: ContestPromo;
  className?: string;
};

export function PromoContestCard({ contest, className }: PromoContestCardProps) {
  const countdown = useCountdownLabel(contest.closesAt);
  const isOpen = countdown !== "CLOSED";
  const isFree = contest.isFree !== false;

  return (
    <article className={cn(CASINO_BANNER_SURFACE_CLASS, CASINO_BANNER_ASPECT_CLASS, className)}>
      <div className="relative size-full">
        <div className="relative z-10 flex size-full min-w-0 flex-col p-3 pr-[38%] sm:p-3.5 sm:pr-[40%]">
          <div className="flex flex-wrap items-center gap-1.5">
            {contestIcon(contest.icon)}
            {isFree ? (
              <span className="inline-flex h-5 items-center rounded-full border border-[#22a06b] px-2 text-[10px] font-bold tracking-wide text-[#22a06b]">
                FREE
              </span>
            ) : null}
            {countdown ? (
              <span
                className={cn(
                  "inline-flex h-5 items-center rounded-full border px-2 text-[10px] font-bold tracking-wide",
                  isOpen
                    ? "border-[#3b82f6] text-[#3b82f6]"
                    : "border-[var(--ds-content-muted,#737373)] text-[var(--ds-content-muted,#737373)]",
                )}
              >
                {isOpen ? `OPEN - ${countdown}` : countdown}
              </span>
            ) : (
              <span className="inline-flex h-5 w-24 animate-pulse rounded-full bg-[var(--ds-content-surface,#f5f5f5)] motion-reduce:animate-none" />
            )}
          </div>

          <h3 className="mt-1 line-clamp-2 text-xs font-bold leading-tight tracking-tight text-[var(--ds-content-foreground,#0a0a0a)] uppercase [text-wrap:balance] sm:text-sm">
            {contest.headline}
          </h3>

          <div className="mt-auto flex items-stretch gap-1.5 pt-1.5">
            <Link
              href={contest.rulesHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 shrink-0 items-center justify-center rounded-md border border-[var(--ds-content-foreground,#0a0a0a)] bg-[var(--ds-content-card-bg,#ffffff)] px-2.5 text-[10px] font-bold tracking-wide text-[var(--ds-content-foreground,#0a0a0a)] uppercase transition-colors hover:bg-[var(--ds-content-surface,#f5f5f5)]"
            >
              Rules
            </Link>
            <Link
              href={contest.entryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 min-w-0 flex-1 items-center justify-center rounded-md bg-[var(--ds-primary,#ee3536)] px-2.5 text-[10px] font-bold tracking-wide text-white uppercase transition-colors hover:bg-[var(--ds-primary-hover,#dc2a2f)]"
            >
              Free entry
            </Link>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-[40%]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={contest.image}
            alt=""
            className="absolute right-0 bottom-0 h-[108%] max-w-none object-contain object-right-bottom"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}
