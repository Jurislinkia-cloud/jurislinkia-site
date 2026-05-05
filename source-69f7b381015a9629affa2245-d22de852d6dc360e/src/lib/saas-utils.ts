import type { Locale } from './i18n'

/**
 * Utilitaires partagés du SaaS Jurislinkia.
 * Formatage de prix, dates, durées, statuts, etc.
 */

// ============ FORMATAGE PRIX ============

/**
 * Formate un montant en cents en devise lisible.
 * @example formatPrice(15000, 'fr') // "150,00 $"
 * @example formatPrice(15000, 'en') // "$150.00"
 */
export function formatPrice(amountCents: number, locale: Locale = 'fr'): string {
  const amount = amountCents / 100
  if (locale === 'en') {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(amount)
  }
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount)
}

/**
 * Version courte sans décimales pour les prix ronds.
 * @example formatPriceShort(15000, 'fr') // "150 $"
 */
export function formatPriceShort(amountCents: number, locale: Locale = 'fr'): string {
  const amount = Math.round(amountCents / 100)
  return locale === 'en' ? `$${amount}` : `${amount} $`
}

// ============ FORMATAGE DATES ============

/**
 * Formate une date en format lisible court.
 * @example formatDate('2026-05-15', 'fr') // "15 mai 2026"
 * @example formatDate('2026-05-15', 'en') // "May 15, 2026"
 */
export function formatDate(date: string | Date, locale: Locale = 'fr'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-CA' : 'fr-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

/**
 * Formate une date avec l'heure.
 * @example formatDateTime('2026-05-15T14:30:00', 'fr') // "15 mai 2026, 14:30"
 */
export function formatDateTime(date: string | Date, locale: Locale = 'fr'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-CA' : 'fr-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

/**
 * Format relatif (il y a 5 minutes, dans 2 heures, etc.).
 */
export function formatRelativeTime(date: string | Date, locale: Locale = 'fr'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = Date.now()
  const diff = d.getTime() - now
  const diffMinutes = Math.round(diff / 60000)
  const diffHours = Math.round(diff / 3600000)
  const diffDays = Math.round(diff / 86400000)

  const rtf = new Intl.RelativeTimeFormat(locale === 'en' ? 'en-CA' : 'fr-CA', {
    numeric: 'auto',
  })

  if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, 'minute')
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, 'hour')
  return rtf.format(diffDays, 'day')
}

// ============ EXPIRATION DOSSIERS ============

/**
 * Calcule le temps restant avant expiration d'un dossier (12h max).
 * Retourne un objet avec les heures et minutes restantes.
 */
export function getTimeRemaining(availableUntil: string | Date): {
  hours: number
  minutes: number
  expired: boolean
  totalMinutes: number
} {
  const target = typeof availableUntil === 'string' ? new Date(availableUntil) : availableUntil
  const now = Date.now()
  const diff = target.getTime() - now

  if (diff <= 0) {
    return { hours: 0, minutes: 0, expired: true, totalMinutes: 0 }
  }

  const totalMinutes = Math.floor(diff / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return { hours, minutes, expired: false, totalMinutes }
}

/**
 * Formate le temps restant en chaîne lisible.
 * @example "11h 32min restantes"
 */
export function formatTimeRemaining(availableUntil: string | Date, locale: Locale = 'fr'): string {
  const { hours, minutes, expired } = getTimeRemaining(availableUntil)

  if (expired) {
    return locale === 'en' ? 'Expired' : 'Expiré'
  }

  if (locale === 'en') {
    if (hours > 0) return `${hours}h ${minutes}min remaining`
    return `${minutes}min remaining`
  }

  if (hours > 0) return `${hours}h ${minutes}min restantes`
  return `${minutes}min restantes`
}

// ============ STATUTS ============

/**
 * Retourne la classe CSS pour un badge de statut.
 */
export function getStatusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    // Avocats
    pending_verification: 'bg-orange-100 text-orange-800 border-orange-200',
    verified: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    suspended: 'bg-gray-100 text-gray-800 border-gray-200',
    // Leads
    available: 'bg-blue-100 text-blue-800 border-blue-200',
    accepted: 'bg-green-100 text-green-800 border-green-200',
    expired: 'bg-gray-100 text-gray-800 border-gray-200',
    reassigned: 'bg-purple-100 text-purple-800 border-purple-200',
    // Consultations
    scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled_by_lawyer: 'bg-red-100 text-red-800 border-red-200',
    cancelled_by_client: 'bg-red-100 text-red-800 border-red-200',
    refunded: 'bg-orange-100 text-orange-800 border-orange-200',
    // Stripe Connect
    not_started: 'bg-gray-100 text-gray-800 border-gray-200',
    pending: 'bg-orange-100 text-orange-800 border-orange-200',
    active: 'bg-green-100 text-green-800 border-green-200',
    restricted: 'bg-orange-100 text-orange-800 border-orange-200',
  }
  return map[status] ?? 'bg-gray-100 text-gray-800 border-gray-200'
}

/**
 * Traduit un statut technique en libellé humain.
 */
export function getStatusLabel(status: string, locale: Locale = 'fr'): string {
  const labels: Record<string, { fr: string; en: string }> = {
    pending_verification: { fr: 'En attente', en: 'Pending' },
    verified: { fr: 'Vérifié', en: 'Verified' },
    rejected: { fr: 'Refusé', en: 'Rejected' },
    suspended: { fr: 'Suspendu', en: 'Suspended' },
    available: { fr: 'Disponible', en: 'Available' },
    accepted: { fr: 'Accepté', en: 'Accepted' },
    expired: { fr: 'Expiré', en: 'Expired' },
    reassigned: { fr: 'Réassigné', en: 'Reassigned' },
    scheduled: { fr: 'Planifiée', en: 'Scheduled' },
    completed: { fr: 'Terminée', en: 'Completed' },
    cancelled_by_lawyer: { fr: 'Annulée par avocat', en: 'Cancelled by lawyer' },
    cancelled_by_client: { fr: 'Annulée par client', en: 'Cancelled by client' },
    refunded: { fr: 'Remboursée', en: 'Refunded' },
    not_started: { fr: 'Non démarré', en: 'Not started' },
    pending: { fr: 'En cours', en: 'Pending' },
    active: { fr: 'Actif', en: 'Active' },
    restricted: { fr: 'Restreint', en: 'Restricted' },
  }
  return labels[status]?.[locale] ?? status
}

// ============ HELPERS DIVERS ============

/**
 * Combine des classes CSS conditionnellement.
 * @example cn('btn', isPrimary && 'btn-primary', { 'btn-disabled': disabled })
 */
export function cn(...classes: Array<string | boolean | undefined | null>): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Retourne les initiales d'un nom complet.
 * @example getInitials('Jane Doe') // "JD"
 */
export function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase()
}

/**
 * Tronque un texte en ajoutant "..." si trop long.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '…'
}

/**
 * Vérifie si un email est valide (basique).
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Pluriel français/anglais simple.
 * @example pluralize(3, 'dossier', 'dossiers') // "3 dossiers"
 */
export function pluralize(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`
}
