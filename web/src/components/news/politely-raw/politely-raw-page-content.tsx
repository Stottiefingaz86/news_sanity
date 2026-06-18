"use client";

import Link from "next/link";
import { BolShell } from "@/components/layout/bol-shell";
import { NewsBreadcrumbs } from "@/components/news/library/news-breadcrumbs";
import { PolitelyRawVideoGrid } from "@/components/news/politely-raw/politely-raw-video-grid";
import { POLITELY_RAW_PATH } from "@/lib/politely-raw";
import type { NewsSettings } from "@/lib/sanity/news-settings";
import type { PolitelyRawPageData } from "@/lib/sanity/types";

type PolitelyRawPageContentProps = {
  page: PolitelyRawPageData;
  settings: NewsSettings;
};

export function PolitelyRawPageContent({ page, settings }: PolitelyRawPageContentProps) {
  return (
    <BolShell showSubNav={settings.showSubNav} subNavItems={settings.subNavItems}>
      <div className="mx-auto w-full max-w-[1240px] px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <nav aria-label="Page navigation" className="mb-4">
          <NewsBreadcrumbs
            showBackArrow
            items={[
              { label: "In the News", href: "/" },
              { label: page.title },
            ]}
          />
        </nav>

        <header className="mb-8 border-b border-[var(--ds-content-card-border,#e5e5e5)] pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ds-primary,#ee3536)]">
            Podcast
          </p>
          <h1 className="mt-2 font-serif text-3xl text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:balance] md:text-4xl">
            {page.title}
          </h1>
          {page.description ? (
            <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--ds-content-muted,#525252)] [text-wrap:pretty]">
              {page.description}
            </p>
          ) : (
            <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--ds-content-muted,#525252)] [text-wrap:pretty]">
              Watch the latest episodes of Politely RAW — unfiltered sports talk hosted by
              Pacman Jones, with guests from across the league.
            </p>
          )}
        </header>

        {page.videos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[var(--ds-content-card-border,#e5e5e5)] p-10 text-center">
            <p className="text-sm text-[var(--ds-content-muted,#737373)]">
              No episodes published yet. Add articles in Sanity with the{" "}
              <Link
                href={POLITELY_RAW_PATH}
                className="font-medium text-[var(--ds-primary,#ee3536)]"
              >
                Politely RAW
              </Link>{" "}
              category, set layout to Media / Show, and paste your Rumble URL in Hero media URL.
            </p>
          </div>
        ) : (
          <PolitelyRawVideoGrid videos={page.videos} title="Latest episodes" />
        )}
      </div>
    </BolShell>
  );
}
