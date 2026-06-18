import { BettingResourcesPageContent } from "@/components/news/betting-resources-page-content";
import { getNewsSettings } from "@/lib/sanity/news-settings";

export const metadata = {
  title: "Betting Resources | BetOnline News",
  description:
    "Guides and betting resources for baseball, football, hockey, UFC, casino, crypto, and more.",
};

export default async function BettingResourcesPage() {
  const settings = await getNewsSettings();

  return <BettingResourcesPageContent settings={settings} />;
}
