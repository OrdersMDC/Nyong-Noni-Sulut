import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/db/local', () => ({
  isUsingLocalDb: () => true,
  localInsert: vi.fn((table: string, data: any) => ({ ...data, id: 'mock-id' })),
  localQuery: vi.fn((table: string, opts?: any) => {
    if (table === 'applicants') {
      return [
        { id: '1', full_name: 'Alice', email: 'a@test.com', city: 'Manado', province: 'Sulut', height_cm: 165, occupation: 'Mahasiswa', education: 'S1', status: 'finalist', created_at: '2026-01-01', date_of_birth: '2000-05-10', photo_url: null },
        { id: '2', full_name: 'Bob', email: 'b@test.com', city: 'Tomohon', province: 'Sulut', height_cm: 170, occupation: 'Karyawan', education: 'SMA', status: 'finalist', created_at: '2026-01-02', date_of_birth: '1999-08-15', photo_url: null },
      ].filter(a => opts?.where?.status ? a.status === opts.where.status : true)
    }
    if (table === 'hall_of_fame') return [
      { id: 'h1', tahun: 2025, nyong_name: 'John', noni_name: 'Jane', kabupaten_kota: 'Manado' },
      { id: 'h2', tahun: 2024, nyong_name: 'Alex', noni_name: 'Sara', kabupaten_kota: 'Bitung' },
    ]
    if (table === 'alumni_achievements') return [
      { id: 'a1', alumni_name: 'John Doe', achievement_type: 'Dokter', description: 'Dokter di RSUD', tahun: '2025' },
    ]
    if (table === 'finalist_profiles') return [
      { id: 'fp1', applicant_id: '1', instagram: '@alice', photo_url: null, bio: 'Finalist bio', tahun: '2026', umur: 26, pendidikan: 'S1', kabupaten_kota: 'Manado' },
    ]
    return []
  }),
  localUpdate: vi.fn(),
  localDelete: vi.fn(() => true),
}))

vi.mock('@/lib/supabase/admin', () => ({
  requireAdmin: vi.fn(() => Promise.resolve({ user: { id: 'admin-1' }, supabase: null })),
  getAdminClient: vi.fn(() => ({})),
}))

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))

describe('getPublicFinalists', () => {
  it('returns only finalists with profiles', async () => {
    const { getPublicFinalists } = await import('@/server/actions/finalists')
    const result = await getPublicFinalists()
    expect(result).toHaveLength(2)
    expect(result[0].full_name).toBe('Alice')
    expect(result[0].status).toBe('finalist')
  })

  it('returns profile data when available', async () => {
    const { getPublicFinalists } = await import('@/server/actions/finalists')
    const result = await getPublicFinalists()
    expect(result[0].instagram).toBeDefined()
  })
})

describe('getHallOfFame', () => {
  it('returns hall of fame entries', async () => {
    const { getHallOfFame } = await import('@/server/actions/finalists')
    const result = await getHallOfFame()
    expect(result).toHaveLength(2)
  })

  it('includes tahun, nyong and noni names', async () => {
    const { getHallOfFame } = await import('@/server/actions/finalists')
    const result = await getHallOfFame()
    expect(result[0].tahun).toBe(2025)
    expect(result[0].nyong_name).toBe('John')
    expect(result[0].noni_name).toBe('Jane')
  })
})

describe('getAlumniAchievements', () => {
  it('returns alumni achievements', async () => {
    const { getAlumniAchievements } = await import('@/server/actions/finalists')
    const result = await getAlumniAchievements()
    expect(result).toHaveLength(1)
    expect(result[0].achievement_type).toBe('Dokter')
  })
})

describe('createHallOfFame', () => {
  it('creates hall of fame entry with valid data', async () => {
    const { createHallOfFame } = await import('@/server/actions/finalists')
    const result = await createHallOfFame({ tahun: 2026, nyong_name: 'Test', noni_name: 'Test', kabupaten_kota: 'Manado' })
    expect(result.error).toBeUndefined()
    expect(result.data).toBeDefined()
  })

  it('rejects missing tahun', async () => {
    const { createHallOfFame } = await import('@/server/actions/finalists')
    const result = await createHallOfFame({ tahun: 0, nyong_name: '', noni_name: '', kabupaten_kota: '' } as any)
    expect(result.error).toBeDefined()
  })
})

describe('createAlumniAchievement', () => {
  it('creates achievement with valid data', async () => {
    const { createAlumniAchievement } = await import('@/server/actions/finalists')
    const result = await createAlumniAchievement({ alumni_name: 'Test Alumni', achievement_type: 'Dokter', description: 'Dokter spesialis di RSUD Manado', tahun: '2026' })
    expect(result.error).toBeUndefined()
  })
})
