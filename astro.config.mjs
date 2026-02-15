import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import pagefind from 'astro-pagefind';

export default defineConfig({
    site: 'https://thiagoclm.github.io/myreferencesite',
    integrations: [mdx(), pagefind()],
});