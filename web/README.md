# ExperienceKit.ai — marketing site

Production-ready landing page for [ExperienceKit.ai](https://experiencekit.ai), built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js 20.19+ (recommended) or 22.x / 24.x (matches upstream tooling expectations)
- npm 10+

## Setup

```bash
cd web
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000` (or pass a port: `npm run dev -- -p 4000`). The dev server uses Turbopack by default (see `package.json`).

**If hero SVGs or motion feel “missing”:** run from the **`web/`** directory (not the repo root), stop any old `next dev` / `next start` on that port, then `npm run dev:clean` to clear `.next` and start fresh. Wrong cwd or a stale server is the most common cause of broken `/brand/*.svg` loads.

**Production (`npm run start`):** After you add or move files under `public/` (for example `/brand/*.svg`), run **`npm run build`** again and **restart** the server so those assets are served correctly. If images return 404, a stale `next start` process is the usual cause.

## Production build

```bash
npm run build
npm run start
```

## Project structure

| Path | Purpose |
|------|---------|
| `src/app/` | App Router: `layout.tsx`, `page.tsx`, `kits/`, `track/`, `orders/`, `api/assistant`, `api/track`, `globals.css`, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx` |
| `src/components/` | UI primitives, site chrome, motion helpers, and landing sections |
| `src/components/sections/` | Consolidated home sections (fewer, denser blocks—see `landing-page.tsx`) |
| `src/lib/` | Utilities (`cn`), shared UI helpers (`cardSurface`), navigation constants |

## SEO & discovery

- **Metadata** is defined in `src/app/layout.tsx` (title, description, Open Graph, Twitter card, `robots`, canonical URL, keywords, JSON-LD `@graph` with `WebSite` + `Organization`).
- **`/sitemap.xml`** — `src/app/sitemap.ts` (single home URL; extend when you add routes).
- **`/robots.txt`** — `src/app/robots.ts` (allows all crawlers, points to sitemap).
- **Open Graph image** — `src/app/opengraph-image.tsx` (1200×630, Satori-compatible inline styles). Linked from metadata as `/opengraph-image`.

Update `siteUrl` and `metadataBase` in `layout.tsx` (and the same base in `robots.ts` / `sitemap.ts`) if you use a staging domain.

## Accessibility & UX notes

- **Skip link** — first focusable control in `layout.tsx` (`SkipLink`) jumps to `#top` (main content).
- **Landmarks** — `main` exposes `aria-label`; section headings use stable `id`s for `aria-labelledby` where applicable.
- **Focus styles** — buttons, inputs, FAQ `<summary>`, and the mobile menu control use visible `focus-visible` rings (amber + offset).
- **Mobile sticky CTA** — `StickyMobileCta` appears after light scroll on small viewports; uses `inert` when hidden so it does not trap keyboard focus.
- **Form** — `ContactForm` wires `aria-describedby` to the inline error region, sets `aria-invalid` on name/email when validation fails, and moves focus to the success heading after submit.

## Performance

- **Framer Motion** is limited to the hero and lightweight `FadeIn` sections; respects `prefers-reduced-motion` in `FadeIn` and for `.ek-card-lift` hover in `globals.css`.
- **`optimizePackageImports`** for `lucide-react` is enabled in `next.config.ts` to trim icon bundle size.

## Deployment

### Vercel (recommended)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In [Vercel](https://vercel.com), create a new project and import the repo.
3. **Root Directory — pick one:**
   - **Monorepo root (`.` / empty):** uses the repo-level [`vercel.json`](../vercel.json) to `cd web && npm ci` and `npm run build`. Use this if production was **404** while the dashboard pointed at the wrong folder.
   - **`web`:** Vercel’s cwd is `web/`; only [`vercel.json`](./vercel.json) here applies. Build/install stay `npm ci` / `npm run build` in that folder.
4. Framework preset: **Next.js** (auto when `web/package.json` has `next`).
5. Add your production domain (`experiencekit.ai`) under **Domains** and configure DNS per Vercel.

`web/vercel.json` pins the framework and build/install when the project root is **`web/`**.

**Optional — Vercel plugin for coding agents** ([docs](https://vercel.com/docs/agent-resources/vercel-plugin)):

```bash
printf 'y\n' | npx plugins add vercel/vercel-plugin
```

Restart agent tools in Cursor after install. Targets may show “Claude Code”; Cursor still receives the marketplace bundle.

**CLI deploy** (when you are logged in: `npx vercel login`):

```bash
cd web
npx vercel link    # once per machine
npx vercel deploy --prod
```

For non-interactive CI, use a [Vercel token](https://vercel.com/account/tokens) and `VERCEL_TOKEN`, plus linked project env vars.

After first deploy, confirm:

- `https://your-domain/robots.txt`
- `https://your-domain/sitemap.xml`
- `https://your-domain/opengraph-image` (or use social debuggers for OG/Twitter previews)

### “Site not loading” (apex works, `www` spins or fails)

If the **apex** domain responds but **`www`** never loads, the apex is probably **redirecting to `www`** while **`www` is missing or wrong in DNS**. In your DNS host (often Cloudflare):

1. Vercel → Project → **Domains** → copy the exact **CNAME** target Vercel shows for `www` (commonly `cname.vercel-dns.com` or a `*.vercel.app` target).
2. Add a **`www`** record: type **CNAME**, name **`www`**, target as Vercel instructs, **DNS only** / not proxied if Vercel asks for it during verification.
3. Wait for TTL, then test `https://www.your-domain/` in an incognito window.

**Project root:** the Next app always lives in **`web/`** in Git. Vercel must either build that folder via **Root Directory = `web`**, or via **Root Directory = repo root** plus the repo-level `vercel.json` that runs commands in `web/`.

**CLI “Unexpected error” on deploy:** open the deployment **Inspect** link from the CLI output in the Vercel dashboard and read **Build** / **Functions** logs; retry deploy or use **Redeploy** from the latest successful Git commit.

### Cloudflare (Pages / Workers)

Next.js on Cloudflare usually needs an adapter (for example the **OpenNext**-based flow or **`@cloudflare/next-on-pages`**) because the default Node runtime differs from Workers. High-level steps:

1. Push the repo to GitHub/GitLab.
2. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → connect the repo.
3. Set the app **root directory** to `web` and follow Cloudflare’s **Next.js** guide for build command, output directory, and any required adapter package—see [Cloudflare Pages + Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/).
4. Attach **experiencekit.ai** under your zone: **Custom domains** for the project, then add the DNS records Cloudflare shows (often a `CNAME` to `*.pages.dev` or the Workers route they provide).

If you want the lowest-friction path for a standard App Router deploy, **Vercel** above is usually simpler; you can still keep DNS on Cloudflare and only point the hostname to Vercel (CNAME to `cname.vercel-dns.com`) per Vercel’s domain docs.

### Other Node hosts

Run `npm run build` then `npm run start` with `NODE_ENV=production`, or containerize the same. Expose the HTTP port your platform expects.

## Forms and integrations

The contact / demo form validates in the browser and shows an accessible success state. To persist leads, wire `ContactForm` (`src/components/contact-form.tsx`) to your CRM, email API, or a server action—store provider credentials in environment variables and never commit secrets.
