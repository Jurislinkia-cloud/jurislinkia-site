import type { ReactNode } from 'react'
import { cn } from '@/lib/saas-utils'

interface SectionCardProps {
  title?: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
  variant?: 'default' | 'bordered' | 'flat'
  noPadding?: boolean
  className?: string
}

/**
 * Carte conteneur pour structurer les sections du SaaS.
 * Avec titre, sous-titre, actions, et contenu.
 *
 * @example
 * <SectionCard
 *   title="Mes dossiers actifs"
 *   subtitle="Conversations en cours avec vos clients"
 *   actions={<SaasButton size="sm">Tout voir</SaasButton>}
 * >
 *   <ConversationsList />
 * </SectionCard>
 */
export function SectionCard({
  title,
  subtitle,
  actions,
  children,
  variant = 'default',
  noPadding = false,
  className,
}: SectionCardProps) {
  const variantClasses: Record<NonNullable<SectionCardProps['variant']>, string> = {
    default: 'bg-white border border-[#E5E7EB]',
    bordered: 'bg-white border border-[#0A0A0A]',
    flat: 'bg-[#F5F5F5] border border-transparent',
  }

  const hasHeader = title || subtitle || actions

  return (
    <section
      className={cn(
        'rounded-sm overflow-hidden',
        variantClasses[variant],
        className
      )}
    >
      {/* Header avec titre, sous-titre et actions */}
      {hasHeader && (
        <header
          className={cn(
            'flex items-start justify-between gap-4',
            'px-6 py-5',
            children && 'border-b border-[#E5E7EB]'
          )}
        >
          <div className="min-w-0 flex-1">
            {title && (
              <h2
                className="font-serif text-[#0A0A0A] m-0"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 500,
                  fontSize: '1.25rem',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.3,
                }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="text-sm text-[#6B7280] mt-1 m-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 shrink-0">
              {actions}
            </div>
          )}
        </header>
      )}

      {/* Corps de la carte */}
      <div className={cn(!noPadding && 'p-6')}>
        {children}
      </div>
    </section>
  )
}

/**
 * Variante "compact" pour les sections plus denses.
 */
export function SectionCardCompact({
  title,
  actions,
  children,
  className,
}: {
  title?: string
  actions?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'bg-white border border-[#E5E7EB] rounded-sm overflow-hidden',
        className
      )}
    >
      {(title || actions) && (
        <header className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB] bg-[#F9FAFB]">
          {title && (
            <span
              className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]"
              style={{
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.18em',
              }}
            >
              {title}
            </span>
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  )
}
