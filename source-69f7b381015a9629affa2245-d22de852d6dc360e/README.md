# JurisLinka

JurisLinka est une plateforme de référencement d'avocats spécialisés en droit des affaires pour les entrepreneurs et entreprises du Québec. Elle comprend un assistant conversationnel alimenté par l'IA qui oriente les utilisateurs vers les avocats correspondant à leur situation juridique.

## Technologies principales

| Couche | Technologie |
|--------|------------|
| Framework | TanStack Start (SSR) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styles | Tailwind CSS 4 |
| IA | Anthropic Claude (claude-sonnet-4-6) |
| Formulaires | Netlify Forms |
| Déploiement | Netlify |
| Langage | TypeScript 5.7 (mode strict) |

## Prérequis

- Node.js 22+
- Clé API Anthropic (`ANTHROPIC_API_KEY`)

## Lancer le projet localement

```bash
npm install
npm run dev
```

Le serveur démarre sur `http://localhost:3000`.

Pour tester avec les fonctionnalités Netlify (formulaires, fonctions) :

```bash
netlify dev
```

Le serveur Netlify démarre sur `http://localhost:8888`.

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Clé API Anthropic pour le chatbot IA |

## Pages

- `/` — Page d'accueil avec assistant conversationnel
- `/pour-les-avocats` — Formulaire d'inscription pour les avocats
- `/confidentialite` — Politique de confidentialité (Loi 25)

## Données fictives

Les données d'avocats dans `src/data/lawyers.ts` sont entièrement fictives et servent de placeholders. Remplacer ces données par de vraies informations avant la mise en production.
