import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js', // Add unique hashes for entry files
        chunkFileNames: 'assets/[name].[hash].js', // Add unique hashes for chunk files
        assetFileNames: 'assets/[name].[hash].[ext]', // Add unique hashes for other assets
        manualChunks: {
          pdfjs: ['pdfjs-dist'], // Separate PDF.js into its own chunk
        },
      },
    },
  },
  plugins: [
    react({
      fastRefresh: true, // Ensure fastRefresh is enabled
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/sw.js', // Source service worker file
          dest: '', // Destination folder relative to `dist/`
        },
      ],
    }),
    VitePWA({
      strategies: 'injectManifest', // Use your custom service worker
      srcDir: 'src',
      filename: 'sw.js', // Service worker filename
      registerType: 'prompt', // Ensure user is prompted for updates
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true, // Claim client pages immediately after activation
        skipWaiting: true, // Skip waiting and activate immediately
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'next.png',
        'mask-icon.svg',
        'download.png',
        'alarm.png',
        'vite.svg',
        'alarmNotify.jpg',
        'rb_68784_11zon.jpg',
        'sabk.jpeg',
      ], // Include these assets in the PWA precache
      manifest: {
        name: 'Vite PWA Project',
        short_name: 'Vite PWA',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  assetsInclude: ['**/*.MOV'],
  base: '/',
});
