export type Locale = 'fr' | 'en'

export const DEFAULT_LOCALE: Locale = 'fr'

export const LOCALE_COOKIE = 'jurislinkia_locale'

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr'
}

export function stripLocaleFromPath(pathname: string): string {
  if (pathname === '/en' || pathname === '/en/') return '/'
  if (pathname.startsWith('/en/')) return pathname.slice(3)
  return pathname
}

const ROUTE_MAP: Record<string, { fr: string; en: string }> = {
  home: { fr: '/', en: '/en/' },
  lawyersPortal: { fr: '/portail-avocats', en: '/en/lawyers-portal' },
  privacy: { fr: '/politique-confidentialite', en: '/en/privacy-policy' },
  terms: { fr: '/conditions-utilisation', en: '/en/terms-of-use' },
  cookies: { fr: '/politique-cookies', en: '/en/cookies-policy' },
}

export function localizedPath(key: keyof typeof ROUTE_MAP, locale: Locale): string {
  return ROUTE_MAP[key][locale]
}

export function getAlternatePath(currentFrPath: string, locale: Locale): string {
  for (const v of Object.values(ROUTE_MAP)) {
    if (v.fr === currentFrPath) return v[locale]
  }
  return locale === 'en' ? '/en/' : '/'
}

export const t = {
  // Navigation
  nav: {
    assistant: { fr: 'Assistant', en: 'Assistant' },
    practiceAreas: { fr: 'Domaines', en: 'Practice Areas' },
    howItWorks: { fr: 'Fonctionnement', en: 'How It Works' },
    lawyersPortal: { fr: 'Portail avocats', en: 'Lawyers Portal' },
    getStarted: { fr: 'Démarrer', en: 'Get Started' },
  },
  // Hero
  hero: {
    eyebrow: { fr: 'MISE EN RELATION JURIDIQUE', en: 'LEGAL CONNECTION' },
    badge: {
      fr: 'AVOCATS MEMBRES DU BARREAU DU QUÉBEC ET DU BARREAU DE L\'ONTARIO',
      en: 'MEMBERS OF THE QUEBEC AND ONTARIO BARS',
    },
    titleLine1: { fr: 'Le', en: 'The' },
    titleLine2Highlight: { fr: 'bon', en: 'right' },
    titleLine3: {
      fr: ' avocat d\'affaires au Québec et en Ontario.',
      en: ' business lawyer in Quebec and Ontario.',
    },
    subtitle: {
      fr: 'Décrivez votre situation. Trouvez le bon avocat en 2 minutes.',
      en: 'Describe your situation. Find the right lawyer in 2 minutes.',
    },
    subtitleLine1: { fr: 'Décrivez les faits.', en: 'Describe the facts.' },
    subtitleLine2: {
      fr: 'Nous vous mettons en relation avec le bon avocat,',
      en: 'We connect you with the right lawyer,',
    },
    subtitleLine3: {
      fr: 'rapidement, selon ses disponibilités.',
      en: 'quickly, based on availability.',
    },
    imageAlt: {
      fr: "Gratte-ciels d'un quartier d'affaires",
      en: 'Skyscrapers of a business district',
    },
    ctaPrimary: { fr: 'Décrire ma situation', en: 'Describe my situation' },
    ctaSecondary: { fr: 'Je suis avocat', en: 'I am a lawyer' },
  },
  // Coverage section
  coverage: {
    eyebrow: { fr: 'NOTRE COUVERTURE', en: 'OUR COVERAGE' },
    title: {
      fr: 'Présents au Québec et en Ontario.',
      en: 'Present in Quebec and Ontario.',
    },
    body: {
      fr: 'De Montréal à Toronto, nous mettons en relation entrepreneurs et entreprises avec des avocats d\'affaires qualifiés dans les deux provinces.',
      en: 'From Montréal to Toronto, we connect entrepreneurs and businesses with qualified business lawyers in both provinces.',
    },
    quote: {
      fr: "L'expertise au service de l'entreprise.",
      en: 'Expertise at the service of business.',
    },
  },
  // Header
  header: {
    contact: { fr: 'Contact', en: 'Contact' },
    phone: { fr: '(514) 900-0645', en: '(514) 900-0645' },
    search: { fr: 'Rechercher', en: 'Search' },
  },
  // Insights section (editorial articles)
  insights: {
    eyebrow: { fr: 'PUBLICATIONS', en: 'PUBLICATIONS' },
    title: { fr: 'Actualités juridiques', en: 'Legal Insights' },
    readMore: { fr: 'Lire la suite', en: 'Read more' },
    articles: [
      {
        category: { fr: 'FISCALITÉ', en: 'TAXATION' },
        title: {
          fr: 'Nouvelles règles fiscales 2026 pour les entreprises du Québec',
          en: '2026 tax rules for Quebec businesses',
        },
        date: { fr: 'Mars 2026', en: 'March 2026' },
      },
      {
        category: { fr: 'M&A', en: 'M&A' },
        title: {
          fr: 'Tendances en M&A canadien : ce que les entrepreneurs doivent savoir',
          en: 'Canadian M&A trends: what entrepreneurs should know',
        },
        date: { fr: 'Février 2026', en: 'February 2026' },
      },
      {
        category: { fr: 'INCORPORATION', en: 'INCORPORATION' },
        title: {
          fr: 'Incorporation au fédéral ou au provincial : comment choisir?',
          en: 'Federal or provincial incorporation: how to choose?',
        },
        date: { fr: 'Janvier 2026', en: 'January 2026' },
      },
    ],
  },
  // Manifesto
  manifesto: {
    title: {
      fr: 'Une plateforme dédiée au droit des affaires.',
      en: 'A platform dedicated to business law.',
    },
    body: {
      fr: 'JurisLinkia connecte les entrepreneurs et entreprises du Québec et de l\'Ontario à des avocats spécialisés en droit des affaires — membres en règle du Barreau du Québec ou du Barreau de l\'Ontario. Chaque mise en relation est gratuite. Le premier appel téléphonique avec votre avocat ne vous est jamais facturé. Aucun engagement, aucune surprise.',
      en: 'JurisLinkia connects Quebec and Ontario entrepreneurs and businesses with lawyers specialized in business law — members in good standing of the Quebec Bar or the Law Society of Ontario. Every connection is free. The first phone call with your lawyer is never billed. No commitment, no surprises.',
    },
  },
  // Practice areas section
  practiceAreasSection: {
    eyebrow: { fr: 'EXPERTISE', en: 'EXPERTISE' },
    title: { fr: 'Domaines de pratique', en: 'Practice areas' },
  },
  // Lawyers CTA section
  lawyersCta: {
    title: {
      fr: 'Vous êtes avocat en droit des affaires ?',
      en: 'Are you a business law lawyer?',
    },
    subtitle: {
      fr: 'Rejoignez le réseau JurisLinkia.',
      en: 'Join the JurisLinkia network.',
    },
    button: { fr: 'Portail avocats', en: 'Lawyers portal' },
  },
  // Chat section editorial
  chatSectionEditorial: {
    title: {
      fr: 'Décrivez votre situation. Trouvez le bon avocat.',
      en: 'Describe your situation. Find the right lawyer.',
    },
  },
  // Reassurance cards
  reassurance: [
    {
      title: { fr: 'Réponse instantanée', en: 'Instant Response' },
      text: {
        fr: 'La bonne personne pour vous, identifiée dès la réception de votre demande.',
        en: 'The right person for you, identified as soon as we receive your request.',
      },
    },
    {
      title: { fr: 'Appel téléphonique gratuit', en: 'Free Phone Call' },
      text: {
        fr: '15 minutes au téléphone avec votre avocat — sans frais, sans engagement.',
        en: '15 minutes on the phone with your lawyer — no fees, no commitment.',
      },
    },
    {
      title: { fr: 'Avocat disponible dès maintenant', en: 'Lawyer Available Now' },
      text: {
        fr: 'Nous vous orientons vers un spécialiste disponible pour vous appeler rapidement.',
        en: 'We direct you to a specialist available to call you back quickly.',
      },
    },
  ],
  // Barreaux section
  barreauxSection: {
    title: {
      fr: "Avocats membres du Barreau du Québec et du Barreau de l'Ontario",
      en: 'Lawyers Members of the Quebec Bar and Law Society of Ontario',
    },
    text: {
      fr: "JurisLinkia est une plateforme de référencement qui vous met en relation exclusivement avec des avocats membres en règle du Barreau du Québec ou du Barreau de l'Ontario (Law Society of Ontario). Tous nos avocats partenaires sont qualifiés pour exercer dans leur province respective et sont spécialisés en droit des affaires.",
      en: 'JurisLinkia is a referral platform connecting you exclusively with lawyers in good standing with the Quebec Bar (Barreau du Québec) or the Law Society of Ontario. All our partner lawyers are qualified to practice in their respective province and specialize in business law.',
    },
  },
  // Stats cards
  stats: [
    {
      title: { fr: 'Des dizaines d\'avocats qualifiés', en: 'Dozens of qualified lawyers' },
      text: {
        fr: 'Un réseau de professionnels soigneusement sélectionnés, prêts à prendre votre dossier.',
        en: 'A network of professionals carefully selected, ready to take your case.',
      },
    },
    {
      title: { fr: 'Tous les domaines clés du droit des affaires', en: 'All key business law areas' },
      text: {
        fr: 'Incorporation, fiscalité, M&A, contrats, litige, fiducies — couverture complète des besoins entrepreneuriaux.',
        en: 'Incorporation, taxation, M&A, contracts, litigation, trusts — full coverage of entrepreneurial needs.',
      },
    },
    {
      title: { fr: 'Présence à travers le Québec et l\'Ontario', en: 'Presence across Quebec and Ontario' },
      text: {
        fr: 'Avocats partenaires dans les principales villes des deux provinces, disponibles en français et en anglais.',
        en: 'Partner lawyers in the major cities of both provinces, available in English and French.',
      },
    },
  ],
  // Chatbot section
  chatSection: {
    eyebrow: { fr: 'MISE EN RELATION EN DIRECT', en: 'DIRECT CONNECTION' },
    title: {
      fr: 'Décrivez les faits. On vous connecte au bon avocat.',
      en: 'Describe the facts. We connect you to the right lawyer.',
    },
    subtitle: {
      fr: 'Remplissez le formulaire intégré (coordonnées + faits), répondez à une question de clarification, et nous vous envoyons le match par courriel.',
      en: "Fill the integrated form (contact info + facts), answer one clarification question, and we'll send you the match by email.",
    },
  },
  // Chatbot UI
  chat: {
    headerTitle: { fr: 'Assistant JurisLinkia', en: 'JurisLinkia Assistant' },
    headerSubtitle: {
      fr: 'Mise en relation · Barreau QC + ON',
      en: 'Connection service · Quebec + Ontario Bars',
    },
    restart: { fr: 'Recommencer', en: 'Restart' },
    badge: {
      fr: 'Avocats — Membres du Barreau du Québec et de l\'Ontario',
      en: 'Lawyers — Members of the Quebec and Ontario Bars',
    },
    availability: {
      fr: 'Tous les spécialistes disponibles · Toutes les régions',
      en: 'All available specialists · All regions',
    },
    intro: {
      fr: 'Bonjour. Pour vous mettre en relation avec le bon avocat, veuillez remplir les informations ci-dessous et décrire votre situation.',
      en: 'Hello. To connect you with the right lawyer, please fill in the information below and describe your situation.',
    },
    welcome: {
      fr: 'Bonjour. Décrivez votre situation et nous vous mettrons en relation avec l\'avocat le plus pertinent, rapidement, selon ses disponibilités.',
      en: "Hello. Describe your situation and we'll connect you with the most relevant lawyer, quickly, based on their availability.",
    },
    trust: {
      fr: '100% confidentiel  ·  Mise en relation gratuite  ·  Aucun engagement',
      en: '100% confidential  ·  Free matching  ·  No commitment',
    },
    fields: {
      firstName: { fr: 'Prénom', en: 'First name' },
      lastName: { fr: 'Nom', en: 'Last name' },
      email: { fr: 'Courriel', en: 'Email' },
      phone: { fr: 'Téléphone', en: 'Phone' },
      province: { fr: 'Province', en: 'Province' },
      city: { fr: 'Ville', en: 'City' },
      facts: { fr: 'Description des faits', en: 'Describe the facts' },
    },
    placeholders: {
      firstName: { fr: 'Votre prénom', en: 'Your first name' },
      lastName: { fr: 'Votre nom de famille', en: 'Your last name' },
      email: { fr: 'vous@exemple.com', en: 'you@example.com' },
      phone: { fr: '514 555-1234', en: '514 555-1234' },
      facts: {
        fr: 'Décrivez votre situation en détail : contexte, enjeux, ce que vous cherchez à accomplir...',
        en: 'Describe your situation in detail: context, issues, what you are looking to accomplish...',
      },
    },
    submit: { fr: 'Envoyer mon dossier', en: 'Send my file' },
    sending: { fr: 'Envoi en cours...', en: 'Sending...' },
    provinces: {
      qc: { fr: 'Québec', en: 'Quebec' },
      on: { fr: 'Ontario', en: 'Ontario' },
    },
    selectProvince: { fr: 'Sélectionner une province', en: 'Select a province' },
    errors: {
      required: { fr: 'Ce champ est requis', en: 'This field is required' },
      email: { fr: 'Format de courriel invalide', en: 'Invalid email format' },
      phone: { fr: 'Numéro de téléphone invalide', en: 'Invalid phone number' },
      minLength: { fr: 'Minimum 50 caractères', en: 'Minimum 50 characters' },
    },
    confirmation: {
      thanks: {
        fr: 'Merci {name}. Votre dossier est transmis à notre réseau.',
        en: 'Thank you {name}. Your case has been forwarded to our network.',
      },
      details: {
        fr: 'Vous recevrez sous peu un courriel à {email} avec : Le nom et les coordonnées de l\'avocat assigné · Sa disponibilité pour vous rappeler',
        en: 'You will shortly receive an email at {email} with: The name and contact details of the assigned lawyer · Their availability to call you back',
      },
      freeCall: {
        fr: 'Le premier appel téléphonique avec votre avocat est entièrement gratuit — sans frais ni engagement.',
        en: 'The first phone call with your lawyer is entirely free — no fees, no commitment.',
      },
    },
    indicators: {
      received: { fr: '✓ Dossier reçu', en: '✓ Case received' },
      selecting: { fr: '✓ Avocat en cours de sélection', en: '✓ Lawyer being selected' },
      emailing: { fr: '✓ Courriel à venir', en: '✓ Email coming' },
    },
  },
  // Footer
  footer: {
    description: {
      fr: 'Plateforme de référencement d\'avocats spécialisés en droit des affaires — membres du Barreau du Québec et de l\'Ontario. Service exploité par JurisLinkia Inc.',
      en: 'Referral platform for lawyers specialized in business law — members of the Quebec and Ontario Bars. Service operated by JurisLinkia Inc.',
    },
    navigation: { fr: 'NAVIGATION', en: 'NAVIGATION' },
    contact: { fr: 'CONTACT', en: 'CONTACT' },
    contactPhone: { fr: 'Téléphone', en: 'Phone' },
    contactEmail: { fr: 'Courriel', en: 'Email' },
    lawyers: { fr: 'AVOCATS', en: 'LAWYERS' },
    legal: { fr: 'LÉGAL', en: 'LEGAL' },
    serviceAreas: { fr: 'VILLES DESSERVIES', en: 'SERVICE AREAS' },
    quebec: { fr: 'Québec', en: 'Quebec' },
    ontario: { fr: 'Ontario', en: 'Ontario' },
    privacy: { fr: 'Politique de confidentialité', en: 'Privacy Policy' },
    terms: { fr: 'Conditions d\'utilisation', en: 'Terms of Use' },
    cookies: { fr: 'Politique sur les témoins', en: 'Cookies Policy' },
    copyright: {
      fr: '© 2026 JurisLinkia Inc. — Service de référencement d\'avocats membres du Barreau du Québec et du Barreau de l\'Ontario. Ce service ne constitue pas un avis juridique.',
      en: '© 2026 JurisLinkia Inc. — Referral service for lawyers members of the Quebec and Ontario Bars. This service does not constitute legal advice.',
    },
  },
  // Cookie banner
  cookieBanner: {
    text: {
      fr: 'Nous utilisons des témoins pour améliorer votre expérience sur JurisLinkia. Certains sont essentiels au fonctionnement du site, d\'autres nous aident à l\'améliorer.',
      en: "We use cookies to enhance your experience on JurisLinkia. Some are essential to the site's operation, others help us improve it.",
    },
    accept: { fr: 'Accepter tous les témoins', en: 'Accept all cookies' },
    reject: { fr: 'Refuser les témoins non essentiels', en: 'Reject non-essential cookies' },
    customize: { fr: 'Personnaliser', en: 'Customize' },
    policyLink: { fr: 'Consulter notre politique sur les témoins', en: 'View our cookies policy' },
  },
  // Lawyers portal
  portal: {
    title: { fr: 'Rejoignez le réseau JurisLinkia', en: 'Join the JurisLinkia network' },
    subtitle: {
      fr: 'Plateforme de référencement pour avocats en droit des affaires au Québec et en Ontario.',
      en: 'Referral platform for business law lawyers in Quebec and Ontario.',
    },
    benefits: [
      {
        fr: 'Référencement qualifié (clients pré-filtrés)',
        en: 'Qualified referrals (pre-screened clients)',
      },
      { fr: 'Aucun frais d\'inscription au lancement', en: 'No registration fees at launch' },
      {
        fr: 'Visibilité ciblée par domaine et région',
        en: 'Targeted visibility by area of practice and region',
      },
      { fr: 'Système de mise en relation automatisé', en: 'Automated connection system' },
    ],
    fields: {
      firstName: { fr: 'Prénom', en: 'First name' },
      lastName: { fr: 'Nom', en: 'Last name' },
      firm: { fr: 'Cabinet / Étude', en: 'Firm' },
      city: { fr: 'Ville', en: 'City' },
      province: { fr: 'Province', en: 'Province' },
      phone: { fr: 'Téléphone', en: 'Phone' },
      email: { fr: 'Courriel', en: 'Email' },
      barNumber: {
        fr: 'Numéro du Barreau (Québec ou Ontario)',
        en: 'Bar number (Quebec or Ontario)',
      },
      experience: { fr: 'Années d\'expérience', en: 'Years of experience' },
      practiceAreas: { fr: 'Domaines de pratique', en: 'Areas of practice' },
      message: { fr: 'Brève présentation', en: 'Brief presentation' },
    },
    submit: { fr: 'Soumettre ma candidature', en: 'Submit my application' },
    successTitle: { fr: 'Demande reçue!', en: 'Application received!' },
    successText: {
      fr: 'Merci pour votre intérêt. Notre équipe examinera votre demande et vous contactera dans les 3 à 5 jours ouvrables.',
      en: 'Thank you for your interest. Our team will review your application and contact you within 3 to 5 business days.',
    },
    backHome: { fr: 'Retour à l\'accueil', en: 'Back to home' },
    selectAtLeast: {
      fr: 'Veuillez sélectionner au moins un domaine de pratique.',
      en: 'Please select at least one area of practice.',
    },
  },
  // Common
  common: {
    backHome: { fr: 'Retour à l\'accueil', en: 'Back to home' },
  },
}

export const DOMAINES_BILINGUAL = [
  { fr: 'Droit des affaires', en: 'Business Law' },
  { fr: 'Droit fiscal', en: 'Tax Law' },
  { fr: 'Rédaction et révision de contrats', en: 'Contract Drafting & Review' },
  { fr: 'Litige commercial', en: 'Commercial Litigation' },
  { fr: 'Litige successoral', en: 'Estate Litigation' },
  {
    fr: 'Fiducies et planification successorale',
    en: 'Trusts & Estate Planning',
  },
  { fr: 'Droit autochtone', en: 'Indigenous Law' },
  { fr: 'Droit minier', en: 'Mining Law' },
  { fr: 'Achat et vente d\'entreprises (M&A)', en: 'Mergers & Acquisitions' },
  {
    fr: 'Incorporation et structure corporative',
    en: 'Incorporation & Corporate Structure',
  },
  { fr: 'Droit successoral', en: 'Estate Law' },
] as const

export const QUEBEC_CITIES = [
  'Montréal', 'Québec', 'Laval', 'Gatineau', 'Longueuil', 'Sherbrooke',
  'Lévis', 'Trois-Rivières', 'Terrebonne', 'Saguenay', 'Saint-Jean-sur-Richelieu',
  'Drummondville', 'Granby', 'Saint-Jérôme', 'Repentigny', 'Brossard',
] as const

export const ONTARIO_CITIES = [
  'Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton', 'London',
  'Markham', 'Vaughan', 'Kitchener', 'Windsor', 'Richmond Hill',
  'Oakville', 'Burlington', 'Sudbury', 'Barrie', 'Guelph', 'Kingston',
] as const

export function tx<T extends { fr: string; en: string }>(obj: T, locale: Locale): string {
  return obj[locale]
}
