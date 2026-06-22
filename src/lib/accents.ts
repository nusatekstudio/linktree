/**
 * Brand accent palette for the link-card icon tiles. These are theme-invariant:
 * the pastel gradient tiles read well against both the light and dark surfaces,
 * so they stay the same across themes (DESIGN §1.2).
 */
export type Accent = 'blue' | 'green' | 'purple' | 'orange';

export interface AccentStyle {
  /** Icon-tile background gradient. */
  tile: string;
  /** Icon glyph color, sitting on the tile. */
  ink: string;
  /** Card border color on hover. */
  hover: string;
}

export const ACCENTS: Record<Accent, AccentStyle> = {
  blue: { tile: 'linear-gradient(135deg, #DCEAFB, #B8D5F7)', ink: '#1E50A2', hover: 'rgba(30, 80, 162, 0.20)' },
  green: { tile: 'linear-gradient(135deg, #D5F0E4, #B0E4CC)', ink: '#2B8C66', hover: 'rgba(63, 181, 140, 0.25)' },
  purple: { tile: 'linear-gradient(135deg, #E4DCF4, #CFC0EC)', ink: '#6346A6', hover: 'rgba(123, 91, 196, 0.25)' },
  orange: { tile: 'linear-gradient(135deg, #FBEAD2, #F7D7AA)', ink: '#C97A2A', hover: 'rgba(244, 160, 76, 0.30)' },
};
