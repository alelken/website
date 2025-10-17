<script>
  import { onMount, onDestroy } from 'svelte';
  import { currentPage, navigationState, routeParams, initializeRouter } from '../lib/stores/router.js';
  
  // Import page components
  import Home from '../pages/Home.svelte';
  import Product from '../pages/Product.svelte';
  import Press from '../pages/Press.svelte';
  import PressDetail from '../pages/PressDetail.svelte';
  import About from '../pages/About.svelte';
  import NotFound from '../pages/NotFound.svelte';
  
  let cleanupRouter;
  
  // Page component mapping
  const pageComponents = {
    home: Home,
    product: Product,
    press: Press,
    'press-detail': PressDetail,
    about: About,
    'not-found': NotFound
  };
  
  onMount(() => {
    // Initialize the router
    cleanupRouter = initializeRouter();
  });
  
  onDestroy(() => {
    // Cleanup router event listeners
    if (cleanupRouter) {
      cleanupRouter();
    }
  });
</script>

<!-- Router Container -->
<div class="router" role="main">
  {#if $navigationState.isNavigating}
    <!-- Loading state during navigation -->
    <div class="router__loading" aria-live="polite" aria-label="Loading page">
      <div class="router__loading-indicator">
        <span class="router__loading-text">Loading...</span>
      </div>
    </div>
  {:else}
    <!-- Render the current page component -->
    {#if pageComponents[$currentPage]}
      <div class="router__page" data-page={$currentPage}>
        <svelte:component this={pageComponents[$currentPage]} {...$routeParams} />
      </div>
    {:else}
      <!-- Render 404 page for unknown routes -->
      <div class="router__page" data-page="not-found">
        <svelte:component this={NotFound} />
      </div>
    {/if}
  {/if}
</div>

<style>
  .router {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .router__page {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  /* Loading State Styles */
  .router__loading {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
  }
  
  .router__loading-indicator {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-6);
    background-color: var(--color-background-secondary);
    border-radius: 8px;
    box-shadow: 0 2px 8px var(--color-shadow-light);
  }
  
  .router__loading-text {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-text-secondary);
  }
  

  
  /* Page transition animations */
  .router__page {
    animation: fadeIn 300ms ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .router__page {
      animation: none;
    }
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .router__loading-indicator {
      border: 2px solid;
    }
  }
</style>