import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pnp.github.io',
  base: '/List-Formatting',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (url) => !url.includes('/gettingstarted/') })],
  server: { host: '127.0.0.1' },
});
