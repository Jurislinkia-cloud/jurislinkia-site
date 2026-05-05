import { cn } from '@/lib/saas-utils'
import type { Locale } from '@/lib/i18n'

interface SupportCardProps {
  locale?: Locale
  phone?: string
  email?: string
  variant?: 'sidebar' | 'block'
  className?: string
}

const labels = {
  fr: {
    title: 'Besoin d\'aide ?',
    description: 'Notre équipe est là pour vous accompagner.',
    callUs: 'Appelez-nous',
    writeUs: 'Écrire à l\'équipe',
  },
  en: {
    title: 'Need help?',
    description: 'Our team is here to support you.',
    callUs: 'Call us',
    writeUs: 'Write to the team',
  },
} as const

/**
 * Carte de support avec téléphone et email.
 *
 * - variant="sidebar" → version compacte pour la sidebar
 * - variant="block"   → version pleine largeur pour pages d'aide
 *
 * @example
 * <SupportCard locale="fr" />
 * <SupportCard variant="block" phone="(514) 900-0645" email="contact@jurislinkia.com" />
 */
export function SupportCard({
  locale = 'fr',
  phone = '(514) 900-0645',
  email = 'contact@jurislinkia.com',
  variant = 'sidebar',
  className,
}: SupportCardProps) {
  const l = labels[locale]

  // Version compacte pour la sidebar
  if (variant === 'sidebar') {
    return (
      <div
        className={cn(
          'rounded-sm bg-[#FAFAFA] border border-[#E5E7EB] p-4',
          className
        )}
      >
        <p
          className="text-xs font-medium text-[#0A0A0A] m-0 mb-1"
          style={{
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.02em',
          }}
        >
          {l.title}
        </p>
        <p
          className="text-xs text-[#6B7280] m-0 mb-3 leading-snug"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {l.description}
        </p>

        {/* Téléphone */}
        
          href={`tel:${phone.replace(/[^\d+]/g, '')}`}
          className={cn(
            'flex items-center gap-2 text-xs text-[#0A0A0A] no-underline mb-1.5',
            'hover:text-[#BC1E1E] transition-colors'
          )}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <PhoneIcon />
          <span className="font-medium">{phone}</span>
        </a>

        {/* Email */}
        
          href={`mailto:${email}`}
          className={cn(
            'flex items-center gap-2 text-xs text-[#6B7280] no-underline',
            'hover:text-[#BC1E1E] transition-colors'
          )}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <MailIcon />
          <span>{l.writeUs}</span>
        </a>
      </div>
    )
  }

  // Version pleine largeur pour pages d'aide
  return (
    <div
      className={cn(
        'rounded-sm bg-white border border-[#E5E7EB] p-6',
        className
      )}
    >
      <h3
        className="font-serif text-[#0A0A0A] m-0 mb-2"
        style={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 500,
          fontSize: '1.25rem',
          letterSpacing: '-0.01em',
        }}
      >
        {l.title}
      </h3>
      <p
        className="text-sm text-[#6B7280] m-0 mb-5"
        style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}
      >
        {l.description}
      </p>

      <div className="space-y-3">
        {/* Téléphone */}
        <div className="flex items-start gap-3">
          <span className="shrink-0 mt-0.5 text-[#BC1E1E]">
            <PhoneIcon size={18} />
          </span>
          <div className="min-w-0">
            <p
              className="text-xs uppercase tracking-wider text-[#9CA3AF] m-0 mb-0.5"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.18em',
                fontSize: '11px',
              }}
            >
              {l.callUs}
            </p>
            
              href={`tel:${phone.replace(/[^\d+]/g, '')}`}
              className="text-sm text-[#0A0A0A] no-underline font-medium hover:text-[#BC1E1E] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {phone}
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <span className="shrink-0 mt-0.5 text-[#BC1E1E]">
            <MailIcon size={18} />
          </span>
          <div className="min-w-0">
            <p
              className="text-xs uppercase tracking-wider text-[#9CA3AF] m-0 mb-0.5"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.18em',
                fontSize: '11px',
              }}
            >
              Email
            </p>
            
              href={`mailto:${email}`}
              className="text-sm text-[#0A0A0A] no-underline font-medium hover:text-[#BC1E1E] transition-colors break-all"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function PhoneIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MailIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
