import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// Precaching assets with Workbox
const routesToCache = self.__WB_MANIFEST.concat([
  { url: '/', revision: 'v.4' },
  { url: '/content', revision: 'v.4' },
  { url: '/select', revision: 'v.4' },
  { url: '/pdf', revision: 'v.4' },
  { url: '/videoTutor', revision: 'v.4' },
  { url: '/quiz', revision: 'v.4'},
]);

precacheAndRoute(routesToCache);

// Message listener for "SKIP_WAITING"
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Log fetch requests (for debugging)
self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
});

// Cache scripts and styles with NetworkFirst strategy
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new NetworkFirst({
    cacheName: 'static-assets4',
    networkTimeoutSeconds: 10,
  })
);

// Cache images with CacheFirst strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache-v4',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Cache navigations and documents with NetworkFirst strategy
registerRoute(
  ({ request }) => request.mode === 'navigate' || request.destination === 'document',
  new NetworkFirst({
    cacheName: 'react-pages-v4',
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          return response.status === 200 ? response : null;
        },
      },
    ],
  })
);

// Catch handler for failed requests
setCatchHandler(async ({ event }) => {
  if (event.request.destination === 'document' || event.request.mode === 'navigate') {
    console.log("Redirecting to root (fallback navigation).");
    return caches.match('/'); // Fallback to root cached page
  } else if (event.request.destination === 'image') {
    console.log("Fallback: image not found in cache.");
    return null; // No fallback for images
  } else if (event.request.destination === 'style' || event.request.destination === 'script') {
    console.log("Skipping style/script fallback.");
    return null; // No fallback for styles/scripts
  } else {
    return Response.error();
  }
});

// Activate event to clean old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['image-cache-v4', 'react-pages-v4', 'static-assets4'];

  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      // Delete outdated caches
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName) && !cacheName.startsWith('workbox-')) {
            console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );

      // Precache the root entry page
      try {
        const cache = await caches.open('react-pages-v4');
        const response = await fetch('/');
        if (response.ok) {
          console.log('Caching updated entry page.');
          await cache.put('/', response.clone());
          self.clients.claim().then(() => {
            console.log('New Service Worker now controlling all clients.');
          })
        } else {
          console.warn(`Failed to fetch root entry page: ${response.status}`);
        }
      } catch (error) {
        console.error('Error caching the root entry page:', error);
        console.log("new");
      }
    })()
  );
});
