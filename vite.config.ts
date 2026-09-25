import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    // The client manifest tells scripts/prerender.mjs which CSS and JS chunks each page needs.
    manifest: !isSsrBuild,
    // Client logos stay as separate lazy-loaded files instead of base64 inside the HTML and JS.
    assetsInlineLimit: (file: string) => (file.includes('client_logos') ? false : undefined),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}));
