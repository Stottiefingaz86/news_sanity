import type { ArticleCard } from "@/lib/sanity/types";

export const DEMO_ARTICLES: ArticleCard[] = [
  {
    _id: "demo-1",
    title: "Ranking 10 Teams with Best Chance to Win the World Cup",
    slug: "ranking-10-teams-best-chance-win-world-cup",
    excerpt:
      "We break down the outright market, knockout paths, and where the value still lives before the group stage draw.",
    publishedAt: "2026-03-13T12:00:00Z",
    layout: "analysis",
    featured: true,
    categories: [{ title: "Expert Analysis", slug: "expert-analysis" }],
    author: { name: "Shane Pratt", slug: "shane-pratt" },
  },
  {
    _id: "demo-2",
    title: "NFL Division Odds: Early Look at AFC & NFC Value",
    slug: "nfl-division-odds-early-look",
    excerpt: "Division futures are already moving — here are the numbers worth tracking.",
    publishedAt: "2026-03-11T10:00:00Z",
    layout: "standard",
    categories: [{ title: "NFL", slug: "nfl" }],
    author: { name: "Editorial Team", slug: "editorial" },
  },
  {
    _id: "demo-3",
    title: "NBA Playoff Race: Betting Guide for the Stretch Run",
    slug: "nba-playoff-race-betting-guide",
    excerpt: "Conference winner odds, seeding scenarios, and late-season angles.",
    publishedAt: "2026-03-10T14:00:00Z",
    layout: "analysis",
    categories: [{ title: "NBA", slug: "nba" }],
    author: { name: "Shane Pratt", slug: "shane-pratt" },
  },
  {
    _id: "demo-4",
    title: "Closing Line Value Explained for New Bettors",
    slug: "closing-line-value-explained",
    excerpt: "Why beating the closing line is the benchmark sharp bettors use.",
    publishedAt: "2026-03-08T09:00:00Z",
    layout: "longform",
    categories: [{ title: "Expert Analysis", slug: "expert-analysis" }],
    author: { name: "Editorial Team", slug: "editorial" },
  },
  {
    _id: "demo-5",
    title: "March Madness Bracket Breakdown — Weekly Podcast",
    slug: "march-madness-bracket-breakdown-podcast",
    excerpt: "Upset picks, region breakdowns, and SGP ideas for the opening weekend.",
    publishedAt: "2026-03-07T16:00:00Z",
    layout: "media",
    categories: [{ title: "News", slug: "news" }],
    author: { name: "Shane Pratt", slug: "shane-pratt" },
  },
  {
    _id: "demo-6",
    title: "BetOnline Launches New SGP+ Features for March Madness",
    slug: "betonline-launches-new-sgp-features",
    excerpt: "Same-game parlay builder updates ahead of the tournament.",
    publishedAt: "2026-03-06T11:00:00Z",
    layout: "standard",
    categories: [{ title: "News", slug: "news" }],
    author: { name: "Editorial Team", slug: "editorial" },
  },
];

export const DEMO_CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Expert Analysis", value: "expert-analysis" },
  { label: "NFL", value: "nfl" },
  { label: "NBA", value: "nba" },
  { label: "News", value: "news" },
];

export const DEMO_TAGS = [
  "World Cup",
  "NFL",
  "NBA",
  "March Madness",
  "Parlays",
  "Futures",
  "Podcast",
  "CLV",
];

export const DEMO_BREADCRUMBS = [
  { label: "In the News", href: "/" },
  { label: "Expert Analysis", href: "/category/expert-analysis" },
  { label: "Ranking 10 Teams with Best Chance to Win the World Cup" },
];
