// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Hostinger hosting, deployed via .github/workflows/deploy.yml (FTP push to
  // public_html on every push to main) — supersedes the original GitHub Pages
  // plan in MIGRATION.md. Custom domain at the web root, so no `base` subpath
  // is needed (unlike the old /coherenz/ project-pages path).
  site: 'https://coherenz.ph',
  output: 'static',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    // Mirrors tsconfig.json's "@/*" path — shadcn/21st.dev components assume
    // this alias, so wiring it up once here avoids patching imports per pull.
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
});