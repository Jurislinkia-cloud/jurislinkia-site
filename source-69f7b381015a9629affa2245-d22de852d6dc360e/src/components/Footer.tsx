import {
  localizedPath,
  t,
  tx,
  QUEBEC_CITIES,
  ONTARIO_CITIES,
} from '@/lib/i18n'
import { useLocale } from '@/lib/useLocale'

const ACCENT = '#BC1E1E'
const TEXT = '#FFFFFF'
const SECTION_TITLE = '#6B7280'
const LINK = '#FFFFFF'
const COPYRIGHT = '#6B7280'
const DESCRIPTION = '#9CA3AF'
const BORDER = '#1F2937'
const BG_FOOTER = '#0A0A0A'
const SEPARATOR = '#C9A961'

export function Footer() {
  const locale = useLocale()
  const home = locale === 'fr' ? '/' : '/en/'
  const portal = localizedPath('lawyersPortal', locale)
  const privacy = localizedPath('privacy', locale)
  const terms = localizedPath('terms', locale)
  const cookies = localizedPath('cookies', locale)

  return (
    <footer
      className="py-20 px-4"
      style={{ backgroundColor: BG_FOOTER }}
    >
      <div className="max-w-[1280px] mx-auto px-2 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          {/* Brand + description */}
          <div className="md:col-span-4">
            <h3
              className="text-2xl mb-5"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: TEXT,
                fontWeight: 500,
                letterSpacing: '-0.01em',
              }}
            >
              Juris<span style={{ color: ACCENT }}>Linkia</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: DESCRIPTION }}>
              {tx(t.footer.description, locale)}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4
              className="mb-4"
              style={{ color: SECTION_TITLE, letterSpacing: '0.1em', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase' }}
            >
              {tx(t.footer.navigation, locale)}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`${home}#assistant`}
                  className="text-sm transition-colors hover:!text-[#BC1E1E]"
                  style={{ color: LINK }}
                >
                  {tx(t.nav.assistant, locale)}
                </a>
              </li>
              <li>
                <a
                  href={`${home}#domaines`}
                  className="text-sm transition-colors hover:!text-[#BC1E1E]"
                  style={{ color: LINK }}
                >
                  {tx(t.nav.practiceAreas, locale)}
                </a>
              </li>
              <li>
                <a
                  href={`${home}#fonctionnement`}
                  className="text-sm transition-colors hover:!text-[#BC1E1E]"
                  style={{ color: LINK }}
                >
                  {tx(t.nav.howItWorks, locale)}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4
              className="mb-4"
              style={{ color: SECTION_TITLE, letterSpacing: '0.1em', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase' }}
            >
              {tx(t.footer.contact, locale)}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="tel:+15149000645"
                  className="text-sm transition-colors hover:!text-[#C9A961]"
                  style={{ color: LINK }}
                >
                  {tx(t.footer.contactPhone, locale)} : (514) 900-0645
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@jurislinkia.com"
                  className="text-sm transition-colors hover:!text-[#C9A961]"
                  style={{ color: LINK, wordBreak: 'break-word' }}
                >
                  {tx(t.footer.contactEmail, locale)} : info@jurislinkia.com
                </a>
              </li>
            </ul>
          </div>

          {/* Lawyers */}
          <div className="md:col-span-2">
            <h4
              className="mb-4"
              style={{ color: SECTION_TITLE, letterSpacing: '0.1em', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase' }}
            >
              {tx(t.footer.lawyers, locale)}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={portal}
                  className="text-sm transition-colors hover:!text-[#BC1E1E]"
                  style={{ color: LINK }}
                >
                  {tx(t.nav.lawyersPortal, locale)}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4
              className="mb-4"
              style={{ color: SECTION_TITLE, letterSpacing: '0.1em', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase' }}
            >
              {tx(t.footer.legal, locale)}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={privacy}
                  className="text-sm transition-colors hover:!text-[#BC1E1E]"
                  style={{ color: LINK }}
                >
                  {tx(t.footer.privacy, locale)}
                </a>
              </li>
              <li>
                <a
                  href={terms}
                  className="text-sm transition-colors hover:!text-[#BC1E1E]"
                  style={{ color: LINK }}
                >
                  {tx(t.footer.terms, locale)}
                </a>
              </li>
              <li>
                <a
                  href={cookies}
                  className="text-sm transition-colors hover:!text-[#BC1E1E]"
                  style={{ color: LINK }}
                >
                  {tx(t.footer.cookies, locale)}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-10 pt-10" style={{ borderTop: `1px solid ${BORDER}` }}>
          <h4
            className="mb-6"
            style={{ fontSize: '11px', letterSpacing: '0.1em', color: SECTION_TITLE, fontWeight: 500, textTransform: 'uppercase' }}
          >
            {tx(t.footer.serviceAreas, locale)}
          </h4>
          <div className="grid md:grid-cols-2 gap-8">
            <CityList title={tx(t.footer.quebec, locale)} cities={QUEBEC_CITIES} />
            <CityList title="Ontario" cities={ONTARIO_CITIES} />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6" style={{ borderTop: `1px solid ${BORDER}` }}>
          <p className="text-xs leading-relaxed" style={{ color: COPYRIGHT }}>
            {tx(t.footer.copyright, locale)}
          </p>
        </div>
      </div>
    </footer>
  )
}

function CityList({ title, cities }: { title: string; cities: readonly string[] }) {
  return (
    <div>
      <h5 className="mb-3" style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 500, letterSpacing: '0.02em' }}>
        {title}
      </h5>
      <p className="leading-relaxed" style={{ fontSize: '13px', color: '#E5E7EB' }}>
        {cities.map((city, i) => (
          <span key={city}>
            {city}
            {i < cities.length - 1 && (
              <span style={{ color: SEPARATOR }}> · </span>
            )}
          </span>
        ))}
      </p>
    </div>
  )
}
