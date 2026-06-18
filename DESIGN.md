# Design

Source of truth: `~/BOL_SHADCN/BOL_UPDATE/design-main` (BetOnline Shadcn update project).

## Theme

Dark product shell. News editorial content renders on `--ds-page-bg` (#1a1a1a) inside the standard BOL layout — not a white WordPress-style column.

## Color Palette

| Token | Value | Usage |
| --- | --- | --- |
| `--ds-primary` | `#ee3536` | Active nav pills, category accents, CTAs |
| `--ds-primary-hover` | `#dc2a2f` | Hover on primary |
| `--ds-nav-bg` | `#2D2E2C` | Top header, html overscroll |
| `--ds-sidebar-bg` | `#2d2d2d` | Sidebar rail + expanded panel |
| `--ds-page-bg` | `#1a1a1a` | Main content background |
| `--ds-card-bg` | `#2d2d2d` | Cards, tiles |
| `--ds-accent-green` | `#8ac500` | Join / positive CTA |
| `--ds-surface-10` | `rgba(255,255,255,0.10)` | Sub-nav track, icon pill groups |

## Typography

- **UI:** Figtree (`--font-sans`) — nav, metadata, body UI
- **Display / headlines:** Source Serif 4 (`--font-news-serif`) — article titles only, not nav

## Components

### Shell (required on every page)

1. **`BolShell`** — `SidebarProvider` + backdrop + sidebar + header + sub-nav + `SidebarInset`
2. **`BolHeader`** — Fixed `data-nav-header`, product pills (Sports, Casino, Poker, Promotions, Other), Login / Join
3. **`BolSidebar`** — Collapsible icon rail (`16rem` / `3rem`), BetOnline logo (full wordmark expanded, red B lockup collapsed)
4. **`BolSubNav`** — Fixed `data-sub-nav`, `AnimateTabs` pill bar with `layoutId="activeTab"` red pill

### Brand

- **`BetOnlineLogoFull`** — Inline SVG wordmark (640×86), red B + white ONLINE
- **`BetOnlineLogoLockup`** — Red B icon (114×86) for collapsed sidebar

### Primitives

- `components/ui/sidebar.tsx` — from design-main (icon collapse, mobile drawer)
- `components/animate-ui/components/base/tabs.tsx` — animated sub-nav pills

## Layout

```
┌─────────────────────────────────────────────────────────┐
│ [sidebar] │ HEADER: toggle │ Sports Casino … │ Login  │
├───────────┼─────────────────────────────────────────────┤
│  icon     │ SUB-NAV: [Latest] [Picks] [Analysis] …      │
│  rail     ├─────────────────────────────────────────────┤
│  + menu   │ MAIN: news feed / article content           │
└───────────┴─────────────────────────────────────────────┘
```

- Header `left` offset: `3rem` collapsed sidebar, `16rem` expanded
- Sub-nav `left` matches header offset
- Content spacer: 64px header + ~52px sub-nav

## Motion

- Sub-nav active pill: spring `layoutId="activeTab"`, stiffness 400, damping 40
- Sidebar logo: crossfade full ↔ lockup on collapse
- `@media (prefers-reduced-motion: reduce)`: disable spring layout animations

## References

- Canonical shell: `design-main/app/casino/page.tsx` (header ~8491, sidebar ~8914, sub-nav ~9595)
- Brand tokens: `design-main/components/design-customizer.tsx`, `public/brands/brands_design_tokens.json`
