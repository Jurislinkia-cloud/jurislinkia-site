import { createFileRoute } from '@tanstack/react-router'
import { ArticlePage } from '@/components/ArticlePage'
import { articleIncorporationFr } from '@/content/articles'
import { buildHead } from '@/lib/seo'

const a = articleIncorporationFr

export const Route = createFileRoute('/publications/incorporation-federal-vs-provincial')({
  head: () =>
    buildHead({
      locale: 'fr',
      frPath: a.frPath,
      enPath: a.enPath,
      titleFr: a.metaTitle,
      titleEn:
        'Federal or Provincial Incorporation: How to Choose? | JurisLinkia',
      descFr: a.metaDesc,
      descEn:
        'Federal (CBCA) vs. provincial (Quebec, Ontario) incorporation: a practical guide to choosing the right regime, real costs, tax implications, and name protection.',
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
