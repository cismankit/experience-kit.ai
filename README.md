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

**Dashboard (Build & Deployment → Build & Development Settings):**

1. **Framework Preset:** choose **Next.js**, not **Other**. **Other** makes Vercel treat the project like a static site and default to an **Output Directory** of **`public`**, which triggers **“No Output Directory named public”** for this repo — Next.js emits **`.next`**, not **`public`** at the repo root.
2. **Output Directory:** leave **empty** (default). Do not set **`public`** unless you are intentionally deploying a static export with that folder.
3. **Root Directory:** **`./`** (repository root) is correct for the current layout; root [`package.json`](./package.json) runs the app build via **`web/`**.

- **Recommended:** set the project **Root Directory** to the **repository root** (`.` / empty). Repo-root [`vercel.json`](./vercel.json) sets **`framework`** to **`nextjs`**, **`installCommand`** to **`npm ci`**, **`buildCommand`** to **`npm run build`**, and **`outputDirectory`** to **`null`** so Vercel uses automatic Next.js output handling instead of a stale dashboard **Output Directory** (for example **`public`** at the repo root, which breaks this layout). The repo-level [`package.json`](./package.json) lists **`next`** for detection, and **`postinstall`** runs **`npm ci --prefix web --include=dev`** so **`web/`** gets a full install (Tailwind/PostCSS and other **devDependencies** are required at **`next build`** time; Vercel sets **`NODE_ENV=production`** during install, which would otherwise omit them). **`npm run build`** delegates to **`web`** (`npm run build --prefix web`).
- **Alternative:** set **Root Directory** to **`web`** only. Vercel then installs and builds only inside **`web/`**; the root **`package.json`** and root **`vercel.json`** are ignored. Use [`web/vercel.json`](./web/vercel.json) for overrides scoped to that app.
- **Dashboard sync:** if the UI still shows **Other** or a custom output path, use the steps above; root **`vercel.json`** should align the project, but matching the dashboard avoids confusion.
- If **`*.vercel.app` or your domain returns 404** but the deployment shows **Ready**, open **Deployments →** that deployment → confirm it is **Production** and not only Preview; turn off **Deployment Protection** for production if preview URLs return **401**.
- If the **apex** redirects to **`www`** but **`www` returns `NOT_FOUND`** from Vercel, **`www` is not attached to this project** (or DNS for `www` points at Vercel without the hostname being added). In Vercel → **Domains**, add **`www.experiencekit.ai`** to the same project as production and apply the **CNAME** / DNS values Vercel shows for `www` (do not use the apex nameserver target for `www`).
- Cloudflare: use **SSL/TLS → Full (strict)** when a record is **Proxied** (orange cloud).

## Conventions

- Prefer confirming live positioning in a browser when the production site is available; capture notes under `docs/`.
- Keep `content/` as draft source-of-truth; avoid committing secrets or unpublished pricing if this folder is pushed to git.
