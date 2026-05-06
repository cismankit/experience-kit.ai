# Experience Kit AI — workspace

Workspace for planning, content, and the public marketing site for **[experiencekit.ai](https://experiencekit.ai)**.

## Layout

| Path | Purpose |
|------|---------|
| `web/` | **Next.js landing page** — production site code (see `web/README.md`) |
| `docs/` | Site notes, IA, SEO, research, snapshots |
| `content/` | Draft copy and messaging before it ships to the site |
| `AGENTS.md` | Agent / contributor context for this repository |

## Quick start (site)

```bash
cd web
npm install
npm run dev
```

Deployment and environment notes live in [`web/README.md`](./web/README.md).

## Push to GitHub

Canonical remote: **[cismankit/experience-kit.ai](https://github.com/cismankit/experience-kit.ai)**.

```bash
cd /path/to/experiencekit-ai
git remote add origin https://github.com/cismankit/experience-kit.ai.git
git push -u origin main
```

If `origin` already exists, use `git remote set-url origin https://github.com/cismankit/experience-kit.ai.git` instead of `git remote add`.

### Vercel (important)

The Next.js app lives only under **`web/`**. Vercel must use that folder as the project root so `next.config`, `public/`, and `package.json` resolve correctly.

**Dashboard → Settings → Build & Deployment:**

1. **Root Directory:** **`web`** (required).
2. **Framework Preset:** **Next.js** (not **Other**).
3. **Output Directory:** leave **empty** (Next default).
4. **Install** / **Build:** leave **default** so [`web/vercel.json`](./web/vercel.json) applies (`npm ci --include=dev`, `npm run build`). Production installs omit devDependencies unless **`--include=dev`** is set—without it, Tailwind/PostCSS fail the build.
5. **Redeploy** production after saving settings.

**CLI (optional):** from the repo root, `cd web && npx vercel` (or `npx vercel --prod` after `vercel link`). The linked project should still use **Root Directory = web** in the dashboard when the Git integration builds from GitHub.

**Local monorepo (optional):** root [`package.json`](./package.json) still supports **`npm ci`** at the repo root and **`postinstall`** / **`build`** that delegate into **`web/`** for contributors; Vercel does **not** use that file when **Root Directory** is **`web`**.
- If **`*.vercel.app` or your domain returns 404** but the deployment shows **Ready**, open **Deployments →** that deployment → confirm it is **Production** and not only Preview; turn off **Deployment Protection** for production if preview URLs return **401**.
- If the **apex** redirects to **`www`** but **`www` returns `NOT_FOUND`** from Vercel, **`www` is not attached to this project** (or DNS for `www` points at Vercel without the hostname being added). In Vercel → **Domains**, add **`www.experiencekit.ai`** to the same project as production and apply the **CNAME** / DNS values Vercel shows for `www` (do not use the apex nameserver target for `www`).
- Cloudflare: use **SSL/TLS → Full (strict)** when a record is **Proxied** (orange cloud).

## Conventions

- Prefer confirming live positioning in a browser when the production site is available; capture notes under `docs/`.
- Keep `content/` as draft source-of-truth; avoid committing secrets or unpublished pricing if this folder is pushed to git.
