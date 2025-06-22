# Alelken / Alayn Website

This repository hosts the marketing site for **Alayn**, an AI-driven wellness application. The project is built with React and Vite and deployed to Firebase Hosting. A prerender plugin is included to generate static pages during the build step so search engines can index the content easily.

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
4. Build for production (static pages are generated automatically)
   ```bash
   npm run build
   ```

Firebase Hosting serves the contents of the `dist` directory once built.
