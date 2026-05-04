import { createFileRoute } from '@tanstack/react-router'
import { ArticlePage } from '@/components/ArticlePage'
import { articleMaFr } from '@/content/articles'
import { buildHead } from '@/lib/seo'

const a = articleMaFr

export const Route = createFileRoute('/publications/tendances-ma-canadien-2026')({
  head: () =>
    buildHead({
      locale: 'fr',
      frPath: a.frPath,
      enPath: a.enPath,
      titleFr: a.metaTitle,
      titleEn:
        'Canadian M&A Trends 2026: What Entrepreneurs Need to Know | JurisLinkia',
      descFr: a.metaDesc,
      descEn:
        'Canadian M&A in 2026: market dynamics, hot sectors, due diligence, Quebec/Ontario differences, role of the business lawyer. A guide for entrepreneurs.',
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
