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
