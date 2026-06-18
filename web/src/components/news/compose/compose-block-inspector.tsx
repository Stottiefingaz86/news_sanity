"use client";

import type {
  ArticleBodyBlock,
  ContentGridBlock,
  CtaBlock,
  DividerBlock,
  FaqBlock,
  MarqueeBlock,
  ProseBodyBlock,
  PullQuoteBlock,
  RelatedArticlesBlock,
  SectionHeaderBlock,
  StandfirstBlock,
  TextHeadingBlock,
  VideoEmbedBlock,
} from "@/lib/article-blocks/types";
import { isCustomBlock } from "@/lib/article-blocks/types";
import {
  BLOCK_CATALOG,
} from "@/lib/article-blocks/block-catalog";
import { getCatalogIdForBlock } from "@/lib/article-blocks/compose-utils";
import { Button } from "@/components/ui/button";

type ComposeBlockInspectorProps = {
  block: ArticleBodyBlock | null;
  onUpdate: (key: string, patch: Partial<ArticleBodyBlock>) => void;
  onReplace: (key: string, catalogId: string) => void;
  onRemove: (key: string) => void;
  onAddGridItem: (gridKey: string) => void;
  onClose: () => void;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--ds-content-muted,#737373)]">
      {children}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value ?? ""}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] px-3 py-2 text-sm text-[var(--ds-content-foreground,#0a0a0a)] outline-none focus:border-[var(--ds-primary,#ee3536)]"
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
}: {
  value?: string | number;
  onChange: (value: string) => void;
  options: { label: string; value: string | number }[];
}) {
  return (
    <select
      value={value ?? options[0]?.value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] px-3 py-2 text-sm text-[var(--ds-content-foreground,#0a0a0a)] outline-none focus:border-[var(--ds-primary,#ee3536)]"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function ComponentSection({
  block,
  onReplace,
}: {
  block: ArticleBodyBlock;
  onReplace: (catalogId: string) => void;
}) {
  const currentId = getCatalogIdForBlock(block);

  return (
    <div className="rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] p-3">
      <FieldLabel>Component</FieldLabel>
      <SelectInput
        value={currentId ?? undefined}
        onChange={onReplace}
        options={BLOCK_CATALOG.map((entry) => ({
          label: entry.label,
          value: entry.id,
        }))}
      />
      <p className="mt-2 text-xs leading-5 text-[var(--ds-content-muted,#737373)]">
        Switch block type. Content resets to the template for the new component.
      </p>
    </div>
  );
}

export function ComposeBlockInspector({
  block,
  onUpdate,
  onReplace,
  onRemove,
  onAddGridItem,
  onClose,
}: ComposeBlockInspectorProps) {
  if (!block || !("_key" in block) || !block._key) return null;

  const key = block._key;
  const isProse = !isCustomBlock(block);
  const title = isProse
    ? "Prose paragraph"
    : BLOCK_CATALOG.find((entry) => entry.id === getCatalogIdForBlock(block))?.label ??
      block._type.replace(/([A-Z])/g, " $1").trim();

  return (
    <aside className="pointer-events-auto fixed bottom-24 left-6 z-[230] w-[min(22rem,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[var(--ds-content-card-border,#e5e5e5)] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[var(--ds-content-foreground,#0a0a0a)]">
            {title}
          </p>
          <p className="text-xs text-[var(--ds-content-muted,#737373)]">
            Block settings
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-medium text-[var(--ds-content-muted,#737373)] hover:text-[var(--ds-content-foreground,#0a0a0a)]"
        >
          Close
        </button>
      </div>

      <div className="max-h-[min(28rem,55vh)] space-y-4 overflow-y-auto p-4">
        {isProse ? (
          <p className="text-sm leading-6 text-[var(--ds-content-muted,#737373)]">
            Rich text paragraphs come from Sanity. Replace this block with a layout
            component below, or remove it and paste updated JSON back into Sanity.
          </p>
        ) : (
          <ComponentSection block={block} onReplace={(catalogId) => onReplace(key, catalogId)} />
        )}

        {block._type === "standfirst" ? (
          <div>
            <FieldLabel>Standfirst / deck</FieldLabel>
            <textarea
              value={(block as StandfirstBlock).text ?? ""}
              onChange={(event) =>
                onUpdate(key, { text: event.target.value } as Partial<StandfirstBlock>)
              }
              rows={4}
              className="w-full rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] px-3 py-2 text-sm"
            />
          </div>
        ) : null}

        {block._type === "textHeading" ? (
          <>
            <div>
              <FieldLabel>Heading</FieldLabel>
              <TextInput
                value={(block as TextHeadingBlock).text}
                onChange={(text) =>
                  onUpdate(key, { text } as Partial<TextHeadingBlock>)
                }
              />
            </div>
            <div>
              <FieldLabel>Level</FieldLabel>
              <SelectInput
                value={(block as TextHeadingBlock).level ?? "h2"}
                onChange={(level) =>
                  onUpdate(key, { level } as Partial<TextHeadingBlock>)
                }
                options={[
                  { label: "Section (H2)", value: "h2" },
                  { label: "Subsection (H3)", value: "h3" },
                ]}
              />
            </div>
          </>
        ) : null}

        {block._type === "proseBody" ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>Columns</FieldLabel>
                <SelectInput
                  value={String((block as ProseBodyBlock).columns ?? 1)}
                  onChange={(columns) =>
                    onUpdate(key, {
                      columns: Number(columns) as ProseBodyBlock["columns"],
                    } as Partial<ProseBodyBlock>)
                  }
                  options={[
                    { label: "Single", value: "1" },
                    { label: "Two", value: "2" },
                    { label: "Three", value: "3" },
                  ]}
                />
              </div>
              <div>
                <FieldLabel>Drop cap</FieldLabel>
                <SelectInput
                  value={(block as ProseBodyBlock).dropCap ? "yes" : "no"}
                  onChange={(value) =>
                    onUpdate(key, {
                      dropCap: value === "yes",
                    } as Partial<ProseBodyBlock>)
                  }
                  options={[
                    { label: "Off", value: "no" },
                    { label: "On", value: "yes" },
                  ]}
                />
              </div>
            </div>
            <div className="space-y-3">
              <FieldLabel>Paragraphs</FieldLabel>
              {(block as ProseBodyBlock).paragraphs?.map((paragraph, index) => (
                <div
                  key={`${key}-p-${index}`}
                  className="rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] p-3"
                >
                  <p className="mb-2 text-xs font-semibold text-[var(--ds-content-muted,#737373)]">
                    Paragraph {index + 1}
                  </p>
                  <textarea
                    value={paragraph ?? ""}
                    onChange={(event) => {
                      const body = block as ProseBodyBlock;
                      const paragraphs = [...(body.paragraphs ?? [])];
                      paragraphs[index] = event.target.value;
                      onUpdate(key, { paragraphs } as Partial<ProseBodyBlock>);
                    }}
                    rows={3}
                    className="w-full rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] px-3 py-2 text-sm"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  const body = block as ProseBodyBlock;
                  onUpdate(key, {
                    paragraphs: [...(body.paragraphs ?? []), ""],
                  } as Partial<ProseBodyBlock>);
                }}
              >
                Add paragraph
              </Button>
            </div>
          </>
        ) : null}

        {block._type === "sectionHeader" ? (
          <>
            <div>
              <FieldLabel>Kicker</FieldLabel>
              <TextInput
                value={(block as SectionHeaderBlock).kicker}
                onChange={(kicker) => onUpdate(key, { kicker } as Partial<SectionHeaderBlock>)}
              />
            </div>
            <div>
              <FieldLabel>Title</FieldLabel>
              <TextInput
                value={(block as SectionHeaderBlock).title}
                onChange={(title) => onUpdate(key, { title } as Partial<SectionHeaderBlock>)}
              />
            </div>
            <div>
              <FieldLabel>Subtitle</FieldLabel>
              <textarea
                value={(block as SectionHeaderBlock).subtitle ?? ""}
                onChange={(event) =>
                  onUpdate(key, { subtitle: event.target.value } as Partial<SectionHeaderBlock>)
                }
                rows={3}
                className="w-full rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>Size</FieldLabel>
                <SelectInput
                  value={(block as SectionHeaderBlock).size}
                  onChange={(size) =>
                    onUpdate(key, { size } as Partial<SectionHeaderBlock>)
                  }
                  options={[
                    { label: "Display", value: "display" },
                    { label: "Large", value: "large" },
                    { label: "Medium", value: "medium" },
                  ]}
                />
              </div>
              <div>
                <FieldLabel>Align</FieldLabel>
                <SelectInput
                  value={(block as SectionHeaderBlock).align}
                  onChange={(align) =>
                    onUpdate(key, { align } as Partial<SectionHeaderBlock>)
                  }
                  options={[
                    { label: "Left", value: "left" },
                    { label: "Center", value: "center" },
                  ]}
                />
              </div>
            </div>
          </>
        ) : null}

        {block._type === "pullQuote" ? (
          <>
            <div>
              <FieldLabel>Quote</FieldLabel>
              <textarea
                value={(block as PullQuoteBlock).quote ?? ""}
                onChange={(event) =>
                  onUpdate(key, { quote: event.target.value } as Partial<PullQuoteBlock>)
                }
                rows={4}
                className="w-full rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <FieldLabel>Attribution</FieldLabel>
              <TextInput
                value={(block as PullQuoteBlock).attribution}
                onChange={(attribution) =>
                  onUpdate(key, { attribution } as Partial<PullQuoteBlock>)
                }
              />
            </div>
            <div>
              <FieldLabel>Style</FieldLabel>
              <SelectInput
                value={(block as PullQuoteBlock).variant}
                onChange={(variant) =>
                  onUpdate(key, { variant } as Partial<PullQuoteBlock>)
                }
                options={[
                  { label: "Highlight", value: "highlight" },
                  { label: "Boxed", value: "boxed" },
                  { label: "Minimal", value: "minimal" },
                ]}
              />
            </div>
          </>
        ) : null}

        {block._type === "contentGrid" ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>Layout</FieldLabel>
                <SelectInput
                  value={(block as ContentGridBlock).layout}
                  onChange={(layout) =>
                    onUpdate(key, { layout } as Partial<ContentGridBlock>)
                  }
                  options={[
                    { label: "Uniform", value: "uniform" },
                    { label: "Masonry", value: "masonry" },
                    { label: "Bento", value: "bento" },
                  ]}
                />
              </div>
              <div>
                <FieldLabel>Columns</FieldLabel>
                <SelectInput
                  value={(block as ContentGridBlock).columns}
                  onChange={(columns) =>
                    onUpdate(key, { columns: Number(columns) as 2 | 3 | 4 })
                  }
                  options={[
                    { label: "2 columns", value: 2 },
                    { label: "3 columns", value: 3 },
                    { label: "4 columns", value: 4 },
                  ]}
                />
              </div>
            </div>
            <div>
              <FieldLabel>Gap</FieldLabel>
              <SelectInput
                value={(block as ContentGridBlock).gap}
                onChange={(gap) => onUpdate(key, { gap } as Partial<ContentGridBlock>)}
                options={[
                  { label: "Tight", value: "tight" },
                  { label: "Normal", value: "normal" },
                  { label: "Loose", value: "loose" },
                ]}
              />
            </div>
            <div className="space-y-3">
              <FieldLabel>Tiles</FieldLabel>
              {(block as ContentGridBlock).items?.map((item, index) => (
                <div
                  key={item._key}
                  className="rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] p-3"
                >
                  <p className="mb-2 text-xs font-semibold text-[var(--ds-content-muted,#737373)]">
                    Tile {index + 1}
                  </p>
                  <TextInput
                    value={item.title}
                    onChange={(title) => {
                      const grid = block as ContentGridBlock;
                      const items = (grid.items ?? []).map((entry) =>
                        entry._key === item._key ? { ...entry, title } : entry,
                      );
                      onUpdate(key, { items } as Partial<ContentGridBlock>);
                    }}
                    placeholder="Title"
                  />
                  <textarea
                    value={item.body ?? ""}
                    onChange={(event) => {
                      const grid = block as ContentGridBlock;
                      const items = (grid.items ?? []).map((entry) =>
                        entry._key === item._key
                          ? { ...entry, body: event.target.value }
                          : entry,
                      );
                      onUpdate(key, { items } as Partial<ContentGridBlock>);
                    }}
                    rows={2}
                    placeholder="Body"
                    className="mt-2 w-full rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] px-3 py-2 text-sm"
                  />
                  {(block as ContentGridBlock).layout === "bento" ? (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <SelectInput
                        value={item.colSpan ?? 1}
                        onChange={(colSpan) => {
                          const grid = block as ContentGridBlock;
                          const items = (grid.items ?? []).map((entry) =>
                            entry._key === item._key
                              ? { ...entry, colSpan: Number(colSpan) as 1 | 2 }
                              : entry,
                          );
                          onUpdate(key, { items } as Partial<ContentGridBlock>);
                        }}
                        options={[
                          { label: "1 col span", value: 1 },
                          { label: "2 col span", value: 2 },
                        ]}
                      />
                      <SelectInput
                        value={item.rowSpan ?? 1}
                        onChange={(rowSpan) => {
                          const grid = block as ContentGridBlock;
                          const items = (grid.items ?? []).map((entry) =>
                            entry._key === item._key
                              ? { ...entry, rowSpan: Number(rowSpan) as 1 | 2 }
                              : entry,
                          );
                          onUpdate(key, { items } as Partial<ContentGridBlock>);
                        }}
                        options={[
                          { label: "1 row span", value: 1 },
                          { label: "2 row span", value: 2 },
                        ]}
                      />
                    </div>
                  ) : null}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => onAddGridItem(key)}
              >
                Add tile
              </Button>
            </div>
          </>
        ) : null}

        {block._type === "marquee" ? (
          <>
            <div>
              <FieldLabel>Items (one per line)</FieldLabel>
              <textarea
                value={((block as MarqueeBlock).items ?? []).join("\n")}
                onChange={(event) =>
                  onUpdate(key, {
                    items: event.target.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean),
                  } as Partial<MarqueeBlock>)
                }
                rows={5}
                className="w-full rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>Speed</FieldLabel>
                <SelectInput
                  value={(block as MarqueeBlock).speed}
                  onChange={(speed) => onUpdate(key, { speed } as Partial<MarqueeBlock>)}
                  options={[
                    { label: "Slow", value: "slow" },
                    { label: "Medium", value: "medium" },
                    { label: "Fast", value: "fast" },
                  ]}
                />
              </div>
              <div>
                <FieldLabel>Separator</FieldLabel>
                <TextInput
                  value={(block as MarqueeBlock).separator}
                  onChange={(separator) =>
                    onUpdate(key, { separator } as Partial<MarqueeBlock>)
                  }
                />
              </div>
            </div>
          </>
        ) : null}

        {block._type === "videoEmbed" ? (
          <>
            <div>
              <FieldLabel>Video URL</FieldLabel>
              <TextInput
                value={(block as VideoEmbedBlock).url}
                onChange={(url) => onUpdate(key, { url } as Partial<VideoEmbedBlock>)}
              />
            </div>
            <div>
              <FieldLabel>Caption</FieldLabel>
              <TextInput
                value={(block as VideoEmbedBlock).caption}
                onChange={(caption) =>
                  onUpdate(key, { caption } as Partial<VideoEmbedBlock>)
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>Aspect</FieldLabel>
                <SelectInput
                  value={(block as VideoEmbedBlock).aspect}
                  onChange={(aspect) =>
                    onUpdate(key, { aspect } as Partial<VideoEmbedBlock>)
                  }
                  options={[
                    { label: "16:9", value: "video" },
                    { label: "Square", value: "square" },
                  ]}
                />
              </div>
              <div>
                <FieldLabel>Width</FieldLabel>
                <SelectInput
                  value={(block as VideoEmbedBlock).size ?? "default"}
                  onChange={(size) =>
                    onUpdate(key, { size } as Partial<VideoEmbedBlock>)
                  }
                  options={[
                    { label: "Column", value: "default" },
                    { label: "Narrow", value: "narrow" },
                    { label: "Wide", value: "wide" },
                    { label: "Full", value: "full" },
                  ]}
                />
              </div>
            </div>
          </>
        ) : null}

        {block._type === "ctaBlock" ? (
          <>
            <div>
              <FieldLabel>Kicker</FieldLabel>
              <TextInput
                value={(block as CtaBlock).kicker}
                onChange={(kicker) => onUpdate(key, { kicker } as Partial<CtaBlock>)}
              />
            </div>
            <div>
              <FieldLabel>Title</FieldLabel>
              <TextInput
                value={(block as CtaBlock).title}
                onChange={(title) => onUpdate(key, { title } as Partial<CtaBlock>)}
              />
            </div>
            <div>
              <FieldLabel>Body</FieldLabel>
              <textarea
                value={(block as CtaBlock).body ?? ""}
                onChange={(event) =>
                  onUpdate(key, { body: event.target.value } as Partial<CtaBlock>)
                }
                rows={3}
                className="w-full rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>Button label</FieldLabel>
                <TextInput
                  value={(block as CtaBlock).buttonLabel}
                  onChange={(buttonLabel) =>
                    onUpdate(key, { buttonLabel } as Partial<CtaBlock>)
                  }
                />
              </div>
              <div>
                <FieldLabel>Variant</FieldLabel>
                <SelectInput
                  value={(block as CtaBlock).variant}
                  onChange={(variant) =>
                    onUpdate(key, { variant } as Partial<CtaBlock>)
                  }
                  options={[
                    { label: "Primary", value: "primary" },
                    { label: "Outline", value: "outline" },
                    { label: "Accent", value: "accent" },
                  ]}
                />
              </div>
            </div>
            <div>
              <FieldLabel>Button link</FieldLabel>
              <TextInput
                value={(block as CtaBlock).buttonHref}
                onChange={(buttonHref) =>
                  onUpdate(key, { buttonHref } as Partial<CtaBlock>)
                }
              />
            </div>
          </>
        ) : null}

        {block._type === "relatedArticles" ? (
          <>
            <div>
              <FieldLabel>Section title</FieldLabel>
              <TextInput
                value={(block as RelatedArticlesBlock).title}
                onChange={(title) =>
                  onUpdate(key, { title } as Partial<RelatedArticlesBlock>)
                }
              />
            </div>
            <div className="space-y-3">
              <FieldLabel>Links</FieldLabel>
              {(block as RelatedArticlesBlock).articles?.map((article, index) => (
                <div
                  key={`${article.href}-${index}`}
                  className="rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] p-3"
                >
                  <TextInput
                    value={article.title}
                    onChange={(title) => {
                      const related = block as RelatedArticlesBlock;
                      const articles = (related.articles ?? []).map((entry, i) =>
                        i === index ? { ...entry, title } : entry,
                      );
                      onUpdate(key, { articles } as Partial<RelatedArticlesBlock>);
                    }}
                    placeholder="Title"
                  />
                  <TextInput
                    value={article.href}
                    onChange={(href) => {
                      const related = block as RelatedArticlesBlock;
                      const articles = (related.articles ?? []).map((entry, i) =>
                        i === index ? { ...entry, href } : entry,
                      );
                      onUpdate(key, { articles } as Partial<RelatedArticlesBlock>);
                    }}
                    placeholder="/article-slug"
                  />
                  <div className="mt-2">
                    <TextInput
                      value={article.category}
                      onChange={(category) => {
                        const related = block as RelatedArticlesBlock;
                        const articles = (related.articles ?? []).map((entry, i) =>
                          i === index ? { ...entry, category } : entry,
                        );
                        onUpdate(key, { articles } as Partial<RelatedArticlesBlock>);
                      }}
                      placeholder="Category"
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {block._type === "faqBlock" ? (
          <>
            <div>
              <FieldLabel>Section title</FieldLabel>
              <TextInput
                value={(block as FaqBlock).title}
                onChange={(title) => onUpdate(key, { title } as Partial<FaqBlock>)}
              />
            </div>
            <div className="space-y-3">
              <FieldLabel>Questions</FieldLabel>
              {(block as FaqBlock).items?.map((item, index) => (
                <div
                  key={`${item.question}-${index}`}
                  className="rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] p-3"
                >
                  <TextInput
                    value={item.question}
                    onChange={(question) => {
                      const faq = block as FaqBlock;
                      const items = (faq.items ?? []).map((entry, i) =>
                        i === index ? { ...entry, question } : entry,
                      );
                      onUpdate(key, { items } as Partial<FaqBlock>);
                    }}
                    placeholder="Question"
                  />
                  <textarea
                    value={item.answer ?? ""}
                    onChange={(event) => {
                      const faq = block as FaqBlock;
                      const items = (faq.items ?? []).map((entry, i) =>
                        i === index ? { ...entry, answer: event.target.value } : entry,
                      );
                      onUpdate(key, { items } as Partial<FaqBlock>);
                    }}
                    rows={2}
                    placeholder="Answer"
                    className="mt-2 w-full rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] px-3 py-2 text-sm"
                  />
                </div>
              ))}
            </div>
          </>
        ) : null}

        {block._type === "dividerBlock" ? (
          <div>
            <FieldLabel>Style</FieldLabel>
            <SelectInput
              value={(block as DividerBlock).style}
              onChange={(style) => onUpdate(key, { style } as Partial<DividerBlock>)}
              options={[
                { label: "Line", value: "line" },
                { label: "Thick", value: "thick" },
                { label: "Dots", value: "dots" },
                { label: "Space", value: "space" },
              ]}
            />
          </div>
        ) : null}

        {isProse ? (
          <ComponentSection block={block} onReplace={(catalogId) => onReplace(key, catalogId)} />
        ) : null}
      </div>

      <div className="border-t border-[var(--ds-content-card-border,#e5e5e5)] p-4">
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={() => onRemove(key)}
        >
          Remove block
        </Button>
      </div>
    </aside>
  );
}
