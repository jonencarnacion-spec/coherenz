// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages hosting — MIGRATION.md. Repo: github.com/jonencarnacion-spec/coherenz.
  // Project-site style (repo name != jonencarnacion-spec.github.io), so it serves
  // at /coherenz/. If coherenz.com is wired up via CNAME later, drop `base` entirely.
  site: 'https://jonencarnacion-spec.github.io',
  base: '/coherenz',
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