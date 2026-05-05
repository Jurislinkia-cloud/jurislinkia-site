import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Client Supabase pour Jurislinkia SaaS
 *
 * Utilise la "publishable key" (anon key) qui est sûre côté navigateur.
 * Les politiques RLS dans Supabase contrôlent les accès aux données.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Variables manquantes. Vérifier VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans Netlify.'
  )
}

let _client: SupabaseClient | null = null

/**
 * Retourne le client Supabase (singleton).
 * À utiliser dans les composants client : `const supabase = getSupabase()`
 */
export function getSupabase(): SupabaseClient {
  if (typeof window === 'undefined') {
    // Côté serveur (SSR), on crée un client temporaire
    return createClient(supabaseUrl ?? '', supabaseAnonKey ?? '', {
      auth: { persistSession: false },
    })
  }

  if (!_client) {
    _client = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '', {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  }

  return _client
}

/**
 * Type helper pour identifier les rôles utilisateurs
 */
export type UserRole = 'lawyer' | 'admin' | 'guest'

/**
 * Vérifie le rôle de l'utilisateur connecté
 */
export async function getCurrentUserRole(): Promise<UserRole> {
  const supabase = getSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return 'guest'

  // Vérifier si admin
  const { data: isAdminData } = await supabase.rpc('is_admin', { user_id: user.id })
  if (isAdminData === true) return 'admin'

  // Sinon avocat (toute personne authentifiée non-admin)
  return 'lawyer'
}
