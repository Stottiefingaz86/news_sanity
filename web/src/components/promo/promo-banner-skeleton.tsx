"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  CASINO_BANNER_ASPECT_CLASS,
  CASINO_BANNER_CAROUSEL_GAP,
  CASINO_BANNER_CAROUSEL_ITEM_BASIS,
  CASINO_BANNER_SURFACE_CLASS,
} from "@/lib/promo-banners/constants";
import { cn } from "@/lib/utils";

const DEFAULT_SKELETON_COUNT = 4;

const CAROUSEL_NAV_CLASS =
  "size-8 border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)]/95 text-[var(--ds-content-foreground,#0a0a0a)] shadow-sm hover:bg-[var(--ds-content-card-bg,#ffffff)] disabled:opacity-30";

type PromoBannerSkeletonProps = {
  className?: string;
};

/** Plain casino-banner placeholder — same 2.05:1 tile, shimmer only. */
export function PromoBannerSkeleton({ className }: PromoBannerSkeletonProps) {
  return (
    <div
      className={cn(
        CASINO_BANNER_SURFACE_CLASS,
        CASINO_BANNER_ASPECT_CLASS,
        "promo-skeleton-shimmer bg-[#e8e8e8] motion-safe:animate-pulse motion-reduce:animate-none",
        className,
      )}
      aria-hidden
    />
  );
}

type PromoBannerSkeletonCarouselProps = {
  count?: number;
  className?: string;
};

export function PromoBannerSkeletonCarousel({
  count = DEFAULT_SKELETON_COUNT,
  className,
}: PromoBannerSkeletonCarouselProps) {
  return (
    <section
      aria-label="Promotions loading"
      aria-busy="true"
      className={cn("relative", className)}
    >
      <Carousel opts={{ align: "start", loop: false, duration: 28 }} className="w-full">
        <CarouselContent className="-ml-3 md:-ml-4">
          {Array.from({ length: count }).map((_, index) => (
            <CarouselItem
              key={index}
              basis={CASINO_BANNER_CAROUSEL_ITEM_BASIS}
              className={CASINO_BANNER_CAROUSEL_GAP}
            >
              <PromoBannerSkeleton />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          variant="outline"
          className={cn("left-0 sm:-left-3", CAROUSEL_NAV_CLASS)}
        />
        <CarouselNext
          variant="outline"
          className={cn("right-0 sm:-right-3", CAROUSEL_NAV_CLASS)}
        />
      </Carousel>
    </section>
  );
}
