import { describe, it, expect } from 'vitest'
import {
  registrationSchema,
  registrationStepSchema,
  newsSchema,
  eventSchema,
  gallerySchema,
  finalistProfileSchema,
  finalistUpdateSchema,
  hallOfFameSchema,
  alumniAchievementSchema,
  titleholderSchema,
} from '@/lib/validations/registration'

describe('registrationSchema', () => {
  const validData = {
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
  }

  it('validates correct data', () => {
    const result = registrationSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects short name', () => {
    const result = registrationSchema.safeParse({ ...validData, full_name: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = registrationSchema.safeParse({ ...validData, email: 'invalid' })
    expect(result.success).toBe(false)
  })

  it('rejects short phone number', () => {
    const result = registrationSchema.safeParse({ ...validData, phone: '123' })
    expect(result.success).toBe(false)
  })

  it('rejects height below minimum', () => {
    const result = registrationSchema.safeParse({ ...validData, height_cm: 100 })
    expect(result.success).toBe(false)
  })

  it('rejects height above maximum', () => {
    const result = registrationSchema.safeParse({ ...validData, height_cm: 250 })
    expect(result.success).toBe(false)
  })

  it('rejects weight below minimum', () => {
    const result = registrationSchema.safeParse({ ...validData, weight_kg: 20 })
    expect(result.success).toBe(false)
  })

  it('rejects weight above maximum', () => {
    const result = registrationSchema.safeParse({ ...validData, weight_kg: 160 })
    expect(result.success).toBe(false)
  })

  it('rejects empty required fields', () => {
    const result = registrationSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})

describe('registrationStepSchema', () => {
  const validStep1 = { full_name: 'John Doe', email: 'john@example.com', phone: '081234567890', date_of_birth: '2000-01-01' }
  const validStep2 = { address: 'Jl. Contoh No. 123, Kelurahan, Kecamatan Manado', city: 'Manado', province: 'Sulawesi Utara' }
  const validStep3 = { height_cm: 170, weight_kg: 60, occupation: 'Mahasiswa', education: 'Sarjana S1' }

  it('validates step 1 with correct data', () => {
    expect(registrationStepSchema[0].safeParse(validStep1).success).toBe(true)
  })

  it('rejects step 1 with short name', () => {
    expect(registrationStepSchema[0].safeParse({ ...validStep1, full_name: 'A' }).success).toBe(false)
  })

  it('rejects step 1 with invalid email', () => {
    expect(registrationStepSchema[0].safeParse({ ...validStep1, email: 'bad' }).success).toBe(false)
  })

  it('validates step 2 with correct data', () => {
    expect(registrationStepSchema[1].safeParse(validStep2).success).toBe(true)
  })

  it('rejects step 2 with short address', () => {
    expect(registrationStepSchema[1].safeParse({ ...validStep2, address: 'Short' }).success).toBe(false)
  })

  it('rejects step 2 with empty city', () => {
    expect(registrationStepSchema[1].safeParse({ ...validStep2, city: '' }).success).toBe(false)
  })

  it('validates step 3 with correct data', () => {
    expect(registrationStepSchema[2].safeParse(validStep3).success).toBe(true)
  })

  it('rejects step 3 with height below minimum', () => {
    expect(registrationStepSchema[2].safeParse({ ...validStep3, height_cm: 100 }).success).toBe(false)
  })

  it('rejects step 3 with weight below minimum', () => {
    expect(registrationStepSchema[2].safeParse({ ...validStep3, weight_kg: 20 }).success).toBe(false)
  })
})

describe('finalistProfileSchema', () => {
  it('validates correct data', () => {
    const result = finalistProfileSchema.safeParse({ applicant_id: 'abc-123', tahun: '2026' })
    expect(result.success).toBe(true)
  })

  it('rejects missing applicant_id', () => {
    const result = finalistProfileSchema.safeParse({ tahun: '2026' })
    expect(result.success).toBe(false)
  })

  it('rejects missing tahun', () => {
    const result = finalistProfileSchema.safeParse({ applicant_id: 'abc-123' })
    expect(result.success).toBe(false)
  })

  it('accepts optional fields (instagram, bio)', () => {
    const result = finalistProfileSchema.safeParse({ applicant_id: 'abc-123', tahun: '2026', instagram: '@test', bio: 'Test bio' })
    expect(result.success).toBe(true)
  })
})

describe('finalistUpdateSchema', () => {
  it('validates with required fields only', () => {
    const result = finalistUpdateSchema.safeParse({ applicant_id: 'abc-123', tahun: '2026' })
    expect(result.success).toBe(true)
  })

  it('validates with all fields', () => {
    const result = finalistUpdateSchema.safeParse({
      applicant_id: 'abc-123',
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
      instagram: '@johndoe',
      photo_url: 'https://example.com/photo.jpg',
      bio: 'Finalis 2026',
      tahun: '2026',
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing applicant_id', () => {
    const result = finalistUpdateSchema.safeParse({ tahun: '2026' })
    expect(result.success).toBe(false)
  })

  it('rejects missing tahun', () => {
    const result = finalistUpdateSchema.safeParse({ applicant_id: 'abc-123' })
    expect(result.success).toBe(false)
  })

  it('rejects short optional name', () => {
    const result = finalistUpdateSchema.safeParse({ applicant_id: 'abc-123', tahun: '2026', full_name: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid optional email', () => {
    const result = finalistUpdateSchema.safeParse({ applicant_id: 'abc-123', tahun: '2026', email: 'bad' })
    expect(result.success).toBe(false)
  })
})

describe('hallOfFameSchema', () => {
  const validData = { tahun: 2025, nyong_name: 'John Doe', noni_name: 'Jane Doe', kabupaten_kota: 'Manado' }

  it('validates correct data', () => {
    expect(hallOfFameSchema.safeParse(validData).success).toBe(true)
  })

  it('rejects tahun below minimum', () => {
    expect(hallOfFameSchema.safeParse({ ...validData, tahun: 1999 }).success).toBe(false)
  })

  it('rejects tahun above maximum', () => {
    expect(hallOfFameSchema.safeParse({ ...validData, tahun: 2101 }).success).toBe(false)
  })

  it('rejects short nyong name', () => {
    expect(hallOfFameSchema.safeParse({ ...validData, nyong_name: 'Jo' }).success).toBe(false)
  })

  it('rejects short noni name', () => {
    expect(hallOfFameSchema.safeParse({ ...validData, noni_name: 'Ja' }).success).toBe(false)
  })

  it('rejects missing kabupaten_kota', () => {
    expect(hallOfFameSchema.safeParse({ ...validData, kabupaten_kota: '' }).success).toBe(false)
  })

  it('accepts optional photo URLs', () => {
    const result = hallOfFameSchema.safeParse({ ...validData, nyong_photo_url: 'https://example.com/nyong.jpg', noni_photo_url: 'https://example.com/noni.jpg' })
    expect(result.success).toBe(true)
  })
})

describe('alumniAchievementSchema', () => {
  const validData = { alumni_name: 'John Doe', achievement_type: 'Dokter', description: 'Dokter spesialis di RSUD Manado selama 5 tahun', tahun: '2025' }

  it('validates correct data', () => {
    expect(alumniAchievementSchema.safeParse(validData).success).toBe(true)
  })

  it('rejects short name', () => {
    expect(alumniAchievementSchema.safeParse({ ...validData, alumni_name: 'Jo' }).success).toBe(false)
  })

  it('rejects invalid achievement type', () => {
    expect(alumniAchievementSchema.safeParse({ ...validData, achievement_type: 'Invalid' }).success).toBe(false)
  })

  it('rejects short description', () => {
    expect(alumniAchievementSchema.safeParse({ ...validData, description: 'Short' }).success).toBe(false)
  })

  it('rejects missing tahun', () => {
    expect(alumniAchievementSchema.safeParse({ ...validData, tahun: '' }).success).toBe(false)
  })

  it('accepts optional photo_url and instagram', () => {
    const result = alumniAchievementSchema.safeParse({ ...validData, photo_url: 'https://example.com/photo.jpg', instagram: '@johndoe' })
    expect(result.success).toBe(true)
  })
})

describe('titleholderSchema', () => {
  const validData = {
    tahun: 2026,
    category: 'Juara Utama',
    nyong_name: 'John Doe',
    noni_name: 'Jane Doe',
    region: 'Manado',
    motto: 'Budaya untuk pariwisata',
  }

  it('validates correct data', () => {
    expect(titleholderSchema.safeParse(validData).success).toBe(true)
  })

  it('rejects invalid category', () => {
    expect(titleholderSchema.safeParse({ ...validData, category: 'Invalid' }).success).toBe(false)
  })

  it('rejects missing region', () => {
    expect(titleholderSchema.safeParse({ ...validData, region: '' }).success).toBe(false)
  })

  it('applies default sort_order when omitted', () => {
    const result = titleholderSchema.safeParse(validData)
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.sort_order).toBe(0)
  })
})

describe('newsSchema', () => {
  const validNews = {
    title: 'Grand Final Nyong Noni Sulut 2026',
    slug: 'grand-final-2026',
    content: 'Acara grand final Nyong Noni Sulawesi Utara 2026 akan diselenggarakan di Manado. Acara ini akan menampilkan finalis-finalis terbaik dari seluruh Sulawesi Utara.',
    excerpt: 'Grand final akan digelar di Manado',
    published: true,
  }

  it('validates correct news data', () => {
    const result = newsSchema.safeParse(validNews)
    expect(result.success).toBe(true)
  })

  it('rejects short title', () => {
    const result = newsSchema.safeParse({ ...validNews, title: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejects short content', () => {
    const result = newsSchema.safeParse({ ...validNews, content: 'Short' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid image URL', () => {
    const result = newsSchema.safeParse({ ...validNews, image_url: 'not-a-url' })
    expect(result.success).toBe(false)
  })

  it('defaults published to false', () => {
    const result = newsSchema.safeParse({ ...validNews, published: undefined })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.published).toBe(false)
  })
})

describe('eventSchema', () => {
  const validEvent = {
    title: 'Grand Final 2026',
    slug: 'grand-final-2026',
    description: 'Acara puncak Nyong Noni Sulawesi Utara 2026',
    date: '2026-08-15',
    location: 'Manado Convention Center',
    published: true,
  }

  it('validates correct event data', () => {
    const result = eventSchema.safeParse(validEvent)
    expect(result.success).toBe(true)
  })

  it('rejects missing date', () => {
    const result = eventSchema.safeParse({ ...validEvent, date: '' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid category', () => {
    const result = eventSchema.safeParse({ ...validEvent, category: 'Invalid' })
    expect(result.success).toBe(false)
  })

  it('defaults category to Kegiatan Sosial', () => {
    const result = eventSchema.safeParse({ ...validEvent, category: undefined })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.category).toBe('Kegiatan Sosial')
  })

  it('rejects short title', () => {
    const result = eventSchema.safeParse({ ...validEvent, title: 'A' })
    expect(result.success).toBe(false)
  })
})

describe('gallerySchema', () => {
  const validGallery = {
    title: 'Photo Shoot Session',
    image_url: 'https://example.com/photo.jpg',
    category: 'Photo Shoot',
  }

  it('validates correct gallery data', () => {
    const result = gallerySchema.safeParse(validGallery)
    expect(result.success).toBe(true)
  })

  it('rejects invalid image url', () => {
    const result = gallerySchema.safeParse({ ...validGallery, image_url: 'not-a-url' })
    expect(result.success).toBe(false)
  })

  it('rejects short title', () => {
    const result = gallerySchema.safeParse({ ...validGallery, title: 'A' })
    expect(result.success).toBe(false)
  })

  it('accepts optional description', () => {
    const result = gallerySchema.safeParse({ ...validGallery, description: 'A great photo' })
    expect(result.success).toBe(true)
  })
})
