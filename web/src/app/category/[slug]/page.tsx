import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPageContent } from "@/components/news/category-page-content";
import {
  getCategoryPageData,
  getCategorySlugs,
} from "@/lib/sanity/articles";
import { getNewsSettings } from "@/lib/sanity/news-settings";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

function parsePageParam(value?: string) {
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryPageData(slug);

  if (!category) {
    return { title: "Category not found" };
  }

  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = parsePageParam(pageParam);

  const [category, settings] = await Promise.all([
    getCategoryPageData(slug, page),
    getNewsSettings(),
  ]);

  if (!category) notFound();

  return <CategoryPageContent category={category} settings={settings} />;
}
