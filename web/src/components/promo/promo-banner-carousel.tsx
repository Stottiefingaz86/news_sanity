"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PromoContestCard } from "@/components/promo/promo-contest-card";
import {
  CASINO_BANNER_CAROUSEL_GAP,
  CASINO_BANNER_CAROUSEL_ITEM_BASIS,
} from "@/lib/promo-banners/constants";
import type { ContestPromo } from "@/lib/promo-banners/data";
import { cn } from "@/lib/utils";

type PromoBannerCarouselProps = {
  banners: ContestPromo[];
  className?: string;
};

export function PromoBannerCarousel({ banners, className }: PromoBannerCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = banners.length;

  const onSelect = useCallback(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  if (!slideCount) return null;

  if (slideCount === 1) {
    return (
      <section aria-label="Contests and promotions" className={cn(className)}>
        <PromoContestCard contest={banners[0]} />
      </section>
    );
  }

  return (
    <section
      aria-label="Contests and promotions"
      className={cn("relative", className)}
    >
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: false, duration: 28 }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 md:-ml-4">
          {banners.map((contest) => (
            <CarouselItem
              key={contest.id}
              basis={CASINO_BANNER_CAROUSEL_ITEM_BASIS}
              className={CASINO_BANNER_CAROUSEL_GAP}
            >
              <PromoContestCard contest={contest} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          variant="outline"
          className="left-0 size-8 border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)]/95 text-[var(--ds-content-foreground,#0a0a0a)] shadow-sm hover:bg-[var(--ds-content-card-bg,#ffffff)] disabled:opacity-30 sm:-left-3"
        />
        <CarouselNext
          variant="outline"
          className="right-0 size-8 border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)]/95 text-[var(--ds-content-foreground,#0a0a0a)] shadow-sm hover:bg-[var(--ds-content-card-bg,#ffffff)] disabled:opacity-30 sm:-right-3"
        />
      </Carousel>

      {slideCount > 2 ? (
        <div
          className="mt-3 flex items-center justify-center gap-1.5"
          role="tablist"
          aria-label="Contest slides"
        >
          {banners.map((contest, index) => (
            <button
              key={contest.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Show contest ${index + 1}: ${contest.headline}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200 ease-out motion-reduce:transition-none",
                activeIndex === index
                  ? "w-5 bg-[var(--ds-primary,#ee3536)]"
                  : "w-1.5 bg-[var(--ds-content-card-border,#e5e5e5)] hover:bg-[var(--ds-content-muted,#737373)]",
              )}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
