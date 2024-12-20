import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    outDir:"dist",
    manifest:true,
    rollupOptions: {
      output: {
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
          src: 'src/sw.js', // Source file
          dest: '', // Destination folder relative to `dist/`
        },
      ],
    }),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate', // Ensures auto-updates are checked and applied
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true, // Controls the client pages right after the SW activates
        skipWaiting: true, // Removes outdated caches
      },
       // Register the service worker with auto update
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg','vite.svg','alarmNotify.jpg','rb_68784_11zon.jpg','sabk.jpeg'], // Include assets like icons
      manifest: {
        name: 'Vite PWA Project',
        short_name: 'Vite PWA Project',
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
      // injectManifest: {
      //   swSrc: './src/sw.js', // Path to your custom service worker file
      // }, // Prevent default service worker generation
    }),
  ],
  assetsInclude: ['**/*.MOV'],
  base: '/',
})
