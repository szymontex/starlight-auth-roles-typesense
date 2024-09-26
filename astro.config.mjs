import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import node from '@astrojs/node'; // Import adaptera Node.js
import { generateSidebar } from './src/utils/sidebarUtils';
//import starlightDocSearch from '@astrojs/starlight-docsearch';

export default defineConfig({
  output: 'server',
  
  adapter: node({
    mode: 'standalone', // Ustawienie wymaganego trybu działania
  }),
  server: {
    host: '0.0.0.0',
    port: 4321,
    cors: true,
  },
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
      title: 'Docs',
      description: 'Dokumentacja obslugi studia Flightcore',
      prerender: false,
      // pagefind: true,
      logo: {
        src: './src/assets/flightcore.svg',
      favicon: '/favicon.svg',  
      },
      customCss: [
        // Relative path to your custom CSS file
        './src/styles/global.css',
        './src/fonts/font-face.css',
      ],
      social: {
        instagram: 'https://instagram.com/flightcore.studios',
        email: 'mailto:kontakt@flightcore.pl',
      },
      components: {
        Sidebar: './src/components/Sidebar.astro',
        PageSidebar: './src/components/PageSidebar.astro',
        Pagination: './src/components/Pagination.astro',
        Search: './src/components/Search.astro',
        // Page: './src/components/CustomPage.astro',
      },
      // plugins: [
      //   starlightDocSearch({
      //     appId: 'YOUR_APP_ID',
      //     apiKey: 'YOUR_SEARCH_API_KEY',
      //     indexName: 'YOUR_INDEX_NAME',
      //   }),
      // ],
      defaultLocale: 'root',
      // locales: {
      //   root: {
      //     label: 'Polski',
      //     lang: 'pl',
      //   },
      // },
      // sidebar: generateSidebar('klient'),
    }),
  ],
  middleware: './src/middleware.ts',

});
