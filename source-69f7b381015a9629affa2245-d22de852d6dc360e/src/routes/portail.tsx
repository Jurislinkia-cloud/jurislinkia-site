import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { Sidebar } from '@/components/saas/Sidebar'
import { Topbar } from '@/components/saas/Topbar'
import { SupportCard } from '@/components/saas/SupportCard'
import { tSaas } from '@/lib/saas-i18n'

export const Route = createFileRoute('/portail')({
  component: PortailLayout,
})

function PortailLayout() {
  const location = useLocation()
  const t = tSaas('fr')

  const sidebarSections = [
    {
      items: [
        { label: t.portal.nav.dashboard, href: '/portail' },
        { label: t.portal.nav.newLeads, href: '/portail/dossiers' },
        { label: t.portal.nav.conversations, href: '/portail/conversations' },
        { label: t.portal.nav.consultations, href: '/portail/consultations' },
      ],
    },
    {
      title: 'Mon compte',
      items: [
        { label: t.portal.nav.profile, href: '/portail/profil' },
        { label: t.portal.nav.availability, href: '/portail/disponibilites' },
        { label: t.portal.nav.credits, href: '/portail/credits' },
        { label: t.portal.nav.bankAccount, href: '/portail/compte-bancaire' },
        { label: t.portal.nav.history, href: '/portail/historique' },
      ],
    },
  ]

  const breadcrumbs = computeBreadcrumbs(location.pathname)

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      <Sidebar
        sections={sidebarSections}
        user={{
          name: 'Maître Demo',
          email: 'demo@jurislinkia.com',
          role: 'Avocat',
        }}
        locale="fr"
        brandLabel="JURISLINKIA"
        brandHref="/portail"
        footerSlot={<SupportCard locale="fr" variant="sidebar" />}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar
          breadcrumbs={breadcrumbs}
          locale="fr"
          alternateLocaleHref="/en/portal"
        />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function computeBreadcrumbs(pathname: string) {
  const home = { label: 'Portail', href: '/portail' }

  if (pathname === '/portail' || pathname === '/portail/') {
    return [{ label: 'Tableau de bord' }]
  }

  const map: Record<string, string> = {
    '/portail/dossiers': 'Nouveaux dossiers',
    '/portail/conversations': 'Conversations',
    '/portail/consultations': 'Mes consultations',
    '/portail/profil': 'Profil',
    '/portail/disponibilites': 'Disponibilités',
    '/portail/credits': 'Crédits',
    '/portail/compte-bancaire': 'Compte bancaire',
    '/portail/historique': 'Historique',
  }

  const label = map[pathname]
  if (label) return [home, { label }]

  return [home]
}
