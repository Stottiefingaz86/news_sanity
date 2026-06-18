# BetOnline News

Modern headless news site replacing the legacy WordPress installation. Built with **Sanity.io**, **Next.js 16**, and the **BOL Shadcn design system**.

## Structure

```text
bol_news/
├── studio-bol_news/ # Sanity Studio (CMS) — project qnc97v7c
├── studio/          # Legacy studio (project 4wpr1c6o, deprecated)
├── web/             # Next.js 16 frontend (served at /news)
└── package.json     # npm workspaces root
```

## Prerequisites

- Node.js 20+
- Sanity account with access to project `qnc97v7c` (bol_news)
- Design system reference: `~/BOL_SHADCN/BOL_UPDATE/design-main`

## Quick start

```bash
# Install all workspace dependencies
npm install

# Copy env files
cp web/.env.example web/.env.local
cp studio-bol_news/.env.example studio-bol_news/.env

# Log in to Sanity (required once for Studio dev)
cd studio-bol_news && npx sanity login && cd ..

# Run frontend + CMS
npm run dev:web      # http://localhost:3000/news
npm run dev:studio   # http://localhost:3333
```

## Design system

Brand tokens are sourced from the BOL Shadcn update project (`design-customizer.tsx`):

| Token | Value | Usage |
| --- | --- | --- |
| `--ds-primary` | `#ee3536` | Category labels, accents |
| `--ds-primary-hover` | `#dc2a2f` | Hover states |
| `--ds-nav-bg` | `#2D2E2C` | Top navigation |
| `--ds-sidebar-bg` | `#2d2d2d` | Sidebar navigation |
| `--ds-accent-green` | `#8ac500` | Join CTA |
| `--ds-content-bg` | `#ffffff` | Editorial content area |

Typography: **Figtree** (UI) + **Source Serif 4** (headlines).

UI components use **shadcn/ui** (base-nova preset). Run `npx shadcn@latest add <component>` from `web/`.

## AI tooling

Installed in this repo:

- **Impeccable** — design quality skill (`/impeccable init` to capture project context)
- **shadcn/ui skill** — component-aware AI guidance

```bash
npx impeccable skills install -y --providers=cursor --scope=project
npx skills add shadcn/ui -y
```

## Sanity

- **Project ID:** `qnc97v7c`
- **Organization:** bol_news (stottiefingaz@gmail.com)
- **Dataset:** `production`
- **Schema:** article, author, category (with SEO lifecycle fields per PRD)

If `npm create sanity@latest` fails in CI/unattended mode, run `npx sanity login` locally first.

## Next steps (per PRD)

1. Wire Sanity GROQ queries into page templates
2. Implement SEO layer (canonicals, JSON-LD, sitemap, redirects)
3. Add Cloudflare Workers deployment via `@opennextjs/cloudflare`
4. Content migration from WordPress
5. Testing suite (Vitest, Playwright, Lighthouse CI)

## Related docs

See the project PRD (v1.7) for scope, success criteria, and ADR references.
