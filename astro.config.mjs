import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [mdx()],
  // Prerender public pages and render the admin routes on demand.
  output: 'static',
  adapter: vercel({
    isr: false,
    webAnalytics: { enabled: false },
  }),
  devToolbar: { enabled: false },
  vite: {
    optimizeDeps: {
      // esbuild-wasm override preserved for Windows sandbox compatibility
      exclude: ['aria-query', 'axobject-query'],
    },
  },
});
