import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPageContent } from "@/components/news/category-page-content";
import { getCategoryPage, getCategorySlugs } from "@/lib/sanity/articles";
import { getNewsSettings } from "@/lib/sanity/news-settings";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryPage(slug);

  if (!category) {
    return { title: "Category not found" };
  }

  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, settings] = await Promise.all([
    getCategoryPage(slug),
    getNewsSettings(),
  ]);

  if (!category) notFound();

  return <CategoryPageContent category={category} settings={settings} />;
}
