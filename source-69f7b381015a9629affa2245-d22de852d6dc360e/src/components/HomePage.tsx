import { ChatBot } from '@/components/ChatBot'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import {
  t,
  tx,
  DOMAINES_BILINGUAL,
  type Locale,
} from '@/lib/i18n'
import { ArrowRight } from 'lucide-react'

const ACCENT = '#BC1E1E'
const BLACK = '#0A0A0A'
const WHITE = '#FFFFFF'
const BG_ALT = '#F5F5F5'
const TEXT_BODY = '#1A1A1A'
const TEXT_MUTED = '#6B7280'
const BORDER = '#E5E7EB'
const GOLD = '#C9A961'

const SERIF = "'Playfair Display', 'EB Garamond', Georgia, serif"

const LEGAL_SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'JurisLinkia',
  alternateName: 'JurisLinkia Inc.',
  description:
    "Plateforme de référencement d'avocats membres du Barreau du Québec et du Barreau de l'Ontario, spécialisés en droit des affaires.",
  url: 'https://jurislinkia.com',
  logo: 'https://jurislinkia.com/logo.png',
  email: 'info@jurislinkia.com',
  telephone: '+1-514-900-0645',
  priceRange: 'Gratuit / Free',
  knowsLanguage: ['fr-CA', 'en-CA'],
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Quebec' },
    { '@type': 'AdministrativeArea', name: 'Ontario' },
  ],
  serviceType: [
    "Référencement d'avocats",
    'Lawyer Referral Service',
    'Mise en relation juridique',
    'Legal Connection Platform',
  ],
  memberOf: [
    { '@type': 'Organization', name: 'Barreau du Québec', url: 'https://www.barreau.qc.ca' },
    { '@type': 'Organization', name: 'Law Society of Ontario', url: 'https://lso.ca' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Montréal',
    addressRegion: 'QC',
    addressCountry: 'CA',
  },
}

export function HomePage({ locale }: { locale: Locale }) {
  const portalPath = locale === 'fr' ? '/portail-avocats' : '/en/lawyers-portal'

  return (
    <div className="min-h-screen" style={{ backgroundColor: WHITE, color: TEXT_BODY }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LEGAL_SERVICE_JSONLD) }}
      />
      <Header />

      {/* HERO — editorial with embedded chatbot */}
      <section id="assistant" style={{ backgroundColor: WHITE }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-12 md:py-20 grid md:grid-cols-12 gap-10 md:gap-12 items-start">
          {/* Left column — editorial copy + B&W skyline */}
          <div className="md:col-span-6 lg:col-span-6 order-2 md:order-1">
            <p
              className="mb-6"
              style={{
                color: ACCENT,
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {tx(t.hero.eyebrow, locale)}
            </p>
            <h1
              className="mb-7"
              style={{
                fontFamily: SERIF,
                fontWeight: 500,
                color: BLACK,
                fontSize: 'clamp(2.25rem, 4.6vw, 4rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.015em',
              }}
            >
              {tx(t.hero.titleLine1, locale)}{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 500, color: BLACK }}>
                {tx(t.hero.titleLine2Highlight, locale)}
              </em>
              {tx(t.hero.titleLine3, locale)}
            </h1>
            <div
              className="mb-8 max-w-xl"
              style={{
                color: TEXT_BODY,
                fontSize: '1.125rem',
                lineHeight: 1.6,
                fontWeight: 400,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <p>{tx(t.hero.subtitleLine1, locale)}</p>
              <p>{tx(t.hero.subtitleLine2, locale)}</p>
              <p>{tx(t.hero.subtitleLine3, locale)}</p>
            </div>
            <div
              className="hidden md:block w-full overflow-hidden"
              style={{ borderRadius: '8px', height: '300px' }}
            >
              <img
                src="/hero-skyline.jpeg"
                alt={tx(t.hero.imageAlt, locale)}
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(100%) contrast(1.1)' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right column — chatbot, visible immediately */}
          <div className="md:col-span-6 lg:col-span-6 order-1 md:order-2">
            <ChatBot locale={locale} compact />
          </div>
        </div>
      </section>

      {/* 3 PROMISES — editorial columns separated by vertical lines */}
      <section style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-20 md:py-24">
          <div className="grid md:grid-cols-3">
            {t.reassurance.map((r, i) => (
              <div
                key={i}
                className="px-6 md:px-10 py-6 md:py-2"
                style={{
                  borderLeft: i === 0 ? 'none' : `1px solid ${BORDER}`,
                }}
              >
                <p
                  className="mb-4"
                  style={{
                    fontFamily: SERIF,
                    color: GOLD,
                    fontSize: '1.5rem',
                    fontStyle: 'italic',
                    fontWeight: 400,
                  }}
                >
                  {`0${i + 1}`}
                </p>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1.375rem',
                    fontWeight: 600,
                    color: BLACK,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {tx(r.title, locale)}
                </h3>
                <p
                  style={{
                    color: '#4B5563',
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    fontWeight: 400,
                  }}
                >
                  {tx(r.text, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOMAINES DE PRATIQUE — editorial list */}
      <section id="domaines" style={{ backgroundColor: BG_ALT }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-20 md:py-28">
          <div className="mb-12">
            <p className="eyebrow mb-4" style={{ color: BLACK }}>
              {tx(t.practiceAreasSection.eyebrow, locale)}
            </p>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 500,
                color: BLACK,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              {tx(t.practiceAreasSection.title, locale)}
            </h2>
          </div>
          <div
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-2"
            style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '2rem' }}
          >
            {DOMAINES_BILINGUAL.map((d) => (
              <a
                key={d.fr}
                href="#assistant"
                className="editorial-link"
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  paddingTop: '0.85rem',
                  paddingBottom: '0.85rem',
                  borderBottom: `1px solid ${BORDER}`,
                }}
              >
                {tx(d, locale)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS — editorial articles */}
      <section style={{ backgroundColor: WHITE }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-20 md:py-28">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="eyebrow mb-4" style={{ color: BLACK }}>
                {tx(t.insights.eyebrow, locale)}
              </p>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontWeight: 500,
                  color: BLACK,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                }}
              >
                {tx(t.insights.title, locale)}
              </h2>
            </div>
          </div>
          <div
            className="grid md:grid-cols-3 gap-10"
            style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '2.5rem' }}
          >
            {t.insights.articles.map((a, i) => {
              const slugFr = [
                '/publications/regles-fiscales-quebec-2026',
                '/publications/tendances-ma-canadien-2026',
                '/publications/incorporation-federal-vs-provincial',
              ][i]
              const slugEn = [
                '/en/publications/quebec-tax-rules-2026',
                '/en/publications/canadian-ma-trends-2026',
                '/en/publications/federal-vs-provincial-incorporation',
              ][i]
              const href = locale === 'fr' ? slugFr : slugEn
              return (
                <article key={i} className="flex flex-col">
                  <p
                    className="mb-4"
                    style={{
                      color: ACCENT,
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                    }}
                  >
                    {tx(a.category, locale)}
                  </p>
                  <h3
                    className="mb-4"
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 500,
                      color: BLACK,
                      fontSize: '1.5rem',
                      lineHeight: 1.25,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    <a href={href} style={{ color: BLACK }} className="hover:!text-[#BC1E1E] transition-colors">
                      {tx(a.title, locale)}
                    </a>
                  </h3>
                  <p
                    className="mb-6"
                    style={{ color: TEXT_MUTED, fontSize: '0.85rem' }}
                  >
                    {tx(a.date, locale)}
                  </p>
                  <a
                    href={href}
                    className="btn-link"
                    style={{ padding: 0, alignSelf: 'flex-start', fontSize: '0.85rem' }}
                  >
                    {tx(t.insights.readMore, locale)} <ArrowRight size={13} />
                  </a>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* MANIFESTO — single editorial paragraph */}
      <section id="fonctionnement" style={{ backgroundColor: BG_ALT }}>
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-20 md:py-28 text-center">
          <h2
            className="mb-8"
            style={{
              fontFamily: SERIF,
              fontWeight: 500,
              color: BLACK,
              fontSize: 'clamp(1.9rem, 4vw, 2.75rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            {tx(t.manifesto.title, locale)}
          </h2>
          <p
            style={{
              color: TEXT_BODY,
              fontSize: '1.125rem',
              lineHeight: 1.75,
              fontWeight: 400,
            }}
          >
            {tx(t.manifesto.body, locale)}
          </p>
        </div>
      </section>

<section id="assistant" style={{ backgroundColor: WHITE }}>
  <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-6 md:py-20 grid md:grid-cols-12 gap-6 md:gap-12 items-start">

    {/* TEXTE */}
    <div className="md:col-span-6 order-1">
      <p
        className="mb-3"
        style={{
          color: ACCENT,
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {tx(t.hero.eyebrow, locale)}
      </p>

      <h1
        className="mb-3"
        style={{
          fontFamily: SERIF,
          fontWeight: 500,
          color: BLACK,
          fontSize: 'clamp(22px, 4.5vw, 42px)',
          lineHeight: 1.1,
        }}
      >
        {tx(t.hero.titleLine1, locale)}{' '}
        <em style={{ fontStyle: 'italic' }}>
          {tx(t.hero.titleLine2Highlight, locale)}
        </em>
        {tx(t.hero.titleLine3, locale)}
      </h1>

      <p
        style={{
          color: TEXT_BODY,
          fontSize: '14px',
          lineHeight: 1.5,
        }}
      >
        {tx(t.hero.subtitleLine1, locale)}
      </p>
    </div>

    {/* CHAT */}
    <div className="md:col-span-6 order-2">
      <ChatBot locale={locale} compact />
    </div>

  </div>
</section>

      <Footer />
    </div>
  )
}
