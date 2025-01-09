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
const updateSW = registerSW({
  onNeedRefresh() {
    const userConfirmed = confirm('A new version is available. Do you want to refresh the app?');
    let newWorker;
    if (userConfirmed) {
      if (userConfirmed) {
        newWorker.postMessage({ action: 'skipWaiting' });
      }
      
      updateSW(true); // Activates the new service worker
    }
  },
  onOfflineReady() {
    console.log('The app is ready to work offline.');
  },
});

// Reload the page when back online
window.addEventListener('online', () => {
  console.log('Back online, refreshing...');
  window.location.reload();
});
  if(5 > 2){
    console.log("its true");
  }
  else{
    console.log("its false");
    console.log("new false");
  }
// Render the React application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
