<script>
  // Placeholder About page component
</script>

<div class="page page--about">
  <section class="hero">
    <div class="hero__container">
      <h1 class="hero__title">Built by People Who Believe in Better</h1>
      <p class="hero__subtitle">Meet the team behind Alelken's mission</p>
    </div>
  </section>
  
  <section class="content">
    <div class="content__container">
      <p>About page content will be implemented in future tasks.</p>
    </div>
  </section>
</div>

<style>
  .page {
    flex: 1;
    padding-top: 4rem; /* Account for fixed header */
  }
  
  .hero {
    background-color: var(--color-background-secondary);
    padding: var(--section-padding-y) 0;
    text-align: center;
  }
  
  .hero__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }
  
  .hero__title {
    font-family: var(--font-heading);
    font-size: var(--text-5xl);
    font-weight: var(--weight-bold);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-6) 0;
    line-height: var(--leading-tight);
  }
  
  .hero__subtitle {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    color: var(--color-text-secondary);
    margin: 0;
    line-height: var(--leading-relaxed);
  }
  
  .content {
    padding: var(--section-padding-y) 0;
  }
  
  .content__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    text-align: center;
  }
  
  @media (max-width: 767px) {
    .page {
      padding-top: 3.5rem; /* Account for smaller mobile header */
    }
    
    .hero__title {
      font-size: var(--text-3xl);
    }
    
    .hero__subtitle {
      font-size: var(--text-lg);
    }
  }
</style>