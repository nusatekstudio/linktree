// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Canonical site origin. This is the single source of truth for the base URL —
// app code reads it back via `Astro.site`. Leave empty until you have a URL, or set:
//   • GitHub Pages user site:    'https://USERNAME.github.io'
//   • GitHub Pages project site: 'https://USERNAME.github.io'   (and set BASE_PATH below)
//   • custom domain:             'https://nusatek.solution'
const SITE_URL = '';

// Sub-path the site is served from. Keep '/' for a user site or custom domain.
// For a GitHub Pages *project* site at github.io/REPO, set this to '/REPO/'
// (with leading + trailing slashes), e.g. '/nusatek-linktree/'.
const BASE_PATH = '/';

// Static-first: the entire page prerenders to HTML. No adapter, no server.
// Deploy the `dist/` folder to any static host (GitHub Pages, Cloudflare Pages, …).
export default defineConfig({
  // Empty string isn't a valid URL — coerce to undefined so the build still runs.
  site: SITE_URL || undefined,
  base: BASE_PATH,
  output: 'static',
  // Inline small stylesheets into <head> to drop a render-blocking request (helps LCP).
  build: { inlineStylesheets: 'auto' },
  vite: {
    plugins: [tailwindcss()],
  },
});
