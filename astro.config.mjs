// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fyratassar.nu',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Gamla adressen /produkter/ leder till webbshopen
  redirects: { '/produkter': '/webbshop/' },
  integrations: [sitemap({ filter: (url) => !url.includes('/404') && !url.includes('/produkter/') })],
});
