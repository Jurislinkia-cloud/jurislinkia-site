import { useState } from 'react'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import { Header } from './Header'
import { Footer } from './Footer'
import { t, tx, DOMAINES_BILINGUAL, type Locale } from '@/lib/i18n'

const ACCENT = '#BC1E1E'
const BLACK = '#0A0A0A'
const WHITE = '#FFFFFF'
const BG_ALT = '#F5F5F5'
const TEXT_BODY = '#1A1A1A'
const TEXT_MUTED = '#6B7280'
const CARD_BG = '#FFFFFF'
const CARD_TITLE = '#0A0A0A'
const CARD_BODY = '#1A1A1A'
const LABEL = '#4B5563'
const FIELD_BORDER = '#D1D5DB'
const HEADER_BG = '#F5F5F5'
const SERIF = "'Playfair Display', 'EB Garamond', Georgia, serif"

const FIELD_INPUT_CLASSES = 'w-full rounded px-3 py-2.5 text-sm focus:outline-none transition-colors'

const CARD_STYLE: React.CSSProperties = {
  backgroundColor: CARD_BG,
  borderRadius: '4px',
  border: '1px solid #E5E7EB',
}

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

export function LawyersPortalPage({ locale }: { locale: Locale }) {
  const [fields, setFields] = useState({
    nom: '', prenom: '', cabinet: '', ville: '', province: '', telephone: '', courriel: '',
    experience: '', barreau: '', message: '',
  })
  const [domaines, setDomaines] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const toggleDomaine = (d: string) => {
    setDomaines(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/inscription-avocat.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'inscription-avocat',
          locale,
          ...fields,
          domaines: domaines.join(', '),
        }),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const home = locale === 'fr' ? '/' : '/en/'

  return (
    <div className="min-h-screen" style={{ backgroundColor: WHITE, color: TEXT_BODY }}>
      <Header />

      <div className="py-16 px-4" style={{ backgroundColor: BG_ALT }}>
        <div className="max-w-3xl mx-auto">
          <a
            href={home}
            className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:!text-[#BC1E1E]"
            style={{ color: TEXT_MUTED }}
          >
            <ArrowLeft size={14} /> {tx(t.common.backHome, locale)}
          </a>
          <h1
            className="mb-4"
            style={{
              fontFamily: SERIF,
              color: BLACK,
              fontWeight: 500,
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            {tx(t.portal.title, locale)}
          </h1>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: TEXT_MUTED, fontWeight: 400 }}>
            {tx(t.portal.subtitle, locale)}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {t.portal.benefits.map((b, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-5"
              style={CARD_STYLE}
            >
              <CheckCircle size={20} style={{ color: ACCENT }} className="shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed" style={{ color: CARD_BODY, fontWeight: 500 }}>{tx(b, locale)}</p>
            </div>
          ))}
        </div>

        {submitted ? (
          <div
            className="text-center py-16 px-6"
            style={CARD_STYLE}
          >
            <CheckCircle size={48} style={{ color: ACCENT }} className="mx-auto mb-4" />
            <h2
              className="mb-3"
              style={{
                fontFamily: SERIF,
                color: CARD_TITLE,
                fontWeight: 500,
                fontSize: '1.85rem',
                letterSpacing: '-0.01em',
              }}
            >
              {tx(t.portal.successTitle, locale)}
            </h2>
            <p className="max-w-md mx-auto leading-relaxed" style={{ color: CARD_BODY }}>
              {tx(t.portal.successText, locale)}
            </p>
            <a href={home} className="btn-primary inline-flex items-center gap-2 mt-8">
              {tx(t.portal.backHome, locale)}
            </a>
          </div>
        ) : (
          <div
            className="overflow-hidden"
            style={CARD_STYLE}
          >
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <input type="hidden" name="form-name" value="inscription-avocat" />

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={tx(t.portal.fields.firstName, locale)} name="prenom" value={fields.prenom} onChange={handleChange} required />
                <Field label={tx(t.portal.fields.lastName, locale)} name="nom" value={fields.nom} onChange={handleChange} required />
              </div>
              <Field label={tx(t.portal.fields.firm, locale)} name="cabinet" value={fields.cabinet} onChange={handleChange} required />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={tx(t.portal.fields.city, locale)} name="ville" value={fields.ville} onChange={handleChange} required />
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: LABEL }}>{tx(t.portal.fields.province, locale)}</label>
                  <select
                    name="province"
                    value={fields.province}
                    onChange={handleChange}
                    required
                    className={FIELD_INPUT_CLASSES}
                    style={{ backgroundColor: '#FFFFFF', color: CARD_TITLE, border: `1px solid ${FIELD_BORDER}` }}
                  >
                    <option value="">{locale === 'fr' ? 'Sélectionner...' : 'Select...'}</option>
                    <option value="QC">{tx(t.chat.provinces.qc, locale)}</option>
                    <option value="ON">{tx(t.chat.provinces.on, locale)}</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={tx(t.portal.fields.phone, locale)} name="telephone" type="tel" value={fields.telephone} onChange={handleChange} required />
                <Field label={tx(t.portal.fields.email, locale)} name="courriel" type="email" value={fields.courriel} onChange={handleChange} required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={tx(t.portal.fields.barNumber, locale)} name="barreau" value={fields.barreau} onChange={handleChange} required placeholder="123456" />
                <Field label={tx(t.portal.fields.experience, locale)} name="experience" type="number" value={fields.experience} onChange={handleChange} required placeholder="10" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: LABEL }}>
                  {tx(t.portal.fields.practiceAreas, locale)}
                </label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {DOMAINES_BILINGUAL.map(d => (
                    <label
                      key={d.fr}
                      className="flex items-center gap-2.5 p-3 rounded-md cursor-pointer transition-colors"
                      style={{ border: `1px solid ${FIELD_BORDER}`, backgroundColor: HEADER_BG }}
                    >
                      <input
                        type="checkbox"
                        checked={domaines.includes(d.fr)}
                        onChange={() => toggleDomaine(d.fr)}
                        style={{ accentColor: ACCENT }}
                      />
                      <span className="text-sm" style={{ color: CARD_BODY, fontWeight: 500 }}>{tx(d, locale)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: LABEL }}>
                  {tx(t.portal.fields.message, locale)}
                </label>
                <textarea
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  rows={4}
                  className={`${FIELD_INPUT_CLASSES} resize-none`}
                  style={{ backgroundColor: '#FFFFFF', color: CARD_TITLE, border: `1px solid ${FIELD_BORDER}` }}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || domaines.length === 0}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {loading ? (locale === 'fr' ? 'Envoi en cours...' : 'Sending...') : tx(t.portal.submit, locale)}
                </button>
                {domaines.length === 0 && (
                  <p className="text-xs mt-2 text-center" style={{ color: LABEL }}>
                    {tx(t.portal.selectAtLeast, locale)}
                  </p>
                )}
              </div>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

function Field({
  label, name, value, onChange, type = 'text', required, placeholder,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: LABEL }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={FIELD_INPUT_CLASSES}
        style={{ backgroundColor: '#FFFFFF', color: CARD_TITLE, border: `1px solid ${FIELD_BORDER}` }}
      />
    </div>
  )
}
