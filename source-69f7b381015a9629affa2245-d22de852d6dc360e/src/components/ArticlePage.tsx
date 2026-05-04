import { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight } from 'lucide-react'
import type { Locale } from '@/lib/i18n'

const ACCENT = '#BC1E1E'
const BLACK = '#0A0A0A'
const WHITE = '#FFFFFF'
const TEXT_BODY = '#1A1A1A'
const TEXT_MUTED = '#6B7280'
const BORDER = '#E5E7EB'
const SERIF = "'Playfair Display', 'EB Garamond', Georgia, serif"

const SITE_URL = 'https://jurislinkia.com'

export interface ArticlePageProps {
  locale: Locale
  category: string
  title: string
  date: string
  datePublished: string
  description: string
  frPath: string
  enPath: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
  disclaimer: string
  children: ReactNode
}

export function ArticlePage(props: ArticlePageProps) {
  const homeAssistant = props.locale === 'fr' ? '/#assistant' : '/en/#assistant'

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    description: props.description,
    datePublished: props.datePublished,
    inLanguage: props.locale === 'fr' ? 'fr-CA' : 'en-CA',
    author: {
      '@type': 'Organization',
      name: 'JurisLinkia',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'JurisLinkia',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': SITE_URL + (props.locale === 'fr' ? props.frPath : props.enPath),
    },
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: WHITE, color: TEXT_BODY }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header />

      {/* Article header */}
      <section style={{ backgroundColor: WHITE }}>
        <div className="max-w-[760px] mx-auto px-6 md:px-8 pt-16 md:pt-20 pb-10">
          <p
            className="mb-6"
            style={{
              color: ACCENT,
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            {props.category}
          </p>
          <h1
            className="mb-6"
            style={{
              fontFamily: SERIF,
              fontWeight: 500,
              color: BLACK,
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
            }}
          >
            {props.title}
          </h1>
          <p
            className="mb-8"
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              color: TEXT_MUTED,
              fontSize: '0.95rem',
              fontWeight: 400,
            }}
          >
            {props.date} — JurisLinkia
          </p>
          <div style={{ borderTop: `1px solid ${BORDER}` }} />
        </div>
      </section>

      {/* Article body */}
      <section style={{ backgroundColor: WHITE }}>
        <div className="max-w-[720px] mx-auto px-6 md:px-8 pb-16 md:pb-24 article-prose">
          {props.children}
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ backgroundColor: WHITE }}>
        <div className="max-w-[720px] mx-auto px-6 md:px-8 pb-16">
          <p
            className="text-center"
            style={{
              color: TEXT_MUTED,
              fontSize: '0.875rem',
              fontStyle: 'italic',
              lineHeight: 1.6,
            }}
          >
            {props.disclaimer}
          </p>
        </div>
      </section>

      {/* CTA — black */}
      <section style={{ backgroundColor: BLACK }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-20 md:py-24 text-center">
          <h2
            className="mb-4"
            style={{
              fontFamily: SERIF,
              fontWeight: 500,
              color: WHITE,
              fontSize: 'clamp(1.85rem, 3.5vw, 2.6rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            {props.ctaTitle}
          </h2>
          <p
            className="mb-8 mx-auto"
            style={{
              color: '#C7CAD1',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              maxWidth: '520px',
            }}
          >
            {props.ctaSubtitle}
          </p>
          <a href={homeAssistant} className="btn-primary-light">
            {props.ctaButton} <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
