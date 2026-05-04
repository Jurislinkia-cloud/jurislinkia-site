import { useEffect } from 'react'
import { LOCALE_COOKIE } from '@/lib/i18n'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * days}; SameSite=Lax`
}

export function LocaleDetector() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = getCookie(LOCALE_COOKIE)
    if (stored) return

    const path = window.location.pathname
    const isEn = path === '/en' || path.startsWith('/en/')
    const isFr = !isEn

    const browserLang = (navigator.language || '').toLowerCase()
    const prefersEn = browserLang.startsWith('en')

    if (prefersEn && isFr) {
      setCookie(LOCALE_COOKIE, 'en')
      const dest = path === '/' ? '/en/' : `/en${path}${window.location.hash}`
      window.location.replace(dest)
      return
    }

    setCookie(LOCALE_COOKIE, isEn ? 'en' : 'fr')
  }, [])

  return null
}
