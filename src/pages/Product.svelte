<script>
  import Card from "../components/ui/Card.svelte";

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
          growth: navigating it all can feel overwhelming. And when you need
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
          Alayn is being built as more than an app. It's a companion for life's
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
          <div class="feature-card">
            <div class="feature-card__header">
              <div class="feature-card__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
                  <path d="M12 14C16.42 14 20 10.42 20 6H4C4 10.42 7.58 14 12 14Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
                  <path d="M8 14V20C8 21.1 8.9 22 10 22H14C15.1 22 16 21.1 16 20V14" stroke="currentColor" stroke-width="1.5" fill="none"/>
                  <circle cx="12" cy="18" r="1" fill="currentColor"/>
                </svg>
              </div>
              <div class="feature-card__badge">Core</div>
            </div>
            <div class="feature-card__content">
              <h3 class="feature-card__title">Personalized Pathways</h3>
              <p class="feature-card__description">
                Understanding where you are, guiding where you want to go through AI-powered insights tailored to your unique journey.
              </p>
              <div class="feature-card__highlights">
                <span class="highlight">Smart Assessment</span>
                <span class="highlight">Custom Goals</span>
                <span class="highlight">Progress Tracking</span>
              </div>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-card__header">
              <div class="feature-card__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
                  <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="currentColor"/>
                  <circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1"/>
                  <path d="M12 2V6M12 18V22M22 12H18M6 12H2" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="feature-card__badge">Heritage</div>
            </div>
            <div class="feature-card__content">
              <h3 class="feature-card__title">Culturally Rooted Practices</h3>
              <p class="feature-card__description">
                From yoga and pranayama to modern therapeutic techniques, integrated, not separated. Ancient wisdom meets evidence-based care.
              </p>
              <div class="feature-card__highlights">
                <span class="highlight">Yoga & Meditation</span>
                <span class="highlight">Ayurvedic Principles</span>
                <span class="highlight">Modern Therapy</span>
              </div>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-card__header">
              <div class="feature-card__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
                  <path d="M22 8H2" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="7" cy="12" r="1.5" fill="currentColor"/>
                  <circle cx="12" cy="16" r="1" fill="currentColor"/>
                  <circle cx="17" cy="12" r="1.5" fill="currentColor"/>
                  <path d="M7 14L12 12L17 14" stroke="currentColor" stroke-width="1" fill="none"/>
                </svg>
              </div>
              <div class="feature-card__badge">Learn</div>
            </div>
            <div class="feature-card__content">
              <h3 class="feature-card__title">Rich Learning Library</h3>
              <p class="feature-card__description">
                Stories, wisdom, and practical tools that resonate with your lived experience. Content that speaks to your heart and mind.
              </p>
              <div class="feature-card__highlights">
                <span class="highlight">Interactive Stories</span>
                <span class="highlight">Practical Exercises</span>
                <span class="highlight">Cultural Context</span>
              </div>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-card__header">
              <div class="feature-card__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6977C21.7033 16.0414 20.9999 15.5735 20.2 15.3613" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 3.13C16.8003 3.3422 17.5037 3.81014 18.0098 4.46645C18.5159 5.12277 18.8004 5.93317 18.8004 6.76875C18.8004 7.60433 18.5159 8.41473 18.0098 9.07105C17.5037 9.72736 16.8003 10.1953 16 10.4075" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="feature-card__badge">Support</div>
            </div>
            <div class="feature-card__content">
              <h3 class="feature-card__title">Expert Support</h3>
              <p class="feature-card__description">
                Access to qualified therapists when you need human connection. Professional guidance that understands your cultural background.
              </p>
              <div class="feature-card__highlights">
                <span class="highlight">Licensed Therapists</span>
                <span class="highlight">Cultural Awareness</span>
                <span class="highlight">24/7 Crisis Support</span>
              </div>
            </div>
          </div>

          <div class="feature-card feature-card--featured">
            <div class="feature-card__header">
              <div class="feature-card__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="feature-card__badge feature-card__badge--premium">Holistic</div>
            </div>
            <div class="feature-card__content">
              <h3 class="feature-card__title">Multi-Domain Wellness</h3>
              <p class="feature-card__description">
                Because mental wellness touches every part of life: work, relationships, purpose, and peace. A comprehensive approach to your wellbeing.
              </p>
              <div class="feature-card__highlights">
                <span class="highlight">Work-Life Balance</span>
                <span class="highlight">Relationship Health</span>
                <span class="highlight">Purpose & Meaning</span>
                <span class="highlight">Inner Peace</span>
              </div>
            </div>
          </div>
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
            Every year, countless young Indians face challenges alone, not
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
          <img src="/assets/team/bhuvaneshwari.jpg" alt="Dr. U.L. Bhuvaneswari"
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
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-8);
  }

  .feature-card {
    background: linear-gradient(135deg, rgba(139, 126, 83, 0.1) 0%, rgba(47, 62, 59, 0.8) 100%);
    border: 1px solid rgba(139, 126, 83, 0.2);
    border-radius: 1.5rem;
    padding: 0;
    transition: all 400ms ease;
    overflow: hidden;
    position: relative;
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--color-olive-light) 0%, var(--color-olive) 100%);
    opacity: 0;
    transition: opacity 400ms ease;
  }

  .feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(47, 62, 59, 0.4);
    border-color: var(--color-olive-light);
  }

  .feature-card:hover::before {
    opacity: 1;
  }

  .feature-card--featured {
    background: linear-gradient(135deg, rgba(139, 126, 83, 0.2) 0%, rgba(47, 62, 59, 0.9) 100%);
    border: 2px solid var(--color-olive-light);
    transform: scale(1.02);
  }

  .feature-card--featured::before {
    opacity: 1;
    height: 4px;
  }

  .feature-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-8) var(--space-8) var(--space-4) var(--space-8);
  }

  .feature-card__icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-olive-light) 0%, var(--color-olive) 100%);
    color: var(--color-night);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(139, 126, 83, 0.3);
    transition: all 300ms ease;
  }

  .feature-card:hover .feature-card__icon {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 6px 20px rgba(139, 126, 83, 0.4);
  }

  .feature-card__icon svg {
    width: 28px;
    height: 28px;
  }

  .feature-card__badge {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: var(--weight-bold);
    color: var(--color-olive-light);
    background: rgba(139, 126, 83, 0.2);
    padding: var(--space-1) var(--space-3);
    border-radius: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 1px solid rgba(139, 126, 83, 0.3);
  }

  .feature-card__badge--premium {
    background: linear-gradient(135deg, var(--color-olive-light) 0%, var(--color-olive) 100%);
    color: var(--color-night);
    border: none;
  }

  .feature-card__content {
    padding: 0 var(--space-8) var(--space-8) var(--space-8);
  }

  .feature-card__title {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-4) 0;
    line-height: var(--leading-tight);
  }

  .feature-card__description {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: rgba(254, 253, 251, 0.85);
    line-height: var(--leading-relaxed);
    margin: 0 0 var(--space-6) 0;
  }

  .feature-card__highlights {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .highlight {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    color: var(--color-olive-light);
    background: rgba(139, 126, 83, 0.15);
    padding: var(--space-1) var(--space-2);
    border-radius: 0.5rem;
    border: 1px solid rgba(139, 126, 83, 0.3);
    transition: all 200ms ease;
  }

  .highlight:hover {
    background: rgba(139, 126, 83, 0.25);
    transform: translateY(-1px);
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
    min-height: 56px !important;
    height: 56px !important;
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
    min-height: 56px !important;
    height: 56px !important;
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

    .feature-card {
      transform: none;
    }

    .feature-card--featured {
      transform: none;
    }

    .feature-card__header {
      padding: var(--space-6) var(--space-6) var(--space-3) var(--space-6);
    }

    .feature-card__content {
      padding: 0 var(--space-6) var(--space-6) var(--space-6);
    }

    .feature-card__icon {
      width: 50px;
      height: 50px;
    }

    .feature-card__icon svg {
      width: 24px;
      height: 24px;
    }

    .feature-card__title {
      font-size: var(--text-lg);
    }

    .feature-card__description {
      font-size: var(--text-sm);
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
