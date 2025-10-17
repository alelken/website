<script>
  import { currentPage, navigateTo } from "./lib/stores/router.js";
  import Header from "./components/layout/Header.svelte";
  import Footer from "./components/layout/Footer.svelte";
  import Router from "./components/Router.svelte";

  // Handle navigation events from Header component
  function handleNavigate(event) {
    navigateTo(event.detail.page);
  }
</script>

<div class="app">
  <Header currentPage={$currentPage} on:navigate={handleNavigate} />

  <Router />

  <Footer />
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--color-night);
    color: var(--color-text-on-dark);
  }
</style>
