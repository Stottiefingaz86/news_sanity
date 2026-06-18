export type ScoreTeam = {
  abbr: string;
  score?: number;
  winner?: boolean;
};

export type ScoreGame = {
  id: string;
  status: string;
  home: ScoreTeam;
  away: ScoreTeam;
  upcoming?: boolean;
};

export type ScoreGroup = {
  id: string;
  label: string;
  selectLabel?: string;
  moreHref: string;
  games: ScoreGame[];
  upcoming: ScoreGame[];
};

export type StandingsRow = {
  rank: number;
  team: string;
  w: number;
  l: number;
  pct: string;
  gb: string;
  streak: string;
};

export type StandingsTable = {
  league: string;
  leagueSlug: string;
  title: string;
  headers: string[];
  rows: StandingsRow[];
};

export const SCORE_GROUPS: ScoreGroup[] = [
  {
    id: "world-cup",
    label: "World Cup 2026",
    moreHref: "/ranking-10-teams-best-chance-win-world-cup",
    games: [
      {
        id: "wc-1",
        status: "FT",
        away: { abbr: "POR", score: 3, winner: true },
        home: { abbr: "COD", score: 0 },
      },
      {
        id: "wc-2",
        status: "FT",
        away: { abbr: "ENG", score: 4, winner: true },
        home: { abbr: "CRO", score: 1 },
      },
      {
        id: "wc-3",
        status: "FT",
        away: { abbr: "GHA", score: 1, winner: true },
        home: { abbr: "URU", score: 0 },
      },
    ],
    upcoming: [
      {
        id: "wc-up-1",
        status: "Jun 21 · 3PM",
        upcoming: true,
        away: { abbr: "BRA" },
        home: { abbr: "ARG" },
      },
      {
        id: "wc-up-2",
        status: "Jun 22 · 9PM",
        upcoming: true,
        away: { abbr: "USA" },
        home: { abbr: "MEX" },
      },
      {
        id: "wc-up-3",
        status: "Jun 23 · 2PM",
        upcoming: true,
        away: { abbr: "FRA" },
        home: { abbr: "GER" },
      },
    ],
  },
  {
    id: "nfl",
    label: "NFL",
    moreHref: "/category/nfl",
    games: [
      {
        id: "nfl-1",
        status: "Final",
        away: { abbr: "KC", score: 27, winner: true },
        home: { abbr: "BUF", score: 24 },
      },
      {
        id: "nfl-2",
        status: "Final",
        away: { abbr: "PHI", score: 17 },
        home: { abbr: "DAL", score: 20, winner: true },
      },
      {
        id: "nfl-3",
        status: "Q4 2:14",
        away: { abbr: "SF", score: 21 },
        home: { abbr: "SEA", score: 24, winner: true },
      },
    ],
    upcoming: [
      {
        id: "nfl-up-1",
        status: "Sun · 1PM",
        upcoming: true,
        away: { abbr: "BAL" },
        home: { abbr: "PIT" },
      },
      {
        id: "nfl-up-2",
        status: "Sun · 4PM",
        upcoming: true,
        away: { abbr: "GB" },
        home: { abbr: "MIN" },
      },
    ],
  },
  {
    id: "nba",
    label: "NBA",
    moreHref: "/category/nba",
    games: [
      {
        id: "nba-1",
        status: "Final",
        away: { abbr: "BOS", score: 118, winner: true },
        home: { abbr: "MIA", score: 104 },
      },
      {
        id: "nba-2",
        status: "Final",
        away: { abbr: "LAL", score: 112 },
        home: { abbr: "DEN", score: 115, winner: true },
      },
    ],
    upcoming: [
      {
        id: "nba-up-1",
        status: "Tonight · 7PM",
        upcoming: true,
        away: { abbr: "NYK" },
        home: { abbr: "PHI" },
      },
    ],
  },
  {
    id: "mlb",
    label: "MLB",
    moreHref: "/category/mlb",
    games: [
      {
        id: "mlb-1",
        status: "Final",
        away: { abbr: "NYY", score: 5, winner: true },
        home: { abbr: "BOS", score: 3 },
      },
      {
        id: "mlb-2",
        status: "Bot 7",
        away: { abbr: "LAD", score: 2 },
        home: { abbr: "SD", score: 4, winner: true },
      },
    ],
    upcoming: [
      {
        id: "mlb-up-1",
        status: "Tonight · 7:10",
        upcoming: true,
        away: { abbr: "NYY" },
        home: { abbr: "TB" },
      },
    ],
  },
  {
    id: "nhl",
    label: "NHL",
    moreHref: "/category/nhl",
    games: [
      {
        id: "nhl-1",
        status: "Final",
        away: { abbr: "NYR", score: 3, winner: true },
        home: { abbr: "NJ", score: 2 },
      },
      {
        id: "nhl-2",
        status: "Final",
        away: { abbr: "COL", score: 1 },
        home: { abbr: "VGK", score: 4, winner: true },
      },
    ],
    upcoming: [
      {
        id: "nhl-up-1",
        status: "Tonight · 7PM",
        upcoming: true,
        away: { abbr: "TOR" },
        home: { abbr: "MTL" },
      },
    ],
  },
];

export const STANDINGS_BY_LEAGUE: Record<string, StandingsTable> = {
  nfl: {
    league: "NFL",
    leagueSlug: "nfl",
    title: "AFC East",
    headers: ["Team", "W", "L", "PCT", "GB", "STRK"],
    rows: [
      { rank: 1, team: "Buffalo", w: 11, l: 6, pct: ".647", gb: "—", streak: "W2" },
      { rank: 2, team: "Miami", w: 8, l: 9, pct: ".471", gb: "3.0", streak: "L1" },
      { rank: 3, team: "NY Jets", w: 5, l: 12, pct: ".294", gb: "6.0", streak: "L3" },
      { rank: 4, team: "New England", w: 4, l: 13, pct: ".235", gb: "7.0", streak: "W1" },
    ],
  },
  nba: {
    league: "NBA",
    leagueSlug: "nba",
    title: "Eastern Conference",
    headers: ["Team", "W", "L", "PCT", "GB", "STRK"],
    rows: [
      { rank: 1, team: "Boston", w: 52, l: 20, pct: ".722", gb: "—", streak: "W4" },
      { rank: 2, team: "Milwaukee", w: 46, l: 26, pct: ".639", gb: "6.0", streak: "W1" },
      { rank: 3, team: "Cleveland", w: 44, l: 28, pct: ".611", gb: "8.0", streak: "L1" },
      { rank: 4, team: "NY Knicks", w: 43, l: 29, pct: ".597", gb: "9.0", streak: "W2" },
    ],
  },
  mlb: {
    league: "MLB",
    leagueSlug: "mlb",
    title: "AL East",
    headers: ["Team", "W", "L", "PCT", "GB", "STRK"],
    rows: [
      { rank: 1, team: "Baltimore", w: 88, l: 58, pct: ".603", gb: "—", streak: "W3" },
      { rank: 2, team: "NY Yankees", w: 82, l: 64, pct: ".562", gb: "6.0", streak: "W1" },
      { rank: 3, team: "Tampa Bay", w: 76, l: 70, pct: ".521", gb: "12.0", streak: "L2" },
      { rank: 4, team: "Boston", w: 71, l: 75, pct: ".486", gb: "17.0", streak: "L1" },
    ],
  },
  nhl: {
    league: "NHL",
    leagueSlug: "nhl",
    title: "Metropolitan",
    headers: ["Team", "W", "L", "PCT", "GB", "STRK"],
    rows: [
      { rank: 1, team: "NY Rangers", w: 48, l: 22, pct: ".686", gb: "—", streak: "W2" },
      { rank: 2, team: "Carolina", w: 45, l: 25, pct: ".643", gb: "3.0", streak: "W1" },
      { rank: 3, team: "NY Islanders", w: 36, l: 34, pct: ".514", gb: "12.0", streak: "L1" },
      { rank: 4, team: "New Jersey", w: 34, l: 36, pct: ".486", gb: "14.0", streak: "L2" },
    ],
  },
  ncaaf: {
    league: "NCAAF",
    leagueSlug: "ncaaf",
    title: "Top 25",
    headers: ["Team", "W", "L", "PCT", "GB", "STRK"],
    rows: [
      { rank: 1, team: "Georgia", w: 13, l: 1, pct: ".929", gb: "—", streak: "W5" },
      { rank: 2, team: "Michigan", w: 12, l: 2, pct: ".857", gb: "1.0", streak: "W3" },
      { rank: 3, team: "Ohio State", w: 11, l: 2, pct: ".846", gb: "1.5", streak: "W2" },
      { rank: 4, team: "Alabama", w: 11, l: 3, pct: ".786", gb: "2.0", streak: "W1" },
    ],
  },
};

export function standingsForLeague(slug: string) {
  return STANDINGS_BY_LEAGUE[slug.toLowerCase()] ?? null;
}

const SCORE_GROUP_IDS = new Set(SCORE_GROUPS.map((group) => group.id));

export function scoreTickerDefaultGroup(pathname: string) {
  const leagueSlug = pathname.match(/^\/category\/([^/]+)/)?.[1];
  if (leagueSlug && SCORE_GROUP_IDS.has(leagueSlug)) {
    return leagueSlug;
  }
  return "world-cup";
}

export function scoreTickerLockedLeague(pathname: string) {
  const leagueSlug = pathname.match(/^\/category\/([^/]+)/)?.[1];
  if (!leagueSlug) return null;
  return SCORE_GROUP_IDS.has(leagueSlug) ? leagueSlug : null;
}
