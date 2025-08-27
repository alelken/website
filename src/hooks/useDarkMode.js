import { useEffect, useMemo, useState } from 'react'

const ENABLE_TOGGLE = (import.meta.env.VITE_ENABLE_THEME_TOGGLE ?? 'false') === 'true'
const DEFAULT_THEME = (import.meta.env.VITE_DEFAULT_THEME ?? 'light')

const useDarkMode = () => {
  // Initial state: use stored value if toggle is enabled; otherwise force env default
  const [enabled, setEnabled] = useState(() => {
    if (!ENABLE_TOGGLE) {
      return DEFAULT_THEME === 'dark'
    }
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored === 'dark' || stored === 'light') return stored === 'dark'
    }
    return DEFAULT_THEME === 'dark'
  })

  // Effective theme respects env when toggle is disabled
  const effectiveEnabled = useMemo(() => {
    return ENABLE_TOGGLE ? enabled : DEFAULT_THEME === 'dark'
  }, [enabled])

  useEffect(() => {
    const isDark = effectiveEnabled
    document.body.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('dark', isDark)

    // Only persist when user toggle is enabled
    if (ENABLE_TOGGLE && typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }
  }, [effectiveEnabled])

  // Expose a no-op setter if toggle is disabled
  const setter = ENABLE_TOGGLE ? setEnabled : () => {}

  return [effectiveEnabled, setter]
}

export default useDarkMode
