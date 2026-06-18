"use client";

import { TopicCategoryLanding } from "@/components/news/editorial-category-landing";
import type { NewsSettings } from "@/lib/sanity/news-settings";
import type { CategoryPageFullData } from "@/lib/sanity/types";

type CategoryPageContentProps = {
  category: CategoryPageFullData;
  settings: NewsSettings;
};

export function CategoryPageContent({ category, settings }: CategoryPageContentProps) {
  return <TopicCategoryLanding category={category} settings={settings} />;
}
