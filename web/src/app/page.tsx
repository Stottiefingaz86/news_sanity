import { HomePageContent } from "@/components/home/home-page-content";
import {
  getHomepageArticles,
  getPolitelyRawVideos,
  getSanityConnectionInfo,
} from "@/lib/sanity/articles";
import { getNewsSettings } from "@/lib/sanity/news-settings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, articles, politelyRawVideos] = await Promise.all([
    getNewsSettings(),
    getHomepageArticles(),
    getPolitelyRawVideos(6),
  ]);

  return (
    <HomePageContent
      settings={settings}
      articles={articles}
      politelyRawVideos={politelyRawVideos}
      sanityProject={getSanityConnectionInfo()}
    />
  );
}
