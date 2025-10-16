<script>
  import Card from "../components/ui/Card.svelte";
  import EmailSignup from "../components/ui/EmailSignup.svelte";

  function handleImageError(event) {
    const img = event.target;
    const placeholder = img.nextElementSibling;
    img.style.display = 'none';
    placeholder.style.display = 'flex';
  }
</script>

<div class="page page--product">
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero__container">
      <div class="hero__content">
        <h1 class="hero__title">
          <span class="hero__title-accent">ALAYN</span>
          <span class="hero__title-main">India's Life Guide in Your Pocket</span
          >
        </h1>
        <p class="hero__subtitle">
          Ancient wisdom meets modern science for everyday wellbeing
        </p>
      </div>
      <div class="hero__visual">
        <div class="hero__illustration">
          <!-- Abstract wellness illustration -->
          <svg
            class="hero__svg"
            viewBox="0 0 500 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- Central lotus-inspired pattern -->
            <circle
              cx="250"
              cy="200"
              r="100"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              opacity="0.3"
            />
            <circle
              cx="250"
              cy="200"
              r="75"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              opacity="0.5"
            />
            <circle
              cx="250"
              cy="200"
              r="50"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              opacity="0.7"
            />
            <circle
              cx="250"
              cy="200"
              r="25"
              fill="currentColor"
              opacity="0.8"
            />

            <!-- Flowing connection lines representing life dimensions -->
            <path
              d="M150 200 Q200 125 250 200 Q300 275 350 200"
              stroke="currentColor"
              stroke-width="2"
              opacity="0.4"
              fill="none"
            />
            <path
              d="M250 100 Q187 150 250 200 Q313 250 250 300"
              stroke="currentColor"
              stroke-width="2"
              opacity="0.4"
              fill="none"
            />
            <path
              d="M179 129 Q215 165 250 200 Q285 235 321 271"
              stroke="currentColor"
              stroke-width="2"
              opacity="0.4"
              fill="none"
            />
            <path
              d="M321 129 Q285 165 250 200 Q215 235 179 271"
              stroke="currentColor"
              stroke-width="2"
              opacity="0.4"
              fill="none"
            />

            <!-- Wellness nodes -->
            <circle cx="150" cy="200" r="10" fill="currentColor" />
            <circle cx="350" cy="200" r="10" fill="currentColor" />
            <circle cx="250" cy="100" r="10" fill="currentColor" />
            <circle cx="250" cy="300" r="10" fill="currentColor" />
            <circle cx="179" cy="129" r="8" fill="currentColor" opacity="0.8" />
            <circle cx="321" cy="271" r="8" fill="currentColor" opacity="0.8" />
            <circle cx="321" cy="129" r="8" fill="currentColor" opacity="0.8" />
            <circle cx="179" cy="271" r="8" fill="currentColor" opacity="0.8" />
          </svg>
        </div>
      </div>
    </div>
  </section>

  <!-- Status Banner -->
  <section class="status-banner">
    <div class="status-banner__container">
      <div class="status-banner__content">
        <span class="status-banner__text"
          >Currently in Development | Launching 2026</span>
      </div>
    </div>
  </section>

  <!-- Challenge Section -->
  <section class="challenge">
    <div class="challenge__container">
      <div class="challenge__content">
        <p class="challenge__text">
          Life moves fast. Relationships, careers, family expectations, personal
          growth—navigating it all can feel overwhelming. And when you need
          guidance, finding the right support often feels impossible.
        </p>
        <p class="challenge__text">
          Most Indians face a choice: struggle alone, or seek help that doesn't
          understand our context. What if there was a third path?
        </p>
      </div>
    </div>
  </section>

  <!-- Vision Section -->
  <section class="vision">
    <div class="vision__container">
      <div class="vision__content">
        <div class="section__header">
          <h2 class="vision__title">The Vision</h2>
          <div class="section__accent-line"></div>
        </div>
        <p class="vision__intro">
          Alayn is being built as more than an app—it's a companion for life's
          journey.
        </p>
        <p class="vision__description">We're creating a space where:</p>
        <ol class="vision__list">
          <li class="vision__item">
            Traditional Indian practices meet evidence-based therapeutic
            approaches
          </li>
          <li class="vision__item">
            Guidance is personalized to your unique journey, not
            one-size-fits-all templates
          </li>
          <li class="vision__item">
            Support is available in your language, on your schedule
          </li>
          <li class="vision__item">
            Growth happens through understanding, not judgment
          </li>
        </ol>
      </div>
    </div>
  </section>

  <!-- What We're Building Section -->
  <section class="features">
    <div class="features__container">
      <div class="features__content">
        <div class="section__header">
          <h2 class="features__title">What We're Building</h2>
          <div class="section__accent-line"></div>
        </div>

        <div class="features__grid">
          <Card variant="elevated">
            <div class="feature__content">
              <h3 class="feature__title">Personalized Pathways</h3>
              <p class="feature__description">
                Understanding where you are, guiding where you want to go
              </p>
            </div>
          </Card>

          <Card variant="elevated">
            <div class="feature__content">
              <h3 class="feature__title">Culturally Rooted Practices</h3>
              <p class="feature__description">
                From yoga and pranayama to modern therapeutic
                techniques—integrated, not separated
              </p>
            </div>
          </Card>

          <Card variant="elevated">
            <div class="feature__content">
              <h3 class="feature__title">Rich Learning Library</h3>
              <p class="feature__description">
                Stories, wisdom, and practical tools that resonate with your
                lived experience
              </p>
            </div>
          </Card>

          <Card variant="elevated">
            <div class="feature__content">
              <h3 class="feature__title">Expert Support</h3>
              <p class="feature__description">
                Access to qualified therapists when you need human connection
              </p>
            </div>
          </Card>

          <Card variant="elevated">
            <div class="feature__content">
              <h3 class="feature__title">Multi-Domain Wellness</h3>
              <p class="feature__description">
                Because mental wellness touches every part of life—work,
                relationships, purpose, and peace
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>

  <!-- Built for India Section -->
  <section class="built-for-india">
    <div class="built-for-india__container">
      <div class="built-for-india__content">
        <div class="section__header">
          <h2 class="built-for-india__title">Built for India</h2>
          <div class="section__accent-line"></div>
        </div>
        <p class="built-for-india__subtitle">Designed for Real India:</p>

        <div class="india-features">
          <div class="india-feature">
            <div class="india-feature__icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M15 11.5V9.5L21 9V11L15 11.5ZM21 16V14L15 14.5V16M15 18.5V16.5L21 16V18L15 18.5ZM11 7H9L7 12V22H9V17H11V22H13V12L11 7Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div class="india-feature__content">
              <h4 class="india-feature__title">
                Available in multiple Indian languages
              </h4>
            </div>
          </div>

          <div class="india-feature">
            <div class="india-feature__icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 17H22V19H2V17ZM1.15 12.95L4 15.47L6.85 12.95L8.54 14.64L4 19.18L-0.54 14.64L1.15 12.95ZM6.54 4.64L4 7.18L1.46 4.64L3.15 2.95L4 3.8L4.85 2.95L6.54 4.64ZM22 7H8V9H22V7ZM22 3H8V5H22V3Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div class="india-feature__content">
              <h4 class="india-feature__title">
                Works on basic internet connections
              </h4>
            </div>
          </div>

          <div class="india-feature">
            <div class="india-feature__icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.4 14.8 17.4H9.2C8.6 17.4 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7ZM12 8.2C11.2 8.2 10.4 8.8 10.4 10V11.5H13.6V10C13.6 8.8 12.8 8.2 12 8.2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div class="india-feature__content">
              <h4 class="india-feature__title">
                Privacy-first, DPDP Act 2023 compliant
              </h4>
            </div>
          </div>

          <div class="india-feature">
            <div class="india-feature__icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                  fill="currentColor"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                />
                <path
                  d="M8 12L10 14L16 8"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                />
              </svg>
            </div>
            <div class="india-feature__content">
              <h4 class="india-feature__title">
                Culturally sensitive to diverse traditions and values
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why It Matters Section -->
  <section class="impact">
    <div class="impact__container">
      <div class="impact__content">
        <div class="section__header">
          <h2 class="impact__title">Why It Matters</h2>
          <div class="section__accent-line"></div>
        </div>
        <div class="impact__text">
          <p>
            Every year, countless young Indians face challenges alone—not
            because they don't want help, but because the right help isn't
            accessible, affordable, or culturally appropriate.
          </p>
          <p>
            We're building Alayn to change that. To make guidance as normal as
            calling a friend. To remove the stigma and barriers between you and
            your best self.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Expert Advisory Section -->
  <section class="advisory">
    <div class="advisory__container">
      <div class="section__header">
        <h2 class="advisory__title">Guided by Experience</h2>
        <div class="section__accent-line"></div>
      </div>
      <div class="advisory__content">
        <div class="advisory__photo">
          <img src="/assets/team/bhuvaneshwari.jpg" alt="Dr. U.L. Bhuvaneswari" loading="lazy" 
               on:error={handleImageError} />
          <div class="advisory__placeholder">UB</div>
        </div>
        <div class="advisory__info">
          <h3 class="advisory__name">Dr. U.L. Bhuvaneswari</h3>
          <p class="advisory__role">Expert Advisor, Alayn Development</p>
          <p class="advisory__bio">
            Doctorate in Counselling Psychology with decades of experience in mental health 
            education, research, and clinical practice. Dr. Bhuvaneswari ensures our wellness 
            solutions meet the highest clinical and ethical standards while remaining culturally 
            grounded.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Waitlist CTA Section -->
  <section class="waitlist-cta">
    <div class="waitlist-cta__container">
      <div class="waitlist-cta__content">
        <div class="waitlist-cta__header">
          <h2 class="waitlist-cta__title">Want to be part of the journey?</h2>
          <div class="waitlist-cta__accent-line"></div>
        </div>
        <p class="waitlist-cta__description">
          We're carefully developing Alayn with input from mental health experts, therapists, 
          and people like you. Be among the first to know when we launch.
        </p>

        <div class="waitlist-form">
          <EmailSignup
            title=""
            description=""
            buttonText="Join the Waitlist"
            placeholder="Enter your email address"
            compact={true}
          />
        </div>

        <div class="waitlist-cta__note">
          <p>Join 500+ people already on the waitlist</p>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .page {
    flex: 1;
    padding-top: 4rem;
    background-color: var(--color-night);
  }

  /* Hero Section */
  .hero {
    padding: var(--space-20) 0;
    position: relative;
    overflow: hidden;
  }

  .hero__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: center;
  }

  .hero__content {
    z-index: 2;
  }

  .hero__title {
    font-family: var(--font-heading);
    font-size: var(--text-6xl);
    font-weight: var(--weight-bold);
    line-height: var(--leading-tight);
    margin: 0 0 var(--space-6) 0;
  }

  .hero__title-accent {
    display: block;
    color: var(--color-olive-light);
    font-size: var(--text-2xl);
    font-weight: var(--weight-medium);
    letter-spacing: var(--tracking-wider);
    margin-bottom: var(--space-2);
  }

  .hero__title-main {
    display: block;
    color: var(--color-text-on-dark);
  }

  .hero__subtitle {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    color: rgba(254, 253, 251, 0.8);
    line-height: var(--leading-relaxed);
    margin: 0;
    max-width: 28rem;
  }

  .hero__visual {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hero__illustration {
    width: 100%;
    max-width: 600px;
  }

  .hero__svg {
    width: 100%;
    height: auto;
    color: var(--color-olive-light);
  }

  /* Status Banner */
  .status-banner {
    background-color: rgba(47, 62, 59, 0.7);
    color: var(--color-white-warm);
    padding: var(--space-4) 0;
    text-align: center;
  }

  .status-banner__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  .status-banner__text {
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--color-olive-light);
  }

  /* Challenge Section */
  .challenge {
    background-color: rgba(47, 62, 59, 0.6);
    padding: var(--space-20) 0;
  }

  .challenge__container {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  .challenge__content {
    text-align: center;
  }

  .challenge__text {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    line-height: var(--leading-relaxed);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-8) 0;
    opacity: 0.9;
  }

  .challenge__text:last-child {
    margin-bottom: 0;
    font-weight: var(--weight-medium);
    color: var(--color-olive-light);
    opacity: 1;
  }

  /* Vision Section */
  .vision {
    background-color: rgba(47, 62, 59, 0.8);
    padding: var(--space-20) 0;
  }

  .vision__container {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  .vision__content {
    text-align: center;
  }

  /* Section Headers */
  .section__header {
    text-align: center;
    margin-bottom: var(--space-12);
  }

  .section__accent-line {
    width: 60px;
    height: 3px;
    background-color: var(--color-olive-light);
    margin: 0 auto;
  }

  .vision__title {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    color: var(--color-olive-light);
    margin: 0 0 var(--space-4) 0;
    text-align: center;
    line-height: var(--leading-tight);
  }

  .vision__intro {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    font-weight: var(--weight-medium);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-6) 0;
    text-align: center;
    line-height: var(--leading-normal);
  }

  .vision__description {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-6) 0;
    line-height: var(--leading-normal);
    opacity: 0.9;
    text-align: left;
    max-width: 600px;
    margin: 0 auto var(--space-6) auto;
  }

  .vision__list {
    list-style: none;
    padding: 0;
    margin: 0;
    counter-reset: vision-counter;
    text-align: left;
    max-width: 600px;
    margin: 0 auto;
  }

  .vision__item {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    color: var(--color-white-warm);
    line-height: var(--leading-relaxed);
    margin: 0 0 var(--space-4) 0;
    padding-left: var(--space-8);
    position: relative;
    counter-increment: vision-counter;
  }

  .vision__item::before {
    content: counter(vision-counter) ".";
    position: absolute;
    left: 0;
    color: var(--color-olive-light);
    font-weight: var(--weight-bold);
    font-family: var(--font-heading);
  }

  .vision__item:last-child {
    margin-bottom: 0;
  }

  /* Features Section */
  .features {
    background-color: rgba(47, 62, 59, 0.4);
    padding: var(--space-20) 0;
  }

  .features__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  .features__title {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    color: var(--color-olive-light);
    margin: 0 0 var(--space-4) 0;
    text-align: center;
    line-height: var(--leading-tight);
  }

  .features__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-8);
  }

  .feature__content {
    padding: var(--space-8);
    text-align: center;
  }

  .feature__title {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: var(--weight-semibold);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-4) 0;
    line-height: var(--leading-tight);
  }

  .feature__description {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-white-warm);
    line-height: var(--leading-relaxed);
    margin: 0;
    opacity: 0.9;
  }

  /* Built for India Section */
  .built-for-india {
    background-color: rgba(47, 62, 59, 0.9);
    color: var(--color-white-warm);
    padding: var(--space-20) 0;
  }

  /* Ensure all text in Built for India section is white */
  .built-for-india * {
    color: var(--color-white-warm) !important;
  }

  .built-for-india__container {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  .built-for-india__title {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    margin: 0 0 var(--space-4) 0;
    text-align: center;
    line-height: var(--leading-tight);
    color: var(--color-olive-light);
  }

  .built-for-india__subtitle {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    font-weight: var(--weight-medium);
    margin: 0 0 var(--space-12) 0;
    text-align: center;
    opacity: 0.9;
  }

  .india-features {
    display: grid;
    gap: var(--space-8);
  }

  .india-feature {
    display: flex;
    align-items: center;
    gap: var(--space-6);
  }

  .india-feature__icon {
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-olive-light);
    color: var(--color-night);
    border-radius: 50%;
  }

  .india-feature__icon svg {
    width: 24px;
    height: 24px;
  }

  .india-feature__title {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    font-weight: var(--weight-medium);
    margin: 0;
    line-height: var(--leading-normal);
    color: var(--color-white-warm) !important;
  }

  /* Impact Section */
  .impact {
    background-color: rgba(47, 62, 59, 0.7);
    padding: var(--space-20) 0;
  }

  .impact__container {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  .impact__title {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    color: var(--color-olive-light);
    margin: 0 0 var(--space-4) 0;
    text-align: center;
    line-height: var(--leading-tight);
  }

  .impact__text {
    text-align: center;
  }

  .impact__text p {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    color: var(--color-white-warm);
    line-height: var(--leading-relaxed);
    margin: 0 0 var(--space-8) 0;
    opacity: 0.9;
  }

  .impact__text p:last-child {
    margin-bottom: 0;
    font-weight: var(--weight-medium);
    color: var(--color-olive-light);
    opacity: 1;
  }

  /* Advisory Section */
  .advisory {
    background-color: rgba(47, 62, 59, 0.8);
    padding: var(--space-20) 0;
  }

  .advisory__container {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  .advisory__title {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    color: var(--color-olive-light);
    margin: 0 0 var(--space-4) 0;
    text-align: center;
    line-height: var(--leading-tight);
  }

  .advisory__content {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-12);
    align-items: center;
    background-color: rgba(47, 62, 59, 0.6);
    border-radius: 1rem;
    padding: var(--space-12);
    border: 1px solid rgba(139, 126, 83, 0.2);
    transition: all 400ms ease;
  }

  .advisory__content:hover {
    background-color: rgba(47, 62, 59, 0.8);
    border-left: 6px solid var(--color-olive-light);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(47, 62, 59, 0.3);
  }

  .advisory__photo {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    background-color: var(--color-olive-light);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .advisory__photo::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-olive-light), var(--color-olive));
    z-index: -1;
  }

  .advisory__photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    border-radius: 50%;
    display: block;
  }

  .advisory__placeholder {
    width: 100%;
    height: 100%;
    display: none;
    align-items: center;
    justify-content: center;
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--color-white-warm);
    background: linear-gradient(135deg, var(--color-olive) 0%, var(--color-olive-lighter) 100%);
    border-radius: 50%;
  }

  .advisory__name {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-2) 0;
    line-height: var(--leading-tight);
  }

  .advisory__role {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    font-weight: var(--weight-medium);
    color: var(--color-olive-light);
    margin: 0 0 var(--space-6) 0;
  }

  .advisory__bio {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-white-warm);
    line-height: var(--leading-relaxed);
    margin: 0;
    opacity: 0.9;
  }

  /* Waitlist CTA Section */
  .waitlist-cta {
    background-color: var(--color-night);
    color: var(--color-white-warm);
    padding: var(--space-20) 0;
  }

  .waitlist-cta__container {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  .waitlist-cta__content {
    text-align: center;
  }

  .waitlist-cta__header {
    margin-bottom: var(--space-8);
  }

  .waitlist-cta__title {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    margin: 0 0 var(--space-4) 0;
    line-height: var(--leading-tight);
    color: var(--color-white-warm);
  }

  .waitlist-cta__accent-line {
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, var(--color-olive-light) 0%, var(--color-olive) 100%);
    margin: 0 auto;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(139, 126, 83, 0.4);
  }

  .waitlist-cta__description {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    line-height: var(--leading-relaxed);
    margin: 0 0 var(--space-12) 0;
    color: var(--color-white-warm);
    opacity: 0.95;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .waitlist-form {
    max-width: 600px;
    margin: 0 auto var(--space-8) auto;
  }

  .waitlist-cta__note {
    margin-top: var(--space-6);
  }

  .waitlist-cta__note p {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-white-warm);
    opacity: 0.7;
    margin: 0;
    font-style: italic;
  }

  /* Override EmailSignup styles for enhanced design */
  .waitlist-cta :global(.email-signup) {
    max-width: none;
  }

  .waitlist-cta :global(.email-signup__title) {
    color: var(--color-white-warm) !important;
  }

  .waitlist-cta :global(.email-signup__description) {
    color: var(--color-white-warm) !important;
    opacity: 0.9;
  }

  .waitlist-cta :global(.input-group) {
    display: flex;
    gap: var(--space-4);
    align-items: stretch;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3rem;
    padding: var(--space-2);
    border: 2px solid rgba(255, 255, 255, 0.15);
    transition: all 300ms ease;
    backdrop-filter: blur(10px);
  }

  .waitlist-cta :global(.input-group:focus-within) {
    border-color: rgba(139, 126, 83, 0.5);
    box-shadow: 0 0 0 4px rgba(139, 126, 83, 0.1);
  }

  .waitlist-cta :global(.input-group input) {
    background-color: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    color: var(--color-white-warm) !important;
    padding: var(--space-4) var(--space-6) !important;
    font-size: var(--text-lg) !important;
    flex: 1 !important;
    outline: none !important;
  }

  .waitlist-cta :global(.input-group input::placeholder) {
    color: rgba(255, 255, 255, 0.6) !important;
  }

  .waitlist-cta :global(.input-group button) {
    background: linear-gradient(135deg, var(--color-olive) 0%, var(--color-olive-lighter) 100%) !important;
    border: none !important;
    border-radius: 2rem !important;
    color: var(--color-white-warm) !important;
    font-weight: var(--weight-semibold) !important;
    padding: var(--space-4) var(--space-8) !important;
    transition: all 300ms ease !important;
    box-shadow: 0 4px 12px rgba(139, 126, 83, 0.3) !important;
    white-space: nowrap !important;
    flex-shrink: 0 !important;
  }

  .waitlist-cta :global(.input-group button:hover) {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px rgba(139, 126, 83, 0.4) !important;
    background: linear-gradient(135deg, var(--color-olive-lighter) 0%, var(--color-olive) 100%) !important;
  }

  .waitlist-cta :global(.input-group .error-message) {
    color: #ff8a8a !important;
    background-color: rgba(255, 138, 138, 0.1) !important;
    padding: var(--space-2) var(--space-3) !important;
    border-radius: 0.5rem !important;
    margin-top: var(--space-2) !important;
  }

  /* Override Card styles for dark theme */
  .features :global(.card) {
    background-color: rgba(47, 62, 59, 0.6) !important;
    border: 1px solid rgba(139, 126, 83, 0.2) !important;
  }

  .features :global(.card:hover) {
    background-color: rgba(47, 62, 59, 0.8) !important;
    border-left: 4px solid var(--color-olive-light) !important;
    transform: translateY(-2px);
  }

  /* Ensure all card text is white */
  .features :global(.card *) {
    color: var(--color-white-warm) !important;
  }

  .features :global(.card h3) {
    color: var(--color-white-warm) !important;
  }

  .features :global(.card p) {
    color: var(--color-white-warm) !important;
    opacity: 0.9;
  }

  /* Responsive Design */
  @media (max-width: 1023px) {
    .hero__container {
      grid-template-columns: 1fr;
      gap: var(--space-12);
      text-align: center;
    }

    .hero__title {
      font-size: var(--text-5xl);
    }
  }

  @media (max-width: 767px) {
    .page {
      padding-top: 3.5rem;
    }

    .hero {
      padding: var(--space-16) 0;
    }

    .hero__title {
      font-size: var(--text-4xl);
    }

    .hero__title-accent {
      font-size: var(--text-lg);
    }

    .hero__subtitle {
      font-size: var(--text-lg);
    }

    .status-banner__text {
      font-size: var(--text-sm);
    }

    .challenge {
      padding: var(--space-16) 0;
    }

    .challenge__text {
      font-size: var(--text-lg);
    }

    .vision {
      padding: var(--space-16) 0;
    }

    .vision__title {
      font-size: var(--text-2xl);
    }

    .vision__intro {
      font-size: var(--text-lg);
    }

    .vision__description,
    .vision__item {
      font-size: var(--text-base);
    }

    .features {
      padding: var(--space-16) 0;
    }

    .section__header {
      margin-bottom: var(--space-8);
    }

    .features__title {
      font-size: var(--text-2xl);
    }

    .features__grid {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }

    .feature__content {
      padding: var(--space-6);
    }

    .built-for-india {
      padding: var(--space-16) 0;
    }

    .built-for-india__title {
      font-size: var(--text-2xl);
    }

    .built-for-india__subtitle {
      font-size: var(--text-lg);
    }

    .india-features {
      gap: var(--space-6);
    }

    .india-feature {
      gap: var(--space-4);
    }

    .india-feature__title {
      font-size: var(--text-base);
    }

    .impact {
      padding: var(--space-16) 0;
    }

    .impact__title {
      font-size: var(--text-2xl);
      margin-bottom: var(--space-8);
    }

    .impact__text p {
      font-size: var(--text-lg);
    }

    .advisory {
      padding: var(--space-16) 0;
    }

    .advisory__title {
      font-size: var(--text-2xl);
    }

    .advisory__content {
      grid-template-columns: 1fr;
      gap: var(--space-8);
      text-align: center;
      padding: var(--space-8);
    }

    .advisory__photo {
      width: 120px;
      height: 120px;
      margin: 0 auto;
    }

    .advisory__name {
      font-size: var(--text-xl);
    }

    .advisory__role {
      font-size: var(--text-base);
    }

    .advisory__bio {
      font-size: var(--text-sm);
    }

    .waitlist-cta {
      padding: var(--space-20) 0;
    }



    .waitlist-cta__title {
      font-size: var(--text-3xl);
    }

    .waitlist-cta__accent-line {
      width: 60px;
      height: 3px;
    }

    .waitlist-cta__description {
      font-size: var(--text-lg);
      margin-bottom: var(--space-10);
    }

    .waitlist-form {
      max-width: 100%;
    }

    .waitlist-cta :global(.input-group) {
      flex-direction: column !important;
      gap: 0 !important;
      border-radius: 1rem !important;
      padding: var(--space-3) !important;
    }

    .waitlist-cta :global(.input-group input) {
      padding: var(--space-4) var(--space-5) !important;
      text-align: center !important;
      border-radius: 0.75rem !important;
      margin-bottom: var(--space-3) !important;
    }

    .waitlist-cta :global(.input-group button) {
      padding: var(--space-4) var(--space-6) !important;
      width: 100% !important;
      border-radius: 0.75rem !important;
    }
  }
</style>
