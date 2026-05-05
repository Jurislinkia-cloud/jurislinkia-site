import { useEffect, useState } from 'react'
import {
  createFileRoute,
  Outlet,
  useNavigate,
  useLocation,
} from '@tanstack/react-router'
import { Sidebar, type SidebarSection } from '@/components/saas/Sidebar'
import { Topbar } from '@/components/saas/Topbar'
import { SupportCard } from '@/components/saas/SupportCard'
import { getSupabase, getCurrentUserRole } from '@/lib/supabase'
import { tSaas } from '@/lib/saas-i18n'
import type { Locale } from '@/lib/i18n'

export const Route = createFileRoute('/portail')({
  component: PortailLayout,
})

type AuthState =
  | { status: 'loading' }
  | { status: 'unauthenticated' }
  | { status: 'wrong_role' }
  | { status: 'authenticated'; userName: string; userEmail: string }

/**
 * Layout commun à toutes les pages du portail avocat (FR).
 */
function PortailLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const locale: Locale = 'fr'
  const t = tSaas(locale)

  const [authState, setAuthState] = useState<AuthState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    async function checkAuth() {
      try {
        const supabase = getSupabase()
        const userResult = await supabase.auth.getUser()
        const user = userResult.data?.user

        if (cancelled) return

        if (!user) {
          setAuthState({ status: 'unauthenticated' })
          return
        }

        const role = await getCurrentUserRole()
        if (cancelled) return

        if (role === 'admin') {
          setAuthState({ status: 'wrong_role' })
          return
        }

        let fullName = user.email ?? 'Maître'
        try {
          const lawyerResult = await supabase
            .from('lawyers')
            .select('first_name, last_name, email')
            .eq('id', user.id)
            .maybeSingle()

          const lawyer = lawyerResult.data as
            | { first_name: string | null; last_name: string | null; email: string | null }
            | null

          if (lawyer) {
            const composed = `${lawyer.first_name ?? ''} ${lawyer.last_name ?? ''}`.trim()
            if (composed) fullName = composed
          }
        } catch {
          // Ignore : on garde l'email comme fallback
        }

        if (cancelled) return

        setAuthState({
          status: 'authenticated',
          userName: fullName,
          userEmail: user.email ?? '',
        })
      } catch (err) {
        console.error('[PortailLayout] Auth check failed:', err)
        if (!cancelled) setAuthState({ status: 'unauthenticated' })
      }
    }

    checkAuth()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (authState.status === 'unauthenticated') {
      navigate({ to: '/portail-avocats' })
    } else if (authState.status === 'wrong_role') {
      navigate({ to: '/admin' })
    }
  }, [authState.status, navigate])

  async function handleSignOut() {
    const supabase = getSupabase()
    await supabase.auth.signOut()
    navigate({ to: '/portail-avocats' })
  }

  if (authState.status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p
          className="text-sm text-[#6B7280]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {t.common.loading}
        </p>
      </div>
    )
  }

  if (
    authState.status === 'unauthenticated' ||
    authState.status === 'wrong_role'
  ) {
    return null
  }

  const sidebarSections: SidebarSection[] = [
    {
      items: [
        {
          label: t.portal.nav.dashboard,
          href: '/portail',
          icon: <NavIcon path="M3 12l9-9 9 9M5 10v10h4v-6h6v6h4V10" />,
        },
        {
          label: t.portal.nav.newLeads,
          href: '/portail/dossiers',
          icon: <NavIcon path="M22 12h-6l-2 3h-4l-2-3H2 M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />,
        },
        {
          label: t.portal.nav.conversations,
          href: '/portail/conversations',
          icon: <NavIcon path="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
        },
        {
          label: t.portal.nav.consultations,
          href: '/portail/consultations',
          icon: <NavIcon path="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" />,
        },
      ],
    },
    {
      title: 'Mon compte',
      items: [
        {
          label: t.portal.nav.profile,
          href: '/portail/profil',
          icon: <NavIcon path="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 7a4 4 0 100 8 4 4 0 000-8z" />,
        },
        {
          label: t.portal.nav.availability,
          href: '/portail/disponibilites',
          icon: <NavIcon path="M12 8v4l3 3 M12 22a10 10 0 100-20 10 10 0 000 20z" />,
        },
        {
          label: t.portal.nav.credits,
          href: '/portail/credits',
          icon: <NavIcon path="M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2zM1 10h22" />,
        },
        {
          label: t.portal.nav.bankAccount,
          href: '/portail/compte-bancaire',
          icon: <NavIcon path="M3 21h18 M3 10h18 M5 6l7-3 7 3 M4 10v11 M20 10v11 M8 14v3 M12 14v3 M16 14v3" />,
        },
        {
          label: t.portal.nav.history,
          href: '/portail/historique',
          icon: <NavIcon path="M3 3v5h5 M3.05 13a9 9 0 102.4-7.27L3 8 M12 7v5l4 2" />,
        },
      ],
    },
  ]

  const breadcrumbs = computeBreadcrumbs(location.pathname, t)

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      <Sidebar
        sections={sidebarSections}
        user={{
          name: authState.userName,
          email: authState.userEmail,
          role: 'Avocat',
        }}
        onSignOut={handleSignOut}
        locale={locale}
        brandLabel="JURISLINKIA"
        brandHref="/portail"
        footerSlot={<SupportCard locale={locale} variant="sidebar" />}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar
          breadcrumbs={breadcrumbs}
          locale={locale}
          alternateLocaleHref="/en/portal"
        />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function computeBreadcrumbs(
  pathname: string,
  t: ReturnType<typeof tSaas>
): Array<{ label: string; href?: string }> {
  const portailHome = { label: 'Portail', href: '/portail' }

  if (pathname === '/portail' || pathname === '/portail/') {
    return [{ label: t.portal.nav.dashboard }]
  }

  const map: Record<string, string> = {
    '/portail/dossiers': t.portal.nav.newLeads,
    '/portail/conversations': t.portal.nav.conversations,
    '/portail/consultations': t.portal.nav.consultations,
    '/portail/profil': t.portal.nav.profile,
    '/portail/disponibilites': t.portal.nav.availability,
    '/portail/credits': t.portal.nav.credits,
    '/portail/compte-bancaire': t.portal.nav.bankAccount,
    '/portail/historique': t.portal.nav.history,
  }

  const label = map[pathname]
  if (label) return [portailHome, { label }]

  return [portailHome]
}

function NavIcon({ path }: { path: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  )
}
