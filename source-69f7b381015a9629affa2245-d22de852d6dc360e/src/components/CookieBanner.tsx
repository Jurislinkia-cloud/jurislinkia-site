import { useEffect, useState } from 'react'
import { t, tx, localizedPath } from '@/lib/i18n'
import { useLocale } from '@/lib/useLocale'

const ACCENT = '#BC1E1E'
const BLACK = '#0A0A0A'
const WHITE = '#FFFFFF'
const TEXT_BODY = '#1A1A1A'

const CONSENT_COOKIE = 'jurislinkia_cookie_consent'

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * days}; SameSite=Lax`
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function CookieBanner() {
  const locale = useLocale()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!getCookie(CONSENT_COOKIE)) setShow(true)
  }, [])

  if (!show) return null

  const handleAccept = () => {
    setCookie(CONSENT_COOKIE, 'all')
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      })
    }
    setShow(false)
  }
  const handleReject = () => {
    setCookie(CONSENT_COOKIE, 'essential')
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
      })
    }
    setShow(false)
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div
        className="max-w-4xl mx-auto p-6"
        style={{
          backgroundColor: WHITE,
          borderRadius: '4px',
          boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.12)',
          border: '1px solid #E5E7EB',
        }}
      >
        <p className="text-sm leading-relaxed mb-4" style={{ color: TEXT_BODY }}>
          {tx(t.cookieBanner.text, locale)}{' '}
          <a
            href={localizedPath('cookies', locale)}
            className="underline hover:opacity-80"
            style={{ color: ACCENT, fontWeight: 500 }}
          >
            {tx(t.cookieBanner.policyLink, locale)}
          </a>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button onClick={handleAccept} className="btn-primary text-sm">
            {tx(t.cookieBanner.accept, locale)}
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-2.5 text-sm font-medium transition-colors"
            style={{ color: BLACK, border: `1px solid ${BLACK}`, backgroundColor: 'transparent', borderRadius: '2px' }}
          >
            {tx(t.cookieBanner.reject, locale)}
          </button>
        </div>
      </div>
    </div>
  )
}
