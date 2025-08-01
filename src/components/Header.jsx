import React from 'react'
import useMobileNav from '../hooks/useMobileNav'

const Header = () => {
  useMobileNav()
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
            {/*<a href="/blog">Blog</a>*/}
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
        </div>
      </div>
    </>
  )
}

export default Header
