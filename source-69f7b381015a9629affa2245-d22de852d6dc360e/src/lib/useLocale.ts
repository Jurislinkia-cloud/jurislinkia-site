import { useLocation } from '@tanstack/react-router'
import { getLocaleFromPath, type Locale } from './i18n'

export function useLocale(): Locale {
  const location = useLocation()
  return getLocaleFromPath(location.pathname)
}
