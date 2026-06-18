import type { Icon } from "@tabler/icons-react";
import {
  IconBook2,
  IconCalendarEvent,
  IconHome,
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

/** Horizontal sub-nav destinations — editorial sections plus league sports news. */
export const newsSectionNavItems: NewsSectionNavItem[] = [
  { label: "Latest", slug: "latest", href: "/", kind: "home" },
  {
    label: "Expert Analysis",
    slug: "expert-analysis",
    href: "/category/expert-analysis",
    kind: "editorial",
  },
  { label: "News", slug: "news", href: "/category/news", kind: "editorial" },
  ...newsLeagues.map((league) => ({
    label: league.label,
    slug: league.slug,
    href: league.href,
    icon: league.icon,
    kind: "league" as const,
  })),
];

const worldCupIcon = assetPath("/banners/sports_league/copa.svg");

export const WORLD_CUP_NEWS_HREF = "/ranking-10-teams-best-chance-win-world-cup";

/** Homepage sub-nav — featured comp first, then sidebar leagues. */
export const homeSectionNavItems: NewsSectionNavItem[] = [
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

function leagueSectionNavItems(league: NewsLeague): NewsSectionNavItem[] {
  return [
    {
      label: "Overview",
      slug: `${league.slug}-overview`,
      href: league.href,
      icon: league.icon,
      kind: "league",
    },
    {
      label: "Latest",
      slug: `${league.slug}-latest`,
      href: league.href,
      kind: "editorial",
    },
    {
      label: "Scores",
      slug: `${league.slug}-scores`,
      href: "/upcoming-games",
      kind: "editorial",
    },
    {
      label: "Standings",
      slug: `${league.slug}-standings`,
      href: league.href,
      kind: "editorial",
    },
    {
      label: "Picks & Props",
      slug: `${league.slug}-picks`,
      href: "/category/expert-analysis",
      kind: "editorial",
    },
  ];
}

export function getLeagueSlugFromPathname(pathname: string) {
  const match = pathname.match(/^\/category\/([^/]+)/);
  return match?.[1] ?? null;
}

export function getNewsSectionNavConfig(pathname: string): {
  heading: string;
  items: NewsSectionNavItem[];
} {
  if (pathname === "/" || pathname === "") {
    return { heading: "In the News", items: homeSectionNavItems };
  }

  const leagueSlug = getLeagueSlugFromPathname(pathname);
  if (leagueSlug) {
    const league = newsLeagues.find((item) => item.slug === leagueSlug);
    if (league) {
      return { heading: league.label, items: leagueSectionNavItems(league) };
    }
  }

  return { heading: "In the News", items: newsSectionNavItems };
}

export function isNewsSectionNavActive(pathname: string, item: NewsSectionNavItem) {
  if (item.kind === "home") {
    return pathname === "/" || pathname === "";
  }

  if (item.slug.endsWith("-overview")) {
    return pathname === item.href;
  }

  if (item.slug.endsWith("-latest") || item.slug.endsWith("-standings")) {
    return false;
  }

  if (item.slug === "world-cup") {
    return pathname.includes("ranking-10-teams-best-chance-win-world-cup");
  }

  return isNavItemActive(pathname, item.href);
}

export type NewsNavLink = {
  type: "link";
  label: string;
  href: string;
  icon: Icon;
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
  { type: "link", label: "Home", href: "/", icon: IconHome },
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

export function isInTheNewsSection(pathname: string) {
  return (
    pathname === "/category/news" ||
    pathname.startsWith("/category/news/") ||
    newsLeagues.some((league) => isNewsLeaguePath(pathname, league.slug))
  );
}

export function isNavItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/" || pathname === "";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
