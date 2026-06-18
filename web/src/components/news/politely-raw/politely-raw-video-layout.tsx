import { ArticleBodySection } from "@/components/news/article-body-section";
import { ArticleShareButtons } from "@/components/news/article-share-buttons";
import { NewsBreadcrumbs } from "@/components/news/library/news-breadcrumbs";
import { PolitelyRawBadge } from "@/components/news/politely-raw/politely-raw-badge";
import { PolitelyRawVideoGrid } from "@/components/news/politely-raw/politely-raw-video-grid";
import { ArticleHeroImage } from "@/components/news/article-hero-image";
import { formatNewsDatePolitelyRaw } from "@/lib/format-news-date";
import { POLITELY_RAW_PATH } from "@/lib/politely-raw";
import { getArticleVideoEmbedUrl, getVideoThumbnailUrl } from "@/lib/video-embed";
import type { ArticleCard, ArticleDetail } from "@/lib/sanity/types";

type PolitelyRawVideoLayoutProps = {
  article: ArticleDetail;
  moreVideos: ArticleCard[];
};

export function PolitelyRawVideoLayout({
  article,
  moreVideos,
}: PolitelyRawVideoLayoutProps) {
  const embedUrl = getArticleVideoEmbedUrl(article);
  const date = formatNewsDatePolitelyRaw(article.publishedAt);

  return (
    <article className="min-w-0">
      <nav aria-label="Video navigation" className="mb-4">
        <NewsBreadcrumbs
          showBackArrow
          items={[
            { label: "Politely RAW", href: POLITELY_RAW_PATH },
            { label: article.title },
          ]}
        />
      </nav>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <PolitelyRawBadge />
          {date ? (
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-content-muted,#737373)]">
              {date}
            </span>
          ) : null}
        </div>
        <ArticleShareButtons title={article.title} slug={article.slug} />
      </div>

      <div className="mb-6 overflow-hidden rounded-xl bg-black">
        {embedUrl ? (
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              title={article.title}
              className="size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <ArticleHeroImage article={article} alt={article.title} />
        )}
      </div>

      <h1 className="mb-6 font-serif text-2xl leading-tight text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:balance] md:text-4xl md:leading-[1.1]">
        {article.title}
      </h1>

      {article.excerpt ? (
        <p className="mb-8 max-w-3xl text-base leading-7 text-[var(--ds-content-muted,#525252)] [text-wrap:pretty]">
          {article.excerpt}
        </p>
      ) : null}

      {article.timestamps?.length ? (
        <section className="mb-8 rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] p-4 md:p-6">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-[var(--ds-content-foreground,#0a0a0a)]">
            Full Show Timestamps
          </h2>
          <ul className="space-y-2 text-sm leading-6 text-[var(--ds-content-muted,#737373)]">
            {article.timestamps.map((entry, index) => (
              <li key={`${entry.time}-${index}`}>
                <span className="font-medium text-[var(--ds-content-foreground,#0a0a0a)]">
                  {entry.time}
                </span>
                {entry.label ? ` — ${entry.label}` : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ArticleBodySection slug={article.slug} blocks={article.body} />

      <PolitelyRawVideoGrid videos={moreVideos} className="mt-12 border-t border-[var(--ds-content-card-border,#e5e5e5)] pt-10" />
    </article>
  );
}
