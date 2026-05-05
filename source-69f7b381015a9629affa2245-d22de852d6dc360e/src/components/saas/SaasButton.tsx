import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/saas-utils'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface SaasButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
}

/**
 * Bouton standard du SaaS Jurislinkia.
 * Couleurs alignées avec le design system éditorial (noir + rouge bordeaux).
 *
 * @example <SaasButton variant="primary">Accepter</SaasButton>
 * @example <SaasButton variant="secondary" size="sm" leftIcon={<X />}>Annuler</SaasButton>
 * @example <SaasButton variant="danger" loading>Suppression...</SaasButton>
 */
export function SaasButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...rest
}: SaasButtonProps) {
  // Variantes de couleur
  const variantClasses: Record<Variant, string> = {
    primary:
      'bg-[#0A0A0A] text-white hover:bg-[#BC1E1E] disabled:bg-gray-400 border border-transparent',
    secondary:
      'bg-white text-[#0A0A0A] border border-[#D1D5DB] hover:border-[#0A0A0A] hover:text-[#BC1E1E] disabled:bg-gray-100 disabled:text-gray-400',
    danger:
      'bg-[#BC1E1E] text-white hover:bg-[#951616] disabled:bg-gray-400 border border-transparent',
    ghost:
      'bg-transparent text-[#0A0A0A] hover:bg-gray-100 hover:text-[#BC1E1E] disabled:text-gray-400 border border-transparent',
    outline:
      'bg-transparent text-[#BC1E1E] border border-[#BC1E1E] hover:bg-[#BC1E1E] hover:text-white disabled:border-gray-300 disabled:text-gray-400',
  }

  // Tailles
  const sizeClasses: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }

  const isDisabled = disabled || loading

  return (
    <button
      {...rest}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'font-medium tracking-wide rounded-sm',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-[#BC1E1E] focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-70',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <Spinner />
          {children}
        </span>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  )
}

/**
 * Petit spinner animé pour l'état de chargement.
 */
function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
