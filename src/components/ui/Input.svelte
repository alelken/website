<script>
  export let type = 'text';
  export let value = '';
  export let placeholder = '';
  export let label = '';
  export let error = '';
  export let required = false;
  export let disabled = false;
  export let id = '';
  export let name = '';

  
  // Generate unique ID if not provided
  $: inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Validation state
  $: hasError = error && error.length > 0;
  $: isValid = !hasError && value && value.length > 0;
</script>

<div class="input-group">
  {#if label}
    <label for={inputId} class="input-label" class:required>
      {label}
      {#if required}
        <span class="required-indicator" aria-label="required">*</span>
      {/if}
    </label>
  {/if}
  
  <div class="input-wrapper">
    <input
      {type}
      bind:value
      {placeholder}
      {required}
      {disabled}
      {name}
      id={inputId}
      class="input"
      class:input--error={hasError}
      class:input--valid={isValid}
      aria-invalid={hasError}
      aria-describedby={hasError ? `${inputId}-error` : null}
      on:input
      on:blur
      on:focus
      on:change

    />
  </div>
  
  {#if hasError}
    <div id="{inputId}-error" class="input-error" role="alert">
      {error}
    </div>
  {/if}
</div>

<style>
  .input-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    width: 100%;
  }

  .input-label {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--color-text-primary);
    line-height: var(--leading-normal);
  }

  .required-indicator {
    color: #dc2626;
    margin-left: var(--space-1);
  }

  .input-wrapper {
    position: relative;
  }

  .input {
    width: 100%;
    padding: var(--space-4) var(--space-4); /* Increased padding for better touch */
    border: 2px solid #d1d5db; /* Thicker border for better visibility */
    border-radius: 0.5rem; /* Larger radius for modern look */
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    color: var(--color-text-primary);
    background-color: var(--color-white-warm);
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1); /* Smoother easing */
    min-height: 48px; /* Increased for better touch targets */
    -webkit-tap-highlight-color: transparent; /* Remove iOS tap highlight */
    touch-action: manipulation; /* Optimize for touch */
  }

  .input::placeholder {
    color: #9ca3af;
  }

  .input:focus {
    outline: none;
    border-color: var(--color-olive);
    box-shadow: 0 0 0 4px rgba(139, 126, 83, 0.15); /* Larger focus ring */
    transform: translateY(-1px); /* Subtle lift on focus */
  }

  .input:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .input--error {
    border-color: #dc2626;
  }

  .input--error:focus {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  .input--valid {
    border-color: #059669;
  }

  .input--valid:focus {
    border-color: var(--color-olive);
    box-shadow: 0 0 0 3px rgba(139, 126, 83, 0.1);
  }

  .input-error {
    font-size: var(--text-sm);
    color: #dc2626;
    line-height: var(--leading-normal);
  }

  /* Mobile-specific input adjustments */
  @media (max-width: 767px) {
    .input {
      font-size: 16px; /* Prevents zoom on iOS */
      min-height: 52px; /* Larger touch targets on mobile */
      padding: var(--space-5) var(--space-4); /* More padding on mobile */
      border-radius: 0.75rem; /* Larger radius on mobile */
    }
    
    .input-label {
      font-size: var(--text-base); /* Larger labels on mobile */
    }
    
    .input-error {
      font-size: var(--text-base); /* Larger error text on mobile */
    }
  }

  /* Tablet adjustments */
  @media (min-width: 768px) and (max-width: 1023px) {
    .input {
      min-height: 50px;
      padding: var(--space-4) var(--space-5);
    }
  }
</style>