// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        content: 'src/content/content.ts',
        contentStyle: 'src/content/content.css',
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'content') {
            return 'content/content.js';
          }
          return 'assets/[name]-[hash].js';
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'content.css') {
            return 'content/content.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@hooks': path.resolve(__dirname, './src/popup/hooks'),
      '@context': path.resolve(__dirname, './src/popup/context'),
      '@utils': path.resolve(__dirname, './src/popup/utils'),
    },
  },
});
