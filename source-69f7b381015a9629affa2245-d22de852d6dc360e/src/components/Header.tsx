import { useState } from 'react'
import { Menu, X, Search, Phone } from 'lucide-react'
import { useLocale } from '@/lib/useLocale'
import { localizedPath, t, tx, LOCALE_COOKIE, type Locale } from '@/lib/i18n'

const ACCENT = '#BC1E1E'
const BLACK = '#0A0A0A'
const WHITE = '#FFFFFF'
const TEXT_ON_DARK = '#FFFFFF'
const MUTED_ON_DARK = '#9CA3AF'
const NAV_BORDER = '#E5E7EB'

function setLocaleCookie(locale: Locale) {
  if (typeof document === 'undefined') return
  const maxAge = 60 * 60 * 24 * 365
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${maxAge}; SameSite=Lax`
}

export function Header() {
  const locale = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)

  const home = locale === 'fr' ? '/' : '/en/'
  const portal = localizedPath('lawyersPortal', locale)
  const altHome = locale === 'fr' ? '/en/' : '/'

  return (
    <header className="sticky top-0 z-40">
      {/* Top black bar — utility row */}
      <div style={{ backgroundColor: BLACK, color: TEXT_ON_DARK }}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-9 flex items-center justify-between text-xs">
          <a
            href="tel:+15149000645"
            className="hidden sm:inline-flex items-center gap-1.5 phone-link"
            style={{ color: TEXT_ON_DARK, fontWeight: 400 }}
          >
            <Phone size={11} />
            <span>{tx(t.header.phone, locale)}</span>
          </a>
          <span className="sm:hidden" />

          <div className="flex items-center gap-5">
            <LanguageSwitcher locale={locale} altHome={altHome} />
            <span style={{ width: '1px', height: '12px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
            <button
              type="button"
              aria-label={tx(t.header.search, locale)}
              className="inline-flex items-center transition-opacity hover:opacity-70"
              style={{ color: TEXT_ON_DARK }}
            >
              <Search size={14} />
            </button>
            <a
              href={`mailto:info@jurislinkia.com`}
              className="hidden sm:inline-flex transition-opacity hover:opacity-70"
              style={{ color: TEXT_ON_DARK, fontWeight: 400 }}
            >
              {tx(t.header.contact, locale)}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom white bar — primary nav */}
      <div style={{ backgroundColor: WHITE, borderBottom: `1px solid ${NAV_BORDER}` }}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <a
            href={home}
            className="text-2xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 500,
              letterSpacing: '-0.01em',
              color: BLACK,
            }}
          >
            <span style={{ color: BLACK }}>Juris</span>
            <span style={{ color: ACCENT }}>Linkia</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href={`${home}#assistant`}
              className="text-sm nav-link"
              style={{ color: BLACK, fontWeight: 500 }}
            >
              {tx(t.nav.assistant, locale)}
            </a>
            <a
              href={`${home}#domaines`}
              className="text-sm nav-link"
              style={{ color: BLACK, fontWeight: 500 }}
            >
              {tx(t.nav.practiceAreas, locale)}
            </a>
            <a
              href={`${home}#fonctionnement`}
              className="text-sm nav-link"
              style={{ color: BLACK, fontWeight: 500 }}
            >
              {tx(t.nav.howItWorks, locale)}
            </a>
            <a
              href={portal}
              className="text-sm nav-link"
              style={{ color: BLACK, fontWeight: 500 }}
            >
              {tx(t.nav.lawyersPortal, locale)}
            </a>
          </nav>

          <button
            className="md:hidden p-2"
            style={{ color: BLACK }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden" style={{ backgroundColor: WHITE, borderBottom: `1px solid ${NAV_BORDER}` }}>
          <div className="px-4 py-4 space-y-3">
            <a
              href={`${home}#assistant`}
              onClick={() => setMobileOpen(false)}
              className="block text-sm py-1.5"
              style={{ color: BLACK, fontWeight: 500 }}
            >
              {tx(t.nav.assistant, locale)}
            </a>
            <a
              href={`${home}#domaines`}
              onClick={() => setMobileOpen(false)}
              className="block text-sm py-1.5"
              style={{ color: BLACK, fontWeight: 500 }}
            >
              {tx(t.nav.practiceAreas, locale)}
            </a>
            <a
              href={`${home}#fonctionnement`}
              onClick={() => setMobileOpen(false)}
              className="block text-sm py-1.5"
              style={{ color: BLACK, fontWeight: 500 }}
            >
              {tx(t.nav.howItWorks, locale)}
            </a>
            <a
              href={portal}
              onClick={() => setMobileOpen(false)}
              className="block text-sm py-1.5"
              style={{ color: BLACK, fontWeight: 500 }}
            >
              {tx(t.nav.lawyersPortal, locale)}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function LanguageSwitcher({ locale, altHome }: { locale: Locale; altHome: string }) {
  const activeStyle = { color: TEXT_ON_DARK, fontWeight: 500 }
  const inactiveStyle = { color: MUTED_ON_DARK, fontWeight: 400 }

  return (
    <div className="inline-flex items-center gap-2 text-xs">
      {locale === 'fr' ? (
        <>
          <span style={activeStyle}>FR</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
          <a
            href={altHome}
            onClick={() => setLocaleCookie('en')}
            style={inactiveStyle}
            className="transition-colors hover:!text-white"
          >
            EN
          </a>
        </>
      ) : (
        <>
          <a
            href={altHome}
            onClick={() => setLocaleCookie('fr')}
            style={inactiveStyle}
            className="transition-colors hover:!text-white"
          >
            FR
          </a>
          <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
          <span style={activeStyle}>EN</span>
        </>
      )}
    </div>
  )
}
