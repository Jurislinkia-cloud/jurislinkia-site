import type { ReactNode } from 'react'
import { cn } from '@/lib/saas-utils'

interface StatsCardProps {
  label: string
  value: string | number
  unit?: string
  icon?: ReactNode
  trend?: {
    value: string
    direction?: 'up' | 'down' | 'neutral'
  }
  helpText?: string
  variant?: 'default' | 'highlighted' | 'warning' | 'success'
  className?: string
}

/**
 * Carte de statistique pour les tableaux de bord.
 *
 * @example
 * <StatsCard
 *   label="Crédits disponibles"
 *   value={15}
 *   unit="dossiers"
 *   icon={<Coins />}
 *   trend={{ value: '+5', direction: 'up' }}
 * />
 */
export function StatsCard({
  label,
  value,
  unit,
  icon,
  trend,
  helpText,
  variant = 'default',
  className,
}: StatsCardProps) {
  const variantClasses: Record<NonNullable<StatsCardProps['variant']>, string> = {
    default: 'bg-white border-[#E5E7EB]',
    highlighted: 'bg-[#FEF3F2] border-[#BC1E1E]/30',
    warning: 'bg-[#FFF7ED] border-[#EA8A29]/30',
    success: 'bg-[#F0FDF4] border-[#10B981]/30',
  }

  const valueColorClasses: Record<NonNullable<StatsCardProps['variant']>, string> = {
    default: 'text-[#0A0A0A]',
    highlighted: 'text-[#BC1E1E]',
    warning: 'text-[#EA8A29]',
    success: 'text-[#10B981]',
  }

  const trendColorClasses: Record<NonNullable<NonNullable<StatsCardProps['trend']>['direction']>, string> = {
    up: 'text-[#10B981]',
    down: 'text-[#BC1E1E]',
    neutral: 'text-[#6B7280]',
  }

  return (
    <div
      className={cn(
        'p-6 rounded-sm border',
        'transition-all duration-200',
        variantClasses[variant],
        className
      )}
    >
      {/* Header avec libellé et icône */}
      <div className="flex items-start justify-between mb-4">
        <span
          className="eyebrow text-[#6B7280]"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
        {icon && (
          <span className={cn('shrink-0', valueColorClasses[variant])}>
            {icon}
          </span>
        )}
      </div>

      {/* Valeur principale */}
      <div className="flex items-baseline gap-2 mb-2">
        <span
          className={cn(
            'font-serif font-medium leading-none',
            valueColorClasses[variant]
          )}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2.25rem',
            letterSpacing: '-0.01em',
          }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-sm text-[#6B7280] font-normal">
            {unit}
          </span>
        )}
      </div>

      {/* Tendance (optionnelle) */}
      {trend && (
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#E5E7EB]">
          <span
            className={cn(
              'text-xs font-medium',
              trendColorClasses[trend.direction ?? 'neutral']
            )}
          >
            {trend.direction === 'up' && '↗ '}
            {trend.direction === 'down' && '↘ '}
            {trend.value}
          </span>
          {helpText && (
            <span className="text-xs text-[#9CA3AF]">
              {helpText}
            </span>
          )}
        </div>
      )}

      {/* Help text seul (sans tendance) */}
      {helpText && !trend && (
        <p className="text-xs text-[#9CA3AF] mt-2">
          {helpText}
        </p>
      )}
    </div>
  )
}
