import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const template = await fs.readFile(path.resolve(__dirname, '../dist/index.html'), 'utf-8')

// Ensure global Request exists (Node 18+ has it; older may not)
if (typeof globalThis.Request === 'undefined') {
  try {
    const undici = await import('undici')
    if (undici?.Request) {
      globalThis.Request = undici.Request
    }
  } catch (e) {
    console.warn('Unable to polyfill Request; prerender may fail on older Node:', e?.message)
  }
}

// Load SSR bundle after polyfill
const { render } = await import('../dist-ssr/entry-server.js')

// Base routes to prerender
const routes = new Set(['/', '/product', '/about', '/careers', '/blog'])

// Discover blog slugs from source (so SSG includes every post)
try {
  const postsDir = path.resolve(__dirname, '../src/posts')
  const files = await fs.readdir(postsDir)
  files
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
    .forEach(slug => routes.add(`/blog/${slug}`))
} catch (e) {
  console.warn('No posts directory found or unable to read posts:', e?.message)
}

let hadErrors = false
for (const url of routes) {
  try {
    const initialData = {}
    if (url === '/careers') {
      try {
        const data = JSON.parse(await fs.readFile(path.resolve(__dirname, '../public/data/jobs.json'), 'utf-8'))
        initialData.jobs = data.jobs
      } catch (e) {
        console.warn('[prerender] Unable to load careers data:', e?.message)
      }
    }
    const appHtml = await render(url, initialData)
    let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

    // Route-specific SEO metadata
    const siteName = 'Alelken'
    const origin = 'https://www.alelken.com'
    const metaByRoute = {
      '/': {
        title: 'Alelken',
        description: 'Innovative Technology. Human-Centered Solutions.',
        image: '/assets/images/og-image.png',
      },
      '/product': {
        title: 'Product – Alelken',
        description: 'Explore Alelken’s human-centered technology solutions.',
        image: '/assets/images/og-image.png',
      },
      '/about': {
        title: 'About – Alelken',
        description: 'Learn about Alelken’s mission and team.',
        image: '/assets/images/og-image.png',
      },
      '/careers': {
        title: 'Careers – Alelken',
        description: 'Join Alelken and help build thoughtful technology.',
        image: '/assets/images/og-image.png',
      },
      '/blog': {
        title: 'Blog – Alelken',
        description: 'Insights and updates from the Alelken team.',
        image: '/assets/images/og-image.png',
      },
    }

    const meta = metaByRoute[url] || metaByRoute['/']
    const absoluteUrl = origin + (url === '/' ? '/' : url + '/')

    const replaceTag = (h, selector, attr, value) => {
      // selector: e.g., { type: 'meta', key: 'property', id: 'og:title' } or { type: 'meta', key: 'name', id: 'twitter:title' }
      if (selector.type === 'title') {
        return h.replace(/<title>[^<]*<\/title>/i, `<title>${value}<\/title>`)
      }
      const re = new RegExp(`<meta\\s+${selector.key}=["']${selector.id}["'][^>]*>`, 'i')
      if (re.test(h)) {
        return h.replace(re, (m) => m.replace(/content=["'][^"']*["']/, `content=\"${value}\"`))
      }
      return h
    }

    // Apply replacements
    html = replaceTag(html, { type: 'title' }, null, meta.title)
    html = replaceTag(html, { type: 'meta', key: 'property', id: 'og:title' }, 'content', meta.title)
    html = replaceTag(html, { type: 'meta', key: 'name', id: 'twitter:title' }, 'content', meta.title)
    html = replaceTag(html, { type: 'meta', key: 'property', id: 'og:site_name' }, 'content', siteName)
    html = replaceTag(html, { type: 'meta', key: 'property', id: 'og:description' }, 'content', meta.description)
    html = replaceTag(html, { type: 'meta', key: 'name', id: 'twitter:description' }, 'content', meta.description)
    html = replaceTag(html, { type: 'meta', key: 'property', id: 'og:image' }, 'content', meta.image)
    html = replaceTag(html, { type: 'meta', key: 'name', id: 'twitter:image' }, 'content', meta.image)
    // Ensure og:url exists if present in template; otherwise we skip insertion for simplicity
    const ogUrlRe = /<meta\s+property=["']og:url["'][^>]*>/i
    if (ogUrlRe.test(html)) {
      html = html.replace(ogUrlRe, (m) => m.replace(/content=["'][^"']*["']/, `content=\"${absoluteUrl}\"`))
    }
    if (Object.keys(initialData).length) {
      html = html.replace('</body>', `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};<\/script></body>`)
    }
    const filePath = path.resolve(__dirname, `../dist${url === '/' ? '/index.html' : url + '/index.html'}`)
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, html)
    console.log(`[prerender] Wrote ${filePath}`)
  } catch (e) {
    hadErrors = true
    console.error(`[prerender] Failed ${url}:`, e?.stack || e)
  }
}

if (hadErrors) {
  process.exitCode = 1
}
