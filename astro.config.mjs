import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import node from '@astrojs/node'; // Node.js adapter import

export default defineConfig({
  output: 'server', // Server-side output configuration
  adapter: node({
    mode: 'standalone', // Running mode setting
  }),
  server: {
    host: '0.0.0.0', // Server host address
    port: 4321, // Server port
    cors: true, // Enable CORS
  },
  prefetch: {
    prefetchAll: false, // Disable prefetching for all routes
    defaultStrategy: 'viewport', // Prefetch strategy based on viewport
  },
  experimental: {
    serverIslands: true, // Enable server-side islands
    clientPrerender: false, // Disable client-side prerendering
  },
  integrations: [
    starlight({
      title: 'Documentation', // Documentation title
      description: 'General Project Documentation', // General project description
      prerender: false, // Disable prerendering for pages
      // logo: null,
      // favicon: null,
      // customCss: [],
      // social: {},
      components: {
        Sidebar: './src/components/Sidebar.astro', // Custom Sidebar component
        PageSidebar: './src/components/PageSidebar.astro', // Custom Page Sidebar component
        Pagination: './src/components/Pagination.astro', // Custom Pagination component
        Search: './src/components/Search.astro', // Custom Search component
      },
      defaultLocale: 'en', // Default locale setting
    }),
  ],
  middleware: './src/middleware.ts', // Path to custom middleware
});
