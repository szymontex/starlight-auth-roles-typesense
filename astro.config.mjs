import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  output: 'server',
  // experimental: {
  //   
  // },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport',
  },
  experimental: {
    serverIslands: true,
    clientPrerender: false,
  },
  integrations: [
    starlight({
      title: 'dupa psia',
      components: {
        Sidebar: './src/components/DynamicSidebar.astro',
        // Page: './src/components/CustomPage.astro',
      },
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'Polski',
          lang: 'pl',
        },
      },
      sidebar: [],
    }),
  ],
  middleware: './src/middleware.ts',

});
