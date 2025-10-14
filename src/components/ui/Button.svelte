<script>
  export let variant = 'primary'; // primary, secondary, outline
  export let size = 'medium'; // small, medium, large
  export let href = null;
  export let disabled = false;
  export let type = 'button';
  export let ariaLabel = null;
  
  // Determine if this should render as a link or button
  $: isLink = href !== null;
  $: classes = `btn btn--${variant} btn--${size}`;
</script>

{#if isLink}
  <a 
    class={classes} 
    {href} 
    class:disabled
    aria-label={ariaLabel}
    role="button"
    tabindex={disabled ? -1 : 0}
  >
    <slot />
  </a>
{:else}
  <button 
    class={classes} 
    type={type}
    {disabled}
    aria-label={ariaLabel}
    on:click
  >
    <slot />
  </button>
{/if}

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    border: 1px solid transparent;
    border-radius: 0.5rem; /* Slightly larger radius for modern look */
    font-family: var(--font-body);
    font-weight: var(--weight-medium);
    text-decoration: none;
    cursor: pointer;
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1); /* Smoother easing */
    min-height: 48px; /* Increased for better touch targets */
    font-size: var(--text-base);
    line-height: 1;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent; /* Remove iOS tap highlight */
    touch-action: manipulation; /* Optimize for touch */
    user-select: none; /* Prevent text selection on touch */
  }

  .btn:focus {
    outline: 2px solid var(--color-olive);
    outline-offset: 2px;
  }

  .btn:disabled,
  .btn.disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Size variants - Touch optimized */
  .btn--small {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
    min-height: 40px; /* Increased for better touch */
  }

  .btn--medium {
    padding: var(--space-3) var(--space-6);
    font-size: var(--text-base);
    min-height: 48px; /* Increased for better touch */
  }

  .btn--large {
    padding: var(--space-4) var(--space-8);
    font-size: var(--text-lg);
    min-height: 56px; /* Increased for better touch */
  }

  /* Style variants */
  .btn--primary {
    background-color: var(--color-olive);
    color: var(--color-white-warm);
    border-color: var(--color-olive);
  }

  .btn--primary:hover:not(:disabled):not(.disabled) {
    background-color: var(--color-olive-lighter);
    border-color: var(--color-olive-lighter);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(139, 126, 83, 0.3);
  }

  .btn--primary:active:not(:disabled):not(.disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(139, 126, 83, 0.4);
  }

  .btn--secondary {
    background-color: transparent;
    color: var(--color-night);
    border-color: var(--color-night);
  }

  .btn--secondary:hover:not(:disabled):not(.disabled) {
    background-color: var(--color-night);
    color: var(--color-white-warm);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(47, 62, 59, 0.2);
  }

  .btn--secondary:active:not(:disabled):not(.disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(47, 62, 59, 0.3);
  }

  .btn--outline {
    background-color: transparent;
    color: var(--color-olive);
    border-color: var(--color-olive);
  }

  .btn--outline:hover:not(:disabled):not(.disabled) {
    background-color: var(--color-olive);
    color: var(--color-white-warm);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(139, 126, 83, 0.2);
  }

  .btn--outline:active:not(:disabled):not(.disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(139, 126, 83, 0.3);
  }

  /* Link styling when rendered as anchor */
  a.btn {
    text-decoration: none;
  }

  a.btn:visited {
    color: inherit;
  }

  /* Mobile-specific button adjustments */
  @media (max-width: 767px) {
    .btn {
      min-height: 52px; /* Larger touch targets on mobile */
      padding: var(--space-4) var(--space-6);
      font-size: var(--text-lg); /* Larger text on mobile */
    }
    
    .btn--small {
      min-height: 44px;
      padding: var(--space-3) var(--space-5);
      font-size: var(--text-base);
    }
    
    .btn--large {
      min-height: 60px;
      padding: var(--space-5) var(--space-10);
      font-size: var(--text-xl);
    }
    
    /* Reduce hover effects on mobile (touch devices) */
    .btn:hover:not(:disabled):not(.disabled) {
      transform: none;
    }
    
    /* Enhanced active states for touch feedback */
    .btn:active:not(:disabled):not(.disabled) {
      transform: scale(0.98);
    }
  }

  /* Tablet adjustments */
  @media (min-width: 768px) and (max-width: 1023px) {
    .btn {
      min-height: 50px;
    }
    
    .btn--large {
      min-height: 58px;
    }
  }
</style>