import { SCORE_GROUPS, STANDINGS_BY_LEAGUE, type StandingsTable } from "@/lib/sports-widgets/data";

export type FormResult = "W" | "D" | "L";

export type CompetitionTeam = {
  code: string;
  name: string;
};

export type GroupStandingRow = {
  rank: number;
  team: CompetitionTeam;
  mp: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  form: FormResult[];
};

export type CompetitionGroup = {
  id: string;
  name: string;
  rows: GroupStandingRow[];
};

export type CompetitionMatch = {
  id: string;
  status: "FT" | "LIVE" | "UPCOMING";
  statusLabel: string;
  stage?: string;
  home: CompetitionTeam & { score?: number; winner?: boolean };
  away: CompetitionTeam & { score?: number; winner?: boolean };
};

export type StatLeader = {
  rank: number;
  player: string;
  team: CompetitionTeam;
  value: number;
};

export type StatLeaderCategory = {
  id: "goals" | "assists" | "yellow" | "red";
  label: string;
  leaders: StatLeader[];
};

export type CompetitionTab = "matches" | "table" | "stats";

export type CompetitionData = {
  id: string;
  slug: string;
  title: string;
  seasonLabel: string;
  iconSlug: string;
  moreHref: string;
  tabs: CompetitionTab[];
  groups?: CompetitionGroup[];
  matches?: CompetitionMatch[];
  statLeaders?: StatLeaderCategory[];
  leagueStandings?: StandingsTable;
};

const TEAM = {
  mex: { code: "MEX", name: "Mexico" },
  kor: { code: "KOR", name: "South Korea" },
  den: { code: "DEN", name: "Denmark" },
  rsa: { code: "RSA", name: "South Africa" },
  sui: { code: "SUI", name: "Switzerland" },
  can: { code: "CAN", name: "Canada" },
  qat: { code: "QAT", name: "Qatar" },
  bra: { code: "BRA", name: "Brazil" },
  por: { code: "POR", name: "Portugal" },
  col: { code: "COL", name: "Colombia" },
  uzb: { code: "UZB", name: "Uzbekistan" },
  cod: { code: "COD", name: "DR Congo" },
  eng: { code: "ENG", name: "England" },
  cro: { code: "CRO", name: "Croatia" },
  gha: { code: "GHA", name: "Ghana" },
  pan: { code: "PAN", name: "Panama" },
  uru: { code: "URU", name: "Uruguay" },
  arg: { code: "ARG", name: "Argentina" },
  usa: { code: "USA", name: "United States" },
  fra: { code: "FRA", name: "France" },
  ger: { code: "GER", name: "Germany" },
  irn: { code: "IRN", name: "Iran" },
  nzl: { code: "NZL", name: "New Zealand" },
  bel: { code: "BEL", name: "Belgium" },
  egy: { code: "EGY", name: "Egypt" },
} as const satisfies Record<string, CompetitionTeam>;

const FLAG_ALPHA2: Record<string, string> = {
  MEX: "MX",
  KOR: "KR",
  DEN: "DK",
  RSA: "ZA",
  SUI: "CH",
  CAN: "CA",
  QAT: "QA",
  BRA: "BR",
  POR: "PT",
  COL: "CO",
  UZB: "UZ",
  COD: "CD",
  ENG: "GB",
  CRO: "HR",
  GHA: "GH",
  PAN: "PA",
  URU: "UY",
  ARG: "AR",
  USA: "US",
  FRA: "FR",
  GER: "DE",
  IRN: "IR",
  NZL: "NZ",
  BEL: "BE",
  EGY: "EG",
};

export function teamFlagEmoji(teamCode: string): string {
  const alpha2 = FLAG_ALPHA2[teamCode.toUpperCase()];
  if (!alpha2 || alpha2.length !== 2) return "🏳️";
  const points = [...alpha2.toUpperCase()].map(
    (char) => 0x1f1e6 + char.charCodeAt(0) - 65,
  );
  return String.fromCodePoint(...points);
}

const WORLD_CUP_STAT_LEADERS: StatLeaderCategory[] = [
  {
    id: "goals",
    label: "Goals",
    leaders: [
      { rank: 1, player: "Lionel Messi", team: TEAM.arg, value: 3 },
      { rank: 2, player: "Kylian Mbappé", team: TEAM.fra, value: 2 },
      { rank: 3, player: "Harry Kane", team: TEAM.eng, value: 2 },
      { rank: 4, player: "Vinícius Júnior", team: TEAM.bra, value: 2 },
      { rank: 5, player: "Cristiano Ronaldo", team: TEAM.por, value: 1 },
    ],
  },
  {
    id: "assists",
    label: "Assists",
    leaders: [
      { rank: 1, player: "Bruno Fernandes", team: TEAM.por, value: 3 },
      { rank: 2, player: "Jude Bellingham", team: TEAM.eng, value: 2 },
      { rank: 3, player: "Alexis Mac Allister", team: TEAM.arg, value: 2 },
      { rank: 4, player: "Ousmane Dembélé", team: TEAM.fra, value: 1 },
    ],
  },
  {
    id: "yellow",
    label: "Yellow cards",
    leaders: [
      { rank: 1, player: "Casemiro", team: TEAM.bra, value: 2 },
      { rank: 2, player: "Declan Rice", team: TEAM.eng, value: 1 },
      { rank: 3, player: "Achraf Hakimi", team: { code: "MAR", name: "Morocco" }, value: 1 },
    ],
  },
  {
    id: "red",
    label: "Red cards",
    leaders: [
      { rank: 1, player: "Nicolas Jackson", team: TEAM.gha, value: 1 },
    ],
  },
];

const WORLD_CUP_GROUPS: CompetitionGroup[] = [
  {
    id: "a",
    name: "Group A",
    rows: [
      {
        rank: 1,
        team: TEAM.mex,
        mp: 1,
        w: 1,
        d: 0,
        l: 0,
        gf: 2,
        ga: 1,
        gd: 1,
        pts: 3,
        form: ["W"],
      },
      {
        rank: 2,
        team: TEAM.kor,
        mp: 1,
        w: 1,
        d: 0,
        l: 0,
        gf: 2,
        ga: 0,
        gd: 2,
        pts: 3,
        form: ["W"],
      },
      {
        rank: 3,
        team: TEAM.den,
        mp: 1,
        w: 0,
        d: 0,
        l: 1,
        gf: 0,
        ga: 2,
        gd: -2,
        pts: 0,
        form: ["L"],
      },
      {
        rank: 4,
        team: TEAM.rsa,
        mp: 1,
        w: 0,
        d: 0,
        l: 1,
        gf: 1,
        ga: 2,
        gd: -1,
        pts: 0,
        form: ["L"],
      },
    ],
  },
  {
    id: "b",
    name: "Group B",
    rows: [
      {
        rank: 1,
        team: TEAM.sui,
        mp: 1,
        w: 0,
        d: 1,
        l: 0,
        gf: 1,
        ga: 1,
        gd: 0,
        pts: 1,
        form: ["D"],
      },
      {
        rank: 2,
        team: TEAM.can,
        mp: 1,
        w: 0,
        d: 1,
        l: 0,
        gf: 1,
        ga: 1,
        gd: 0,
        pts: 1,
        form: ["D"],
      },
      {
        rank: 3,
        team: TEAM.qat,
        mp: 1,
        w: 0,
        d: 1,
        l: 0,
        gf: 1,
        ga: 1,
        gd: 0,
        pts: 1,
        form: ["D"],
      },
      {
        rank: 4,
        team: TEAM.bra,
        mp: 1,
        w: 0,
        d: 1,
        l: 0,
        gf: 1,
        ga: 1,
        gd: 0,
        pts: 1,
        form: ["D"],
      },
    ],
  },
  {
    id: "g",
    name: "Group G",
    rows: [
      {
        rank: 1,
        team: TEAM.bel,
        mp: 1,
        w: 1,
        d: 0,
        l: 0,
        gf: 3,
        ga: 1,
        gd: 2,
        pts: 3,
        form: ["W"],
      },
      {
        rank: 2,
        team: TEAM.irn,
        mp: 1,
        w: 0,
        d: 1,
        l: 0,
        gf: 2,
        ga: 2,
        gd: 0,
        pts: 1,
        form: ["D"],
      },
      {
        rank: 3,
        team: TEAM.nzl,
        mp: 1,
        w: 0,
        d: 1,
        l: 0,
        gf: 2,
        ga: 2,
        gd: 0,
        pts: 1,
        form: ["D"],
      },
      {
        rank: 4,
        team: TEAM.egy,
        mp: 1,
        w: 0,
        d: 0,
        l: 1,
        gf: 1,
        ga: 3,
        gd: -2,
        pts: 0,
        form: ["L"],
      },
    ],
  },
  {
    id: "k",
    name: "Group K",
    rows: [
      {
        rank: 1,
        team: TEAM.por,
        mp: 1,
        w: 1,
        d: 0,
        l: 0,
        gf: 3,
        ga: 0,
        gd: 3,
        pts: 3,
        form: ["W"],
      },
      {
        rank: 2,
        team: TEAM.col,
        mp: 1,
        w: 1,
        d: 0,
        l: 0,
        gf: 2,
        ga: 1,
        gd: 1,
        pts: 3,
        form: ["W"],
      },
      {
        rank: 3,
        team: TEAM.uzb,
        mp: 1,
        w: 0,
        d: 0,
        l: 1,
        gf: 1,
        ga: 2,
        gd: -1,
        pts: 0,
        form: ["L"],
      },
      {
        rank: 4,
        team: TEAM.cod,
        mp: 1,
        w: 0,
        d: 0,
        l: 1,
        gf: 0,
        ga: 3,
        gd: -3,
        pts: 0,
        form: ["L"],
      },
    ],
  },
  {
    id: "l",
    name: "Group L",
    rows: [
      {
        rank: 1,
        team: TEAM.eng,
        mp: 1,
        w: 1,
        d: 0,
        l: 0,
        gf: 4,
        ga: 1,
        gd: 3,
        pts: 3,
        form: ["W"],
      },
      {
        rank: 2,
        team: TEAM.gha,
        mp: 1,
        w: 1,
        d: 0,
        l: 0,
        gf: 1,
        ga: 0,
        gd: 1,
        pts: 3,
        form: ["W"],
      },
      {
        rank: 3,
        team: TEAM.cro,
        mp: 1,
        w: 0,
        d: 0,
        l: 1,
        gf: 1,
        ga: 4,
        gd: -3,
        pts: 0,
        form: ["L"],
      },
      {
        rank: 4,
        team: TEAM.pan,
        mp: 1,
        w: 0,
        d: 0,
        l: 1,
        gf: 0,
        ga: 1,
        gd: -1,
        pts: 0,
        form: ["L"],
      },
    ],
  },
];

function scoreGroupToMatches(slug: string): CompetitionMatch[] {
  const group = SCORE_GROUPS.find((item) => item.id === slug);
  if (!group) return [];

  const finished: CompetitionMatch[] = group.games.map((game) => ({
    id: game.id,
    status: "FT",
    statusLabel: game.status,
    home: {
      code: game.home.abbr,
      name: game.home.abbr,
      score: game.home.score,
      winner: game.home.winner,
    },
    away: {
      code: game.away.abbr,
      name: game.away.abbr,
      score: game.away.score,
      winner: game.away.winner,
    },
  }));

  const upcoming: CompetitionMatch[] = group.upcoming.map((game) => ({
    id: game.id,
    status: "UPCOMING",
    statusLabel: game.status,
    home: { code: game.home.abbr, name: game.home.abbr },
    away: { code: game.away.abbr, name: game.away.abbr },
  }));

  return [...finished, ...upcoming];
}

const WORLD_CUP: CompetitionData = {
  id: "world-cup-2026",
  slug: "world-cup",
  title: "FIFA World Cup 2026™",
  seasonLabel: "2026",
  iconSlug: "world-cup",
  moreHref: "/category/world-cup",
  tabs: ["matches", "table", "stats"],
  groups: WORLD_CUP_GROUPS,
  matches: scoreGroupToMatches("world-cup"),
  statLeaders: WORLD_CUP_STAT_LEADERS,
};

function leagueCompetition(
  slug: string,
  title: string,
  standingsKey: keyof typeof STANDINGS_BY_LEAGUE,
): CompetitionData | null {
  const standings = STANDINGS_BY_LEAGUE[standingsKey];
  if (!standings) return null;

  return {
    id: slug,
    slug,
    title,
    seasonLabel: "2025–26",
    iconSlug: slug,
    moreHref: `/category/${slug}`,
    tabs: ["matches", "table"],
    matches: scoreGroupToMatches(slug),
    leagueStandings: standings,
  };
}

const COMPETITIONS: Record<string, CompetitionData> = {
  "world-cup": WORLD_CUP,
  nfl: leagueCompetition("nfl", "NFL", "nfl")!,
  nba: leagueCompetition("nba", "NBA", "nba")!,
  mlb: leagueCompetition("mlb", "MLB", "mlb")!,
  nhl: leagueCompetition("nhl", "NHL", "nhl")!,
};

export const COMPETITION_SLUGS = Object.keys(COMPETITIONS);

export function getCompetitionBySlug(slug: string): CompetitionData | null {
  return COMPETITIONS[slug.toLowerCase()] ?? null;
}

export function resolveCompetitionSlug(
  categorySlugs?: string[] | null,
  pathname?: string,
): string | null {
  if (categorySlugs?.length) {
    const match = categorySlugs.find((slug) => COMPETITIONS[slug.toLowerCase()]);
    if (match) return match.toLowerCase();
  }

  const fromPath = pathname?.match(/^\/category\/([^/]+)/)?.[1];
  if (fromPath && COMPETITIONS[fromPath.toLowerCase()]) {
    return fromPath.toLowerCase();
  }

  return null;
}

export function listCompetitions(): CompetitionData[] {
  return Object.values(COMPETITIONS);
}
