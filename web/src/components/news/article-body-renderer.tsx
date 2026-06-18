"use client";

import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { CustomBlockRenderer } from "@/components/news/blocks/custom-block-renderer";
import { DRAG_BLOCK_TYPE } from "@/lib/article-blocks/block-catalog";
import {
  ARTICLE_BLOCK_LAYOUT_CLASS,
  getArticleBlockLayout,
} from "@/lib/article-blocks/block-layout";
import { segmentArticleBody } from "@/lib/article-blocks/segment-body-blocks";
import {
  type ArticleBodyBlock,
  isCustomBlock,
} from "@/lib/article-blocks/types";
import { portableTextComponents } from "@/components/news/article-portable-text-components";
import { cn } from "@/lib/utils";

type ArticleBodyRendererProps = {
  blocks?: ArticleBodyBlock[];
  composeMode?: boolean;
  selectedKey?: string | null;
  onSelectBlock?: (key: string | null) => void;
  onDropAtIndex?: (index: number, catalogId: string) => void;
  dragOverIndex?: number | null;
  onDragOverIndex?: (index: number | null) => void;
  dropZonesExpanded?: boolean;
};

function DropZone({
  index,
  active,
  expanded,
  onDrop,
  onDragOver,
  onDragLeave,
}: {
  index: number;
  active: boolean;
  expanded: boolean;
  onDrop: (index: number, catalogId: string) => void;
  onDragOver: (index: number) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
}) {
  const showExpanded = expanded || active;

  return (
    <div
      data-drop-index={index}
      onDragEnter={(event) => {
        event.preventDefault();
        onDragOver(index);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        onDragOver(index);
      }}
      onDragLeave={onDragLeave}
      onDrop={(event) => {
        event.preventDefault();
        const catalogId = event.dataTransfer.getData(DRAG_BLOCK_TYPE);
        if (catalogId) onDrop(index, catalogId);
      }}
      className={cn(
        "relative rounded-lg transition-all",
        showExpanded ? "my-3 min-h-14" : "my-1 min-h-2",
        active
          ? "border-2 border-dashed border-[var(--ds-primary,#ee3536)] bg-[var(--ds-primary,#ee3536)]/8"
          : showExpanded
            ? "border border-dashed border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)]/50 hover:border-[var(--ds-primary,#ee3536)]/40 hover:bg-[var(--ds-primary,#ee3536)]/5"
            : "border border-transparent hover:border-[var(--ds-content-card-border,#e5e5e5)] hover:bg-[var(--ds-primary,#ee3536)]/5",
      )}
    >
      {showExpanded ? (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-medium text-[var(--ds-content-muted,#737373)]">
          {active ? "Release to insert block" : "Drop block here"}
        </span>
      ) : null}
    </div>
  );
}

function renderArticleBlockContent(block: ArticleBodyBlock) {
  if (isCustomBlock(block)) {
    return <CustomBlockRenderer block={block} />;
  }

  return (
    <PortableText
      value={[block as PortableTextBlock]}
      components={portableTextComponents}
    />
  );
}

function ArticleBlockShell({
  blockKey,
  layoutClass,
  composeMode,
  selected,
  onSelectBlock,
  children,
}: {
  blockKey: string;
  layoutClass?: string;
  composeMode: boolean;
  selected: boolean;
  onSelectBlock?: (key: string | null) => void;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(!composeMode && layoutClass)}>
      <div
        data-compose-block={composeMode ? blockKey : undefined}
        onClick={
          composeMode
            ? (event) => {
                event.stopPropagation();
                onSelectBlock?.(blockKey);
              }
            : undefined
        }
        className={cn(
          !composeMode && "article-prose-block",
          composeMode
            ? selected
              ? "relative rounded-xl ring-2 ring-[var(--ds-primary,#ee3536)] ring-offset-2"
              : "relative cursor-pointer rounded-xl ring-1 ring-transparent transition-shadow hover:ring-[var(--ds-content-card-border,#e5e5e5)]"
            : undefined,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function ArticleBodyRenderer({
  blocks = [],
  composeMode = false,
  selectedKey,
  onSelectBlock,
  onDropAtIndex,
  dragOverIndex,
  onDragOverIndex,
  dropZonesExpanded = false,
}: ArticleBodyRendererProps) {
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && event.currentTarget.contains(next)) return;
    onDragOverIndex?.(null);
  };

  if (!blocks.length && !composeMode) return null;

  if (!blocks.length && composeMode) {
    return (
      <div className="article-body-flow">
        <DropZone
          index={0}
          active={dragOverIndex === 0}
          expanded={dropZonesExpanded}
          onDrop={(index, catalogId) => onDropAtIndex?.(index, catalogId)}
          onDragOver={(index) => onDragOverIndex?.(index)}
          onDragLeave={handleDragLeave}
        />
      </div>
    );
  }

  const segments = composeMode ? null : segmentArticleBody(blocks);

  return (
    <div className={cn("article-body-flow min-w-0")}>
      {composeMode
        ? blocks.map((block, index) => {
            const key =
              "_key" in block && typeof block._key === "string"
                ? block._key
                : `block-${index}`;
            const selected = selectedKey === key;
            const layoutClass = ARTICLE_BLOCK_LAYOUT_CLASS.prose;

            return (
              <div key={key}>
                <DropZone
                  index={index}
                  active={dragOverIndex === index}
                  expanded={dropZonesExpanded}
                  onDrop={(i, catalogId) => onDropAtIndex?.(i, catalogId)}
                  onDragOver={(i) => onDragOverIndex?.(i)}
                  onDragLeave={handleDragLeave}
                />
                <ArticleBlockShell
                  blockKey={key}
                  layoutClass={layoutClass}
                  composeMode={composeMode}
                  selected={selected}
                  onSelectBlock={onSelectBlock}
                >
                  {renderArticleBlockContent(block)}
                </ArticleBlockShell>
              </div>
            );
          })
        : segments?.map((segment) => {
            if (segment.kind === "prose") {
              return (
                <ArticleBlockShell
                  key={segment.key}
                  blockKey={segment.key}
                  layoutClass={ARTICLE_BLOCK_LAYOUT_CLASS.prose}
                  composeMode={false}
                  selected={false}
                >
                  <div className="article-editorial-prose">
                    <PortableText
                      value={segment.blocks}
                      components={portableTextComponents}
                    />
                  </div>
                </ArticleBlockShell>
              );
            }

            const block = segment.block;
            const layoutClass = ARTICLE_BLOCK_LAYOUT_CLASS[getArticleBlockLayout(block)];

            return (
              <ArticleBlockShell
                key={segment.key}
                blockKey={segment.key}
                layoutClass={layoutClass}
                composeMode={false}
                selected={false}
              >
                {renderArticleBlockContent(block)}
              </ArticleBlockShell>
            );
          })}

      {composeMode ? (
        <DropZone
          index={blocks.length}
          active={dragOverIndex === blocks.length}
          expanded={dropZonesExpanded}
          onDrop={(index, catalogId) => onDropAtIndex?.(index, catalogId)}
          onDragOver={(index) => onDragOverIndex?.(index)}
          onDragLeave={handleDragLeave}
        />
      ) : null}
    </div>
  );
}
