import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { render } from '../dist-ssr/entry-server.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const template = await fs.readFile(path.resolve(__dirname, '../dist/index.html'), 'utf-8')

const routes = ['/', '/product', '/about', '/careers', '/blog']

for (const url of routes) {
  let initialData = {}
  if (url === '/careers') {
    const data = JSON.parse(await fs.readFile(path.resolve(__dirname, '../public/data/jobs.json'), 'utf-8'))
    initialData.jobs = data.jobs
  }
  const appHtml = render(url, initialData)
  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  if (Object.keys(initialData).length) {
    html = html.replace('</body>', `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};<\/script></body>`)
  }
  const filePath = path.resolve(__dirname, `../dist${url === '/' ? '/index.html' : url + '/index.html'}`)
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, html)
}
