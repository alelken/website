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
    {type}
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
    border-radius: 0.375rem;
    font-family: var(--font-body);
    font-weight: var(--weight-medium);
    text-decoration: none;
    cursor: pointer;
    transition: all 150ms ease;
    min-height: 44px; /* Accessibility requirement */
    font-size: var(--text-base);
    line-height: 1;
    white-space: nowrap;
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

  /* Size variants */
  .btn--small {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
    min-height: 36px;
  }

  .btn--medium {
    padding: var(--space-3) var(--space-6);
    font-size: var(--text-base);
    min-height: 44px;
  }

  .btn--large {
    padding: var(--space-4) var(--space-8);
    font-size: var(--text-lg);
    min-height: 52px;
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
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(139, 126, 83, 0.3);
  }

  .btn--secondary {
    background-color: transparent;
    color: var(--color-night);
    border-color: var(--color-night);
  }

  .btn--secondary:hover:not(:disabled):not(.disabled) {
    background-color: var(--color-night);
    color: var(--color-white-warm);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(47, 62, 59, 0.2);
  }

  .btn--outline {
    background-color: transparent;
    color: var(--color-olive);
    border-color: var(--color-olive);
  }

  .btn--outline:hover:not(:disabled):not(.disabled) {
    background-color: var(--color-olive);
    color: var(--color-white-warm);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(139, 126, 83, 0.2);
  }

  /* Link styling when rendered as anchor */
  a.btn {
    text-decoration: none;
  }

  a.btn:visited {
    color: inherit;
  }
</style>