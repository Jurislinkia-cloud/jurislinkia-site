import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { Sidebar } from '@/components/saas/Sidebar'
import { Topbar } from '@/components/saas/Topbar'
import { SupportCard } from '@/components/saas/SupportCard'
import { tSaas } from '@/lib/saas-i18n'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  const location = useLocation()
  const t = tSaas('fr')

  const sidebarSections = [
    {
      items: [
        { label: t.admin.nav.dashboard, href: '/admin' },
        { label: t.admin.nav.candidates, href: '/admin/candidatures' },
        { label: t.admin.nav.lawyers, href: '/admin/avocats' },
      ],
    },
    {
      title: 'Operations',
      items: [
        { label: t.admin.nav.leads, href: '/admin/dossiers' },
        { label: t.admin.nav.expiredLeads, href: '/admin/dossiers-expires' },
        { label: t.admin.nav.consultations, href: '/admin/consultations' },
      ],
    },
    {
      title: 'Configuration',
      items: [
        { label: t.admin.nav.payments, href: '/admin/paiements' },
        { label: t.admin.nav.pricingTiers, href: '/admin/paliers-tarifs' },
      ],
    },
  ]

  const breadcrumbs = computeBreadcrumbs(location.pathname)

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      <Sidebar
        sections={sidebarSections}
        user={{
          name: 'Amal',
          email: 'admin@jurislinkia.com',
          role: 'Administratrice',
        }}
        locale="fr"
        brandLabel="JURISLINKIA ADMIN"
        brandHref="/admin"
        footerSlot={<SupportCard locale="fr" variant="sidebar" />}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar
          breadcrumbs={breadcrumbs}
          locale="fr"
          alternateLocaleHref="/en/admin"
        />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function computeBreadcrumbs(pathname: string) {
  const home = { label: 'Admin', href: '/admin' }

  if (pathname === '/admin' || pathname === '/admin/') {
    return [{ label: 'Tableau de bord' }]
  }

  const map: Record<string, string> = {
    '/admin/candidatures': 'Candidatures',
    '/admin/avocats': 'Avocats',
    '/admin/dossiers': 'Dossiers',
    '/admin/dossiers-expires': 'Dossiers expires',
    '/admin/consultations': 'Consultations',
    '/admin/paiements': 'Paiements',
    '/admin/paliers-tarifs': 'Paliers de tarifs',
  }

  const label = map[pathname]
  if (label) return [home, { label }]

  return [home]
}
