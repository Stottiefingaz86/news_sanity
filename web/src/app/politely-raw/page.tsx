import { PolitelyRawPageContent } from "@/components/news/politely-raw/politely-raw-page-content";
import { getPolitelyRawPage } from "@/lib/sanity/articles";
import { getNewsSettings } from "@/lib/sanity/news-settings";

export const metadata = {
  title: "Politely RAW | BetOnline News",
  description:
    "Watch Politely RAW with Pacman Jones — unfiltered sports talk, interviews, and league breakdowns.",
};

export default async function PolitelyRawPage() {
  const [page, settings] = await Promise.all([getPolitelyRawPage(), getNewsSettings()]);

  const fallback = {
    title: "Politely RAW",
    slug: "politely-raw",
    description:
      "Watch Politely RAW with Pacman Jones — unfiltered sports talk, interviews, and league breakdowns.",
    videos: [],
  };

  return (
    <PolitelyRawPageContent page={page ?? fallback} settings={settings} />
  );
}
