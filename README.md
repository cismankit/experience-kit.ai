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

- **Recommended:** set the project **Root Directory** to the **repository root** (`.` / empty). The repo-level [`vercel.json`](./vercel.json) runs `npm ci` and `npm run build` **inside `web/`**, so production builds even if the dashboard was previously pointed at the wrong folder.
- **Alternative:** set **Root Directory** to **`web`** only. In that case Vercel scopes the project to `web/` and typically **ignores** the repo-level `vercel.json`; rely on [`web/vercel.json`](./web/vercel.json) instead.
- If **`*.vercel.app` or your domain returns 404** but the deployment shows **Ready**, open **Deployments →** that deployment → confirm it is **Production** and not only Preview; turn off **Deployment Protection** for production if preview URLs return **401**.
- Cloudflare: use **SSL/TLS → Full (strict)** when a record is **Proxied** (orange cloud).

## Conventions

- Prefer confirming live positioning in a browser when the production site is available; capture notes under `docs/`.
- Keep `content/` as draft source-of-truth; avoid committing secrets or unpublished pricing if this folder is pushed to git.
