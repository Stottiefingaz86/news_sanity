"use client";

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArticleTile } from "@/components/news/article-tile";
import { articlePath } from "@/lib/article-url";
import type { ArticleCard } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type NewsCarouselSectionProps = {
  title: string;
  kicker?: string;
  articles: ArticleCard[];
  variant?: "cards" | "compact" | "overlay";
  className?: string;
};

export function NewsCarouselSection({
  title,
  kicker,
  articles,
  variant = "cards",
  className,
}: NewsCarouselSectionProps) {
  if (!articles.length) return null;

  return (
    <section className={cn("my-10", className)}>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          {kicker ? (
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ds-primary,#ee3536)]">
              {kicker}
            </p>
          ) : null}
          <h2 className="font-serif text-2xl text-[var(--ds-content-foreground,#0a0a0a)] md:text-3xl">
            {title}
          </h2>
        </div>
      </div>

      <Carousel opts={{ align: "start", loop: false }}>
        <CarouselContent className="-ml-3">
          {articles.map((article) => (
            <CarouselItem
              key={article._id}
              basis="basis-[85%] sm:basis-[45%] lg:basis-[32%]"
              className="pl-3"
            >
              {variant === "compact" ? (
                <Link
                  href={articlePath(article.slug)}
                  className="block rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] p-4 transition-shadow hover:shadow-md"
                >
                  <p className="line-clamp-3 font-serif text-lg leading-snug text-[var(--ds-content-foreground,#0a0a0a)]">
                    {article.title}
                  </p>
                </Link>
              ) : (
                <ArticleTile article={article} compact />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
