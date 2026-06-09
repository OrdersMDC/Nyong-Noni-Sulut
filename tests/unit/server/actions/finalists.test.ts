import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockLocalQuery = vi.fn((table: string, opts?: any) => {
  if (table === 'applicants') {
    const all = [
      { id: '1', full_name: 'Alice', email: 'a@test.com', city: 'Manado', province: 'Sulut', height_cm: 165, occupation: 'Mahasiswa', education: 'S1', status: 'finalist', created_at: '2026-01-01', date_of_birth: '2000-05-10', photo_url: null },
      { id: '2', full_name: 'Bob', email: 'b@test.com', city: 'Tomohon', province: 'Sulut', height_cm: 170, occupation: 'Karyawan', education: 'SMA', status: 'finalist', created_at: '2026-01-02', date_of_birth: '1999-08-15', photo_url: null },
    ]
    if (opts?.where?.id) return all.filter(a => a.id === opts.where.id)
    if (opts?.where?.status) return all.filter(a => a.status === opts.where.status)
    return all
  }
  if (table === 'hall_of_fame') return [
    { id: 'h1', tahun: 2025, nyong_name: 'John', noni_name: 'Jane', kabupaten_kota: 'Manado' },
    { id: 'h2', tahun: 2024, nyong_name: 'Alex', noni_name: 'Sara', kabupaten_kota: 'Bitung' },
  ]
  if (table === 'alumni_achievements') return [
    { id: 'a1', alumni_name: 'John Doe', achievement_type: 'Dokter', description: 'Dokter di RSUD', tahun: '2025' },
  ]
  if (table === 'finalist_profiles') {
    if (opts?.where?.applicant_id === '1') return [
      { id: 'fp1', applicant_id: '1', instagram: '@alice', photo_url: '/photos/alice.jpg', bio: 'Finalist bio', tahun: '2026' },
    ]
    if (opts?.where?.applicant_id) return []
    return []
  }
  return []
})
const mockLocalInsert = vi.fn((table: string, data: any) => ({ ...data, id: 'mock-id' }))
const mockLocalUpdate = vi.fn()
const mockLocalDelete = vi.fn(() => true)

vi.mock('@/lib/db/local', () => ({
  isUsingLocalDb: () => true,
  localInsert: mockLocalInsert,
  localQuery: mockLocalQuery,
  localUpdate: mockLocalUpdate,
  localDelete: mockLocalDelete,
}))

vi.mock('@/lib/supabase/admin', () => ({
  requireAdmin: vi.fn(() => Promise.resolve({ user: { id: 'admin-1' }, supabase: null })),
  getAdminClient: vi.fn(() => ({})),
}))

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))

beforeEach(() => {
  vi.clearAllMocks()
})

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

  it('calculates umur from date_of_birth', async () => {
    const { getPublicFinalists } = await import('@/server/actions/finalists')
    const result = await getPublicFinalists()
    expect(result[0].umur).toBeGreaterThan(0)
  })
})

describe('getPublicFinalist', () => {
  it('returns single finalist with profile', async () => {
    const { getPublicFinalist } = await import('@/server/actions/finalists')
    const result = await getPublicFinalist('1')
    expect(result).not.toBeNull()
    expect(result!.full_name).toBe('Alice')
    expect(result!.photo_url).toBe('/photos/alice.jpg')
    expect(result!.profile).toBeDefined()
  })

  it('returns null for non-existent id', async () => {
    const { getPublicFinalist } = await import('@/server/actions/finalists')
    const result = await getPublicFinalist('non-existent')
    expect(result).toBeNull()
  })

  it('returns finalist even without profile', async () => {
    const { getPublicFinalist } = await import('@/server/actions/finalists')
    const result = await getPublicFinalist('2')
    expect(result).not.toBeNull()
    expect(result!.photo_url).toBeNull()
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

  it('returns empty array when no entries', async () => {
    mockLocalQuery.mockImplementationOnce(() => [])
    const { getHallOfFame } = await import('@/server/actions/finalists')
    const result = await getHallOfFame()
    expect(result).toHaveLength(0)
  })
})

describe('getAlumniAchievements', () => {
  it('returns alumni achievements', async () => {
    const { getAlumniAchievements } = await import('@/server/actions/finalists')
    const result = await getAlumniAchievements()
    expect(result).toHaveLength(1)
    expect(result[0].achievement_type).toBe('Dokter')
  })

  it('returns empty array when no achievements', async () => {
    mockLocalQuery.mockImplementationOnce(() => [])
    const { getAlumniAchievements } = await import('@/server/actions/finalists')
    const result = await getAlumniAchievements()
    expect(result).toHaveLength(0)
  })
})

describe('updateFinalistData', () => {
  it('updates finalist applicant fields and creates profile if missing', async () => {
    const { updateFinalistData } = await import('@/server/actions/finalists')
    const result = await updateFinalistData({ applicant_id: '2', tahun: '2026', full_name: 'Bob Updated' })
    expect(result.error).toBeUndefined()
    expect(result.data).toBeDefined()
    expect(mockLocalUpdate).toHaveBeenCalledWith('applicants', '2', expect.objectContaining({ full_name: 'Bob Updated' }))
    expect(mockLocalInsert).toHaveBeenCalledWith('finalist_profiles', expect.objectContaining({ applicant_id: '2', tahun: '2026' }))
  })

  it('updates existing profile when it exists', async () => {
    const { updateFinalistData } = await import('@/server/actions/finalists')
    const result = await updateFinalistData({ applicant_id: '1', tahun: '2026', instagram: '@newhandle' })
    expect(result.error).toBeUndefined()
    expect(mockLocalUpdate).toHaveBeenCalledWith('finalist_profiles', 'fp1', expect.objectContaining({ instagram: '@newhandle' }))
  })

  it('returns validation error for invalid data', async () => {
    const { updateFinalistData } = await import('@/server/actions/finalists')
    const result = await updateFinalistData({ applicant_id: '', tahun: '' } as any)
    expect(result.error).toBeDefined()
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

describe('deleteHallOfFame', () => {
  it('deletes hall of fame entry', async () => {
    const { deleteHallOfFame } = await import('@/server/actions/finalists')
    await expect(deleteHallOfFame('h1')).resolves.not.toThrow()
    expect(mockLocalDelete).toHaveBeenCalledWith('hall_of_fame', 'h1')
  })
})

describe('createAlumniAchievement', () => {
  it('creates achievement with valid data', async () => {
    const { createAlumniAchievement } = await import('@/server/actions/finalists')
    const result = await createAlumniAchievement({ alumni_name: 'Test Alumni', achievement_type: 'Dokter', description: 'Dokter spesialis di RSUD Manado', tahun: '2026' })
    expect(result.error).toBeUndefined()
  })

  it('rejects invalid achievement type', async () => {
    const { createAlumniAchievement } = await import('@/server/actions/finalists')
    const result = await createAlumniAchievement({ alumni_name: 'Test', achievement_type: 'Invalid', description: 'Description long enough for validation', tahun: '2026' })
    expect(result.error).toBeDefined()
  })
})

describe('deleteAlumniAchievement', () => {
  it('deletes alumni achievement', async () => {
    const { deleteAlumniAchievement } = await import('@/server/actions/finalists')
    await expect(deleteAlumniAchievement('a1')).resolves.not.toThrow()
    expect(mockLocalDelete).toHaveBeenCalledWith('alumni_achievements', 'a1')
  })
})
