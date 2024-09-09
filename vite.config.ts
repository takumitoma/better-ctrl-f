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
      external: ['tests/'],
    },
  },
  resolve: {
    alias: {
      '@hooks': path.resolve(__dirname, './src/popup/hooks'),
      '@context': path.resolve(__dirname, './src/popup/context'),
      '@utils': path.resolve(__dirname, './src/popup/utils')
    }
  },
});
