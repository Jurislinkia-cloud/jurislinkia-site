import type { Locale } from './i18n'

const SITE_URL = 'https://jurislinkia.com'

export interface SeoConfig {
  frPath: string
  enPath: string
  titleFr: string
  titleEn: string
  descFr: string
  descEn: string
  locale: Locale
}

export function buildHead(cfg: SeoConfig) {
  const frUrl = SITE_URL + cfg.frPath
  const enUrl = SITE_URL + cfg.enPath
  return {
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: cfg.locale === 'en' ? cfg.titleEn : cfg.titleFr },
      { name: 'description', content: cfg.locale === 'en' ? cfg.descEn : cfg.descFr },
    ],
    links: [
      { rel: 'alternate', hrefLang: 'fr-CA', href: frUrl },
      { rel: 'alternate', hrefLang: 'en-CA', href: enUrl },
      { rel: 'alternate', hrefLang: 'x-default', href: frUrl },
    ],
  }
}
