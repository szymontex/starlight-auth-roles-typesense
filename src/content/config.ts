import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collectionsp = {
  docs: defineCollection({
    schema: docsSchema(),
  }),
};