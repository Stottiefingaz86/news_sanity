"use client";

import { TopicCategoryLanding } from "@/components/news/editorial-category-landing";
import type { NewsSettings } from "@/lib/sanity/news-settings";
import type { CategoryPageData } from "@/lib/sanity/types";

type CategoryPageContentProps = {
  category: CategoryPageData;
  settings: NewsSettings;
};

export function CategoryPageContent({ category, settings }: CategoryPageContentProps) {
  return <TopicCategoryLanding category={category} settings={settings} />;
}
