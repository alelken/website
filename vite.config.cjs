const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')
const vitePrerender = require('vite-plugin-prerender')
const path = require('path')

module.exports = defineConfig({
  plugins: [
    react(),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/product', '/about', '/careers', '/blog']
    })
  ]
})
