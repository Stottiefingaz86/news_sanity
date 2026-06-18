import { assetPath } from "@/lib/base-path";

export type ContestPromoIcon = "pickem" | "bracket";

export type ContestPromo = {
  id: string;
  /** Display headline, e.g. "$25,000 WORLD CUP PICK'EM" */
  headline: string;
  image: string;
  entryHref: string;
  rulesHref: string;
  closesAt: string;
  icon: ContestPromoIcon;
  alt?: string;
  isFree?: boolean;
};

const BOL_CONTESTS = "https://www.betonline.ag/contests";

export const promoBanners: ContestPromo[] = [
  {
    id: "world-cup-pick-em",
    headline: "$25,000 WORLD CUP PICK'EM",
    image: assetPath("/img_lobby_world-cup-pick-em.png"),
    entryHref: BOL_CONTESTS,
    rulesHref: BOL_CONTESTS,
    closesAt: "2026-07-19T23:59:59-04:00",
    icon: "pickem",
    alt: "World Cup Pick Em contest featuring Christian Pulisic",
    isFree: true,
  },
  {
    id: "fifa-world-cup-bracket",
    headline: "$10,000 FIFA WORLD CUP BRACKET",
    image: assetPath("/img_lobby_fifa-world-cup-bracket.png"),
    entryHref: BOL_CONTESTS,
    rulesHref: BOL_CONTESTS,
    closesAt: "2026-06-28T23:59:59-04:00",
    icon: "bracket",
    alt: "FIFA World Cup bracket contest",
    isFree: true,
  },
  {
    id: "betonline-world-cup-bracket",
    headline: "$10,000 BETONLINE WORLD CUP BRACKET",
    image: assetPath("/img_lobby_betonline-world-cup-bracket.png"),
    entryHref: BOL_CONTESTS,
    rulesHref: BOL_CONTESTS,
    closesAt: "2026-06-25T23:59:59-04:00",
    icon: "bracket",
    alt: "BetOnline World Cup bracket contest featuring Jude Bellingham",
    isFree: true,
  },
];

/** @deprecated Use ContestPromo */
export type PromoBanner = ContestPromo;
