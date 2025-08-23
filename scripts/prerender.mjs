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
const routes = new Set(['/', '/product', '/about', '/careers'])

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
    // Use env override if provided; default to primary domain
    const origin = process.env.PRERENDER_ORIGIN || 'https://www.alelken.in'
    const metaByRoute = {
      '/': {
        title: 'Alelken',
        description: 'Innovative Technology. Human-Centered Solutions.',
        image: '/assets/images/mental_wellness.jpg',
      },
      '/product': {
        title: 'Product – Alelken',
        description: 'Explore Alelken’s human-centered technology solutions.',
        image: '/assets/images/mental_wellness.jpg',
      },
      '/about': {
        title: 'About – Alelken',
        description: 'Learn about Alelken’s mission and team.',
        image: '/assets/images/mental_wellness.jpg',
      },
      '/careers': {
        title: 'Careers – Alelken',
        description: 'Join Alelken and help build thoughtful technology.',
        image: '/assets/images/mental_wellness.jpg',
      },
    }

    const meta = metaByRoute[url] || metaByRoute['/']
    const absoluteUrl = origin + (url === '/' ? '/' : url + '/')
    const absoluteImage = meta.image?.startsWith('http') ? meta.image : origin + meta.image

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
    html = replaceTag(html, { type: 'meta', key: 'property', id: 'og:site_name' }, 'content', siteName)
    html = replaceTag(html, { type: 'meta', key: 'property', id: 'og:description' }, 'content', meta.description)
    // Open Graph
    html = replaceTag(html, { type: 'meta', key: 'property', id: 'og:image' }, 'content', absoluteImage)
    // Ensure og:url exists if present in template; otherwise we skip insertion for simplicity
    const ogUrlRe = /<meta\s+property=["']og:url["'][^>]*>/i
    if (ogUrlRe.test(html)) {
      html = html.replace(ogUrlRe, (m) => m.replace(/content=["'][^"']*["']/, `content=\"${absoluteUrl}\"`))
    }
    // Set <link rel="canonical">
    const canonicalRe = /<link\s+rel=["']canonical["'][^>]*>/i
    const canonicalTag = `<link rel="canonical" href="${absoluteUrl}">`
    if (canonicalRe.test(html)) {
      html = html.replace(canonicalRe, canonicalTag)
    } else {
      html = html.replace('</head>', `${canonicalTag}</head>`)
    }
    // Twitter Card (static so Twitter can read without JS)
    html = replaceTag(html, { type: 'meta', key: 'name', id: 'twitter:card' }, 'content', 'summary_large_image')
    html = replaceTag(html, { type: 'meta', key: 'name', id: 'twitter:title' }, 'content', meta.title)
    html = replaceTag(html, { type: 'meta', key: 'name', id: 'twitter:description' }, 'content', meta.description)
    html = replaceTag(html, { type: 'meta', key: 'name', id: 'twitter:image' }, 'content', absoluteImage)

    if (Object.keys(initialData).length) {
      html = html.replace('</body>', `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};<\/script></body>`)
    }

    // Preload critical hero images per route for better LCP
    const imagePreloads = {
      '/': ['/assets/images/connected_world.svg'],
      '/product': ['/assets/images/life_guide.svg'],
      '/about': [],
      '/careers': ['/assets/images/mental_wellness.jpg'],
    }
    const links = (imagePreloads[url] || [])
      .map(src => `<link rel="preload" as="image" href="${src}" imagesrcset="${src}" fetchpriority="high">`)
      .join('')
    if (links) {
      html = html.replace('</head>', `${links}</head>`)
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
