/**
 * Site-wide metadata. The canonical base URL lives in `astro.config.mjs` (`site:`)
 * and is read back through `Astro.site`; everything else that the <head> needs is
 * centralized here so a copy/branding change is a one-file edit.
 */
export const SITE = {
  name: 'NusaTek',
  /** <title> and OG title (PRD §F4). */
  title: 'NusaTek · Solusi Teknologi Nusantara',
  description:
    'Satu tautan untuk semua kanal resmi PT NusaTek Nusantara Tbk — website, hubungan investor, siaran pers, produk, karir, dan kontak.',
  /** <html lang>. */
  locale: 'id',

  /** Open Graph / Twitter card image (1200×630), generated into public/brand/. */
  ogImage: '/brand/og-image.png',
  ogImageAlt: 'NusaTek — Solusi Teknologi Nusantara',

  /** Used for the browser theme-color meta, per palette. */
  themeColor: { light: '#FAF7F2', dark: '#0B1424' },

  /**
   * Optional click-attribution endpoint (PRD §F2). When set, link/social clicks
   * are reported best-effort via `navigator.sendBeacon` — no redirect, no backend
   * needed for the page itself. Leave empty to disable tracking entirely.
   */
  analyticsEndpoint: '',
} as const;
