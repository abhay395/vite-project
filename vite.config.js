// vite.config.js

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        require('autoprefixer'), // Add Autoprefixer
        // You can add other PostCSS plugins here
      ],
    },
  },
});
