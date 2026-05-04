import { createFileRoute } from '@tanstack/react-router'
import { ArticlePage } from '@/components/ArticlePage'
import { articleTaxFr } from '@/content/articles'
import { buildHead } from '@/lib/seo'

const a = articleTaxFr

export const Route = createFileRoute('/publications/regles-fiscales-quebec-2026')({
  head: () =>
    buildHead({
      locale: 'fr',
      frPath: a.frPath,
      enPath: a.enPath,
      titleFr: a.metaTitle,
      titleEn: 'New 2026 Tax Rules for Quebec Businesses | JurisLinkia',
      descFr: a.metaDesc,
      descEn:
        '2026 Quebec corporate tax landscape: SBD, SR&ED credits, trust reporting, interest deductibility, intergenerational transfers. When to consult a tax lawyer.',
    }),
  component: () => (
    <ArticlePage
      locale="fr"
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
