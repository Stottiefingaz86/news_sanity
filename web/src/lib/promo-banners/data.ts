import { assetPath } from "@/lib/base-path";

export type CrossSellBanner = {
  id: string;
  title: string;
  image: string;
  href: string;
  alt?: string;
};

const BOL_PROMOS = "https://www.betonline.ag/promos";
const BOL_SPORTSBOOK = "https://www.betonline.ag/sportsbook";
const BOL_VIP = "https://www.betonline.ag/vip-rewards";

/** Cross-sell creatives from `web/public/banner{1-4}.jpg`. */
export const crossSellBanners: CrossSellBanner[] = [
  {
    id: "banner-1",
    title: "FIFA World Cup",
    image: assetPath("/banner1.jpg"),
    href: BOL_SPORTSBOOK,
    alt: "FIFA World Cup — Live odds at BetOnline",
  },
  {
    id: "banner-2",
    title: "World Cup Hub",
    image: assetPath("/banner2.jpg"),
    href: BOL_SPORTSBOOK,
    alt: "World Cup Hub — Game odds, props, and futures",
  },
  {
    id: "banner-3",
    title: "Prop Shop",
    image: assetPath("/banner3.jpg"),
    href: BOL_SPORTSBOOK,
    alt: "Prop Shop — Create your same game parlays",
  },
  {
    id: "banner-4",
    title: "VIP Rewards",
    image: assetPath("/banner4.jpg"),
    href: BOL_VIP,
    alt: "Millions in cash rewards paid out every month",
  },
];
