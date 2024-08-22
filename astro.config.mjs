import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import node from '@astrojs/node'; // Import adaptera Node.js
import { generateSidebar } from './src/utils/sidebarUtils';

export default defineConfig({
  output: 'server',
  
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
      title: 'Docs',
      description: 'Dokumentacja obslugi studia Flightcore',
      prerender: false,
      logo: {
        src: './src/assets/flightcore.svg',
        
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
