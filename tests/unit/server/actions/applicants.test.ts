import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/db/local', () => ({
  isUsingLocalDb: () => true,
  localInsert: vi.fn((table: string, data: any) => ({ ...data, id: 'mock-id' })),
  localQuery: vi.fn(() => []),
  localUpdate: vi.fn(),
  localDelete: vi.fn(() => true),
}))

vi.mock('@/lib/supabase/admin', () => ({
  requireAdmin: vi.fn(() => Promise.resolve({ user: { id: 'admin-1' }, supabase: null })),
  getAdminClient: vi.fn(() => ({})),
}))

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))

describe('createApplicant', () => {
  it('validates correct data successfully', async () => {
    const { createApplicant } = await import('@/server/actions/applicants')
    const result = await createApplicant({
      full_name: 'John Doe',
      email: 'john@example.com',
      phone: '081234567890',
      date_of_birth: '2000-01-01',
      address: 'Jl. Contoh No. 123, Kelurahan, Kecamatan',
      city: 'Manado',
      province: 'Sulawesi Utara',
      height_cm: 170,
      weight_kg: 60,
      occupation: 'Mahasiswa',
      education: 'Sarjana S1',
    })
    expect(result.error).toBeUndefined()
    expect(result.data).toBeDefined()
  })

  it('returns error for missing required fields', async () => {
    const { createApplicant } = await import('@/server/actions/applicants')
    const result = await createApplicant({
      full_name: '',
      email: '',
      phone: '',
      date_of_birth: '',
      address: '',
      city: '',
      province: '',
      height_cm: 0 as any,
      weight_kg: 0 as any,
      occupation: '',
      education: '',
    })
    expect(result.error).toBeDefined()
    expect(typeof result.error).toBe('string')
    expect(result.error!.length).toBeGreaterThan(0)
  })

  it('returns error for invalid email', async () => {
    const { createApplicant } = await import('@/server/actions/applicants')
    const result = await createApplicant({
      full_name: 'John Doe',
      email: 'not-an-email',
      phone: '081234567890',
      date_of_birth: '2000-01-01',
      address: 'Jl. Contoh No. 123, Kelurahan, Kecamatan',
      city: 'Manado',
      province: 'Sulawesi Utara',
      height_cm: 170,
      weight_kg: 60,
      occupation: 'Mahasiswa',
      education: 'Sarjana S1',
    })
    expect(result.error).toBeDefined()
    expect(result.error).toContain('email')
  })

  it('returns error for height below minimum', async () => {
    const { createApplicant } = await import('@/server/actions/applicants')
    const result = await createApplicant({
      full_name: 'John Doe',
      email: 'john@example.com',
      phone: '081234567890',
      date_of_birth: '2000-01-01',
      address: 'Jl. Contoh No. 123, Kelurahan, Kecamatan',
      city: 'Manado',
      province: 'Sulawesi Utara',
      height_cm: 100,
      weight_kg: 60,
      occupation: 'Mahasiswa',
      education: 'Sarjana S1',
    })
    expect(result.error).toBeDefined()
    expect(result.error).toContain('Tinggi')
  })
})

describe('updateApplicantStatus', () => {
  it('updates status successfully', async () => {
    const { updateApplicantStatus } = await import('@/server/actions/applicants')
    await expect(updateApplicantStatus('test-id', 'finalist')).resolves.not.toThrow()
  })
})
