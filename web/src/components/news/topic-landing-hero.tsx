import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { articlePath } from "@/lib/article-url";
import { getArticleImageUrl } from "@/lib/article-images";
import { formatNewsDate } from "@/lib/format-news-date";
import type { ArticleCard } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type TopicLandingHeroProps = {
  topicTitle: string;
  topicDescription?: string;
  topicIcon?: string | null;
  article: ArticleCard;
  className?: string;
};

export function TopicLandingHero({
  topicTitle,
  topicDescription,
  topicIcon,
  article,
  className,
}: TopicLandingHeroProps) {
  const heroImage = getArticleImageUrl(article, 1400, 800);
  const date = formatNewsDate(article.publishedAt);

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <header className="flex items-start gap-4">
        {topicIcon ? (
          <Image
            src={topicIcon}
            alt=""
            width={48}
            height={48}
            className="size-12 shrink-0 object-contain"
          />
        ) : null}
        <div className="min-w-0">
          <h1 className="font-serif text-3xl text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:balance] md:text-[2.75rem] md:leading-[1.08]">
            {topicTitle}
          </h1>
          {topicDescription ? (
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--ds-content-muted,#525252)] [text-wrap:pretty]">
              {topicDescription}
            </p>
          ) : null}
        </div>
      </header>

      <section
        aria-label="Featured story"
        className="news-featured-hero relative min-h-[22rem] overflow-hidden rounded-2xl"
      >
        {heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 bg-[var(--ds-hero-image-bg,#383838)]"
          />
        )}

        <div aria-hidden className="news-featured-hero__scrim absolute inset-0" />

        <div className="relative z-10 flex min-h-[22rem] flex-col justify-end px-6 py-8 md:max-w-[62%] md:px-10 md:py-10 lg:py-12">
          <p className="text-sm font-semibold text-[var(--ds-primary,#ee3536)]">
            Featured{date ? ` · ${date}` : ""}
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-white [text-wrap:balance] md:text-4xl md:leading-[1.1]">
            {article.title}
          </h2>
          {article.excerpt ? (
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/78 [text-wrap:pretty] md:text-base">
              {article.excerpt}
            </p>
          ) : null}
          <div className="mt-8">
            <Button
              render={<Link href={articlePath(article.slug)} />}
              className="bg-white text-[var(--ds-content-emphasis-bg,#2d2d2d)] hover:bg-white/90"
            >
              Read article
            </Button>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(238,53,54,0.18),transparent_50%)]"
        />
      </section>
    </div>
  );
}
