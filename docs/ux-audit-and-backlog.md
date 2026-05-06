# ExperienceKit.ai — UX audit & improvement backlog (May 2026)

## Benchmark mapping (inspiration only)

| Reference | What we borrow | How it shows up here |
|-----------|----------------|----------------------|
| KiwiCo | Age-fit journeys, what’s inside, outcomes | Kit catalog filters, first-mission copy, capstone callouts |
| Brilliant | Guided steps, concise explanations | How-it-works stepper, mission library cards |
| Duolingo | Daily rhythm, bite missions | `/missions` spotlight + library (no punitive streaks) |
| LMS-style | Paths, cohort clarity | `/schools` pilot timeline, support routing |

Premium / AI-native tone: no toy visuals; motion only for clarity.

## 1. Route inventory (codebase)

| Route | Purpose | Notes |
|-------|---------|--------|
| `/` | Home — orientation + decision paths | Two lanes (Discover / For schools); sections composable |
| `/kits` | Kit catalog | Long-scroll grid pre-P0; needs filters + comparison |
| `/track` | Order lookup | Utility — keep lean |
| `/orders` | Order history / desk | Operational language acceptable; not linked from main nav by default |
| `/find-kit` | **P0** Guided kit quiz | Dedicated decision path (was hash-only) |
| `/missions` | **P0** Mission library & today’s mission | Repeat engagement surface |
| `/schools` | **P0** Institutional pilot story | Consolidates school conversion |
| `/support` | **P0** Routed help | Cards → right next action |
| `/api/assistant` | AI assistant | Backend |
| `/api/track` | Track API | Backend |

## 2. Findings (pre-change)

### 2.1 Length & repetition

- **Home (Discover lane):** Multiple bands with similar promises (kits, missions, proof). Role selector + finder + featured kits overlap conceptually — acceptable if framed as **choose → match → compare** (P0 tightens copy order).
- **Kits:** Four full-width cards stacked = long page. **Fix:** Filters + collapsed comparison; first mission / outcome surfaced on cards.
- **Operational language on marketing:** Some FAQ/order copy referenced internal flows; public copy should say *track your order*, *message us*, not desk/webhook language (tracked in P1 wording pass).

### 2.2 Duplicate CTAs / nav

- **Header:** “Find my kit” appeared in **nav** and as **primary button**; “Kits” + “Catalog” overlapped.
- **Hero shortcuts** repeated “Find my kit” again.
- **Footer** repeated finder CTAs.
- **Fix (P0):** One primary header CTA (`/find-kit`); nav uses routes not hash soup; remove “Manage” unless `NEXT_PUBLIC_ORDER_PORTAL=1`.

### 2.3 Missing user paths

- **Parents / learners:** Strong on home; **P0** adds `/missions` and `/find-kit` as dedicated paths.
- **Educators / schools:** Home schools lane + **P0** `/schools` for full institutional story without scrolling the consumer page.
- **Support:** **P0** `/support` routes by intent.

### 2.4 Missing or weak product surfaces

- Mission library (beyond rotating preview): **P0** `/missions`.
- School pilot as standalone: **P0** `/schools`.
- Kit comparison filters: **P0** on `/kits`.
- Proof upload **preview** / learner **dashboard** preview: **P2** (illustrative UI, no backend) — backlog.

## 3. Prioritized backlog

### P0 (shipped in this pass)

- Clean navigation + single primary CTA; optional order portal via env.
- Homepage IA: role → today’s mission → match/finder → how it works (incl. AI reflection) → proof → school CTA → FAQ/contact.
- Product-loop hero visual (kit → mission → reflect → proof → progress).
- New routes: `/find-kit`, `/missions`, `/schools`, `/support`.
- Kits page: age / goal / setting filters backed by catalog tags.
- Fix duplicate `id="contact"` / `id="faq"` when both home lanes mount (unique anchors).
- Sitemap updated for new routes.

### P1

- “What’s inside” **modal** on kit cards (catalog) for faster scan vs inline lists.
- Dashboard / proof-upload **preview** mock (static) for schools and learners.
- Copy sweep: remove remaining ops jargon from public FAQ/hero.
- `/orders` alignment with auth when available.

### P2

- Authenticated “Manage” / account area; hide all order tools until session exists.
- Deeper Brilliant-style **interactive** mission teaser (1–2 inline interactives).
- CMS or structured content for missions if catalog grows.

## 4. Design principles (locked)

- **Decision paths > scroll paths.**
- Motion only for clarity; respect `prefers-reduced-motion`.
- Premium, AI-native tone — not toy gamification; encouraging progress only.

## 5. Env

- `NEXT_PUBLIC_ORDER_PORTAL` — set to `1` only if orders should appear in the header for a pilot; default hidden.

## 6. Implementation summary (this pass)

- **Navigation:** Route-based IA (`/missions`, `/find-kit`, `/schools`, `/support`); header primary CTA is **Find my kit**; **Orders** only if `NEXT_PUBLIC_ORDER_PORTAL=1`.
- **Homepage:** Order is **Hero → role → today’s mission → match/finder → how it works (5 steps incl. AI reflect) → proof → school CTA strip → FAQ/contact**; unique `id`s for FAQ/contact per lane (`faq` / `contact` vs `faq-school` / `contact-school`).
- **Hero:** `ProductLoopVisual` (kit → mission → reflect → proof → progress); above-the-fold CTAs: **Find my kit**, **Today’s missions**.
- **New pages:** `/find-kit`, `/missions`, `/schools`, `/support`.
- **Kits:** `KitsPageCatalog` with age / goal / setting filters + catalog `filter*` fields on each `KitProduct`.
- **Missions:** Daily spotlight (date-seeded) + categorized library from catalog + generic missions.
- **Support:** Intent cards + shared `ContactSection`.
- **Sitemap:** Includes all new marketing routes.
