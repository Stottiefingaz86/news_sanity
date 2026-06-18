"use client";

import { BolShell } from "@/components/layout/bol-shell";
import { ArticleListItem, ArticleTile } from "@/components/news/article-tile";
import { CategoryPageNav } from "@/components/news/article-breadcrumbs";
import { BettingResourcesSection } from "@/components/news/betting-resources-section";
import { LeagueStandings } from "@/components/news/widgets/league-standings";
import { leagueIconForSlug } from "@/lib/league-icons";
import type { NewsSettings } from "@/lib/sanity/news-settings";
import { standingsForLeague } from "@/lib/sports-widgets/data";
import type { CategoryPageData } from "@/lib/sanity/types";
import Image from "next/image";

type CategoryPageContentProps = {
  category: CategoryPageData;
  settings: NewsSettings;
};

export function CategoryPageContent({ category, settings }: CategoryPageContentProps) {
  const [, ...rest] = category.articles;
  const leagueIcon = leagueIconForSlug(category.slug);
  const standings = standingsForLeague(category.slug);
  const topGrid = category.articles.slice(0, 4);
  const leadStories = category.articles.slice(0, 3);

  return (
    <BolShell
      showSubNav={settings.showSubNav}
      subNavItems={settings.subNavItems}
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <CategoryPageNav title={category.title} />

        <div className="mb-8 mt-6 flex items-start gap-3 border-b border-[var(--ds-content-card-border,#e5e5e5)] pb-6">
          {leagueIcon ? (
            <Image
              src={leagueIcon}
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 object-contain"
            />
          ) : null}
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.14em] text-[var(--ds-content-muted,#737373)]">
              CATEGORY
            </p>
            <h1 className="font-serif text-3xl text-[var(--ds-content-foreground,#0a0a0a)] md:text-4xl">
              {category.title}
            </h1>
            {category.description ? (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ds-content-muted,#737373)]">
                {category.description}
              </p>
            ) : null}
          </div>
        </div>

        {category.articles.length === 0 ? (
          <p className="text-sm text-[var(--ds-content-muted,#737373)]">
            No articles in this category yet.
          </p>
        ) : (
          <div className="flex flex-col gap-10">
            {topGrid.length ? (
              <section aria-label={`Top ${category.title} stories`}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {topGrid.map((article) => (
                    <ArticleTile key={article._id} article={article} grid />
                  ))}
                </div>
              </section>
            ) : null}

            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:gap-12">
              <main className="min-w-0">
                <div className="mb-6 border-b border-[var(--ds-content-card-border,#e5e5e5)] pb-3">
                  <h2 className="text-sm font-bold tracking-[0.14em] text-[var(--ds-content-foreground,#0a0a0a)]">
                    LATEST IN {category.title.toUpperCase()}
                  </h2>
                </div>

                <div className="flex flex-col gap-8">
                  {(leadStories.length ? leadStories : category.articles).map((article) => (
                    <ArticleTile key={article._id} article={article} lead />
                  ))}
                </div>

                {rest.length > 3 ? (
                  <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {rest.slice(3).map((article) => (
                      <ArticleTile key={article._id} article={article} />
                    ))}
                  </div>
                ) : null}
              </main>

              <aside className="min-w-0 space-y-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain">
                {standings ? <LeagueStandings table={standings} compact /> : null}

                <div>
                  <p className="mb-4 text-xs font-bold tracking-[0.12em] text-[var(--ds-content-foreground,#0a0a0a)]">
                    MORE IN {category.title.toUpperCase()}
                  </p>
                  <div className="flex flex-col gap-1">
                    {category.articles.slice(0, 5).map((article) => (
                      <ArticleListItem
                        key={article._id}
                        article={article}
                        variant="popular"
                      />
                    ))}
                  </div>
                </div>
              </aside>
            </div>

            <BettingResourcesSection />
          </div>
        )}
      </div>
    </BolShell>
  );
}
