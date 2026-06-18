import { ArticleBreadcrumbs } from "@/components/news/article-breadcrumbs";
import { ArticleHeroImage } from "@/components/news/article-hero-image";
import { ArticleMetaRow } from "@/components/news/article-meta-row";
import { ArticleBodySection } from "@/components/news/article-body-section";
import { ArticleSummaryBox } from "@/components/news/article-summary-box";
import { getArticleVideoEmbedUrl } from "@/lib/video-embed";
import type { ArticleDetail } from "@/lib/sanity/types";

type EditorialArticleLayoutProps = {
  article: ArticleDetail;
  variant?: "standard" | "analysis" | "media";
};

export function EditorialArticleLayout({
  article,
  variant = "standard",
}: EditorialArticleLayoutProps) {
  const embedUrl = variant === "media" ? getArticleVideoEmbedUrl(article) : null;

  return (
    <article className="min-w-0">
      <div className="max-w-[42rem]">
        <ArticleBreadcrumbs categories={article.categories} title={article.title} />

        {variant === "media" && embedUrl ? (
          <div className="mb-8 overflow-hidden rounded-xl bg-black">
            <div className="aspect-video w-full">
              <iframe
                src={embedUrl}
                title={article.title}
                className="size-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : null}

        <h1 className="mb-6 font-serif text-3xl leading-tight text-[var(--ds-content-foreground,#0a0a0a)] md:text-5xl md:leading-[1.05] [text-wrap:balance]">
          {article.title}
        </h1>

        <ArticleMetaRow article={article} />

        {variant !== "media" || !embedUrl ? (
          <ArticleHeroImage
            article={article}
            alt={article.title}
            className="my-8 overflow-hidden rounded-xl"
          />
        ) : null}

        {article.summary ? (
          <div className="mb-8">
            <ArticleSummaryBox summary={article.summary} />
          </div>
        ) : null}

        {variant === "analysis" ? (
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ds-primary,#ee3536)]">
            Expert Analysis
          </p>
        ) : null}

        {variant === "media" && article.timestamps?.length ? (
          <section className="mb-8 rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] p-4 md:p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-[var(--ds-content-foreground,#0a0a0a)]">
              Show timestamps
            </h2>
            <ul className="space-y-2 text-sm text-[var(--ds-content-muted,#737373)]">
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
      </div>

      <ArticleBodySection slug={article.slug} blocks={article.body} />
    </article>
  );
}
