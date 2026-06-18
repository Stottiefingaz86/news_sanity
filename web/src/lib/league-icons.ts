import { assetPath } from "@/lib/base-path";

/** League / sport icons from BOL design system (`/banners/sports_league/`). */
const LEAGUE_ICON_PATHS: Record<string, string> = {
  mlb: assetPath("/banners/sports_league/MLB.svg"),
  nfl: assetPath("/banners/sports_league/NFL.svg"),
  nhl: assetPath("/banners/sports_league/NHL.svg"),
  nba: assetPath("/banners/sports_league/nba.svg"),
  ncaaf: assetPath("/banners/sports_league/NFL.svg"),
  soccer: assetPath("/banners/sports_league/prem.svg"),
  "premier-league": assetPath("/banners/sports_league/prem.svg"),
  mls: assetPath("/banners/sports_league/mls.svg"),
  laliga: assetPath("/banners/sports_league/laliga.svg"),
  champions: assetPath("/banners/sports_league/champions.svg"),
  "champions-league": assetPath("/banners/sports_league/champions.svg"),
  copa: assetPath("/banners/sports_league/copa.svg"),
  "world-cup": assetPath("/logos/world-cup-2026.svg"),
  f1: assetPath("/banners/sports_league/f1.svg"),
  racing: assetPath("/banners/sports_league/f1.svg"),
  tennis: assetPath("/banners/sports_league/ATP.svg"),
  atp: assetPath("/banners/sports_league/ATP.svg"),
};

const TITLE_ALIASES: Record<string, string> = {
  baseball: "mlb",
  football: "nfl",
  hockey: "nhl",
  basketball: "nba",
  soccer: "soccer",
  "expert analysis": "news",
  news: "news",
  picks: "news",
  props: "news",
};

function normalizeKey(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function leagueIconForSlug(slug?: string | null) {
  if (!slug) return null;
  const key = normalizeKey(slug);
  return LEAGUE_ICON_PATHS[key] ?? null;
}

export function leagueIconForTitle(title?: string | null) {
  if (!title) return null;
  const key = normalizeKey(title);
  return (
    LEAGUE_ICON_PATHS[key] ??
    LEAGUE_ICON_PATHS[TITLE_ALIASES[key] ?? ""] ??
    null
  );
}

export function leagueIconForCategory(categories?: { title: string; slug: string }[]) {
  const primary = categories?.[0];
  if (!primary) return null;
  return leagueIconForSlug(primary.slug) ?? leagueIconForTitle(primary.title);
}

export { LEAGUE_ICON_PATHS };
