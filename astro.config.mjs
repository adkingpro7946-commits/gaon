import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';

// 가이드별 최종 수정일(updatedAt) → sitemap lastmod
const GUIDE_DIR = path.resolve('./src/content/guides');
const lastmod = {};
for (const f of fs.readdirSync(GUIDE_DIR)) {
  if (!f.endsWith('.md')) continue;
  const src = fs.readFileSync(path.join(GUIDE_DIR, f), 'utf-8');
  const m = src.match(/^updatedAt:\s*"?(\d{4}-\d{2}-\d{2})/m) || src.match(/^lastVerifiedAt:\s*"?(\d{4}-\d{2}-\d{2})/m);
  if (m) lastmod[f.replace(/\.md$/, '')] = m[1];
}

// https://astro.build/config
export default defineConfig({
  site: 'https://gaonlaw.co.kr',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/search/'),
      serialize(item) {
        const m = item.url.match(/\/guides\/([^/]+)\/$/);
        if (m && lastmod[m[1]]) item.lastmod = new Date(lastmod[m[1]]).toISOString();
        return item;
      },
    }),
  ],
  build: {
    format: 'directory',
  },
});
