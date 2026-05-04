import { ArrowLeft } from 'lucide-react'
import { Header } from './Header'
import { Footer } from './Footer'
import { t, tx, type Locale } from '@/lib/i18n'

const BLACK = '#0A0A0A'
const WHITE = '#FFFFFF'
const BG_ALT = '#F5F5F5'
const TEXT_BODY = '#1A1A1A'
const TEXT_MUTED = '#6B7280'

const SERIF = "'Playfair Display', 'EB Garamond', Georgia, serif"

interface Props {
  locale: Locale
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function LegalPageLayout({ locale, title, subtitle, children }: Props) {
  const home = locale === 'fr' ? '/' : '/en/'
  return (
    <div className="min-h-screen" style={{ backgroundColor: WHITE, color: TEXT_BODY }}>
      <Header />
      <div style={{ backgroundColor: BG_ALT }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <a
            href={home}
            className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:!text-[#BC1E1E]"
            style={{ color: TEXT_MUTED }}
          >
            <ArrowLeft size={14} /> {tx(t.common.backHome, locale)}
          </a>
          <h1
            className="mb-3"
            style={{
              fontFamily: SERIF,
              color: BLACK,
              fontWeight: 500,
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>
          {subtitle && <p className="text-sm" style={{ color: TEXT_MUTED }}>{subtitle}</p>}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16" style={{ backgroundColor: WHITE }}>
        <div
          className="space-y-8 text-sm leading-relaxed"
          style={{ color: TEXT_BODY }}
        >
          {children}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        className="mb-3"
        style={{
          fontFamily: SERIF,
          color: BLACK,
          fontWeight: 500,
          fontSize: '1.35rem',
          letterSpacing: '-0.005em',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}
