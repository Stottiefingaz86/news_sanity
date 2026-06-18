"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BolShell } from "@/components/layout/bol-shell";
import { CategoryPageNav } from "@/components/news/article-breadcrumbs";
import { CategoryArticleFeed } from "@/components/news/category-article-feed";
import {
  CategoryArticleSidebar,
  sortArticlesByDate,
} from "@/components/news/category-article-sidebar";
import { SportsCompetitionPanel } from "@/components/news/widgets/sports-competition-panel";
import { PromoBannerCarousel } from "@/components/promo/promo-banner-carousel";
import { crossSellBanners } from "@/lib/promo-banners/data";
import {
  TopicFeaturedCarousel,
  pickCarouselArticles,
} from "@/components/news/topic-featured-carousel";
import { leagueIconForSlug } from "@/lib/league-icons";
import { newsLeagues, newsSectionNavItems } from "@/lib/news-nav";
import type { NewsSettings } from "@/lib/sanity/news-settings";
import type { ArticleCard, CategoryPageFullData } from "@/lib/sanity/types";

type TopicCategoryLandingProps = {
  category: CategoryPageFullData;
  settings: NewsSettings;
};

function topicIconForSlug(slug: string) {
  const navItem = newsSectionNavItems.find((item) => item.slug === slug);
  if (navItem?.icon) return navItem.icon;
  return leagueIconForSlug(slug);
}

function showCompetitionForCategory(slug: string) {
  if (slug === "world-cup") return true;
  return newsLeagues.some((league) => league.slug === slug);
}

const DESKTOP_CAROUSEL_SYNC_QUERY = "(min-width: 1024px)";

export function TopicCategoryLanding({ category, settings }: TopicCategoryLandingProps) {
  const topicIcon = topicIconForSlug(category.slug);
  const showCompetition = showCompetitionForCategory(category.slug);
  const carouselArticles = pickCarouselArticles(category.featuredArticles, 5);
  const sidebarArticles = useMemo(
    () => sortArticlesByDate(category.featuredArticles),
    [category.featuredArticles],
  );
  const hasHeroContent = category.featuredArticles.length > 0;

  const [activeArticleId, setActiveArticleId] = useState<string | null>(
    carouselArticles[0]?._id ?? sidebarArticles[0]?._id ?? null,
  );
  const [scrollToCarouselIndex, setScrollToCarouselIndex] = useState<number | null>(
    null,
  );

  const carouselIndexById = useMemo(
    () => new Map(carouselArticles.map((article, index) => [article._id, index])),
    [carouselArticles],
  );

  const handleCarouselActiveChange = useCallback((_index: number, article: ArticleCard) => {
    setActiveArticleId(article._id);
  }, []);

  const handleSidebarSelect = useCallback(
    (article: ArticleCard): boolean => {
      const isDesktopLayout = window.matchMedia(DESKTOP_CAROUSEL_SYNC_QUERY).matches;
      const carouselIndex = carouselIndexById.get(article._id);
      if (isDesktopLayout && carouselIndex !== undefined) {
        setActiveArticleId(article._id);
        setScrollToCarouselIndex(carouselIndex);
        return true;
      }
      return false;
    },
    [carouselIndexById],
  );

  useEffect(() => {
    if (scrollToCarouselIndex === null) return;
    const timer = window.setTimeout(() => setScrollToCarouselIndex(null), 150);
    return () => window.clearTimeout(timer);
  }, [scrollToCarouselIndex]);

  return (
    <BolShell
      showSubNav={settings.showSubNav}
      subNavItems={settings.subNavItems}
      activeSectionSlug={category.slug}
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <CategoryPageNav title={category.title} />

        {category.articlesPage.total === 0 && !hasHeroContent ? (
          <p className="mt-10 text-sm text-[var(--ds-content-muted,#525252)]">
            No articles in this category yet.
          </p>
        ) : (
          <div className="mt-6 flex flex-col gap-10 md:gap-12">
            <header className="flex items-start gap-4">
              {topicIcon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={topicIcon}
                  alt=""
                  className="size-12 shrink-0 object-contain"
                />
              ) : null}
              <div className="min-w-0">
                <h1 className="font-serif text-3xl text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:balance] md:text-[2.75rem] md:leading-[1.08]">
                  {category.title}
                </h1>
                {category.description ? (
                  <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--ds-content-muted,#525252)] [text-wrap:pretty]">
                    {category.description}
                  </p>
                ) : null}
              </div>
            </header>

            {hasHeroContent ? (
              <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
                <div className="min-w-0">
                  <TopicFeaturedCarousel
                    articles={carouselArticles}
                    onActiveChange={handleCarouselActiveChange}
                    scrollToIndex={scrollToCarouselIndex}
                  />
                </div>

                <CategoryArticleSidebar
                  articles={sidebarArticles}
                  activeArticleId={activeArticleId}
                  onArticleSelect={handleSidebarSelect}
                  title={category.title}
                  className="min-h-[20rem] sm:min-h-[22rem] md:min-h-[24rem] lg:min-h-0"
                />
              </div>
            ) : null}

            <PromoBannerCarousel banners={crossSellBanners} />

            {showCompetition ? (
              <SportsCompetitionPanel
                leagueSlug={category.slug}
                defaultTab="table"
              />
            ) : null}

            <CategoryArticleFeed
              slug={category.slug}
              title={category.title}
              articlesPage={category.articlesPage}
            />
          </div>
        )}
      </div>
    </BolShell>
  );
}

/** @deprecated Use TopicCategoryLanding */
export const EditorialCategoryLanding = TopicCategoryLanding;
