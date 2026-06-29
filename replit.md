# Lyca Mobile KX Platform

A React/Vite/TypeScript customer support portal for Lyca Mobile US — branded knowledge center, guided help, AI chatbot, international explorer, coverage checker, and admin analytics.

## Run & Operate

- `pnpm --filter @workspace/lyca-kx run dev` — run the frontend (port 5000 via workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (if API server used)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18, Vite 7, Tailwind CSS, shadcn/ui, Framer Motion
- Routing: Wouter
- API: Express 5 (in artifacts/api-server)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- PDF export: jsPDF

## Where things live

- `artifacts/lyca-kx/src/pages/` — page-level components (Home, HelpPage, PlansPage, etc.)
- `artifacts/lyca-kx/src/components/sections/` — main content sections (HeroSearch, JumpToNav, CoverageChecker, ServiceStatus, etc.)
- `artifacts/lyca-kx/src/components/panels/` — sliding panels (AIAssistant/LIA, AdminPanel, AccessibilityPanel)
- `artifacts/lyca-kx/src/components/shared/` — shared components (ArticleModal, etc.)
- `artifacts/lyca-kx/src/data/articles.ts` — all knowledge base articles (source of truth)
- `artifacts/lyca-kx/src/lib/analytics.ts` — client-side analytics tracking + session logging

## Architecture decisions

- All analytics are client-side (localStorage) — no backend required for the portal to function
- Voice search uses Web Speech API with `window.isSecureContext` guard; works on HTTPS (published site), degrades gracefully on HTTP with a clear message
- CoverageChecker uses simulated coverage data keyed by city/state name patterns — no external API required
- JumpToNav uses IntersectionObserver to track active section; all sections have stable HTML `id` attributes
- Article feedback state resets via `useEffect([article?.id])` so switching related articles always starts fresh

## Product

- **Home page** — hero search, jump-to nav, help topics, service status, coverage checker, simulator, knowledge center, blog, app download, international rates
- **Help & Support page** — same sections as Home, plus sticky jump-to navigation
- **Plans page** — duration dropdown (1/3/6/12 months) with discount pricing, side-by-side plan cards
- **LIA AI chatbot** — floating panel with suggested questions, agent escalation flow, survey, PDF transcript export
- **Admin panel** (password: 1111) — search analytics table, conversation logs, ratings & surveys

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Voice search requires HTTPS — won't work on plain HTTP dev URLs; the app shows a clear message in that case
- JumpToNav `position: sticky` sits at `top: 64px` (below the 64px header); the header must stay at `h-16`
- CoverageChecker section requires `id="coverage"` — already set in the component

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Main app workflow: "Start application" → port 5000
