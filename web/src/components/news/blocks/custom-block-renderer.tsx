import type { ArticleCustomBlock } from "@/lib/article-blocks/types";
import { ContentGridBlockView } from "@/components/news/blocks/content-grid-block";
import { CtaBlockView } from "@/components/news/blocks/cta-block";
import {
  DividerBlockView,
  RelatedArticlesBlockView,
} from "@/components/news/blocks/divider-block";
import { FaqBlockView } from "@/components/news/blocks/faq-block";
import { MarqueeBlockView } from "@/components/news/blocks/marquee-block";
import { MediaImageBlockView } from "@/components/news/blocks/media-image-block";
import { ProseBodyBlockView } from "@/components/news/blocks/prose-body-block";
import { PullQuoteBlockView } from "@/components/news/blocks/pull-quote-block";
import { SectionHeaderBlockView } from "@/components/news/blocks/section-header-block";
import { StandfirstBlockView } from "@/components/news/blocks/standfirst-block";
import { TextHeadingBlockView } from "@/components/news/blocks/text-heading-block";
import { VideoEmbedBlockView } from "@/components/news/blocks/video-embed-block";

type OddsListValue = {
  title?: string;
  entries?: { label?: string; odds?: string }[];
};

function OddsListView({ value }: { value: OddsListValue }) {
  const entries = value.entries ?? [];
  if (!entries.length) return null;

  return (
    <section className="my-10 border-t border-[var(--ds-content-card-border,#e5e5e5)] pt-6">
      {value.title ? (
        <h4 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.08em] text-[var(--ds-content-muted,#737373)]">
          {value.title}
        </h4>
      ) : null}
      <div className="space-y-0">
        {entries.map((entry, index) => (
          <div
            key={`${entry.label}-${index}`}
            className="flex items-baseline justify-between gap-4 border-b border-[var(--ds-content-card-border,#e5e5e5)] py-2.5 font-serif text-[1.0625rem]"
          >
            <span className="text-[var(--ds-content-foreground,#0a0a0a)]">
              {entry.label}
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-[var(--ds-content-foreground,#0a0a0a)]">
              {entry.odds}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CustomBlockRenderer({ block }: { block: ArticleCustomBlock }) {
  switch (block._type) {
    case "contentGrid":
      return <ContentGridBlockView value={block} />;
    case "sectionHeader":
      return <SectionHeaderBlockView value={block} />;
    case "pullQuote":
      return <PullQuoteBlockView value={block} />;
    case "marquee":
      return <MarqueeBlockView value={block} />;
    case "oddsList":
      return <OddsListView value={block} />;
    case "videoEmbed":
      return <VideoEmbedBlockView value={block} />;
    case "mediaImage":
      return <MediaImageBlockView value={block} />;
    case "ctaBlock":
      return <CtaBlockView value={block} />;
    case "dividerBlock":
      return <DividerBlockView value={block} />;
    case "relatedArticles":
      return <RelatedArticlesBlockView value={block} />;
    case "faqBlock":
      return <FaqBlockView value={block} />;
    case "proseBody":
      return <ProseBodyBlockView value={block} />;
    case "standfirst":
      return <StandfirstBlockView value={block} />;
    case "textHeading":
      return <TextHeadingBlockView value={block} />;
    default:
      return null;
  }
}
