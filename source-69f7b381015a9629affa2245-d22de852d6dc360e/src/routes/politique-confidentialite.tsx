import { createFileRoute } from '@tanstack/react-router'
import { LegalPageLayout, Section } from '@/components/LegalPageLayout'
import { buildHead } from '@/lib/seo'

export const Route = createFileRoute('/politique-confidentialite')({
  head: () => buildHead({
    locale: 'fr',
    frPath: '/politique-confidentialite',
    enPath: '/en/privacy-policy',
    titleFr: 'Politique de confidentialité | JurisLinkia',
    titleEn: 'Privacy Policy | JurisLinkia',
    descFr: 'Politique de confidentialité de JurisLinkia, conforme à la Loi 25 du Québec et à la PIPEDA fédérale.',
    descEn: 'JurisLinkia privacy policy, compliant with Quebec Law 25 and Canada\'s PIPEDA.',
  }),
  component: PolitiqueConfidentialite,
})

function PolitiqueConfidentialite() {
  return (
    <LegalPageLayout
      locale="fr"
      title="Politique de confidentialité"
      subtitle="Conforme à la Loi 25 du Québec et à la PIPEDA fédérale"
    >
      <Section title="1. Responsable de la protection des renseignements personnels">
        <p>JurisLinkia Inc. désigne un responsable de la protection des renseignements personnels, conformément à la Loi sur la protection des renseignements personnels dans le secteur privé (LPRPSP), telle que modifiée par la Loi 25, ainsi qu'à la Loi sur la protection des renseignements personnels et les documents électroniques (PIPEDA).</p>
        <p className="mt-2">Pour toute question, écrivez à : <a href="mailto:info@jurislinkia.com" className="text-[#BC1E1E] hover:underline" style={{ fontWeight: 500 }}>info@jurislinkia.com</a></p>
      </Section>

      <Section title="2. Renseignements collectés">
        <p>JurisLinkia peut collecter :</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Pour les utilisateurs : prénom, nom, courriel, téléphone, province, ville et description de la situation juridique.</li>
          <li>Pour les avocats inscrits : nom, prénom, numéro de membre du Barreau, cabinet, ville, province, téléphone, courriel, années d'expérience et domaines de pratique.</li>
        </ul>
      </Section>

      <Section title="3. Finalités de la collecte">
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Mise en relation des utilisateurs avec un avocat spécialisé;</li>
          <li>Traitement des candidatures d'avocats;</li>
          <li>Communication avec les utilisateurs et avocats inscrits.</li>
        </ul>
      </Section>

      <Section title="4. Consentement">
        <p>En utilisant la plateforme et en soumettant un formulaire, vous consentez à la collecte et à l'utilisation de vos renseignements aux fins décrites. Vous pouvez retirer votre consentement en tout temps.</p>
      </Section>

      <Section title="5. Communication à des tiers">
        <p>JurisLinkia ne vend ni ne loue vos renseignements. Ils peuvent être partagés avec :</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>L'avocat membre du Barreau du Québec ou de l'Ontario auquel vous êtes référé, aux fins de prise de contact;</li>
          <li>Nos fournisseurs techniques (hébergement, infrastructure courriel), liés par des obligations de confidentialité;</li>
          <li>Les autorités lorsque la loi l'exige.</li>
        </ul>
      </Section>

      <Section title="6. Hébergement et transfert hors Québec">
        <p>La plateforme est hébergée sur des serveurs Netlify (États-Unis). Vos renseignements peuvent transiter à l'extérieur du Québec, dans le respect des protections contractuelles requises par la Loi 25.</p>
      </Section>

      <Section title="7. Vos droits (Loi 25 et PIPEDA)">
        <p>Vous disposez des droits suivants :</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Droit d'accès à vos renseignements;</li>
          <li>Droit de rectification;</li>
          <li>Droit à l'effacement;</li>
          <li>Droit à la portabilité des données;</li>
          <li>Droit de plainte auprès de la Commission d'accès à l'information du Québec ou du Commissariat à la protection de la vie privée du Canada.</li>
        </ul>
      </Section>

      <Section title="8. Sécurité">
        <p>Des mesures techniques et organisationnelles appropriées sont mises en œuvre pour protéger vos renseignements (chiffrement en transit, accès restreint, etc.).</p>
      </Section>

      <Section title="9. Conservation">
        <p>Les renseignements sont conservés uniquement pendant la durée nécessaire à la finalité de leur collecte, ou selon les obligations légales applicables.</p>
      </Section>

      <Section title="10. Témoins (cookies)">
        <p>Pour plus de détails, consultez notre <a href="/politique-cookies" className="text-[#BC1E1E] hover:underline" style={{ fontWeight: 500 }}>politique sur les témoins</a>.</p>
      </Section>

      <Section title="11. Mise à jour">
        <p>Cette politique peut être modifiée. La version en vigueur est celle publiée ici.</p>
        <p className="mt-2 text-xs">Dernière mise à jour : mai 2026</p>
      </Section>
    </LegalPageLayout>
  )
}
