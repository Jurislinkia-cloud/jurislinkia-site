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
    title: 'Besoin d aide',
    description: 'Notre equipe est la pour vous accompagner.',
    writeUs: 'Ecrire a l equipe',
    callUs: 'Appelez-nous',
  },
  en: {
    title: 'Need help',
    description: 'Our team is here to support you.',
    writeUs: 'Write to the team',
    callUs: 'Call us',
  },
} as const

export function SupportCard(props: SupportCardProps) {
  const locale = props.locale || 'fr'
  const phone = props.phone || '(514) 900-0645'
  const email = props.email || 'contact@jurislinkia.com'
  const variant = props.variant || 'sidebar'
  const l = labels[locale]

  const phoneHref = 'tel:' + phone.replace(/[^0-9+]/g, '')
  const emailHref = 'mailto:' + email

  if (variant === 'sidebar') {
    return (
      <div className={cn('rounded-sm bg-[#FAFAFA] border border-[#E5E7EB] p-4', props.className)}>
        <p className="text-xs font-medium text-[#0A0A0A] m-0 mb-1">{l.title}</p>
        <p className="text-xs text-[#6B7280] m-0 mb-3">{l.description}</p>
        <a href={phoneHref} className="flex items-center gap-2 text-xs text-[#0A0A0A] no-underline mb-1.5 hover:text-[#BC1E1E]">
          <span className="font-medium">{phone}</span>
        </a>
        <a href={emailHref} className="flex items-center gap-2 text-xs text-[#6B7280] no-underline hover:text-[#BC1E1E]">
          <span>{l.writeUs}</span>
        </a>
      </div>
    )
  }

  return (
    <div className={cn('rounded-sm bg-white border border-[#E5E7EB] p-6', props.className)}>
      <h3 className="font-serif text-[#0A0A0A] m-0 mb-2">{l.title}</h3>
      <p className="text-sm text-[#6B7280] m-0 mb-5">{l.description}</p>
      <div className="space-y-3">
        <div>
          <p className="text-xs uppercase text-[#9CA3AF] m-0 mb-0.5">{l.callUs}</p>
          <a href={phoneHref} className="text-sm text-[#0A0A0A] no-underline font-medium hover:text-[#BC1E1E]">
            {phone}
          </a>
        </div>
        <div>
          <p className="text-xs uppercase text-[#9CA3AF] m-0 mb-0.5">Email</p>
          <a href={emailHref} className="text-sm text-[#0A0A0A] no-underline font-medium hover:text-[#BC1E1E]">
            {email}
          </a>
        </div>
      </div>
    </div>
  )
}
