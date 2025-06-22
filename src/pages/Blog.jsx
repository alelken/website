import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const posts = Object.entries(
  import.meta.glob('../posts/*.md', { as: 'raw', eager: true })
).map(([path, content]) => {
  const lines = content.trim().split('\n')
  const title = lines[0].replace(/^#\s+/, '')
  const excerpt = lines
    .slice(1)
    .filter(l => l.trim())
    .slice(0, 5)
    .join(' ')
  return {
    slug: path.split('/').pop().replace('.md', ''),
    title,
    excerpt,
    content,
  }
})

const Blog = () => {
  const [active, setActive] = useState(null)
  const post = posts.find(p => p.slug === active)

  return (
    <div>
      <Header />
      <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        {!active && (
          <div>
            <h1>Blog</h1>
            <ul className="blog-list">
              {posts.map(p => (
                <li key={p.slug} className="blog-card">
                  <h2>{p.title}</h2>
                  {p.excerpt && <p>{p.excerpt}</p>}
                  <button className="btn" onClick={e => { e.preventDefault(); setActive(p.slug) }}>
                    Read More
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {active && (
          <div className="blog-post">
            <button className="btn back-btn" onClick={() => setActive(null)}>
              <i className="fas fa-arrow-left" aria-hidden="true" />
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
