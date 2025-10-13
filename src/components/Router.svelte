<script>
  import { onMount, onDestroy } from 'svelte';
  import { currentPage, navigationState, initializeRouter } from '../lib/stores/router.js';
  
  // Import page components (we'll create placeholder components for now)
  import Home from '../pages/Home.svelte';
  import Product from '../pages/Product.svelte';
  import Press from '../pages/Press.svelte';
  import About from '../pages/About.svelte';
  
  let cleanupRouter;
  
  // Page component mapping
  const pageComponents = {
    home: Home,
    product: Product,
    press: Press,
    about: About
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
        <svelte:component this={pageComponents[$currentPage]} />
      </div>
    {:else}
      <!-- Fallback for unknown pages -->
      <div class="router__error" role="alert">
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href="#home" class="router__error-link">Go to Home</a>
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
  
  /* Error State Styles */
  .router__error {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--space-16);
    min-height: 50vh;
  }
  
  .router__error h1 {
    font-family: var(--font-heading);
    font-size: var(--text-4xl);
    font-weight: var(--weight-bold);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-4) 0;
  }
  
  .router__error p {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    color: var(--color-text-secondary);
    margin: 0 0 var(--space-8) 0;
    max-width: 32rem;
  }
  
  .router__error-link {
    display: inline-flex;
    align-items: center;
    padding: var(--space-3) var(--space-6);
    background-color: var(--color-interactive-primary);
    color: var(--color-text-on-dark);
    text-decoration: none;
    border-radius: 6px;
    font-family: var(--font-body);
    font-weight: var(--weight-medium);
    transition: background-color 200ms ease, transform 200ms ease;
  }
  
  .router__error-link:hover {
    background-color: var(--color-interactive-primary-hover);
    transform: translateY(-1px);
  }
  
  .router__error-link:focus {
    outline: 2px solid var(--color-border-accent);
    outline-offset: 2px;
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
    
    .router__error-link {
      transition: none;
    }
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .router__loading-indicator {
      border: 2px solid;
    }
    
    .router__error-link {
      border: 2px solid;
    }
  }
</style>