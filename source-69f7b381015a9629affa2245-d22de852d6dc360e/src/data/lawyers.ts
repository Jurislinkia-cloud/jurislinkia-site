export interface Avocat {
  id: string
  nom: string
  cabinet: string
  ville: string
  region: string
  telephone: string
  courriel: string
  specialites: string[]
  anneesExperience: number
  description: string
}

export const DOMAINES = [
  'Droit des affaires',
  'Droit fiscal',
  'Rédaction et révision de contrats',
  'Litige commercial',
  'Litige successoral',
  'Droit successoral et fiducies',
  'Droit autochtone',
  'Droit minier',
  'Achat et vente d\'entreprises (M&A)',
  'Incorporation et structure corporative',
  'Planification successorale et fiducies',
] as const

export type Domaine = typeof DOMAINES[number]

export const REGIONS = [
  'Montréal',
  'Québec',
  'Laval',
  'Gatineau',
  'Sherbrooke',
  'Trois-Rivières',
  'Saguenay',
] as const

export type Region = typeof REGIONS[number]

// DONNÉES FICTIVES — À REMPLACER PAR DE VRAIES DONNÉES
export const avocats: Avocat[] = [
  {
    id: 'a001',
    nom: 'Me Sophie Tremblay-Beaumont',
    cabinet: 'Tremblay Beaumont s.e.n.c.r.l.',
    ville: 'Montréal',
    region: 'Montréal',
    telephone: '514-555-0101',
    courriel: 'stremblay@exemple-fictif.ca',
    specialites: ['Achat et vente d\'entreprises (M&A)', 'Incorporation et structure corporative', 'Droit des affaires'],
    anneesExperience: 18,
    description: 'Spécialisée en transactions M&A et structuration corporative pour entreprises en croissance.',
  },
  {
    id: 'a002',
    nom: 'Me François Leblanc-Côté',
    cabinet: 'Leblanc Côté Avocats',
    ville: 'Montréal',
    region: 'Montréal',
    telephone: '514-555-0202',
    courriel: 'fleblanc@exemple-fictif.ca',
    specialites: ['Litige commercial', 'Droit des affaires', 'Rédaction et révision de contrats'],
    anneesExperience: 22,
    description: 'Plaideur chevronné en litiges commerciaux complexes devant les tribunaux québécois.',
  },
  {
    id: 'a003',
    nom: 'Me Isabelle Gagnon-Roy',
    cabinet: 'Cabinet Gagnon Roy',
    ville: 'Québec',
    region: 'Québec',
    telephone: '418-555-0303',
    courriel: 'igagnon@exemple-fictif.ca',
    specialites: ['Planification successorale et fiducies', 'Droit successoral et fiducies', 'Litige successoral'],
    anneesExperience: 15,
    description: 'Experte en planification successorale et administration de fiducies familiales.',
  },
  {
    id: 'a004',
    nom: 'Me Patrick Bouchard-Lacroix',
    cabinet: 'Bouchard Lacroix & Associés',
    ville: 'Montréal',
    region: 'Montréal',
    telephone: '514-555-0404',
    courriel: 'pbouchard@exemple-fictif.ca',
    specialites: ['Droit fiscal', 'Achat et vente d\'entreprises (M&A)', 'Incorporation et structure corporative'],
    anneesExperience: 20,
    description: 'Conseiller fiscal de premier plan pour entrepreneurs et PME québécoises.',
  },
  {
    id: 'a005',
    nom: 'Me Nathalie Fortier-Girard',
    cabinet: 'Fortier Girard s.e.n.c.',
    ville: 'Laval',
    region: 'Laval',
    telephone: '450-555-0505',
    courriel: 'nfortier@exemple-fictif.ca',
    specialites: ['Rédaction et révision de contrats', 'Droit des affaires', 'Incorporation et structure corporative'],
    anneesExperience: 12,
    description: 'Rédactrice contractuelle rigoureuse, spécialisée dans les ententes commerciales et les conventions entre actionnaires.',
  },
  {
    id: 'a006',
    nom: 'Me Antoine Pelletier-Demers',
    cabinet: 'Pelletier Demers Avocats',
    ville: 'Gatineau',
    region: 'Gatineau',
    telephone: '819-555-0606',
    courriel: 'apelletier@exemple-fictif.ca',
    specialites: ['Droit autochtone', 'Droit minier', 'Droit des affaires'],
    anneesExperience: 16,
    description: 'Avocat reconnu en droit autochtone et ressources naturelles, avec une pratique étendue en Outaouais et dans le Nord-du-Québec.',
  },
  {
    id: 'a007',
    nom: 'Me Marie-Ève Lapointe-Simard',
    cabinet: 'Lapointe Simard & Associés',
    ville: 'Sherbrooke',
    region: 'Sherbrooke',
    telephone: '819-555-0707',
    courriel: 'melapointe@exemple-fictif.ca',
    specialites: ['Litige commercial', 'Litige successoral', 'Droit successoral et fiducies'],
    anneesExperience: 14,
    description: 'Plaideure expérimentée en litiges commerciaux et successions contestées en Estrie.',
  },
  {
    id: 'a008',
    nom: 'Me Robert Gauthier-Hébert',
    cabinet: 'Gauthier Hébert & Fils',
    ville: 'Trois-Rivières',
    region: 'Trois-Rivières',
    telephone: '819-555-0808',
    courriel: 'rgauthier@exemple-fictif.ca',
    specialites: ['Droit des affaires', 'Droit fiscal', 'Rédaction et révision de contrats'],
    anneesExperience: 25,
    description: 'Doyen du droit des affaires en Mauricie, conseiller de confiance pour les entreprises familiales.',
  },
  {
    id: 'a009',
    nom: 'Me Catherine Bergeron-Lévesque',
    cabinet: 'Bergeron Lévesque Avocates',
    ville: 'Saguenay',
    region: 'Saguenay',
    telephone: '418-555-0909',
    courriel: 'cbergeron@exemple-fictif.ca',
    specialites: ['Droit minier', 'Droit autochtone', 'Droit des affaires'],
    anneesExperience: 11,
    description: 'Avocate spécialisée en droit minier et relations avec les communautés autochtones au Saguenay–Lac-Saint-Jean.',
  },
  {
    id: 'a010',
    nom: 'Me Jean-Sébastien Marquis-Allard',
    cabinet: 'Marquis Allard LLP',
    ville: 'Montréal',
    region: 'Montréal',
    telephone: '514-555-1010',
    courriel: 'jsmarquis@exemple-fictif.ca',
    specialites: ['Achat et vente d\'entreprises (M&A)', 'Droit des affaires', 'Droit fiscal'],
    anneesExperience: 19,
    description: 'Conseiller stratégique en fusions-acquisitions pour PME et entreprises de taille intermédiaire.',
  },
  {
    id: 'a011',
    nom: 'Me Valérie Dupont-Moreau',
    cabinet: 'Dupont Moreau s.e.n.c.',
    ville: 'Québec',
    region: 'Québec',
    telephone: '418-555-1111',
    courriel: 'vdupont@exemple-fictif.ca',
    specialites: ['Incorporation et structure corporative', 'Rédaction et révision de contrats', 'Droit des affaires'],
    anneesExperience: 9,
    description: 'Avocate d\'affaires dynamique, spécialisée en constitution de sociétés et en gouvernance corporative.',
  },
  {
    id: 'a012',
    nom: 'Me Marc-Antoine Rioux-Beaulieu',
    cabinet: 'Rioux Beaulieu Avocats',
    ville: 'Montréal',
    region: 'Montréal',
    telephone: '514-555-1212',
    courriel: 'marioux@exemple-fictif.ca',
    specialites: ['Planification successorale et fiducies', 'Droit fiscal', 'Droit successoral et fiducies'],
    anneesExperience: 17,
    description: 'Expert en planification fiscale et successorale pour entrepreneurs et hauts dirigeants.',
  },
  {
    id: 'a013',
    nom: 'Me Louise Charron-Vézina',
    cabinet: 'Charron Vézina & Partenaires',
    ville: 'Laval',
    region: 'Laval',
    telephone: '450-555-1313',
    courriel: 'lcharron@exemple-fictif.ca',
    specialites: ['Litige successoral', 'Droit successoral et fiducies', 'Planification successorale et fiducies'],
    anneesExperience: 21,
    description: 'Experte reconnue dans les litiges successoraux et la contestation de testaments en droit québécois.',
  },
  {
    id: 'a014',
    nom: 'Me Simon Racine-Beaupré',
    cabinet: 'Racine Beaupré Avocats',
    ville: 'Gatineau',
    region: 'Gatineau',
    telephone: '819-555-1414',
    courriel: 'sracine@exemple-fictif.ca',
    specialites: ['Litige commercial', 'Droit des affaires', 'Rédaction et révision de contrats'],
    anneesExperience: 13,
    description: 'Avocat plaideur spécialisé en contentieux commercial pour entreprises de l\'Outaouais.',
  },
  {
    id: 'a015',
    nom: 'Me Élise Thibodeau-Savard',
    cabinet: 'Thibodeau Savard s.e.n.c.r.l.',
    ville: 'Montréal',
    region: 'Montréal',
    telephone: '514-555-1515',
    courriel: 'ethibodeau@exemple-fictif.ca',
    specialites: ['Droit autochtone', 'Droit minier', 'Achat et vente d\'entreprises (M&A)'],
    anneesExperience: 14,
    description: 'Avocate spécialisée en droit autochtone, ressources minières et transactions dans le secteur des ressources naturelles.',
  },
]

export function getAvocatsByDomaines(domaines: string[], region?: string): Avocat[] {
  let filtered = avocats.filter(a =>
    a.specialites.some(s => domaines.includes(s))
  )
  if (region && region !== 'Tout le Québec') {
    filtered = filtered.filter(a => a.region === region)
  }
  // Sort by number of matching specialties
  filtered.sort((a, b) => {
    const aMatches = a.specialites.filter(s => domaines.includes(s)).length
    const bMatches = b.specialites.filter(s => domaines.includes(s)).length
    return bMatches - aMatches
  })
  return filtered.slice(0, 5)
}
