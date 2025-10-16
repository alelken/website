import { mount } from 'svelte'
import './styles/main.css'
import App from './App.svelte'
import { registerServiceWorker } from './lib/performance.js'

const app = mount(App, {
  target: document.getElementById('app'),
})

// Register service worker for performance optimization
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  registerServiceWorker('/sw.js');
}

// Preload critical resources
if (import.meta.env.PROD) {
  const criticalResources = [
    '/assets/logo/5.png',
    // Add other critical resources here
  ];
  
  import('./lib/performance.js').then(({ preloadCriticalResources }) => {
    preloadCriticalResources(criticalResources);
  });
}

export default app
