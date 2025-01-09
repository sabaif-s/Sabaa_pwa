import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import * as pdfjsLib from 'pdfjs-dist';
import { registerSW } from 'virtual:pwa-register'; // Import registerSW

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();
pdfjsLib.GlobalWorkerOptions.verbosity = pdfjsLib.VerbosityLevel.INFOS;

// Register the service worker using registerSW
 // Define a variable to hold the new Service Worker
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);

      // Listen for updates to the Service Worker
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;

        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('New Service Worker found and ready to activate.');

                // Prompt the user or skip waiting programmatically
                if (confirm('New version available. Do you want to update?')) {
                  // Send the "SKIP_WAITING" message
                  newWorker.postMessage({ action: 'SKIP_WAITING' });
                }
              } else {
                console.log('Service Worker installed for the first time.');
              }
            }
          });
        }
      });
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });

  // Reload the page when the controller changes
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('Service Worker updated, reloading page...');
    window.location.reload();
  });
}

// const updateSW = registerSW({
//   onNeedRefresh() {
//      // Assign the new Service Worker instance to `newWorker`
    
//     const userConfirmed = confirm('A new version is available. Do you want to refresh the app?');
//     if (userConfirmed ) {
     
//       // Send a message to the new Service Worker to skip waiting
       
//       // Activate the new Service Worker
//       updateSW(); // Activates the new service worker
//     }
//   },
//   onOfflineReady() {
//     console.log('The app is ready to work offline.');
//   },
// });
if("saboo"){
  console.log("saboo");
}
if("saboo"){
  console.log("saboo");
}
if("saboo"){
  console.log("saboo");
}
if("saboo"){
  console.log("saboo");
}
if("saboo"){
  console.log("saboo");
}
if("saboo"){
  console.log("saboo");
}
if("saboo"){
  console.log("saboo");
}
if("saboo"){
  console.log("saboo");
}
if("saboo"){
  console.log("saboo");
}
if("saboo"){
  console.log("saboo");
}
if("saboo"){
  console.log("saboo");
}
if("saboo"){
  console.log("saboo");
}
if("saboo"){
  console.log("saboo");
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
