import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

console.log('content/config.ts');

export const collections = {
  docs: defineCollection({
    schema: docsSchema(),
  }),
};