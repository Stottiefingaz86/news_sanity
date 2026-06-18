"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { articlePath } from "@/lib/article-url";
import { getArticleImageUrl } from "@/lib/article-images";
import { formatNewsDate } from "@/lib/format-news-date";
import type { ArticleCard } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

/** Fixed hero height — every slide matches. */
export const FEATURED_CAROUSEL_HEIGHT =
  "h-[20rem] sm:h-[22rem] md:h-[24rem]" as const;

type TopicFeaturedCarouselProps = {
  articles: ArticleCard[];
  className?: string;
  onActiveChange?: (index: number, article: ArticleCard) => void;
  scrollToIndex?: number | null;
};

function FeaturedHeroSlide({ article }: { article: ArticleCard }) {
  const heroImage = getArticleImageUrl(article, 1400, 800);
  const date = formatNewsDate(article.publishedAt);

  return (
    <section
      aria-label={article.title}
      className={cn(
        "news-featured-hero relative overflow-hidden rounded-2xl",
        FEATURED_CAROUSEL_HEIGHT,
      )}
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

      <div className="relative z-10 flex h-full flex-col justify-end px-6 py-8 md:max-w-[70%] md:px-10 md:py-10">
        <p className="text-sm font-semibold text-[var(--ds-primary,#ee3536)]">
          Featured{date ? ` · ${date}` : ""}
        </p>
        <h2 className="mt-3 line-clamp-3 font-serif text-2xl leading-tight text-white [text-wrap:balance] md:text-3xl md:leading-[1.12] lg:text-4xl lg:leading-[1.1]">
          {article.title}
        </h2>
        {article.excerpt ? (
          <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-6 text-white/78 [text-wrap:pretty] md:text-base md:leading-7">
            {article.excerpt}
          </p>
        ) : null}
        <div className="mt-6 shrink-0">
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
  );
}

export function TopicFeaturedCarousel({
  articles,
  className,
  onActiveChange,
  scrollToIndex,
}: TopicFeaturedCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    const index = api.selectedScrollSnap();
    setActiveIndex(index);
    const article = articles[index];
    if (article && onActiveChange) {
      onActiveChange(index, article);
    }
  }, [api, articles, onActiveChange]);

  useEffect(() => {
    if (!api) return;
    setSlideCount(api.scrollSnapList().length);
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || scrollToIndex == null) return;
    if (scrollToIndex >= 0 && scrollToIndex < articles.length) {
      api.scrollTo(scrollToIndex);
    }
  }, [api, scrollToIndex, articles.length]);

  if (!articles.length) return null;

  if (articles.length === 1) {
    return (
      <div className={className}>
        <FeaturedHeroSlide article={articles[0]} />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true, duration: 28 }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {articles.map((article) => (
            <CarouselItem key={article._id} basis="basis-full" className="pl-0">
              <FeaturedHeroSlide article={article} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          variant="ghost"
          className="left-3 border-white/20 bg-[var(--ds-content-emphasis-bg,#2d2d2d)]/80 text-white hover:bg-[var(--ds-content-emphasis-bg,#2d2d2d)] hover:text-white disabled:opacity-30"
        />
        <CarouselNext
          variant="ghost"
          className="right-3 border-white/20 bg-[var(--ds-content-emphasis-bg,#2d2d2d)]/80 text-white hover:bg-[var(--ds-content-emphasis-bg,#2d2d2d)] hover:text-white disabled:opacity-30"
        />
      </Carousel>

      <div
        className="mt-4 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Featured stories"
      >
        {Array.from({ length: slideCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-label={`Go to featured story ${index + 1}`}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-200 ease-out",
              activeIndex === index
                ? "w-6 bg-[var(--ds-primary,#ee3536)]"
                : "w-2 bg-[var(--ds-content-card-border,#e5e5e5)] hover:bg-[var(--ds-content-muted,#737373)]",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function pickCarouselArticles(articles: ArticleCard[], limit = 5) {
  const seen = new Set<string>();
  const sorted = [...articles].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bTime - aTime;
  });

  const result: ArticleCard[] = [];
  for (const article of sorted) {
    if (seen.has(article._id)) continue;
    seen.add(article._id);
    result.push(article);
    if (result.length >= limit) break;
  }
  return result;
}
