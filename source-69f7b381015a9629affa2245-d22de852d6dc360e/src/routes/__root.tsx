import { HeadContent, Scripts, createRootRoute, useLocation } from '@tanstack/react-router'
import { CookieBanner } from '@/components/CookieBanner'
import { LocaleDetector } from '@/components/LocaleDetector'
import { getLocaleFromPath } from '@/lib/i18n'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  }),
  shellComponent: RootDocument,
})

const GA_MEASUREMENT_ID = 'G-RE1W9QD78T'

const GA_INLINE_SCRIPT = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied'
});
gtag('config', '${GA_MEASUREMENT_ID}');
try {
  var consent = document.cookie.match(/(?:^|;\\s*)jurislinkia_cookie_consent=([^;]*)/);
  if (consent) {
    var value = decodeURIComponent(consent[1]);
    if (value === 'all') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    } else if (value === 'essential') {
      gtag('consent', 'update', { 'analytics_storage': 'denied' });
    }
  }
} catch (e) {}`

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: GA_INLINE_SCRIPT }} />
      </head>
      <body>
        <LocaleHtmlLang />
        <LocaleDetector />
        {children}
        <CookieBanner />
        <Scripts />
      </body>
    </html>
  )
}

function LocaleHtmlLang() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale === 'en' ? 'en' : 'fr'
  }
  return null
}
