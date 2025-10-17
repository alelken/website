<script>
  import Button from "../components/ui/Button.svelte";
  import { navigateToHome } from "../lib/stores/router.js";

  function handleGoHome() {
    navigateToHome();
  }

  function handleGoBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigateToHome();
    }
  }
</script>

<div class="page page--not-found">
  <!-- 404 Hero Section -->
  <section class="not-found-hero">
    <div class="not-found-hero__container">
      <div class="not-found-hero__content">
        <div class="not-found-hero__visual">
          <!-- Abstract 404 illustration -->
          <svg
            class="not-found-hero__svg"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- Broken path/connection illustration -->
            <path
              d="M50 150 Q100 100 150 150 T250 150"
              stroke="currentColor"
              stroke-width="3"
              stroke-dasharray="10,5"
              opacity="0.4"
              fill="none"
            />
            <path
              d="M250 150 Q300 100 350 150"
              stroke="currentColor"
              stroke-width="3"
              stroke-dasharray="10,5"
              opacity="0.2"
              fill="none"
            />
            
            <!-- Disconnected nodes -->
            <circle cx="50" cy="150" r="8" fill="currentColor" opacity="0.6" />
            <circle cx="150" cy="150" r="8" fill="currentColor" opacity="0.8" />
            <circle cx="250" cy="150" r="8" fill="currentColor" />
            <circle cx="350" cy="150" r="6" fill="currentColor" opacity="0.3" />
            
            <!-- Question mark symbol -->
            <circle cx="200" cy="80" r="25" fill="none" stroke="currentColor" stroke-width="2" opacity="0.5" />
            <path d="M190 70 Q200 60 210 70 Q210 80 200 85 M200 95 L200 100" stroke="currentColor" stroke-width="2" opacity="0.7" fill="none" />
            
            <!-- Floating geometric shapes -->
            <rect x="80" y="50" width="15" height="15" fill="currentColor" opacity="0.3" transform="rotate(45 87.5 57.5)" />
            <circle cx="320" cy="80" r="6" fill="currentColor" opacity="0.4" />
            <polygon points="100,220 115,240 85,240" fill="currentColor" opacity="0.3" />
          </svg>
        </div>
        
        <div class="not-found-hero__text">
          <h1 class="not-found-hero__title">
            <span class="not-found-hero__title-number">404</span>
            <span class="not-found-hero__title-main">Page Not Found</span>
          </h1>
          <p class="not-found-hero__subtitle">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, even the best explorers sometimes take a wrong turn.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Suggestions Section -->
  <section class="suggestions">
    <div class="suggestions__container">
      <div class="suggestions__content">
        <h2 class="suggestions__title">Let's get you back on track</h2>
        
        <div class="suggestions__grid">
          <div class="suggestion-card">
            <div class="suggestion-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="suggestion-card__title">Go Home</h3>
            <p class="suggestion-card__description">
              Start fresh from our homepage and explore what Alelken has to offer.
            </p>
          </div>

          <div class="suggestion-card">
            <div class="suggestion-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="suggestion-card__title">Go Back</h3>
            <p class="suggestion-card__description">
              Return to the previous page and continue your journey from there.
            </p>
          </div>

          <div class="suggestion-card">
            <div class="suggestion-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="suggestion-card__title">Explore</h3>
            <p class="suggestion-card__description">
              Check out our Product, Press releases, or learn more About us.
            </p>
            <div class="suggestion-card__links">
              <a href="#product" class="suggestion-link">Product</a>
              <a href="#press" class="suggestion-link">Press</a>
              <a href="#about" class="suggestion-link">About</a>
            </div>
          </div>
        </div>

        <div class="suggestions__actions">
          <Button variant="primary" on:click={handleGoHome}>
            Take Me Home
          </Button>
          <Button variant="secondary" on:click={handleGoBack}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .page {
    flex: 1;
    padding-top: 4rem;
    background: linear-gradient(135deg, var(--color-night) 0%, #1a2b28 100%);
    min-height: 100vh;
  }

  /* 404 Hero Section */
  .not-found-hero {
    padding: var(--space-24) 0 var(--space-20) 0;
    position: relative;
    overflow: hidden;
  }

  .not-found-hero__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-20);
    align-items: center;
  }

  .not-found-hero__visual {
    display: flex;
    justify-content: center;
    align-items: center;
    order: 2;
  }

  .not-found-hero__svg {
    width: 100%;
    max-width: 400px;
    height: auto;
    color: var(--color-olive-light);
  }

  .not-found-hero__text {
    order: 1;
  }

  .not-found-hero__title {
    font-family: var(--font-heading);
    font-weight: var(--weight-bold);
    line-height: var(--leading-tight);
    margin: 0 0 var(--space-6) 0;
  }

  .not-found-hero__title-number {
    display: block;
    font-size: var(--text-6xl);
    color: var(--color-olive-light);
    margin-bottom: var(--space-2);
    font-weight: var(--weight-bold);
  }

  .not-found-hero__title-main {
    display: block;
    font-size: var(--text-4xl);
    color: var(--color-white-warm);
    background: linear-gradient(135deg, var(--color-white-warm) 0%, rgba(254, 253, 251, 0.8) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .not-found-hero__subtitle {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    color: rgba(254, 253, 251, 0.85);
    line-height: var(--leading-relaxed);
    margin: 0;
    max-width: 32rem;
  }

  /* Suggestions Section */
  .suggestions {
    background: rgba(47, 62, 59, 0.6);
    padding: var(--space-20) 0;
  }

  .suggestions__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  .suggestions__content {
    text-align: center;
  }

  .suggestions__title {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-16) 0;
  }

  .suggestions__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-8);
    margin-bottom: var(--space-16);
  }

  .suggestion-card {
    background: rgba(139, 126, 83, 0.1);
    border: 1px solid rgba(139, 126, 83, 0.2);
    border-radius: 1rem;
    padding: var(--space-8);
    text-align: center;
    transition: all 400ms ease;
  }

  .suggestion-card:hover {
    background: rgba(139, 126, 83, 0.15);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(47, 62, 59, 0.3);
  }

  .suggestion-card__icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--color-olive-light);
    color: var(--color-night);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--space-6) auto;
  }

  .suggestion-card__title {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-4) 0;
  }

  .suggestion-card__description {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: rgba(254, 253, 251, 0.85);
    line-height: var(--leading-relaxed);
    margin: 0 0 var(--space-4) 0;
  }

  .suggestion-card__links {
    display: flex;
    gap: var(--space-2);
    justify-content: center;
    flex-wrap: wrap;
  }

  .suggestion-link {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--color-olive-light);
    text-decoration: none;
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--color-olive-light);
    border-radius: 1rem;
    transition: all 200ms ease;
  }

  .suggestion-link:hover {
    background-color: var(--color-olive-light);
    color: var(--color-night);
    transform: translateY(-1px);
  }

  .suggestions__actions {
    display: flex;
    justify-content: center;
    gap: var(--space-4);
    flex-wrap: wrap;
  }

  /* Responsive Design */
  @media (max-width: 1023px) {
    .not-found-hero__container {
      grid-template-columns: 1fr;
      gap: var(--space-16);
      text-align: center;
    }

    .not-found-hero__visual {
      order: 1;
    }

    .not-found-hero__text {
      order: 2;
    }
  }

  @media (max-width: 767px) {
    .page {
      padding-top: 3.5rem;
    }

    .not-found-hero {
      padding: var(--space-16) 0;
    }

    .not-found-hero__title-number {
      font-size: var(--text-5xl);
    }

    .not-found-hero__title-main {
      font-size: var(--text-3xl);
    }

    .not-found-hero__subtitle {
      font-size: var(--text-lg);
    }

    .suggestions {
      padding: var(--space-16) 0;
    }

    .suggestions__title {
      font-size: var(--text-2xl);
    }

    .suggestions__grid {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }

    .suggestions__actions {
      flex-direction: column;
      align-items: center;
    }

    .suggestions__actions :global(.btn) {
      width: 100%;
      max-width: 280px;
    }
  }

  @media (max-width: 479px) {
    .not-found-hero__title-number {
      font-size: var(--text-4xl);
    }

    .not-found-hero__title-main {
      font-size: var(--text-2xl);
    }

    .suggestion-card {
      padding: var(--space-6);
    }
  }
</style>