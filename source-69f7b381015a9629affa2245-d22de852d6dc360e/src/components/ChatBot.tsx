import { useState, useRef, useEffect } from 'react'
import type { Avocat } from '@/data/lawyers'
import { Send, Phone, Mail, Briefcase, MapPin, Clock, AlertCircle, RotateCcw, Lock, ArrowRight } from 'lucide-react'
import { t, tx, type Locale } from '@/lib/i18n'

const ACCENT = '#BC1E1E'
const BLACK = '#0A0A0A'
const CARD_BG = '#FFFFFF'
const CARD_TITLE = '#0A0A0A'
const CARD_BODY = '#1A1A1A'
const LABEL = '#4B5563'
const FIELD_BORDER = '#D1D5DB'
const AI_BUBBLE_BG = '#F5F5F5'
const HEADER_BG = '#FFFFFF'
const HEADER_BORDER = '#E5E7EB'
const ERROR = '#BC1E1E'

// 🔥 Nom du formulaire Netlify (doit matcher index.html)
const NETLIFY_FORM_NAME = 'inscription-avocat'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isResult?: boolean
}

interface ChatResult {
  summary: string
  message: string
  domains: string[]
  lawyers: Avocat[]
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  province: 'QC' | 'ON' | ''
  city: string
  facts: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  province?: string
  city?: string
  facts?: string
}

interface Props {
  locale: Locale
  compact?: boolean
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s\-+().]{8,}$/

function extractDisplayText(raw: string): string {
  if (!raw) return raw
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)
  const tryParse = (s: string) => {
    try {
      const obj = JSON.parse(s)
      if (obj && typeof obj === 'object') {
        return obj.text || obj.message || obj.content || null
      }
    } catch {}
    return null
  }
  if (fence) {
    const v = tryParse(fence[1])
    if (typeof v === 'string') return v
  }
  const trimmed = raw.trim()
  if (trimmed.startsWith('{')) {
    const v = tryParse(trimmed)
    if (typeof v === 'string') return v
  }
  return raw
}

// 🔥 Helper : envoie les données du formulaire à Netlify Forms.
// On encapsule dans une fonction séparée pour que toute erreur Netlify
// ne casse JAMAIS le flow principal vers /api/chat.
async function submitToNetlify(form: FormData): Promise<void> {
  try {
    const body = new URLSearchParams({
      'form-name': NETLIFY_FORM_NAME,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      province: form.province,
      city: form.city,
      facts: form.facts,
      submittedAt: new Date().toISOString(),
    }).toString()

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
  } catch (err) {
    // On log mais on ne bloque pas l'UX si Netlify est down.
    // eslint-disable-next-line no-console
    console.warn('[Netlify Forms] submission failed:', err)
  }
}

const FIELD_INPUT_CLASSES =
  'w-full rounded-md px-3 py-2.5 text-sm focus:outline-none transition-colors'

export function ChatBot({ locale, compact = false }: Props) {
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '', province: '', city: '', facts: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [stage, setStage] = useState<'form' | 'chat' | 'done'>('form')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ChatResult | null>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Scroll only inside the messages container — never scroll the page.
  useEffect(() => {
    const c = messagesContainerRef.current
    if (c) c.scrollTop = c.scrollHeight
  }, [messages, loading])

  // Prevent the browser from scrolling the page when the chat input
  // (or any field inside the chatbot) gains focus.
  const preventPageScrollOnFocus = (e: React.FocusEvent<HTMLElement>) => {
    const x = window.scrollX
    const y = window.scrollY
    // Run after the browser's default focus scroll-into-view.
    requestAnimationFrame(() => window.scrollTo(x, y))
    setTimeout(() => window.scrollTo(x, y), 0)
    // Avoid an unused-var warning.
    void e
  }

  const update = (k: keyof FormData, v: string) => {
    setForm({ ...form, [k]: v })
    if (errors[k as keyof FormErrors]) setErrors({ ...errors, [k]: undefined })
  }

  const validateForm = (): boolean => {
    const e: FormErrors = {}
    const required = tx(t.chat.errors.required, locale)
    if (!form.firstName.trim()) e.firstName = required
    if (!form.lastName.trim()) e.lastName = required
    if (!form.email.trim()) e.email = required
    else if (!EMAIL_RE.test(form.email)) e.email = tx(t.chat.errors.email, locale)
    if (!form.phone.trim()) e.phone = required
    else if (!PHONE_RE.test(form.phone)) e.phone = tx(t.chat.errors.phone, locale)
    if (!form.province) e.province = required
    if (!form.city.trim()) e.city = required
    if (!form.facts.trim()) e.facts = required
    else if (form.facts.trim().length < 50) e.facts = tx(t.chat.errors.minLength, locale)
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleFormSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    // 🔥 ENVOI À NETLIFY TOUJOURS (même incomplet)
    void submitToNetlify(form)
    
    // 👉 ensuite validation (UX seulement)
    if (!validateForm()) return

    setStage('chat')
    setMessages([
      { role: 'user', content: form.facts },
    ])
    setLoading(true)
    try {
      await sendToApi([{ role: 'user', content: form.facts }])
    } finally {
      setLoading(false)
    }
  }

  const sendToApi = async (msgs: Message[]) => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: msgs.map(m => ({ role: m.role, content: m.content })),
        locale,
        province: form.province,
      }),
    })
    const data = await res.json()
    if (data.type === 'result') {
      setResult(data)
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.summary, isResult: true },
      ])
      setTimeout(() => setStage('done'), 600)
    } else {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: extractDisplayText(data.text || data.error || (locale === 'fr' ? 'Une erreur est survenue.' : 'An error occurred.')) },
      ])
    }
  }

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    const newMsgs: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMsgs)
    setInput('')
    setLoading(true)
    try {
      await sendToApi(newMsgs)
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: locale === 'fr' ? 'Une erreur de connexion est survenue.' : 'A connection error occurred.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm({ firstName: '', lastName: '', email: '', phone: '', province: '', city: '', facts: '' })
    setErrors({})
    setMessages([])
    setInput('')
    setResult(null)
    setStage('form')
  }

  const containerStyle: React.CSSProperties = {
    backgroundColor: CARD_BG,
    borderRadius: '12px',
    boxShadow: compact
      ? '0 4px 24px rgba(0, 0, 0, 0.08)'
      : '0 12px 32px rgba(0, 0, 0, 0.35)',
  }

  const wrapperClass = compact
    ? 'overflow-hidden w-full'
    : 'overflow-hidden max-w-3xl mx-auto'

  const formPadClass = compact ? 'p-6 md:p-8 space-y-4' : 'p-8 space-y-5'

  // ───── FORM STAGE ─────
  if (stage === 'form') {
    if (compact) {
      return (
        <div className={wrapperClass} style={containerStyle}>
          <form
            onSubmit={handleFormSubmit}
            className={formPadClass}
            autoComplete="off"
            onFocusCapture={preventPageScrollOnFocus}
            // 🔥 Attributs Netlify Forms
            name={NETLIFY_FORM_NAME}
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            {/* 🔥 Champs requis par Netlify (cachés) */}
            <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
            <p className="hidden">
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>

            {/* Welcome bubble — JL avatar + light grey bubble */}
            <div className="flex gap-3 items-start">
              <div
                className="shrink-0 rounded-full flex items-center justify-center"
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: BLACK,
                  color: '#FFFFFF',
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  letterSpacing: '0.02em',
                }}
              >
                JL
              </div>
              <div
                className="flex-1 px-4 py-3 text-sm leading-relaxed"
                style={{
                  backgroundColor: AI_BUBBLE_BG,
                  color: CARD_BODY,
                  borderRadius: '12px',
                  borderTopLeftRadius: '2px',
                }}
              >
                {tx(t.chat.welcome, locale)}
              </div>
            </div>

            {/* Large textarea — facts first */}
            <div>
              <label htmlFor="chat-facts" className="sr-only">
                {tx(t.chat.fields.facts, locale)}
              </label>
              <textarea
                id="chat-facts"
                name="facts"
                rows={4}
                value={form.facts}
                onChange={e => update('facts', e.target.value)}
                placeholder={
                  locale === 'fr'
                    ? 'Décrivez votre situation...'
                    : 'Describe your situation...'
                }
                className="w-full rounded-md px-3 py-2.5 text-sm focus:outline-none transition-colors resize-none"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: CARD_TITLE,
                  border: `${errors.facts ? '2px' : '1px'} solid ${errors.facts ? ERROR : '#E5E7EB'}`,
                  minHeight: '100px',
                  borderRadius: '8px',
                }}
              />
              {errors.facts && <p className="text-xs mt-1" style={{ color: ERROR }}>{errors.facts}</p>}
            </div>

            {/* 6 fields, 2 columns */}
            <div className="grid sm:grid-cols-2 gap-3">
              <Field
                name="firstName"
                label={tx(t.chat.fields.firstName, locale)}
                value={form.firstName}
                onChange={v => update('firstName', v)}
                placeholder={tx(t.chat.placeholders.firstName, locale)}
                error={errors.firstName}
              />
              <Field
                name="lastName"
                label={tx(t.chat.fields.lastName, locale)}
                value={form.lastName}
                onChange={v => update('lastName', v)}
                placeholder={tx(t.chat.placeholders.lastName, locale)}
                error={errors.lastName}
              />
              <Field
                name="email"
                label={tx(t.chat.fields.email, locale)}
                type="email"
                value={form.email}
                onChange={v => update('email', v)}
                placeholder={tx(t.chat.placeholders.email, locale)}
                error={errors.email}
              />
              <Field
                name="phone"
                label={tx(t.chat.fields.phone, locale)}
                type="tel"
                value={form.phone}
                onChange={v => update('phone', v)}
                placeholder={tx(t.chat.placeholders.phone, locale)}
                error={errors.phone}
              />
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: LABEL }}>{tx(t.chat.fields.province, locale)}</label>
                <select
                  name="province"
                  value={form.province}
                  onChange={e => update('province', e.target.value)}
                  className={FIELD_INPUT_CLASSES}
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: CARD_TITLE,
                    border: `${errors.province ? '2px' : '1px'} solid ${errors.province ? ERROR : FIELD_BORDER}`,
                  }}
                >
                  <option value="">{tx(t.chat.selectProvince, locale)}</option>
                  <option value="QC">{tx(t.chat.provinces.qc, locale)}</option>
                  <option value="ON">{tx(t.chat.provinces.on, locale)}</option>
                </select>
                {errors.province && <p className="text-xs mt-1" style={{ color: ERROR }}>{errors.province}</p>}
              </div>
              <Field
                name="city"
                label={tx(t.chat.fields.city, locale)}
                value={form.city}
                onChange={v => update('city', v)}
                error={errors.city}
              />
            </div>

            {/* CTA — full width black, hover red */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 transition-colors"
              style={{
                backgroundColor: BLACK,
                color: '#FFFFFF',
                height: '56px',
                borderRadius: '8px',
                fontWeight: 500,
                fontSize: '0.95rem',
                letterSpacing: '0.01em',
                fontFamily: 'Inter, sans-serif',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = ACCENT)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = BLACK)}
            >
              {tx(t.chat.submit, locale)} <ArrowRight size={16} />
            </button>

            {/* Trust signals */}
            <div
              className="flex flex-wrap items-center justify-center gap-2 pt-1"
              style={{
                color: '#4B5563',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <Lock size={13} style={{ color: ACCENT }} />
              <span>{tx(t.chat.trust, locale)}</span>
            </div>
          </form>
        </div>
      )
    }

    return (
      <div className={wrapperClass} style={containerStyle}>
        <ChatHeader locale={locale} onReset={handleReset} showReset={false} />

        <form
          onSubmit={handleFormSubmit}
          className={formPadClass}
          autoComplete="off"
          onFocusCapture={preventPageScrollOnFocus}
          // 🔥 Attributs Netlify Forms
          name={NETLIFY_FORM_NAME}
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          {/* 🔥 Champs requis par Netlify (cachés) */}
          <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
          <p className="hidden">
            <label>
              Don't fill this out: <input name="bot-field" />
            </label>
          </p>

          <div className="flex gap-3 items-start">
            <AlertCircle size={20} style={{ color: ACCENT }} className="shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed" style={{ color: CARD_BODY }}>{tx(t.chat.intro, locale)}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              name="firstName"
              label={tx(t.chat.fields.firstName, locale)}
              value={form.firstName}
              onChange={v => update('firstName', v)}
              placeholder={tx(t.chat.placeholders.firstName, locale)}
              error={errors.firstName}
            />
            <Field
              name="lastName"
              label={tx(t.chat.fields.lastName, locale)}
              value={form.lastName}
              onChange={v => update('lastName', v)}
              placeholder={tx(t.chat.placeholders.lastName, locale)}
              error={errors.lastName}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              name="email"
              label={tx(t.chat.fields.email, locale)}
              type="email"
              value={form.email}
              onChange={v => update('email', v)}
              placeholder={tx(t.chat.placeholders.email, locale)}
              error={errors.email}
            />
            <Field
              name="phone"
              label={tx(t.chat.fields.phone, locale)}
              type="tel"
              value={form.phone}
              onChange={v => update('phone', v)}
              placeholder={tx(t.chat.placeholders.phone, locale)}
              error={errors.phone}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: LABEL }}>{tx(t.chat.fields.province, locale)}</label>
              <select
                name="province"
                value={form.province}
                onChange={e => update('province', e.target.value)}
                className={FIELD_INPUT_CLASSES}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: CARD_TITLE,
                  border: `${errors.province ? '2px' : '1px'} solid ${errors.province ? ERROR : FIELD_BORDER}`,
                }}
              >
                <option value="">{tx(t.chat.selectProvince, locale)}</option>
                <option value="QC">{tx(t.chat.provinces.qc, locale)}</option>
                <option value="ON">{tx(t.chat.provinces.on, locale)}</option>
              </select>
              {errors.province && <p className="text-xs mt-1" style={{ color: ERROR }}>{errors.province}</p>}
            </div>
            <Field
              name="city"
              label={tx(t.chat.fields.city, locale)}
              value={form.city}
              onChange={v => update('city', v)}
              error={errors.city}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: LABEL }}>{tx(t.chat.fields.facts, locale)}</label>
            <textarea
              name="facts"
              rows={5}
              value={form.facts}
              onChange={e => update('facts', e.target.value)}
              placeholder={tx(t.chat.placeholders.facts, locale)}
              className={`${FIELD_INPUT_CLASSES} resize-none`}
              style={{
                backgroundColor: '#FFFFFF',
                color: CARD_TITLE,
                border: `${errors.facts ? '2px' : '1px'} solid ${errors.facts ? ERROR : FIELD_BORDER}`,
              }}
            />
            {errors.facts && <p className="text-xs mt-1" style={{ color: ERROR }}>{errors.facts}</p>}
          </div>

          <button type="submit" className="btn-primary w-full">
            {tx(t.chat.submit, locale)}
          </button>
        </form>
      </div>
    )
  }

  // ───── DONE STAGE ─────
  if (stage === 'done' && result) {
    return (
      <div className={wrapperClass} style={containerStyle}>
        <ChatHeader locale={locale} onReset={handleReset} showReset={true} />

        <div className="p-8">
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
              style={{ backgroundColor: 'rgba(188, 30, 30, 0.1)', color: ACCENT }}
            >
              <Send size={22} />
            </div>
            <h3 className="text-2xl mb-3" style={{ color: CARD_TITLE, fontWeight: 700, letterSpacing: '-0.02em' }}>
              {tx(t.chat.confirmation.thanks, locale).replace('{name}', form.firstName)}
            </h3>
            <p className="leading-relaxed max-w-xl mx-auto" style={{ color: CARD_BODY }}>
              {tx(t.chat.confirmation.details, locale).replace('{email}', form.email)}
            </p>
          </div>

          <div
            className="rounded-lg p-5 mb-6"
            style={{ backgroundColor: 'rgba(188, 30, 30, 0.06)', border: `1px solid rgba(188, 30, 30, 0.25)` }}
          >
            <p className="text-sm leading-relaxed" style={{ color: CARD_BODY }}>
              <strong style={{ color: CARD_TITLE }}>{locale === 'fr' ? 'Bon à savoir : ' : 'Good to know: '}</strong>
              {tx(t.chat.confirmation.freeCall, locale)}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            <Indicator text={tx(t.chat.indicators.received, locale)} active />
            <Indicator text={tx(t.chat.indicators.selecting, locale)} active />
            <Indicator text={tx(t.chat.indicators.emailing, locale)} />
          </div>

          {result.lawyers.length > 0 && (
            <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${FIELD_BORDER}` }}>
              <p className="text-xs uppercase tracking-wider mb-3" style={{ color: ACCENT, fontWeight: 600 }}>
                {locale === 'fr' ? 'Spécialistes potentiels identifiés' : 'Potential specialists identified'}
              </p>
              <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${FIELD_BORDER}` }}>
                {result.lawyers.slice(0, 3).map((a, i, arr) => (
                  <div
                    key={a.id}
                    style={i < arr.length - 1 ? { borderBottom: `1px solid ${FIELD_BORDER}` } : undefined}
                  >
                    <LawyerCard avocat={a} locale={locale} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleReset}
            className="w-full mt-6 py-2.5 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
            style={{ color: CARD_BODY, border: `1px solid ${FIELD_BORDER}`, backgroundColor: '#FFFFFF' }}
          >
            <RotateCcw size={14} /> {tx(t.chat.restart, locale)}
          </button>
        </div>
      </div>
    )
  }

  // ───── CHAT STAGE ─────
  return (
    <div className={wrapperClass} style={containerStyle}>
      <ChatHeader locale={locale} onReset={handleReset} showReset={true} />

      <div
        ref={messagesContainerRef}
        className={`${compact ? 'h-80' : 'h-96'} overflow-y-auto p-4 space-y-3`}
        style={{ backgroundColor: CARD_BG, scrollBehavior: 'smooth', overscrollBehavior: 'contain' }}
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-[85%] px-4 py-3 rounded-lg text-sm leading-relaxed whitespace-pre-wrap"
              style={
                m.role === 'user'
                  ? {
                      backgroundColor: BLACK,
                      color: '#FFFFFF',
                      borderBottomRightRadius: 0,
                    }
                  : m.isResult
                  ? {
                      backgroundColor: 'rgba(188, 30, 30, 0.06)',
                      border: `1px solid rgba(188, 30, 30, 0.25)`,
                      color: CARD_TITLE,
                      borderBottomLeftRadius: 0,
                    }
                  : {
                      backgroundColor: AI_BUBBLE_BG,
                      color: CARD_TITLE,
                      borderBottomLeftRadius: 0,
                    }
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div
              className="px-4 py-3 rounded-lg"
              style={{ backgroundColor: AI_BUBBLE_BG }}
            >
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: ACCENT }} />
                <span
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ backgroundColor: ACCENT, animationDelay: '150ms' }}
                />
                <span
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ backgroundColor: ACCENT, animationDelay: '300ms' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {!result && (
        <div className="p-4" style={{ borderTop: `1px solid ${HEADER_BORDER}`, backgroundColor: HEADER_BG }}>
          <form
            onSubmit={e => { e.preventDefault(); sendMessage(input) }}
            className="flex gap-2"
            autoComplete="off"
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onFocus={preventPageScrollOnFocus}
              placeholder={locale === 'fr' ? 'Votre réponse...' : 'Your answer...'}
              disabled={loading}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="flex-1 rounded-md px-3 py-2 text-sm focus:outline-none disabled:opacity-60"
              style={{
                backgroundColor: '#FFFFFF',
                color: CARD_TITLE,
                border: `1px solid ${FIELD_BORDER}`,
              }}
            />
            <button type="submit" disabled={loading || !input.trim()} className="btn-primary px-4 py-2 disabled:opacity-50">
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

function ChatHeader({ locale, onReset, showReset }: { locale: Locale; onReset: () => void; showReset: boolean }) {
  return (
    <div
      className="p-5"
      style={{ backgroundColor: HEADER_BG, color: CARD_TITLE, borderBottom: `1px solid ${HEADER_BORDER}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg" style={{ color: CARD_TITLE, fontWeight: 700, letterSpacing: '-0.02em' }}>
            {tx(t.chat.headerTitle, locale)}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: LABEL }}>{tx(t.chat.headerSubtitle, locale)}</p>
        </div>
        {showReset && (
          <button
            onClick={onReset}
            className="text-xs rounded-md px-3 py-1.5 transition-colors flex items-center gap-1.5"
            style={{ color: LABEL, border: `1px solid ${FIELD_BORDER}`, backgroundColor: '#FFFFFF' }}
          >
            <RotateCcw size={11} /> {tx(t.chat.restart, locale)}
          </button>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-wider">
        <span
          className="px-2 py-1 rounded-full"
          style={{ border: `1px solid ${ACCENT}`, color: ACCENT, fontWeight: 600 }}
        >
          {tx(t.chat.badge, locale)}
        </span>
        <span
          className="px-2 py-1 rounded-full"
          style={{ border: `1px solid ${FIELD_BORDER}`, color: LABEL }}
        >
          {tx(t.chat.availability, locale)}
        </span>
      </div>
    </div>
  )
}

function Field({
  name, label, value, onChange, type = 'text', placeholder, error,
}: {
  name?: string
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  error?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: LABEL }}>{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={FIELD_INPUT_CLASSES}
        style={{
          backgroundColor: '#FFFFFF',
          color: CARD_TITLE,
          border: `${error ? '2px' : '1px'} solid ${error ? ERROR : FIELD_BORDER}`,
        }}
      />
      {error && <p className="text-xs mt-1" style={{ color: ERROR }}>{error}</p>}
    </div>
  )
}

function Indicator({ text, active }: { text: string; active?: boolean }) {
  return (
    <div
      className="text-xs px-3 py-2 rounded-md text-center"
      style={
        active
          ? {
              backgroundColor: 'rgba(188, 30, 30, 0.08)',
              border: `1px solid rgba(188, 30, 30, 0.25)`,
              color: CARD_TITLE,
              fontWeight: 500,
            }
          : {
              backgroundColor: AI_BUBBLE_BG,
              border: `1px solid ${FIELD_BORDER}`,
              color: LABEL,
            }
      }
    >
      {text}
    </div>
  )
}

function LawyerCard({ avocat, locale }: { avocat: Avocat; locale: Locale }) {
  return (
    <div className="p-4" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <h4 className="text-sm" style={{ color: CARD_TITLE, fontWeight: 700, letterSpacing: '-0.01em' }}>
          {avocat.nom}
        </h4>
        <span
          className="text-xs whitespace-nowrap flex items-center gap-1 shrink-0"
          style={{ color: LABEL }}
        >
          <Clock size={11} />{avocat.anneesExperience} {locale === 'fr' ? 'ans' : 'yrs'}
        </span>
      </div>
      <p className="text-xs font-medium mb-1 flex items-center gap-1" style={{ color: ACCENT }}>
        <Briefcase size={11} />{avocat.cabinet}
      </p>
      <p className="text-xs mb-2 flex items-center gap-1" style={{ color: LABEL }}>
        <MapPin size={11} />{avocat.ville}
      </p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <a
          href={`tel:${avocat.telephone}`}
          className="flex items-center gap-1.5 text-xs transition-colors hover:text-[#BC1E1E]"
          style={{ color: CARD_BODY }}
        >
          <Phone size={12} style={{ color: ACCENT }} />{avocat.telephone}
        </a>
        <a
          href={`mailto:${avocat.courriel}`}
          className="flex items-center gap-1.5 text-xs transition-colors truncate hover:text-[#BC1E1E]"
          style={{ color: CARD_BODY }}
        >
          <Mail size={12} style={{ color: ACCENT }} />{avocat.courriel}
        </a>
      </div>
    </div>
  )
}

// end
