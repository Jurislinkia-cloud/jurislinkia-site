import { createFileRoute } from '@tanstack/react-router'
import { ArticlePage } from '@/components/ArticlePage'
import { articleMaEn } from '@/content/articles'
import { buildHead } from '@/lib/seo'

const a = articleMaEn

export const Route = createFileRoute('/en/publications/canadian-ma-trends-2026')({
  head: () =>
    buildHead({
      locale: 'en',
      frPath: a.frPath,
      enPath: a.enPath,
      titleFr:
        'Tendances en M&A canadien 2026 : ce que les entrepreneurs doivent savoir | JurisLinkia',
      titleEn: a.metaTitle,
      descFr:
        "M&A au Canada en 2026 : marché, secteurs porteurs, due diligence, différences Québec/Ontario, rôle de l'avocat d'affaires. Guide pour entrepreneurs.",
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
