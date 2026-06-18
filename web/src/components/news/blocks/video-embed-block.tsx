import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { VideoEmbedBlock } from "@/lib/article-blocks/types";

function getYouTubeId(url?: string) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match?.[1] ?? null;
}

export function VideoEmbedBlockView({ value }: { value: VideoEmbedBlock }) {
  const youtubeId = getYouTubeId(value.url);
  const caption = value.caption;
  const isSquare = value.aspect === "square";

  if (!youtubeId && !value.url) return null;

  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl bg-black shadow-sm ring-1 ring-black/10">
        <AspectRatio ratio={isSquare ? 1 : 16 / 9}>
          {youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={caption ?? "Video embed"}
              className="size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={value.url} controls className="size-full object-cover" />
          )}
        </AspectRatio>
      </div>
      {caption ? (
        <figcaption className="mt-3 font-sans text-sm leading-6 text-[var(--ds-content-muted,#737373)] [text-wrap:pretty]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
