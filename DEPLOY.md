# Deploying the website alongside your existing backend

This covers getting both pieces running on your VPS as **two independent
PM2 processes** sharing one nginx server: your existing `trading-api`
(unchanged behavior, now with one small additive module) and the new
`trading-website` (Next.js).

The site is **fully public** — no visitor login/registration. The only
auth on it is `/admin`, for content management, gated by the same admin
identity your existing admin app already uses.

> **I can't run these commands for you.** I don't have SSH access to your
> VPS, and my sandboxed dev environment can only reach package registries
> (npm/GitHub), not arbitrary servers — so this is a "run it yourself"
> guide, not something I executed remotely. If you'd like to paste command
> output back to me as you go, I can help debug in real time.

## 0. What you're deploying

- `backend/` — your existing `trading-api`, plus the isolated `src/web/`
  module (Learning Center + contact form APIs) and three small additive
  edits to `src/server.js`. Everything else is untouched. See
  `backend/src/web/README.md` for what was added and why.
- `website/` — the public Next.js site (no user accounts) + `/admin`
  content-management screens, wired to real data throughout.

## 1. Backend: deploy the updated code

```bash
# On your VPS, wherever /opt/trading-api currently lives:
cd /opt/trading-api

# Back up first
cp -r /opt/trading-api /opt/trading-api-backup-$(date +%s)

# Copy the new backend/ folder contents over your existing deployment
# (rsync shown; scp/git push/however you normally deploy works too)
rsync -av --exclude node_modules --exclude .env /path/to/backend/ /opt/trading-api/

npm install     # picks up the one new dependency (sanitize-html)
pm2 reload ecosystem.config.js --only trading-api --env production
pm2 logs trading-api --lines 50   # confirm it boots clean, watch for
                                   # "[web] Website module mounted"
```

Nothing about your `.env`, `MONGO_URI`, Firebase service account,
`ADMIN_SECRET_TOKEN`/`ADMIN_JWT_SECRET`, or `APP_SECRET` needs to change —
the new module reuses all of it as-is.

**One env var to add:** if the website is served from a different origin
than your app expects (e.g. `https://www.yourdomain.com` calling
`https://api.yourdomain.com`), add that origin to your existing
`ALLOWED_ORIGINS` env var so CORS allows it. No code change — just env.

## 2. Website: build and deploy

```bash
# On your VPS:
mkdir -p /opt/trading-website
rsync -av --exclude node_modules --exclude .next /path/to/website/ /opt/trading-website/

cd /opt/trading-website
cp .env.local.example .env.production
nano .env.production   # fill in NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SITE_URL
                        # (your real domain — used by sitemap.xml/OG tags),
                        # and the admin login values (see step 3)

npm install
npm run build           # runs `next build`
pm2 start /opt/trading-api/ecosystem.config.js --only trading-website --env production
```

The site runs on **port 3001** (the API keeps port 3000 — see
`ecosystem.config.js`, updated to include both apps as separate entries).

## 3. Admin login setup (one-time, ~5 minutes)

`/admin` reuses your **existing** admin identity system end-to-end — no
new admin accounts to create. It needs two things configured:

**a) Firebase Web app** (same project your app/admin panel already use):
1. Firebase Console → your project → ⚙️ Project settings → General →
   "Your apps" → if there's no **Web** app yet, click **Add app → Web**
   (the `</>` icon), any nickname, skip hosting setup.
2. Copy the `firebaseConfig` values into `.env.production`
   (`NEXT_PUBLIC_FIREBASE_*` keys).

**b) The admin app secret** — only needed if your backend's `.env` sets
`APP_SECRET`:
1. Copy that exact value into `.env.production` as `ADMIN_APP_SECRET`
   (no `NEXT_PUBLIC_` prefix — it stays server-side, see
   `src/app/api/admin/issue-token/route.js` for why).
2. If your backend doesn't set `APP_SECRET` at all, leave this blank.

Then rebuild (`npm run build` — these are baked in at build time) and
`pm2 restart trading-website`.

**Who can log in:** anyone who's already an admin per your existing rules
(`ADMIN_UIDS` env var, `User.isAdmin` in Mongo, or Firebase RTDB
`admins/{uid}`) — same email/password they already use for the admin app.
Nothing new to provision. If you've enabled Admin Device Lock
(`ADMIN_DEVICE_LOCK_ENABLED=true`), this browser's device ID will need to
be added to `ADMIN_DEVICE_IDS` too — it's shown on `/admin` after a failed
login attempt, or in the dashboard once logged in.

Until this is configured, the public site works fine; `/admin/login` just
shows a "not configured yet" message instead of crashing.

## 4. nginx

See `nginx/example.conf` — adjust the two `server_name` /
`proxy_pass` blocks (API on 3000, website on 3001) for your actual
domain(s), then:

```bash
sudo ln -s /path/to/example.conf /etc/nginx/sites-enabled/trading.conf
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com   # if not already on TLS
```

## 5. Verify

```bash
pm2 status                      # both trading-api and trading-website "online"
curl -I https://yourdomain.com/api/v1/web/config/public   # through the API
curl -I https://www.yourdomain.com/                        # through the site
```

Then in a browser: visit the public site (no login anywhere), check
`/learning` (empty until you add content — see step 6), and log into
`/admin` with your existing admin credentials once Firebase + the app
secret are configured.

## 6. Add your first Learning Center content

Log into `/admin` → **Learning center** → add a category, then add a
lesson to it (title, summary, HTML content, optional cover image / video /
PDF) and set its status to **Published**. It appears on the public
`/learning` pages immediately — no rebuild needed, this is all live data.

## What's genuinely done vs. what still needs your input

**Fully wired to real data, nothing fabricated:**
- Public site: fully open, no accounts, no gated pages.
- Learning Center — public pages + full `/admin` CRUD UI, isolated storage.
- Contact form → stored + triageable from `/admin`.
- `/admin` login → your real existing admin identity
  (`POST /api/v1/admin/issue-token`, unmodified) — not a new account system.
- Pricing page's "X-day free trial" line → pulled live from your existing
  trial-days setting.
- SEO: dynamic `sitemap.xml` (static pages + live Learning Center content),
  `robots.txt`, Open Graph + Twitter Card tags, JSON-LD structured data,
  a real favicon, a generated social-share image, and per-page meta
  descriptions throughout. `/admin` is excluded from both the sitemap and
  search indexing (`robots.txt` + an `X-Robots-Tag: noindex` header).

**Needs your input before launch:**
- Firebase Web config + `ADMIN_APP_SECRET` (step 3) — I don't have access
  to your Firebase console or `.env`.
- Learning Center has no content yet — add it via `/admin` (step 6).
- Pricing page numbers are clearly-marked placeholders — this backend has
  no plan/pricing catalog to source real ones from, and no payment/checkout
  flow exists for the website (the app's payment system is a manual
  deposit/EA-license flow, not web billing). Edit the real numbers in, or
  ask for a checkout flow (e.g. Stripe) as a follow-up.
- Privacy Policy / Terms pages are placeholder legal text — real copy
  needs to come from you/your counsel, not be invented.
- Contact form doesn't send an email notification (no SMTP configured in
  this backend) — messages land in `/admin` only, until you add SMTP
  credentials.
