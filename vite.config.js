import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'public',
  build: {
    outDir: 'public',
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, 'public/index.html'),
    },
  },
});
