import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
    .slice(0, 4)
    .join(' ')
  return {
    slug: path.split('/').pop().replace('.md', ''),
    title,
    excerpt,
    content,
  }
})

const Blog = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [active, setActive] = useState(slug || null)
  const [isMobile, setIsMobile] = useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const post = posts.find(p => p.slug === active)

  return (
    <div>
      <Header />
      <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <h1>Blog</h1>
        {active && (
          // sync url for direct access via share
          slug !== active && navigate(`/blog/${active}`, { replace: true }),
          <div className="blog-post" style={{marginBottom: '2rem'}}>
            <button className="btn back-btn" onClick={() => {
              setActive(null)
              navigate('/blog')
            }}>
              <i className="fas fa-arrow-left" aria-hidden="true" />
              Back
            </button>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        )}
        <ul className="blog-list">
          {posts
            .filter(p =>
              !active || (!isMobile && p.slug !== active)
            )
            .map(p => (
              <li key={p.slug} className="blog-card">
                <h2>{p.title}</h2>
                {p.excerpt && <p>{p.excerpt}</p>}
                <button
                  className="btn blog-readmore-btn"
                  onClick={e => {
                    e.preventDefault();
                    setActive(p.slug);
                    navigate(`/blog/${p.slug}`)
                    window.scrollTo(0, 0);
                  }}
                >
                  Read More
                </button>
              </li>
            ))}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default Blog
