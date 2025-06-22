import { useEffect, useState } from 'react'

const useDarkMode = () => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('theme') === 'dark'
    }
    return false
  })

  useEffect(() => {
    document.body.classList.toggle('dark', enabled)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', enabled ? 'dark' : 'light')
    }
  }, [enabled])

  return [enabled, setEnabled]
}

export default useDarkMode
