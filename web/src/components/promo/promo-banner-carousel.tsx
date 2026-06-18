"use client";

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  CASINO_BANNER_CAROUSEL_GAP,
  CASINO_BANNER_CAROUSEL_ITEM_BASIS,
  CASINO_BANNER_SURFACE_CLASS,
  CROSS_SELL_BANNER_HEIGHT,
  CROSS_SELL_BANNER_WIDTH,
} from "@/lib/promo-banners/constants";
import type { CrossSellBanner } from "@/lib/promo-banners/data";
import { cn } from "@/lib/utils";

const CAROUSEL_NAV_CLASS =
  "promo-carousel-nav size-8 border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)]/95 text-[var(--ds-content-foreground,#0a0a0a)] shadow-sm hover:bg-[var(--ds-content-card-bg,#ffffff)] disabled:opacity-30";

type PromoBannerCarouselProps = {
  banners: CrossSellBanner[];
  className?: string;
};

function PromoBannerCard({ banner }: { banner: CrossSellBanner }) {
  return (
    <Link
      href={banner.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        CASINO_BANNER_SURFACE_CLASS,
        "group block transition-shadow hover:shadow-md",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={banner.image}
        alt={banner.alt ?? banner.title}
        width={CROSS_SELL_BANNER_WIDTH}
        height={CROSS_SELL_BANNER_HEIGHT}
        className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.01] motion-reduce:transform-none"
      />
    </Link>
  );
}

export function PromoBannerCarousel({ banners, className }: PromoBannerCarouselProps) {
  if (!banners.length) return null;

  return (
    <section aria-label="Promotions" className={cn("relative", className)}>
      <Carousel opts={{ align: "start", loop: false, duration: 28 }} className="w-full">
        <CarouselContent className="-ml-3 md:-ml-4">
          {banners.map((banner) => (
            <CarouselItem
              key={banner.id}
              basis={CASINO_BANNER_CAROUSEL_ITEM_BASIS}
              className={CASINO_BANNER_CAROUSEL_GAP}
            >
              <PromoBannerCard banner={banner} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {banners.length > 1 ? (
          <>
            <CarouselPrevious
              variant="outline"
              className={cn("left-0 sm:-left-3", CAROUSEL_NAV_CLASS)}
            />
            <CarouselNext
              variant="outline"
              className={cn("right-0 sm:-right-3", CAROUSEL_NAV_CLASS)}
            />
          </>
        ) : null}
      </Carousel>
    </section>
  );
}
