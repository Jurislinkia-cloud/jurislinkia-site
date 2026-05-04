import { createFileRoute } from '@tanstack/react-router'
import { ArticlePage } from '@/components/ArticlePage'
import { articleTaxEn } from '@/content/articles'
import { buildHead } from '@/lib/seo'

const a = articleTaxEn

export const Route = createFileRoute('/en/publications/quebec-tax-rules-2026')({
  head: () =>
    buildHead({
      locale: 'en',
      frPath: a.frPath,
      enPath: a.enPath,
      titleFr:
        'Nouvelles règles fiscales 2026 pour les entreprises du Québec | JurisLinkia',
      titleEn: a.metaTitle,
      descFr:
        "Règles fiscales 2026 au Québec : DPE, RS&DE, fiducies, déductibilité des intérêts, transferts intergénérationnels. Quand consulter un avocat fiscaliste.",
      descEn: a.metaDesc,
    }),
  component: () => (
    <ArticlePage
      locale="en"
      category={a.category}
      title={a.title}
      date={a.date}
      datePublished={a.datePublished}
      description={a.description}
      frPath={a.frPath}
      enPath={a.enPath}
      ctaTitle={a.ctaTitle}
      ctaSubtitle={a.ctaSubtitle}
      ctaButton={a.ctaButton}
      disclaimer={a.disclaimer}
    >
      {a.body}
    </ArticlePage>
  ),
})
