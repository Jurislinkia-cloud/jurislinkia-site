import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/components/HomePage'
import { buildHead } from '@/lib/seo'

export const Route = createFileRoute('/')({
  head: () => buildHead({
    locale: 'fr',
    frPath: '/',
    enPath: '/en/',
    titleFr: "Avocat d'affaires Québec et Ontario | Membres du Barreau | JurisLinkia",
    titleEn: 'Business Lawyer Quebec and Ontario | Bar Members | JurisLinkia',
    descFr: "Trouvez un avocat d'affaires membre du Barreau du Québec ou du Barreau de l'Ontario en 2 minutes. Spécialistes en fiscalité, M&A, incorporation, contrats, litige. Appel téléphonique gratuit de 15 minutes.",
    descEn: 'Find a business lawyer member of the Quebec Bar or Law Society of Ontario in 2 minutes. Specialists in tax, M&A, incorporation, contracts, litigation. Free 15-minute phone call.',
  }),
  component: () => <HomePage locale="fr" />,
})
