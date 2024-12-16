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
  server: {
    strictPort: true,
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
      registerType: 'autoUpdate', // Register the service worker with auto update
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg','vite.svg'], // Include assets like icons
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
})
