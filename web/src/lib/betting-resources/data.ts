import { assetPath } from "@/lib/base-path";

export type BettingResourceLink = {
  id: string;
  title: string;
  href?: string;
};

export type BettingResourceCategory = {
  id: string;
  title: string;
  icon?: "mlb" | "nfl" | "nhl";
  links: BettingResourceLink[];
};

export const BETTING_RESOURCE_ICONS = {
  mlb: assetPath("/banners/sports_league/MLB.svg"),
  nfl: assetPath("/banners/sports_league/NFL.svg"),
  nhl: assetPath("/banners/sports_league/NHL.svg"),
} as const;

export const BETTING_RESOURCES: BettingResourceCategory[] = [
  {
    id: "baseball",
    title: "Baseball",
    icon: "mlb",
    links: [
      {
        id: "mlb-playoff-performances",
        title: "The Best MLB Playoff Player Performances of All Time",
      },
      {
        id: "mlb-playoff-chokes",
        title: "The Biggest MLB Playoff Chokes of All Time",
      },
      {
        id: "baseball-betting-basics",
        title: "The Basics of Baseball Betting, Simplified",
      },
      {
        id: "playoff-baseball-betting",
        title: "A Complete Guide on How to Master Playoff Baseball Betting",
      },
    ],
  },
  {
    id: "football",
    title: "Football",
    icon: "nfl",
    links: [
      {
        id: "nfl-spread-moneyline-totals",
        title: "How to Bet on NFL Games: Spread, Moneyline, Totals",
      },
      {
        id: "live-in-game-betting",
        title: "How to Master Live/In-Game Betting",
      },
      {
        id: "nfl-hedging-parlay",
        title: "How to Master Hedging Parlay Betting Strategy in the NFL",
      },
      {
        id: "college-football-teasers",
        title: "How to Become an Expert at College Football Teaser Betting",
      },
    ],
  },
  {
    id: "racing",
    title: "Racing",
    links: [
      {
        id: "formula-e-betting",
        title: "Betting on Formula E: Understanding Electric Racing's New Market",
      },
      {
        id: "tour-de-france-betting",
        title: "Tour de France Betting: How Team Tactics Shape Individual Outcomes",
      },
      {
        id: "motorsports-data",
        title: "How to Read Motorsports Data: Sector Times, Tire Wear, and Pit Strategy",
      },
    ],
  },
  {
    id: "ufc-boxing",
    title: "UFC & Boxing",
    links: [
      {
        id: "round-props-finishing",
        title: "Round Props & Finishing Methods: How to Bet the When and How",
      },
      {
        id: "fighter-stats",
        title: "How to Read Fighter Stats: Strikes, Takedowns, and Fight IQ",
      },
      {
        id: "combat-sports-bare-knuckle",
        title: "Combat Sports — How to Bet on Bare-Knuckle Boxing, Kickboxing, and More",
      },
      {
        id: "boxing-basics",
        title: "Understanding the Basics of Betting on Boxing",
      },
      {
        id: "mma-ufc-expert-guide",
        title: "A Complete Guide on How to Become an Expert at MMA/UFC Betting",
      },
    ],
  },
  {
    id: "casino",
    title: "Casino",
    links: [
      {
        id: "casino-bonus-maximize",
        title: "Casino Bonuses — How to Maximize Your Bonus Without Losing It",
      },
      {
        id: "casino-bonus-types",
        title: "Types of Bonuses: Welcome, Reload, No Deposit",
      },
    ],
  },
  {
    id: "hockey",
    title: "Hockey",
    icon: "nhl",
    links: [
      {
        id: "nhl-betting-explained",
        title: "Learn How to Bet on the NHL: Hockey Betting Explained",
      },
    ],
  },
  {
    id: "rugby-cricket",
    title: "Rugby & Cricket",
    links: [
      {
        id: "rugby-union-vs-league",
        title: "Rugby Union vs Rugby League: Key Betting Differences",
      },
      {
        id: "cricket-live-betting",
        title: "Cricket Live Betting: Timing and Over Analysis for Maximum Edge",
      },
      {
        id: "t20-vs-test-cricket",
        title: "T20 vs Test Cricket Betting: Strategy Shifts Between Formats",
      },
      {
        id: "weather-pitch-rugby-cricket",
        title: "How Weather and Pitch Conditions Influence Rugby and Cricket Markets",
      },
    ],
  },
  {
    id: "general",
    title: "General",
    links: [
      {
        id: "tennis-elo-ratings",
        title: "Using Player Statistics and Elo Ratings to Make Smarter Tennis Predictions",
      },
      {
        id: "golf-majors-betting",
        title: "Betting on Golf Majors: Course Fit, Strokes Gained, and Smarter Angles",
      },
      {
        id: "esports-betting-101",
        title: "Esports Betting 101: Popular Games and Bet Types",
      },
      {
        id: "extreme-sports-betting",
        title: "Betting on Extreme Sports: Surfing, Skateboarding & Snowboarding",
      },
      {
        id: "prediction-markets-liquidity",
        title: "Liquidity in Prediction Markets vs. Traditional Sportsbooks",
      },
    ],
  },
  {
    id: "crypto",
    title: "Crypto",
    links: [
      {
        id: "crypto-betting-security",
        title: "Why Crypto Betting Is More Secure Than Traditional Banking at BetOnline.ag",
      },
      {
        id: "crypto-future-wagering",
        title: "Why Crypto Is the Future of Online Wagering at BetOnline.ag",
      },
      {
        id: "crypto-deposit",
        title: "How to Deposit Crypto at BetOnline.ag",
      },
      {
        id: "crypto-preferred-deposit",
        title: "Why Crypto Is The Preferred Deposit Method at BetOnline.ag",
      },
      {
        id: "crypto-withdrawals",
        title: "How Crypto Withdrawals Work at BetOnline.ag",
      },
    ],
  },
  {
    id: "horse-racing",
    title: "Horse Racing",
    links: [
      {
        id: "horse-racing-new-bettors",
        title: "Horse Racing for New Bettors: From Win Bets to Exotic Parlays",
      },
    ],
  },
  {
    id: "tennis",
    title: "Tennis",
    links: [
      {
        id: "tennis-doubles-betting",
        title: "Tennis Doubles Betting: How Team Chemistry and Serving Rotation Matter",
      },
    ],
  },
];

/** Column order matching the BOL resources layout (3 columns). */
export const BETTING_RESOURCES_COLUMNS: BettingResourceCategory[][] = [
  [
    BETTING_RESOURCES[0],
    BETTING_RESOURCES[1],
    BETTING_RESOURCES[2],
    BETTING_RESOURCES[3],
  ],
  [
    BETTING_RESOURCES[4],
    BETTING_RESOURCES[5],
    BETTING_RESOURCES[6],
    BETTING_RESOURCES[7],
  ],
  [BETTING_RESOURCES[8], BETTING_RESOURCES[9], BETTING_RESOURCES[10]],
];

export function bettingResourceLinkHref(link: BettingResourceLink) {
  return link.href ?? `/betting-resources#${link.id}`;
}

export function bettingResourcesPath() {
  return "/betting-resources";
}
