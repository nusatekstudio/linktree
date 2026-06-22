import { defineCollection, z } from 'astro:content';

/**
 * Link cards — the editable source of truth (PRD §5.3 / §F7). One JSON file per
 * card under `src/content/links/`. Astro validates every entry against this Zod
 * schema at build time, so a malformed card fails the build (no separate
 * validate:links step needed). The entry `id` is the filename.
 */
const links = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string().min(1).max(48),
    subtitle: z.string().max(80).optional(),
    // http(s), mailto: and tel: are all accepted by the URL constructor.
    href: z.string().url(),
    icon: z.enum(['email', 'whatsapp']),
    accent: z.enum(['blue', 'green', 'purple', 'orange']),
    published: z.boolean().default(true),
    order: z.number().int(),
  }),
});

export const collections = { links };
