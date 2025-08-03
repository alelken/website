import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    })
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      input: 'index.html',
      output: {
        format: 'esm',
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
