"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqBlock } from "@/lib/article-blocks/types";

export function FaqBlockView({ value }: { value: FaqBlock }) {
  const items = value.items ?? [];

  if (!items.length) return null;

  return (
    <section className="my-10 rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] p-1">
      {value.title ? (
        <h3 className="px-4 pb-2 pt-4 font-serif text-xl text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:balance]">
          {value.title}
        </h3>
      ) : null}
      <Accordion defaultValue={[items[0]?.question ?? "item-0"]} className="px-3 pb-2">
        {items.map((item, index) => {
          const itemValue = item.question ?? `item-${index}`;
          return (
            <AccordionItem key={itemValue} value={itemValue}>
              <AccordionTrigger className="py-4 text-[var(--ds-content-foreground,#0a0a0a)] hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--ds-content-muted,#737373)]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
