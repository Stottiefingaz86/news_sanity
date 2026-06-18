"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  IconCopy,
  IconLayoutGrid,
  IconRefresh,
  IconX,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { ArticleBodyRenderer } from "@/components/news/article-body-renderer";
import { ComposeBlockInspector } from "@/components/news/compose/compose-block-inspector";
import { ComposePalette } from "@/components/news/compose/compose-palette";
import { useComposeBlocks } from "@/components/news/compose/use-compose-blocks";
import { Button } from "@/components/ui/button";
import type { ArticleBodyBlock } from "@/lib/article-blocks/types";
import { cn } from "@/lib/utils";

type ArticleComposeShellProps = {
  slug: string;
  initialBlocks?: ArticleBodyBlock[];
  children?: React.ReactNode;
};

export function ArticleComposeShell({
  slug,
  initialBlocks = [],
  children,
}: ArticleComposeShellProps) {
  const searchParams = useSearchParams();
  const composeMode = searchParams.get("compose") === "1";

  const {
    blocks,
    insertBlock,
    replaceBlock,
    updateBlock,
    removeBlock,
    resetBlocks,
    exportJson,
    addGridItem,
  } = useComposeBlocks(slug, initialBlocks);

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const selectedBlock = useMemo(
    () => blocks.find((block) => "_key" in block && block._key === selectedKey) ?? null,
    [blocks, selectedKey],
  );

  const insertIndex = useMemo(() => {
    if (selectedKey) {
      const selectedIndex = blocks.findIndex(
        (block) => "_key" in block && block._key === selectedKey,
      );
      if (selectedIndex >= 0) return selectedIndex + 1;
    }
    return blocks.length;
  }, [blocks, selectedKey]);

  const handleInsert = (catalogId: string, index = insertIndex) => {
    const newKey = insertBlock(index, catalogId);
    if (newKey) setSelectedKey(newKey);
    setDragOverIndex(null);
    setPaletteOpen(false);
  };

  if (!composeMode) {
    return children ?? (
      <ArticleBodyRenderer blocks={initialBlocks} composeMode={false} />
    );
  }

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(exportJson);
      toast.success("Block JSON copied — paste into Sanity body field");
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };

  return (
    <div className="relative">
      <div className="mb-4 rounded-xl border border-[var(--ds-primary,#ee3536)]/30 bg-[var(--ds-primary,#ee3536)]/6 px-4 py-3 text-sm text-[var(--ds-content-foreground,#0a0a0a)]">
        <strong className="font-semibold">Compose mode.</strong> Click or drag blocks
        from the layout library, select blocks to change component type, then copy JSON
        into Sanity when ready.
      </div>

      <ArticleBodyRenderer
        blocks={blocks}
        composeMode
        selectedKey={selectedKey}
        onSelectBlock={setSelectedKey}
        onDropAtIndex={(index, catalogId) => handleInsert(catalogId, index)}
        dragOverIndex={dragOverIndex}
        onDragOverIndex={setDragOverIndex}
        dropZonesExpanded={paletteOpen || dragOverIndex !== null}
      />

      <ComposePalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onInsertBlock={(catalogId) => handleInsert(catalogId)}
      />

      <ComposeBlockInspector
        block={selectedBlock}
        onUpdate={updateBlock}
        onReplace={replaceBlock}
        onRemove={(key) => {
          removeBlock(key);
          setSelectedKey(null);
        }}
        onAddGridItem={addGridItem}
        onClose={() => setSelectedKey(null)}
      />

      <div className="pointer-events-none fixed bottom-6 right-6 z-[240] flex flex-col items-end gap-2">
        <div
          className={cn(
            "pointer-events-auto flex flex-wrap justify-end gap-2 transition-all",
            paletteOpen ? "opacity-100" : "opacity-0",
          )}
        >
          <Button type="button" size="sm" variant="outline" onClick={copyJson}>
            <IconCopy className="size-4" strokeWidth={1.5} />
            Copy JSON
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={resetBlocks}>
            <IconRefresh className="size-4" strokeWidth={1.5} />
            Reset
          </Button>
        </div>

        <Button
          type="button"
          size="lg"
          className={cn(
            "pointer-events-auto h-14 rounded-full px-5 shadow-xl",
            paletteOpen && "bg-[var(--ds-content-foreground,#0a0a0a)]",
          )}
          onClick={() => setPaletteOpen((open) => !open)}
        >
          {paletteOpen ? (
            <>
              <IconX className="size-5" strokeWidth={1.5} />
              Close
            </>
          ) : (
            <>
              <IconLayoutGrid className="size-5" strokeWidth={1.5} />
              Layout blocks
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
