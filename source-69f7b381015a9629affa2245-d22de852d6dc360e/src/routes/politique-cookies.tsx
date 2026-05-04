import { createFileRoute } from '@tanstack/react-router'
import { LegalPageLayout, Section } from '@/components/LegalPageLayout'
import { buildHead } from '@/lib/seo'

export const Route = createFileRoute('/politique-cookies')({
  head: () => buildHead({
    locale: 'fr',
    frPath: '/politique-cookies',
    enPath: '/en/cookies-policy',
    titleFr: 'Politique sur les témoins | JurisLinkia',
    titleEn: 'Cookies Policy | JurisLinkia',
    descFr: 'Politique de JurisLinkia sur les témoins (cookies) — types utilisés et gestion par l\'utilisateur.',
    descEn: 'JurisLinkia cookies policy — types used and how to manage them.',
  }),
  component: PolitiqueCookies,
})

function PolitiqueCookies() {
  return (
    <LegalPageLayout locale="fr" title="Politique sur les témoins">
      <Section title="1. Qu'est-ce qu'un témoin?">
        <p>Un témoin (cookie) est un petit fichier déposé sur votre appareil par un site web pour mémoriser certaines informations (préférences, état de session, statistiques, etc.).</p>
      </Section>

      <Section title="2. Types de témoins utilisés">
        <ul className="mt-2 space-y-2 list-disc list-inside">
          <li><strong className="text-[#000000]">Témoins essentiels</strong> — strictement nécessaires au fonctionnement du site (préférences linguistiques, sécurité de session). Ne peuvent être désactivés.</li>
          <li><strong className="text-[#000000]">Témoins de préférences</strong> — mémorisent vos choix (par exemple, votre langue préférée).</li>
          <li><strong className="text-[#000000]">Témoins analytiques</strong> — nous aident à comprendre l'utilisation du site de façon anonymisée. Optionnels.</li>
          <li><strong className="text-[#000000]">Témoins marketing</strong> — non utilisés actuellement par JurisLinkia.</li>
        </ul>
      </Section>

      <Section title="3. Témoins tiers">
        <p>Aucun témoin de suivi publicitaire tiers n'est déposé sur la plateforme. Notre infrastructure (Netlify) peut utiliser des témoins techniques requis pour la livraison du site.</p>
      </Section>

      <Section title="4. Gestion de vos préférences">
        <p>Vous pouvez accepter, refuser ou personnaliser les témoins non essentiels via la bannière affichée à votre première visite. Vous pouvez aussi gérer les témoins directement dans votre navigateur :</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Chrome : Paramètres → Confidentialité et sécurité → Témoins</li>
          <li>Safari : Préférences → Confidentialité</li>
          <li>Firefox : Paramètres → Vie privée et sécurité</li>
        </ul>
      </Section>

      <Section title="5. Conservation">
        <p>La plupart des témoins sont conservés pour une durée maximale de 12 mois, sauf s'ils sont essentiels à la session, auquel cas ils expirent à la fermeture du navigateur.</p>
      </Section>

      <Section title="6. Mise à jour">
        <p>Cette politique peut être modifiée. La version en vigueur est celle publiée ici.</p>
        <p className="mt-2 text-xs">Dernière mise à jour : mai 2026</p>
      </Section>
    </LegalPageLayout>
  )
}
