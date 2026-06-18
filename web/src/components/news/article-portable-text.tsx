import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { portableTextComponents } from "@/components/news/article-portable-text-components";

type ArticlePortableTextProps = {
  value?: PortableTextBlock[];
};

export function ArticlePortableText({ value }: ArticlePortableTextProps) {
  if (!value?.length) return null;
  return <PortableText value={value} components={portableTextComponents} />;
}
