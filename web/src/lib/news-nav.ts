import type { Icon } from "@tabler/icons-react";
import {
  IconBook2,
  IconCalendarEvent,
  IconMicrophone,
  IconNews,
} from "@tabler/icons-react";
import { assetPath } from "@/lib/base-path";

export type NewsLeague = {
  label: string;
  slug: string;
  href: string;
  icon: string;
};

export type NewsFeaturedItem = {
  label: string;
  slug: string;
  href: string;
  icon: Icon | string;
};

export type NewsSectionNavItem = {
  label: string;
  slug: string;
  href: string;
  icon?: string;
  kind: "home" | "editorial" | "league";
};

/** League list under “In the News” — icons from BOL sports (`/banners/sports_league/`). */
export const newsLeagues: NewsLeague[] = [
  {
    label: "NFL",
    slug: "nfl",
    href: "/category/nfl",
    icon: assetPath("/banners/sports_league/NFL.svg"),
  },
  {
    label: "NHL",
    slug: "nhl",
    href: "/category/nhl",
    icon: assetPath("/banners/sports_league/NHL.svg"),
  },
  {
    label: "NBA",
    slug: "nba",
    href: "/category/nba",
    icon: assetPath("/banners/sports_league/nba.svg"),
  },
  {
    label: "MLB",
    slug: "mlb",
    href: "/category/mlb",
    icon: assetPath("/banners/sports_league/MLB.svg"),
  },
  {
    label: "NCAAF",
    slug: "ncaaf",
    href: "/category/ncaaf",
    icon: assetPath("/banners/sports_league/NFL.svg"),
  },
];

const worldCupIcon = assetPath("/logos/world-cup-2026.svg");

export const WORLD_CUP_NEWS_HREF = "/category/world-cup";

/** Featured editorial links — mirrors BOL sports “Features” sidebar group. */
export const newsFeaturedItems: NewsFeaturedItem[] = [
  {
    label: "World Cup 2026",
    slug: "world-cup",
    href: WORLD_CUP_NEWS_HREF,
    icon: worldCupIcon,
  },
];

/** Site-wide horizontal sub-nav — same items and order on every page. */
export const newsSectionNavItems: NewsSectionNavItem[] = [
  { label: "Latest", slug: "latest", href: "/", kind: "home" },
  {
    label: "World Cup 2026",
    slug: "world-cup",
    href: WORLD_CUP_NEWS_HREF,
    icon: worldCupIcon,
    kind: "editorial",
  },
  ...newsLeagues.map((league) => ({
    label: league.label,
    slug: league.slug,
    href: league.href,
    icon: league.icon,
    kind: "league" as const,
  })),
  {
    label: "Expert Analysis",
    slug: "expert-analysis",
    href: "/category/expert-analysis",
    kind: "editorial",
  },
  { label: "News", slug: "news", href: "/category/news", kind: "editorial" },
];

export function getLeagueSlugFromPathname(pathname: string) {
  const match = pathname.match(/^\/category\/([^/]+)/);
  return match?.[1] ?? null;
}

export function getNewsSectionNavConfig(): {
  heading: string;
  items: NewsSectionNavItem[];
} {
  return { heading: "In the News", items: newsSectionNavItems };
}

export function resolveActiveSectionSlug(categorySlugs?: string[]) {
  if (!categorySlugs?.length) return undefined;

  const slugSet = new Set(categorySlugs);
  return newsSectionNavItems.find(
    (item) => item.slug !== "latest" && slugSet.has(item.slug),
  )?.slug;
}

export function isNewsSectionNavActive(
  pathname: string,
  item: NewsSectionNavItem,
  activeSectionSlug?: string,
) {
  if (activeSectionSlug) {
    return item.slug === activeSectionSlug;
  }

  if (item.kind === "home") {
    return pathname === "/" || pathname === "";
  }

  return isNavItemActive(pathname, item.href);
}

export type NewsNavLink = {
  type: "link";
  label: string;
  href: string;
  icon: Icon | string;
};

export type NewsNavCollapsible = {
  type: "collapsible";
  id: string;
  label: string;
  icon: Icon;
  children: NewsLeague[];
};

export type NewsNavItem = NewsNavLink | NewsNavCollapsible;

export const newsNavItems: NewsNavItem[] = [
  {
    type: "collapsible",
    id: "in-the-news",
    label: "In the News",
    icon: IconNews,
    children: newsLeagues,
  },
  {
    type: "link",
    label: "Upcoming Games",
    href: "/upcoming-games",
    icon: IconCalendarEvent,
  },
  {
    type: "link",
    label: "Betting Resources",
    href: "/betting-resources",
    icon: IconBook2,
  },
  {
    type: "link",
    label: "Politely RAW",
    href: "/politely-raw",
    icon: IconMicrophone,
  },
];

export function isNewsLeaguePath(pathname: string, slug: string) {
  return (
    pathname === `/category/${slug}` ||
    pathname.startsWith(`/category/${slug}/`)
  );
}

export function isNewsFeaturedItemActive(pathname: string, item: NewsFeaturedItem) {
  if (item.href === "/") {
    return pathname === "/" || pathname === "";
  }

  return isNavItemActive(pathname, item.href);
}

export function isNewsFeaturedSection(pathname: string) {
  return newsFeaturedItems.some((item) => isNewsFeaturedItemActive(pathname, item));
}

export function isInTheNewsSection(pathname: string) {
  return newsLeagues.some((league) => isNewsLeaguePath(pathname, league.slug));
}

export function isNavItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/" || pathname === "";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** World Cup SVG is dark gray — invert only that slug, never league logos. */
export function newsNavIconInvertClass(
  slug: string,
  opts: { isDark?: boolean; active?: boolean; onDarkChrome?: boolean },
): string | undefined {
  if (slug !== "world-cup") return undefined;
  if (opts.onDarkChrome || opts.isDark || opts.active) {
    return "brightness-0 invert";
  }
  return undefined;
}
