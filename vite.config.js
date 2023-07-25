import { resolve } from 'node:path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: `${resolve(__dirname, 'src')}/` }],
  },
  server: {
    open: true,
    host: '0.0.0.0',
  },
});
