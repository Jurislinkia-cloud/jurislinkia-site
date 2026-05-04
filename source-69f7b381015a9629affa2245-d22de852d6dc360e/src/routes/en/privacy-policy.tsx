import { createFileRoute } from '@tanstack/react-router'
import { LegalPageLayout, Section } from '@/components/LegalPageLayout'
import { buildHead } from '@/lib/seo'

export const Route = createFileRoute('/en/privacy-policy')({
  head: () => buildHead({
    locale: 'en',
    frPath: '/politique-confidentialite',
    enPath: '/en/privacy-policy',
    titleFr: 'Politique de confidentialité | JurisLinkia',
    titleEn: 'Privacy Policy | JurisLinkia',
    descFr: 'Politique de confidentialité de JurisLinkia.',
    descEn: 'JurisLinkia privacy policy, compliant with Quebec Law 25 and Canada\'s PIPEDA.',
  }),
  component: PrivacyPolicy,
})

function PrivacyPolicy() {
  return (
    <LegalPageLayout
      locale="en"
      title="Privacy Policy"
      subtitle="Compliant with Quebec Law 25 and Canada's PIPEDA"
    >
      <Section title="1. Privacy Officer">
        <p>JurisLinkia Inc. has appointed a privacy officer in accordance with Quebec's Act respecting the protection of personal information in the private sector (as amended by Law 25) and the federal Personal Information Protection and Electronic Documents Act (PIPEDA).</p>
        <p className="mt-2">For any question, write to: <a href="mailto:info@jurislinkia.com" className="text-[#BC1E1E] hover:underline" style={{ fontWeight: 500 }}>info@jurislinkia.com</a></p>
      </Section>

      <Section title="2. Information collected">
        <p>JurisLinkia may collect:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>From users: first name, last name, email, phone number, province, city, and a description of the legal situation.</li>
          <li>From registering lawyers: first name, last name, Bar membership number, firm, city, province, phone, email, years of experience, and areas of practice.</li>
        </ul>
      </Section>

      <Section title="3. Purposes of collection">
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>To connect users with a specialized lawyer;</li>
          <li>To process lawyer applications;</li>
          <li>To communicate with users and registered lawyers.</li>
        </ul>
      </Section>

      <Section title="4. Consent">
        <p>By using the platform and submitting a form, you consent to the collection and use of your information for the purposes described. You may withdraw your consent at any time.</p>
      </Section>

      <Section title="5. Disclosure to third parties">
        <p>JurisLinkia does not sell or rent your information. It may be shared with:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>The Quebec or Ontario Bar member to whom you are referred, for the purpose of contacting you;</li>
          <li>Our technical service providers (hosting, email infrastructure), bound by confidentiality obligations;</li>
          <li>Authorities, when required by law.</li>
        </ul>
      </Section>

      <Section title="6. Hosting and transfers outside Quebec / Canada">
        <p>The platform is hosted on Netlify servers (United States). Your information may transit outside Quebec or Canada, with the contractual protections required by Law 25 and PIPEDA in place.</p>
      </Section>

      <Section title="7. Your rights (Law 25 and PIPEDA)">
        <p>You have the following rights:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Right of access to your personal information;</li>
          <li>Right of rectification;</li>
          <li>Right to erasure;</li>
          <li>Right to data portability;</li>
          <li>Right to file a complaint with the Commission d'accès à l'information du Québec or the Office of the Privacy Commissioner of Canada.</li>
        </ul>
      </Section>

      <Section title="8. Security">
        <p>Appropriate technical and organizational measures are in place to protect your information (encryption in transit, restricted access, etc.).</p>
      </Section>

      <Section title="9. Retention">
        <p>Information is retained only for as long as necessary for the purpose for which it was collected, or as required by applicable law.</p>
      </Section>

      <Section title="10. Cookies">
        <p>For more details, see our <a href="/en/cookies-policy" className="text-[#BC1E1E] hover:underline" style={{ fontWeight: 500 }}>cookies policy</a>.</p>
      </Section>

      <Section title="11. Updates">
        <p>This policy may be updated. The version in force is the one published on this page.</p>
        <p className="mt-2 text-xs">Last updated: May 2026</p>
      </Section>
    </LegalPageLayout>
  )
}
