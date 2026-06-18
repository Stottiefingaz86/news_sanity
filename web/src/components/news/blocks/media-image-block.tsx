import Image from "next/image";
import { cn } from "@/lib/utils";
import { imageUrl } from "@/lib/sanity/image";
import type { MediaImageBlock } from "@/lib/article-blocks/types";

export function MediaImageBlockView({ value }: { value: MediaImageBlock }) {
  const src = imageUrl(value.image, 1200, 800) ?? value.externalUrl;
  if (!src) return null;

  return (
    <figure className="my-8">
      <div
        className={cn(
          "relative overflow-hidden rounded-xl bg-[var(--ds-content-surface,#f5f5f5)] shadow-sm ring-1 ring-[var(--ds-content-card-border,#e5e5e5)]",
          value.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]",
        )}
      >
        <Image
          src={src}
          alt={value.caption ?? ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>
      {value.caption ? (
        <figcaption className="mt-3 font-sans text-sm leading-6 text-[var(--ds-content-muted,#737373)] [text-wrap:pretty]">
          {value.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
