"use client";

import { useRef } from "react";
import { BolShell } from "@/components/layout/bol-shell";
import { HomeSidebarWidgets } from "@/components/home/home-sidebar-widgets";
import { ArticleTile } from "@/components/news/article-tile";
import { BettingResourcesSection } from "@/components/news/betting-resources-section";
import { NewsCarouselSection } from "@/components/news/library/news-carousel-section";
import { PolitelyRawSection } from "@/components/news/politely-raw/politely-raw-section";
import { PromoBannerCarousel } from "@/components/promo/promo-banner-carousel";
import { crossSellBanners } from "@/lib/promo-banners/data";
import type { NewsSettings } from "@/lib/sanity/news-settings";
import type { ArticleCard, HomepageArticles } from "@/lib/sanity/types";

type HomePageContentProps = {
  settings: NewsSettings;
  articles: HomepageArticles;
  politelyRawVideos?: ArticleCard[];
  sanityProject?: { projectId: string; dataset: string };
};

function buildStoryPool(featured: ArticleCard | null, latest: ArticleCard[]) {
  const pool: ArticleCard[] = [];
  const seen = new Set<string>();

  if (featured) {
    pool.push(featured);
    seen.add(featured._id);
  }

  for (const article of latest) {
    if (seen.has(article._id)) continue;
    pool.push(article);
    seen.add(article._id);
  }

  return pool;
}

export function HomePageContent({
  settings,
  articles,
  politelyRawVideos = [],
  sanityProject,
}: HomePageContentProps) {
  const carouselBoundaryRef = useRef<HTMLElement>(null);
  const { featured, latest, popular } = articles;
  const hasArticles = Boolean(featured || latest.length || popular.length);

  const storyPool = buildStoryPool(featured, latest);
  const heroArticle = storyPool[0] ?? null;

  const topGridArticles = storyPool.slice(1, 5);
  const leadStories = storyPool.slice(1, 9);
  const carouselArticles = (popular.length > 0 ? popular : storyPool).slice(0, 8);

  return (
    <BolShell
      showSubNav={settings.showSubNav}
      subNavItems={settings.subNavItems}
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 py-6 md:px-8 md:py-8 lg:px-10">
        {!hasArticles ? (
          <div className="rounded-xl border border-dashed border-[var(--ds-content-card-border,#e5e5e5)] p-10 text-center">
            <h1 className="mb-2 text-lg font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
              No articles published yet
            </h1>
            <p className="text-sm text-[var(--ds-content-muted,#737373)]">
              Create articles in Sanity Studio, set lifecycle status to Keep, and
              publish them to populate the homepage.
            </p>
            {sanityProject ? (
              <p className="mt-4 text-xs text-[var(--ds-content-muted,#737373)]">
                Connected to Sanity project{" "}
                <code className="rounded bg-[var(--ds-content-surface,#f5f5f5)] px-1.5 py-0.5">
                  {sanityProject.projectId}
                </code>{" "}
                / {sanityProject.dataset}. Run{" "}
                <code className="rounded bg-[var(--ds-content-surface,#f5f5f5)] px-1.5 py-0.5">
                  cd studio-bol_news && npm run seed
                </code>{" "}
                to restore demo text (your uploaded images are kept).
              </p>
            ) : null}
          </div>
        ) : (
          <div className="flex flex-col gap-10 md:gap-12">
            {heroArticle ? (
              <section aria-label="Lead story">
                <ArticleTile article={heroArticle} featured />
              </section>
            ) : null}

            <PromoBannerCarousel banners={crossSellBanners} />

            <PolitelyRawSection videos={politelyRawVideos} />

            {topGridArticles.length ? (
              <section aria-label="Top stories">
                <div className="mb-5 flex items-end justify-between gap-4 border-b border-[var(--ds-content-card-border,#e5e5e5)] pb-3">
                  <h2 className="font-serif text-2xl text-[var(--ds-content-foreground,#0a0a0a)] md:text-[2rem] [text-wrap:balance]">
                    Top stories
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {topGridArticles.map((article) => (
                    <ArticleTile key={article._id} article={article} grid />
                  ))}
                </div>
              </section>
            ) : null}

            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
              <main className="min-w-0 flex-1">
                <div className="mb-5 border-b border-[var(--ds-content-card-border,#e5e5e5)] pb-3">
                  <h2 className="font-serif text-2xl text-[var(--ds-content-foreground,#0a0a0a)] md:text-[2rem] [text-wrap:balance]">
                    Latest news
                  </h2>
                </div>

                {leadStories.length ? (
                  <div className="flex flex-col gap-8">
                    {leadStories.map((article) => (
                      <ArticleTile key={article._id} article={article} lead />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--ds-content-muted,#737373)]">
                    No additional stories right now.
                  </p>
                )}
              </main>

              <aside className="min-w-0 lg:w-[17.5rem] lg:shrink-0 lg:self-start">
                <HomeSidebarWidgets
                  popular={popular}
                  scrollBoundaryRef={carouselBoundaryRef}
                />
              </aside>
            </div>

            {carouselArticles.length > 0 ? (
              <NewsCarouselSection
                ref={carouselBoundaryRef}
                kicker="Trending"
                title="More coverage"
                articles={carouselArticles}
                className="my-0"
              />
            ) : null}

            <BettingResourcesSection />
          </div>
        )}
      </div>
    </BolShell>
  );
}
