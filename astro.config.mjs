import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import node from '@astrojs/node'; // Import adaptera Node.js
import { generateSidebar } from './src/utils/sidebarUtils';

export default defineConfig({
  output: 'server',
  prerender: false,
  adapter: node({
    mode: 'standalone', // Ustawienie wymaganego trybu działania
  }),
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
        Sidebar: './src/components/Sidebar.astro',
        PageSidebar: './src/components/PageSidebar.astro',
        // Page: './src/components/CustomPage.astro',
      },
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'Polski',
          lang: 'pl',
        },
      },
      // sidebar: generateSidebar('klient'),
    }),
  ],
  middleware: './src/middleware.ts',

});
