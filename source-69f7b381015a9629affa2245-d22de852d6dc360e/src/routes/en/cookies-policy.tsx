import { createFileRoute } from '@tanstack/react-router'
import { LegalPageLayout, Section } from '@/components/LegalPageLayout'
import { buildHead } from '@/lib/seo'

export const Route = createFileRoute('/en/cookies-policy')({
  head: () => buildHead({
    locale: 'en',
    frPath: '/politique-cookies',
    enPath: '/en/cookies-policy',
    titleFr: 'Politique sur les témoins | JurisLinkia',
    titleEn: 'Cookies Policy | JurisLinkia',
    descFr: 'Politique de JurisLinkia sur les témoins.',
    descEn: 'JurisLinkia cookies policy — types used and how to manage them.',
  }),
  component: CookiesPolicy,
})

function CookiesPolicy() {
  return (
    <LegalPageLayout locale="en" title="Cookies Policy">
      <Section title="1. What is a cookie?">
        <p>A cookie is a small file placed on your device by a website to remember certain information (preferences, session state, analytics, etc.).</p>
      </Section>

      <Section title="2. Types of cookies we use">
        <ul className="mt-2 space-y-2 list-disc list-inside">
          <li><strong className="text-[#000000]">Essential cookies</strong> — strictly necessary for the site to function (language preferences, session security). Cannot be disabled.</li>
          <li><strong className="text-[#000000]">Preference cookies</strong> — remember your choices (e.g., your preferred language).</li>
          <li><strong className="text-[#000000]">Analytics cookies</strong> — help us understand site usage anonymously. Optional.</li>
          <li><strong className="text-[#000000]">Marketing cookies</strong> — currently not used by JurisLinkia.</li>
        </ul>
      </Section>

      <Section title="3. Third-party cookies">
        <p>No third-party advertising tracking cookies are placed on the platform. Our infrastructure (Netlify) may use technical cookies required for site delivery.</p>
      </Section>

      <Section title="4. Managing your preferences">
        <p>You can accept, refuse, or customize non-essential cookies via the banner shown on your first visit. You can also manage cookies directly in your browser:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Chrome: Settings → Privacy and Security → Cookies</li>
          <li>Safari: Preferences → Privacy</li>
          <li>Firefox: Settings → Privacy & Security</li>
        </ul>
      </Section>

      <Section title="5. Retention">
        <p>Most cookies are kept for a maximum of 12 months, unless they are essential to the session, in which case they expire when you close your browser.</p>
      </Section>

      <Section title="6. Updates">
        <p>This policy may be updated. The version in force is the one published here.</p>
        <p className="mt-2 text-xs">Last updated: May 2026</p>
      </Section>
    </LegalPageLayout>
  )
}
