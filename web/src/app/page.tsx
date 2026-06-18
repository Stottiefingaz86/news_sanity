import { HomePageContent } from "@/components/home/home-page-content";
import {
  getHomepageArticles,
  getSanityConnectionInfo,
} from "@/lib/sanity/articles";
import { getNewsSettings } from "@/lib/sanity/news-settings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, articles] = await Promise.all([
    getNewsSettings(),
    getHomepageArticles(),
  ]);

  return (
    <HomePageContent
      settings={settings}
      articles={articles}
      sanityProject={getSanityConnectionInfo()}
    />
  );
}
