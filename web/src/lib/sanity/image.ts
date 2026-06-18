import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "@/lib/sanity/client";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function imageUrl(
  source: SanityImageSource | undefined,
  width: number,
  height?: number,
) {
  if (!source) return undefined;

  let imageBuilder = urlFor(source).width(width).auto("format").quality(85);

  if (height) {
    imageBuilder = imageBuilder.height(height).fit("crop");
  }

  return imageBuilder.url();
}
