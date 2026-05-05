import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/saas-utils'
import type { Locale } from '@/lib/i18n'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface TopbarProps {
  title?: string
  breadcrumbs?: BreadcrumbItem[]
  locale?: Locale
  alternateLocaleHref?: string
  notificationCount?: number
  onNotificationClick?: () => void
  rightSlot?: ReactNode
  className?: string
}

/**
 * Barre supérieure fine du SaaS Jurislinkia.
 *
 * @example
 * <Topbar
 *   title="Nouveaux dossiers"
 *   breadcrumbs={[
 *     { label: 'Portail', href: '/portail' },
 *     { label: 'Nouveaux dossiers' },
 *   ]}
 *   locale="fr"
 *   alternateLocaleHref="/en/portal/cases"
 *   notificationCount={3}
 *   onNotificationClick={() => setShowNotifs(true)}
 * />
 */
export function Topbar({
  title,
  breadcrumbs,
  locale = 'fr',
  alternateLocaleHref,
  notificationCount,
  onNotificationClick,
  rightSlot,
  className,
}: TopbarProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30',
        'flex items-center justify-between gap-4',
        'h-14 px-6',
        'bg-white border-b border-[#E5E7EB]',
        className
      )}
    >
      {/* Côté gauche : breadcrumbs ou titre */}
      <div className="min-w-0 flex-1">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumbs items={breadcrumbs} />
        ) : title ? (
          <h1
            className="m-0 text-[#0A0A0A] truncate"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 500,
              fontSize: '1.125rem',
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h1>
        ) : null}
      </div>

      {/* Côté droit : sélecteur langue + notifs + slot custom */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Slot custom (ex: bouton "Acheter crédits") */}
        {rightSlot}

        {/* Sélecteur de langue */}
        {alternateLocaleHref && (
          <LangSwitch
            currentLocale={locale}
            alternateHref={alternateLocaleHref}
          />
        )}

        {/* Cloche de notifications */}
        {onNotificationClick !== undefined && (
          <button
            type="button"
            onClick={onNotificationClick}
            className={cn(
              'relative inline-flex items-center justify-center',
              'w-9 h-9 rounded-sm',
              'text-[#6B7280] hover:text-[#0A0A0A] hover:bg-[#F5F5F5]',
              'transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[#BC1E1E]'
            )}
            aria-label={
              locale === 'en' ? 'Notifications' : 'Notifications'
            }
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {notificationCount !== undefined && notificationCount > 0 && (
              <span
                className={cn(
                  'absolute -top-0.5 -right-0.5',
                  'inline-flex items-center justify-center',
                  'min-w-[18px] h-[18px] px-1',
                  'text-[10px] font-medium text-white',
                  'bg-[#BC1E1E] rounded-full'
                )}
              >
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  )
}

/**
 * Fil d'Ariane (breadcrumbs).
 */
function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="flex items-center gap-2 list-none m-0 p-0 min-w-0">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <li
              key={idx}
              className="flex items-center gap-2 min-w-0"
            >
              {idx > 0 && (
                <span
                  className="text-[#D1D5DB] shrink-0"
                  aria-hidden="true"
                >
                  ›
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className={cn(
                    'text-sm text-[#6B7280] hover:text-[#BC1E1E] no-underline truncate',
                    'transition-colors'
                  )}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    'text-sm truncate',
                    isLast
                      ? 'text-[#0A0A0A] font-medium'
                      : 'text-[#6B7280]'
                  )}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/**
 * Sélecteur de langue FR/EN compact.
 */
function LangSwitch({
  currentLocale,
  alternateHref,
}: {
  currentLocale: Locale
  alternateHref: string
}) {
  const otherLocale: Locale = currentLocale === 'fr' ? 'en' : 'fr'

  return (
    <div
      className="inline-flex items-center text-xs"
      style={{
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.05em',
      }}
    >
      <span
        className={cn(
          'px-2 py-1 rounded-sm',
          currentLocale === 'fr'
            ? 'text-[#0A0A0A] font-medium'
            : 'text-[#9CA3AF]'
        )}
      >
        FR
      </span>
      <span className="text-[#D1D5DB]" aria-hidden="true">|</span>
      <Link
        to={alternateHref}
        className={cn(
          'px-2 py-1 rounded-sm no-underline transition-colors',
          currentLocale === 'en'
            ? 'text-[#0A0A0A] font-medium'
            : 'text-[#9CA3AF] hover:text-[#BC1E1E]'
        )}
      >
        {otherLocale.toUpperCase()}
      </Link>
      {currentLocale === 'en' && (
        <Link
          to={alternateHref}
          className="px-2 py-1 text-[#9CA3AF] hover:text-[#BC1E1E] no-underline transition-colors"
        >
          FR
        </Link>
      )}
    </div>
  )
}
