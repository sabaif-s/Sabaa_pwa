import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import * as pdfjsLib from "pdfjs-dist";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
pdfjsLib.GlobalWorkerOptions.verbosity = pdfjsLib.VerbosityLevel.INFOS;

// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js') // Ensure the path matches your service worker location
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);

        // Unregister old service workers
        

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            console.log('A new service worker is being installed...');
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New service worker is available
                  console.log('New content is available; please refresh.');
                  showUpdatePrompt(newWorker);
                } else {
                  // Content is cached for offline use
                  console.log('Content is cached for offline use.');
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });

    // Listen for the "controllerchange" event
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('New service worker has taken control, refreshing...');
      window.location.reload();
    });
  });
}

// Function to show an update prompt
function showUpdatePrompt(worker) {
  const shouldUpdate = confirm('A new version is available. Reload to update?');
  unregisterOldServiceWorkers();
  if (shouldUpdate) {
    if (worker) {
      worker.postMessage({ action: 'skipWaiting' });
    }
  }
}

// Function to unregister old service workers
function unregisterOldServiceWorkers() {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      if (registration.waiting || registration.active) {
        console.log('Unregistering old service worker:', registration);
        registration.unregister();
      }
    });
  }).catch((error) => {
    console.error('Error while unregistering old service workers:', error);
  });
}

// Reload the page when back online
window.addEventListener('online', () => {
  console.log('Back online, refreshing...');
  window.location.reload();
});

// Render the React application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
