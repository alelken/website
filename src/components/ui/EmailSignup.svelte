<script>
  import Input from './Input.svelte';
  import Button from './Button.svelte';
  
  export let title = 'Stay Updated';
  export let description = 'Get notified about our latest updates and product launches.';
  export let buttonText = 'Sign Up';
  export let placeholder = 'Enter your email address';
  export let compact = false;
  
  let email = '';
  let error = '';
  let isSubmitting = false;
  let isSuccess = false;
  
  // Email validation
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    
    // Reset states
    error = '';
    isSubmitting = true;
    
    // Validate email
    if (!email) {
      error = 'Email address is required';
      isSubmitting = false;
      return;
    }
    
    if (!validateEmail(email)) {
      error = 'Please enter a valid email address';
      isSubmitting = false;
      return;
    }
    
    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just show success state
      isSuccess = true;
      email = '';
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        isSuccess = false;
      }, 3000);
      
    } catch (err) {
      error = 'Something went wrong. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }
  
  // Handle input changes to clear errors
  function handleInput() {
    if (error) {
      error = '';
    }
  }
</script>

<div class="email-signup" class:email-signup--compact={compact}>
  {#if !compact}
    <div class="email-signup__header">
      <h3 class="email-signup__title">{title}</h3>
      <p class="email-signup__description">{description}</p>
    </div>
  {/if}
  
  {#if isSuccess}
    <div class="email-signup__success" role="alert">
      <div class="success-icon">✓</div>
      <p>Thank you for signing up! We'll be in touch soon.</p>
    </div>
  {:else}
    <form class="email-signup__form" on:submit={handleSubmit}>
      <div class="form-row" class:form-row--compact={compact}>
        <Input
          type="email"
          bind:value={email}
          {placeholder}
          {error}
          required
          autocomplete="email"
          name="email"
          on:input={handleInput}
        />
        
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || !email}
          size={compact ? 'medium' : 'large'}
        >
          {#if isSubmitting}
            <span class="loading-spinner"></span>
            Signing up...
          {:else}
            {buttonText}
          {/if}
        </Button>
      </div>
    </form>
  {/if}
</div>

<style>
  .email-signup {
    max-width: 500px;
    margin: 0 auto;
  }

  .email-signup--compact {
    max-width: none;
  }

  .email-signup__header {
    text-align: center;
    margin-bottom: var(--space-8);
  }

  .email-signup__title {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-3);
    line-height: var(--leading-tight);
  }

  .email-signup__description {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-text-secondary);
    line-height: var(--leading-normal);
    margin: 0;
  }

  .email-signup__form {
    width: 100%;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .form-row--compact {
    flex-direction: row;
    align-items: flex-end;
  }

  .form-row--compact :global(.input-group) {
    flex: 1;
  }

  .email-signup__success {
    text-align: center;
    padding: var(--space-8);
    background-color: var(--color-cream-soft);
    border-radius: 0.5rem;
    border: 1px solid var(--color-olive);
  }

  .success-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background-color: var(--color-olive);
    color: var(--color-white-warm);
    border-radius: 50%;
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    margin-bottom: var(--space-4);
  }

  .email-signup__success p {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-text-primary);
    margin: 0;
    line-height: var(--leading-normal);
  }

  .loading-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: var(--space-2);
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Responsive adjustments */
  @media (max-width: 767px) {
    .form-row--compact {
      flex-direction: column;
      align-items: stretch;
    }

    .email-signup__title {
      font-size: var(--text-xl);
    }

    .email-signup__header {
      margin-bottom: var(--space-6);
    }
  }

  @media (min-width: 768px) {
    .form-row {
      flex-direction: row;
      align-items: flex-end;
    }

    .form-row :global(.input-group) {
      flex: 1;
    }
  }
</style>