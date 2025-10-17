<script>
  import Input from './Input.svelte';
  import Button from './Button.svelte';
  
  export let title = 'Get in Touch';
  export let description = 'Send us a message and we\'ll get back to you as soon as possible.';
  export let submitText = 'Send Message';
  
  let formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  let errors = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  let isSubmitting = false;
  let isSuccess = false;
  
  // Email validation
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Form validation
  function validateForm() {
    const newErrors = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    
    let isValid = true;
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
      isValid = false;
    }
    
    errors = newErrors;
    return isValid;
  }
  
  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    isSubmitting = true;
    
    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just show success state
      isSuccess = true;
      
      // Reset form
      formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        isSuccess = false;
      }, 5000);
      
    } catch (err) {
      errors.message = 'Something went wrong. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }
  
  // Handle input changes to clear errors
  function handleInput(field) {
    if (errors[field]) {
      errors[field] = '';
    }
  }
</script>

<div class="contact-form">
  <div class="contact-form__header">
    <h3 class="contact-form__title">{title}</h3>
    <p class="contact-form__description">{description}</p>
  </div>
  
  {#if isSuccess}
    <div class="contact-form__success" role="alert">
      <div class="success-icon">✓</div>
      <h4>Message Sent Successfully!</h4>
      <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
    </div>
  {:else}
    <form class="contact-form__form" on:submit={handleSubmit}>
      <div class="form-grid">
        <Input
          type="text"
          bind:value={formData.name}
          label="Full Name"
          placeholder="Enter your full name"
          error={errors.name}
          required

          name="name"
          on:input={() => handleInput('name')}
        />
        
        <Input
          type="email"
          bind:value={formData.email}
          label="Email Address"
          placeholder="Enter your email address"
          error={errors.email}
          required

          name="email"
          on:input={() => handleInput('email')}
        />
      </div>
      
      <Input
        type="text"
        bind:value={formData.subject}
        label="Subject"
        placeholder="What is this regarding?"
        error={errors.subject}
        required
        name="subject"
        on:input={() => handleInput('subject')}
      />
      
      <div class="textarea-group">
        <label for="message" class="textarea-label required">
          Message
          <span class="required-indicator" aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          bind:value={formData.message}
          placeholder="Tell us more about your inquiry..."
          required
          name="message"
          class="textarea"
          class:textarea--error={errors.message}
          rows="5"
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : null}
          on:input={() => handleInput('message')}
        ></textarea>
        {#if errors.message}
          <div id="message-error" class="textarea-error" role="alert">
            {errors.message}
          </div>
        {/if}
      </div>
      
      <div class="form-actions">
        <Button
          type="submit"
          variant="primary"
          size="large"
          disabled={isSubmitting}
        >
          {#if isSubmitting}
            <span class="loading-spinner"></span>
            Sending...
          {:else}
            {submitText}
          {/if}
        </Button>
      </div>
    </form>
  {/if}
</div>

<style>
  .contact-form {
    max-width: 600px;
    margin: 0 auto;
  }

  .contact-form__header {
    text-align: center;
    margin-bottom: var(--space-10);
  }

  .contact-form__title {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-4);
    line-height: var(--leading-tight);
  }

  .contact-form__description {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    color: var(--color-text-secondary);
    line-height: var(--leading-normal);
    margin: 0;
  }

  .contact-form__form {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  @media (min-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .textarea-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .textarea-label {
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

  .textarea {
    width: 100%;
    padding: var(--space-4);
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    color: var(--color-text-primary);
    background-color: var(--color-white-warm);
    transition: all 150ms ease;
    resize: vertical;
    min-height: 120px;
  }

  .textarea::placeholder {
    color: #9ca3af;
  }

  .textarea:focus {
    outline: none;
    border-color: var(--color-olive);
    box-shadow: 0 0 0 3px rgba(139, 126, 83, 0.1);
  }

  .textarea--error {
    border-color: #dc2626;
  }

  .textarea--error:focus {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  .textarea-error {
    font-size: var(--text-sm);
    color: #dc2626;
    line-height: var(--leading-normal);
  }

  .form-actions {
    display: flex;
    justify-content: center;
    margin-top: var(--space-4);
  }

  .contact-form__success {
    text-align: center;
    padding: var(--space-10);
    background-color: var(--color-cream-soft);
    border-radius: 0.5rem;
    border: 1px solid var(--color-olive);
  }

  .success-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    background-color: var(--color-olive);
    color: var(--color-white-warm);
    border-radius: 50%;
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    margin-bottom: var(--space-6);
  }

  .contact-form__success h4 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-3);
    line-height: var(--leading-tight);
  }

  .contact-form__success p {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-text-secondary);
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
    .contact-form__title {
      font-size: var(--text-2xl);
    }

    .contact-form__description {
      font-size: var(--text-base);
    }

    .contact-form__header {
      margin-bottom: var(--space-8);
    }

    .textarea {
      font-size: 16px; /* Prevents zoom on iOS */
    }
  }
</style>