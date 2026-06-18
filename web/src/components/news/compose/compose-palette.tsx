"use client";

import {
  IconCopy,
  IconGridDots,
  IconLayoutGrid,
  IconLink,
  IconMovie,
  IconPhoto,
  IconQuestionMark,
  IconQuote,
  IconSpeakerphone,
  IconTypography,
} from "@tabler/icons-react";
import {
  BLOCK_CATALOG,
  BLOCK_CATEGORIES,
  DRAG_BLOCK_TYPE,
} from "@/lib/article-blocks/block-catalog";
import { cn } from "@/lib/utils";

const iconMap = {
  grid: IconLayoutGrid,
  bento: IconGridDots,
  header: IconTypography,
  quote: IconQuote,
  marquee: IconLayoutGrid,
  video: IconMovie,
  image: IconPhoto,
  cta: IconSpeakerphone,
  faq: IconQuestionMark,
  related: IconLink,
  text: IconTypography,
} as const;

type ComposePaletteProps = {
  open: boolean;
  onClose: () => void;
  onInsertBlock: (catalogId: string) => void;
};

export function ComposePalette({ open, onClose, onInsertBlock }: ComposePaletteProps) {
  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close block library"
        className="pointer-events-none fixed inset-0 z-[220] bg-black/10"
        tabIndex={-1}
      />
      <aside className="pointer-events-auto fixed bottom-24 right-6 z-[230] w-[min(22rem,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] shadow-2xl">
        <div className="border-b border-[var(--ds-content-card-border,#e5e5e5)] px-4 py-3">
          <p className="text-sm font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
            Layout blocks
          </p>
          <p className="mt-1 text-xs leading-5 text-[var(--ds-content-muted,#737373)]">
            Click or drag a block into the content area. Drop zones appear between
            sections while this panel is open.
          </p>
        </div>
        <div className="max-h-[min(24rem,50vh)] overflow-y-auto p-3">
          {BLOCK_CATEGORIES.map((category) => {
            const entries = BLOCK_CATALOG.filter((entry) => entry.category === category.id);
            if (!entries.length) return null;

            return (
              <div key={category.id} className="mb-4 last:mb-0">
                <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--ds-content-muted,#737373)]">
                  {category.label}
                </p>
                <ul className="space-y-2">
                  {entries.map((entry) => {
                    const Icon = iconMap[entry.icon];
                    return (
                      <li key={entry.id}>
                        <button
                          type="button"
                          draggable
                          onClick={() => onInsertBlock(entry.id)}
                          onDragStart={(event) => {
                            event.dataTransfer.setData(DRAG_BLOCK_TYPE, entry.id);
                            event.dataTransfer.effectAllowed = "copy";
                          }}
                          className={cn(
                            "flex w-full cursor-grab items-start gap-3 rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] p-3 text-left",
                            "transition-colors active:cursor-grabbing hover:border-[var(--ds-primary,#ee3536)]/40 hover:bg-[var(--ds-primary,#ee3536)]/5",
                          )}
                        >
                          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--ds-primary,#ee3536)]/10 text-[var(--ds-primary,#ee3536)]">
                            <Icon className="size-4" strokeWidth={1.5} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
                              {entry.label}
                            </p>
                            <p className="mt-0.5 text-xs leading-5 text-[var(--ds-content-muted,#737373)]">
                              {entry.description}
                            </p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="border-t border-[var(--ds-content-card-border,#e5e5e5)] px-4 py-3 text-xs text-[var(--ds-content-muted,#737373)]">
          <IconCopy className="mr-1 inline size-3.5 align-[-2px]" />
          Select a placed block to change its component type or edit fields.
        </div>
      </aside>
    </>
  );
}
