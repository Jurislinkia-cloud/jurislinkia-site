import type { ReactNode } from 'react'
import { cn } from '@/lib/saas-utils'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * État vide pour les listes (aucun dossier, aucune conversation, etc.).
 *
 * @example
 * <EmptyState
 *   icon={<FolderOpen size={48} />}
 *   title="Aucune conversation"
 *   description="Vos échanges avec vos clients apparaîtront ici."
 *   action={<SaasButton>Voir les dossiers</SaasButton>}
 * />
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  size = 'md',
  className,
}: EmptyStateProps) {
  const sizeClasses = {
    sm: 'py-8 px-4',
    md: 'py-12 px-6',
    lg: 'py-20 px-8',
  }

  const iconSizeClasses = {
    sm: 'w-10 h-10 mb-3',
    md: 'w-14 h-14 mb-4',
    lg: 'w-20 h-20 mb-6',
  }

  const titleSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizeClasses[size],
        className
      )}
    >
      {/* Icône optionnelle dans un cercle gris très clair */}
      {icon && (
        <div
          className={cn(
            'flex items-center justify-center',
            'rounded-full bg-[#F5F5F5]',
            'text-[#9CA3AF]',
            iconSizeClasses[size]
          )}
        >
          {icon}
        </div>
      )}

      {/* Titre principal */}
      <h3
        className={cn(
          'font-serif text-[#0A0A0A] m-0 mb-2',
          titleSizeClasses[size]
        )}
        style={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 500,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h3>

      {/* Description optionnelle */}
      {description && (
        <p
          className="text-sm text-[#6B7280] m-0 max-w-md"
          style={{
            fontFamily: 'Inter, sans-serif',
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      )}

      {/* Bouton d'action optionnel */}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

/**
 * Petite icône SVG par défaut (dossier vide) si tu n'en passes pas.
 */
export function DefaultEmptyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </svg>
  )
}
