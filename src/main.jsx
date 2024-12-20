import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import * as pdfjsLib from "pdfjs-dist";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js') // Ensure the path matches your service worker location
      .then((registration) => {
        console.log("console:",registration.waiting);
        console.log('Service Worker registered with scope:', registration.scope);

        // Check for updates when the service worker is installed or updated
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
  });
}

// Function to show an update prompt
function showUpdatePrompt(worker) {
  const shouldUpdate = confirm('A new version is available. Reload to update?');
  if (shouldUpdate) {
    if (worker) {
      worker.postMessage({ action: 'skipWaiting' });
    }
    window.location.reload();
  }
}

// Listen for the "controllerchange" event to refresh the page when a new worker takes control
navigator.serviceWorker.addEventListener('controllerchange', () => {
  console.log('New service worker has taken control, refreshing...');
  window.location.reload();
});
window.addEventListener('online',()=>{
  window.location.reload();
})
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
pdfjsLib.GlobalWorkerOptions.verbosity = pdfjsLib.VerbosityLevel.INFOS;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
