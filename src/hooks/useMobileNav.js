import { useEffect } from 'react'

const useMobileNav = () => {
  useEffect(() => {
    const hamburger = document.querySelector('.hamburger')
    const mobileNav = document.querySelector('.mobile-nav')
    const closeNav = document.querySelector('.close-nav')
    const body = document.body
    const toggleMobileNav = () => {
      hamburger.classList.toggle('active')
      mobileNav.classList.toggle('active')
      body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : ''
    }
    hamburger.addEventListener('click', toggleMobileNav)
    closeNav.addEventListener('click', toggleMobileNav)
    document.querySelectorAll('.mobile-nav-links a').forEach(link => link.addEventListener('click', toggleMobileNav))
    return () => {
      hamburger.removeEventListener('click', toggleMobileNav)
      closeNav.removeEventListener('click', toggleMobileNav)
      document.querySelectorAll('.mobile-nav-links a').forEach(link => link.removeEventListener('click', toggleMobileNav))
    }
  }, [])
}

export default useMobileNav
