import { getArticleImageUrl } from "@/lib/article-images";
import type { ArticleCard } from "@/lib/sanity/types";

type ArticleHeroImageProps = {
  article: Pick<ArticleCard, "slug" | "mainImage" | "categories">;
  alt: string;
  className?: string;
};

export function ArticleHeroImage({ article, alt, className }: ArticleHeroImageProps) {
  const src = getArticleImageUrl(article, 1200, 675);
  if (!src) return null;

  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="aspect-[16/9] w-full object-cover"
      />
    </div>
  );
}
