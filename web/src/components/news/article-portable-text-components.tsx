import type { PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { CustomBlockRenderer } from "@/components/news/blocks/custom-block-renderer";
import type { ArticleCustomBlock } from "@/lib/article-blocks/types";

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function blockChildrenToText(value: PortableTextBlock) {
  if (!("children" in value) || !Array.isArray(value.children)) return "";

  return value.children
    .map((child) => ("text" in child ? child.text : ""))
    .join("")
    .trim();
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 font-serif text-[1.0625rem] leading-[1.75] text-[var(--ds-content-foreground,#0a0a0a)] last:mb-0 [text-wrap:pretty]">
        {children}
      </p>
    ),
    h2: ({ children, value }) => {
      const id = slugifyHeading(blockChildrenToText(value));
      return (
        <h2
          id={id || undefined}
          className="mb-4 mt-10 scroll-mt-28 font-serif text-[1.625rem] font-bold leading-tight text-[var(--ds-content-foreground,#0a0a0a)] md:text-[1.875rem] [text-wrap:balance]"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const id = slugifyHeading(blockChildrenToText(value));
      return (
        <h3
          id={id || undefined}
          className="mb-3 mt-8 scroll-mt-28 font-serif text-xl font-bold leading-snug text-[var(--ds-content-foreground,#0a0a0a)] md:text-[1.375rem] [text-wrap:balance]"
        >
          {children}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="mb-2 mt-6 text-base font-semibold text-[var(--ds-content-foreground,#0a0a0a)] md:text-lg">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-y border-[var(--ds-content-card-border,#e5e5e5)] py-5 font-serif text-lg italic leading-relaxed text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:pretty]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 mt-1 list-disc space-y-2 pl-[1.35rem] font-serif text-[1.0625rem] leading-[1.75] text-[var(--ds-content-foreground,#0a0a0a)] marker:text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:pretty]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 mt-1 list-decimal space-y-2 pl-[1.35rem] font-serif text-[1.0625rem] leading-[1.75] text-[var(--ds-content-foreground,#0a0a0a)] [text-wrap:pretty]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-0.5">{children}</li>,
    number: ({ children }) => <li className="pl-0.5">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      return (
        <a
          href={href}
          className="font-medium text-[var(--ds-primary,#ee3536)] underline-offset-2 hover:underline"
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    contentGrid: ({ value }) => (
      <CustomBlockRenderer block={value as ArticleCustomBlock} />
    ),
    sectionHeader: ({ value }) => (
      <CustomBlockRenderer block={value as ArticleCustomBlock} />
    ),
    pullQuote: ({ value }) => (
      <CustomBlockRenderer block={value as ArticleCustomBlock} />
    ),
    marquee: ({ value }) => (
      <CustomBlockRenderer block={value as ArticleCustomBlock} />
    ),
    oddsList: ({ value }) => (
      <CustomBlockRenderer block={value as ArticleCustomBlock} />
    ),
  },
};
