<script>
  import { onMount } from 'svelte';
  import { currentPage, navigateTo, pageMetadata } from "./lib/stores/router.js";
  import Header from "./components/layout/Header.svelte";
  import Footer from "./components/layout/Footer.svelte";
  import Router from "./components/Router.svelte";
  
  // Import test utilities in development
  if (import.meta.env.DEV) {
    import("./lib/seo/test-redirects.js");
    import("./lib/utils/demo-no-cache.js").then(module => {
      // The demo will auto-run, but you can also call:
      // module.testCompleteCacheInvalidation();
      // module.showCacheStatus();
    });
  }
  
  // Import background cache invalidation utilities
  import { setupImmediateInvalidation, interceptAllRequests } from "./lib/utils/cache.js";
  import { setupNoCacheEnvironment } from "./lib/utils/no-cache.js";
  import { setupSmoothLoading } from "./lib/utils/smooth-loading.js";
  import { setupImageProtection } from "./lib/utils/image-protection.js";
  
  // Set up invisible background cache system with image protection
  if (typeof window !== 'undefined') {
    // Protect images first - highest priority
    setupImageProtection();
    
    // Setup smooth loading for initial load only
    setupSmoothLoading();
    
    // Setup invisible background cache invalidation
    setupNoCacheEnvironment();
    setupImmediateInvalidation();
    interceptAllRequests();
  }

  // Handle navigation events from Header component
  function handleNavigate(event) {
    navigateTo(event.detail.page);
  }

  // Meta tags are now handled in the router store for better SEO integration
  
  // Handle client-side hydration
  onMount(() => {
    // SSR content is automatically hidden by CSS when JS is available
    // This ensures smooth transition from SSR to client-side rendering
    console.log('Client-side app mounted with smooth loading');
    
    // Remove loading skeleton class after mount
    setTimeout(() => {
      document.querySelector('.app')?.classList.remove('loading-skeleton');
    }, 100);
  });
</script>

<!-- Client-side content will be rendered here -->
<div class="app loading-skeleton">
  <Header currentPage={$currentPage} on:navigate={handleNavigate} />

  <Router />

  <Footer />
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--color-night);
    color: var(--color-text-on-dark);
  }
</style>
