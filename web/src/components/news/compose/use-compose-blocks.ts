"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createBlockFromCatalog } from "@/lib/article-blocks/compose-utils";
import type { ArticleBodyBlock, ContentGridBlock } from "@/lib/article-blocks/types";
import { createBlockKey } from "@/lib/article-blocks/types";

function storageKey(slug: string) {
  return `bol-compose:${slug}`;
}

export function useComposeBlocks(slug: string, initialBlocks: ArticleBodyBlock[] = []) {
  const [blocks, setBlocks] = useState<ArticleBodyBlock[]>(initialBlocks);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setBlocks(initialBlocks);
  }, [initialBlocks]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(slug));
      if (raw) {
        const parsed = JSON.parse(raw) as ArticleBodyBlock[];
        if (Array.isArray(parsed)) setBlocks(parsed);
      }
    } catch {
      /* ignore corrupt drafts */
    }
    setHydrated(true);
  }, [slug]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(storageKey(slug), JSON.stringify(blocks));
  }, [blocks, hydrated, slug]);

  const insertBlock = useCallback((index: number, catalogId: string) => {
    const block = createBlockFromCatalog(catalogId);
    if (!block) return;
    setBlocks((prev) => {
      const next = [...prev];
      next.splice(index, 0, block as ArticleBodyBlock);
      return next;
    });
    return block._key;
  }, []);

  const replaceBlock = useCallback((key: string, catalogId: string) => {
    const block = createBlockFromCatalog(catalogId, key);
    if (!block) return;
    setBlocks((prev) =>
      prev.map((entry) =>
        "_key" in entry && entry._key === key ? (block as ArticleBodyBlock) : entry,
      ),
    );
  }, []);

  const updateBlock = useCallback((key: string, patch: Partial<ArticleBodyBlock>) => {
    setBlocks((prev) =>
      prev.map((block) =>
        "_key" in block && block._key === key
          ? ({ ...block, ...patch } as ArticleBodyBlock)
          : block,
      ),
    );
  }, []);

  const removeBlock = useCallback((key: string) => {
    setBlocks((prev) =>
      prev.filter((block) => !("_key" in block) || block._key !== key),
    );
  }, []);

  const moveBlock = useCallback((from: number, to: number) => {
    setBlocks((prev) => {
      if (from === to || from < 0 || to < 0 || from >= prev.length) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }, []);

  const resetBlocks = useCallback(() => {
    setBlocks(initialBlocks);
    localStorage.removeItem(storageKey(slug));
  }, [initialBlocks, slug]);

  const exportJson = useMemo(() => JSON.stringify(blocks, null, 2), [blocks]);

  const addGridItem = useCallback((gridKey: string) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (
          !("_key" in block) ||
          block._key !== gridKey ||
          block._type !== "contentGrid"
        ) {
          return block;
        }
        const grid = block as ContentGridBlock;
        const items = [...(grid.items ?? [])];
        items.push({
          _key: createBlockKey(),
          title: "New tile",
          body: "Supporting copy.",
          colSpan: 1,
          rowSpan: 1,
        });
        return { ...grid, items };
      }),
    );
  }, []);

  return {
    blocks,
    insertBlock,
    replaceBlock,
    updateBlock,
    removeBlock,
    moveBlock,
    resetBlocks,
    exportJson,
    addGridItem,
  };
}
