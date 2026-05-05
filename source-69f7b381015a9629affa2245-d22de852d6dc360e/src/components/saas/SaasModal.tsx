import { useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/saas-utils'

interface SaasModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  hideCloseButton?: boolean
}

/**
 * Modale réutilisable du SaaS Jurislinkia.
 *
 * @example
 * <SaasModal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   title="Vérification de conflit d'intérêt"
 *   footer={
 *     <>
 *       <SaasButton variant="secondary" onClick={() => setShowModal(false)}>Annuler</SaasButton>
 *       <SaasButton onClick={handleAccept} disabled={!allChecked}>Confirmer</SaasButton>
 *     </>
 *   }
 * >
 *   <ConflictCheckForm />
 * </SaasModal>
 */
export function SaasModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  hideCloseButton = false,
}: SaasModalProps) {
  // Fermer avec la touche Escape
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  // Bloquer le scroll du body quand la modale est ouverte
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClasses: Record<NonNullable<SaasModalProps['size']>, string> = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Overlay sombre */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Contenu de la modale */}
      <div
        className={cn(
          'relative bg-white rounded-sm shadow-xl w-full',
          'border border-[#E5E7EB]',
          'max-h-[90vh] flex flex-col',
          sizeClasses[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer (X en haut à droite) */}
        {!hideCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'absolute top-4 right-4 z-10',
              'inline-flex items-center justify-center',
              'w-8 h-8 rounded-sm',
              'text-[#6B7280] hover:text-[#0A0A0A]',
              'hover:bg-[#F5F5F5] transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[#BC1E1E]'
            )}
            aria-label="Fermer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* En-tête */}
        {(title || subtitle) && (
          <header className="px-6 pt-6 pb-4 border-b border-[#E5E7EB] pr-14">
            {title && (
              <h2
                id="modal-title"
                className="font-serif text-[#0A0A0A] m-0"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 500,
                  fontSize: '1.5rem',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.3,
                }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="text-sm text-[#6B7280] mt-2 m-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {subtitle}
              </p>
            )}
          </header>
        )}

        {/* Corps */}
        <div className="px-6 py-5 overflow-y-auto flex-1">{children}</div>

        {/* Footer avec boutons */}
        {footer && (
          <footer
            className={cn(
              'flex items-center justify-end gap-3',
              'px-6 py-4 border-t border-[#E5E7EB]',
              'bg-[#FAFAFA]'
            )}
          >
            {footer}
          </footer>
        )}
      </div>
    </div>
  )
}
