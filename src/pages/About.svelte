<script>
  import Card from "../components/ui/Card.svelte";
  import Button from "../components/ui/Button.svelte";

  function handleImageError(event) {
    const img = event.target;
    const placeholder = img.nextElementSibling;
    img.style.display = "none";
    placeholder.style.display = "flex";
  }
</script>

<div class="page page--about">
  <!-- Opening Statement -->
  <section class="hero">
    <div class="hero__container">
      <h1 class="hero__title">Built by People Who Believe in Better</h1>
      <p class="hero__subtitle">
        Alelken started with a simple observation: the systems meant to serve
        people (healthcare, education, infrastructure) often fail those who need
        them most. We're not a typical tech company. We're problem-solvers who
        happen to use technology as our tool of choice.
      </p>
    </div>
  </section>

  <!-- Origin Story Section -->
  <section class="origin-story">
    <div class="origin-story__container">
      <div class="section__header">
        <h2 class="section__title">How We Started</h2>
        <div class="section__accent-line"></div>
      </div>
      <div class="origin-story__content">
        <p>
          Three individuals from different backgrounds found themselves asking
          the same questions: Why do mental health resources remain out of reach
          for most Indians? Why does education still follow factory-age models
          in an information age? Why do we treat planetary resources as
          disposable when scarcity looms?
        </p>
        <p>
          The answer wasn't more apps or more services. It was fundamentally
          rethinking how technology could rebuild these systems from the ground
          up.
        </p>
        <p class="highlight">
          Alelken was founded on the belief that massive societal impact
          requires building for the people the system currently leaves behind.
        </p>
      </div>
    </div>
  </section>

  <!-- The Team Section -->
  <section class="team">
    <div class="team__container">
      <div class="section__header">
        <h2 class="section__title">The Founding Team</h2>
        <div class="section__accent-line"></div>
      </div>

      <!-- Equal Co-Founders Grid -->
      <div class="team__founders">
        <!-- G Harikrishna - CEO & Co-Founder -->
        <div class="founder">
          <div class="founder__photo">
            <img
              src="/assets/team/harikrishna.jpg"
              alt="G Harikrishna"
              on:error={handleImageError}
            />
            <div class="founder__placeholder">GH</div>
          </div>
          <div class="founder__content">
            <h3 class="founder__name">G Harikrishna</h3>
            <p class="founder__role">CEO & Co-Founder</p>
            <p class="founder__bio">
              Technology architect with deep expertise in scalable systems and
              AI-driven solutions. Harikrishna leads technical innovation and
              product engineering, building robust platforms that can serve
              millions while maintaining performance and reliability. His focus
              is on creating technology that works seamlessly across India's
              diverse digital infrastructure.
            </p>
          </div>
        </div>

        <!-- Karthick Balraj - COO & Co-Founder -->
        <div class="founder">
          <div class="founder__photo">
            <img
              src="/assets/team/karthick_balraj.png"
              alt="Karthick Balraj"
              on:error={handleImageError}
            />
            <div class="founder__placeholder">KB</div>
          </div>
          <div class="founder__content">
            <h3 class="founder__name">Karthick Balraj</h3>
            <p class="founder__role">COO & Co-Founder</p>
            <p class="founder__bio">
              Operational expertise in building scalable systems. Karthick
              oversees product development and operational excellence,
              translating ambitious visions into reliable, accessible platforms.
              He ensures our technology works for everyone, not just those with
              premium devices and connectivity.
            </p>
          </div>
        </div>

        <!-- Karthick Selvaraj - Media Lead & Co-Founder -->
        <div class="founder">
          <div class="founder__photo">
            <img
              src="/assets/team/karthick_selvaraj.jpg"
              alt="Karthick Selvaraj"
              on:error={handleImageError}
            />
            <div class="founder__placeholder">KS</div>
          </div>
          <div class="founder__content">
            <h3 class="founder__name">Karthick Selvaraj</h3>
            <p class="founder__role">Media Lead & Co-Founder</p>
            <p class="founder__bio">
              Media strategist and brand storyteller with expertise in digital
              content creation and audience engagement. Karthick oversees all
              media operations, from content production to social media strategy,
              ensuring Alelken's message reaches and resonates with diverse
              audiences. He crafts compelling narratives that translate complex
              technology into accessible, meaningful stories.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Our Approach Section -->
  <section class="approach">
    <div class="approach__container">
      <div class="section__header">
        <h2 class="section__title">How We Work</h2>
        <div class="section__accent-line"></div>
      </div>
      <div class="approach__grid">
        <div class="approach__item">
          <h3 class="approach__item-title">Evidence-Based Development</h3>
          <p class="approach__item-description">
            Every solution is built on research, tested with real users, and
            refined based on outcomes, not assumptions.
          </p>
        </div>

        <div class="approach__item">
          <h3 class="approach__item-title">Cultural Intelligence</h3>
          <p class="approach__item-description">
            We don't copy Western solutions. We build for Indian contexts,
            languages, and value systems from day one.
          </p>
        </div>

        <div class="approach__item">
          <h3 class="approach__item-title">Sustainable Business Models</h3>
          <p class="approach__item-description">
            Impact requires sustainability. We design revenue models that align
            user benefit with business viability.
          </p>
        </div>

        <div class="approach__item">
          <h3 class="approach__item-title">Transparency and Ethics</h3>
          <p class="approach__item-description">
            We commit to data privacy, user consent, and ethical AI principles
            in everything we build.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- What Drives Us Section -->
  <section class="motivation">
    <div class="motivation__container">
      <div class="section__header">
        <h2 class="section__title">What Drives Us</h2>
        <div class="section__accent-line"></div>
      </div>
      <div class="motivation__content">
        <blockquote class="motivation__quote">
          We're not motivated by exits or valuations. We're driven by the
          possibility of a young person in a tier-3 city getting support before
          reaching crisis. Of students learning at their own pace instead of
          memorizing for exams. Of waste becoming resource instead of landfill.
        </blockquote>
        <p class="motivation__vision">
          This work is generational. The systems we're building today are
          investments in an India that works better for everyone, especially
          those the current system fails.
        </p>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="contact">
    <div class="contact__container">
      <div class="section__header">
        <h2 class="section__title">Get in Touch</h2>
        <div class="section__accent-line"></div>
      </div>
      <div class="contact__content">
        <p class="contact__description">
          Whether you're interested in our mission, want to collaborate, or have
          expertise to share, we'd love to hear from you.
        </p>
        <div class="contact__links">
          <Button
            href="https://linkedin.com/company/alelken"
            variant="primary"
          >
            Connect on LinkedIn
          </Button>
        </div>
        <p class="contact__note">
          We're building in the open and learning from everyone willing to
          engage.
        </p>
      </div>
    </div>
  </section>
</div>

<style>
  .page {
    flex: 1;
    padding-top: 4rem; /* Account for fixed header */
    background-color: var(--color-night);
  }

  /* Hero Section */
  .hero {
    padding: var(--space-20) 0;
    position: relative;
    overflow: hidden;
  }

  .hero__container {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  .hero__title {
    font-family: var(--font-heading);
    font-size: var(--text-6xl);
    font-weight: var(--weight-bold);
    color: var(--color-text-on-dark);
    margin: 0 0 var(--space-6) 0;
    line-height: var(--leading-tight);
  }

  .hero__subtitle {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    color: rgba(254, 253, 251, 0.8);
    margin: 0;
    line-height: var(--leading-relaxed);
  }

  /* Section Headers */
  .section__header {
    text-align: center;
    margin-bottom: var(--space-16);
  }

  .section__title {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    color: var(--color-olive-light);
    margin: 0 0 var(--space-4) 0;
    line-height: var(--leading-tight);
  }

  .section__accent-line {
    width: 60px;
    height: 3px;
    background-color: var(--color-olive-light);
    margin: 0 auto;
  }

  /* Origin Story Section */
  .origin-story {
    padding: var(--space-20) 0;
    background-color: rgba(47, 62, 59, 0.6);
  }

  .origin-story__container {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  .origin-story__content p {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    color: var(--color-white-warm);
    line-height: var(--leading-relaxed);
    margin: 0 0 var(--space-8) 0;
    opacity: 0.9;
  }

  .origin-story__content .highlight {
    font-size: var(--text-xl);
    font-weight: var(--weight-medium);
    color: var(--color-olive-light);
    padding: var(--space-8);
    background-color: rgba(47, 62, 59, 0.6);
    border-left: 4px solid var(--color-olive-light);
    border-radius: 0.75rem;
    margin: var(--space-8) 0;
    opacity: 1;
  }

  /* Team Section */
  .team {
    padding: var(--space-20) 0;
    background-color: rgba(47, 62, 59, 0.4);
  }

  .team__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  /* Founders Grid */
  .team__founders {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    align-items: stretch;
  }

  .founder {
    background-color: rgba(47, 62, 59, 0.6);
    border-radius: 1rem;
    padding: var(--space-10);
    border: 1px solid rgba(139, 126, 83, 0.2);
    transition: all 400ms ease;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .founder:hover {
    background-color: rgba(47, 62, 59, 0.8);
    border-left: 4px solid var(--color-olive-light);
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(47, 62, 59, 0.3);
  }

  .founder__photo {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto var(--space-6) auto;
    position: relative;
    background-color: var(--color-olive-light);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .founder__photo::after {
    content: "";
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      var(--color-olive-light),
      var(--color-olive)
    );
    z-index: -1;
  }

  .founder__photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    border-radius: 50%;
    display: block;
  }

  .founder__placeholder {
    width: 100%;
    height: 100%;
    display: none;
    align-items: center;
    justify-content: center;
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    color: var(--color-white-warm);
    background: linear-gradient(
      135deg,
      var(--color-olive) 0%,
      var(--color-olive-lighter) 100%
    );
    border-radius: 50%;
  }

  .founder__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
    width: 100%;
  }

  .founder__name {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--color-white-warm);
    margin: 0 0 var(--space-2) 0;
    line-height: var(--leading-tight);
  }

  .founder__role {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    font-weight: var(--weight-medium);
    color: var(--color-olive-light);
    margin: 0 0 var(--space-6) 0;
  }

  .founder__bio {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-white-warm);
    line-height: var(--leading-relaxed);
    margin: 0;
    opacity: 0.9;
    text-align: center;
  }

  /* Approach Section */
  .approach {
    padding: var(--space-20) 0;
    background-color: rgba(47, 62, 59, 0.8);
    color: var(--color-white-warm);
  }

  .approach__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  .approach .section__title {
    color: var(--color-olive-light);
  }

  .approach .section__accent-line {
    background-color: var(--color-olive-light);
  }

  .approach__grid {
    display: grid;
    gap: var(--space-10);
    grid-template-columns: 1fr;
  }

  .approach__item-title {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--color-olive-light);
    margin: 0 0 var(--space-4) 0;
  }

  .approach__item-description {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: rgba(254, 253, 251, 0.9);
    line-height: var(--leading-relaxed);
    margin: 0;
  }

  /* Motivation Section */
  .motivation {
    padding: var(--space-20) 0;
    background-color: rgba(47, 62, 59, 0.7);
  }

  .motivation__container {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    text-align: center;
  }

  .motivation__quote {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    font-style: italic;
    color: var(--color-white-warm);
    line-height: var(--leading-relaxed);
    margin: 0 0 var(--space-8) 0;
    padding: var(--space-8);
    background-color: rgba(47, 62, 59, 0.6);
    border-radius: 0.75rem;
    border-left: 6px solid var(--color-olive-light);
    position: relative;
  }

  .motivation__quote::before {
    content: '"';
    font-size: var(--text-6xl);
    color: var(--color-olive-light);
    position: absolute;
    top: -10px;
    left: var(--space-6);
    line-height: 1;
    opacity: 0.7;
  }

  .motivation__vision {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    font-weight: var(--weight-medium);
    color: var(--color-white-warm);
    line-height: var(--leading-relaxed);
    margin: 0;
    opacity: 0.9;
  }

  /* Contact Section */
  .contact {
    padding: var(--space-20) 0;
    background-color: rgba(47, 62, 59, 0.9);
  }

  .contact__container {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    text-align: center;
  }

  .contact__description {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    color: var(--color-white-warm);
    line-height: var(--leading-relaxed);
    margin: 0 0 var(--space-8) 0;
    opacity: 0.9;
  }

  .contact__links {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 0 var(--space-6) 0;
  }

  .contact__note {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-white-warm);
    font-style: italic;
    margin: 0;
    opacity: 0.8;
  }

  /* Responsive Design */
  @media (min-width: 768px) {
    .team__founders {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-10);
    }

    .approach__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .team__founders {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-8);
    }

    .approach__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-16);
    }
  }

  @media (max-width: 767px) {
    .page {
      padding-top: 3.5rem; /* Account for smaller mobile header */
    }

    .hero,
    .origin-story,
    .team,
    .approach,
    .motivation,
    .contact {
      padding: var(--space-16) 0;
    }

    .hero__title {
      font-size: var(--text-4xl);
    }

    .hero__subtitle {
      font-size: var(--text-lg);
    }

    .section__header {
      margin-bottom: var(--space-12);
    }

    .section__title {
      font-size: var(--text-2xl);
    }

    .team__founders {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .founder {
      padding: var(--space-8);
    }

    .founder__photo {
      width: 120px;
      height: 120px;
    }

    .founder__name {
      font-size: var(--text-xl);
    }

    .founder__role {
      font-size: var(--text-base);
    }

    .founder__bio {
      font-size: var(--text-sm);
    }

    .contact__links {
      flex-direction: column;
      align-items: center;
    }

    .motivation__quote {
      font-size: var(--text-lg);
      padding: var(--space-6);
    }

    .motivation__quote::before {
      font-size: var(--text-4xl);
      top: -5px;
    }
  }
</style>
