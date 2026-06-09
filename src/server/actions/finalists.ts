'use server'

import { requireAdmin, getAdminClient } from '@/lib/supabase/admin'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { hallOfFameSchema, alumniAchievementSchema, finalistUpdateSchema } from '@/lib/validations/registration'
import { revalidatePath } from 'next/cache'
import { isUsingLocalDb, localQuery, localInsert, localUpdate, localDelete } from '@/lib/db/local'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

// Public: get all finalists with profile info
export async function getPublicFinalists() {
  if (isUsingLocalDb()) {
    const applicants = localQuery<any>('applicants', {
      where: { status: 'finalist' },
      orderBy: { column: 'created_at', direction: 'DESC' },
    }) || []
    const profiles: any[] = localQuery<any>('finalist_profiles', {}) || []

    return applicants.map((a: any) => {
      const profile = profiles.find((p: any) => p.applicant_id === a.id)
      return {
        ...a,
        instagram: profile?.instagram || null,
        photo_url: profile?.photo_url || a.photo_url || null,
        bio: profile?.bio || null,
        umur: a.date_of_birth ? calculateAge(a.date_of_birth) : null,
      }
    })
  }

  const supabase = await createServerSupabaseClient()
  const { data: applicants } = await supabase
    .from('applicants')
    .select('*')
    .eq('status', 'finalist')
    .order('created_at', { ascending: false }) as any

  const ids = (applicants || []).map((a: any) => a.id)
  const { data: profiles } = ids.length > 0
    ? await supabase.from('finalist_profiles').select('*').in('applicant_id', ids) as any
    : { data: [] }

  return (applicants || []).map((a: any) => ({
    ...a,
    profile: (profiles || []).find((p: any) => p.applicant_id === a.id) || null,
    umur: a.date_of_birth ? calculateAge(a.date_of_birth) : null,
  }))
}

// Public: get single finalist
export async function getPublicFinalist(id: string) {
  if (isUsingLocalDb()) {
    const applicants = localQuery<any>('applicants', { where: { id } }) || []
    if (!applicants.length) return null
    const a = applicants[0]
    const profiles = localQuery<any>('finalist_profiles', { where: { applicant_id: id } }) || []
    const profile = profiles[0] || null
    return { ...a, umur: a.date_of_birth ? calculateAge(a.date_of_birth) : null, photo_url: profile?.photo_url || a.photo_url || null, profile }
  }

  const supabase = await createServerSupabaseClient()
  const { data: applicant } = await supabase.from('applicants').select('*').eq('id', id).single() as any
  if (!applicant) return null

  const { data: profile } = await supabase.from('finalist_profiles').select('*').eq('applicant_id', id).single() as any
  return { ...applicant, umur: calculateAge(applicant.date_of_birth), photo_url: profile?.photo_url || applicant.photo_url || null, profile: profile || null }
}

// Public: hall of fame
export async function getHallOfFame() {
  if (isUsingLocalDb()) {
    return localQuery<any>('hall_of_fame', { orderBy: { column: 'tahun', direction: 'DESC' } }) || []
  }

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('hall_of_fame').select('*').order('tahun', { ascending: false }) as any
  return data || []
}

// Public: alumni achievements
export async function getAlumniAchievements() {
  if (isUsingLocalDb()) {
    return localQuery<any>('alumni_achievements', { orderBy: { column: 'tahun', direction: 'DESC' } }) || []
  }
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('alumni_achievements').select('*').order('tahun', { ascending: false }) as any
  return data || []
}

// Admin: update finalist data (applicant + profile)
export async function updateFinalistData(data: {
  applicant_id: string
  full_name?: string
  email?: string
  phone?: string
  date_of_birth?: string
  address?: string
  city?: string
  province?: string
  height_cm?: number
  weight_kg?: number
  occupation?: string
  education?: string
  instagram?: string
  photo_url?: string
  bio?: string
  tahun: string
}) {
  await requireAdmin()
  const parsed = finalistUpdateSchema.safeParse(data)
  if (!parsed.success) {
    return { error: Object.entries(parsed.error.flatten().fieldErrors).map(([f, e]) => `${f}: ${(e as string[]).join(', ')}`).join('; ') }
  }

  const { applicant_id, instagram, photo_url, bio, tahun, ...applicantData } = parsed.data

  if (isUsingLocalDb()) {
    if (Object.keys(applicantData).length > 0) {
      localUpdate('applicants', applicant_id, { ...applicantData, updated_at: new Date().toISOString() })
    }
    const existing = localQuery<any>('finalist_profiles', { where: { applicant_id } })
    if (existing.length > 0) {
      localUpdate('finalist_profiles', existing[0].id, { instagram, photo_url, bio, tahun, updated_at: new Date().toISOString() })
    } else {
      localInsert('finalist_profiles', { applicant_id, instagram, photo_url, bio, tahun, id: crypto.randomUUID() })
    }
    revalidatePath('/admin/finalists')
    revalidatePath('/finalists')
    revalidatePath('/admin/applicants')
    return { data: parsed.data }
  }

  const adminClient = getAdminClient()
  if (Object.keys(applicantData).length > 0) {
    await adminClient.from('applicants').update({ ...applicantData, updated_at: new Date().toISOString() }).eq('id', applicant_id)
  }
  const existing = await adminClient.from('finalist_profiles').select('id').eq('applicant_id', applicant_id).single()
  if (existing.data) {
    await adminClient.from('finalist_profiles').update({ instagram, photo_url, bio, tahun, updated_at: new Date().toISOString() }).eq('applicant_id', applicant_id)
  } else {
    await adminClient.from('finalist_profiles').insert({ applicant_id, instagram, photo_url, bio, tahun })
  }
  revalidatePath('/admin/finalists')
  revalidatePath('/finalists')
  revalidatePath('/admin/applicants')
  return { data: parsed.data }
}

// Admin: upload finalist photo (PNG only)
export async function uploadFinalistPhoto(formData: FormData) {
  await requireAdmin()
  const file = formData.get('file') as File | null
  if (!file) return { error: 'File tidak ditemukan' }

  if (file.type !== 'image/png') return { error: 'Hanya file PNG yang diizinkan' }

  if (isUsingLocalDb()) {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'finalists')
    await mkdir(uploadDir, { recursive: true })
    const filename = `${crypto.randomUUID()}.png`
    await writeFile(path.join(uploadDir, filename), buffer)
    return { url: `/uploads/finalists/${filename}` }
  }

  const adminClient = getAdminClient()
  const filename = `${crypto.randomUUID()}.png`
  const { data, error } = await adminClient.storage
    .from('finalists')
    .upload(filename, file, { contentType: 'image/png' })
  if (error) return { error: error.message }
  const { data: { publicUrl } } = adminClient.storage.from('finalists').getPublicUrl(filename)
  return { url: publicUrl }
}

// Admin: hall of fame CRUD
export async function createHallOfFame(data: { tahun: number; nyong_name: string; noni_name: string; nyong_photo_url?: string; noni_photo_url?: string; kabupaten_kota: string }) {
  await requireAdmin()
  const parsed = hallOfFameSchema.safeParse(data)
  if (!parsed.success) {
    return { error: Object.entries(parsed.error.flatten().fieldErrors).map(([f, e]) => `${f}: ${(e as string[]).join(', ')}`).join('; ') }
  }

  if (isUsingLocalDb()) {
    const record = localInsert('hall_of_fame', { ...parsed.data, id: crypto.randomUUID() })
    revalidatePath('/hall-of-fame')
    revalidatePath('/admin/hall-of-fame')
    return { data: record }
  }

  const adminClient = getAdminClient()
  const { data: result, error } = await adminClient.from('hall_of_fame').insert(parsed.data).select().single()
  if (error) return { error: error.message }
  revalidatePath('/hall-of-fame')
  revalidatePath('/admin/hall-of-fame')
  return { data: result }
}

export async function deleteHallOfFame(id: string) {
  await requireAdmin()
  if (isUsingLocalDb()) { localDelete('hall_of_fame', id); revalidatePath('/admin/hall-of-fame'); return }
  const adminClient = getAdminClient()
  await adminClient.from('hall_of_fame').delete().eq('id', id)
  revalidatePath('/admin/hall-of-fame')
}

// Admin: alumni achievement CRUD
export async function createAlumniAchievement(data: { alumni_name: string; achievement_type: string; description: string; tahun: string; photo_url?: string; instagram?: string }) {
  await requireAdmin()
  const parsed = alumniAchievementSchema.safeParse(data)
  if (!parsed.success) {
    return { error: Object.entries(parsed.error.flatten().fieldErrors).map(([f, e]) => `${f}: ${(e as string[]).join(', ')}`).join('; ') }
  }

  if (isUsingLocalDb()) {
    const record = localInsert('alumni_achievements', { ...parsed.data, id: crypto.randomUUID() })
    revalidatePath('/alumni-achievements')
    revalidatePath('/admin/alumni-achievements')
    return { data: record }
  }

  const adminClient = getAdminClient()
  const { data: result, error } = await adminClient.from('alumni_achievements').insert(parsed.data).select().single()
  if (error) return { error: error.message }
  revalidatePath('/alumni-achievements')
  revalidatePath('/admin/alumni-achievements')
  return { data: result }
}

export async function deleteAlumniAchievement(id: string) {
  await requireAdmin()
  if (isUsingLocalDb()) { localDelete('alumni_achievements', id); revalidatePath('/admin/alumni-achievements'); return }
  const adminClient = getAdminClient()
  await adminClient.from('alumni_achievements').delete().eq('id', id)
  revalidatePath('/admin/alumni-achievements')
}
