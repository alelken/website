# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Job Applications with Firestore and MongoDB

Job applications are written directly to Firestore. When a user uploads a resume, the app first reads a MongoDB upload URI from a Firestore `config` document. The file is then posted to that URI and the returned link is saved alongside the application record in Firestore.

Copy `.env.example` to `.env` and fill in your Firebase project credentials. Firestore should contain a document at `config/mongodb` with a field `uri` pointing to the upload location.
