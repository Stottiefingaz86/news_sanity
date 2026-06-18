"use client";

import { BolShell } from "@/components/layout/bol-shell";
import { BettingResourcesSection } from "@/components/news/betting-resources-section";
import { ArticlePageRail } from "@/components/news/article-page-rail";
import { ArticleTableOfContents } from "@/components/news/article-table-of-contents";
import { PolitelyRawVideoLayout } from "@/components/news/politely-raw/politely-raw-video-layout";
import { ScoreTicker } from "@/components/news/widgets/score-ticker";
import { EditorialArticleLayout } from "@/components/news/layouts/editorial-article-layout";
import { extractArticleHeadings } from "@/lib/extract-article-headings";
import { isPolitelyRawArticle } from "@/lib/politely-raw";
import { resolveActiveSectionSlug } from "@/lib/news-nav";
import type { NewsSettings } from "@/lib/sanity/news-settings";
import type { ArticleCard, ArticleDetail } from "@/lib/sanity/types";

type ArticlePageContentProps = {
  article: ArticleDetail;
  settings: NewsSettings;
  relatedPolitelyRawVideos?: ArticleCard[];
};

function editorialVariant(article: ArticleDetail): "standard" | "analysis" | "media" {
  const layout = article.layout ?? "standard";

  if (layout === "analysis") return "analysis";
  if (layout === "media" || article.heroMediaUrl) return "media";
  return "standard";
}

function shouldShowTableOfContents(article: ArticleDetail) {
  const headings = extractArticleHeadings(article.body);
  return article.showTableOfContents !== false && headings.length > 0;
}

export function ArticlePageContent({
  article,
  settings,
  relatedPolitelyRawVideos = [],
}: ArticlePageContentProps) {
  const showToc = shouldShowTableOfContents(article);
  const headings = extractArticleHeadings(article.body);
  const politelyRaw = isPolitelyRawArticle(article);

  return (
    <BolShell
      showSubNav={settings.showSubNav}
      subNavItems={settings.subNavItems}
      activeSectionSlug={resolveActiveSectionSlug(
        article.categories?.map((category) => category.slug),
      )}
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 py-8 md:px-8 lg:px-10">
        {!politelyRaw ? <ScoreTicker className="mb-8" /> : null}

        {politelyRaw ? (
          <PolitelyRawVideoLayout
            article={article}
            moreVideos={relatedPolitelyRawVideos}
          />
        ) : (
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_11rem] lg:gap-x-10 xl:grid-cols-[1fr_12rem] xl:gap-x-12">
            <div className="min-w-0 w-full">
              <EditorialArticleLayout article={article} variant={editorialVariant(article)} />
              <BettingResourcesSection className="mt-16" />
            </div>

            {showToc ? (
              <ArticleTableOfContents
                headings={headings}
                hasSubNav={settings.showSubNav}
              />
            ) : (
              <ArticlePageRail article={article} hasSubNav={settings.showSubNav} />
            )}
          </div>
        )}
      </div>
    </BolShell>
  );
}
