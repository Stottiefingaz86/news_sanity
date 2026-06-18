"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { BolShell } from "@/components/layout/bol-shell";
import { ArticleTile, ArticleListItem } from "@/components/news/article-tile";
import { CustomBlockRenderer } from "@/components/news/blocks/custom-block-renderer";
import { ContentGridBlockView } from "@/components/news/blocks/content-grid-block";
import { MarqueeBlockView } from "@/components/news/blocks/marquee-block";
import { PullQuoteBlockView } from "@/components/news/blocks/pull-quote-block";
import { SectionHeaderBlockView } from "@/components/news/blocks/section-header-block";
import {
  ArticleCardAuthor,
  ArticleCardHorizontal,
  ArticleCardMini,
  ArticleCardOverlay,
  ArticleCardStat,
} from "@/components/news/library/news-card-variants";
import { NewsCarouselSection } from "@/components/news/library/news-carousel-section";
import { NewsFilterBar } from "@/components/news/library/news-filter-bar";
import { NewsBreadcrumbs } from "@/components/news/library/news-breadcrumbs";
import {
  DEMO_ARTICLES,
  DEMO_BREADCRUMBS,
  DEMO_CATEGORIES,
  DEMO_TAGS,
} from "@/components/news/library/demo-data";
import {
  NewsSectionHero,
  NewsSectionNewsletter,
  NewsTagCloud,
  NewsTopicRail,
} from "@/components/news/library/news-sections";
import { NewsCallout } from "@/components/news/ui/news-callout";
import { NewsKeyPoints } from "@/components/news/ui/news-key-points";
import { NewsRelatedLinks } from "@/components/news/ui/news-related-links";
import { BLOCK_CATALOG } from "@/lib/article-blocks/block-catalog";
import { createBlockKey, type ProseBodyBlock } from "@/lib/article-blocks/types";
import { LibrarySectionNav } from "@/components/news/library/library-section-nav";

const SECTIONS = [
  { id: "breadcrumbs", label: "Breadcrumbs" },
  { id: "filters", label: "Filters & dropdowns" },
  { id: "cards", label: "Card variants" },
  { id: "carousel", label: "Carousels" },
  { id: "grids", label: "Grids & masonry" },
  { id: "blocks", label: "Article blocks" },
  { id: "news-ui", label: "News UI" },
  { id: "media", label: "Video & media" },
  { id: "sections", label: "Page sections" },
  { id: "templates", label: "Page templates" },
  { id: "catalog", label: "Block catalog" },
] as const;

function LibrarySection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-[var(--ds-content-card-border,#e5e5e5)] pt-12 first:border-t-0 first:pt-0">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ds-primary,#ee3536)]">
          Component
        </p>
        <h2 className="mt-1 font-serif text-2xl text-[var(--ds-content-foreground,#0a0a0a)] md:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--ds-content-muted,#737373)]">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function DemoPanel({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] p-4 md:p-6">
      {label ? (
        <p className="mb-4 text-[11px] font-bold uppercase tracking-wide text-[var(--ds-content-muted,#737373)]">
          {label}
        </p>
      ) : null}
      {children}
    </div>
  );
}

const UNIFORM_GRID = {
  _type: "contentGrid" as const,
  _key: "demo-uniform",
  layout: "uniform" as const,
  columns: 3 as const,
  gap: "normal" as const,
  items: [
    { _key: "u1", title: "Brazil", body: "Depth in attack and a favorable path through the knockout bracket." },
    { _key: "u2", title: "France", body: "Experience and set-piece strength keep them near the top of the board." },
    { _key: "u3", title: "Argentina", body: "Defending champions with a proven tournament mentality." },
  ],
};

const MASONRY_GRID = {
  _type: "contentGrid" as const,
  _key: "demo-masonry",
  layout: "masonry" as const,
  columns: 3 as const,
  gap: "normal" as const,
  items: [
    { _key: "m1", title: "Colombia", body: "A live outsider if the draw opens up on the right side of the bracket." },
    { _key: "m2", title: "Portugal", body: "Short note." },
    { _key: "m3", title: "Netherlands", body: "Pressing identity and wide depth make them a tricky quarterfinal opponent." },
  ],
};

const BENTO_GRID = {
  _type: "contentGrid" as const,
  _key: "demo-bento",
  layout: "bento" as const,
  columns: 4 as const,
  gap: "normal" as const,
  items: [
    { _key: "b1", title: "Outright winner", body: "Brazil and France lead the board.", colSpan: 2 as const, rowSpan: 2 as const },
    { _key: "b2", title: "Golden Boot", body: "Mbappé +900", colSpan: 2 as const, rowSpan: 1 as const },
    { _key: "b3", title: "Group exits", body: "USA +1200", colSpan: 1 as const, rowSpan: 1 as const },
    { _key: "b4", title: "Dark horse", body: "Colombia +2500", colSpan: 1 as const, rowSpan: 1 as const },
  ],
};

export function LibraryPageContent() {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const gridRef = useRef<HTMLDivElement>(null);
  const featured = DEMO_ARTICLES[0];

  return (
    <BolShell showSubNav={false}>
      <div className="mx-auto w-full max-w-[1240px] px-4 py-8 md:px-8 lg:px-10">
        <div
          ref={gridRef}
          className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-14"
        >
          <LibrarySectionNav
            sections={SECTIONS}
            activeSection={activeSection}
            onSectionClick={setActiveSection}
            boundaryRef={gridRef}
          />

          <div className="min-w-0 flex flex-col gap-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <NewsBreadcrumbs
                  items={[
                    { label: "In the News", href: "/" },
                    { label: "Component library" },
                  ]}
                />
                <h1 className="mt-4 font-serif text-3xl text-[var(--ds-content-foreground,#0a0a0a)] md:text-4xl">
                  News & blog component library
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--ds-content-muted,#737373)]">
                  Cards, carousels, grids, filters, breadcrumbs, article blocks, and page
                  sections — everything copywriters and developers need for BetOnline News.
                </p>
              </div>
              <Link
                href="/ranking-10-teams-best-chance-win-world-cup?compose=1"
                className="inline-flex h-9 items-center rounded-lg bg-[var(--ds-primary,#ee3536)] px-4 text-sm font-semibold text-white hover:bg-[var(--ds-primary,#ee3536)]/90"
              >
                Open compose mode
              </Link>
            </div>

            <main className="min-w-0 flex flex-col gap-12">
            <LibrarySection
              id="breadcrumbs"
              title="Breadcrumbs"
              description="Navigation trail for articles, categories, and archive pages."
            >
              <div className="flex flex-col gap-4">
                <DemoPanel label="Default">
                  <NewsBreadcrumbs items={DEMO_BREADCRUMBS} />
                </DemoPanel>
                <DemoPanel label="Compact (collapsed middle)">
                  <NewsBreadcrumbs items={DEMO_BREADCRUMBS} variant="compact" />
                </DemoPanel>
              </div>
            </LibrarySection>

            <LibrarySection
              id="filters"
              title="Filters & dropdowns"
              description="Category pills, select dropdowns, and toolbar with search."
            >
              <div className="flex flex-col gap-6">
                <DemoPanel label="Category pills">
                  <NewsFilterBar categories={DEMO_CATEGORIES} layout="pills" />
                </DemoPanel>
                <DemoPanel label="Dropdown selects">
                  <NewsFilterBar categories={DEMO_CATEGORIES} layout="dropdowns" />
                </DemoPanel>
                <DemoPanel label="Search toolbar">
                  <NewsFilterBar categories={DEMO_CATEGORIES} layout="toolbar" />
                </DemoPanel>
              </div>
            </LibrarySection>

            <LibrarySection
              id="cards"
              title="Card variants"
              description="Listing cards for homepage rails, sidebars, and related content."
            >
              <div className="flex flex-col gap-6">
                <DemoPanel label="Featured tile">
                  <ArticleTile article={featured} featured />
                </DemoPanel>
                <DemoPanel label="Standard grid tile">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {DEMO_ARTICLES.slice(0, 4).map((article) => (
                      <ArticleTile key={article._id} article={article} grid />
                    ))}
                  </div>
                </DemoPanel>
                <DemoPanel label="Compact list item">
                  <ArticleListItem article={DEMO_ARTICLES[2]} />
                </DemoPanel>
                <DemoPanel label="Horizontal card">
                  <ArticleCardHorizontal article={DEMO_ARTICLES[1]} />
                </DemoPanel>
                <DemoPanel label="Overlay hero card">
                  <div className="max-w-md">
                    <ArticleCardOverlay article={featured} />
                  </div>
                </DemoPanel>
                <DemoPanel label="Stat cards">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <ArticleCardStat label="Brazil outright" value="+450" change="Shortened 12 pts" />
                    <ArticleCardStat label="France outright" value="+550" />
                    <ArticleCardStat label="Argentina outright" value="+600" change="Lengthened 25 pts" />
                  </div>
                </DemoPanel>
                <DemoPanel label="Author bio card">
                  <ArticleCardAuthor article={featured} />
                </DemoPanel>
                <DemoPanel label="Mini card">
                  <div className="max-w-xs">
                    <ArticleCardMini article={DEMO_ARTICLES[3]} />
                  </div>
                </DemoPanel>
              </div>
            </LibrarySection>

            <LibrarySection
              id="carousel"
              title="Carousels"
              description="Horizontal article rails for homepage and category pages."
            >
              <NewsCarouselSection
                kicker="Trending"
                title="More from the desk"
                articles={DEMO_ARTICLES}
              />
            </LibrarySection>

            <LibrarySection
              id="grids"
              title="Grids & masonry"
              description="Uniform, masonry, and bento layouts for in-article content blocks."
            >
              <div className="flex flex-col gap-10">
                <div>
                  <SectionHeaderBlockView
                    value={{
                      _type: "sectionHeader",
                      _key: "sh1",
                      kicker: "Uniform grid",
                      title: "Top contenders at a glance",
                      subtitle: "Equal tiles — ideal for quick-scan team profiles.",
                      size: "medium",
                    }}
                  />
                  <ContentGridBlockView value={UNIFORM_GRID} />
                </div>
                <div>
                  <SectionHeaderBlockView
                    value={{
                      _type: "sectionHeader",
                      _key: "sh2",
                      kicker: "Masonry",
                      title: "Dark horses worth a look",
                      size: "medium",
                    }}
                  />
                  <ContentGridBlockView value={MASONRY_GRID} />
                </div>
                <div>
                  <SectionHeaderBlockView
                    value={{
                      _type: "sectionHeader",
                      _key: "sh3",
                      kicker: "Bento layout",
                      title: "Betting angles by market",
                      size: "medium",
                    }}
                  />
                  <ContentGridBlockView value={BENTO_GRID} />
                </div>
              </div>
            </LibrarySection>

            <LibrarySection
              id="blocks"
              title="Article body blocks"
              description="Portable blocks available in Sanity and compose mode."
            >
              <div className="flex flex-col gap-8">
                <DemoPanel label="Standfirst / deck">
                  <CustomBlockRenderer
                    block={BLOCK_CATALOG.find((b) => b.id === "standfirst")!.create()}
                  />
                </DemoPanel>
                <DemoPanel label="Body text (drop cap)">
                  <CustomBlockRenderer
                    block={{
                      ...(BLOCK_CATALOG.find((b) => b.id === "prose-body")!.create() as ProseBodyBlock),
                      dropCap: true,
                    }}
                  />
                </DemoPanel>
                <DemoPanel label="Text columns (two-up)">
                  <CustomBlockRenderer
                    block={BLOCK_CATALOG.find((b) => b.id === "text-columns")!.create()}
                  />
                </DemoPanel>
                <DemoPanel label="Section heading">
                  <CustomBlockRenderer
                    block={BLOCK_CATALOG.find((b) => b.id === "text-heading")!.create()}
                  />
                </DemoPanel>
                <DemoPanel label="Pull quote">
                  <PullQuoteBlockView
                    value={{
                      _type: "pullQuote",
                      _key: "pq1",
                      quote:
                        "The market still underrates how much a favorable knockout path is worth in a 48-team format.",
                      attribution: "Shane Pratt, BetOnline Analysis",
                      variant: "highlight",
                    }}
                  />
                </DemoPanel>
                <DemoPanel label="Odds marquee">
                  <MarqueeBlockView
                    value={{
                      _type: "marquee",
                      _key: "mq1",
                      items: ["FRANCE +550", "ARGENTINA +600", "BRAZIL +450", "ENGLAND +700"],
                      speed: "medium",
                      separator: "·",
                    }}
                  />
                </DemoPanel>
                {BLOCK_CATALOG.filter((b) =>
                  ["cta-block", "related-articles", "faq-block", "divider-line"].includes(b.id),
                ).map((entry) => (
                  <DemoPanel key={entry.id} label={entry.label}>
                    <CustomBlockRenderer block={entry.create()} />
                  </DemoPanel>
                ))}
              </div>
            </LibrarySection>

            <LibrarySection
              id="news-ui"
              title="News UI components"
              description="Shadcn-backed editorial primitives for callouts, takeaways, and related links."
            >
              <div className="flex flex-col gap-8">
                <DemoPanel label="Callout (Alert)">
                  <NewsCallout title="Line movement note" variant="odds">
                    Division futures tightened 12–15 points after free agency headlines. Shop
                    numbers before minicamp coverage moves the market again.
                  </NewsCallout>
                </DemoPanel>
                <DemoPanel label="Key takeaways (Card)">
                  <NewsKeyPoints
                    title="Before you bet"
                    items={[
                      "Compare your price to the closing line over a 100-bet sample.",
                      "Split CLV tracking by sport and market type.",
                      "Reduce volume in markets where you consistently lose to the close.",
                    ]}
                  />
                </DemoPanel>
                <DemoPanel label="Related links (Card + Badge)">
                  <NewsRelatedLinks
                    title="Keep reading"
                    articles={[
                      {
                        title: "Ranking 10 Teams with Best Chance to Win the World Cup",
                        href: "/ranking-10-teams-best-chance-win-world-cup",
                        category: "Expert Analysis",
                      },
                      {
                        title: "NBA Playoff Race: Betting Guide for the Stretch Run",
                        href: "/nba-playoff-race-betting-guide",
                        category: "NBA",
                      },
                    ]}
                  />
                </DemoPanel>
              </div>
            </LibrarySection>

            <LibrarySection
              id="media"
              title="Video & media"
              description="Embeds and image blocks for longform and media layouts."
            >
              <div className="flex flex-col gap-6">
                <DemoPanel label="Video embed (16:9)">
                  <CustomBlockRenderer
                    block={{
                      _type: "videoEmbed",
                      _key: createBlockKey(),
                      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                      caption: "Match preview breakdown — sample embed",
                      aspect: "video",
                    }}
                  />
                </DemoPanel>
              </div>
            </LibrarySection>

            <LibrarySection
              id="sections"
              title="Page sections"
              description="Reusable homepage and landing page modules."
            >
              <div className="flex flex-col gap-8">
                <NewsSectionHero article={featured} />
                <NewsTopicRail
                  title="Browse by topic"
                  topics={[
                    { label: "NFL", href: "/category/nfl", count: 12 },
                    { label: "NBA", href: "/category/nba", count: 8 },
                    { label: "Expert Analysis", href: "/category/expert-analysis", count: 15 },
                    { label: "News", href: "/category/news", count: 6 },
                  ]}
                />
                <NewsTagCloud tags={DEMO_TAGS} />
                <NewsSectionNewsletter />
              </div>
            </LibrarySection>

            <LibrarySection
              id="templates"
              title="Page templates"
              description="Article layout presets wired to Sanity `layout` field."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { name: "Standard", desc: "Hero, summary box, TOC sidebar", slug: "ranking-10-teams-best-chance-win-world-cup" },
                  { name: "Analysis", desc: "Odds blocks + expert badge", slug: "nba-playoff-race-betting-guide" },
                  { name: "Longform", desc: "Clean single column read", slug: "closing-line-value-explained" },
                  { name: "Media", desc: "Video hero + timestamps", slug: "march-madness-bracket-breakdown-podcast" },
                ].map((template) => (
                  <Link
                    key={template.name}
                    href={`/${template.slug}`}
                    className="rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] p-5 transition-shadow hover:shadow-md"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--ds-primary,#ee3536)]">
                      {template.name}
                    </p>
                    <p className="mt-2 font-serif text-lg text-[var(--ds-content-foreground,#0a0a0a)]">
                      {template.desc}
                    </p>
                    <p className="mt-2 text-xs text-[var(--ds-content-muted,#737373)]">View live example →</p>
                  </Link>
                ))}
              </div>
            </LibrarySection>

            <LibrarySection
              id="catalog"
              title="Block catalog"
              description="All blocks available in compose mode — drag onto any article with ?compose=1."
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {BLOCK_CATALOG.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-surface,#f5f5f5)] p-4"
                  >
                    <p className="font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
                      {entry.label}
                    </p>
                    <p className="mt-1 text-sm text-[var(--ds-content-muted,#737373)]">
                      {entry.description}
                    </p>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-[var(--ds-primary,#ee3536)]">
                      {entry.category}
                    </p>
                  </div>
                ))}
              </div>
            </LibrarySection>
            </main>
          </div>
        </div>
      </div>
    </BolShell>
  );
}
