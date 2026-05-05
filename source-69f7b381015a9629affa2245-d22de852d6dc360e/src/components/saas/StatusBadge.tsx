import { getStatusBadgeClass, getStatusLabel, cn } from '@/lib/saas-utils'
import type { Locale } from '@/lib/i18n'

interface StatusBadgeProps {
  status: string
  locale?: Locale
  size?: 'sm' | 'md'
  className?: string
}

/**
 * Badge de statut coloré.
 * Couleur et libellé déterminés automatiquement selon le statut.
 *
 * @example <StatusBadge status="verified" locale="fr" />
 * @example <StatusBadge status="pending_verification" locale="en" size="sm" />
 */
export function StatusBadge({
  status,
  locale = 'fr',
  size = 'md',
  className,
}: StatusBadgeProps) {
  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-xs'
    : 'px-2.5 py-1 text-xs'

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        sizeClasses,
        getStatusBadgeClass(status),
        className
      )}
    >
      {getStatusLabel(status, locale)}
    </span>
  )
}
