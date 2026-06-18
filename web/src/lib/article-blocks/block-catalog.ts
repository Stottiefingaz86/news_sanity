import type {
  ArticleCustomBlock,
} from "@/lib/article-blocks/types";
import { createBlockKey } from "@/lib/article-blocks/types";

export type BlockCatalogEntry = {
  id: string;
  label: string;
  description: string;
  category: "typography" | "layout" | "media" | "content" | "utility";
  icon:
    | "grid"
    | "bento"
    | "header"
    | "quote"
    | "marquee"
    | "video"
    | "image"
    | "cta"
    | "faq"
    | "related"
    | "text";
  create: () => ArticleCustomBlock;
};

export const BLOCK_CATALOG: BlockCatalogEntry[] = [
  {
    id: "standfirst",
    label: "Standfirst",
    description: "Deck line — larger intro summary below the headline",
    category: "typography",
    icon: "text",
    create: () => ({
      _type: "standfirst",
      _key: createBlockKey(),
      text: "The expanded tournament format reshapes how bettors should price knockout paths before the friendlies rewrite the board again.",
    }),
  },
  {
    id: "prose-body",
    label: "Body text",
    description: "Single-column newspaper body paragraphs",
    category: "typography",
    icon: "text",
    create: () => ({
      _type: "proseBody",
      _key: createBlockKey(),
      columns: 1,
      dropCap: false,
      paragraphs: [
        "Group-stage geography matters more than it did in a 32-team tournament. A soft opening run can save legs for a brutal quarterfinal corridor.",
        "England drawing Croatia and Ghana in Group L looks manageable on paper. Portugal beside Colombia and Uzbekistan in Group K is the kind of chaos that moves group-winner markets early.",
      ],
    }),
  },
  {
    id: "text-columns",
    label: "Text columns",
    description: "Two-column newspaper flow for longer sections",
    category: "typography",
    icon: "text",
    create: () => ({
      _type: "proseBody",
      _key: createBlockKey(),
      columns: 2,
      dropCap: false,
      paragraphs: [
        "Colombia profiles as the most interesting long shot on the board. Luis Díaz gives them a genuine match-winner, and the direct style suits summer conditions across North America.",
        "Portugal and the Netherlands carry similar upside if the bracket breaks right. Both have ceiling; both have injury histories that keep the market honest week to week.",
        "Crowd support in host cities can turn a neutral venue into a home environment — especially for nations with large diasporas in Mexico and the United States.",
        "That matters when pricing group-stage props, not just outright winner tickets on the co-favorites.",
      ],
    }),
  },
  {
    id: "text-heading",
    label: "Section heading",
    description: "In-body section or subsection title",
    category: "typography",
    icon: "header",
    create: () => ({
      _type: "textHeading",
      _key: createBlockKey(),
      text: "When the groups landed, the futures moved",
      level: "h2",
    }),
  },
  {
    id: "section-header",
    label: "Section header",
    description: "Kicker, title, and subtitle",
    category: "layout",
    icon: "header",
    create: () => ({
      _type: "sectionHeader",
      _key: createBlockKey(),
      kicker: "Section",
      title: "Section title",
      subtitle: "Supporting line for this section.",
      size: "large",
      align: "left",
    }),
  },
  {
    id: "pull-quote",
    label: "Pull quote",
    description: "Highlighted quote with attribution",
    category: "content",
    icon: "quote",
    create: () => ({
      _type: "pullQuote",
      _key: createBlockKey(),
      quote: "The line that stops the scroll.",
      attribution: "Author name",
      variant: "highlight",
    }),
  },
  {
    id: "grid-uniform",
    label: "Uniform grid",
    description: "Equal tiles in a responsive grid",
    category: "layout",
    icon: "grid",
    create: () => ({
      _type: "contentGrid",
      _key: createBlockKey(),
      layout: "uniform",
      columns: 3,
      gap: "normal",
      items: [
        { _key: createBlockKey(), title: "Tile one", body: "Short supporting copy." },
        { _key: createBlockKey(), title: "Tile two", body: "Short supporting copy." },
        { _key: createBlockKey(), title: "Tile three", body: "Short supporting copy." },
      ],
    }),
  },
  {
    id: "grid-masonry",
    label: "Masonry grid",
    description: "Staggered column layout",
    category: "layout",
    icon: "grid",
    create: () => ({
      _type: "contentGrid",
      _key: createBlockKey(),
      layout: "masonry",
      columns: 3,
      gap: "normal",
      items: [
        { _key: createBlockKey(), title: "Lead tile", body: "Taller copy block for masonry rhythm." },
        { _key: createBlockKey(), title: "Quick hit", body: "Short note." },
        { _key: createBlockKey(), title: "Another angle", body: "Medium length supporting paragraph." },
      ],
    }),
  },
  {
    id: "grid-bento",
    label: "Bento grid",
    description: "Mixed-size tiles with span controls",
    category: "layout",
    icon: "bento",
    create: () => ({
      _type: "contentGrid",
      _key: createBlockKey(),
      layout: "bento",
      columns: 4,
      gap: "normal",
      items: [
        { _key: createBlockKey(), title: "Hero tile", body: "Primary story.", colSpan: 2, rowSpan: 2 },
        { _key: createBlockKey(), title: "Side note", body: "Secondary detail.", colSpan: 2, rowSpan: 1 },
        { _key: createBlockKey(), title: "Quick stat", body: "One line.", colSpan: 1, rowSpan: 1 },
        { _key: createBlockKey(), title: "Another stat", body: "One line.", colSpan: 1, rowSpan: 1 },
      ],
    }),
  },
  {
    id: "marquee",
    label: "Marquee",
    description: "Scrolling ticker of labels or stats",
    category: "content",
    icon: "marquee",
    create: () => ({
      _type: "marquee",
      _key: createBlockKey(),
      items: ["FRANCE +550", "ARGENTINA +600", "BRAZIL +450", "ENGLAND +700"],
      speed: "medium",
      separator: "·",
    }),
  },
  {
    id: "video-embed",
    label: "Video embed",
    description: "YouTube or direct video URL",
    category: "media",
    icon: "video",
    create: () => ({
      _type: "videoEmbed",
      _key: createBlockKey(),
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      caption: "Video caption goes here.",
      aspect: "video",
    }),
  },
  {
    id: "cta-block",
    label: "Call to action",
    description: "Promo box with button",
    category: "content",
    icon: "cta",
    create: () => ({
      _type: "ctaBlock",
      _key: createBlockKey(),
      kicker: "BetOnline",
      title: "Ready to place your bet?",
      body: "Sign up today and get the latest odds on every market we cover.",
      buttonLabel: "Join now",
      buttonHref: "https://www.betonline.ag",
      variant: "primary",
    }),
  },
  {
    id: "related-articles",
    label: "Related articles",
    description: "Linked reading list",
    category: "content",
    icon: "related",
    create: () => ({
      _type: "relatedArticles",
      _key: createBlockKey(),
      title: "Related reading",
      articles: [
        { title: "NFL Division Odds: Early Look", href: "/nfl-division-odds-early-look", category: "NFL" },
        { title: "Closing Line Value Explained", href: "/closing-line-value-explained", category: "Guide" },
      ],
    }),
  },
  {
    id: "faq-block",
    label: "FAQ accordion",
    description: "Expandable Q&A section",
    category: "content",
    icon: "faq",
    create: () => ({
      _type: "faqBlock",
      _key: createBlockKey(),
      title: "Common questions",
      items: [
        { question: "What is closing line value?", answer: "CLV measures whether you beat the final market price." },
        { question: "How often are odds updated?", answer: "Lines move throughout the day based on action and news." },
      ],
    }),
  },
  {
    id: "divider-line",
    label: "Divider",
    description: "Visual break or spacer",
    category: "utility",
    icon: "header",
    create: () => ({
      _type: "dividerBlock",
      _key: createBlockKey(),
      style: "line",
    }),
  },
];

export const BLOCK_CATEGORIES = [
  { id: "typography", label: "Typography & body" },
  { id: "layout", label: "Layout & grids" },
  { id: "media", label: "Media" },
  { id: "content", label: "Content blocks" },
  { id: "utility", label: "Utility" },
] as const;

export const DRAG_BLOCK_TYPE = "application/x-bol-block";
