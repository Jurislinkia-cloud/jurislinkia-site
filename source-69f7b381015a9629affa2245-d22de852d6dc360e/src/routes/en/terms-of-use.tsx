import { createFileRoute } from '@tanstack/react-router'
import { LegalPageLayout, Section } from '@/components/LegalPageLayout'
import { buildHead } from '@/lib/seo'

export const Route = createFileRoute('/en/terms-of-use')({
  head: () => buildHead({
    locale: 'en',
    frPath: '/conditions-utilisation',
    enPath: '/en/terms-of-use',
    titleFr: 'Conditions d\'utilisation | JurisLinkia',
    titleEn: 'Terms of Use | JurisLinkia',
    descFr: 'Conditions d\'utilisation du service JurisLinkia.',
    descEn: 'Terms of Use for the JurisLinkia lawyer referral service in Quebec and Ontario.',
  }),
  component: TermsOfUse,
})

function TermsOfUse() {
  return (
    <LegalPageLayout locale="en" title="Terms of Use">
      <Section title="1. Service description">
        <p>JurisLinkia is a referral platform that connects users with lawyers who are members of the Quebec Bar or the Ontario Bar. JurisLinkia does not provide legal advice.</p>
      </Section>

      <Section title="2. Acceptance of terms">
        <p>By using the platform, you agree to these Terms of Use along with the Privacy Policy and the Cookies Policy.</p>
      </Section>

      <Section title="3. Free phone call">
        <p>The lawyer to whom you are referred commits to providing a free first telephone call. This phone call does not create a professional retainer and does not constitute legal advice.</p>
      </Section>

      <Section title="4. Limitation of liability">
        <p>JurisLinkia Inc. acts solely as an intermediary. The referenced lawyers are solely responsible for their professional services and legal advice. JurisLinkia cannot be held liable for the lawyers' advice, acts or omissions, nor for the outcome of your case.</p>
      </Section>

      <Section title="5. User obligations">
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Provide accurate and complete information;</li>
          <li>Use the platform in good faith and in compliance with applicable laws;</li>
          <li>Do not attempt to compromise the security or integrity of the platform.</li>
        </ul>
      </Section>

      <Section title="6. Intellectual property">
        <p>All content on the platform (text, trademarks, logos, software) is protected by copyright and trademark laws. Unauthorized reproduction is prohibited.</p>
      </Section>

      <Section title="7. Service modification">
        <p>JurisLinkia may modify, suspend or discontinue the service at any time, without notice.</p>
      </Section>

      <Section title="8. Governing law and jurisdiction">
        <p>These Terms are governed by the laws applicable in the Province of Quebec, Canada. Any dispute shall be submitted to the exclusive jurisdiction of the courts of the district of Montreal.</p>
      </Section>

      <Section title="9. Contact">
        <p>JurisLinkia Inc. — <a href="mailto:info@jurislinkia.com" className="text-[#BC1E1E] hover:underline" style={{ fontWeight: 500 }}>info@jurislinkia.com</a></p>
      </Section>

      <p className="text-xs">Last updated: May 2026</p>
    </LegalPageLayout>
  )
}
