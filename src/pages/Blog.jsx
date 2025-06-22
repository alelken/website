import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const posts = Object.entries(
  import.meta.glob('../posts/*.md', { as: 'raw', eager: true })
).map(([path, content]) => ({
  slug: path.split('/').pop().replace('.md', ''),
  title: content.trim().split('\n')[0].replace(/^#\s+/, ''),
  content,
}))

const Blog = () => {
  const [active, setActive] = useState(null)
  const post = posts.find(p => p.slug === active)

  return (
    <div>
      <Header />
      <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        {!active && (
          <div className="blog-list">
            <h1>Blog</h1>
            <ul>
              {posts.map(p => (
                <li key={p.slug}>
                  <a href="#" onClick={e => { e.preventDefault(); setActive(p.slug) }}>
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {active && (
          <div className="blog-post">
            <button className="btn" onClick={() => setActive(null)} style={{ marginBottom: '1rem' }}>
              Back to posts
            </button>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Blog
