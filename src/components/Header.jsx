import React from 'react'
import useMobileNav from '../hooks/useMobileNav'
import useDarkMode from '../hooks/useDarkMode'

const Header = () => {
  useMobileNav()
  const [dark, setDark] = useDarkMode()
  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <img src="/assets/images/logo.svg" alt="Alelken" className="nav-logo" />
          </div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/product">Product</a>
            <a href="/careers">Careers</a>
            <a href="/blog">Blog</a>
            <a href="/about">About Us</a>
            <button className="theme-toggle desktop-only" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
              {dark ? <i className="fas fa-sun" /> : <i className="fas fa-moon" />}
            </button>
          </div>
          <div className="hamburger">
            <span />
            <span />
            <span />
          </div>
        </nav>
      </header>
      <div className="mobile-nav">
        <div className="close-nav">
          <span />
          <span />
        </div>
        <div className="mobile-nav-links">
          <a href="/">Home</a>
          <a href="/product">Product</a>
          <a href="/careers">Careers</a>
          <a href="/blog">Blog</a>
          <a href="/about">About Us</a>
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle dark mode" style={{alignSelf:'flex-start'}}>
            {dark ? <i className="fas fa-sun" /> : <i className="fas fa-moon" />}
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
