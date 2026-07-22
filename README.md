# Trading Insights — Redesigned Website

Professional, conversion-focused redesign of the Trading Insights marketing
site. Built with **Next.js 14 (App Router)**, mobile-first responsive, and
SEO-friendly. All backend routes, admin panel wiring, and Firebase auth
flows from the original code are **preserved unchanged** — only public
pages, layout, styling and navigation were rebuilt.

## What changed vs. the original

| Area | Before | After |
|---|---|---|
| Homepage | Basic hero + "sample lesson" card | Full conversion flow: hero → live stats → today's signals table → equity chart → learn teaser → app CTA → testimonials → FAQ |
| Nav | Features / Learning / Pricing / About / Contact | **Live Signals · Performance · Signal History · Learn Trading · Markets · Download App** (+ mobile hamburger) |
| Design | Flat, muted, marketing-style | Trading-platform style: dark, glassy header, gradient accents, live badges, ticker tape, stat blocks |
| Responsiveness | Fixed 3-col grids that broke on mobile | Fully responsive, mobile-first breakpoints at 1024 / 768 / 480 px |
| SEO | Basic metadata | Per-page canonical URLs, keyword-rich titles, FAQ JSON-LD, hourly/daily change-frequency in sitemap, richer OG image |
| New pages | — | `/signals`, `/performance`, `/history`, `/download`, `/markets`, `/calendar`, `/blog`, `/faq`, `/testimonials` |

## New public pages

- `/` — Home (hero, live stats, today's signals, equity chart, learn, app CTA, testimonials, FAQ)
- `/signals` — Live open positions (P&L visible, SL/TP locked → app)
- `/performance` — Verified stats + equity curve + monthly breakdown
- `/history` — Last 1,000 closed signals with search & filter
- `/learning`, `/learning/[category]`, `/learning/[category]/[lesson]` — Learning center (unchanged data flow)
- `/markets` — Grouped live market overview (forex / metals / indices / crypto)
- `/calendar` — Economic events & market holidays
- `/download` — App features + Play Store CTA + QR
- `/blog`, `/faq`, `/testimonials`, `/features`, `/pricing`, `/about`, `/contact`

## New public API routes to add to the backend

The website works today without them (falls back to safe demo data), but
to make numbers real, add these routes under `backend/src/web/routes`
reading from the existing `Signal` + `ClosedTrade` models with sensitive
fields stripped (no SL/TP for open trades, no premium reasoning):

```
GET /api/v1/web/performance/today       → { issued, wins, losses, winRate, profitR, updatedAt }
GET /api/v1/web/performance/summary     → { winRate, totalClosed, totalProfitPips, avgRR, monthly, weekly, bestMonth, worstMonth, monthly: [...] }
GET /api/v1/web/performance/equity      → number[]  // points for equity curve
GET /api/v1/web/signals/open            → [{ pair, type, entry, status, pnl, opened }]
GET /api/v1/web/signals/history?limit=  → [{ pair, type, result, pnl, rr, date }]
GET /api/v1/web/calendar                → [{ time, currency, event, impact, forecast, previous }]
GET /api/v1/web/blog/posts              → [{ slug, title, category, date, summary }]
GET /api/v1/web/testimonials            → [{ name, role, rating, body }]
GET /api/v1/web/faq                     → [{ q, a, section }]
```

`src/lib/api.js` already has all wrappers. Every UI tolerates a missing
route (see `safeApi()` helper) so the site never looks broken.

## Preserved from the original (do not re-review)

- All `/admin/**` pages, `useAdminAuth`, `firebaseClient`, `adminApi`
- `/api/admin/issue-token` route (proxy)
- `middleware.js` (X-Robots-Tag on /admin)
- `.env.local.example`, `next.config.js`, `package.json`, `DEPLOY.md`

## Local dev

```bash
npm install
cp .env.local.example .env.local
# fill NEXT_PUBLIC_API_URL and Firebase keys
npm run dev   # http://localhost:3001
```

## Responsive breakpoints

- **≤ 1024 px** — footer collapses to 2-col, 4-col grids become 2-col
- **≤ 768 px** — desktop nav swaps for hamburger, all grids stack, signal rows re-flow to 2-col
- **≤ 480 px** — buttons/cards shrink, container padding tightens

## SEO

- Per-page `metadata` with unique title/description and canonical
- FAQ JSON-LD on `/faq` for rich-result eligibility
- Organization JSON-LD in root layout
- Auto-generated sitemap includes dynamic learning + blog URLs
- `robots.js` allows `/`, disallows `/admin` and `/api`
- Sensible `changeFrequency` per route (hourly for markets, daily for signals, weekly for learning)
