import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute,setCatchHandler } from 'workbox-routing';
import { CacheFirst,NetworkFirst } from 'workbox-strategies'; // CacheFirst strategy for images
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// self.__WB_MANIFEST is the default injection point for precaching in Workbox
 
const routesToCache = self.__WB_MANIFEST.concat([
  { url: '/', revision: null },      // Root route
  { url: '/content', revision: null }, // About page
  { url: '/select', revision: null },
  { url: '/pdf', revision: null },
  { url: '/videoTutor', revision: null },
  { url: '/quiz', revision: null },
  // Contact page
]);

precacheAndRoute(routesToCache);
 
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
});


// Cache all image files (e.g., .svg, .png, .jpg, .jpeg, .gif, etc.)
registerRoute(
  ({ request }) => request.destination === 'image', // Match all image requests
  new CacheFirst({
    cacheName: 'image-cache-v3', // Custom cache name for all images
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache responses with status 0 or 200
      }),
    ],
  })
);
registerRoute(
  // Match all navigation requests
  ({ request }) => request.mode === 'navigate' || request.destination === 'document',
  new NetworkFirst({
    cacheName: 'react-pages-v3', // Name of the cache
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          return response.status === 200 ? response : null;
        },
      },
    ],
  })
);
setCatchHandler(async ({ event }) => {
  // Check the type of request and return appropriate fallback
  if (event.request.destination === 'document' || event.request.mode === 'navigate') {
    console.log("Redirecting to root (/)");

    // Redirect to the root of the app (or the first entry page)
    return Response.redirect('/');  // You can modify '/' to any entry point like `/home` or `/index.html`
  } else if (event.request.destination === 'image') {
    // Fallback for images
    return  console.log("not cached images asked")
  } else if (event.request.destination === 'style' || event.request.destination === 'script') {
    // Ignore errors for scripts and styles
    return null;
  } else {
    // Default response for other types of requests
    return Response.error();
  }
});
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['image-cache-v3','react-pages-v3']; // Your custom cache name

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Check if the cache is in the whitelist or matches Workbox's naming pattern
          if (
            !cacheWhitelist.includes(cacheName) &&
            !cacheName.startsWith('workbox-') 
            
            // Preserve Workbox caches
          ) {
            return caches.delete(cacheName); // Delete outdated caches
          }
        })
      );
    })
  );
});


