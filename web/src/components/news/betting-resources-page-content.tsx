"use client";

import { BolShell } from "@/components/layout/bol-shell";
import { BettingResourcesSection } from "@/components/news/betting-resources-section";
import { NewsBreadcrumbs } from "@/components/news/library/news-breadcrumbs";
import type { NewsSettings } from "@/lib/sanity/news-settings";

type BettingResourcesPageContentProps = {
  settings: NewsSettings;
};

export function BettingResourcesPageContent({
  settings,
}: BettingResourcesPageContentProps) {
  return (
    <BolShell
      showSubNav={settings.showSubNav}
      subNavItems={settings.subNavItems}
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 py-8 md:px-8 lg:px-10">
        <nav aria-label="Page navigation" className="mb-4">
          <NewsBreadcrumbs
            showBackArrow
            items={[
              { label: "In the News", href: "/" },
              { label: "Betting Resources" },
            ]}
          />
        </nav>

        <BettingResourcesSection showViewAll={false} className="border-t-0 pt-0" />
      </div>
    </BolShell>
  );
}
