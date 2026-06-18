# Product

## Register

product

## Users

BetOnline readers and bettors looking for sports news, expert analysis, picks, and betting resources. They arrive from organic search, direct navigation from betonline.ag, or referral traffic. Context is informational — researching events, reading analysis, or finding guides — often on mobile during commutes or on desktop during research sessions.

## Product Purpose

Replace the legacy WordPress news site at `betonline.ag/news/` with a headless Sanity + Next.js platform that is fast, SEO-ready, and self-service for editors. Success means editorial autonomy, measurable SEO recovery, and a UI that matches the BetOnline Shadcn design system — not a separate blog skin.

## Brand Personality

Confident, sharp, sports-native. Three words: **expert**, **direct**, **premium**. The news surface should feel like part of BetOnline's product shell (dark chrome, red accent, collapsible sidebar, pill sub-nav) — not a detached WordPress magazine.

## Anti-references

- Legacy WordPress news layout (white editorial column, text-only left nav, serif headline stack mimicking old site)
- Generic AI blog templates (cream backgrounds, card grids, uppercase tracked eyebrows on every section)
- Detached CMS preview pages that ignore the BOL Shadcn shell from `design-main`

## Design Principles

1. **Shell first** — Every news page uses the BOL app shell: fixed header, collapsible icon sidebar, pill sub-nav, `--ds-*` tokens.
2. **Editorial inside product** — News content lives inside the dark BOL chrome; typography and hierarchy serve reading without breaking platform consistency.
3. **SEO by architecture** — Lifecycle fields, canonicals, and structured data are first-class, not bolted on.
4. **Performance is trust** — Static-first delivery; no layout shift from images or nav.
5. **Proof-of-pattern** — This site establishes vocabulary (lifecycle states, required SEO fields) other BetOnline surfaces can inherit.

## Accessibility & Inclusion

WCAG 2.1 AA target. Reduced-motion alternatives for sidebar/logo animations and sub-nav pill transitions. Contrast verified on dark surfaces with white/70 secondary text bumped where needed.
