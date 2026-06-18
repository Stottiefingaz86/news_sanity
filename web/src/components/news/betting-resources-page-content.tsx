"use client";

import { BolShell } from "@/components/layout/bol-shell";
import { ArticleBackLink } from "@/components/news/article-breadcrumbs";
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
        <nav aria-label="Page navigation" className="mb-4 flex flex-col gap-3">
          <ArticleBackLink />
          <NewsBreadcrumbs
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
