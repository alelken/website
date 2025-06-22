# Alelken / Alayn Website

This repository hosts the marketing site for **Alayn**, an AI-driven wellness application. The project is built with React and Vite and deployed to Firebase Hosting. Static pages are generated using **react-snap**, which crawls each route after the Vite build to produce pre-rendered HTML for search engines.

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
4. Build for production (pre-rendered pages will be generated automatically)
   ```bash
   npm run build
   ```

Firebase Hosting serves the contents of the `dist` directory once built.
