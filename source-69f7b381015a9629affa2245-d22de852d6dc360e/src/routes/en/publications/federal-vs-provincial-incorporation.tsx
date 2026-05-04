import { createFileRoute } from '@tanstack/react-router'
import { ArticlePage } from '@/components/ArticlePage'
import { articleIncorporationEn } from '@/content/articles'
import { buildHead } from '@/lib/seo'

const a = articleIncorporationEn

export const Route = createFileRoute(
  '/en/publications/federal-vs-provincial-incorporation',
)({
  head: () =>
    buildHead({
      locale: 'en',
      frPath: a.frPath,
      enPath: a.enPath,
      titleFr:
        'Incorporation fédérale ou provinciale : comment choisir? | JurisLinkia',
      titleEn: a.metaTitle,
      descFr:
        "Fédéral (LCSA) ou provincial (Québec, Ontario) : guide pratique pour choisir le bon régime d'incorporation, comprendre les coûts, la fiscalité et la protection du nom.",
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
