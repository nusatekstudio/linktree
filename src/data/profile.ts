import data from './profile.json';

/** Social networks we ship a glyph for (see SocialIcon.astro). */
export type SocialNetwork = 'tiktok' | 'instagram' | 'x' | 'threads';

export interface Social {
  network: SocialNetwork;
  /** Accessible name, e.g. "Instagram". */
  label: string;
  href: string;
}

export interface Product {
  label: string;
}

export interface Profile {
  /** e.g. "@nusatek.id" */
  handle: string;
  tagline: string;
  products: Product[];
  copyright: string;
  socials: Social[];
}

/**
 * Profile copy + social links. Edit `profile.json` to change these; the `as`
 * cast gives the rest of the app a typed view of that data.
 */
export const profile = data as Profile;
