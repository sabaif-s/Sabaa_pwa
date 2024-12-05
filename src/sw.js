import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies'; // CacheFirst strategy for images
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// self.__WB_MANIFEST is the default injection point for precaching in Workbox
precacheAndRoute(self.__WB_MANIFEST);

// Cache all image files (e.g., .svg, .png, .jpg, .jpeg, .gif, etc.)
registerRoute(
  ({ request }) => request.destination === 'image', // Match all image requests
  new CacheFirst({
    cacheName: 'image-cache', // Custom cache name for all images
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache responses with status 0 or 200
      }),
    ],
  })
);
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['image-cache']; // Specify caches to keep

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete outdated caches
          }
        })
      );
    })
  );
});

