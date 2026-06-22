# NusaTek Links

A fast, static, themeable **link-in-bio** landing page for NusaTek Nusantara — one URL for every social bio, QR code, and email signature. Built with Astro, TypeScript, and Tailwind CSS. No backend, no database, no accounts — it deploys as a folder of static files.

![Light and dark themes of the NusaTek links page](public/brand/og-image.png)

## Stack & key decisions

| Choice | Why |
|---|---|
| **Astro 4 (`output: 'static'`)** | Pure SSG → trivial static hosting, no server/adapter. The page is fully usable with JavaScript disabled. |
| **Tailwind CSS v4** (`@tailwindcss/vite`) | Utilities + a token layer. Semantic colors are CSS custom properties mapped via `@theme inline`, so `bg-card` / `text-ink-strong` stay reactive to the `data-theme` swap. |
| **Content Collections (Zod)** | `src/content/links/*.json` is the editable source of truth; the schema is validated **at build time**, so a malformed card fails the build. |
| **`astro:assets` `<Picture>`** | The logo is optimized to AVIF/WebP with a PNG fallback and fixed dimensions (no layout shift). |
| **Self-hosted font** (`@fontsource`) | Plus Jakarta Sans, latin subset, `font-display: swap`. No runtime font CDN. |
| **Vanilla JS, < 2 KB** | An inline pre-paint boot script (no theme flash) + a tiny toggle handler. That's the entire JS surface. |

> **Click attribution (PRD §F2):** the PRD originally routed every link through an `/api/c/[id]` edge function. That isn't static, so this build instead points links directly at their destinations and offers **optional** best-effort `navigator.sendBeacon` attribution that stays inert unless you set `analyticsEndpoint` in [`src/lib/site.ts`](src/lib/site.ts). To restore the server redirector later, add an adapter and an `src/pages/api/c/[id].ts` route.

## Project structure

```
src/
├── assets/logo-nusatek.png        # transparent logo, optimized by astro:assets
├── components/
│   ├── Icon.astro · SocialIcon.astro
│   ├── ProfileHeader.astro · LinkCard.astro · SocialRow.astro
│   ├── ThemeToggle.astro · Footer.astro
├── content/
│   ├── config.ts                  # Zod schema for link cards
│   └── links/01..06.json          # the six link cards (edit these)
├── data/profile.json + profile.ts # handle, tagline, copyright, socials
├── lib/site.ts · accents.ts       # site metadata + brand accent palette
├── layouts/BaseLayout.astro       # <head>, OG/Twitter, fonts, theme boot
├── pages/index.astro              # page composition
└── styles/global.css              # Tailwind + design tokens (light/dark)
scripts/generate-og.mjs            # builds og-image.png + favicons from the logo
public/brand/                      # generated OG image + favicons (committed)
```

## Develop

```bash
bun install
bun run dev        # http://localhost:4321
bun run build      # → dist/  (static)
bun run preview    # serve the production build
bun run check      # astro check (types)
```

> npm/pnpm work too (`npm run dev`, …). Scripts call `astro` directly so they're runtime-agnostic.

## Editing content (no engineering required)

- **Link cards** — add/edit a JSON file in [`src/content/links/`](src/content/links). Fields: `title`, `subtitle?`, `href`, `icon`, `accent`, `published`, `order`. Set `published: false` to hide a card; change `order` to reorder. The build validates every file against the schema.
- **Profile** — handle, tagline, copyright, and social links live in [`src/data/profile.json`](src/data/profile.json).
- **Site metadata** — title, description, OG image, theme colors in [`src/lib/site.ts`](src/lib/site.ts). The canonical base URL is `site:` in [`astro.config.mjs`](astro.config.mjs).
- **Logo / OG / favicons** — replace `src/assets/logo-nusatek.png`, then run `bun run assets` to regenerate `public/brand/`.

## Theming

Light is the default. The toggle persists the choice to `localStorage['nusatek-theme']` and an inline `<head>` script applies it **before first paint**, so there's no flash. The icon swap is CSS-only (it reacts to `data-theme` on `<html>`). Animations respect `prefers-reduced-motion`.

## Performance

Static HTML, one small CSS file, a self-hosted latin font, and an AVIF logo. Typical first load is well under the 80 KB target (≈50 KB on standard-DPI, ≈64 KB on retina). The logo is the LCP element and loads eagerly with high fetch priority; fixed dimensions avoid CLS.

## Deploy

Any static host. Build, then serve `dist/`:

```bash
bun run build
# Cloudflare Pages:
bunx wrangler pages deploy dist --project-name=nusatek-links
# or drag dist/ into Netlify / Vercel Static / GitHub Pages
```

Set the production URL in `astro.config.mjs` (`site:`) so canonical and OG URLs are correct.
