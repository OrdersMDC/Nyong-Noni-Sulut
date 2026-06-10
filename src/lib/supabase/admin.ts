import { createServerSupabaseClient } from './server'
import { createClient } from '@supabase/supabase-js'
import { isUsingLocalDb } from '@/lib/db/local'

export async function requireAdmin() {
  if (isUsingLocalDb()) {
    return {
      user: { id: 'local-admin', email: 'admin@local.dev' },
      supabase: null as unknown as ReturnType<typeof createServerSupabaseClient>,
    }
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const profile = data as { role: string } | null

  if (!profile || profile.role !== 'admin') {
    throw new Error('Forbidden')
  }

  return { user, supabase }
}

export function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key'
  return createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  )
}
