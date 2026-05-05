import type { ReactNode } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { cn, getInitials } from '@/lib/saas-utils'
import type { Locale } from '@/lib/i18n'

export interface SidebarItem {
  label: string
  href: string
  icon?: ReactNode
  badge?: string | number
  disabled?: boolean
}

export interface SidebarSection {
  title?: string
  items: SidebarItem[]
}

interface SidebarProps {
  sections: SidebarSection[]
  user?: {
    name: string
    email: string
    role?: string
  }
  onSignOut?: () => void
  locale?: Locale
  brandLabel?: string
  brandHref?: string
  footerSlot?: ReactNode
}

/**
 * Barre de navigation latérale pour le portail avocat et la console admin.
 *
 * @example
 * <Sidebar
 *   sections={[
 *     { items: [
 *       { label: 'Accueil', href: '/portail', icon: <Home /> },
 *       { label: 'Nouveaux dossiers', href: '/portail/dossiers', icon: <Inbox />, badge: 3 },
 *     ]},
 *   ]}
 *   user={{ name: 'Maître Tremblay', email: 'tremblay@avocat.ca' }}
 *   onSignOut={handleSignOut}
 * />
 */
export function Sidebar({
  sections,
  user,
  onSignOut,
  locale = 'fr',
  brandLabel = 'JURISLINKIA',
  brandHref = '/',
  footerSlot,
}: SidebarProps) {
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (href: string): boolean => {
    if (href === currentPath) return true
    // Match les sous-routes (ex: /portail/dossiers/123 doit matcher /portail/dossiers)
    if (href !== '/' && currentPath.startsWith(href + '/')) return true
    return false
  }

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 w-64 shrink-0 bg-white border-r border-[#E5E7EB]"
      aria-label="Navigation principale"
    >
      {/* En-tête avec logo / nom de marque */}
      <header className="px-6 py-6 border-b border-[#E5E7EB]">
        <Link
          to={brandHref}
          className="block no-underline"
        >
          <span
            className="font-serif text-[#0A0A0A] tracking-wider"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 500,
              fontSize: '1.125rem',
              letterSpacing: '0.05em',
            }}
          >
            {brandLabel}
          </span>
          <div
            className="h-[2px] w-8 bg-[#BC1E1E] mt-2"
            aria-hidden="true"
          />
        </Link>
      </header>

      {/* Navigation principale */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className={sectionIdx > 0 ? 'mt-6' : ''}>
            {section.title && (
              <h3
                className="px-3 mb-2 text-[#9CA3AF]"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                {section.title}
              </h3>
            )}
            <ul className="space-y-1 list-none p-0 m-0">
              {section.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    {item.disabled ? (
                      <span
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-sm text-sm',
                          'text-[#9CA3AF] cursor-not-allowed'
                        )}
                      >
                        {item.icon && (
                          <span className="shrink-0 w-5 h-5">{item.icon}</span>
                        )}
                        <span className="flex-1 truncate">{item.label}</span>
                      </span>
                    ) : (
                      <Link
                        to={item.href}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-sm text-sm no-underline',
                          'transition-colors duration-150',
                          active
                            ? 'bg-[#0A0A0A] text-white font-medium'
                            : 'text-[#1A1A1A] hover:bg-[#F5F5F5] hover:text-[#BC1E1E]'
                        )}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {item.icon && (
                          <span
                            className={cn(
                              'shrink-0 w-5 h-5 flex items-center justify-center',
                              active ? 'text-white' : 'text-[#6B7280]'
                            )}
                          >
                            {item.icon}
                          </span>
                        )}
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge !== undefined && (
                          <span
                            className={cn(
                              'inline-flex items-center justify-center',
                              'min-w-[20px] h-5 px-1.5 text-xs font-medium rounded-full',
                              active
                                ? 'bg-white text-[#0A0A0A]'
                                : 'bg-[#BC1E1E] text-white'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Slot personnalisé (par exemple : carte support) */}
      {footerSlot && (
        <div className="px-3 py-3 border-t border-[#E5E7EB]">
          {footerSlot}
        </div>
      )}

      {/* Bloc utilisateur en bas */}
      {user && (
        <footer className="border-t border-[#E5E7EB] px-3 py-3">
          <div className="flex items-center gap-3 px-2 py-2">
            {/* Avatar avec initiales */}
            <div
              className="shrink-0 w-9 h-9 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-xs font-medium"
              aria-hidden="true"
            >
              {getInitials(user.name)}
            </div>
            {/* Nom + email */}
            <div className="min-w-0 flex-1">
              <p
                className="text-sm font-medium text-[#0A0A0A] truncate m-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {user.name}
              </p>
              <p
                className="text-xs text-[#6B7280] truncate m-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {user.role || user.email}
              </p>
            </div>
          </div>
          {onSignOut && (
            <button
              type="button"
              onClick={onSignOut}
              className={cn(
                'w-full mt-1 px-3 py-2 text-xs text-[#6B7280] text-left rounded-sm',
                'hover:bg-[#F5F5F5] hover:text-[#BC1E1E] transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-[#BC1E1E]'
              )}
              style={{
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.05em',
              }}
            >
              {locale === 'en' ? 'Sign out' : 'Déconnexion'}
            </button>
          )}
        </footer>
      )}
    </aside>
  )
}
