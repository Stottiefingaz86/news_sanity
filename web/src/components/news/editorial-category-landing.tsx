"use client";

import { BolShell } from "@/components/layout/bol-shell";
import { CategoryPageNav } from "@/components/news/article-breadcrumbs";
import { ScoreTicker } from "@/components/news/widgets/score-ticker";
import { TopicLandingHero } from "@/components/news/topic-landing-hero";
import { ArticleCardHorizontal } from "@/components/news/library/news-card-variants";
import { leagueIconForSlug } from "@/lib/league-icons";
import { newsLeagues, newsSectionNavItems } from "@/lib/news-nav";
import type { NewsSettings } from "@/lib/sanity/news-settings";
import type { ArticleCard, CategoryPageData } from "@/lib/sanity/types";

type TopicCategoryLandingProps = {
  category: CategoryPageData;
  settings: NewsSettings;
};

function pickFeaturedArticle(articles: ArticleCard[]) {
  return articles.find((article) => article.featured) ?? articles[0] ?? null;
}

function topicIconForSlug(slug: string) {
  const navItem = newsSectionNavItems.find((item) => item.slug === slug);
  if (navItem?.icon) return navItem.icon;
  return leagueIconForSlug(slug);
}

function showScoreTickerForCategory(slug: string) {
  if (slug === "world-cup") return true;
  return newsLeagues.some((league) => league.slug === slug);
}

export function TopicCategoryLanding({ category, settings }: TopicCategoryLandingProps) {
  const featured = pickFeaturedArticle(category.articles);
  const rest = featured
    ? category.articles.filter((article) => article._id !== featured._id)
    : category.articles;
  const topicIcon = topicIconForSlug(category.slug);
  const showScoreTicker = showScoreTickerForCategory(category.slug);

  return (
    <BolShell
      showSubNav={settings.showSubNav}
      subNavItems={settings.subNavItems}
      activeSectionSlug={category.slug}
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <CategoryPageNav title={category.title} />

        {category.articles.length === 0 ? (
          <p className="mt-10 text-sm text-[var(--ds-content-muted,#525252)]">
            No articles in this category yet.
          </p>
        ) : featured ? (
          <div className="mt-6 flex flex-col gap-10 md:gap-12">
            <TopicLandingHero
              topicTitle={category.title}
              topicDescription={category.description}
              topicIcon={topicIcon}
              article={featured}
            />

            {showScoreTicker ? <ScoreTicker /> : null}

            {rest.length > 0 ? (
              <section aria-label={`More ${category.title} coverage`}>
                <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--ds-content-card-border,#e5e5e5)] pb-3">
                  <h2 className="font-serif text-2xl text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:balance] md:text-[2rem]">
                    More coverage
                  </h2>
                  <p className="text-sm text-[var(--ds-content-muted,#525252)]">
                    {rest.length} {rest.length === 1 ? "story" : "stories"}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {rest.map((article) => (
                    <ArticleCardHorizontal key={article._id} article={article} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        ) : null}
      </div>
    </BolShell>
  );
}

/** @deprecated Use TopicCategoryLanding */
export const EditorialCategoryLanding = TopicCategoryLanding;
