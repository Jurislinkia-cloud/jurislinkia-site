import { createFileRoute } from '@tanstack/react-router'
import Anthropic from '@anthropic-ai/sdk'
import { getAvocatsByDomaines, DOMAINES } from '@/data/lawyers'
import { DOMAINES_BILINGUAL, type Locale } from '@/lib/i18n'

const client = new Anthropic()

function buildSystemPrompt(locale: Locale): string {
  if (locale === 'en') {
    const enList = DOMAINES_BILINGUAL.map(d => `- ${d.en}`).join('\n')
    return `You are the legal assistant of JurisLinkia, a referral platform for lawyers specialized in business law, members of the Quebec Bar and the Ontario Bar.

Your role is to help entrepreneurs and businesses in Quebec and Ontario identify the right type of lawyer for their situation.

LEGAL AREAS COVERED:
${enList}

INSTRUCTIONS:
1. When a user describes their situation, ask 1 to 2 SHORT clarifying questions to pinpoint the precise area and complexity.
2. After 1 to 2 exchanges, identify the relevant areas and produce your final response.
3. Always reply in VALID JSON only.

RESPONSE FORMAT — always valid JSON:

If you need more information:
{"type":"question","text":"[Your clarifying question, in professional Canadian English]"}

If you have enough information to recommend lawyers:
{"type":"result","summary":"[2-3 sentence summary of the situation and legal issue, in English]","domains":["englishDomain1","englishDomain2"],"message":"[1-2 sentence intro for the recommendations, in English]"}

IMPORTANT RULES:
- Ask only ONE question at a time
- Use professional Canadian English ONLY — never mix in French
- After at most 2 exchanges you MUST output a result, even with limited info
- The "domains" values MUST exactly match items in the list above (English names)
- Never give legal advice — you only orient toward the right specialists
- Reply ONLY in JSON, with no text before or after`
  }

  // French
  return `Tu es l'assistant juridique de JurisLinkia, une plateforme de référencement d'avocats spécialisés en droit des affaires au Québec et en Ontario.

Ton rôle est d'aider les entrepreneurs et entreprises du Québec et de l'Ontario à identifier le bon type d'avocat pour leur situation.

DOMAINES JURIDIQUES COUVERTS :
${DOMAINES_BILINGUAL.map(d => `- ${d.fr}`).join('\n')}

INSTRUCTIONS :
1. Quand un utilisateur décrit sa situation, pose 1 à 2 questions de clarification COURTES pour cerner le domaine précis et la complexité.
2. Après 1 à 2 échanges, identifie les domaines pertinents et produis ta réponse finale.
3. Réponds TOUJOURS en JSON valide.

FORMAT DE RÉPONSE — TOUJOURS en JSON valide :

Si tu as besoin de plus d'informations :
{"type":"question","text":"[Ta question de clarification en français québécois professionnel]"}

Si tu as suffisamment d'informations pour recommander des avocats :
{"type":"result","summary":"[Résumé de la situation et de l'enjeu juridique en 2-3 phrases, en français]","domains":["domaine1","domaine2"],"message":"[Message d'introduction en français, 1-2 phrases]"}

RÈGLES IMPORTANTES :
- Ne pose qu'UNE seule question à la fois
- Utilise UNIQUEMENT le français québécois professionnel — ne mélange JAMAIS l'anglais
- Après au maximum 2 échanges, tu DOIS passer au résultat
- Les domaines dans "domains" doivent correspondre EXACTEMENT à ceux de la liste (noms français)
- Ne fournis JAMAIS d'avis juridique — tu ne fais qu'orienter
- Réponds UNIQUEMENT en JSON, sans texte avant ou après`
}

// Map English domain names back to the French canonical names used by the lawyer DB
function mapDomainsToFr(domains: string[]): string[] {
  const enToFr = new Map(DOMAINES_BILINGUAL.map(d => [d.en, d.fr]))
  return domains.map(d => enToFr.get(d) ?? d)
}

// Best-effort mapping from canonical FR domains to the legacy DOMAINES list used by the data
function mapToLegacyDomains(frDomains: string[]): string[] {
  const equivalences: Record<string, string> = {
    'Fiducies et planification successorale': 'Planification successorale et fiducies',
    'Droit successoral': 'Droit successoral et fiducies',
  }
  return frDomains.map(d => equivalences[d] ?? d).filter(d => (DOMAINES as readonly string[]).includes(d))
}

function stripFences(s: string): string {
  return s
    .replace(/^\s*```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim()
}

function extractJson(raw: string): { type: string; text?: string; summary?: string; domains?: string[]; message?: string } | null {
  if (!raw) return null
  const candidates: string[] = []
  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)
  if (fenceMatch) candidates.push(fenceMatch[1])
  candidates.push(stripFences(raw))
  const braceStart = raw.indexOf('{')
  const braceEnd = raw.lastIndexOf('}')
  if (braceStart !== -1 && braceEnd > braceStart) candidates.push(raw.slice(braceStart, braceEnd + 1))
  for (const c of candidates) {
    try {
      const parsed = JSON.parse(c)
      if (parsed && typeof parsed === 'object') return parsed
    } catch {
      // try next candidate
    }
  }
  return null
}

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as {
            messages: Array<{ role: 'user' | 'assistant'; content: string }>
            locale?: Locale
            province?: string
          }

          const { messages } = body
          const locale: Locale = body.locale === 'en' ? 'en' : 'fr'

          if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return Response.json({ error: 'Messages required' }, { status: 400 })
          }

          const response = await client.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 1024,
            system: buildSystemPrompt(locale),
            messages: messages.map(m => ({ role: m.role, content: m.content })),
          })

          const rawText = response.content[0].type === 'text' ? response.content[0].text : ''

          let parsed: { type: string; text?: string; summary?: string; domains?: string[]; message?: string }
          parsed = extractJson(rawText) ?? { type: 'question', text: stripFences(rawText) }

          if (parsed.type === 'result' && parsed.domains) {
            const frDomains = locale === 'en' ? mapDomainsToFr(parsed.domains) : parsed.domains
            const legacyDomains = mapToLegacyDomains(frDomains)
            const recommendedLawyers = getAvocatsByDomaines(legacyDomains)
            return Response.json({
              type: 'result',
              summary: parsed.summary,
              message: parsed.message,
              domains: parsed.domains,
              lawyers: recommendedLawyers,
            })
          }

          return Response.json({
            type: 'question',
            text: parsed.text || rawText,
          })
        } catch (error) {
          console.error('Chat API error:', error)
          return Response.json(
            { error: 'An error occurred. Please try again.' },
            { status: 500 }
          )
        }
      },
    },
  },
})
