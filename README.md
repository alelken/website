# Alelken / Alayn Website

This repository hosts the marketing site for **Alayn**, an AI-driven wellness application. The project is built with React and Vite and deployed to Firebase Hosting. Static pages are generated using `scripts/prerender.mjs`, a simple Node script that renders each route with `react-dom/server` after the Vite build.

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and add your Firebase credentials.
3. Start a development server
   ```bash
   npm run dev
   ```
4. Build for production (static pages will be generated automatically)
   ```bash
   npm run build
   ```

Firebase Hosting serves the contents of the `dist` directory once built.
The server build output in `dist-ssr` is only used during static generation and
is not deployed. Icons, including the favicon, live under `public/assets/images`.
