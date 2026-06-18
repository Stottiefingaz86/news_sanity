import { ArticleBreadcrumbs } from "@/components/news/article-breadcrumbs";
import { ArticleHeroImage } from "@/components/news/article-hero-image";
import { ArticleBodySection } from "@/components/news/article-body-section";
import { ArticleShareButtons } from "@/components/news/article-share-buttons";
import { formatNewsDateLong } from "@/lib/format-news-date";
import { primaryCategoryLabel } from "@/lib/article-url";
import type { ArticleDetail } from "@/lib/sanity/types";

type MediaArticleLayoutProps = {
  article: ArticleDetail;
};

function getEmbedUrl(url?: string) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.hostname.includes("youtu.be")
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch {
    return null;
  }

  return url;
}

export function MediaArticleLayout({ article }: MediaArticleLayoutProps) {
  const category = primaryCategoryLabel(article.categories);
  const date = formatNewsDateLong(article.publishedAt);
  const embedUrl = getEmbedUrl(article.heroMediaUrl);

  return (
    <article className="min-w-0">
      <ArticleBreadcrumbs categories={article.categories} title={article.title} />

      <div className="mb-6 overflow-hidden rounded-xl bg-black">
        {embedUrl ? (
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              title={article.title}
              className="size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <ArticleHeroImage article={article} alt={article.title} />
        )}
      </div>

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--ds-primary,#ee3536)]">
            {category}
          </p>
          <h1 className="font-serif text-3xl leading-tight text-[var(--ds-content-foreground,#0a0a0a)] md:text-[2.5rem] [text-wrap:balance]">
            {article.title}
          </h1>
        </div>
        {date ? (
          <p className="text-sm text-[var(--ds-content-muted,#737373)]">{date}</p>
        ) : null}
      </div>

      <ArticleShareButtons
        title={article.title}
        slug={article.slug}
        className="mb-8"
      />

      {article.timestamps?.length ? (
        <section className="mb-8 rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] p-4 md:p-6">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-[var(--ds-content-foreground,#0a0a0a)]">
            Full Show Timestamps
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

      <ArticleBodySection slug={article.slug} blocks={article.body} />
    </article>
  );
}
