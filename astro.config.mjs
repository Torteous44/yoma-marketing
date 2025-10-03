// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://yoma-solutions.com',
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  compressHTML: true,
  devToolbar: {
    enabled: false
  },
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    css: {
      devSourcemap: true
    },

    plugins: [tailwindcss()]
  }
});