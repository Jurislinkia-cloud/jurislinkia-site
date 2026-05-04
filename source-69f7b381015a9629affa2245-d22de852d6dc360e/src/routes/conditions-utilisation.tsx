import { createFileRoute } from '@tanstack/react-router'
import { LegalPageLayout, Section } from '@/components/LegalPageLayout'
import { buildHead } from '@/lib/seo'

export const Route = createFileRoute('/conditions-utilisation')({
  head: () => buildHead({
    locale: 'fr',
    frPath: '/conditions-utilisation',
    enPath: '/en/terms-of-use',
    titleFr: 'Conditions d\'utilisation | JurisLinkia',
    titleEn: 'Terms of Use | JurisLinkia',
    descFr: 'Conditions d\'utilisation du service JurisLinkia, plateforme de référencement d\'avocats au Québec et en Ontario.',
    descEn: 'Terms of Use for the JurisLinkia lawyer referral service in Quebec and Ontario.',
  }),
  component: ConditionsUtilisation,
})

function ConditionsUtilisation() {
  return (
    <LegalPageLayout locale="fr" title="Conditions d'utilisation">
      <Section title="1. Description du service">
        <p>JurisLinkia est une plateforme de référencement qui met en relation les utilisateurs avec des avocats membres du Barreau du Québec ou du Barreau de l'Ontario. JurisLinkia ne fournit aucun avis juridique.</p>
      </Section>

      <Section title="2. Acceptation des conditions">
        <p>En utilisant la plateforme, vous acceptez les présentes conditions ainsi que la politique de confidentialité et la politique sur les témoins.</p>
      </Section>

      <Section title="3. Appel téléphonique gratuit">
        <p>L'avocat auquel vous êtes référé s'engage à offrir gratuitement un premier appel téléphonique. Cet appel ne crée pas de mandat professionnel et ne constitue pas un avis juridique.</p>
      </Section>

      <Section title="4. Limitation de responsabilité">
        <p>JurisLinkia Inc. agit uniquement à titre d'intermédiaire. Les avocats référencés sont seuls responsables de leurs services professionnels et de leurs avis juridiques. JurisLinkia ne peut être tenue responsable des conseils, actes ou omissions des avocats, ni de l'issue de votre dossier.</p>
      </Section>

      <Section title="5. Obligations de l'utilisateur">
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Fournir des informations exactes et complètes;</li>
          <li>Utiliser la plateforme de bonne foi et conformément aux lois applicables;</li>
          <li>Ne pas tenter de compromettre la sécurité ou l'intégrité de la plateforme.</li>
        </ul>
      </Section>

      <Section title="6. Propriété intellectuelle">
        <p>L'ensemble du contenu de la plateforme (textes, marques, logos, logiciels) est protégé par le droit d'auteur et les marques de commerce. Toute reproduction non autorisée est interdite.</p>
      </Section>

      <Section title="7. Modification du service">
        <p>JurisLinkia peut modifier, suspendre ou interrompre le service en tout temps, sans préavis.</p>
      </Section>

      <Section title="8. Loi applicable et juridiction">
        <p>Les présentes conditions sont régies par les lois applicables dans la province de Québec, Canada. Tout litige sera soumis à la compétence exclusive des tribunaux du district de Montréal.</p>
      </Section>

      <Section title="9. Coordonnées">
        <p>JurisLinkia Inc. — <a href="mailto:info@jurislinkia.com" className="text-[#BC1E1E] hover:underline" style={{ fontWeight: 500 }}>info@jurislinkia.com</a></p>
      </Section>

      <p className="text-xs">Dernière mise à jour : mai 2026</p>
    </LegalPageLayout>
  )
}
