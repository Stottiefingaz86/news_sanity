---
name: BetOnline News
description: Dark BOL product shell with scoped editorial content — expert, direct, premium sports news inside the platform frame.
colors:
  primary: "#ee3536"
  primary-hover: "#dc2a2f"
  accent-green: "#8ac500"
  nav-bg: "#2d2e2c"
  sidebar-bg: "#2d2d2d"
  page-bg: "#1a1a1a"
  chrome-muted: "rgba(255,255,255,0.70)"
  chrome-surface: "rgba(255,255,255,0.10)"
  content-bg: "#ffffff"
  content-bg-dark: "#141414"
  content-foreground: "#0a0a0a"
  content-foreground-dark: "#f5f5f5"
  content-muted: "#737373"
  content-muted-dark: "#a3a3a3"
  content-card-bg: "#ffffff"
  content-card-bg-dark: "#1f1f1f"
  content-card-border: "#e5e5e5"
  content-card-border-dark: "rgba(255,255,255,0.10)"
  content-surface: "#f5f5f5"
  content-surface-dark: "#262626"
  content-emphasis-bg: "#2d2d2d"
  hero-image-bg: "#383838"
typography:
  display:
    fontFamily: "var(--font-news-serif), Georgia, Times New Roman, serif"
    fontSize: "clamp(1.75rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "var(--font-news-serif), Georgia, Times New Roman, serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "var(--font-sans), Figtree, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "var(--font-sans), Figtree, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-sans), Figtree, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "12px"
  pill: "16px"
  track: "24px"
spacing:
  sidebar-expanded: "16rem"
  sidebar-collapsed: "3rem"
  header-height: "64px"
  subnav-height: "52px"
  card-padding: "16px"
  section-gap: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "#ffffff"
  button-join:
    backgroundColor: "{colors.accent-green}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  button-ghost-chrome:
    backgroundColor: "transparent"
    textColor: "{colors.chrome-muted}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  card-news:
    backgroundColor: "{colors.content-card-bg}"
    textColor: "{colors.content-foreground}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
  subnav-pill-active:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "4px 16px"
  sidebar-item-active:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
---

# Design System: BetOnline News

## Overview

**Creative North Star: "The Platform Frame"**

BetOnline News is editorial content delivered inside the BetOnline product shell — not a detached blog skin. The dark chrome (header, sidebar, sub-nav) is always on-brand and always dark; the content area beneath is a scoped reading surface that can be light or dark without breaking platform identity. Confidence comes from consistency with betonline.ag; premium comes from Source Serif headlines and careful reading rhythm inside a tool users already trust.

The system rejects the legacy WordPress news column (white page, text-only nav, serif-everywhere mimicry) and generic AI blog templates (cream backgrounds, identical card grids, uppercase eyebrows on every section). News pages must use `BolShell` with `--ds-*` tokens on every route.

**Key Characteristics:**

- Dual-layer color: fixed dark chrome + theme-scoped content (`[data-content-area]`)
- Figtree for all UI; Source Serif 4 for headlines and editorial display only
- Red accent (`#ee3536`) reserved for active nav, category labels, and primary CTAs — not decoration
- Flat surfaces at rest; elevation appears only on hover or floating overlays
- Collapsible sidebar (16rem expanded / 3rem icon rail) drives header and sub-nav offset
- Reduced-motion alternatives for spring pill animation, marquees, and sidebar transitions

## Colors

The palette splits into **chrome** (always dark, platform identity) and **content** (scoped to the reading area, light or dark via `ContentThemeProvider`).

### Primary

- **BetOnline Red** (`#ee3536`): Active sidebar items, sub-nav pill indicator, category labels (`.news-label`), primary FAB, hover accent on content cards. The single brand accent — its scarcity is the point.
- **Red Pressed** (`#dc2a2f`): Hover state on primary actions and interactive red surfaces.

### Secondary

- **Join Green** (`#8ac500`): Positive conversion CTA in header ("Join"). Do not use for editorial category tags or decorative highlights.

### Tertiary

- **Chrome Surface** (`rgba(255,255,255,0.10)`): Sub-nav pill track, icon button groups, sidebar hover fills at 5% white. Structural layering within dark chrome, not accent.

### Neutral

**Chrome (always dark)**

- **Nav Charcoal** (`#2d2e2c`): Header background, html/body overscroll, outer page frame.
- **Sidebar Graphite** (`#2d2d2d`): Sidebar rail, expanded panel, dropdown menus in chrome, content emphasis blocks (featured hero scrim base).
- **Page Depth** (`#1a1a1a`): Sub-nav frosted backdrop tint; main inset background reference.
- **Chrome Muted** (`rgba(255,255,255,0.70)`): Default nav link and sidebar label color on dark surfaces. Bump to full white on hover/active.

**Content (scoped to `[data-content-area]`)**

- **Reading White** (`#ffffff` / dark: `#141414`): Main content background.
- **Ink** (`#0a0a0a` / dark: `#f5f5f5`): Body text and headings in content area.
- **Muted Copy** (`#737373` / dark: `#a3a3a3`): Metadata, timestamps, deck text. Must meet 4.5:1 on its background.
- **Card Surface** (`#ffffff` / dark: `#1f1f1f`): Article tiles, carousel cards, sidebar widgets.
- **Card Border** (`#e5e5e5` / dark: `rgba(255,255,255,0.10)`): 1px borders on content cards — full border, never side-stripe accents.
- **Content Surface** (`#f5f5f5` / dark: `#262626`): Inset panels, image placeholders, related-link backgrounds.
- **Hero Scrim Base** (`#383838`): Featured hero image fallback and gradient scrim anchor.

### Named Rules

**The Chrome Lock Rule.** Header, sidebar, and sub-nav never inherit content theme. They always render inside `data-bol-chrome` with dark `--ds-nav-bg` / `--ds-sidebar-bg`. Content light/dark toggle affects `[data-content-area]` only.

**The One Voice Rule.** BetOnline Red appears on active navigation, category labels, and primary actions — ≤10% of any screen. If red is everywhere, it is nowhere.

## Typography

**Display Font:** Source Serif 4 (`--font-news-serif`) — article titles, hero headlines, editorial `.news-headline` only.

**Body Font:** Figtree (`--font-sans`) — navigation, metadata, UI labels, article body prose outside display headings.

**Label Font:** Figtree — uppercase category labels via `.news-label` (0.75rem, 700 weight, 0.08em tracking).

**Character:** Humanist sans for speed and platform familiarity; serif display for editorial authority. The pairing is intentional contrast — never use serif in nav, buttons, or data UI.

### Hierarchy

- **Display** (700, `clamp(1.75rem, 4vw, 3rem)`, lh 1.15, -0.02em tracking): Hero and article H1. Use `text-wrap: balance`. Max clamp ceiling 3rem — not shouting.
- **Headline** (700, 1.5rem, lh 1.25): Section titles, card headlines in feed. Serif via `.news-headline`.
- **Title** (600, 1.125rem, lh 1.35): Sub-section headings, widget titles. Sans only.
- **Body** (400, 1rem, lh 1.6): Article prose. Max line length 42rem (`.article-col-prose`) for long-form; 65–75ch guideline for editorial blocks.
- **Label** (700, 0.75rem, 0.08em tracking, uppercase): Category kickers via `.news-label` — sparingly, not on every section.

### Named Rules

**The Serif Boundary Rule.** Source Serif 4 stops at the content headline layer. Nav pills, sidebar items, buttons, form labels, and metadata are always Figtree.

## Elevation

This system is **flat by default with tonal layering**. Depth is conveyed through background steps (`--ds-content-surface` vs `--ds-content-card-bg` vs `--ds-content-emphasis-bg`) and 1px borders — not ambient shadows at rest.

Shadows appear only as **state responses**: card hover (`shadow-md`), floating compose panels (`shadow-2xl`), dropdowns (`shadow-md` + `ring-1`), play-button overlay on video cards (`shadow-lg`). Featured hero uses a directional scrim gradient, not a drop shadow.

Sub-nav uses `backdrop-filter: blur(20px)` over `rgba(26,26,26,0.6)` — purposeful frosted chrome, not decorative glassmorphism on content cards.

### Shadow Vocabulary

- **Card hover** (`box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)`): Article tiles and feed cards on `:hover` only.
- **Floating panel** (`shadow-2xl`): Compose palette, block inspector — fixed overlays at z-index 230.
- **Dropdown** (`shadow-md` + `ring-1 ring-foreground/10`): Header "Other" menu, shadcn popovers.

### Named Rules

**The Flat-By-Default Rule.** Content cards ship with border + flat fill. Shadow is a hover affordance, not a permanent decoration.

## Components

### Shell (required on every page)

Every route wraps in **`BolShell`**: `SidebarProvider` → fixed chrome backdrop → `BolHeader` + `BolSidebar` → optional `BolSubNav` → `SidebarInset` content area → `BolFooter`.

- **Header offset:** `left: 16rem` expanded sidebar, `left: 3rem` collapsed; full-width on mobile.
- **Sub-nav offset:** Matches header; fixed at `top: 64px`, z-index 90.
- **Content spacer:** `BolSubNavSpacer` — 100px mobile / 115px desktop below sub-nav.
- **Content theme:** `SidebarInset` carries `data-content-area` + `data-content-theme`; light default, dark via `ContentThemeProvider`.

### Buttons

- **Shape:** 6px radius (`rounded-[6px]` / `.rounded-small`) in chrome; 10px base (`--radius: 0.625rem`, `rounded-lg`) for shadcn content buttons.
- **Primary (content):** shadcn `default` variant — dark fill in light content, inverted in dark content area.
- **Join (chrome):** `#8ac500` fill, white text, 6px radius, emerald hover step.
- **Login (chrome):** Transparent, `border-white/45`, white text, hover `bg-white/10`.
- **Ghost (chrome):** `text-white/70`, hover `bg-white/5` → full white.
- **Hover / Focus:** 150–200ms transitions; `focus-visible:ring-3 ring-ring/50` on shadcn buttons; chrome buttons suppress ring, use background shift.

### Navigation

**Header product pills:** Figtree 14px medium, `text-white/70`, 6px radius, hover `bg-white/5`. No active red pill in product nav — that vocabulary belongs to news sub-nav.

**Sub-nav pills:** Track `bg-white/5` rounded-3xl; active tab gets spring-animated red pill (`layoutId="activeTab"`, stiffness 400, damping 40). Tab text 12px medium. Mobile: horizontal scroll with snap, full-bleed.

**Sidebar:** Icon rail 3rem / expanded 16rem. Active item: full `--ds-primary` fill. Sub-items: `bg-white/10` when active. Logo crossfade: full wordmark expanded → red B lockup collapsed.

### Cards / Containers

- **Corner Style:** 12px (`rounded-xl`) for feed cards and article tiles.
- **Background:** `var(--ds-content-card-bg)` with `var(--ds-content-card-border)` 1px border.
- **Shadow Strategy:** None at rest; `hover:shadow-md` on interactive tiles.
- **Internal Padding:** 16px (`p-4`) standard; 20px (`p-5`) on library showcase cards.

### Featured Hero

Full-bleed image with charcoal scrim (`.news-featured-hero__scrim`) — directional gradient from `--ds-content-emphasis-bg`, not solid black overlay. Desktop: 102deg diagonal; mobile: bottom-up gradient.

### Editorial Prose

Article body uses width tokens: prose `42rem`, inset `20rem`, breakout `52rem`, full `56rem`. Drop cap via `.article-prose-drop-cap`. Multi-column prose collapses to single column below 768px.

### Politely RAW / Video

Video cards: 12px radius, play button white/95 circle with `shadow-lg` on hover scale. Politely RAW badge uses brand logo asset — microphone icon in sidebar nav only.

### Inputs / Overlays

shadcn form controls follow content theme tokens. Dropdowns portal with z-index 120+ in chrome context. Mobile sidebar drawer: z-index 100000 (stacking exception for vaul overlay).

## Do's and Don'ts

### Do:

- **Do** wrap every page in `BolShell` with `--ds-*` tokens and `data-bol-chrome` on header/sidebar.
- **Do** scope light/dark content theme to `[data-content-area]` — chrome stays dark regardless.
- **Do** use Source Serif 4 for headlines and Figtree for everything else in the UI layer.
- **Do** use BetOnline Red for active nav state and category labels only — sparingly.
- **Do** provide `@media (prefers-reduced-motion: reduce)` alternatives for spring animations, marquees, and sidebar transitions.
- **Do** use full 1px borders on cards (`--ds-content-card-border`) — not colored side stripes.
- **Do** match header/sub-nav left offset to sidebar width (16rem / 3rem) on desktop.

### Don't:

- **Don't** ship a legacy WordPress news layout — white editorial column, text-only left nav, detached serif stack mimicking the old site.
- **Don't** use generic AI blog templates — cream backgrounds, identical card grids, uppercase tracked eyebrows on every section.
- **Don't** render detached CMS preview pages that ignore the BOL Shadcn shell from `design-main`.
- **Don't** put Source Serif on nav labels, buttons, sidebar items, or metadata.
- **Don't** use gradient text (`background-clip: text`) or side-stripe border accents on cards.
- **Don't** apply glassmorphism to content cards — blur is for sub-nav chrome only.
- **Don't** force `min-h-screen` on content wrappers — pages should end at content, not create phantom scroll (see `bol-shell.tsx`, `globals.css`).
- **Don't** use arbitrary z-index values like 9999 outside the documented scale (sub-nav 90, header 101, overlays 120–230).
