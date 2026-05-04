import { createFileRoute } from '@tanstack/react-router'
import { LawyersPortalPage } from '@/components/LawyersPortalPage'
import { buildHead } from '@/lib/seo'

export const Route = createFileRoute('/en/lawyers-portal')({
  head: () => buildHead({
    locale: 'en',
    frPath: '/portail-avocats',
    enPath: '/en/lawyers-portal',
    titleFr: 'Portail avocats | Rejoignez le réseau JurisLinkia',
    titleEn: 'Lawyers Portal | Join the JurisLinkia Network',
    descFr: 'Plateforme de référencement pour avocats en droit des affaires au Québec et en Ontario.',
    descEn: 'Referral platform for business law lawyers in Quebec and Ontario. Free registration at launch.',
  }),
  component: () => <LawyersPortalPage locale="en" />,
})
