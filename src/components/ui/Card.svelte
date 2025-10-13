<script>
  export let variant = 'default'; // default, elevated, outlined
  export let padding = 'medium'; // small, medium, large
  export let hover = false; // Enable hover animations
  
  $: classes = `card card--${variant} card--${padding}`;
</script>

<div class={classes} class:card--hover={hover}>
  {#if $$slots.header}
    <div class="card__header">
      <slot name="header" />
    </div>
  {/if}
  
  <div class="card__content">
    <slot />
  </div>
  
  {#if $$slots.footer}
    <div class="card__footer">
      <slot name="footer" />
    </div>
  {/if}
</div>

<style>
  .card {
    background-color: var(--color-white-warm);
    border-radius: 0.5rem;
    overflow: hidden;
    transition: all 400ms ease;
    width: 100%;
  }

  /* Variant styles */
  .card--default {
    border: 1px solid var(--color-cream-soft);
  }

  .card--elevated {
    box-shadow: 0 2px 8px rgba(47, 62, 59, 0.08);
    border: none;
  }

  .card--outlined {
    border: 2px solid var(--color-olive);
    box-shadow: none;
  }

  /* Hover animations */
  .card--hover:hover {
    transform: translateY(-2px);
  }

  .card--elevated.card--hover:hover {
    box-shadow: 0 8px 24px rgba(47, 62, 59, 0.15);
    border-left: 4px solid var(--color-olive);
  }

  .card--outlined.card--hover:hover {
    border-color: var(--color-olive-lighter);
    box-shadow: 0 4px 16px rgba(139, 126, 83, 0.1);
  }

  .card--default.card--hover:hover {
    border-color: var(--color-olive);
    box-shadow: 0 4px 16px rgba(47, 62, 59, 0.1);
  }

  /* Header styles */
  .card__header {
    padding: var(--space-6) var(--space-6) 0 var(--space-6);
    border-bottom: 1px solid var(--color-cream-soft);
    margin-bottom: var(--space-4);
  }

  .card--small .card__header {
    padding: var(--space-4) var(--space-4) 0 var(--space-4);
    margin-bottom: var(--space-3);
  }

  .card--large .card__header {
    padding: var(--space-8) var(--space-8) 0 var(--space-8);
    margin-bottom: var(--space-6);
  }

  /* Content styles */
  .card__content {
    padding: var(--space-6);
  }

  .card--small .card__content {
    padding: var(--space-4);
  }

  .card--large .card__content {
    padding: var(--space-8);
  }

  /* Footer styles */
  .card__footer {
    padding: 0 var(--space-6) var(--space-6) var(--space-6);
    border-top: 1px solid var(--color-cream-soft);
    margin-top: var(--space-4);
    padding-top: var(--space-4);
  }

  .card--small .card__footer {
    padding: 0 var(--space-4) var(--space-4) var(--space-4);
    margin-top: var(--space-3);
    padding-top: var(--space-3);
  }

  .card--large .card__footer {
    padding: 0 var(--space-8) var(--space-8) var(--space-8);
    margin-top: var(--space-6);
    padding-top: var(--space-6);
  }

  /* Responsive behavior */
  @media (max-width: 767px) {
    .card__content,
    .card__header,
    .card__footer {
      padding-left: var(--space-4);
      padding-right: var(--space-4);
    }

    .card--large .card__content,
    .card--large .card__header,
    .card--large .card__footer {
      padding-left: var(--space-6);
      padding-right: var(--space-6);
    }
  }

  /* Focus styles for interactive cards */
  .card--hover:focus-within {
    outline: 2px solid var(--color-olive);
    outline-offset: 2px;
  }
</style>